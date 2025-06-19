/**
 * Tool to inspect crawler content in the build files
 * This script extracts and displays the crawler-friendly content from the HTML files
 */

const fs = require('fs');
const path = require('path');

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

const BUILD_DIR = path.join(__dirname, 'build');

// Function to extract crawler content from an HTML file
function extractCrawlerContent(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);
    
    // Find the crawler content div
    const crawlerContent = $('#crawler-content').html();
    
    if (!crawlerContent) {
      return { success: false, message: 'No crawler content found in this file' };
    }
    
    return { 
      success: true, 
      content: crawlerContent.trim(),
      metaTags: extractMetaTags($)
    };
  } catch (error) {
    return { success: false, message: `Error reading file: ${error.message}` };
  }
}

// Function to extract meta tags from the HTML
function extractMetaTags($) {
  const metaTags = {};
  
  // Title
  metaTags.title = $('title').text();
  
  // Description
  const description = $('meta[name="description"]').attr('content');
  if (description) {
    metaTags.description = description;
  }
  
  // Open Graph tags
  $('meta[property^="og:"]').each((i, el) => {
    const property = $(el).attr('property');
    const content = $(el).attr('content');
    metaTags[property] = content;
  });
  
  // Schema.org JSON-LD
  const jsonLd = $('script[type="application/ld+json"]').html();
  if (jsonLd) {
    try {
      metaTags.jsonLd = JSON.parse(jsonLd);
    } catch (e) {
      metaTags.jsonLd = 'Error parsing JSON-LD';
    }
  }
  
  return metaTags;
}

// Function to inspect a specific file
function inspectFile(relativePath) {
  const filePath = path.join(BUILD_DIR, relativePath);
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  
  const result = extractCrawlerContent(filePath);
  
  console.log(`\n=== Crawler Content for ${relativePath} ===\n`);
  
  if (!result.success) {
    console.log(result.message);
  } else {
    console.log('Meta Tags:');
    console.log(JSON.stringify(result.metaTags, null, 2));
    
    console.log('\nCrawler Content:');
    console.log(result.content);
  }
}

// Function to list all HTML files in the build directory
function listHtmlFiles() {
  const htmlFiles = [];
  
  function scanDir(dir, baseDir = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(baseDir, entry.name);
      
      if (entry.isDirectory()) {
        scanDir(fullPath, relativePath);
      } else if (entry.name === 'index.html') {
        htmlFiles.push(relativePath);
      }
    }
  }
  
  scanDir(BUILD_DIR);
  return htmlFiles;
}

// Main function
function main() {
  const args = process.argv.slice(2);
  
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory not found at ${BUILD_DIR}`);
    console.error('Run "npm run build" first to generate the build files');
    process.exit(1);
  }
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log('Usage:');
    console.log('  node inspect-crawler-content.js [options] [file-path]');
    console.log('\nOptions:');
    console.log('  --list         List all HTML files in the build directory');
    console.log('  --all          Inspect all HTML files');
    console.log('  --help, -h     Show this help message');
    console.log('\nExamples:');
    console.log('  node inspect-crawler-content.js --list');
    console.log('  node inspect-crawler-content.js blog/index.html');
    console.log('  node inspect-crawler-content.js blog/whimsylabs-education-revolution/index.html');
    return;
  }
  
  if (args[0] === '--list') {
    const htmlFiles = listHtmlFiles();
    console.log('Available HTML files:');
    htmlFiles.forEach(file => console.log(`  ${file}`));
    return;
  }
  
  if (args[0] === '--all') {
    const htmlFiles = listHtmlFiles();
    htmlFiles.forEach(file => inspectFile(file));
    return;
  }
  
  // Inspect a specific file
  inspectFile(args[0]);
}

// Run the main function
main();