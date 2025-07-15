/**
 * Enhanced Static Content Generator
 * Generates actual HTML content for SEO, not just React shells
 */

const fs = require('fs');
const path = require('path');

console.log('Generating SEO-friendly static content...');

// Function to get blog posts data
function getBlogPosts() {
  const blogDir = path.resolve(__dirname, 'src/Components/blog');
  const posts = [];
  
  const files = fs.readdirSync(blogDir);
  const postFiles = files.filter(file => /^Post\d+\.js$/.test(file));
  
  postFiles.forEach(file => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
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

// Generate full HTML content for each page
function generateFullHTML(route, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.webp" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    
    <!-- SEO Meta Tags -->
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <meta name="keywords" content="virtual science labs, online experiments, STEM education, WhimsyLabs" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://whimsylabs.ai${route.path}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="https://whimsylabs.ai/whimsycat.svg" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://whimsylabs.ai${route.path}" />
    <meta property="twitter:title" content="${route.title}" />
    <meta property="twitter:description" content="${route.description}" />
    <meta property="twitter:image" content="https://whimsylabs.ai/whimsycat.svg" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://whimsylabs.ai${route.path}" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${route.title}",
      "description": "${route.description}",
      "url": "https://whimsylabs.ai${route.path}",
      "publisher": {
        "@type": "Organization",
        "name": "WhimsyLabs",
        "url": "https://whimsylabs.ai"
      }
    }
    </script>
    
    <!-- CSS -->
    <link href="/static/css/main.css" rel="stylesheet">
</head>
<body>
    <!-- SEO Content (visible to crawlers) -->
    <div id="seo-content">
        ${content}
    </div>
    
    <!-- React App Root (for interactive features) -->
    <div id="root"></div>
    
    <!-- Hide SEO content when React loads -->
    <script>
        window.__INITIAL_ROUTE__ = "${route.path}";
        
        // Hide SEO content once React loads
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                const seoContent = document.getElementById('seo-content');
                const reactRoot = document.getElementById('root');
                
                if (reactRoot && reactRoot.children.length > 0) {
                    if (seoContent) seoContent.style.display = 'none';
                }
            }, 100);
        });
    </script>
    
    <!-- React Bundle -->
    <script src="/static/js/main.js"></script>
