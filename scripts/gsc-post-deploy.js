#!/usr/bin/env node
/**
 * GSC Post-Deploy Hook
 * Pings Google Search Console sitemap after deployment.
 * Runs on Windows as part of npm run deploy.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SITE_URL = 'sc-domain:whimsylabs.ai';
const SITEMAP_URL = 'https://whimsylabs.ai/sitemap.xml';
const CREDENTIALS_PATH = path.join(__dirname, '../secret/gsc-service-account.json');

async function pingGSC() {
  console.log('\n🔍 GSC Post-Deploy Hook');
  console.log('========================\n');

  // Check if credentials exist
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.log('⚠️  GSC credentials not found at:', CREDENTIALS_PATH);
    console.log('   Skipping GSC ping (sitemap will still be crawled via IndexNow)');
    return;
  }

  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    // Create JWT client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Submit sitemap
    console.log('📤 Submitting sitemap to GSC...');
    await searchconsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL,
    });
    console.log('✅ Sitemap submitted:', SITEMAP_URL);

    // Get sitemap status
    console.log('\n📊 Checking sitemap status...');
    const result = await searchconsole.sitemaps.get({
      siteUrl: SITE_URL,
      feedpath: SITEMAP_URL,
    });

    const sitemap = result.data;
    console.log('   Last submitted:', sitemap.lastSubmitted);
    console.log('   Last downloaded:', sitemap.lastDownloaded);
    console.log('   Errors:', sitemap.errors || 0);
    console.log('   Warnings:', sitemap.warnings || 0);

    if (sitemap.contents) {
      sitemap.contents.forEach(c => {
        console.log(`   ${c.type}: ${c.submitted} submitted, ${c.indexed || '?'} indexed`);
      });
    }

    console.log('\n✅ GSC post-deploy complete!');
    console.log('   Google will re-crawl updated pages within 24-48 hours.\n');

  } catch (error) {
    console.error('❌ GSC ping failed:', error.message);
    console.log('   (Deploy succeeded, but GSC was not notified)');
  }
}

pingGSC();
