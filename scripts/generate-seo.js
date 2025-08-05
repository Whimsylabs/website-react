#!/usr/bin/env node

/**
 * SEO Generation Script for WhimsyLabs Website
 * 
 * This script automates the process to ensure search engine bots can crawl the static site:
 * 1. Scans the static output directory for .html files
 * 2. Generates sitemap.xml at the root of the output directory
 * 3. Generates robots.txt at the root of the output directory
 * 
 * Usage: node scripts/generate-seo.js
 * 
 * Configuration: Edit the variables at the top of this script to customize behavior
 */

const fs = require('fs');
const path = require('path');

// ===== CONFIGURATION - Edit these values as needed =====
const CONFIG = {
  // Site configuration
  siteUrl: 'https://whimsylabs.ai',
  siteName: 'WhimsyLabs Virtual Laboratory Software',
  
  // Output directory (relative to project root)
  outputDir: 'build',
  
  // Crawl delay for robots.txt (in seconds)
  crawlDelay: 1,
  
  // Routes configuration with SEO settings
  mainRoutes: [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/blog', changefreq: 'daily', priority: '0.9' },
    { path: '/services', changefreq: 'weekly', priority: '0.8' },
    { path: '/features', changefreq: 'weekly', priority: '0.8' },
    { path: '/faq', changefreq: 'weekly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' }
  ],
  
  // Blog post defaults
  blogDefaults: {
    changefreq: 'monthly',
    priority: '0.7'
  },
  
  // Files/patterns to disallow in robots.txt
  disallowPatterns: [
    '/tmp/',
    '/*.json$',
    '/*.js$',
    '/*.css$'
  ],
  
  // Directories to explicitly allow in robots.txt
  allowDirectories: [
    '/blog/',
    '/services/',
    '/features/',
    '/faq/',
    '/contact/'
  ]
};

// ===== UTILITY FUNCTIONS =====

/**
 * Get blog posts data by scanning React component files
 */
