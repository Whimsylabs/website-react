const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");
const { glob } = require("glob");
const grayMatter = require("gray-matter");
const chokidar = require("chokidar");

// Mock require.context FIRST before any other imports
require.context = require.context || function(directory, useSubdirectories, regExp) {
  console.log(`Mock require.context called with: ${directory}, ${useSubdirectories}, ${regExp}`);
  
  // Create a function that returns a mock module
  const mockContext = function(key) {
    console.log(`Mock context function called with key: ${key}`);
    return {
      default: {
        title: path.basename(key, path.extname(key)).replace(/[-_]/g, ' '),
        date: new Date().toISOString(),
        slug: path.basename(key, path.extname(key)).toLowerCase().replace(/[^a-z0-9]/g, '-'),
        content: `Mock content for ${key}`,
        description: `Mock description for ${key}`,
        keywords: 'mock, keywords',
        author: 'Mock Author'
      }
    };
  };
  
  // Mock some blog post files for testing
  const mockKeys = [
    './post1.js',
    './post2.js', 
    './post3.js'
  ];
  
  // Add keys() method to return the file keys
  mockContext.keys = () => mockKeys;
  
  // Add resolve() method to resolve a key to its path
  mockContext.resolve = (key) => key;
  
  // Add id property
  mockContext.id = directory;
  
  return mockContext;
};

// Import our new React rendering utilities
const ComponentRenderer = require("./scripts/component-renderer");
const AssetExtractor = require("./scripts/asset-extractor");
const MetadataInjector = require("./scripts/metadata-injector");

// Initialize rendering utilities
const componentRenderer = new ComponentRenderer();
const assetExtractor = new AssetExtractor("./build");
const metadataInjector = new MetadataInjector();

// Import React components (with Babel register)
require("ignore-styles");
require("@babel/register");

// Mock React Router hooks for server-side rendering
const Module = require("module");
const originalRequire = Module.prototype.require;

// Patch Module._compile to inject require.context into every module
const originalCompile = Module.prototype._compile;
Module.prototype._compile = function(content, filename) {
  // Inject require.context mock at the beginning of every module
  const mockInjection = `
    if (typeof require !== 'undefined' && !require.context) {
      require.context = function(directory, useSubdirectories, regExp) {
        console.log('Mock require.context called with:', directory, useSubdirectories, regExp);
        
        const mockContext = function(key) {
          console.log('Mock context function called with key:', key);
          return {
            default: {
              title: require('path').basename(key, require('path').extname(key)).replace(/[-_]/g, ' '),
              date: new Date().toISOString(),
              slug: require('path').basename(key, require('path').extname(key)).toLowerCase().replace(/[^a-z0-9]/g, '-'),
              content: 'Mock content for ' + key,
              description: 'Mock description for ' + key,
              keywords: 'mock, keywords',
              author: 'Mock Author'
            }
          };
        };
        
        const mockKeys = ['./post1.js', './post2.js', './post3.js'];
        mockContext.keys = function() { return mockKeys; };
        mockContext.resolve = function(key) { return key; };
        mockContext.id = directory;
        
        return mockContext;
      };
    }
  `;
  
  const modifiedContent = mockInjection + content;
  return originalCompile.call(this, modifiedContent, filename);
};

Module.prototype.require = function (id) {

  if (id === "react-router-dom") {
    const original = originalRequire.call(this, id);
    const React = originalRequire.call(this, "react");

    return {
      ...original,
      useLocation: () => ({
        pathname: global.__CURRENT_ROUTE__ || "/",
        search: "",
        hash: "",
        state: null,
        key: "default",
      }),
      useNavigate: () => () => {},
      useParams: () => ({}),
      useSearchParams: () => [new URLSearchParams(), () => {}],
      Link: ({ to, children, className, ...props }) => {
        return React.createElement(
          "a",
          {
            href: to,
            className,
            ...props,
          },
          children
        );
      },
      NavLink: ({ to, children, className, ...props }) => {
        return React.createElement(
          "a",
          {
            href: to,
            className,
            ...props,
          },
          children
        );
      },
    };
  }
  return originalRequire.call(this, id);
};


