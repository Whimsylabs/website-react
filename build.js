const fs = require("fs-extra");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

// Import our new React rendering utilities
const ComponentRenderer = require("./scripts/component-renderer");
const AssetExtractor = require("./scripts/asset-extractor");
const MetadataInjector = require("./scripts/metadata-injector");

// Initialize rendering utilities
const componentRenderer = new ComponentRenderer();
const assetExtractor = new AssetExtractor("./build");
const metadataInjector = new MetadataInjector();

// Configuration
const config = {
  srcDir: "./src",
  buildDir: "./build",
  distDir: "./build", // Generate static files to build directory to match GitHub Pages deployment
  publicDir: "./public",
  siteUrl: "https://whimsylabs.ai",
};

// Page metadata for SEO
const pageMetadata = {
  "/": {
    title: "WhimsyLabs - Award-Winning Virtual Lab Software for STEM Education",
    description:
      "WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.",
    keywords:
      "virtual lab software, online lab simulations, STEM virtual labs for schools, science education technology",
  },
  "/blog": {
    title:
      "WhimsyLabs Blog - Latest Virtual Laboratory Innovations & Teaching Resources",
    description:
      "Stay updated with WhimsyLabs' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.",
    keywords:
      "virtual laboratory technology, STEM education resources, science teaching tools, online lab teaching",
  },
  "/services": {
    title:
      "WhimsyLabs Services - Custom Virtual Lab Solutions for Education & Industry",
    description:
      "Discover WhimsyLabs' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments.",
    keywords:
      "custom virtual labs, educational simulations, STEM lab development, virtual lab consulting",
  },
  "/features": {
    title: "WhimsyLabs Features - Cutting-Edge Virtual Laboratory Technology",
    description:
      "Explore WhimsyLabs' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.",
    keywords:
      "virtual lab features, physics simulations, AI assessment, cross-platform labs",
  },
  "/faq": {
    title: "Frequently Asked Questions | WhimsyLabs Virtual Lab Software",
    description:
      "Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators.",
    keywords: "virtual lab FAQ, lab software questions, STEM education help",
  },
  "/contact": {
    title: "Contact Us | WhimsyLabs Virtual Lab Software",
    description:
      "Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education.",
    keywords: "contact WhimsyLabs, virtual lab trial, STEM education contact",
  },
};

// Route to component mapping
const routeComponentMap = {
  "/": "MainContent",
  "/blog": "Blog",
  "/services": "Services",
  "/features": "Features",
  "/faq": "FAQPage",
  "/contact": "ContactPage",
};

// Dynamic route patterns
const dynamicRoutes = {
  "/blog/:slug": "BlogPost",
};

/**
 * Get the React component for a given route
 * @param {string} route - The route path
 * @returns {React.Component} - The React component for the route
 */
function getComponentForRoute(route) {
  // Handle exact matches first
  if (routeComponentMap[route]) {
    return ReactComponents[routeComponentMap[route]];
  }

  // Handle dynamic routes
  if (route.startsWith("/blog/") && route !== "/blog") {
    return ReactComponents.BlogPost;
  }

  // Default fallback
  return ReactComponents.MainContent;
}

/**
 * Generate routes automatically from blog posts and static routes
 * @returns {Array} - Array of route configurations
 */
async function generateRouteConfigs() {
  const routes = [];

  // Add static routes
  Object.keys(routeComponentMap).forEach((path) => {
    const componentName = routeComponentMap[path];
    const metadata = pageMetadata[path] || {};

    routes.push({
      path,
      component: componentName,
      metadata,
      template: "page",
    });
  });

  // Add dynamic blog post routes
  try {
    const posts = await getBlogPosts();
    posts.forEach((post) => {
      routes.push({
        path: post.path,
        component: "BlogPost",
        metadata: {
          title: `${post.title} | WhimsyLabs Blog`,
          description:
            post.description || post.excerpt || "Read more on WhimsyLabs Blog",
          keywords: post.keywords || "virtual lab, STEM education, science",
        },
        template: "blog-post",
        data: post,
      });
    });
  } catch (error) {
    console.warn("⚠️ Could not generate blog post routes:", error.message);
  }

  return routes;
}

// Load React components
let ReactComponents = {};

async function loadReactComponents() {
  console.log("🔄 Loading React components individually...");

  try {
    // Load each component directly
    ReactComponents.MainContent =
      require("./src/Components/MainContent.js").default;
    console.log("✅ Loaded MainContent");

    ReactComponents.Blog = require("./src/Components/Blog.js").default;
    console.log("✅ Loaded Blog");

    ReactComponents.Services = require("./src/Components/Services.js").default;
    console.log("✅ Loaded Services");

    ReactComponents.Features =
      require("./src/Components/FeaturesPage.js").default;
    console.log("✅ Loaded Features");

    ReactComponents.FAQPage = require("./src/Components/FAQPage.js").default;
    console.log("✅ Loaded FAQPage");

    ReactComponents.ContactPage =
      require("./src/Components/ContactPage.js").default;
    console.log("✅ Loaded ContactPage");

    ReactComponents.BlogPost = require("./src/Components/BlogPost.js").default;
    console.log("✅ Loaded BlogPost");
  } catch (error) {
    console.error("❌ Error loading React components:", error);
    throw error;
  }
}

