/**
 * Crawler View - Simulates how a crawler would see your site
 * This script fetches a page from your local server and displays it as a crawler would see it
 */

const http = require('http');

// Try to require cheerio, show helpful error if not installed
let cheerio;
try {
  cheerio = require('cheerio');
} catch (error) {
  console.error('Error: The cheerio module is not installed.');
  console.error('Please install it by running: npm install cheerio');
  console.error('Or add it to your project: npm install --save-dev cheerio');
  process.exit(1);
}

// Configuration
const LOCAL_SERVER = 'http://localhost:3000'; // Assumes you're running serve-build.js

// Function to fetch a page
function fetchPage(path) {
  return new Promise((resolve, reject) => {
    const url = `${LOCAL_SERVER}${path}`;
    console.log(`Fetching ${url}...`);
    
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch ${url}: ${res.statusCode} ${res.statusMessage}`));
          return;
        }
        
        resolve(data);
      });
    }).on('error', (err) => {
      reject(new Error(`Failed to fetch ${url}: ${err.message}`));
    });
  });
}

// Function to extract text content from HTML
function extractTextContent(html) {
  const $ = cheerio.load(html);
  
  // Remove script and style elements
  $('script').remove();
  $('style').remove();
  
  // Get the text content
  let text = $('body').text();
  
  // Clean up the text
  text = text.replace(/\\s+/g, ' ').trim();
  
  return text;
}

// Function to extract metadata
function extractMetadata(html) {
  const $ = cheerio.load(html);
  const metadata = {};
  
  // Title
  metadata.title = $('title').text();
  
  // Meta tags
  $('meta').each((i, el) => {
    const name = $(el).attr('name') || $(el).attr('property');
    const content = $(el).attr('content');
    
    if (name && content) {
      metadata[name] = content;
    }
  });
  
  // Links
  metadata.links = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    
    if (href && text) {
      metadata.links.push({ href, text });
    }
  });
  
  return metadata;
}

// Function to extract crawler content
function extractCrawlerContent(html) {
  const $ = cheerio.load(html);
  
  // Look for the crawler content div
  const crawlerContent = $('#crawler-content').html();
  
  if (!crawlerContent) {
    return 'No crawler content found on this page';
  }
  
  return crawlerContent;
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log('Usage:');
    console.log('  node crawler-view.js [options] <path>');
    console.log('\nOptions:');
    console.log('  --text         Show only the text content');
    console.log('  --metadata     Show only the metadata');
    console.log('  --crawler      Show only the crawler content');
    console.log('  --help, -h     Show this help message');
    console.log('\nExamples:');
    console.log('  node crawler-view.js /');
    console.log('  node crawler-view.js /blog');
    console.log('  node crawler-view.js --crawler /faq');
    return;
  }
  
  let path = args[0];
  let mode = 'all';
  
  if (args[0].startsWith('--')) {
    mode = args[0].substring(2);
    path = args[1];
  }
  
  try {
    // Make sure the path starts with a slash
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    const html = await fetchPage(path);
    
    console.log(`\n=== Crawler View for ${path} ===\n`);
    
    if (mode === 'all' || mode === 'metadata') {
      const metadata = extractMetadata(html);
      console.log('Metadata:');
      console.log(JSON.stringify(metadata, null, 2));
      console.log();
    }
    
    if (mode === 'all' || mode === 'crawler') {
      console.log('Crawler Content:');
      console.log(extractCrawlerContent(html));
      console.log();
    }
    
    if (mode === 'all' || mode === 'text') {
      console.log('Text Content (first 1000 chars):');
      const text = extractTextContent(html);
      console.log(text.substring(0, 1000) + (text.length > 1000 ? '...' : ''));
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('\nMake sure the local server is running:');
    console.error('  npm run serve-build');
  }
}

// Run the main function
main();