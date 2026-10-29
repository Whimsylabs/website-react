/**
 * Validate hreflang Tags in Build Output
 * Ensures all pages have proper hreflang tags for international SEO
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SUPPORTED_LANGUAGES = ['en', 'de', 'es', 'fr', 'ja'];
const BASE_URL = 'https://whimsylabs.ai';
// Per-post language allowlist (keyed by slug, build codes en/es/fr/de/jp).
const blogPostLanguageRestrictions = require('../src/i18n/blogPostLanguageRestrictions.json');
// Static routes published in English only (no translated copy exists).
const englishOnlyRoutes = require('../src/i18n/englishOnlyRoutes.json');
const BUILD_TO_HREFLANG = { jp: 'ja' };

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

  // Skip redirect stubs / noindex pages - they intentionally have no hreflang
  if (/http-equiv=["']refresh["']/i.test(html) || /name=["']robots["'][^>]*noindex/i.test(html)) {
    return { success: true, errors: [], warnings: [], hreflangTags: [], canonical: null, skipped: true };
  }

  const hreflangTags = extractHreflangTags(html);
  const canonical = extractCanonical(html);

  const errors = [];
  const warnings = [];

  // Region-specific posts only need hreflang for the languages they are published in.
  // (Only the English URL of a restricted post is generated; localized ones are redirect stubs, skipped above.)
  const blogSlugMatch = expectedPath.match(/^\/blog\/([^/]+)\/$/);
  const restrictedTo = blogSlugMatch ? blogPostLanguageRestrictions[blogSlugMatch[1]] : null;

  // English-only static routes are built for English alone, so they should
  // carry a self-referencing hreflang and x-default only.
  const isEnglishOnlyRoute = englishOnlyRoutes.includes(expectedPath.replace(/\/$/, ''));

  const requiredLanguages = isEnglishOnlyRoute
    ? ['en']
    : restrictedTo
      ? restrictedTo.map(code => BUILD_TO_HREFLANG[code] || code)
      : SUPPORTED_LANGUAGES;

  // Check if has any hreflang tags
  if (hreflangTags.length === 0) {
    errors.push('No hreflang tags found');
    return { success: false, errors, warnings, hreflangTags, canonical };
  }

  // Should have requiredLanguages + x-default
  const expectedCount = requiredLanguages.length + 1; // +1 for x-default
  if (hreflangTags.length !== expectedCount) {
    warnings.push(`Expected ${expectedCount} hreflang tags, found ${hreflangTags.length}`);
  }

  // Check for all required languages
  const foundLanguages = hreflangTags.map(t => t.lang).filter(l => l !== 'x-default');
  requiredLanguages.forEach(lang => {
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
      errors.push(`x-default points to ${xDefault.href}, expected ${normalizedExpected}`);
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
      errors.push(`Self-referencing hreflang incorrect: ${selfRef.href} vs ${expectedSelfUrl}`);
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
      errors.push(`Canonical mismatch: ${canonical} vs ${expectedCanonical}`);
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

// ISO 639-1 two-letter language codes. Anything else in an hreflang attribute
// (notably "jp", which is a country code - Japanese is "ja") is invalid and is
// silently ignored by Google, which drops the whole cluster.
const ISO_639_1 = new Set((
  'aa ab ae af ak am an ar as av ay az ba be bg bh bi bm bn bo br bs ca ce ch co cr cs cu cv cy ' +
  'da de dv dz ee el en eo es et eu fa ff fi fj fo fr fy ga gd gl gn gu gv ha he hi ho hr ht hu ' +
  'hy hz ia id ie ig ii ik io is it iu ja jv ka kg ki kj kk kl km kn ko kr ks ku kv kw ky la lb ' +
  'lg li ln lo lt lu lv mg mh mi mk ml mn mr ms mt my na nb nd ne ng nl nn no nr nv ny oc oj om ' +
  'or os pa pi pl ps pt qu rm rn ro ru rw sa sc sd se sg si sk sl sm sn so sq sr ss st su sv sw ' +
  'ta te tg th ti tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa wo xh yi yo za zh zu'
).split(' '));

/**
 * Validate build/sitemap.xml hreflang alternates.
 *
 * The sitemap is a second, independent declaration of the hreflang cluster, so it
 * can drift from the <head> tags. Checks: valid ISO 639-1 codes (no "jp"),
 * an x-default wherever an English variant exists, and trailing slashes everywhere.
 */