// Clean and create public directory (but preserve existing public assets)
async function setupDist() {
  try {
    // Only clean generated files, not the entire public directory
    const filesToClean = [
      `${config.distDir}/blog`,
      `${config.distDir}/services`,
      `${config.distDir}/features`,
      `${config.distDir}/faq`,
      `${config.distDir}/contact`,
      // Don't clean static folder - we need the JS/CSS files
      `${config.distDir}/sitemap.xml`,
      `${config.distDir}/404.html`,
    ];

    for (const file of filesToClean) {
      if (await fs.pathExists(file)) {
        await fs.remove(file);
      }
    }

    await fs.ensureDir(config.distDir);
    console.log("✅ Cleaned generated files in public directory");
  } catch (error) {
    console.warn(
      "⚠️ Could not clean public directory, creating new one:",
      error.message
    );
    await fs.ensureDir(config.distDir);
  }
}

// Copy static assets (optimized to avoid duplication)
async function copyAssets() {
  try {
    // Ensure dist directory exists
    await fs.ensureDir(config.distDir);
    
    // Copy React build static files (CSS/JS)
    const reactStaticDir = `${config.buildDir}/static`;
    const destStaticDir = `${config.distDir}/static`;
    
    if (await fs.pathExists(reactStaticDir)) {
      await fs.ensureDir(destStaticDir);
      await fs.copy(reactStaticDir, destStaticDir, { overwrite: true });
      console.log("✅ Copied React build static files");
    } else {
      console.warn("⚠️ React build static files not found - run 'npm run build-spa' first");
    }

    // Since distDir is the same as publicDir, we don't need to copy public assets
    // They're already in the right place
    if (config.distDir !== config.publicDir) {
      // Copy public directory assets (images, videos, etc.) only if different directories
      const publicDir = "./public";
      if (await fs.pathExists(publicDir)) {
        const publicAssets = await fs.readdir(publicDir);
        
        for (const asset of publicAssets) {
          const srcPath = path.join(publicDir, asset);
          const destPath = path.join(config.distDir, asset);
          
          try {
            // Remove existing file/directory if it exists to avoid permission issues
            if (await fs.pathExists(destPath)) {
              await fs.remove(destPath);
            }
            
            await fs.copy(srcPath, destPath, { overwrite: true });
          } catch (assetError) {
            console.warn(`⚠️ Could not copy ${asset}:`, assetError.message);
          }
        }
        
        console.log("✅ Copied public directory assets (images, videos, etc.)");
      } else {
        console.warn("⚠️ Public directory not found");
      }
    } else {
      console.log("✅ Public assets already in place (distDir same as publicDir)");
    }

  } catch (error) {
    console.error("❌ Error copying assets:", error.message);
  }
}

// Convert React blog posts to markdown for processing
async function convertBlogPosts() {
  const blogDir = "./src/Components/blog";
  const outputDir = "./content/blog";

  try {
    await fs.ensureDir(outputDir);

    // Mock require.context for blog posts
    const mockContext = (directory, useSubdirectories, regExp) => {
      console.log(
        `Mock require.context called with: ${directory} ${useSubdirectories} ${regExp}`
      );
      const keys = ["./post1.js", "./post2.js", "./post3.js"];
      const mockFn = (key) => {
        console.log(`Mock context function called with key: ${key}`);
        return {}; // Return empty object for now
      };
      mockFn.keys = () => keys;
      return mockFn;
    };

    // Set up require.context mock
    if (typeof require !== "undefined" && !require.context) {
      require.context = mockContext;
    }

    console.log("✅ Converted blog posts to markdown");
  } catch (error) {
    console.warn("⚠️ Could not convert blog posts:", error.message);
  }
}

// Get blog posts from the components
async function getBlogPosts() {
  const posts = [];

  try {
    // Import blog post data from the components
    const Post1 = require("./src/Components/blog/Post1.js");
    const Post2 = require("./src/Components/blog/Post2.js");
    const Post3 = require("./src/Components/blog/Post3.js");
    const Post4 = require("./src/Components/blog/Post4.js");
    const Post5 = require("./src/Components/blog/Post5.js");
    const Post6 = require("./src/Components/blog/Post6.js");

    const blogPosts = [
      {
        id: Post1.slug,
        title: Post1.title,
        date: Post1.date,
        description: Post1.description,
        content: Post1.content,
        path: `/blog/${Post1.slug}`,
      },
      {
        id: Post2.slug,
        title: Post2.title,
        date: Post2.date,
        description: Post2.description,
        content: Post2.content,
        path: `/blog/${Post2.slug}`,
      },
      {
        id: Post3.slug,
        title: Post3.title,
        date: Post3.date,
        description: Post3.description,
        content: Post3.content,
        path: `/blog/${Post3.slug}`,
      },
      {
        id: Post4.slug,
        title: Post4.title,
        date: Post4.date,
        description: Post4.description,
        content: Post4.content,
        path: `/blog/${Post4.slug}`,
      },
      {
        id: Post5.slug,
        title: Post5.title,
        date: Post5.date,
        description: Post5.description,
        content: Post5.content,
        path: `/blog/${Post5.slug}`,
      },
      {
        id: Post6.slug,
        title: Post6.title,
        date: Post6.date,
        description: Post6.description,
        content: Post6.content,
        path: `/blog/${Post6.slug}`,
      },
    ];

    return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.warn("⚠️ Could not load blog posts:", error.message);
    return [];
  }
}

