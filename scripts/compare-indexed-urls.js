#!/usr/bin/env node
/**
 * Compare submitted URLs vs live sitemap
 * Shows what's been indexed vs what's on the site
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DEPLOYED_URLS_FILE = path.join(__dirname, '..', 'deployed-urls.json');
const SITEMAP_URL = 'https://whimsylabs.ai/sitemap.xml';
const SITE_URL = 'https://whimsylabs.ai';

function fetchSitemap() {
  return new Promise((resolve, reject) => {
    https.get(SITEMAP_URL, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractUrlsFromSitemap(xml) {
  const urls = [];
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function getSubmittedUrls() {
  if (!fs.existsSync(DEPLOYED_URLS_FILE)) {
    return [];
  }
  const data = JSON.parse(fs.readFileSync(DEPLOYED_URLS_FILE, 'utf8'));
  // Handle both old (array) and new (object) formats
  if (Array.isArray(data.urls)) {
    return data.urls;
  }
  return Object.keys(data.urls || {});
}

async function main() {
  console.log('\n🔍 URL Comparison: Submitted vs Live Sitemap');
  console.log('='.repeat(60) + '\n');

  // Fetch live sitemap
  console.log('📡 Fetching live sitemap...');
  const sitemapXml = await fetchSitemap();
  const sitemapUrls = extractUrlsFromSitemap(sitemapXml);
  console.log(`   Found ${sitemapUrls.length} URLs in sitemap\n`);

  // Get submitted URLs
  const submittedUrls = getSubmittedUrls();
  console.log(`📋 Submitted URLs tracked: ${submittedUrls.length}\n`);

  // Create sets for comparison
  const sitemapSet = new Set(sitemapUrls);
  const submittedSet = new Set(submittedUrls);

  // Find differences
  const inSitemapNotSubmitted = sitemapUrls.filter(url => !submittedSet.has(url));
  const submittedNotInSitemap = submittedUrls.filter(url => !sitemapSet.has(url));
  const inBoth = sitemapUrls.filter(url => submittedSet.has(url));

  // Report
  console.log('='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ In both (indexed & live):     ${inBoth.length}`);
  console.log(`🆕 In sitemap, NOT submitted:    ${inSitemapNotSubmitted.length}`);
  console.log(`⚠️  Submitted, NOT in sitemap:   ${submittedNotInSitemap.length}`);
  console.log('');

  // Details
  if (inSitemapNotSubmitted.length > 0) {
    console.log('='.repeat(60));
    console.log('🆕 NEED TO SUBMIT (in sitemap but not yet indexed):');
    console.log('='.repeat(60));
    inSitemapNotSubmitted.forEach(url => {
      console.log(`   ${url.replace(SITE_URL, '')}`);
    });
    console.log('');
  }

  if (submittedNotInSitemap.length > 0) {
    console.log('='.repeat(60));
    console.log('⚠️  ORPHANED (submitted but no longer in sitemap):');
    console.log('='.repeat(60));
    submittedNotInSitemap.forEach(url => {
      console.log(`   ${url.replace(SITE_URL, '')}`);
    });
    console.log('');
  }

  // Export to files
  const exportDir = path.join(__dirname, '..', 'indexing-reports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  
  fs.writeFileSync(
    path.join(exportDir, `sitemap-urls-${timestamp}.txt`),
    sitemapUrls.join('\n')
  );
  
  fs.writeFileSync(
    path.join(exportDir, `submitted-urls-${timestamp}.txt`),
    submittedUrls.join('\n')
  );
  
  fs.writeFileSync(
    path.join(exportDir, `need-submission-${timestamp}.txt`),
    inSitemapNotSubmitted.join('\n')
  );

  console.log('='.repeat(60));
  console.log('📁 Exported to indexing-reports/');
  console.log(`   • sitemap-urls-${timestamp}.txt`);
  console.log(`   • submitted-urls-${timestamp}.txt`);
  console.log(`   • need-submission-${timestamp}.txt`);
  console.log('');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
