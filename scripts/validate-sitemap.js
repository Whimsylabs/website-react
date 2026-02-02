/**
 * Validate Sitemap URLs
 * Ensures sitemap.xml has valid URLs (no [object Object], proper format)
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../build');
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');
const BASE_URL = 'https://whimsylabs.ai';

function validateSitemap() {
  console.log('\n🗺️  Validating sitemap.xml...\n');

  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('❌ sitemap.xml not found in build directory!');
    process.exit(1);
  }

  const content = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const errors = [];
  const warnings = [];

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
  const locMatches = content.match(/<loc>([^<]+)<\/loc>/g) || [];
  const hrefMatches = content.match(/href="([^"]+)"/g) || [];

  const allUrls = [
    ...locMatches.map(m => m.replace(/<\/?loc>/g, '')),
    ...hrefMatches.map(m => m.replace(/href="|"/g, ''))
  ];

  console.log(`📊 Found ${locMatches.length} <loc> URLs and ${hrefMatches.length} hreflang URLs`);

  // Validate each URL
  let invalidCount = 0;
  const seenUrls = new Set();

  for (const url of allUrls) {
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

  // Check for required pages
  const requiredPages = ['/', '/features/', '/services/', '/faq/', '/contact/', '/blog/'];
  for (const page of requiredPages) {
    const fullUrl = `${BASE_URL}${page}`;
    if (!seenUrls.has(fullUrl)) {
      warnings.push(`Missing required page: ${fullUrl}`);
    }
  }

  // Summary
  console.log(`\n📋 Validation Summary:`);
  console.log(`   Total unique URLs: ${seenUrls.size}`);
  console.log(`   Invalid URLs: ${invalidCount}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(w => console.log(`   ${w}`));
  }

  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(e => console.log(`   ${e}`));
    console.log('\n❌ Sitemap validation FAILED!\n');
    process.exit(1);
  }

  console.log('\n✅ Sitemap validation passed!\n');
}

validateSitemap();
