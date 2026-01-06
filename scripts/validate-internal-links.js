/**
 * Validate Internal Links in Build Output
 * Ensures all internal links are valid and follow URL conventions
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BASE_URL = 'https://whimsylabs.ai';

function extractInternalLinks(html, currentPage) {
  const links = [];

  // Match href attributes in anchor tags
  const hrefRegex = /<a[^>]+href="([^"]+)"[^>]*>/g;
  let match;

  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1];

    // Skip external links, anchors, and mailto/tel
    if (href.startsWith('http') && !href.startsWith(BASE_URL)) continue;
    if (href.startsWith('#')) continue;
    if (href.startsWith('mailto:')) continue;
    if (href.startsWith('tel:')) continue;

    // Normalize the link
    let normalizedLink = href;

    // Remove domain if present
    if (normalizedLink.startsWith(BASE_URL)) {
      normalizedLink = normalizedLink.substring(BASE_URL.length);
    }

    // Ensure it starts with /
    if (!normalizedLink.startsWith('/')) {
      normalizedLink = '/' + normalizedLink;
    }

    // Remove query strings and anchors for validation
    normalizedLink = normalizedLink.split('?')[0].split('#')[0];

    links.push({
      original: href,
      normalized: normalizedLink,
      page: currentPage
    });
  }

  return links;
}

function buildPageMap(buildDir) {
  const pageMap = new Map();

  // Find all index.html files
  const htmlFiles = glob.sync(path.join(buildDir, '**/index.html').replace(/\\/g, '/'));

  htmlFiles.forEach(filePath => {
    const relativePath = path.relative(buildDir, path.dirname(filePath));
    const pagePath = '/' + relativePath.replace(/\\/g, '/') + '/';
    const normalizedPath = pagePath.replace(/\/+/g, '/');

    pageMap.set(normalizedPath, filePath);

    // Also map without trailing slash
    const withoutSlash = normalizedPath.replace(/\/$/, '');
    if (withoutSlash) {
      pageMap.set(withoutSlash, filePath);
    }
  });

  return pageMap;
}

function validatePageLinks(pagePath, pageUrl, pageMap) {
  const html = fs.readFileSync(pagePath, 'utf8');
  const links = extractInternalLinks(html, pageUrl);

  const errors = [];
  const warnings = [];

  links.forEach(link => {
    // Check for /en/ prefix (English shouldn't use it)
    if (link.normalized.startsWith('/en/')) {
      errors.push(`Link uses /en/ prefix (English pages should not): ${link.original}`);
    }

    // Check if link uses http instead of https
    if (link.original.startsWith('http://')) {
      errors.push(`Link uses HTTP instead of HTTPS: ${link.original}`);
    }

    // Check if the linked page exists
    const targetExists = pageMap.has(link.normalized) ||
                         pageMap.has(link.normalized + '/') ||
                         pageMap.has(link.normalized.replace(/\/$/, ''));

    if (!targetExists) {
      // Check if it's a valid asset or special file
      const isAsset = link.normalized.match(/\.(png|jpg|jpeg|gif|svg|pdf|mp4|webm|css|js)$/i);
      const isSpecial = link.normalized === '/404.html' || link.normalized === '/sitemap.xml';

      if (!isAsset && !isSpecial) {
        errors.push(`Broken link to non-existent page: ${link.original}`);
      }
    }

    // Check for missing trailing slash on valid pages
    if (targetExists && !link.normalized.endsWith('/') && !link.normalized.match(/\.[a-z]+$/i)) {
      warnings.push(`Link missing trailing slash: ${link.original} (should be ${link.normalized}/)`);
    }
  });

  return {
    success: errors.length === 0,
    errors,
    warnings,
    linkCount: links.length
  };
}

function findOrphanedPages(pageMap, allLinks) {
  const linkedPages = new Set();

  // Add homepage (never orphaned)
  linkedPages.add('/');

  // Collect all linked pages
  allLinks.forEach(link => {
    linkedPages.add(link.normalized);
    linkedPages.add(link.normalized + '/');
    linkedPages.add(link.normalized.replace(/\/$/, ''));
  });

  const orphanedPages = [];

  pageMap.forEach((filePath, pageUrl) => {
    // Skip special pages
    if (pageUrl === '/' || pageUrl === '/404/' || pageUrl.includes('/static/')) {
      return;
    }

    // Check if this page is linked from anywhere
    const isLinked = linkedPages.has(pageUrl) ||
                     linkedPages.has(pageUrl + '/') ||
                     linkedPages.has(pageUrl.replace(/\/$/, ''));

    if (!isLinked) {
      orphanedPages.push(pageUrl);
    }
  });

  return orphanedPages;
}

