/**
 * Validate Open Graph and Twitter Card Tags in Build Output
 * Ensures all pages have proper social media metadata
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BASE_URL = 'https://whimsylabs.ai';
const RECOMMENDED_IMAGE_WIDTH = 1200;
const RECOMMENDED_IMAGE_HEIGHT = 630;

function extractMetaTags(html) {
  const ogTags = {};
  const twitterTags = {};

  // Extract Open Graph tags
  const ogRegex = /<meta property="og:([^"]+)" content="([^"]+)">/g;
  let match;
  while ((match = ogRegex.exec(html)) !== null) {
    ogTags[match[1]] = match[2];
  }

  // Extract Twitter Card tags
  const twitterRegex = /<meta name="twitter:([^"]+)" content="([^"]+)">/g;
  while ((match = twitterRegex.exec(html)) !== null) {
    twitterTags[match[1]] = match[2];
  }

  return { ogTags, twitterTags };
}

function validatePageOpenGraph(pagePath, expectedPath) {
  const html = fs.readFileSync(pagePath, 'utf8');
  const { ogTags, twitterTags } = extractMetaTags(html);

  const errors = [];
  const warnings = [];

  // Determine if this is a blog post
  const isBlogPost = expectedPath.includes('/blog/') && expectedPath !== '/blog/';

  // Required Open Graph tags
  if (!ogTags.title) {
    errors.push('Missing og:title');
  }

  if (!ogTags.description) {
    errors.push('Missing og:description');
  }

  if (!ogTags.url) {
    errors.push('Missing og:url');
  } else {
    // Validate og:url format
    if (!ogTags.url.startsWith('https://')) {
      errors.push('og:url not using HTTPS');
    }
    if (!ogTags.url.startsWith(BASE_URL)) {
      errors.push(`og:url not using correct domain: ${ogTags.url}`);
    }
  }

  if (!ogTags.type) {
    warnings.push('Missing og:type');
  } else {
    // Validate og:type based on page type
    if (isBlogPost && ogTags.type !== 'article') {
      warnings.push(`Blog post should have og:type="article", found "${ogTags.type}"`);
    } else if (!isBlogPost && ogTags.type !== 'website') {
      warnings.push(`Non-blog page should have og:type="website", found "${ogTags.type}"`);
    }
  }

  if (!ogTags.image) {
    errors.push('Missing og:image');
  } else {
    // Validate image URL
    if (!ogTags.image.startsWith('https://')) {
      errors.push('og:image not using HTTPS');
    }
    if (!ogTags.image.startsWith(BASE_URL)) {
      warnings.push(`og:image not using correct domain: ${ogTags.image}`);
    }
  }

  // Check for image dimensions
  if (!ogTags['image:width']) {
    warnings.push('Missing og:image:width (recommended for better social sharing)');
  } else if (parseInt(ogTags['image:width']) !== RECOMMENDED_IMAGE_WIDTH) {
    warnings.push(`og:image:width is ${ogTags['image:width']}, recommended is ${RECOMMENDED_IMAGE_WIDTH}`);
  }

  if (!ogTags['image:height']) {
    warnings.push('Missing og:image:height (recommended for better social sharing)');
  } else if (parseInt(ogTags['image:height']) !== RECOMMENDED_IMAGE_HEIGHT) {
    warnings.push(`og:image:height is ${ogTags['image:height']}, recommended is ${RECOMMENDED_IMAGE_HEIGHT}`);
  }

  // Check for locale
  if (!ogTags.locale) {
    warnings.push('Missing og:locale (recommended for international SEO)');
  }

  // Check for site_name
  if (!ogTags.site_name) {
    warnings.push('Missing og:site_name (recommended)');
  }

  // Twitter Card validation
  if (!twitterTags.card) {
    warnings.push('Missing twitter:card');
  } else if (twitterTags.card !== 'summary_large_image' && twitterTags.card !== 'summary') {
    warnings.push(`twitter:card should be "summary_large_image" or "summary", found "${twitterTags.card}"`);
  }

  if (!twitterTags.title) {
    warnings.push('Missing twitter:title');
  }

  if (!twitterTags.description) {
    warnings.push('Missing twitter:description');
  }

  if (!twitterTags.image) {
    warnings.push('Missing twitter:image');
  } else {
    if (!twitterTags.image.startsWith('https://')) {
      errors.push('twitter:image not using HTTPS');
    }
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    ogTags,
    twitterTags
  };
}

function validateOpenGraph() {
  console.log('🔍 Validating Open Graph and Twitter Card tags in build output...');

  const buildDir = path.join(__dirname, '..', 'build');

  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run npm run build-static first.');
    return false;
  }

  // Find all HTML files in build
  const htmlFiles = glob.sync(path.join(buildDir, '**/index.html').replace(/\\/g, '/'));

  if (htmlFiles.length === 0) {
    console.error('❌ No HTML files found in build directory');
    return false;
  }

  console.log(`📄 Found ${htmlFiles.length} HTML files to validate\n`);

  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  // Pages to skip validation (special pages that don't need Open Graph tags)
  const skipPages = ['/spa/', '/demo/'];

  // Validate each HTML file
  htmlFiles.forEach(filePath => {
    // Extract expected path from file location
    const relativePath = path.relative(buildDir, path.dirname(filePath));
    const expectedPath = '/' + relativePath.replace(/\\/g, '/') + '/';
    const normalizedPath = expectedPath.replace(/\/+/g, '/').replace(/\/$/, '/');

    // Skip special pages that don't need Open Graph tags
    if (skipPages.includes(normalizedPath)) {
      return;
    }

    const pageName = normalizedPath === '/' ? 'Homepage' : normalizedPath;

    const result = validatePageOpenGraph(filePath, normalizedPath);

    results.push({
      page: pageName,
      ...result
    });

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  });

  // Print results
  console.log('📊 Open Graph Validation Results:');
  console.log('==================================\n');

  const passed = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const withWarnings = results.filter(r => r.warnings.length > 0);

  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`⚠️  With warnings: ${withWarnings.length}\n`);

  // Show failures (limit to first 20)
  if (failed.length > 0) {
    console.log('❌ ERRORS:\n');
    failed.slice(0, 20).forEach(result => {
      console.log(`  ${result.page}:`);
      result.errors.forEach(error => console.log(`    - ${error}`));
      console.log('');
    });

    if (failed.length > 20) {
      console.log(`  ... and ${failed.length - 20} more pages with errors\n`);
    }
  }

  // Show warnings (limit to first 10)
  if (withWarnings.length > 0 && withWarnings.length <= 10) {
    console.log('⚠️  WARNINGS:\n');
    withWarnings.forEach(result => {
      console.log(`  ${result.page}:`);
      result.warnings.forEach(warning => console.log(`    - ${warning}`));
      console.log('');
    });
  } else if (withWarnings.length > 10) {
    console.log(`⚠️  ${withWarnings.length} pages have warnings (run with --verbose to see all)\n`);
  }

  // Summary
  console.log('📈 Summary:');
  console.log(`   Total pages: ${results.length}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}\n`);

  if (failed.length === 0) {
    console.log('✅ All Open Graph tags are valid!');
    if (totalWarnings > 0) {
      console.log(`⚠️  Consider addressing ${totalWarnings} warnings for better social sharing`);
    }
    return true;
  } else {
    console.log('❌ Open Graph validation failed');
    console.log('💡 Fix the errors in metadata-injector.js and rebuild');
    return false;
  }
}

// Run validation if called directly
if (require.main === module) {
  const success = validateOpenGraph();
  process.exit(success ? 0 : 1);
}

module.exports = validateOpenGraph;
