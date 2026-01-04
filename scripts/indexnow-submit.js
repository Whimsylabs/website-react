/**
 * IndexNow URL Submission Script
 * Submits changed URLs to search engines via IndexNow protocol
 */
const fs = require('fs-extra');
const path = require('path');
const https = require('https');

class IndexNowSubmitter {
  constructor(apiKey, host = 'whimsylabs.ai') {
    this.apiKey = apiKey;
    this.host = host;
    this.endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow'
    ];
  }

  /**
   * Submit URLs to IndexNow
   */
  async submitUrls(urls) {
    if (!urls || urls.length === 0) {
      console.log('ℹ️  No URLs to submit to IndexNow');
      return;
    }

    // Limit to 1000 URLs per request (IndexNow limit)
    const urlChunks = this.chunkArray(urls, 1000);
    
    for (const chunk of urlChunks) {
      await this.submitUrlChunk(chunk);
    }
  }

  /**
   * Submit a chunk of URLs
   */
  async submitUrlChunk(urls) {
    const payload = {
      host: this.host,
      key: this.apiKey,
      keyLocation: `https://${this.host}/${this.apiKey}.txt`,
      urlList: urls
    };

    console.log(`🔗 Submitting ${urls.length} URLs to IndexNow...`);
    console.log('📋 URLs being submitted:');
    urls.forEach((url, index) => {
      console.log(`   ${index + 1}. ${url}`);
    });

    for (const endpoint of this.endpoints) {
      try {
        const result = await this.makeRequest(endpoint, payload);
        console.log(`✅ Successfully submitted to ${new URL(endpoint).hostname} (HTTP ${result.statusCode})`);
      } catch (error) {
        console.error(`❌ Failed to submit to ${endpoint}:`, error.message);
      }
    }
  }

  /**
   * Make HTTP request to IndexNow endpoint
   */
  makeRequest(endpoint, payload) {
    return new Promise((resolve, reject) => {
      const url = new URL(endpoint);
      const postData = JSON.stringify(payload);
      
      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ statusCode: res.statusCode, data });
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  }

  /**
   * Get all site URLs from sitemap
   */
  async getAllSiteUrls() {
    try {
      const sitemapPath = path.join(__dirname, '../build/sitemap.xml');
      const sitemapContent = await fs.readFile(sitemapPath, 'utf8');
      
      const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
      const urls = urlMatches.map(match => 
        match.replace(/<loc>|<\/loc>/g, '')
      );
      
      console.log(`📄 Found ${urls.length} URLs in sitemap`);
      return urls;
    } catch (error) {
      console.error('❌ Error reading sitemap:', error.message);
      return [];
    }
  }

  /**
   * Submit all site URLs (for initial setup or full reindex)
   */
  async submitAllUrls() {
    const urls = await this.getAllSiteUrls();
    await this.submitUrls(urls);
  }

  /**
   * Utility function to chunk array
   */
  chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

// CLI usage
if (require.main === module) {
  async function main() {
    let apiKey = process.env.INDEXNOW_API_KEY;
    
    // If no environment variable, try to read from IndexNowKey.txt
    if (!apiKey) {
      try {
        const keyPath = path.join(__dirname, '../IndexNowKey.txt');
        apiKey = (await fs.readFile(keyPath, 'utf8')).trim();
        console.log('📁 Using API key from IndexNowKey.txt');
      } catch (error) {
        console.error('❌ No INDEXNOW_API_KEY environment variable and could not read IndexNowKey.txt');
        process.exit(1);
      }
    }
    
    const host = process.env.SITE_HOST || 'whimsylabs.ai';
    const submitter = new IndexNowSubmitter(apiKey, host);
    
    // Check if specific URLs provided as arguments
    const urls = process.argv.slice(2);
    
    if (urls.length > 0) {
      console.log(`🎯 Submitting specific URLs: ${urls.join(', ')}`);
      await submitter.submitUrls(urls.map(url => url.startsWith('http') ? url : `https://${host}${url}`));
    } else {
      console.log('🌐 Submitting all URLs from sitemap');
      await submitter.submitAllUrls();
    }
  }
  
  main().catch(console.error);
}

module.exports = IndexNowSubmitter;