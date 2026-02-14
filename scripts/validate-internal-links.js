/**
 * Validate Internal Links
 * Ensures all internal links in blog posts point to existing pages
 * 
 * Checks:
 * 1. All /blog/xxx links exist as actual blog posts
 * 2. All internal page links (/features/, /contact/, etc.) exist
 * 3. No broken or truncated slugs
 * 4. No [object Object] or undefined in links
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const BUILD_DIR = path.join(__dirname, '../build');
const BLOG_DIR = path.join(SRC_DIR, 'Components/blog');
const I18N_BLOG_DIR = path.join(SRC_DIR, 'i18n/blog');

// Get all valid blog slugs
function getValidBlogSlugs() {
  const slugs = new Set();
  
  // Read from main blog components
  if (fs.existsSync(BLOG_DIR)) {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.js') && f.startsWith('Post'));
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const slugMatch = content.match(/export\s+const\s+slug\s*=\s*["']([^"']+)["']/);
      if (slugMatch) {
        slugs.add(slugMatch[1]);
      }
    }
  }
  
  return slugs;
}

// Get all valid static pages from build
function getValidStaticPages() {
  const pages = new Set();
  
  function scanDir(dir, basePath = '') {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !['static', 'node_modules', '.git'].includes(entry.name)) {
        const newPath = basePath + '/' + entry.name;
        pages.add(newPath + '/');
        scanDir(path.join(dir, entry.name), newPath);
      }
    }
  }
  
  scanDir(BUILD_DIR);
  pages.add('/'); // Root
  
  return pages;
}

// Extract all internal links from a file
function extractInternalLinks(content, filePath) {
  const links = [];
  
  // Match href="/..." patterns
  const hrefPattern = /href=["'](\/((?!https?:)[^"']*))["']/g;
  let match;
  
  while ((match = hrefPattern.exec(content)) !== null) {
    links.push({
      url: match[1],
      file: filePath,
      position: match.index
    });
  }
  
  // Match to="/..." patterns (React Router)
  const toPattern = /to=["'](\/((?!https?:)[^"']*))["']/g;
  while ((match = toPattern.exec(content)) !== null) {
    links.push({
      url: match[1],
      file: filePath,
      position: match.index
    });
  }
  
  return links;
}

// Scan all source files for internal links
function scanSourceFiles() {
  const allLinks = [];
  
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !['node_modules', '.git', 'build'].includes(entry.name)) {
        scanDir(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const links = extractInternalLinks(content, fullPath);
        allLinks.push(...links);
      }
    }
  }
  
  scanDir(SRC_DIR);
  return allLinks;
}

function validateInternalLinks() {
  console.log('\n🔗 Validating internal links...\n');
  
  const errors = [];
  const warnings = [];
  
  // Get valid targets
  console.log('📋 Phase 1: Collecting valid blog slugs...');
  const validSlugs = getValidBlogSlugs();
  console.log(`   Found ${validSlugs.size} valid blog slugs\n`);
  
  console.log('📋 Phase 2: Collecting valid static pages...');
  const validPages = getValidStaticPages();
  console.log(`   Found ${validPages.size} valid static pages\n`);
  
  console.log('📋 Phase 3: Scanning source files for internal links...');
  const allLinks = scanSourceFiles();
  console.log(`   Found ${allLinks.length} internal links\n`);
  
  console.log('📋 Phase 4: Validating links...');
  
  // Supported languages
  const languages = ['', 'es', 'fr', 'de', 'jp'];
  
  for (const link of allLinks) {
    const url = link.url;
    const relFile = path.relative(SRC_DIR, link.file);
    
    // Check for [object Object] or undefined
    if (url.includes('[object') || url.includes('undefined') || url.includes('null')) {
      errors.push({
        type: 'CORRUPTED_URL',
        url,
        file: relFile,
        message: `URL contains invalid content: ${url}`
      });
      continue;
    }
    
    // Check blog links
    if (url.includes('/blog/') && !url.endsWith('/blog/') && !url.endsWith('/blog')) {
      // Extract the slug from the URL
      const blogMatch = url.match(/\/(?:es|fr|de|jp)?\/blog\/([^/?#]+)/);
      if (blogMatch) {
        const slug = blogMatch[1].replace(/\/$/, ''); // Remove trailing slash
        
        if (!validSlugs.has(slug)) {
          // Check if it's a partial match (truncated slug)
          const partialMatches = [...validSlugs].filter(s => s.includes(slug) || slug.includes(s.substring(0, 20)));
          
          if (partialMatches.length > 0) {
            errors.push({
              type: 'TRUNCATED_SLUG',
              url,
              file: relFile,
              message: `Blog slug "${slug}" appears truncated. Did you mean: ${partialMatches.join(', ')}?`
            });
          } else {
            errors.push({
              type: 'INVALID_BLOG_SLUG',
              url,
              file: relFile,
              message: `Blog post "${slug}" does not exist`
            });
          }
        }
      }
    }
    
    // Check for anchor links (skip validation)
    if (url.startsWith('/#') || url.includes('#')) {
      continue;
    }
    
    // Check static page links (only if build exists)
    if (validPages.size > 0 && !url.includes('/blog/')) {
      // Normalize the URL
      const normalizedUrl = url.endsWith('/') ? url : url + '/';
      
      // Remove language prefix for checking
      let baseUrl = normalizedUrl;
      for (const lang of languages) {
        if (lang && normalizedUrl.startsWith(`/${lang}/`)) {
          baseUrl = normalizedUrl.replace(`/${lang}/`, '/');
          break;
        }
      }
      
      // Check if the base page exists (in any language)
      const pageExists = validPages.has(normalizedUrl) || 
                         validPages.has(baseUrl) ||
                         languages.some(lang => validPages.has(lang ? `/${lang}${baseUrl}` : baseUrl));
      
      if (!pageExists && !url.startsWith('/#')) {
        // Don't error on common valid paths
        const knownPaths = ['/demo/', '/spa/', '/landing-demo/'];
        if (!knownPaths.some(p => normalizedUrl.includes(p))) {
          warnings.push({
            type: 'UNKNOWN_PAGE',
            url,
            file: relFile,
            message: `Link to "${url}" - page may not exist (verify manually)`
          });
        }
      }
    }
  }
  
  // Summary
  console.log('═'.repeat(60));
  console.log('📊 INTERNAL LINK VALIDATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`   Total links scanned: ${allLinks.length}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);
  console.log('═'.repeat(60));
  
  // Group errors by type
  const errorsByType = {};
  for (const err of errors) {
    if (!errorsByType[err.type]) errorsByType[err.type] = [];
    errorsByType[err.type].push(err);
  }
  
  if (Object.keys(errorsByType).length > 0) {
    console.log('\n❌ ERRORS:\n');
    
    for (const [type, errs] of Object.entries(errorsByType)) {
      console.log(`   ${type} (${errs.length}):`);
      for (const err of errs.slice(0, 10)) {
        console.log(`   - ${err.message}`);
        console.log(`     File: ${err.file}`);
      }
      if (errs.length > 10) {
        console.log(`   ... and ${errs.length - 10} more`);
      }
      console.log('');
    }
  }
  
  if (warnings.length > 0 && warnings.length <= 20) {
    console.log('\n⚠️  WARNINGS:\n');
    for (const warn of warnings.slice(0, 10)) {
      console.log(`   - ${warn.message}`);
      console.log(`     File: ${warn.file}`);
    }
    if (warnings.length > 10) {
      console.log(`   ... and ${warnings.length - 10} more`);
    }
  }
  
  // Exit status
  console.log('');
  if (errors.length > 0) {
    console.log('❌ INTERNAL LINK VALIDATION FAILED!');
    console.log('   Fix the broken links before deploying.\n');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log('⚠️  INTERNAL LINK VALIDATION PASSED WITH WARNINGS');
    console.log('   Some links could not be verified - check manually.\n');
    process.exit(0);
  } else {
    console.log('✅ INTERNAL LINK VALIDATION PASSED!');
    console.log('   All internal links are valid.\n');
    process.exit(0);
  }
}

validateInternalLinks();
