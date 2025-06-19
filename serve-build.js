/**
 * Simple HTTP server to serve the build directory locally
 * This allows testing the static HTML files as they would appear when deployed
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BUILD_DIR = path.join(__dirname, 'build');

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

// Create the server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Parse the URL
  let url = req.url;
  
  // Handle root URL
  if (url === '/') {
    url = '/index.html';
  }
  
  // Handle .html extensions specially - serve the file directly
  if (url.endsWith('.html')) {
    // Keep the URL as is, we'll serve the .html file directly
  }
  // Handle URLs without file extensions (assume they're directories)
  else if (!path.extname(url) && !url.endsWith('/')) {
    url += '/';
  }
  
  // Handle directory URLs
  if (url.endsWith('/')) {
    url += 'index.html';
  }
  
  // Construct the file path
  const filePath = path.join(BUILD_DIR, url);
  
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found, try the 404.html
      const notFoundPath = path.join(BUILD_DIR, '404.html');
      fs.access(notFoundPath, fs.constants.F_OK, (err404) => {
        if (err404) {
          // No 404.html file, send a simple 404 response
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          // Serve the 404.html file
          fs.readFile(notFoundPath, (readErr, data) => {
            if (readErr) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');
            } else {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end(data);
            }
          });
        }
      });
      return;
    }
    
    // Determine the content type based on the file extension
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Serving files from: ${BUILD_DIR}`);
  console.log('Available routes:');
  console.log('  - / (Home page)');
  console.log('  - /blog (Blog index)');
  console.log('  - /blog/{slug} (Individual blog posts)');
  console.log('  - /faq (FAQ page)');
  console.log('  - /services (Services page)');
  console.log('  - /features (Features page)');
  console.log('  - /contact (Contact page)');
  console.log('\nPress Ctrl+C to stop the server');
});