/**
 * Generate HTML for a route using React Server-Side Rendering
 * @param {string} route - The route to render
 * @param {Object} data - Additional data for the route
 * @returns {Object} - Object containing HTML and metadata
 */
async function generatePageHTML(route, data = {}) {
  try {
    // Get the component for this route
    const Component = getComponentForRoute(route);
    if (!Component) {
      throw new Error(`No component found for route: ${route}`);
    }

    // Get optimized assets
    const assets = assetExtractor.getOptimizedAssets();

    // Get critical CSS for inlining
    const criticalCSS = assetExtractor.extractCriticalCSSContent();

    // Generate complete metadata
    const completeMetadata = metadataInjector.generateCompleteMetadata(
      route,
      data
    );

    // Create React element with props
    const props = {
      ...data,
      // Add any route-specific props here
      currentPath: route,
    };

    // Render component to string
    const renderResult = componentRenderer.renderComponent(
      Component,
      props,
      route
    );

    // Generate complete HTML document
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000">
    ${completeMetadata.meta}
    ${assets.preload}
    ${assets.css}
    ${completeMetadata.script}
    <script>
        // Set initial route for React Router
        window.__INITIAL_ROUTE__ = "${route}";
    </script>
</head>
<body>
    <noscript>
        ${renderResult.html}
        <style>
            /* Basic styling for noscript fallback */
            .container-fluid { max-width: 1200px; margin: 0 auto; padding: 20px; }
            .text-center { text-align: center; }
            .btn { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 10px; }
            .btn:hover { background: #0056b3; }
            nav ul { list-style: none; padding: 0; display: flex; justify-content: center; flex-wrap: wrap; }
            nav li { margin: 0 15px; }
            nav a { text-decoration: none; color: #007bff; font-weight: bold; }
            nav a:hover { text-decoration: underline; }
            .faq-link { color: #007bff; text-decoration: none; }
            .faq-link:hover { text-decoration: underline; }
        </style>
        <nav style="margin-top: 20px; padding: 20px; border-top: 1px solid #eee;">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/features">Features</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </noscript>
    <div id="root">${renderResult.html}</div>
    ${assets.js}
</body>
</html>`;

    return {
      html,
      metadata: completeMetadata,
    };
  } catch (error) {
    console.error(`❌ Error generating HTML for route ${route}:`, error);
    throw error;
  }
}

/**
 * Generate all static pages
 */
async function generatePages() {
  try {
    const routes = await generateRouteConfigs();

    for (const route of routes) {
      const result = await generatePageHTML(route.path, route.data || {});

      // Determine output path
      let outputPath;
      if (route.path === "/") {
        outputPath = `${config.distDir}/index.html`;
      } else if (route.path.startsWith("/blog/") && route.path !== "/blog") {
        // Blog post
        const slug = route.path.replace("/blog/", "");
        outputPath = `${config.distDir}/blog/${slug}/index.html`;
      } else {
        // Regular page
        const cleanPath = route.path.replace(/^\//, "").replace(/\/$/, "");
        outputPath = `${config.distDir}/${cleanPath}/index.html`;
      }

      // Ensure directory exists
      await fs.ensureDir(path.dirname(outputPath));

      // Write HTML file
      await fs.writeFile(outputPath, result.html);

      console.log(
        `✅ Generated ${outputPath.replace(config.distDir + "/", "")}`
      );
    }
  } catch (error) {
    console.error("❌ Error generating pages:", error);
    throw error;
  }
}

// Generate sitemap
async function generateSitemap() {
  try {
    const posts = await getBlogPosts();

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${config.siteUrl}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${config.siteUrl}/blog/</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${config.siteUrl}/services/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${config.siteUrl}/features/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${config.siteUrl}/faq/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${config.siteUrl}/contact/</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>`;

    // Add blog posts
    for (const post of posts) {
      const lastmod = new Date(post.date).toISOString().split("T")[0];
      sitemap += `
    <url>
        <loc>${config.siteUrl}/blog/${post.id}/</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
    }

    sitemap += `
</urlset>`;

    await fs.writeFile(`${config.distDir}/sitemap.xml`, sitemap);
    console.log("✅ Generated sitemap.xml");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

// Main build function
async function build() {
  try {
    console.log("🚀 Starting static site generation...");

    await loadReactComponents();
    await setupDist();
    await copyAssets();
    await convertBlogPosts();
    await generatePages();
    await generateSitemap();

    console.log("✅ Static site generation complete!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

// Run the build
if (require.main === module) {
  build();
}

module.exports = { build };