function validateSitemapHreflang(buildDir) {
  const errors = [];
  const sitemapPath = path.join(buildDir, 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    return { errors: ['sitemap.xml not found in build directory'], urlCount: 0 };
  }

  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  const badCodes = new Map(); // invalid code -> example loc
  let missingXDefault = 0;
  let firstMissingXDefault = null;
  const missingSlashes = new Set();

  urlBlocks.forEach(block => {
    const locMatch = block.match(/<loc>\s*(.*?)\s*<\/loc>/);
    const loc = locMatch ? locMatch[1] : '(no <loc>)';

    // (c) <loc> must end with a trailing slash
    if (locMatch && !loc.endsWith('/')) {
      missingSlashes.add(`<loc> ${loc}`);
    }

    const alternates = [];
    const altPattern = /<xhtml:link[^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/g;
    let match;
    while ((match = altPattern.exec(block)) !== null) {
      alternates.push({ lang: match[1], href: match[2] });
    }

    if (alternates.length === 0) return;

    alternates.forEach(({ lang, href }) => {
      // (a) hreflang code must be ISO 639-1 (optionally with a region) or x-default
      const base = lang.split('-')[0].toLowerCase();
      if (lang !== 'x-default' && !ISO_639_1.has(base)) {
        if (!badCodes.has(lang)) badCodes.set(lang, loc);
      }
      // (c) alternate hrefs must end with a trailing slash
      if (!href.endsWith('/')) {
        missingSlashes.add(`hreflang="${lang}" ${href}`);
      }
    });

    // (b) an English variant means there must be an x-default
    const hasEnglish = alternates.some(a => a.lang === 'en' || a.lang.toLowerCase().startsWith('en-'));
    const hasXDefault = alternates.some(a => a.lang === 'x-default');
    if (hasEnglish && !hasXDefault) {
      missingXDefault++;
      if (!firstMissingXDefault) firstMissingXDefault = loc;
    }
  });

  badCodes.forEach((exampleLoc, code) => {
    const hint = code === 'jp'
      ? ' - "jp" is a country code; Japanese must use "ja"'
      : ' - not a valid ISO 639-1 language code';
    errors.push(`sitemap.xml: invalid hreflang code "${code}"${hint} (e.g. ${exampleLoc})`);
  });

  if (missingXDefault > 0) {
    errors.push(`sitemap.xml: ${missingXDefault} <url> entries have an English alternate but no x-default (e.g. ${firstMissingXDefault})`);
  }

  [...missingSlashes].slice(0, 20).forEach(entry => {
    errors.push(`sitemap.xml: URL missing trailing slash - ${entry}`);
  });
  if (missingSlashes.size > 20) {
    errors.push(`sitemap.xml: ... and ${missingSlashes.size - 20} more URLs missing a trailing slash`);
  }

  return { errors, urlCount: urlBlocks.length };
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

  // Validate each HTML file
  htmlFiles.forEach(filePath => {
    // Extract expected path from file location
    const relativePath = path.relative(buildDir, path.dirname(filePath));
    const expectedPath = '/' + relativePath.replace(/\\/g, '/') + '/';
    const normalizedPath = expectedPath.replace(/\/+/g, '/').replace(/\/$/, '/');

    const pageName = normalizedPath === '/' ? 'Homepage' : normalizedPath;

    const result = validatePageHreflang(filePath, normalizedPath);

    results.push({
      page: pageName,
      ...result
    });

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  });

  // Validate the sitemap's own hreflang cluster
  const sitemapResult = validateSitemapHreflang(buildDir);
  totalErrors += sitemapResult.errors.length;

  // Print results
  console.log('📊 hreflang Validation Results:');
  console.log('================================\n');

  const passed = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const withWarnings = results.filter(r => r.warnings.length > 0);

  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`⚠️  With warnings: ${withWarnings.length}\n`);

  // Show all failures
  if (failed.length > 0) {
    console.log('❌ ERRORS:\n');
    failed.forEach(result => {
      console.log(`  ${result.page}:`);
      result.errors.forEach(error => console.log(`    - ${error}`));
      console.log('');
    });
  }

  // Show sitemap errors
  if (sitemapResult.errors.length > 0) {
    console.log('❌ SITEMAP ERRORS:\n');
    sitemapResult.errors.forEach(error => console.log(`    - ${error}`));
    console.log('');
  }

  // Show all warnings
  if (withWarnings.length > 0) {
    console.log('⚠️  WARNINGS:\n');
    withWarnings.forEach(result => {
      console.log(`  ${result.page}:`);
      result.warnings.forEach(warning => console.log(`    - ${warning}`));
      console.log('');
    });
  }

  // Summary
  console.log('📈 Summary:');
  console.log(`   Total pages: ${results.length}`);
  console.log(`   Sitemap URLs checked: ${sitemapResult.urlCount}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}\n`);

  if (failed.length === 0 && sitemapResult.errors.length === 0) {
    console.log('✅ All hreflang tags are valid!');
    if (totalWarnings > 0) {
      console.log(`⚠️  Consider reviewing ${totalWarnings} warnings`);
    }
    return true;
  } else {
    console.log('❌ hreflang validation failed');
    console.log('💡 Fix the errors in metadata-injector.js / the sitemap generator in build.js, then rebuild');
    return false;
  }
}

// Run validation if called directly
if (require.main === module) {
  const success = validateHreflang();
  process.exit(success ? 0 : 1);
}

module.exports = validateHreflang;
