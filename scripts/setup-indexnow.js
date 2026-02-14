/**
 * IndexNow Setup Script
 * Generates API key and verification file for IndexNow protocol
 */
const fs = require('fs-extra');
const crypto = require('crypto');

async function setupIndexNow() {
  // Generate a random API key (32 characters, alphanumeric)
  const apiKey = crypto.randomBytes(16).toString('hex');
  
  console.log('🔑 Generated IndexNow API Key:', apiKey);
  
  // Create verification file in public directory
  const keyFilePath = `public/${apiKey}.txt`;
  await fs.writeFile(keyFilePath, apiKey);
  
  console.log(`✅ Created verification file: ${keyFilePath}`);
  
  // Create IndexNow configuration file
  const configPath = 'indexnow.config.js';
  const configContent = `module.exports = {
  // IndexNow API Key - also add this to GitHub repository secrets as INDEXNOW_API_KEY
  apiKey: '${apiKey}',
  
  // Your domain
  host: 'whimsylabs.ai',
  
  // IndexNow endpoints (Bing automatically shares with other search engines)
  endpoints: [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ],
  
  // Key file location (must be accessible via HTTP)
  keyLocation: 'https://whimsylabs.ai/${apiKey}.txt'
};`;
  
  await fs.writeFile(configPath, configContent);
  console.log(`✅ Created configuration: ${configPath}`);
  
  console.log('\n📋 Next steps:');
  console.log('1. Add INDEXNOW_API_KEY to GitHub repository secrets');
  console.log('2. Deploy the key file to make it accessible via HTTP');
  console.log('3. Set up GitHub Actions workflow for automatic submissions');
}

setupIndexNow().catch(console.error);