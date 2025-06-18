const fs = require('fs');
const path = require('path');

console.log('Starting static HTML page generation...');

// Function to get blog posts data
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
    const descriptionMatch = content.match(/export const description =\s*["'](.+?)["'];/);
    
    if (titleMatch && dateMatch && slugMatch && descriptionMatch) {
      posts.push({
        title: titleMatch[1],
        date: dateMatch[1],
        slug: slugMatch[1],
        description: descriptionMatch[1]
      });
    }
  });
  
  return posts;
}

// Get blog posts
const blogPosts = getBlogPosts();

// Define the routes we want to generate static HTML files for
const routes = [
  { path: '/blog', outputFile: 'blog/index.html', title: "WhimsyLabs Blog - Latest Virtual Laboratory Innovations & Teaching Resources", description: "Stay updated with WhimsyLabs' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators." },
  { path: '/services', outputFile: 'services/index.html', title: "WhimsyLabs Services - Custom Virtual Lab Solutions for Education & Industry", description: "Discover WhimsyLabs' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments." },
  { path: '/features', outputFile: 'features/index.html', title: "WhimsyLabs Features - Cutting-Edge Virtual Laboratory Technology", description: "Explore WhimsyLabs' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments." },
  { path: '/faq', outputFile: 'faq/index.html', title: "Frequently Asked Questions | WhimsyLabs Virtual Lab Software", description: "Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators." }
];

// Add blog post routes
blogPosts.forEach(post => {
  routes.push({
    path: `/blog/${post.slug}`,
    outputFile: `blog/${post.slug}/index.html`,
    title: `${post.title} | WhimsyLabs Blog`,
    description: post.description,
    date: post.date
  });
});

// Read the built index.html file
const indexPath = path.resolve(__dirname, 'build', 'index.html');
console.log(`Reading index.html from: ${indexPath}`);

let indexHtml;
try {
  indexHtml = fs.readFileSync(indexPath, 'utf8');
  console.log('Successfully read index.html');
} catch (error) {
  console.error('Error reading index.html:', error);
  process.exit(1);
}

// Function to update meta tags and other page-specific content
function updatePageContent(html, route) {
  let updatedHtml = html;
  
  // Update title
  updatedHtml = updatedHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );
  
  // Update meta description
  const descriptionRegex = /<meta\s+name="description"\s+content=".*?">/;
  if (descriptionRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      descriptionRegex,
      `<meta name="description" content="${route.description}">`
    );
  } else {
    // If meta description doesn't exist, add it
    updatedHtml = updatedHtml.replace(
      /<\/head>/,
      `  <meta name="description" content="${route.description}">\n  </head>`
    );
  }
  
  // Update Open Graph tags
  const ogTitleRegex = /<meta\s+property="og:title"\s+content=".*?">/;
  if (ogTitleRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      ogTitleRegex,
      `<meta property="og:title" content="${route.title}">`
    );
  }
  
  const ogDescRegex = /<meta\s+property="og:description"\s+content=".*?">/;
  if (ogDescRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      ogDescRegex,
      `<meta property="og:description" content="${route.description}">`
    );
  }
  
  const ogUrlRegex = /<meta\s+property="og:url"\s+content=".*?">/;
  if (ogUrlRegex.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      ogUrlRegex,
      `<meta property="og:url" content="https://whimsylabs.ai${route.path}">`
    );
  }
  
  // Add article metadata for blog posts
  if (route.path.startsWith('/blog/') && route.date) {
    // Add article:published_time meta tag
    updatedHtml = updatedHtml.replace(
      /<\/head>/,
      `  <meta property="article:published_time" content="${route.date}">\n  <meta property="og:type" content="article">\n  </head>`
    );
  }
  
  // Add the initial route script
  const routeScript = `
  <script>
    // Set initial route for React Router
    window.__INITIAL_ROUTE__ = "${route.path}";
  </script>
  `;
  
  // Insert the script right before the closing head tag
  updatedHtml = updatedHtml.replace('</head>', `${routeScript}\n</head>`);
  
  return updatedHtml;
}

// Copy all assets from the build directory to each route directory
function copyAssets(routePath) {
  const buildDir = path.resolve(__dirname, 'build');
  const targetDir = path.resolve(__dirname, 'build', routePath.substring(1)); // Remove leading slash
  
  // Skip if trying to copy to root
  if (routePath === '/') return;
  
  console.log(`Copying assets to: ${targetDir}`);
  
  // Create the target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Get all files in the build directory
  const files = fs.readdirSync(buildDir);
  
  // Copy each file/directory except for HTML files and directories we're creating
  files.forEach(file => {
    const srcPath = path.join(buildDir, file);
    const destPath = path.join(targetDir, file);
    
    // Skip HTML files and directories we're creating
    if (file === 'index.html' || routes.some(r => r.path.substring(1) === file)) {
      return;
    }
    
    // Copy the file or directory
    if (fs.statSync(srcPath).isDirectory()) {
      // For directories, create the directory and copy contents
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      
      // Use a simple recursive function to copy directory contents
      const copyDir = (src, dest) => {
        const entries = fs.readdirSync(src);
        entries.forEach(entry => {
          const srcPath = path.join(src, entry);
          const destPath = path.join(dest, entry);
          
          if (fs.statSync(srcPath).isDirectory()) {
            if (!fs.existsSync(destPath)) {
              fs.mkdirSync(destPath, { recursive: true });
            }
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        });
      };
      
      copyDir(srcPath, destPath);
    } else {
      // For files, just copy them
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Process each route and generate the corresponding HTML file
routes.forEach(route => {
  console.log(`Generating HTML for route: ${route.path}`);
  
  // Update page content
  let pageHtml = updatePageContent(indexHtml, route);
  
  // Create the output directory if it doesn't exist
  const outputDir = path.dirname(path.resolve(__dirname, 'build', route.outputFile));
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created directory: ${outputDir}`);
  }
  
  // Write the HTML file
  try {
    fs.writeFileSync(
      path.resolve(__dirname, 'build', route.outputFile),
      pageHtml
    );
    console.log(`Generated: ${route.outputFile}`);
    
    // Copy assets to the route directory
    copyAssets(route.path);
  } catch (error) {
    console.error(`Error writing file ${route.outputFile}:`, error);
  }
});

console.log('All static HTML pages have been generated!');