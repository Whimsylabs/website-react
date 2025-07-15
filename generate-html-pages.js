const fs = require('fs');
const path = require('path');

console.log('Starting static HTML page generation...');

// Function to extract FAQ content and convert to static HTML
function generateFAQContent() {
  let html = `
    <div class="faq-static-content">
      <header>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our virtual lab software and how it can transform STEM education</p>
      </header>
      <main>
        <section>
          <h2>About WhimsyLabs</h2>
          <div class="faq-item">
            <h3>What is WhimsyLabs virtual lab software?</h3>
            <p>WhimsyLabs is a sandbox virtual laboratory simulation that gives you the freedom to explore, play, and learn scientific concepts firsthand. It accurately models biological, chemical, and physical reactions and processes, providing a true-to-life experience without the limitations and risks of a real lab.</p>
          </div>
          <div class="faq-item">
            <h3>Is WhimsyLabs a for-profit company?</h3>
            <p>We're not here to chase profits. WhimsyLabs is built like Wikipedia - funded by supporters who believe in making science education fair and fun for everyone. We offer our labs to schools of all sizes, especially those with limited resources.</p>
          </div>
          <div class="faq-item">
            <h3>What makes WhimsyLabs different from other virtual lab platforms?</h3>
            <p>WhimsyLabs is the only platform that combines high-fidelity liquid physics, real-time AI tutoring, sandbox freedom, and full VR/Web immersion. Unlike rigid step-by-step tools, WhimsyLabs supports open experimentation with realistic physics, building critical thinking and procedural fluency.</p>
          </div>
        </section>
        
        <section>
          <h2>Educational Benefits</h2>
          <div class="faq-item">
            <h3>How do virtual labs help students learn?</h3>
            <p>Virtual labs help students learn by providing hands-on experience in a safe environment. They allow students to explore and experiment with various scientific phenomena and equipment, building laboratory skills that transfer to physical labs.</p>
          </div>
          <div class="faq-item">
            <h3>How does WhimsyLabs compare to traditional labs?</h3>
            <p>WhimsyLabs complements traditional labs by providing unlimited practice opportunities without consuming physical resources or creating safety risks. Students can build confidence and skills in the virtual environment before transitioning to physical labs.</p>
          </div>
        </section>
        
        <section>
          <h2>Technical Features</h2>
          <div class="faq-item">
            <h3>How does WhimsyLabs' web and VR environment work?</h3>
            <p>WhimsyLabs runs both in-browser and in full immersive VR. Students can interact with experiments using a mouse and keyboard, touchscreen, or VR controllers. The experience is consistent across devices, making learning accessible while maintaining realism and interactivity.</p>
          </div>
          <div class="faq-item">
            <h3>Is WhimsyLabs compatible with Chromebooks?</h3>
            <p>Yes. WhimsyLabs is optimized to run smoothly on Chromebooks, desktops, laptops, and VR devices. This ensures high-quality STEM education is accessible on almost any device, supporting equitable access across various schools and students.</p>
          </div>
        </section>
        
        <section>
          <h2>Curriculum & Content</h2>
          <div class="faq-item">
            <h3>What subjects do WhimsyLabs virtual labs cover?</h3>
            <p>WhimsyLabs covers Biology, Chemistry, and Physics with accurately modeled experiments and simulations. Our virtual labs allow students to perform dissections, chemical reactions, and physics experiments in a safe, controlled environment.</p>
          </div>
        </section>
        
        <section>
          <h2>Teaching & Assessment</h2>
          <div class="faq-item">
            <h3>How does WhimsyLabs support teachers?</h3>
            <p>WhimsyLabs supports teachers by saving time on lab setup, cleanup, and assessment. Our AI-driven assessment provides instant, detailed feedback on students' actions, giving measurable insights into learning progress.</p>
          </div>
          <div class="faq-item">
            <h3>How does the AI tutor work in practice?</h3>
            <p>Our AI tutor supports students in real-time with context-sensitive feedback from the user's actions. Whimsycat will help guide students through experimental steps, warn about procedural errors, and provide summaries and safety tips.</p>
          </div>
        </section>
      </main>
    </div>
    <style>
      .faq-static-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .faq-static-content header {
        text-align: center;
        margin-bottom: 40px;
      }
      .faq-static-content h1 {
        color: #1f1968;
        font-size: 2.5rem;
        margin-bottom: 20px;
      }
      .faq-static-content h2 {
        color: #1f1968;
        font-size: 1.8rem;
        margin: 30px 0 20px 0;
        border-bottom: 2px solid #dabeff;
        padding-bottom: 10px;
      }
      .faq-static-content h3 {
        color: #333;
        font-size: 1.2rem;
        margin: 20px 0 10px 0;
      }
      .faq-item {
        margin-bottom: 25px;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #6172B3;
      }
      .faq-item p {
        margin: 0;
        color: #555;
      }
      @media (max-width: 768px) {
        .faq-static-content {
          padding: 15px;
        }
        .faq-static-content h1 {
          font-size: 2rem;
        }
      }
    </style>
  `;
  
  return html;
}