function getBlogPosts() {
  const blogDir = path.resolve(__dirname, '..', 'src', 'Components', 'blog');
  const posts = [];
  
  try {
    // Read all files in the blog directory
    const files = fs.readdirSync(blogDir);
    
    // Filter for Post*.js files
    const postFiles = files.filter(file => /^Post\d+\.js$/.test(file));
    
    postFiles.forEach(file => {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract post metadata using regex
      const titleMatch = content.match(/export const title = ["'](.+?)["'];/);
      const dateMatch = content.match(/export const date = ["'](.+?)["'];/);
      const slugMatch = content.match(/export const slug = ["'](.+?)["'];/);
      
      if (titleMatch && dateMatch && slugMatch) {
        posts.push({
          title: titleMatch[1],
          date: dateMatch[1],
          slug: slugMatch[1]
        });
      }
    });
  } catch (error) {
    console.warn('Warning: Could not read blog directory:', error.message);
  }
  
  return posts;
}

/**
 * Scan output directory for all HTML files
 */
function scanOutputDirectory() {
  const outputPath = path.resolve(__dirname, '..', CONFIG.outputDir);
  const htmlFiles = [];
  
  function scanDir(dir, relativePath = '') {
    try {
      const entries = fs.readdirSync(dir);
      
      entries.forEach(entry => {
        const fullPath = path.join(dir, entry);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          scanDir(fullPath, path.join(relativePath, entry));
        } else if (entry === 'index.html' || entry.endsWith('.html')) {
          const routePath = relativePath ? '/' + relativePath : '/';
          htmlFiles.push({
            path: routePath,
            file: fullPath,
            lastModified: stats.mtime
          });
        }
      });
    } catch (error) {
      console.warn('Warning: Could not scan directory ' + dir + ':', error.message);
    }
  }
  
  if (fs.existsSync(outputPath)) {
    scanDir(outputPath);
  } else {
    console.error('Error: Output directory ' + outputPath + ' does not exist. Run \'npm run build\' first.');
    process.exit(1);
  }
  
  return htmlFiles;
}

/**
 * Generate sitemap.xml content
 */
function generateSitemap() {
  console.log('Generating sitemap.xml...');
  
  const blogPosts = getBlogPosts();
  const scannedFiles = scanOutputDirectory();
  
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add main routes with configured priorities
  CONFIG.mainRoutes.forEach(function(route) {
    sitemapContent += '    <url>\n';
    sitemapContent += '        <loc>' + CONFIG.siteUrl + route.path + '</loc>\n';
    sitemapContent += '        <changefreq>' + route.changefreq + '</changefreq>\n';
    sitemapContent += '        <priority>' + route.priority + '</priority>\n';
    sitemapContent += '    </url>\n';
  });
  
  // Add blog post routes with metadata
  blogPosts.forEach(function(post) {
    const lastmod = new Date(post.date).toISOString().split('T')[0];
    sitemapContent += '    <url>\n';
    sitemapContent += '        <loc>' + CONFIG.siteUrl + '/blog/' + post.slug + '</loc>\n';
    sitemapContent += '        <lastmod>' + lastmod + '</lastmod>\n';
    sitemapContent += '        <changefreq>' + CONFIG.blogDefaults.changefreq + '</changefreq>\n';
    sitemapContent += '        <priority>' + CONFIG.blogDefaults.priority + '</priority>\n';
    sitemapContent += '    </url>\n';
  });
  
  // Add any additional HTML files found during scanning that aren't already included
  const existingPaths = new Set();
  CONFIG.mainRoutes.forEach(function(r) {
    existingPaths.add(r.path);
  });
  blogPosts.forEach(function(p) {
    existingPaths.add('/blog/' + p.slug);
  });
  
  scannedFiles.forEach(function(file) {
    if (!existingPaths.has(file.path) && file.path !== '/') {
      const lastmod = file.lastModified.toISOString().split('T')[0];
      sitemapContent += '    <url>\n';
      sitemapContent += '        <loc>' + CONFIG.siteUrl + file.path + '</loc>\n';
      sitemapContent += '        <lastmod>' + lastmod + '</lastmod>\n';
      sitemapContent += '        <changefreq>weekly</changefreq>\n';
      sitemapContent += '        <priority>0.5</priority>\n';
      sitemapContent += '    </url>\n';
    }
  });
  
  sitemapContent += '</urlset>\n';
  
  return sitemapContent;
}

/**
 * Generate robots.txt content
 */
function generateRobotsTxt() {
  console.log('Generating robots.txt...');
  
  let robotsContent = '# https://www.robotstxt.org/robotstxt.html\n';
  robotsContent += '# ' + CONFIG.siteName + '\n';
  robotsContent += '# All search engines are allowed to crawl all content\n\n';
  
  robotsContent += 'User-agent: *\n';
  robotsContent += 'Allow: /\n\n';
  
  robotsContent += '# Sitemap location\n';
  robotsContent += 'Sitemap: ' + CONFIG.siteUrl + '/sitemap.xml\n\n';
  
  robotsContent += '# Crawl delay to prevent server overload\n';
  robotsContent += 'Crawl-delay: ' + CONFIG.crawlDelay + '\n\n';
  
  if (CONFIG.disallowPatterns.length > 0) {
    robotsContent += '# Disallow access to non-content files\n';
    CONFIG.disallowPatterns.forEach(function(pattern) {
      robotsContent += 'Disallow: ' + pattern + '\n';
    });
    robotsContent += '\n';
  }
  
  if (CONFIG.allowDirectories.length > 0) {
    robotsContent += '# Allow important directories explicitly\n';
    CONFIG.allowDirectories.forEach(function(dir) {
      robotsContent += 'Allow: ' + dir + '\n';
    });
  }
  
  return robotsContent;
}

/**
 * Write file with error handling
 */
function writeFile(filePath, content, description) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ ' + description + ' written to: ' + filePath);
    return true;
  } catch (error) {
    console.error('✗ Error writing ' + description + ' to ' + filePath + ':', error.message);
    return false;
  }
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Starting SEO generation process...\n');
  
  // Verify output directory exists
  const outputPath = path.resolve(__dirname, '..', CONFIG.outputDir);
  if (!fs.existsSync(outputPath)) {
    console.error('Output directory ' + outputPath + ' does not exist.');
    console.error('Please run "npm run build" first to generate the static files.\n');
    process.exit(1);
  }
  
  console.log('Output directory: ' + outputPath);
  console.log('Site URL: ' + CONFIG.siteUrl + '\n');
  
  // Generate sitemap.xml
  const sitemapContent = generateSitemap();
  const sitemapPath = path.join(outputPath, 'sitemap.xml');
  const sitemapSuccess = writeFile(sitemapPath, sitemapContent, 'sitemap.xml');
  
  // Generate robots.txt
  const robotsContent = generateRobotsTxt();
  const robotsPath = path.join(outputPath, 'robots.txt');
  const robotsSuccess = writeFile(robotsPath, robotsContent, 'robots.txt');
  
  // Summary
  console.log('\n📊 SEO Generation Summary:');
  console.log('   ' + (sitemapSuccess ? '✓' : '✗') + ' sitemap.xml');
  console.log('   ' + (robotsSuccess ? '✓' : '✗') + ' robots.txt');
  
  if (sitemapSuccess && robotsSuccess) {
    console.log('\n🎉 SEO files generated successfully!');
    console.log('\n💡 Next steps:');
    console.log('   1. Deploy your site to see the changes');
    console.log('   2. Verify sitemap.xml is accessible at: ' + CONFIG.siteUrl + '/sitemap.xml');
    console.log('   3. Submit sitemap to Google Search Console and other search engines');
    console.log('   4. Use SEO crawlers to verify that all content is discoverable');
  } else {
    console.log('\n❌ Some files failed to generate. Please check the errors above.');
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = {
  CONFIG,
  getBlogPosts,
  scanOutputDirectory,
  generateSitemap,
  generateRobotsTxt,
  main
};