let ReactComponents = {};
// Load components individually to identify which one has the issue
const componentFiles = [
  { name: "MainContent", path: "./src/Components/MainContent.js" },
  { name: "Blog", path: "./src/Components/Blog.js" },
  { name: "Services", path: "./src/Components/Services.js" },
  { name: "Features", path: "./src/Components/FeaturesPage.js" },
  { name: "FAQPage", path: "./src/Components/FAQPage.js" },
  { name: "ContactPage", path: "./src/Components/ContactPage.js" },
  { name: "BlogPost", path: "./src/Components/BlogPost.js" },
];

console.log("🔄 Loading React components individually...");
componentFiles.forEach(({ name, path }) => {
  try {
    ReactComponents[name] = require(path).default;
    console.log(`✅ Loaded ${name}`);
  } catch (error) {
    console.error(`❌ Failed to load ${name}:`, error.message);
    console.error(`Full error for ${name}:`, error.stack);
  }
});

// Configuration
const config = {
  templatesDir: "./templates",
  contentDir: "./content",
  staticDir: "./src/Components",
  distDir: "./public", // Changed to public for GitHub Pages
  watch: process.argv.includes("--watch"),
  siteUrl: "https://whimsylabs.ai",
  siteName: "WhimsyLabs",
  siteDescription:
    "WhimsyLabs provides award-winning virtual laboratory software for science education",
};

// Site data
const siteData = {
  title: config.siteName,
  description: config.siteDescription,
  url: config.siteUrl,
  author: "WhimsyLabs Team",
  year: new Date().getFullYear(),
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
 * Get component for a given route
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
      output: path === "/" ? "index.html" : `${path.substring(1)}/index.html`,
      metadata,
      type: "static",
    });
  });

  // Add dynamic blog post routes
  try {
    const posts = await getBlogPosts();
    posts.forEach((post) => {
      routes.push({
        path: post.path,
        component: "BlogPost",
        output: `blog/${post.slug}/index.html`,
        metadata: {
          title: `${post.title} | WhimsyLabs Blog`,
          description: post.description,
          keywords: post.keywords || "",
        },
        type: "dynamic",
        data: post,
      });
    });
  } catch (error) {
    console.warn("⚠️ Could not generate blog post routes:", error.message);
  }

  return routes;
}

// Page metadata
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
      `${config.distDir}/static`,
      `${config.distDir}/sitemap.xml`,
      `${config.distDir}/404.html`
    ];
    
    for (const file of filesToClean) {
      if (await fs.pathExists(file)) {
        await fs.remove(file);
      }
    }
    
    await fs.ensureDir(config.distDir);
    console.log("✅ Cleaned generated files in public directory");
  } catch (error) {
    console.warn("⚠️ Could not clean public directory, creating new one:", error.message);
    await fs.ensureDir(config.distDir);
  }
}

// Copy static assets (optimized to avoid duplication)
async function copyAssets() {
  try {
    // Copy React build static files to public directory
    const reactBuildDir = "./build/static";
    const publicStaticDir = `${config.distDir}/static`;

    if (await fs.pathExists(reactBuildDir)) {
      await fs.ensureDir(publicStaticDir);
      await fs.copy(reactBuildDir, publicStaticDir, { overwrite: true });
      console.log("✅ Copied React build static files to public");
    } else {
      console.warn(
        "⚠️ React build static files not found. Run React build first."
      );
    }

    // Note: We don't need to copy public assets since we're writing directly to public
    console.log("✅ Copied optimized static assets");
  } catch (error) {
    console.error("❌ Error copying assets:", error.message);
  }
}