// Function to generate contact page content
function generateContactContent() {
  return `
    <div class="contact-static-content">
      <header>
        <h1>Contact WhimsyLabs</h1>
        <p>We'd love to hear from you! Whether you're interested in trying our virtual labs at your school or have general questions, we're here to help.</p>
      </header>
      <main>
        <section>
          <h2>Get in Touch</h2>
          <p>Ready to transform STEM education at your school? Contact us to request a trial or ask any questions about our virtual lab software.</p>
          
          <div class="contact-info">
            <h3>Email Us Directly</h3>
            <p>For immediate assistance, reach out to us at: <a href="mailto:inquiries@whimsylabs.ai">inquiries@whimsylabs.ai</a></p>
          </div>
          
          <div class="contact-form-info">
            <h3>Request a Trial</h3>
            <p>Interested in trying WhimsyLabs at your school? We offer free trials for educational institutions. Contact us with the following information:</p>
            <ul>
              <li>Your name and role at the institution</li>
              <li>School or organization name</li>
              <li>Number of students who would use the platform</li>
              <li>Subjects you're interested in (Biology, Chemistry, Physics)</li>
              <li>Any specific requirements or questions</li>
            </ul>
          </div>
          
          <div class="features-highlight">
            <h3>Why Choose WhimsyLabs?</h3>
            <ul>
              <li>Realistic physics simulations for authentic lab experiences</li>
              <li>AI-powered tutoring and assessment</li>
              <li>Cross-platform compatibility (Web, VR, Chromebooks)</li>
              <li>Safe environment for unlimited experimentation</li>
              <li>Significant cost savings compared to physical labs</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
    <style>
      .contact-static-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .contact-static-content header {
        text-align: center;
        margin-bottom: 40px;
      }
      .contact-static-content h1 {
        color: #1f1968;
        font-size: 2.5rem;
        margin-bottom: 20px;
      }
      .contact-static-content h2 {
        color: #1f1968;
        font-size: 1.8rem;
        margin: 30px 0 20px 0;
      }
      .contact-static-content h3 {
        color: #333;
        font-size: 1.3rem;
        margin: 25px 0 15px 0;
      }
      .contact-info, .contact-form-info, .features-highlight {
        margin-bottom: 30px;
        padding: 25px;
        background-color: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #6172B3;
      }
      .contact-static-content ul {
        margin: 15px 0;
        padding-left: 20px;
      }
      .contact-static-content li {
        margin-bottom: 8px;
      }
      .contact-static-content a {
        color: #1f1968;
        text-decoration: none;
        font-weight: bold;
      }
      .contact-static-content a:hover {
        color: #14b7ff;
        text-decoration: underline;
      }
      @media (max-width: 768px) {
        .contact-static-content {
          padding: 15px;
        }
        .contact-static-content h1 {
          font-size: 2rem;
        }
      }
    </style>
  `;
}

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