</body>
</html>`;
}

// Static content for each page
function getStaticContent(route) {
  const baseStyles = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
      .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
      h1 { color: #1f1968; font-size: 2.5em; margin-bottom: 20px; }
      h2 { color: #1f1968; font-size: 2em; margin-top: 30px; margin-bottom: 15px; }
      h3 { color: #1f1968; font-size: 1.5em; margin-top: 25px; margin-bottom: 10px; }
      p { margin-bottom: 15px; }
      .header { background: linear-gradient(135deg, #DABEFF 0%, #95CEF6 100%); padding: 20px 0; }
      .nav { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
      .logo { font-size: 1.5em; font-weight: bold; color: #1f1968; }
      .nav-links { display: flex; gap: 20px; }
      .nav-links a { color: #1f1968; text-decoration: none; font-weight: 500; }
      .footer { background: #1f1968; color: white; padding: 40px 0; margin-top: 50px; }
      .blog-post { margin-bottom: 30px; padding: 20px; border: 1px solid #eee; border-radius: 8px; }
      .blog-meta { color: #666; font-size: 0.9em; margin-bottom: 10px; }
    </style>
  `;

  switch (route.path) {
    case '/':
      return `${baseStyles}
        <div class="header">
          <nav class="nav">
            <div class="logo">WhimsyLabs</div>
            <div class="nav-links">
              <a href="/blog">Blog</a>
              <a href="/services">Services</a>
              <a href="/features">Features</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </div>
        <div class="container">
          <h1>Virtual Science Labs for Everyone</h1>
          <p>WhimsyLabs provides cutting-edge virtual laboratory experiences that make science education accessible, engaging, and effective. Our platform offers interactive experiments across biology, chemistry, and physics.</p>
          
          <h2>Why Choose WhimsyLabs?</h2>
          <ul>
            <li><strong>Accessible:</strong> Run experiments from anywhere with an internet connection</li>
            <li><strong>Safe:</strong> No dangerous chemicals or equipment needed</li>
            <li><strong>Cost-effective:</strong> Reduce lab setup and maintenance costs</li>
            <li><strong>Comprehensive:</strong> Cover all major science topics and curricula</li>
          </ul>
          
          <h2>Our Virtual Labs</h2>
          <p>Experience hands-on learning with our state-of-the-art virtual laboratory simulations. From molecular biology to quantum physics, our labs provide realistic, interactive experiences that enhance understanding and retention.</p>
        </div>
        <div class="footer">
          <div class="container">
            <p>&copy; 2024 WhimsyLabs. All rights reserved.</p>
          </div>
        </div>`;

    case '/blog':
      const blogPosts = getBlogPosts();
      const blogPostsHTML = blogPosts.map(post => `
        <article class="blog-post">
          <h3><a href="/blog/${post.slug}">${post.title}</a></h3>
          <div class="blog-meta">Published on ${new Date(post.date).toLocaleDateString()}</div>
          <p>${post.description}</p>
          <a href="/blog/${post.slug}">Read more →</a>
        </article>
      `).join('');

      return `${baseStyles}
        <div class="header">
          <nav class="nav">
            <div class="logo">WhimsyLabs</div>
            <div class="nav-links">
              <a href="/">Home</a>
              <a href="/services">Services</a>
              <a href="/features">Features</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </div>
        <div class="container">
          <h1>WhimsyLabs Blog</h1>
          <p>Stay updated with the latest in virtual science education, lab innovations, and educational technology.</p>
          ${blogPostsHTML}
        </div>
        <div class="footer">
          <div class="container">
            <p>&copy; 2024 WhimsyLabs. All rights reserved.</p>
          </div>
        </div>`;

    case '/faq':
      return `${baseStyles}
        <div class="header">
          <nav class="nav">
            <div class="logo">WhimsyLabs</div>
            <div class="nav-links">
              <a href="/">Home</a>
              <a href="/blog">Blog</a>
              <a href="/services">Services</a>
              <a href="/features">Features</a>
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </div>
        <div class="container">
          <h1>Frequently Asked Questions</h1>
          
          <h2>What is WhimsyLabs?</h2>
          <p>WhimsyLabs is a virtual science laboratory platform that provides interactive, realistic science experiments that can be accessed from anywhere with an internet connection.</p>
          
          <h2>How do virtual labs work?</h2>
          <p>Our virtual labs use advanced simulation technology to recreate real laboratory conditions. Students can manipulate equipment, observe reactions, and collect data just like in a physical lab.</p>
          
          <h2>What subjects do you cover?</h2>
          <p>We offer virtual labs for biology, chemistry, physics, and earth science. Our curriculum covers topics from basic concepts to advanced research-level experiments.</p>
          
          <h2>Is WhimsyLabs suitable for all grade levels?</h2>
          <p>Yes! We have experiments designed for elementary, middle school, high school, and college levels. Each lab can be adapted to different skill levels.</p>
          
          <h2>Do I need special software?</h2>
          <p>No special software is required. WhimsyLabs runs in any modern web browser on computers, tablets, and smartphones.</p>
          
          <h2>How much does it cost?</h2>
          <p>We offer flexible pricing plans for individuals, classrooms, and institutions. Contact us for detailed pricing information.</p>
          
          <h2>Can I try it before purchasing?</h2>
          <p>Absolutely! We offer free trial access so you can experience our virtual labs before making a commitment.</p>
        </div>
        <div class="footer">
          <div class="container">
            <p>&copy; 2024 WhimsyLabs. All rights reserved.</p>
          </div>
        </div>`;

    case '/services':
      return `${baseStyles}
        <div class="header">
          <nav class="nav">
            <div class="logo">WhimsyLabs</div>
            <div class="nav-links">
              <a href="/">Home</a>
              <a href="/blog">Blog</a>
              <a href="/features">Features</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </div>
        <div class="container">
          <h1>Our Services</h1>
          <p>WhimsyLabs offers comprehensive virtual laboratory solutions for educational institutions, students, and researchers.</p>
          
          <h2>Virtual Laboratory Platform</h2>
          <p>Access hundreds of interactive science experiments covering biology, chemistry, physics, and earth science. Our platform provides realistic simulations that mirror real laboratory conditions.</p>
          
          <h2>Curriculum Integration</h2>
          <p>Our labs are designed to integrate seamlessly with existing curricula. We provide lesson plans, assessment tools, and teacher resources to enhance the learning experience.</p>
          
          <h2>Custom Lab Development</h2>
          <p>Need a specific experiment? We can develop custom virtual labs tailored to your unique requirements and learning objectives.</p>
          
          <h2>Teacher Training</h2>
          <p>We offer comprehensive training programs to help educators effectively integrate virtual labs into their teaching methodology.</p>
          
          <h2>Technical Support</h2>
          <p>Our dedicated support team is available to assist with technical issues, implementation questions, and ongoing support needs.</p>
          
          <h2>Analytics and Assessment</h2>
          <p>Track student progress with detailed analytics and assessment tools that provide insights into learning outcomes and areas for improvement.</p>
        </div>
        <div class="footer">
          <div class="container">
            <p>&copy; 2024 WhimsyLabs. All rights reserved.</p>
          </div>
        </div>`;

    case '/features':
      return `${baseStyles}
        <div class="header">
          <nav class="nav">
            <div class="logo">WhimsyLabs</div>
            <div class="nav-links">
              <a href="/">Home</a>
              <a href="/blog">Blog</a>
              <a href="/services">Services</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </div>
        <div class="container">
          <h1>Platform Features</h1>
          <p>Discover the powerful features that make WhimsyLabs the leading virtual science laboratory platform.</p>
          
          <h2>Realistic Simulations</h2>
          <p>Our labs use advanced physics engines and scientific models to provide authentic laboratory experiences that mirror real-world conditions.</p>
          
          <h2>Interactive Equipment</h2>
          <p>Manipulate virtual laboratory equipment including microscopes, spectrometers, centrifuges, and more with realistic controls and responses.</p>
          
          <h2>Real-time Data Collection</h2>
          <p>Collect and analyze data in real-time, just like in a physical laboratory. Export results for further analysis or reporting.</p>
          
          <h2>Collaborative Learning</h2>
          <p>Work together with classmates in shared virtual lab spaces, promoting collaborative learning and peer interaction.</p>
          
          <h2>Assessment Integration</h2>
          <p>Built-in assessment tools allow teachers to evaluate student understanding and track progress through experiments.</p>
          
          <h2>Cross-Platform Access</h2>
          <p>Access labs from any device - desktop, laptop, tablet, or smartphone - with consistent performance across platforms.</p>
          
          <h2>Offline Capability</h2>
          <p>Download experiments for offline use, ensuring learning can continue even without internet connectivity.</p>
        </div>
        <div class="footer">
          <div class="container">
            <p>&copy; 2024 WhimsyLabs. All rights reserved.</p>
          </div>
        </div>`;

    case '/contact':
      return `${baseStyles}
        <div class="header">
          <nav class="nav">
            <div class="logo">WhimsyLabs</div>
            <div class="nav-links">
              <a href="/">Home</a>
              <a href="/blog">Blog</a>
              <a href="/services">Services</a>
              <a href="/features">Features</a>
              <a href="/faq">FAQ</a>
            </div>
          </nav>
        </div>
        <div class="container">
          <h1>Contact Us</h1>
          <p>Get in touch with the WhimsyLabs team. We're here to help you bring virtual science labs to your classroom or institution.</p>
          
          <h2>Get Started Today</h2>
          <p>Ready to transform your science education with virtual labs? Contact us to schedule a demo, request pricing information, or ask questions about our platform.</p>
          
          <h2>Support</h2>
          <p>Need technical support or have questions about using WhimsyLabs? Our support team is ready to assist you.</p>
          
          <h2>Partnership Opportunities</h2>
          <p>Interested in partnering with WhimsyLabs? We work with educational institutions, technology companies, and content creators to expand access to quality science education.</p>
          
          <h2>Media Inquiries</h2>
          <p>Members of the press can contact us for information about WhimsyLabs, our mission, and the future of virtual science education.</p>
          
          <div style="margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> info@whimsylabs.ai</p>
            <p><strong>Website:</strong> https://whimsylabs.ai</p>
            <p><strong>Support:</strong> Available Monday-Friday, 9 AM - 5 PM EST</p>
          </div>
        </div>
        <div class="footer">
          <div class="container">
            <p>&copy; 2024 WhimsyLabs. All rights reserved.</p>
          </div>
        </div>`;

    default:
      return `${baseStyles}
        <div class="container">
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/">Return to Homepage</a>
        </div>`;
  }
}

