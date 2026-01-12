/**
 * Validate hreflang Tags in Build Output
 * Ensures all pages have proper hreflang tags for international SEO
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SUPPORTED_LANGUAGES = ['en', 'de', 'es', 'fr', 'ja'];
const BASE_URL = 'https://whimsylabs.ai';

function extractHreflangTags(html) {
  const hreflangRegex = /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g;
  const tags = [];
  let match;

  while ((match = hreflangRegex.exec(html)) !== null) {
    tags.push({
      lang: match[1],
      href: match[2]
    });
  }

  return tags;
}

function extractCanonical(html) {
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)">/);
  return canonicalMatch ? canonicalMatch[1] : null;
}

function validatePageHreflang(pagePath, expectedPath) {
  const html = fs.readFileSync(pagePath, 'utf8');

  const hreflangTags = extractHreflangTags(html);
  const canonical = extractCanonical(html);

  const errors = [];
  const warnings = [];

  // Check if has any hreflang tags
  if (hreflangTags.length === 0) {
    errors.push('No hreflang tags found');
    return { success: false, errors, warnings, hreflangTags, canonical };
  }

  // Should have 6 tags: 5 languages + x-default
  const expectedCount = SUPPORTED_LANGUAGES.length + 1; // +1 for x-default
  if (hreflangTags.length !== expectedCount) {
    warnings.push(`Expected ${expectedCount} hreflang tags, found ${hreflangTags.length}`);
  }

  // Check for all required languages
  const foundLanguages = hreflangTags.map(t => t.lang).filter(l => l !== 'x-default');
  SUPPORTED_LANGUAGES.forEach(lang => {
    if (!foundLanguages.includes(lang)) {
      errors.push(`Missing hreflang for language: ${lang}`);
    }
  });

  // Check for x-default
  const xDefault = hreflangTags.find(t => t.lang === 'x-default');
  if (!xDefault) {
    errors.push('Missing x-default hreflang');
  } else {
    // x-default should point to English version
    const expectedEnUrl = expectedPath.replace(/^\/(de|es|fr|jp)\//, '/');
    const normalizedExpected = `${BASE_URL}${expectedEnUrl}`.replace(/([^:]\/)\/+/g, '$1');

    if (xDefault.href !== normalizedExpected) {
      warnings.push(`x-default points to ${xDefault.href}, expected ${normalizedExpected}`);
    }
  }

  // Check for self-referencing hreflang
  const currentLang = expectedPath.match(/^\/(de|es|fr|jp)\//);
  const selfLang = currentLang ? currentLang[1] : 'en';
  const selfLangMapping = { 'jp': 'ja' }; // jp folder uses ja hreflang
  const expectedSelfLang = selfLangMapping[selfLang] || selfLang;

  const selfRef = hreflangTags.find(t => t.lang === expectedSelfLang);
  if (!selfRef) {
    warnings.push(`Missing self-referencing hreflang for ${expectedSelfLang}`);
  } else {
    const expectedSelfUrl = `${BASE_URL}${expectedPath}`.replace(/([^:]\/)\/+/g, '$1');
    if (selfRef.href !== expectedSelfUrl) {
      warnings.push(`Self-referencing hreflang incorrect: ${selfRef.href} vs ${expectedSelfUrl}`);
    }
  }

  // Check all hreflang URLs are valid format
  hreflangTags.forEach(tag => {
    if (!tag.href.startsWith('https://')) {
      errors.push(`hreflang for ${tag.lang} not using HTTPS: ${tag.href}`);
    }
    if (!tag.href.startsWith(BASE_URL)) {
      errors.push(`hreflang for ${tag.lang} not using correct domain: ${tag.href}`);
    }
  });

  // Check canonical tag
  if (!canonical) {
    errors.push('Missing canonical tag');
  } else {
    const expectedCanonical = `${BASE_URL}${expectedPath}`.replace(/([^:]\/)\/+/g, '$1');
    if (canonical !== expectedCanonical) {
      warnings.push(`Canonical mismatch: ${canonical} vs ${expectedCanonical}`);
    }
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    hreflangTags,
    canonical
  };
}

function validateHreflang() {
  console.log('🔍 Validating hreflang tags in build output...');

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

  // Pages to skip validation (special pages that don't need hreflang)
  const skipPages = ['/spa/', '/demo/'];

  // Validate each HTML file
  htmlFiles.forEach(filePath => {
    // Extract expected path from file location
    const relativePath = path.relative(buildDir, path.dirname(filePath));
    const expectedPath = '/' + relativePath.replace(/\\/g, '/') + '/';
    const normalizedPath = expectedPath.replace(/\/+/g, '/').replace(/\/$/, '/');

    // Skip special pages that don't need hreflang tags
    if (skipPages.includes(normalizedPath)) {
      return;
    }

    const pageName = normalizedPath === '/' ? 'Homepage' : normalizedPath;

    const result = validatePageHreflang(filePath, normalizedPath);

    results.push({
      page: pageName,
      ...result
    });

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  });

  // Print results
  console.log('📊 hreflang Validation Results:');
  console.log('================================\n');

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
    console.log('✅ All hreflang tags are valid!');
    if (totalWarnings > 0) {
      console.log(`⚠️  Consider reviewing ${totalWarnings} warnings`);
    }
    return true;
  } else {
    console.log('❌ hreflang validation failed');
    console.log('💡 Fix the errors in metadata-injector.js and rebuild');
    return false;
  }
}

// Run validation if called directly
if (require.main === module) {
  const success = validateHreflang();
  process.exit(success ? 0 : 1);
}

module.exports = validateHreflang;
