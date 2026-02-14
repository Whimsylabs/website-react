/**
 * Validate Internal Linking Health
 * Ensures pages have sufficient internal links for SEO
 * 
 * Checks:
 * 1. Every page has at least N internal links pointing to it
 * 2. Blog posts link to other relevant blog posts
 * 3. Orphan pages (no internal links) are flagged
 * 4. Language versions are cross-linked
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../build');
const MIN_INTERNAL_LINKS = 2; // Minimum links a page should have pointing to it
const LANGUAGES = ['', 'de', 'es', 'fr', 'jp'];

// Pages that are OK to have fewer links (utility pages)
const EXCLUDED_PAGES = [
  '/privacy/',
  '/data-security/',
  '/404.html',
  '/index.html'
];

/**
 * Recursively find all HTML files
 */
function findHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && !['static', 'node_modules', '.git'].includes(entry.name)) {
      findHtmlFiles(fullPath, files);
    } else if (entry.name === 'index.html') {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Extract all internal links from HTML content
 */
function extractLinks(content, baseUrl) {
  const links = new Set();
  
  // Match href="/..." patterns
  const hrefPattern = /href=["'](\/[^"'#?]*)/g;
  let match;
  
  while ((match = hrefPattern.exec(content)) !== null) {
    let url = match[1];
    // Normalize: ensure trailing slash for directories
    if (!url.endsWith('/') && !url.includes('.')) {
      url += '/';
    }
    links.add(url);
  }
  
  return links;
}

/**
 * Convert file path to URL path
 */
function fileToUrl(filePath) {
  const relativePath = path.relative(BUILD_DIR, path.dirname(filePath));
  return '/' + relativePath.replace(/\\/g, '/') + '/';
}

/**
 * Check if a page should be excluded from validation
 */
function shouldExclude(urlPath) {
  for (const excluded of EXCLUDED_PAGES) {
    if (urlPath.includes(excluded) || urlPath.endsWith(excluded)) {
      return true;
    }
  }
  // Exclude language root pages from minimum link requirement
  // (they're landing pages that link out, not necessarily linked to)
  if (LANGUAGES.some(lang => urlPath === `/${lang}/` || urlPath === '/')) {
    return true;
  }
  return false;
}

function validateInternalLinking() {
  console.log('\n🔗 Validating internal linking health...\n');
  
  if (!fs.existsSync(BUILD_DIR)) {
    console.log('⚠️  Build directory not found. Run build first.\n');
    process.exit(0);
  }
  
  const errors = [];
  const warnings = [];
  
  // Find all HTML files
  console.log('📋 Phase 1: Scanning HTML files...');
  const htmlFiles = findHtmlFiles(BUILD_DIR);
  console.log(`   Found ${htmlFiles.length} HTML pages\n`);
  
  // Build a map of all pages and their incoming links
  console.log('📋 Phase 2: Analyzing link structure...');
  const pageUrls = new Map(); // url -> { file, content }
  const incomingLinks = new Map(); // url -> Set of pages linking to it
  const outgoingLinks = new Map(); // url -> Set of pages it links to
  
  // First pass: collect all pages
  for (const file of htmlFiles) {
    const url = fileToUrl(file);
    const content = fs.readFileSync(file, 'utf8');
    pageUrls.set(url, { file, content });
    incomingLinks.set(url, new Set());
    outgoingLinks.set(url, new Set());
  }
  
  // Second pass: analyze links
  for (const [sourceUrl, { content }] of pageUrls) {
    const links = extractLinks(content, sourceUrl);
    
    for (const targetUrl of links) {
      // Only count links to pages that exist
      if (pageUrls.has(targetUrl)) {
        outgoingLinks.get(sourceUrl).add(targetUrl);
        incomingLinks.get(targetUrl).add(sourceUrl);
      }
    }
  }
  
  console.log(`   Analyzed ${pageUrls.size} pages\n`);
  
  // Phase 3: Check for orphan pages (no incoming links)
  console.log('📋 Phase 3: Checking for orphan pages...');
  const orphanPages = [];
  const lowLinkPages = [];
  
  for (const [url, incoming] of incomingLinks) {
    if (shouldExclude(url)) continue;
    
    if (incoming.size === 0) {
      orphanPages.push(url);
    } else if (incoming.size < MIN_INTERNAL_LINKS) {
      lowLinkPages.push({ url, count: incoming.size });
    }
  }
  
  console.log(`   Orphan pages (0 links): ${orphanPages.length}`);
  console.log(`   Low-link pages (<${MIN_INTERNAL_LINKS}): ${lowLinkPages.length}\n`);
  
  // Phase 4: Check blog posts link to other posts
  console.log('📋 Phase 4: Checking blog post cross-linking...');
  const blogPosts = [...pageUrls.keys()].filter(url => url.includes('/blog/') && !url.endsWith('/blog/'));
  let postsWithoutCrossLinks = 0;
  
  for (const postUrl of blogPosts) {
    const outgoing = outgoingLinks.get(postUrl);
    const linksToOtherPosts = [...outgoing].filter(url => 
      url.includes('/blog/') && url !== postUrl && !url.endsWith('/blog/')
    );
    
    if (linksToOtherPosts.length === 0) {
      postsWithoutCrossLinks++;
      warnings.push(`Blog post has no links to other posts: ${postUrl}`);
    }
  }
  
  console.log(`   Blog posts without cross-links: ${postsWithoutCrossLinks}\n`);
  
  // Phase 5: Check language cross-linking
  console.log('📋 Phase 5: Checking language version linking...');
  let missingLangLinks = 0;
  
  // Group pages by their base path (without language prefix)
  const pagesByBasePath = new Map();
  for (const url of pageUrls.keys()) {
    let basePath = url;
    for (const lang of LANGUAGES) {
      if (lang && url.startsWith(`/${lang}/`)) {
        basePath = url.replace(`/${lang}/`, '/');
        break;
      }
    }
    
    if (!pagesByBasePath.has(basePath)) {
      pagesByBasePath.set(basePath, []);
    }
    pagesByBasePath.get(basePath).push(url);
  }
  
  // Check that pages with multiple language versions have hreflang
  for (const [basePath, versions] of pagesByBasePath) {
    if (versions.length > 1) {
      for (const pageUrl of versions) {
        const { content } = pageUrls.get(pageUrl);
        const hasHreflang = content.includes('hreflang=');
        
        if (!hasHreflang) {
          missingLangLinks++;
          errors.push(`Page missing hreflang tags: ${pageUrl}`);
        }
      }
    }
  }
  
  console.log(`   Pages missing hreflang: ${missingLangLinks}\n`);
  
  // Summary
  console.log('═'.repeat(60));
  console.log('📊 INTERNAL LINKING VALIDATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`   Total pages: ${pageUrls.size}`);
  console.log(`   Orphan pages: ${orphanPages.length}`);
  console.log(`   Low-link pages: ${lowLinkPages.length}`);
  console.log(`   Blog posts without cross-links: ${postsWithoutCrossLinks}`);
  console.log(`   Missing hreflang: ${missingLangLinks}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);
  console.log('═'.repeat(60));
  
  // Report orphan pages
  if (orphanPages.length > 0) {
    console.log('\n🚨 ORPHAN PAGES (no internal links pointing to them):');
    for (const page of orphanPages.slice(0, 10)) {
      console.log(`   - ${page}`);
      warnings.push(`Orphan page: ${page}`);
    }
    if (orphanPages.length > 10) {
      console.log(`   ... and ${orphanPages.length - 10} more`);
    }
  }
  
  // Report low-link pages
  if (lowLinkPages.length > 0) {
    console.log('\n⚠️  LOW-LINK PAGES (fewer than ' + MIN_INTERNAL_LINKS + ' internal links):');
    for (const { url, count } of lowLinkPages.slice(0, 15)) {
      console.log(`   - ${url} (${count} links)`);
    }
    if (lowLinkPages.length > 15) {
      console.log(`   ... and ${lowLinkPages.length - 15} more`);
    }
  }
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    for (const err of errors.slice(0, 10)) {
      console.log(`   ${err}`);
    }
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more`);
    }
  }
  
  // Final result
  console.log('');
  if (errors.length > 0) {
    console.log('❌ INTERNAL LINKING VALIDATION FAILED!');
    console.log('   Fix hreflang issues before deploying.\n');
    process.exit(1);
  } else if (orphanPages.length > 0 || lowLinkPages.length > 20) {
    console.log('⚠️  INTERNAL LINKING VALIDATION PASSED WITH WARNINGS');
    console.log('   Consider adding more internal links to improve SEO.\n');
    process.exit(0);
  } else {
    console.log('✅ INTERNAL LINKING VALIDATION PASSED!');
    console.log('   Link structure looks healthy.\n');
    process.exit(0);
  }
}

validateInternalLinking();