// Convert React blog posts to markdown
async function convertBlogPosts() {
  const blogDir = "./src/Components/blog";
  const outputDir = "./content/blog";

  await fs.ensureDir(outputDir);

  const files = await fs.readdir(blogDir);
  const postFiles = files.filter((file) => /^Post\d+\.js$/.test(file));

  for (const file of postFiles) {
    const filePath = path.join(blogDir, file);
    const content = await fs.readFile(filePath, "utf8");

    // Extract metadata using regex
    const titleMatch = content.match(/export const title = ["'](.+?)["'];/);
    const dateMatch = content.match(/export const date = ["'](.+?)["'];/);
    const slugMatch = content.match(/export const slug = ["'](.+?)["'];/);
    const descriptionMatch = content.match(
      /export const description =\s*["'](.+?)["'];/
    );

    if (titleMatch && dateMatch && slugMatch && descriptionMatch) {
      // Extract JSX content (simplified)
      const contentMatch = content.match(
        /export const content = \(\s*<div[^>]*>([\s\S]*?)<\/div>\s*\);/
      );

      let markdownContent = "";
      if (contentMatch) {
        // Enhanced JSX to HTML conversion
        markdownContent = contentMatch[1]
          .replace(/<h1[^>]*>/g, "<h1>")
          .replace(/<h2[^>]*>/g, "<h2>")
          .replace(/<h3[^>]*>/g, "<h3>")
          .replace(/<p[^>]*>/g, "<p>")
          .replace(/<div[^>]*>/g, "<div>")
          .replace(/<span[^>]*>/g, "<span>")
          .replace(/<img[^>]*src=['"]([^'"]+)['"][^>]*>/g, '<img src="$1">')
          .replace(/\s*className=['"][^'"]*['"]/g, "")
          .replace(/\s{3,}/g, " ")
          .trim();
      }

      const frontMatter = `---
title: "${titleMatch[1]}"
date: "${dateMatch[1]}"
slug: "${slugMatch[1]}"
description: "${descriptionMatch[1]}"
---

${markdownContent}
`;

      const outputFile = path.join(outputDir, `${slugMatch[1]}.md`);
      await fs.writeFile(outputFile, frontMatter);
    }
  }

  console.log("✅ Converted blog posts to markdown");
}

// Get blog posts
async function getBlogPosts() {
  const posts = [];
  
  // Load posts directly from the React components instead of markdown
  try {
    const blogDir = "./src/Components/blog";
    const files = await fs.readdir(blogDir);
    const postFiles = files.filter((file) => /^Post\d+\.js$/.test(file));

    for (const file of postFiles) {
      try {
        const filePath = path.join(blogDir, file);
        const postModule = require(path.resolve(filePath));
        
        posts.push({
          title: postModule.title,
          date: postModule.date,
          slug: postModule.slug,
          description: postModule.description,
          content: postModule.content, // This is the React JSX content
          path: `/blog/${postModule.slug}`,
        });
      } catch (error) {
        console.warn(`⚠️ Could not load blog post ${file}:`, error.message);
      }
    }
  } catch (error) {
    console.warn("⚠️ Could not read blog directory:", error.message);
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Render page with React components
async function renderPage(Component, data = {}) {
  try {
    const { location = "/", metadata = {} } = data;

    // Set the current route for the mocked useLocation hook
    global.__CURRENT_ROUTE__ = location;

    // Render React component to HTML
    const renderResult = componentRenderer.renderComponent(
      Component,
      data,
      location
    );

    if (renderResult.error) {
      console.warn(
        `⚠️ Component rendering error for ${location}: ${renderResult.error}`
      );
    }

    // Get optimized assets
    const assets = assetExtractor.getOptimizedAssets();

    // Get critical CSS for inlining
    const criticalCSS = assetExtractor.extractCriticalCSSContent();

    // Generate complete metadata
    const completeMetadata = metadataInjector.generateCompleteMetadata(
      location,
      renderResult.helmet ? { helmet: renderResult.helmet } : null,
      metadata
    );

    // Create complete HTML page
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000">
    ${completeMetadata.meta}
    ${assets.preload}
    ${criticalCSS ? `<style>${criticalCSS}</style>` : ""}
    ${assets.css}
    ${completeMetadata.script}
    <script>
        // Set initial route for React Router
        window.__INITIAL_ROUTE__ = "${location}";
    </script>
</head>
<body>
    <noscript>
        <div style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
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
        </div>
    </noscript>
    <div id="root">${renderResult.html}</div>
    ${assets.js}
</body>
</html>`;

    return html;
  } catch (error) {
    console.error(`❌ Error rendering page:`, error);
    throw error;
  }
}

// Generate individual pages
async function generatePages() {
  const pages = [
    { path: "/", component: "MainContent", output: "index.html" },
    { path: "/blog", component: "Blog", output: "blog/index.html" },
    { path: "/services", component: "Services", output: "services/index.html" },
    { path: "/features", component: "Features", output: "features/index.html" },
    { path: "/faq", component: "FAQPage", output: "faq/index.html" },
    {
      path: "/contact",
      component: "ContactPage",
      output: "contact/index.html",
    },
  ];

  for (const page of pages) {
    const metadata = pageMetadata[page.path] || {};
    const Component = ReactComponents[page.component];

    if (!Component) {
      console.warn(
        `⚠️ Component ${page.component} not found, skipping ${page.path}`
      );
      continue;
    }

    const data = {
      ...metadata,
      location: page.path,
      currentPath: page.path,
      url: page.path,
      site: siteData,
      metadata,
    };

    const html = await renderPage(Component, data);
    const outputPath = `${config.distDir}/${page.output}`;

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, html);

    console.log(`✅ Generated ${page.output}`);
  }
}

// Generate blog post pages
async function generateBlogPages() {
  const posts = await getBlogPosts();

  // Generate individual blog post pages
  for (const post of posts) {
    const Component = ReactComponents.BlogPost;

    if (!Component) {
      console.warn(`⚠️ BlogPost component not found, skipping blog posts`);
      continue;
    }

    const data = {
      ...post,
      title: `${post.title} | WhimsyLabs Blog`,
      location: post.path,
      currentPath: post.path,
      url: post.path,
      ogType: "article",
      keywords: post.keywords || "",
      site: siteData,
      posts: posts, // For navigation
      metadata: {
        title: `${post.title} | WhimsyLabs Blog`,
        description: post.description,
        keywords: post.keywords || "",
      },
    };

    const html = await renderPage(Component, data);
    const outputPath = `${config.distDir}/blog/${post.slug}/index.html`;

    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, html);

    console.log(`✅ Generated blog/${post.slug}/index.html`);
  }

  // Add posts to blog page data for the next build
  return posts;
}

// Generate spa/index.html
async function generateSpaIndex() {
  const spaContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React SPA - WhimsyLabs</title>
    <link rel="stylesheet" href="/static/css/main.css">
</head>
<body>
    <div id="root"></div>
    <script src="/static/js/main.js"></script>
</body>
</html>`;
  await fs.ensureDir(`${config.distDir}/spa`);
  await fs.writeFile(`${config.distDir}/spa/index.html`, spaContent);
}

// Generate sitemap
async function generateSitemap() {
  const posts = await getBlogPosts();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add main pages
  const mainPages = [
    "/",
    "/blog",
    "/services",
    "/features",
    "/faq",
    "/contact",
  ];
  for (const page of mainPages) {
    sitemap += `
    <url>
        <loc>${config.siteUrl}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === "/" ? "1.0" : "0.8"}</priority>
    </url>`;
  }

  // Add blog posts
  for (const post of posts) {
    const lastmod = new Date(post.date).toISOString().split("T")[0];
    sitemap += `
    <url>
        <loc>${config.siteUrl}/blog/${post.slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
  }

  sitemap += `
</urlset>`;

  await fs.writeFile(`${config.distDir}/sitemap.xml`, sitemap);
  console.log("✅ Generated sitemap.xml");
}

// Generate 404.html
async function generate404Page() {
  const notFoundContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <link rel="stylesheet" href="/static/css/main.css">
</head>
<body>
    <div class="container text-center">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/" class="btn btn-primary">Go to Home</a>
    </div>
</body>
</html>`;
  await fs.writeFile(`${config.distDir}/404.html`, notFoundContent);
}

// Main build function
async function build() {
  try {
    console.log("🚀 Starting static site generation...");

    await setupDist();
    await copyAssets();
    await convertBlogPosts();
    await generatePages();
    await generateBlogPages();
    await generateSpaIndex();
    await generateSitemap();
    await generate404Page();

    console.log("✅ Static site generation complete!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

// Watch mode
function startWatcher() {
  console.log("👀 Watching for changes...");

  const watcher = chokidar.watch(
    ["./templates/**/*", "./content/**/*", "./src/**/*.css", "./src/**/*.js"],
    {
      ignored: /node_modules/,
      persistent: true,
    }
  );

  watcher.on("change", async (path) => {
    console.log(`📝 File changed: ${path}`);
    await build();
  });
}

// Run build
if (require.main === module) {
  build().then(() => {
    if (config.watch) {
      startWatcher();
    }
  });
}

module.exports = { build, config };
