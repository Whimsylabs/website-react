/**
 * Validate Sitemap URLs
 * Ensures sitemap.xml has valid URLs and matches actual built files
 * 
 * Checks:
 * 1. No [object Object] or undefined in URLs
 * 2. All URLs are valid format
 * 3. Cross-checks sitemap URLs against actual built HTML files
 * 4. Reports pages missing from sitemap or sitemap entries without files
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../build');
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');
const BASE_URL = 'https://whimsylabs.ai';

// Pages to exclude from cross-check (non-HTML resources, special pages)
const EXCLUDED_PATHS = [
  '/index.html',           // Root is just /
  '/404.html',             // Error page, not in sitemap
  '/Two_Pager_Website.pdf' // PDF, not HTML
];

// Patterns to exclude (regex)
const EXCLUDED_PATTERNS = [
  /^\/static\//,           // Static assets
  /\.pdf$/,                // PDF files
  /\.json$/,               // JSON files
];

/**
 * Recursively find all index.html files in a directory
 */
function findAllHtmlPages(dir, baseDir = dir) {
  const pages = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules, static assets, etc.
        if (!['node_modules', 'static', '.git'].includes(entry.name)) {
          pages.push(...findAllHtmlPages(fullPath, baseDir));
        }
      } else if (entry.name === 'index.html') {
        // Convert file path to URL path
        const relativePath = path.relative(baseDir, dir);
        const urlPath = '/' + relativePath.replace(/\\/g, '/') + '/';
        pages.push(urlPath === '//' ? '/' : urlPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  
  return pages;
}

/**
 * Extract <loc> URLs from sitemap
 */
function extractSitemapUrls(content) {
  const locMatches = content.match(/<loc>([^<]+)<\/loc>/g) || [];
  return locMatches.map(m => m.replace(/<\/?loc>/g, ''));
}

/**
 * Convert full URL to path (e.g., https://whimsylabs.ai/blog/ -> /blog/)
 */
function urlToPath(url) {
  return url.replace(BASE_URL, '') || '/';
}

/**
 * Check if a path should be excluded from validation
 */
function shouldExclude(urlPath) {
  if (EXCLUDED_PATHS.includes(urlPath)) return true;
  for (const pattern of EXCLUDED_PATTERNS) {
    if (pattern.test(urlPath)) return true;
  }
  return false;
}

function validateSitemap() {
  console.log('\n🗺️  Validating sitemap.xml...\n');

  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('❌ sitemap.xml not found in build directory!');
    process.exit(1);
  }

  const content = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const errors = [];
  const warnings = [];

  // ═══════════════════════════════════════════════════════════════
  // PHASE 1: Basic URL validation
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 Phase 1: URL format validation...');

  // Check for [object Object] - common JS bug
  if (content.includes('[object Object]')) {
    const matches = content.match(/[^\n]*\[object Object\][^\n]*/g) || [];
    errors.push(`Found [object Object] in sitemap (${matches.length} occurrences)`);
    matches.slice(0, 3).forEach(m => {
      errors.push(`  → ${m.trim().substring(0, 100)}...`);
    });
  }

  // Check for undefined or null in URLs
  if (content.includes('undefined') || content.includes('null')) {
    errors.push('Found "undefined" or "null" in sitemap URLs');
  }

  // Extract all URLs
  const sitemapUrls = extractSitemapUrls(content);
  const hrefMatches = content.match(/href="([^"]+)"/g) || [];
  const hreflangUrls = hrefMatches.map(m => m.replace(/href="|"/g, ''));

  console.log(`   Found ${sitemapUrls.length} <loc> URLs`);
  console.log(`   Found ${hreflangUrls.length} hreflang URLs`);

  // Validate each URL format
  let invalidCount = 0;
  const seenUrls = new Set();

  for (const url of [...sitemapUrls, ...hreflangUrls]) {
    // Check URL format
    if (!url.startsWith('https://')) {
      errors.push(`Invalid URL (not HTTPS): ${url}`);
      invalidCount++;
      continue;
    }

    // Check for our domain
    if (!url.startsWith(BASE_URL)) {
      warnings.push(`URL not on our domain: ${url}`);
    }

    // Check for double slashes (except after https:)
    if (url.replace('https://', '').includes('//')) {
      errors.push(`Double slash in URL: ${url}`);
      invalidCount++;
    }

    // Check for spaces or invalid characters
    if (/\s/.test(url)) {
      errors.push(`Whitespace in URL: ${url}`);
      invalidCount++;
    }

    // Check URL is valid
    try {
      new URL(url);
    } catch (e) {
      errors.push(`Malformed URL: ${url}`);
      invalidCount++;
    }

    seenUrls.add(url);
  }

  console.log(`   ✓ URL format check complete (${invalidCount} invalid)\n`);

  // ═══════════════════════════════════════════════════════════════
  // PHASE 2: Cross-check with built files
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 Phase 2: Cross-checking with built HTML files...');

  // Find all built HTML pages
  const builtPages = findAllHtmlPages(BUILD_DIR);
  const builtPaths = new Set(builtPages.filter(p => !shouldExclude(p)));
  
  // Convert sitemap URLs to paths
  const sitemapPaths = new Set(sitemapUrls.map(urlToPath));

  console.log(`   Built HTML pages: ${builtPages.length}`);
  console.log(`   Sitemap URLs: ${sitemapUrls.length}`);
  console.log(`   After exclusions: ${builtPaths.size} pages to check\n`);

  // Find pages in build but NOT in sitemap
  const missingFromSitemap = [];
  for (const builtPath of builtPaths) {
    if (!sitemapPaths.has(builtPath)) {
      missingFromSitemap.push(builtPath);
    }
  }

  // Find URLs in sitemap but NOT in build (potential 404s)
  const missingFromBuild = [];
  for (const sitemapPath of sitemapPaths) {
    // Normalize path for comparison (handle trailing slashes)
    const normalizedPath = sitemapPath.endsWith('/') ? sitemapPath : sitemapPath + '/';
    const pathWithoutSlash = sitemapPath.endsWith('/') ? sitemapPath.slice(0, -1) : sitemapPath;
    
    if (!builtPaths.has(normalizedPath) && !builtPaths.has(pathWithoutSlash) && !builtPaths.has(sitemapPath)) {
      // Double-check by looking for the actual file
      const possiblePaths = [
        path.join(BUILD_DIR, sitemapPath, 'index.html'),
        path.join(BUILD_DIR, sitemapPath + '/index.html'),
        path.join(BUILD_DIR, pathWithoutSlash, 'index.html')
      ];
      
      const exists = possiblePaths.some(p => fs.existsSync(p));
      if (!exists) {
        missingFromBuild.push(sitemapPath);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASE 3: Required pages check
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 Phase 3: Checking required pages...');
  
  const requiredPages = [
    '/',
    '/features/',
    '/services/',
    '/faq/',
    '/contact/',
    '/blog/',
    '/privacy/',
    '/bett/'
  ];
  
  const languages = ['', '/es', '/fr', '/de', '/jp'];
  
  for (const lang of languages) {
    for (const page of requiredPages) {
      const fullPath = lang + page;
      const fullUrl = BASE_URL + fullPath;
      if (!seenUrls.has(fullUrl)) {
        warnings.push(`Missing required page from sitemap: ${fullUrl}`);
      }
    }
  }
  
  console.log(`   ✓ Required pages check complete\n`);

  // ═══════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════

  console.log('═'.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`   Total unique sitemap URLs: ${seenUrls.size}`);
  console.log(`   Built HTML pages: ${builtPaths.size}`);
  console.log(`   Invalid URL formats: ${invalidCount}`);
  console.log(`   Pages missing from sitemap: ${missingFromSitemap.length}`);
  console.log(`   Sitemap URLs without files: ${missingFromBuild.length}`);
  console.log(`   Other errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);
  console.log('═'.repeat(60));

  // Report missing from sitemap
  if (missingFromSitemap.length > 0) {
    console.log('\n⚠️  PAGES MISSING FROM SITEMAP (built but not in sitemap):');
    missingFromSitemap.sort().forEach(p => {
      console.log(`   - ${BASE_URL}${p}`);
    });
    // This is a warning, not an error - page exists but Google won't find it easily
    warnings.push(`${missingFromSitemap.length} pages missing from sitemap`);
  }

  // Report sitemap URLs without files (these are ERRORS - potential 404s!)
  if (missingFromBuild.length > 0) {
    console.log('\n❌ SITEMAP URLs WITHOUT BUILT FILES (will cause 404):');
    missingFromBuild.forEach(p => {
      console.log(`   - ${BASE_URL}${p}`);
      errors.push(`Sitemap contains URL without built file: ${BASE_URL}${p}`);
    });
  }

  // Show other warnings
  if (warnings.length > 0 && missingFromSitemap.length === 0) {
    console.log('\n⚠️  Warnings:');
    warnings.slice(0, 10).forEach(w => console.log(`   ${w}`));
    if (warnings.length > 10) {
      console.log(`   ... and ${warnings.length - 10} more warnings`);
    }
  }

  // Show errors
  if (errors.length > 0 && missingFromBuild.length === 0) {
    console.log('\n❌ Errors:');
    errors.slice(0, 10).forEach(e => console.log(`   ${e}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more errors`);
    }
  }

  // Final result
  console.log('');
  if (missingFromBuild.length > 0) {
    console.log('❌ SITEMAP VALIDATION FAILED!');
    console.log('   Sitemap contains URLs that will 404. Fix before deploying.\n');
    process.exit(1);
  } else if (missingFromSitemap.length > 0) {
    console.log('⚠️  SITEMAP VALIDATION PASSED WITH WARNINGS');
    console.log('   Some pages are not in sitemap - Google may not discover them.\n');
    // Don't fail build, but warn
    process.exit(0);
  } else if (errors.length > 0) {
    console.log('❌ SITEMAP VALIDATION FAILED!\n');
    process.exit(1);
  } else {
    console.log('✅ SITEMAP VALIDATION PASSED!');
    console.log('   All sitemap URLs have corresponding built files.\n');
    process.exit(0);
  }
}

validateSitemap();
