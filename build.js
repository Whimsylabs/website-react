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
  // Set to ['en'] to build only English, or add/remove languages as needed
  supportedLanguages: process.env.BUILD_LANGUAGES ? 
    process.env.BUILD_LANGUAGES.split(',') : 
    ['en', 'es', 'fr', 'de'],
  defaultLanguage: 'en'
};

// Import translations for metadata
const { translations } = require('./src/i18n/translations.js');

// Page metadata for SEO (multilingual)
const getPageMetadata = (lang = 'en') => ({
  "/": {
    title: translations[lang]?.home?.title || "WhimsyLabs - Award-Winning Virtual Lab Software for STEM Education",
    description: translations[lang]?.home?.description || "WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.",
    keywords:
      "virtual lab software, online lab simulations, STEM virtual labs for schools, science education technology",
  },
  "/blog": {
    title: "WhimsyLabs Blog - Latest Virtual Laboratory Innovations & Teaching Resources",
    description: "Stay updated with WhimsyLabs' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.",
    keywords: "virtual laboratory technology, STEM education resources, science teaching tools, online lab teaching",
  },
  "/services": {
    title: "WhimsyLabs Services - Custom Virtual Lab Solutions for Education & Industry",
    description: "Discover WhimsyLabs' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments.",
    keywords: "custom virtual labs, educational simulations, STEM lab development, virtual lab consulting",
  },
  "/features": {
    title: translations[lang]?.features?.title || "WhimsyLabs Features - Cutting-Edge Virtual Laboratory Technology",
    description: translations[lang]?.features?.description || "Explore WhimsyLabs' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.",
    keywords: "virtual lab features, physics simulations, AI assessment, cross-platform labs",
  },
  "/faq": {
    title: "Frequently Asked Questions | WhimsyLabs Virtual Lab Software",
    description: "Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators.",
    keywords: "virtual lab FAQ, lab software questions, STEM education help",
  },
  "/contact": {
    title: translations[lang]?.contact?.title || "Contact Us | WhimsyLabs Virtual Lab Software",
    description: translations[lang]?.contact?.description || "Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education.",
    keywords: "contact WhimsyLabs, virtual lab trial, STEM education contact",
  },
});

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
  // Remove language prefix to get the base route
  const baseRoute = route.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
  
  // Handle exact matches first
  if (routeComponentMap[baseRoute]) {
    return ReactComponents[routeComponentMap[baseRoute]];
  }

  // Handle dynamic routes
  if (baseRoute.startsWith("/blog/") && baseRoute !== "/blog") {
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

  // Generate routes for each language
  for (const lang of config.supportedLanguages) {
    const pageMetadata = getPageMetadata(lang);
    const langPrefix = lang === config.defaultLanguage ? '' : `/${lang}`;

    // Add static routes for this language
    Object.keys(routeComponentMap).forEach((path) => {
      const componentName = routeComponentMap[path];
      const localizedPath = `${langPrefix}${path}`;
      const metadata = pageMetadata[path] || {};

      routes.push({
        path: localizedPath,
        component: componentName,
        metadata,
        template: "page",
        language: lang,
      });
    });

    // Add dynamic blog post routes for this language
    try {
      const posts = await getBlogPosts(lang);
      posts.forEach((post) => {
        const localizedPath = `${langPrefix}/blog/${post.id}`;
        
        routes.push({
          path: localizedPath,
          component: "BlogPost",
          metadata: {
            title: `${post.title} | WhimsyLabs Blog`,
            description: post.description || post.excerpt || "Read more on WhimsyLabs Blog",
            keywords: post.keywords || "virtual lab, STEM education, science",
          },
          template: "blog-post",
          data: {
            ...post,
            slug: post.id, // Pass the slug for the BlogPost component
          },
          language: lang,
        });
      });
    } catch (error) {
      console.warn(`⚠️ Could not generate blog post routes for language ${lang}:`, error.message);
    }
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
      `${config.distDir}/robots.txt`,
      // Note: 404.html may not exist, so we'll check before cleaning
    ];

    for (const file of filesToClean) {
      try {
        if (await fs.pathExists(file)) {
          await fs.remove(file);
          console.log(`🗑️ Removed ${file}`);
        }
      } catch (removeError) {
        console.warn(`⚠️ Could not remove ${file}:`, removeError.message);
      }
    }

    await fs.ensureDir(config.distDir);
    console.log("✅ Cleaned generated files in build directory");
  } catch (error) {
    console.warn(
      "⚠️ Could not clean build directory, creating new one:",
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

    // Since distDir is the same as buildDir, we don't need to copy public assets
    // They're already in the right place from the React build
    console.log("✅ Public assets already in place (distDir same as buildDir)");

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

// Get blog posts from the components (language-aware)
async function getBlogPosts(language = 'en') {
  const posts = [];

  try {
    // Import the generated blog data
    const blogData = require('./src/i18n/blogData.generated.js');
    
    // Get translated blog posts for the specified language
    const translatedPosts = blogData[language] || blogData['en'];
    
    // Import English blog post components for fallback metadata
    const Post1 = require("./src/Components/blog/Post1.js");
    const Post2 = require("./src/Components/blog/Post2.js");
    const Post3 = require("./src/Components/blog/Post3.js");
    const Post4 = require("./src/Components/blog/Post4.js");
    const Post5 = require("./src/Components/blog/Post5.js");
    const Post6 = require("./src/Components/blog/Post6.js");

    const fallbackPosts = [Post1, Post2, Post3, Post4, Post5, Post6];
    
    // Build the blog posts array with translated content
    for (const translatedPost of translatedPosts) {
      posts.push({
        id: translatedPost.slug, // Use the slug as ID for URL generation
        title: translatedPost.title,
        date: translatedPost.date,
        description: translatedPost.description,
        content: null, // Content will be loaded by the BlogPost component
        path: `/blog/${translatedPost.slug}`,
        language: language,
        hasFullTranslation: translatedPost.hasFullTranslation
      });
    }

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.warn(`⚠️ Could not load blog posts for language ${language}:`, error.message);
    
    // Fallback to English blog post components
    try {
      const Post1 = require("./src/Components/blog/Post1.js");
      const Post2 = require("./src/Components/blog/Post2.js");
      const Post3 = require("./src/Components/blog/Post3.js");
      const Post4 = require("./src/Components/blog/Post4.js");
      const Post5 = require("./src/Components/blog/Post5.js");
      const Post6 = require("./src/Components/blog/Post6.js");

      const fallbackPosts = [
        {
          id: Post1.slug,
          title: Post1.title,
          date: Post1.date,
          description: Post1.description,
          content: Post1.content,
          path: `/blog/${Post1.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post2.slug,
          title: Post2.title,
          date: Post2.date,
          description: Post2.description,
          content: Post2.content,
          path: `/blog/${Post2.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post3.slug,
          title: Post3.title,
          date: Post3.date,
          description: Post3.description,
          content: Post3.content,
          path: `/blog/${Post3.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post4.slug,
          title: Post4.title,
          date: Post4.date,
          description: Post4.description,
          content: Post4.content,
          path: `/blog/${Post4.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post5.slug,
          title: Post5.title,
          date: Post5.date,
          description: Post5.description,
          content: Post5.content,
          path: `/blog/${Post5.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post6.slug,
          title: Post6.title,
          date: Post6.date,
          description: Post6.description,
          content: Post6.content,
          path: `/blog/${Post6.slug}`,
          language: 'en',
          hasFullTranslation: true
        }
      ];

      return fallbackPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (fallbackError) {
      console.error("❌ Could not load fallback blog posts:", fallbackError.message);
      return [];
    }
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
      // Pass language for all components (important for SSR translations)
      language: data.language || 'en',
    };

    // For blog posts, load the full translated content
    if (route.includes('/blog/') && !route.endsWith('/blog') && data.slug) {
      try {
        const language = data.language || 'en';
        const { loadBlogPostContent } = require('./scripts/blog-content-loader.js');
        
        // Map slug back to post ID
        const slugToPostId = {
          'whimsylabs-education-revolution': 'post1',
          'physicality-in-virtual-labs': 'post2', 
          'virtual-kidney-dissection-send-engagement': 'post3',
          'ai-powered-virtual-labs-solving-education-crisis': 'post4',
          'whimsycat-ai-tutor-transforming-science-education': 'post5',
          'sandbox-learning-revolution-stem-education': 'post6'
        };
        
        const postId = slugToPostId[data.slug];
        if (postId) {
          const translatedPost = await loadBlogPostContent(language, postId);
          if (translatedPost) {
            // Add the translated content to props
            props.content = translatedPost.content;
            props.title = translatedPost.title;
            props.description = translatedPost.description;
            props.hasFullTranslation = translatedPost.hasFullTranslation;
            props.date = data.date; // Keep the original date
            console.log(`✅ Loaded translated content for ${data.slug} in ${language}`);
          }
        }
      } catch (contentError) {
        console.warn(`⚠️ Could not load translated content for ${data.slug}:`, contentError.message);
      }
    }

    // Render component to string
    const renderResult = componentRenderer.renderComponent(
      Component,
      props,
      route
    );

    // Generate hreflang tags for SEO
    const generateHreflangTags = (currentRoute, currentLang) => {
      let hreflangTags = '';
      
      config.supportedLanguages.forEach(lang => {
        const langPrefix = lang === config.defaultLanguage ? '' : `/${lang}`;
        const localizedRoute = currentRoute.replace(/^\/[a-z]{2}(?=\/|$)/, '');
        const hrefUrl = `${config.siteUrl}${langPrefix}${localizedRoute}`;
        
        hreflangTags += `    <link rel="alternate" hreflang="${lang}" href="${hrefUrl}">\n`;
      });
      
      // Add x-default for default language
      const defaultRoute = currentRoute.replace(/^\/[a-z]{2}(?=\/|$)/, '');
      hreflangTags += `    <link rel="alternate" hreflang="x-default" href="${config.siteUrl}${defaultRoute}">`;
      
      return hreflangTags;
    };

    const currentLang = data.language || config.defaultLanguage;
    const hreflangTags = generateHreflangTags(route, currentLang);

    // Generate complete HTML document
    const html = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000">
    ${completeMetadata.meta}
    ${hreflangTags}
    ${assets.preload}
    ${assets.css}
    ${completeMetadata.script}
    <script>
        // Set initial route and language for React Router
        window.__INITIAL_ROUTE__ = "${route}";
        window.__INITIAL_LANGUAGE__ = "${currentLang}";
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
      const result = await generatePageHTML(route.path, { 
        ...route.data, 
        language: route.language 
      });

      // Determine output path
      let outputPath;
      if (route.path === "/") {
        outputPath = `${config.distDir}/index.html`;
      } else if (route.path.match(/^\/[a-z]{2}$/) || route.path === `/${route.language}`) {
        // Language root page (e.g., /es, /fr)
        outputPath = `${config.distDir}${route.path}/index.html`;
      } else if (route.path.includes("/blog/") && !route.path.endsWith("/blog")) {
        // Blog post
        const pathParts = route.path.split('/');
        const blogIndex = pathParts.indexOf('blog');
        const slug = pathParts[blogIndex + 1];
        
        if (route.language === config.defaultLanguage) {
          outputPath = `${config.distDir}/blog/${slug}/index.html`;
        } else {
          outputPath = `${config.distDir}/${route.language}/blog/${slug}/index.html`;
        }
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
    const posts = await getBlogPosts('en'); // Use English posts for sitemap structure
    const currentDate = new Date().toISOString().split("T")[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    // Generate URLs for each language
    const staticPages = ['/', '/blog/', '/services/', '/features/', '/faq/', '/contact/'];
    
    for (const page of staticPages) {
      for (const lang of config.supportedLanguages) {
        const langPrefix = lang === config.defaultLanguage ? '' : `/${lang}`;
        const url = `${config.siteUrl}${langPrefix}${page}`;
        
        let priority = '0.8';
        if (page === '/') priority = '1.0';
        if (page === '/blog/') priority = '0.9';
        
        sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${priority}</priority>`;
        
        // Add alternate language links
        for (const altLang of config.supportedLanguages) {
          const altLangPrefix = altLang === config.defaultLanguage ? '' : `/${altLang}`;
          const altUrl = `${config.siteUrl}${altLangPrefix}${page}`;
          sitemap += `
        <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}"/>`;
        }
        
        sitemap += `
    </url>`;
      }
    }

    // Add blog posts with proper sorting by date (newest first)
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sitemap += `
    <!-- Blog posts (${sortedPosts.length} total, ${config.supportedLanguages.length} languages each) -->`;
    
    for (const post of sortedPosts) {
      const lastmod = new Date(post.date).toISOString().split("T")[0];
      
      for (const lang of config.supportedLanguages) {
        const langPrefix = lang === config.defaultLanguage ? '' : `/${lang}`;
        const url = `${config.siteUrl}${langPrefix}/blog/${post.id}/`;
        
        sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>`;
        
        // Add alternate language links for blog posts
        for (const altLang of config.supportedLanguages) {
          const altLangPrefix = altLang === config.defaultLanguage ? '' : `/${altLang}`;
          const altUrl = `${config.siteUrl}${altLangPrefix}/blog/${post.id}/`;
          sitemap += `
        <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}"/>`;
        }
        
        sitemap += `
    </url>`;
      }
    }

    sitemap += `
</urlset>`;

    await fs.writeFile(`${config.distDir}/sitemap.xml`, sitemap);
    console.log(`✅ Generated sitemap.xml with ${sortedPosts.length} blog posts`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

// Generate robots.txt
async function generateRobotsTxt() {
  try {
    const posts = await getBlogPosts('en'); // Use English posts for robots.txt structure

    let robotsTxt = `# https://www.robotstxt.org/robotstxt.html
# WhimsyLabs Virtual Laboratory Software
# All search engines are allowed to crawl all content

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${config.siteUrl}/sitemap.xml

# Crawl delay to prevent server overload
Crawl-delay: 1

# Disallow access to any temporary files that might exist
Disallow: /tmp/
Disallow: /*.json$
Disallow: /*.js$
Disallow: /*.css$

# Allow important directories explicitly
Allow: /blog/
Allow: /services/
Allow: /features/
Allow: /faq/
Allow: /contact/
Allow: /sitemap

# Explicitly allow all blog posts for search engine crawling`;

    // Add explicit Allow entries for all blog posts
    for (const post of posts) {
      robotsTxt += `\nAllow: /blog/${post.id}/`;
    }

    // Add a comment section for clarity
    robotsTxt += `\n\n# All blog posts are explicitly allowed above`;
    robotsTxt += `\n# Total blog posts: ${posts.length}`;
    robotsTxt += `\n# FAQ page is allowed at /faq/`;

    await fs.writeFile(`${config.distDir}/robots.txt`, robotsTxt);
    console.log(`✅ Generated robots.txt with ${posts.length} blog posts explicitly allowed`);
  } catch (error) {
    console.error("❌ Error generating robots.txt:", error);
  }
}

// Log all generated URLs for verification
async function logGeneratedUrls() {
  try {
    const posts = await getBlogPosts('en'); // Use English posts for URL logging
    
    console.log("\n📋 Generated URLs Summary:");
    console.log("========================");
    
    // Static pages
    const staticPages = [
      { url: "/", description: "Homepage" },
      { url: "/blog/", description: "Blog index" },
      { url: "/services/", description: "Services page" },
      { url: "/features/", description: "Features page" },
      { url: "/faq/", description: "FAQ page" },
      { url: "/contact/", description: "Contact page" }
    ];
    
    console.log("\n🏠 Static Pages:");
    staticPages.forEach(page => {
      console.log(`   ${config.siteUrl}${page.url} - ${page.description}`);
    });
    
    console.log(`\n📝 Blog Posts (${posts.length} total):`);
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    sortedPosts.forEach(post => {
      console.log(`   ${config.siteUrl}/blog/${post.id}/ - ${post.title} (${post.date})`);
    });
    
    console.log(`\n📊 Total URLs: ${staticPages.length + posts.length}`);
    console.log("========================\n");
    
  } catch (error) {
    console.warn("⚠️ Could not log URLs:", error.message);
  }
}

// Generate language detection script for client-side routing
async function generateLanguageDetection() {
  console.log('🔄 Generating language detection script...');
  
  const detectionScript = `
// Language detection and routing for WhimsyLabs
(function() {
  'use strict';
  
  const SUPPORTED_LANGUAGES = ${JSON.stringify(config.supportedLanguages)};
  const DEFAULT_LANGUAGE = '${config.defaultLanguage}';
  
  function getCurrentLanguageFromPath() {
    const path = window.location.pathname;
    const langCode = path.split('/')[1];
    return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
  }
  
  function getBrowserLanguage() {
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;
  }
  
  function shouldRedirectForLanguage() {
    const currentLang = getCurrentLanguageFromPath();
    const browserLang = getBrowserLanguage();
    const isRootPath = window.location.pathname === '/';
    
    // Only redirect from root path and if browser language is different
    return isRootPath && browserLang !== DEFAULT_LANGUAGE && currentLang === DEFAULT_LANGUAGE;
  }
  
  // Initialize language detection
  if (shouldRedirectForLanguage()) {
    const browserLang = getBrowserLanguage();
    const newPath = '/' + browserLang + '/';
    
    // Use replace to avoid adding to history
    window.location.replace(newPath);
  }
  
  // Make language utilities available globally
  window.WhimsyLabsI18n = {
    getCurrentLanguage: getCurrentLanguageFromPath,
    getBrowserLanguage: getBrowserLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    defaultLanguage: DEFAULT_LANGUAGE
  };
})();
`;

  await fs.ensureDir(`${config.distDir}/js`);
  await fs.writeFile(`${config.distDir}/js/language-detection.js`, detectionScript);
  console.log('✅ Language detection script generated');
}

// Main build function
async function build() {
  try {
    console.log("🚀 Starting static site generation...");
    console.log(`🌍 Building for languages: ${config.supportedLanguages.join(', ')}`);

    // Generate blog data first
    console.log("📝 Generating blog data...");
    const { generateBlogData } = require('./scripts/generate-blog-data.js');
    await generateBlogData();

    await loadReactComponents();
    await setupDist();
    await copyAssets();
    await convertBlogPosts();
    await generatePages();
    await generateSitemap();
    await generateRobotsTxt();
    await generateLanguageDetection();
    await logGeneratedUrls();

    console.log("✅ Static site generation complete!");
    console.log(`📊 Generated static files for ${config.supportedLanguages.length} languages`);
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