function validateInternalLinks() {
  console.log('🔍 Validating internal links in build output...');

  const buildDir = path.join(__dirname, '..', 'build');

  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run npm run build-static first.');
    return false;
  }

  // Build map of all valid pages
  const pageMap = buildPageMap(buildDir);
  console.log(`📄 Found ${pageMap.size} valid pages\n`);

  const results = [];
  const allLinks = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalLinks = 0;

  // Validate links in each page
  pageMap.forEach((filePath, pageUrl) => {
    const result = validatePageLinks(filePath, pageUrl, pageMap);

    // Extract links for orphan detection
    const html = fs.readFileSync(filePath, 'utf8');
    const links = extractInternalLinks(html, pageUrl);
    allLinks.push(...links);

    results.push({
      page: pageUrl,
      ...result
    });

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
    totalLinks += result.linkCount;
  });

  // Find orphaned pages
  const orphanedPages = findOrphanedPages(pageMap, allLinks);

  // Print results
  console.log('📊 Internal Link Validation Results:');
  console.log('=====================================\n');

  const passed = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const withWarnings = results.filter(r => r.warnings.length > 0);

  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`⚠️  With warnings: ${withWarnings.length}`);
  console.log(`🔗 Total internal links checked: ${totalLinks}\n`);

  // Show failures (limit to first 20)
  if (failed.length > 0) {
    console.log('❌ ERRORS:\n');
    failed.slice(0, 20).forEach(result => {
      if (result.errors.length > 0) {
        console.log(`  ${result.page}:`);
        result.errors.slice(0, 5).forEach(error => console.log(`    - ${error}`));
        if (result.errors.length > 5) {
          console.log(`    ... and ${result.errors.length - 5} more errors`);
        }
        console.log('');
      }
    });

    if (failed.length > 20) {
      console.log(`  ... and ${failed.length - 20} more pages with errors\n`);
    }
  }

  // Show warnings (limit to first 10)
  if (withWarnings.length > 0 && withWarnings.length <= 10) {
    console.log('⚠️  WARNINGS:\n');
    withWarnings.forEach(result => {
      if (result.warnings.length > 0) {
        console.log(`  ${result.page}:`);
        result.warnings.slice(0, 3).forEach(warning => console.log(`    - ${warning}`));
        if (result.warnings.length > 3) {
          console.log(`    ... and ${result.warnings.length - 3} more warnings`);
        }
        console.log('');
      }
    });
  } else if (withWarnings.length > 10) {
    console.log(`⚠️  ${withWarnings.length} pages have warnings\n`);
  }

  // Show orphaned pages
  if (orphanedPages.length > 0) {
    console.log('🔍 ORPHANED PAGES (no incoming links):\n');
    orphanedPages.slice(0, 10).forEach(page => {
      console.log(`  - ${page}`);
    });
    if (orphanedPages.length > 10) {
      console.log(`  ... and ${orphanedPages.length - 10} more orphaned pages\n`);
    }
  }

  // Summary
  console.log('📈 Summary:');
  console.log(`   Total pages: ${pageMap.size}`);
  console.log(`   Total links: ${totalLinks}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);
  console.log(`   Orphaned pages: ${orphanedPages.length}\n`);

  if (failed.length === 0) {
    console.log('✅ All internal links are valid!');
    if (totalWarnings > 0) {
      console.log(`⚠️  Consider fixing ${totalWarnings} warnings for better consistency`);
    }
    if (orphanedPages.length > 0) {
      console.log(`🔍 ${orphanedPages.length} orphaned pages found (not linked from anywhere)`);
    }
    return true;
  } else {
    console.log('❌ Internal link validation failed');
    console.log('💡 Fix broken links and rebuild');
    return false;
  }
}

// Run validation if called directly
if (require.main === module) {
  const success = validateInternalLinks();
  process.exit(success ? 0 : 1);
}

module.exports = validateInternalLinks;