// Define routes
const routes = [
  { 
    path: '/', 
    outputFile: 'index.html', 
    title: 'WhimsyLabs - Virtual Science Labs for Everyone', 
    description: 'Experience cutting-edge virtual laboratory simulations for biology, chemistry, and physics. Safe, accessible, and engaging science education for all levels.' 
  },
  { 
    path: '/blog', 
    outputFile: 'blog/index.html', 
    title: 'Blog - WhimsyLabs', 
    description: 'Stay updated with the latest in virtual science education, lab innovations, and educational technology from WhimsyLabs.' 
  },
  { 
    path: '/services', 
    outputFile: 'services/index.html', 
    title: 'Services - WhimsyLabs', 
    description: 'Comprehensive virtual laboratory solutions for educational institutions. Custom lab development, teacher training, and technical support.' 
  },
  { 
    path: '/features', 
    outputFile: 'features/index.html', 
    title: 'Features - WhimsyLabs', 
    description: 'Discover powerful features of WhimsyLabs virtual science platform: realistic simulations, interactive equipment, and collaborative learning.' 
  },
  { 
    path: '/faq', 
    outputFile: 'faq/index.html', 
    title: 'FAQ - WhimsyLabs', 
    description: 'Find answers to frequently asked questions about WhimsyLabs virtual science laboratories, pricing, and technical requirements.' 
  },
  { 
    path: '/contact', 
    outputFile: 'contact/index.html', 
    title: 'Contact Us - WhimsyLabs', 
    description: 'Get in touch with WhimsyLabs for demos, pricing, support, or partnership opportunities. Transform your science education today.' 
  }
];

// Generate blog post pages
const blogPosts = getBlogPosts();
blogPosts.forEach(post => {
  routes.push({
    path: `/blog/${post.slug}`,
    outputFile: `blog/${post.slug}/index.html`,
    title: `${post.title} - WhimsyLabs Blog`,
    description: post.description
  });
});

// Generate HTML files
routes.forEach(route => {
  const content = getStaticContent(route);
  const html = generateFullHTML(route, content);
  
  const outputDir = path.dirname(path.resolve(__dirname, 'build', route.outputFile));
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(path.resolve(__dirname, 'build', route.outputFile), html);
  console.log(`Generated SEO-friendly: ${route.outputFile}`);
});

console.log('SEO-friendly static content generation complete!');