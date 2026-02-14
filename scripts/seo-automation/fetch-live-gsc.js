#!/usr/bin/env node
/**
 * Fetch live GSC data and save to local storage
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const credentialsPath = path.join(__dirname, '../../secret/gsc-service-account.json');
const queriesDir = path.join(__dirname, '../../data/seo-metrics/queries');
const pagesDir = path.join(__dirname, '../../data/seo-metrics/pages');

async function getAccessToken() {
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);

  const claim = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  const token = jwt.sign(claim, credentials.private_key, { algorithm: 'RS256' });

  return new Promise((resolve, reject) => {
    const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`;

    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.access_token) {
          resolve(parsed.access_token);
        } else {
          reject(new Error(data));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function fetchSearchAnalytics(accessToken, siteUrl, dimension, days = 28) {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1); // Yesterday
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days + 1);

  const body = JSON.stringify({
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    dimensions: [dimension],
    rowLimit: 1000
  });

  const encodedSiteUrl = encodeURIComponent(siteUrl);

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'www.googleapis.com',
      path: `/webmasters/v3/sites/${encodedSiteUrl}/searchAnalytics/query`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({
            ...result,
            dateRange: {
              startDate: startDate.toISOString().split('T')[0],
              endDate: endDate.toISOString().split('T')[0]
            }
          });
        } catch (e) {
          reject(new Error(data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function saveData(data, type) {
  const dir = type === 'queries' ? queriesDir : pagesDir;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${type}_${data.dateRange.startDate}_${data.dateRange.endDate}_${timestamp}.json`;
  const filepath = path.join(dir, filename);

  const formatted = {
    fetched_at: new Date().toISOString(),
    site_url: 'https://whimsylabs.ai',
    metric_type: type,
    date_range: data.dateRange,
    row_count: data.rows ? data.rows.length : 0,
    rows: data.rows || []
  };

  fs.writeFileSync(filepath, JSON.stringify(formatted, null, 2));
  console.log(`Saved: ${filepath}`);
  return filepath;
}

async function main() {
  const days = parseInt(process.argv[2]) || 28;

  console.log(`\n=== Fetching Live GSC Data (${days} days) ===\n`);

  try {
    console.log('Getting access token...');
    const accessToken = await getAccessToken();
    console.log('✓ Authenticated\n');

    const siteUrl = 'sc-domain:whimsylabs.ai';

    // Fetch queries
    console.log('Fetching query data...');
    const queries = await fetchSearchAnalytics(accessToken, siteUrl, 'query', days);
    console.log(`  Found ${queries.rows?.length || 0} queries`);
    saveData(queries, 'queries');

    // Fetch pages
    console.log('\nFetching page data...');
    const pages = await fetchSearchAnalytics(accessToken, siteUrl, 'page', days);
    console.log(`  Found ${pages.rows?.length || 0} pages`);
    saveData(pages, 'pages');

    // Summary
    console.log('\n=== Summary ===');
    const totalClicks = queries.rows?.reduce((sum, r) => sum + r.clicks, 0) || 0;
    const totalImpressions = queries.rows?.reduce((sum, r) => sum + r.impressions, 0) || 0;
    console.log(`Total clicks: ${totalClicks}`);
    console.log(`Total impressions: ${totalImpressions}`);
    console.log(`Unique queries: ${queries.rows?.length || 0}`);
    console.log(`Unique pages: ${pages.rows?.length || 0}`);

    // Top queries
    if (queries.rows && queries.rows.length > 0) {
      console.log('\nTop 5 queries by clicks:');
      queries.rows
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5)
        .forEach((r, i) => {
          console.log(`  ${i + 1}. "${r.keys[0]}" - ${r.clicks} clicks, ${r.impressions} impressions`);
        });
    }

    console.log('\n✓ Done! Run "npm run seo:analyze" to analyze the data.');

  } catch (err) {
    console.error('\n✗ Error:', err.message || err);
    process.exit(1);
  }
}

main();
