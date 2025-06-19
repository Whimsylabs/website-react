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
  { path: '/faq', outputFile: 'faq/index.html', title: "Frequently Asked Questions | WhimsyLabs Virtual Lab Software", description: "Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators." },
  { path: '/contact', outputFile: 'contact/index.html', title: "Contact Us | WhimsyLabs Virtual Lab Software", description: "Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education." }
];

// Function to extract blog post content
function extractBlogPostContent(slug) {
  const blogDir = path.resolve(__dirname, 'src/Components/blog');
  const files = fs.readdirSync(blogDir);
  
  // Filter for Post*.js files
  const postFiles = files.filter(file => /^Post\d+\.js$/.test(file));
  
  for (const file of postFiles) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract post slug
    const slugMatch = content.match(/export const slug = ["'](.+?)["'];/);
    
    if (slugMatch && slugMatch[1] === slug) {
      // Try to extract post content - this might be in different formats
      let postContent = '';
      const contentMatch1 = content.match(/export const content = \(\s*<div>([\s\S]*?)<\/div>\s*\);/);
      const contentMatch2 = content.match(/export const content = `([\s\S]*?)`;/);
      const contentMatch3 = content.match(/export const content = \(\s*([\s\S]*?)\s*\);/);
      
      if (contentMatch1) {
        postContent = contentMatch1[1];
      } else if (contentMatch2) {
        postContent = contentMatch2[1];
      } else if (contentMatch3) {
        postContent = contentMatch3[1];
      }
      
      return postContent;
    }
  }
  
  return '';
}

// Add blog post routes
blogPosts.forEach(post => {
  const postContent = extractBlogPostContent(post.slug);
  
  routes.push({
    path: `/blog/${post.slug}`,
    outputFile: `blog/${post.slug}/index.html`,
    title: `${post.title} | WhimsyLabs Blog`,
    description: post.description,
    date: post.date,
    content: postContent
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
  
  // Add special handling for blog index page
  if (route.path === '/blog') {
    // Create a simplified HTML version of the blog index for crawlers
    let blogIndexHtml = '<div id="crawler-content" style="display:none;" aria-hidden="true">\n';
    blogIndexHtml += '  <h1>WhimsyLabs Blog</h1>\n';
    blogIndexHtml += '  <p>Latest Virtual Laboratory Innovations & Teaching Resources</p>\n';
    
    // Sort blog posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedPosts.forEach(post => {
      blogIndexHtml += `  <article itemscope itemtype="https://schema.org/BlogPosting">\n`;
      blogIndexHtml += `    <h2 itemprop="headline">${post.title}</h2>\n`;
      blogIndexHtml += `    <meta itemprop="datePublished" content="${post.date}">\n`;
      blogIndexHtml += `    <p>Published: ${post.date}</p>\n`;
      blogIndexHtml += `    <div itemprop="description">${post.description}</div>\n`;
      blogIndexHtml += `    <a href="/blog/${post.slug}" itemprop="url">Read More</a>\n`;
      blogIndexHtml += `  </article>\n`;
    });
    
    blogIndexHtml += '</div>\n';
    
    // Insert the blog index content before the closing body tag
    updatedHtml = updatedHtml.replace('</body>', `${blogIndexHtml}</body>`);
  }
  
  // Add special handling for FAQ page to improve crawler accessibility
  if (route.path === '/faq') {
    // Extract FAQ content from the FAQ.js file
    try {
      const faqPath = path.resolve(__dirname, 'src/Components/FAQ.js');
      const faqContent = fs.readFileSync(faqPath, 'utf8');
      
      // Extract FAQ data using regex
      const faqCategoriesMatch = faqContent.match(/const faqCategories = ({[\s\S]*?});/);
      
      if (faqCategoriesMatch) {
        // Create a simplified HTML version of the FAQ content for crawlers
        let faqHtml = '<div id="faq-crawler-content" style="display:none">\n';
        faqHtml += '  <h2>Frequently Asked Questions</h2>\n';
        
        // Parse the FAQ categories object (this is a simplified approach)
        const categoriesText = faqCategoriesMatch[1];
        const categoryMatches = categoriesText.matchAll(/"([^"]+)":\s*\[([\s\S]*?)(?=\],|}\);)/g);
        
        for (const match of categoryMatches) {
          const category = match[1];
          const items = match[2];
          
          faqHtml += `  <h3>${category}</h3>\n`;
          
          // Extract questions and answers
          const qaMatches = items.matchAll(/{\s*question:\s*"([^"]+)",\s*answer:\s*"([^"]+)"\s*}/g);
          
          for (const qaMatch of qaMatches) {
            const question = qaMatch[1];
            const answer = qaMatch[2];
            
            faqHtml += `  <div itemscope itemtype="https://schema.org/Question">\n`;
            faqHtml += `    <h4 itemprop="name">${question}</h4>\n`;
            faqHtml += `    <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">\n`;
            faqHtml += `      <div itemprop="text">${answer}</div>\n`;
            faqHtml += `    </div>\n`;
            faqHtml += `  </div>\n`;
          }
        }
        
        faqHtml += '</div>\n';
        
        // Insert the FAQ content before the closing body tag
        updatedHtml = updatedHtml.replace('</body>', `${faqHtml}</body>`);
      }
    } catch (error) {
      console.error('Error processing FAQ content:', error);
    }
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
    
    // Add blog post content for crawlers if available
    if (route.content) {
      const blogPostHtml = `
<div id="crawler-content" style="display:none;" aria-hidden="true">
  <article itemscope itemtype="https://schema.org/BlogPosting">
    <h1 itemprop="headline">${route.title.replace(' | WhimsyLabs Blog', '')}</h1>
    <meta itemprop="datePublished" content="${route.date}">
    <p>Published: ${route.date}</p>
    <div itemprop="description">${route.description}</div>
    <div itemprop="articleBody">${route.content}</div>
  </article>
</div>`;
      
      updatedHtml = updatedHtml.replace('</body>', `${blogPostHtml}\n</body>`);
    }
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