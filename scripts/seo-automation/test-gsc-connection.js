#!/usr/bin/env node
/**
 * Quick test script to verify GSC service account connection
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const credentialsPath = path.join(__dirname, '../../secret/gsc-service-account.json');

async function getAccessToken() {
  // Read service account credentials
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  // Create JWT
  const jwt = require('jsonwebtoken');
  const now = Math.floor(Date.now() / 1000);

  const claim = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  };

  const token = jwt.sign(claim, credentials.private_key, { algorithm: 'RS256' });

  // Exchange JWT for access token
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
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) {
            resolve(parsed.access_token);
          } else {
            reject(new Error(data));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function listSites(accessToken) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'www.googleapis.com',
      path: '/webmasters/v3/sites',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function getSearchAnalytics(accessToken, siteUrl) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 28);

  const body = JSON.stringify({
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    dimensions: ['query'],
    rowLimit: 10
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
        'Content-Length': body.length
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Testing GSC Connection...\n');

  // Check if jsonwebtoken is available
  try {
    require('jsonwebtoken');
  } catch (e) {
    console.log('Installing jsonwebtoken...');
    execSync('npm install jsonwebtoken --no-save --legacy-peer-deps', { stdio: 'inherit' });
  }

  try {
    console.log('1. Getting access token...');
    const accessToken = await getAccessToken();
    console.log('   ✓ Access token obtained\n');

    console.log('2. Listing sites...');
    const sites = await listSites(accessToken);
    console.log('   Sites:', JSON.stringify(sites, null, 2));

    if (sites.siteEntry && sites.siteEntry.length > 0) {
      const siteUrl = sites.siteEntry[0].siteUrl;
      console.log(`\n3. Fetching search analytics for ${siteUrl}...`);
      const analytics = await getSearchAnalytics(accessToken, siteUrl);
      console.log('   Analytics:', JSON.stringify(analytics, null, 2));
    }

    console.log('\n✓ GSC Connection successful!');
  } catch (err) {
    console.error('\n✗ Error:', err.message || err);
  }
}

main();
