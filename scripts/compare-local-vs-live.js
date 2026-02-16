#!/usr/bin/env node
/**
 * Compare local build URLs vs live sitemap
 * Catches discrepancies before deploy
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const LOCAL_SITEMAP = path.join(BUILD_DIR, 'sitemap.xml');
const LIVE_SITEMAP_URL = 'https://whimsylabs.ai/sitemap.xml';
const SITE_URL = 'https://whimsylabs.ai';

function fetchLiveSitemap() {
  return new Promise((resolve, reject) => {
    https.get(LIVE_SITEMAP_URL, (res) => {
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

function getLocalBuildUrls() {
  const urls = [];
  
  function scanDir(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip static assets
        if (!['static', 'images', 'documents'].includes(item)) {
          scanDir(fullPath, `${basePath}/${item}`);
        }
      } else if (item === 'index.html') {
        // Convert path to URL
        const urlPath = basePath || '/';
        urls.push(`${SITE_URL}${urlPath}/`);
      }
    }
  }
  
  if (fs.existsSync(BUILD_DIR)) {
    scanDir(BUILD_DIR);
  }
  
  return urls;
}

function getLocalSitemapUrls() {
  if (!fs.existsSync(LOCAL_SITEMAP)) {
    return null;
  }
  const xml = fs.readFileSync(LOCAL_SITEMAP, 'utf8');
  return extractUrlsFromSitemap(xml);
}

async function main() {
  console.log('\n🔍 Local Build vs Live Sitemap Comparison');
  console.log('='.repeat(60) + '\n');

  // Get local build URLs (from index.html files)
  const localBuildUrls = getLocalBuildUrls();
  console.log(`📁 Local build HTML pages: ${localBuildUrls.length}`);

  // Get local sitemap URLs
  const localSitemapUrls = getLocalSitemapUrls();
  if (localSitemapUrls) {
    console.log(`📋 Local sitemap URLs: ${localSitemapUrls.length}`);
  } else {
    console.log(`📋 Local sitemap: Not found (run build first)`);
  }

  // Fetch live sitemap
  console.log('📡 Fetching live sitemap...');
  let liveSitemapUrls;
  try {
    const liveXml = await fetchLiveSitemap();
    liveSitemapUrls = extractUrlsFromSitemap(liveXml);
    console.log(`🌐 Live sitemap URLs: ${liveSitemapUrls.length}`);
  } catch (err) {
    console.log(`🌐 Live sitemap: Failed to fetch (${err.message})`);
    liveSitemapUrls = [];
  }

  console.log('');

  // Compare local build vs live sitemap
  const localSet = new Set(localBuildUrls);
  const liveSet = new Set(liveSitemapUrls);

  const inLocalNotLive = localBuildUrls.filter(url => !liveSet.has(url));
  const inLiveNotLocal = liveSitemapUrls.filter(url => !localSet.has(url));
  const inBoth = localBuildUrls.filter(url => liveSet.has(url));

  // Summary
  console.log('='.repeat(60));
  console.log('📊 LOCAL BUILD vs LIVE SITEMAP');
  console.log('='.repeat(60));
  console.log(`✅ In both (synced):              ${inBoth.length}`);
  console.log(`🆕 In LOCAL, not live (new):      ${inLocalNotLive.length}`);
  console.log(`⚠️  In LIVE, not local (removed?): ${inLiveNotLocal.length}`);
  console.log('');

  if (inLocalNotLive.length > 0) {
    console.log('='.repeat(60));
    console.log('🆕 NEW PAGES (in local build, not yet live):');
    console.log('='.repeat(60));
    inLocalNotLive.slice(0, 30).forEach(url => {
      console.log(`   ${url.replace(SITE_URL, '')}`);
    });
    if (inLocalNotLive.length > 30) {
      console.log(`   ... and ${inLocalNotLive.length - 30} more`);
    }
    console.log('');
  }

  if (inLiveNotLocal.length > 0) {
    console.log('='.repeat(60));
    console.log('⚠️  REMOVED PAGES (live but not in local build):');
    console.log('='.repeat(60));
    inLiveNotLocal.slice(0, 30).forEach(url => {
      console.log(`   ${url.replace(SITE_URL, '')}`);
    });
    if (inLiveNotLocal.length > 30) {
      console.log(`   ... and ${inLiveNotLocal.length - 30} more`);
    }
    console.log('');
  }

  // Also compare local sitemap vs local build (internal consistency)
  if (localSitemapUrls) {
    const localSitemapSet = new Set(localSitemapUrls);
    const buildNotInSitemap = localBuildUrls.filter(url => !localSitemapSet.has(url));
    const sitemapNotInBuild = localSitemapUrls.filter(url => !localSet.has(url));

    if (buildNotInSitemap.length > 0 || sitemapNotInBuild.length > 0) {
      console.log('='.repeat(60));
      console.log('⚠️  LOCAL CONSISTENCY ISSUES:');
      console.log('='.repeat(60));
      
      if (buildNotInSitemap.length > 0) {
        console.log(`   Built but not in local sitemap: ${buildNotInSitemap.length}`);
        buildNotInSitemap.slice(0, 10).forEach(url => {
          console.log(`      ${url.replace(SITE_URL, '')}`);
        });
      }
      
      if (sitemapNotInBuild.length > 0) {
        console.log(`   In local sitemap but not built: ${sitemapNotInBuild.length}`);
        sitemapNotInBuild.slice(0, 10).forEach(url => {
          console.log(`      ${url.replace(SITE_URL, '')}`);
        });
      }
      console.log('');
    }
  }

  // Export
  const exportDir = path.join(__dirname, '..', 'indexing-reports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  
  fs.writeFileSync(
    path.join(exportDir, `local-build-urls-${timestamp}.txt`),
    localBuildUrls.join('\n')
  );
  
  fs.writeFileSync(
    path.join(exportDir, `live-sitemap-urls-${timestamp}.txt`),
    liveSitemapUrls.join('\n')
  );

  console.log('='.repeat(60));
  console.log('📁 Exported to indexing-reports/');
  console.log(`   • local-build-urls-${timestamp}.txt`);
  console.log(`   • live-sitemap-urls-${timestamp}.txt`);
  console.log('');
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
