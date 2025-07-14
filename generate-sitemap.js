const fs = require('fs');
const path = require('path');

console.log('Starting sitemap generation...');

// Function to get blog posts data (same as in generate-html-pages.js)
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
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/services', changefreq: 'weekly', priority: '0.8' },
  { path: '/features', changefreq: 'weekly', priority: '0.8' },
  { path: '/faq', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' }
];

// Generate sitemap XML content
let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add main routes
mainRoutes.forEach(route => {
  sitemapContent += '    <url>\n';
  sitemapContent += `        <loc>https://whimsylabs.ai${route.path}</loc>\n`;
  sitemapContent += `        <changefreq>${route.changefreq}</changefreq>\n`;
  sitemapContent += `        <priority>${route.priority}</priority>\n`;
  sitemapContent += '    </url>\n';
});

// Add blog post routes
blogPosts.forEach(post => {
  const lastmod = new Date(post.date).toISOString().split('T')[0];
  sitemapContent += '    <url>\n';
  sitemapContent += `        <loc>https://whimsylabs.ai/blog/${post.slug}</loc>\n`;
  sitemapContent += `        <lastmod>${lastmod}</lastmod>\n`;
  sitemapContent += '        <changefreq>monthly</changefreq>\n';
  sitemapContent += '        <priority>0.7</priority>\n';
  sitemapContent += '    </url>\n';
});

sitemapContent += '</urlset>\n';

// Write sitemap to file
fs.writeFileSync('sitemap.xml', sitemapContent);
console.log('Sitemap generated successfully!');

// Also copy to public directory for build process
fs.writeFileSync('public/sitemap.xml', sitemapContent);
console.log('Sitemap copied to public directory!');