// Function to get static fallback content for each page
function getStaticFallbackContent(route) {
  const fallbackContent = {
    '/blog': `
      <div id="static-fallback" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1>WhimsyLabs Blog - Latest Virtual Laboratory Innovations</h1>
        <p>Stay updated with WhimsyLabs' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.</p>
        <div>
          <h2>Recent Posts:</h2>
          <ul>
            <li><a href="/blog/whimsylabs-education-revolution">WhimsyLabs Education Revolution</a></li>
            <li><a href="/blog/physicality-in-virtual-labs">Physicality in Virtual Labs</a></li>
            <li><a href="/blog/virtual-kidney-dissection-send-engagement">Virtual Kidney Dissection Send Engagement</a></li>
          </ul>
        </div>
        <p><a href="/">← Back to Home</a></p>
      </div>`,
    '/faq': `
      <div id="static-fallback" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1>Frequently Asked Questions</h1>
        <p>Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators.</p>
        <div>
          <h2>Common Questions:</h2>
          <h3>What is WhimsyLabs virtual lab software?</h3>
          <p>WhimsyLabs is a sandbox virtual laboratory simulation that gives you the freedom to explore, play and learn scientific concepts firsthand. It accurately models biological, chemical, and physical reactions and processes.</p>
          
          <h3>How do virtual labs help students learn?</h3>
          <p>Virtual labs help students learn by providing hands-on experience without the limitations and risks of a real lab. They allow students to explore and experiment with various scientific phenomena and equipment.</p>
          
          <h3>Can WhimsyLabs be used for remote teaching?</h3>
          <p>Yes, WhimsyLabs is specifically designed for both in-classroom and remote teaching scenarios. Students can access the virtual labs from anywhere, on desktop, mobile, or VR devices.</p>
        </div>
        <p><a href="/">← Back to Home</a></p>
      </div>`,
    '/services': `
      <div id="static-fallback" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1>WhimsyLabs Services</h1>
        <p>Discover WhimsyLabs' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments.</p>
        <div>
          <h2>Our Services:</h2>
          <ul>
            <li>Custom Virtual Lab Development</li>
            <li>Educational Content Creation</li>
            <li>Teacher Training and Support</li>
            <li>Integration and Deployment</li>
          </ul>
        </div>
        <p><a href="/">← Back to Home</a></p>
      </div>`,
    '/features': `
      <div id="static-fallback" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1>WhimsyLabs Features</h1>
        <p>Explore WhimsyLabs' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.</p>
        <div>
          <h2>Key Features:</h2>
          <ul>
            <li>Realistic Physics Simulations</li>
            <li>AI-Driven Assessment</li>
            <li>Cross-Platform Accessibility</li>
            <li>Immersive STEM Experiments</li>
            <li>Safety-First Virtual Environment</li>
          </ul>
        </div>
        <p><a href="/">← Back to Home</a></p>
      </div>`,
    '/contact': `
      <div id="static-fallback" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1>Contact WhimsyLabs</h1>
        <p>Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education.</p>
        <div>
          <h2>Contact Information:</h2>
          <p>Email: <a href="mailto:inquiries@whimsylabs.ai">inquiries@whimsylabs.ai</a></p>
          <p>We'd love to hear from you! Whether you're interested in trying our virtual labs at your school or have general questions, we're here to help.</p>
        </div>
        <p><a href="/">← Back to Home</a></p>
      </div>`
  };

  // Default fallback for blog posts
  if (route.path.startsWith('/blog/')) {
    return `
      <div id="static-fallback" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1>${route.title}</h1>
        <p>${route.description}</p>
        <p>This blog post contains rich interactive content. Please enable JavaScript to view the full experience.</p>
        <p><a href="/blog">← Back to Blog</a> | <a href="/">← Back to Home</a></p>
      </div>`;
  }

  return fallbackContent[route.path] || `
    <div id="static-fallback" style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h1>WhimsyLabs - Virtual Lab Software</h1>
      <p>Welcome to WhimsyLabs. Please enable JavaScript to view the full experience.</p>
      <p><a href="/">← Back to Home</a></p>
    </div>`;
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
  
  // Add static fallback content to noscript
  const staticContent = getStaticFallbackContent(route);
  updatedHtml = updatedHtml.replace(
    /<noscript>.*?<\/noscript>/s,
    `<noscript>${staticContent}</noscript>`
  );

  // Add the initial route script
  const routeScript = `
  <script>
    // Set initial route for React Router
    window.__INITIAL_ROUTE__ = "${route.path}";
  </script>
  `;
  
  // Insert the script right before the closing head tag
  updatedHtml = updatedHtml.replace('</head>', `${routeScript}\n</head>`);
  
  // Add structured data (JSON-LD) for better SEO
  let structuredData = '';
  if (route.path === '/faq') {
    structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is WhimsyLabs virtual lab software?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WhimsyLabs is a sandbox virtual laboratory simulation that gives you the freedom to explore, play, and learn scientific concepts firsthand. It accurately models biological, chemical, and physical reactions and processes, providing a true-to-life experience without the limitations and risks of a real lab."
          }
        },
        {
          "@type": "Question",
          "name": "How do virtual labs help students learn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Virtual labs help students learn by providing hands-on experience in a safe environment. They allow students to explore and experiment with various scientific phenomena and equipment, building laboratory skills that transfer to physical labs."
          }
        },
        {
          "@type": "Question",
          "name": "Is WhimsyLabs compatible with Chromebooks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. WhimsyLabs is optimized to run smoothly on Chromebooks, desktops, laptops, and VR devices. This ensures high-quality STEM education is accessible on almost any device, supporting equitable access across various schools and students."
          }
        }
      ]
    }
    </script>
    `;
  } else if (route.path === '/contact') {
    structuredData = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "WhimsyLabs",
        "url": "https://whimsylabs.ai",
        "email": "inquiries@whimsylabs.ai",
        "description": "Virtual laboratory software for STEM education",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "inquiries@whimsylabs.ai",
          "contactType": "customer service"
        }
      }
    }
    </script>
    `;
  }
  
  // Insert structured data into head
  if (structuredData) {
    updatedHtml = updatedHtml.replace('</head>', `${structuredData}\n</head>`);
  }

  // Add static content for SEO (inject into the body before React takes over)
  let staticContent = '';
  if (route.path === '/faq') {
    staticContent = generateFAQContent();
  } else if (route.path === '/contact') {
    staticContent = generateContactContent();
  }
  
  if (staticContent) {
    // Add a noscript tag with the static content for search engines
    const noscriptContent = `
    <noscript>
      ${staticContent}
    </noscript>
    `;
    
    // Also add the content in a hidden div that will be replaced by React
    const hiddenContent = `
    <div id="static-content" style="display: block;">
      ${staticContent}
      <script>
        // Hide static content once React loads
        document.addEventListener('DOMContentLoaded', function() {
          setTimeout(function() {
            const staticDiv = document.getElementById('static-content');
            const rootDiv = document.getElementById('root');
            if (rootDiv && rootDiv.children.length > 0 && staticDiv) {
              staticDiv.style.display = 'none';
            }
          }, 1000);
        });
      </script>
    </div>
    `;
    
    // Insert both noscript and hidden content after the root div
    updatedHtml = updatedHtml.replace(
      '<div id="root"></div>',
      `<div id="root"></div>${noscriptContent}${hiddenContent}`
    );
  }
  
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