/**
 * Generate AI Sitemap
 * 
 * This script generates a special sitemap specifically for AI crawlers
 * that includes all the .html files for direct access.
 */

const fs = require('fs');
const path = require('path');

console.log('Starting AI sitemap generation...');

// Function to get blog posts data (same as in generate-sitemap.js)
function getBlogPosts() {
  const blogDir = path.resolve(__dirname, 'src/Components/blog');
  const posts = [];
  
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
  
  return posts;
}

// Get blog posts
const blogPosts = getBlogPosts();

// Define the main routes
const mainRoutes = [
  { path: '/', htmlFile: 'index.html', changefreq: 'daily', priority: '1.0' },
  { path: '/blog', htmlFile: 'blog.html', changefreq: 'daily', priority: '0.9' },
  { path: '/services', htmlFile: 'services.html', changefreq: 'weekly', priority: '0.8' },
  { path: '/features', htmlFile: 'features.html', changefreq: 'weekly', priority: '0.8' },
  { path: '/faq', htmlFile: 'faq.html', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', htmlFile: 'contact.html', changefreq: 'monthly', priority: '0.7' }
];

// Generate AI sitemap XML content
let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add main routes with .html extension
mainRoutes.forEach(route => {
  if (route.path === '/') {
    // For the home page, use both the root URL and index.html
    sitemapContent += '    <url>\n';
    sitemapContent += `        <loc>https://whimsylabs.ai/</loc>\n`;
    sitemapContent += `        <changefreq>${route.changefreq}</changefreq>\n`;
    sitemapContent += `        <priority>${route.priority}</priority>\n`;
    sitemapContent += '    </url>\n';
    
    sitemapContent += '    <url>\n';
    sitemapContent += `        <loc>https://whimsylabs.ai/index.html</loc>\n`;
    sitemapContent += `        <changefreq>${route.changefreq}</changefreq>\n`;
    sitemapContent += `        <priority>${route.priority}</priority>\n`;
    sitemapContent += '    </url>\n';
  } else {
    // For other pages, use both the path and the .html version
    sitemapContent += '    <url>\n';
    sitemapContent += `        <loc>https://whimsylabs.ai${route.path}</loc>\n`;
    sitemapContent += `        <changefreq>${route.changefreq}</changefreq>\n`;
    sitemapContent += `        <priority>${route.priority}</priority>\n`;
    sitemapContent += '    </url>\n';
    
    sitemapContent += '    <url>\n';
    sitemapContent += `        <loc>https://whimsylabs.ai/${route.htmlFile}</loc>\n`;
    sitemapContent += `        <changefreq>${route.changefreq}</changefreq>\n`;
    sitemapContent += `        <priority>${route.priority}</priority>\n`;
    sitemapContent += '    </url>\n';
  }
});

// Add blog post routes with both formats
blogPosts.forEach(post => {
  const lastmod = new Date(post.date).toISOString().split('T')[0];
  
  // Add the directory-based URL (e.g., /blog/post-slug/)
  sitemapContent += '    <url>\n';
  sitemapContent += `        <loc>https://whimsylabs.ai/blog/${post.slug}</loc>\n`;
  sitemapContent += `        <lastmod>${lastmod}</lastmod>\n`;
  sitemapContent += '        <changefreq>monthly</changefreq>\n';
  sitemapContent += '        <priority>0.7</priority>\n';
  sitemapContent += '    </url>\n';
  
  // Add the blog/slug.html version
  sitemapContent += '    <url>\n';
  sitemapContent += `        <loc>https://whimsylabs.ai/blog/${post.slug}.html</loc>\n`;
  sitemapContent += `        <lastmod>${lastmod}</lastmod>\n`;
  sitemapContent += '        <changefreq>monthly</changefreq>\n';
  sitemapContent += '        <priority>0.7</priority>\n';
  sitemapContent += '    </url>\n';
  
  // Add the blog-slug.html version
  sitemapContent += '    <url>\n';
  sitemapContent += `        <loc>https://whimsylabs.ai/blog-${post.slug}.html</loc>\n`;
  sitemapContent += `        <lastmod>${lastmod}</lastmod>\n`;
  sitemapContent += '        <changefreq>monthly</changefreq>\n';
  sitemapContent += '        <priority>0.7</priority>\n';
  sitemapContent += '    </url>\n';
});

sitemapContent += '</urlset>\n';

// Write AI sitemap to file
fs.writeFileSync('public/ai-sitemap.xml', sitemapContent);
console.log('AI sitemap generated successfully at public/ai-sitemap.xml!');

// Also copy to build directory if it exists
const buildDir = path.resolve(__dirname, 'build');
if (fs.existsSync(buildDir)) {
  fs.writeFileSync(path.join(buildDir, 'ai-sitemap.xml'), sitemapContent);
  console.log('AI sitemap copied to build directory!');
}