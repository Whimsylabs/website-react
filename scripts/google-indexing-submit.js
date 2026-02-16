#!/usr/bin/env node
/**
 * Google Indexing API - Submit new/updated URLs for indexing
 * Runs after deploy to request Google indexing of changed pages
 * 
 * Requires:
 * - Google Cloud project with Indexing API enabled
 * - Service account with Owner permission in Search Console
 * - Service account key at ./secret/gsc-service-account.json
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configuration
const SERVICE_ACCOUNT_FILE = path.join(__dirname, '..', 'secret', 'gsc-service-account.json');
const DEPLOYED_URLS_FILE = path.join(__dirname, '..', 'deployed-urls.json');
const SITEMAP_FILE = path.join(__dirname, '..', 'build', 'sitemap.xml');
const SITE_URL = 'https://whimsylabs.ai';

// Rate limiting: Google allows ~200 requests/day
const MAX_URLS_PER_RUN = 50;
const DELAY_BETWEEN_REQUESTS_MS = 1000;

async function getIndexingService() {
  if (!fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    console.log('⚠️  Service account file not found at:', SERVICE_ACCOUNT_FILE);
    console.log('   Skipping Google Indexing API submission.');
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  return google.indexing({ version: 'v3', auth });
}

function extractUrlsFromSitemap() {
  if (!fs.existsSync(SITEMAP_FILE)) {
    console.log('⚠️  Sitemap not found at:', SITEMAP_FILE);
    return [];
  }

  const sitemap = fs.readFileSync(SITEMAP_FILE, 'utf8');
  const urls = [];
  
  // Extract URL and lastmod pairs
  const urlBlocks = sitemap.split('<url>').slice(1);
  
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    
    if (locMatch) {
      urls.push({
        url: locMatch[1],
        lastmod: lastmodMatch ? lastmodMatch[1] : null
      });
    }
  }

  return urls;
}

function getDeployedUrls() {
  if (!fs.existsSync(DEPLOYED_URLS_FILE)) {
    return { urls: {}, lastRun: null };
  }
  const data = JSON.parse(fs.readFileSync(DEPLOYED_URLS_FILE, 'utf8'));
  // Handle old format (array) -> convert to new format (object with lastmod)
  if (Array.isArray(data.urls)) {
    const converted = {};
    data.urls.forEach(url => { converted[url] = { lastmod: null, submittedAt: data.lastRun }; });
    return { urls: converted, lastRun: data.lastRun };
  }
  return data;
}

function saveDeployedUrls(urlsObj) {
  fs.writeFileSync(DEPLOYED_URLS_FILE, JSON.stringify({
    urls: urlsObj,
    lastRun: new Date().toISOString()
  }, null, 2));
}

async function requestIndexing(indexing, url) {
  try {
    await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: 'URL_UPDATED',
      },
    });
    return { url, success: true };
  } catch (error) {
    return { url, success: false, error: error.message };
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('\n📡 Google Indexing API Submission');
  console.log('=' .repeat(50));

  const indexing = await getIndexingService();
  if (!indexing) {
    process.exit(0); // Exit gracefully if no service account
  }

  // Get current sitemap URLs with lastmod
  const sitemapUrls = extractUrlsFromSitemap();
  console.log(`📋 Found ${sitemapUrls.length} URLs in sitemap`);

  // Get previously deployed URLs
  const deployed = getDeployedUrls();
  const previousUrls = deployed.urls || {};

  // Find URLs that need submission:
  // 1. New URLs (never submitted)
  // 2. Updated URLs (lastmod changed since last submission)
  const urlsToSubmit = [];
  let newCount = 0;
  let updatedCount = 0;

  for (const { url, lastmod } of sitemapUrls) {
    const previous = previousUrls[url];
    
    if (!previous) {
      // New URL - never submitted
      urlsToSubmit.push({ url, lastmod, reason: 'new' });
      newCount++;
    } else if (lastmod && previous.lastmod && lastmod !== previous.lastmod) {
      // Updated URL - lastmod changed
      urlsToSubmit.push({ url, lastmod, reason: 'updated' });
      updatedCount++;
    }
  }
  
  // Sort to prioritize new URLs before updated URLs
  urlsToSubmit.sort((a, b) => {
    if (a.reason === 'new' && b.reason === 'updated') return -1;
    if (a.reason === 'updated' && b.reason === 'new') return 1;
    return 0;
  });
  
  if (urlsToSubmit.length === 0) {
    console.log('✅ No new or updated URLs to submit');
    process.exit(0);
  }

  console.log(`🆕 ${newCount} new URLs, 📝 ${updatedCount} updated URLs`);

  // Limit to MAX_URLS_PER_RUN
  const batch = urlsToSubmit.slice(0, MAX_URLS_PER_RUN);
  if (urlsToSubmit.length > MAX_URLS_PER_RUN) {
    console.log(`⚠️  Limiting to ${MAX_URLS_PER_RUN} URLs (rate limit). Remaining will be submitted next deploy.`);
  }

  // Submit URLs
  let success = 0;
  let failed = 0;

  for (let i = 0; i < batch.length; i++) {
    const { url, reason } = batch[i];
    const icon = reason === 'new' ? '🆕' : '📝';
    process.stdout.write(`[${i + 1}/${batch.length}] ${icon} ${url.replace(SITE_URL, '')} ... `);
    
    const result = await requestIndexing(indexing, url);
    
    if (result.success) {
      console.log('✅');
      success++;
    } else {
      console.log('❌', result.error);
      failed++;
    }

    // Rate limiting
    if (i < batch.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS_MS);
    }
  }

  // Update deployed URLs list with new lastmod values
  const updatedUrls = { ...previousUrls };
  for (const { url, lastmod } of batch) {
    updatedUrls[url] = { 
      lastmod, 
      submittedAt: new Date().toISOString() 
    };
  }
  saveDeployedUrls(updatedUrls);

  // Summary
  console.log('\n' + '=' .repeat(50));
  console.log(`📊 Results: ${success} submitted, ${failed} failed`);
  
  if (urlsToSubmit.length > MAX_URLS_PER_RUN) {
    console.log(`📝 ${urlsToSubmit.length - MAX_URLS_PER_RUN} URLs remaining for next deploy`);
  }

  console.log('✅ Google Indexing API submission complete\n');
}

// CLI handling
const args = process.argv.slice(2);

if (args.includes('--status')) {
  // Show status of submitted URLs
  const deployed = getDeployedUrls();
  const urls = Object.entries(deployed.urls || {});
  
  console.log('\n📊 Google Indexing Status');
  console.log('=' .repeat(50));
  console.log(`Last run: ${deployed.lastRun || 'Never'}`);
  console.log(`Total URLs tracked: ${urls.length}\n`);
  
  if (urls.length > 0) {
    console.log('Recent submissions:');
    urls.slice(-10).forEach(([url, data]) => {
      const shortUrl = url.replace(SITE_URL, '');
      console.log(`  ${shortUrl}`);
      console.log(`    └─ lastmod: ${data.lastmod || 'N/A'}, submitted: ${data.submittedAt || 'N/A'}`);
    });
    
    if (urls.length > 10) {
      console.log(`  ... and ${urls.length - 10} more`);
    }
  }
  console.log('');
  process.exit(0);
}

if (args.includes('--dry-run')) {
  // Show what would be submitted without actually doing it
  console.log('\n🧪 DRY RUN - No actual submissions\n');
  const sitemapUrls = extractUrlsFromSitemap();
  const deployed = getDeployedUrls();
  const previousUrls = deployed.urls || {};
  
  let newCount = 0, updatedCount = 0;
  
  for (const { url, lastmod } of sitemapUrls) {
    const previous = previousUrls[url];
    const shortUrl = url.replace(SITE_URL, '');
    
    if (!previous) {
      console.log(`🆕 NEW: ${shortUrl}`);
      newCount++;
    } else if (lastmod && previous.lastmod && lastmod !== previous.lastmod) {
      console.log(`📝 UPDATED: ${shortUrl} (${previous.lastmod} → ${lastmod})`);
      updatedCount++;
    }
  }
  
  console.log(`\nTotal: ${newCount} new, ${updatedCount} updated`);
  process.exit(0);
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
