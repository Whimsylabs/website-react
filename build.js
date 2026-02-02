// Configure Babel to transpile ES6 modules
require('@babel/register')({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react'
  ],
  extensions: ['.js', '.jsx'],
  ignore: [/node_modules/]
});

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
    ['en', 'es', 'fr', 'de', 'jp'],
  defaultLanguage: 'en'
};

// Import translations for metadata
const { translations } = require('./src/i18n/translations.js');

// Page metadata for SEO (multilingual)
const getPageMetadata = (lang = 'en') => ({
  "/": {
    title: translations[lang]?.landingDemo?.title || "WhimsyLabs: The Practical Solution for Science | Virtual Lab Software",
    description: translations[lang]?.landingDemo?.description || "Experience WhimsyLabs' physics-first virtual lab engine with AI-driven assessment. Build true muscle memory while saving teachers hours of grading time.",
    keywords: "virtual lab software, physics simulation, AI assessment, STEM education, science lab software, VR education, unlimited practicals",
  },
  "/blog": {
    title: translations[lang]?.blog?.title || "WhimsyLabs Blog - Virtual Laboratory Innovations & STEM Education",
    description: translations[lang]?.blog?.description || "Stay updated with WhimsyLabs' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.",
    keywords: "virtual laboratory technology, STEM education resources, science teaching tools, online lab teaching",
  },
  "/services": {
    title: translations[lang]?.services?.title || "WhimsyLabs Services - Custom Virtual Lab Solutions for Education",
    description: translations[lang]?.services?.description || "Discover WhimsyLabs' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments.",
    keywords: "custom virtual labs, educational simulations, STEM lab development, virtual lab consulting",
  },
  "/features": {
    title: translations[lang]?.features?.title || "WhimsyLabs Features - Cutting-Edge Virtual Laboratory Technology",
    description: translations[lang]?.features?.description || "Explore WhimsyLabs' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.",
    keywords: "virtual lab features, physics simulations, AI assessment, cross-platform labs",
  },
  "/faq": {
    title: translations[lang]?.faq?.title || "Frequently Asked Questions | WhimsyLabs Virtual Lab Software",
    description: translations[lang]?.faq?.description || "Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators.",
    keywords: "virtual lab FAQ, lab software questions, STEM education help",
  },
  "/bett": {
    title: translations[lang]?.bett?.title || "Meet Us at BETT 2026 | WhimsyLabs Virtual Lab Software",
    description: translations[lang]?.bett?.description || "Visit WhimsyLabs at BETT 2026 (ExCeL London, Jan 21-23). Book a demo at Booth FS10 and discover our award-winning virtual laboratory software.",
    keywords: "BETT 2026, WhimsyLabs exhibition, virtual lab demo, education technology show, ExCeL London",
  },
  "/contact": {
    title: translations[lang]?.contact?.title || "Contact Us | WhimsyLabs Virtual Lab Software",
    description: translations[lang]?.contact?.description || "Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education.",
    keywords: "contact WhimsyLabs, virtual lab trial, STEM education contact",
  },
  "/privacy": {
    title: translations[lang]?.privacy?.title || "Privacy Policy | WhimsyLabs Virtual Lab Software",
    description: translations[lang]?.privacy?.description || "Read WhimsyLabs privacy policy to understand how we collect, use, and protect your data when using our virtual laboratory software for STEM education.",
    keywords: "WhimsyLabs privacy policy, data protection, GDPR compliance, virtual lab privacy, educational software privacy",
  },
  // "/landing-demo" is now the homepage at "/"
});

// Route to component mapping
const routeComponentMap = {
  "/": "LandingDemo",
  "/blog": "Blog",
  "/services": "Services",
  "/features": "Features",
  "/faq": "FAQPage",
  "/contact": "ContactPage",
  "/privacy": "PrivacyPage",
  "/bett": "BettPage",
  // "/landing-demo": "LandingDemo", // Now the homepage
  // "/ignite-pitch": "IgnitePitchDeck", // Disabled
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
            title: post.title,
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

    ReactComponents.PrivacyPage =
      require("./src/Components/PrivacyPage.js").default;
    console.log("✅ Loaded PrivacyPage");

    ReactComponents.BettPage = require("./src/Components/BettPage.js").default;
    console.log("✅ Loaded BettPage");

    ReactComponents.LandingDemo = require("./src/Components/LandingDemo.js").default;
    console.log("✅ Loaded LandingDemo");

    ReactComponents.BlogPost = require("./src/Components/BlogPost.js").default;
    console.log("✅ Loaded BlogPost");

    // ReactComponents.IgnitePitchDeck = require("./src/Components/IgnitePitchDeck.js").default;
    // console.log("✅ Loaded IgnitePitchDeck"); // Disabled
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

    // IndexNow key file is automatically copied from public directory

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

    // Map language codes: 'jp' -> 'ja' (config uses 'jp', translation files use 'ja')
    const blogLang = language === 'jp' ? 'ja' : language;

    // Get translated blog posts for the specified language
    const translatedPosts = blogData[blogLang] || blogData['en'];
    
    // Import English blog post components for fallback metadata
    const Post1 = require("./src/Components/blog/Post1.js");
    const Post2 = require("./src/Components/blog/Post2.js");
    const Post3 = require("./src/Components/blog/Post3.js");
    const Post4 = require("./src/Components/blog/Post4.js");
    const Post5 = require("./src/Components/blog/Post5.js");
    const Post6 = require("./src/Components/blog/Post6.js");
    const Post7 = require("./src/Components/blog/Post7.js");
    const Post8 = require("./src/Components/blog/Post8.js");
    const Post9 = require("./src/Components/blog/Post9.js");
    const Post10 = require("./src/Components/blog/Post10.js");
    const Post11 = require("./src/Components/blog/Post11.js");
    const Post12 = require("./src/Components/blog/Post12.js");
    const Post13 = require("./src/Components/blog/Post13.js");
    const Post14 = require("./src/Components/blog/Post14.js");
    const Post15 = require("./src/Components/blog/Post15.js");
    const Post16 = require("./src/Components/blog/Post16.js");
    const Post17 = require("./src/Components/blog/Post17.js");
    const Post18 = require("./src/Components/blog/Post18.js");
    const Post19 = require("./src/Components/blog/Post19.js");

    const fallbackPosts = [Post1, Post2, Post3, Post4, Post5, Post6, Post7, Post8, Post9, Post10, Post11, Post12, Post13, Post14, Post15, Post16, Post17, Post18, Post19];
    
    // Build the blog posts array with translated content
    for (const translatedPost of translatedPosts) {
      posts.push({
        id: translatedPost.slug, // Use the slug as ID for URL generation
        title: translatedPost.title,
        date: translatedPost.date,
        description: translatedPost.description,
        keywords: translatedPost.keywords,
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
      const Post7 = require("./src/Components/blog/Post7.js");
      const Post8 = require("./src/Components/blog/Post8.js");
      const Post9 = require("./src/Components/blog/Post9.js");
      const Post10 = require("./src/Components/blog/Post10.js");
      const Post11 = require("./src/Components/blog/Post11.js");
      const Post12 = require("./src/Components/blog/Post12.js");
      const Post13 = require("./src/Components/blog/Post13.js");
      const Post14 = require("./src/Components/blog/Post14.js");
      const Post15 = require("./src/Components/blog/Post15.js");
      const Post16 = require("./src/Components/blog/Post16.js");
      const Post17 = require("./src/Components/blog/Post17.js");
      const Post18 = require("./src/Components/blog/Post18.js");
      const Post19 = require("./src/Components/blog/Post19.js");

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
        },
        {
          id: Post7.slug,
          title: Post7.title,
          date: Post7.date,
          description: Post7.description,
          content: Post7.content,
          path: `/blog/${Post7.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post8.slug,
          title: Post8.title,
          date: Post8.date,
          description: Post8.description,
          content: Post8.content,
          path: `/blog/${Post8.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post9.slug,
          title: Post9.title,
          date: Post9.date,
          description: Post9.description,
          content: Post9.content,
          path: `/blog/${Post9.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post10.slug,
          title: Post10.title,
          date: Post10.date,
          description: Post10.description,
          content: Post10.content,
          path: `/blog/${Post10.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post11.slug,
          title: Post11.title,
          date: Post11.date,
          description: Post11.description,
          content: Post11.content,
          path: `/blog/${Post11.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post12.slug,
          title: Post12.title,
          date: Post12.date,
          description: Post12.description,
          content: Post12.content,
          path: `/blog/${Post12.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post13.slug,
          title: Post13.title,
          date: Post13.date,
          description: Post13.description,
          content: Post13.content,
          path: `/blog/${Post13.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post14.slug,
          title: Post14.title,
          date: Post14.date,
          description: Post14.description,
          content: Post14.content,
          path: `/blog/${Post14.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post15.slug,
          title: Post15.title,
          date: Post15.date,
          description: Post15.description,
          content: Post15.content,
          path: `/blog/${Post15.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post16.slug,
          title: Post16.title,
          date: Post16.date,
          description: Post16.description,
          content: Post16.content,
          path: `/blog/${Post16.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post17.slug,
          title: Post17.title,
          date: Post17.date,
          description: Post17.description,
          content: Post17.content,
          path: `/blog/${Post17.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post18.slug,
          title: Post18.title,
          date: Post18.date,
          description: Post18.description,
          content: Post18.content,
          path: `/blog/${Post18.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post19.slug,
          title: Post19.title,
          date: Post19.date,
          description: Post19.description,
          content: Post19.content,
          path: `/blog/${Post19.slug}`,
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

    // For blog listing page, load all posts for SSR
    if (route.endsWith('/blog') || route.endsWith('/blog/')) {
      try {
        const language = data.language || 'en';
        const allPosts = await getBlogPosts(language);

        // Format posts for the Blog component
        props.posts = allPosts.map(post => ({
          id: post.id,
          title: post.title,
          date: post.date,
          description: post.description,
          content: null // Content loaded on individual post pages
        })).sort((a, b) => new Date(b.date) - new Date(a.date));

        console.log(`✅ Loaded ${props.posts.length} posts for blog listing in ${language}`);
      } catch (postsError) {
        console.warn(`⚠️ Could not load posts for blog listing:`, postsError.message);
        props.posts = [];
      }
    }

    // For blog posts, load the full translated content
    if (route.includes('/blog/') && !route.endsWith('/blog') && !route.endsWith('/blog/') && data.slug) {
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

    const currentLang = data.language || config.defaultLanguage;

    // Generate complete HTML document
    const html = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
    <!-- Cookie Consent & Conditional GTM -->
    <script>
    (function(){
      var consent = localStorage.getItem('cookie_consent');
      if (consent === 'granted') {
        // Load GTM only if consent was granted
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-K2SGJ8JF');
      }
      window.loadGTM = function() {
        if (!window.gtmLoaded) {
          window.gtmLoaded = true;
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K2SGJ8JF');
        }
      };
    })();
    </script>
    <!-- End Cookie Consent & Conditional GTM -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000">
    ${completeMetadata.meta}
    ${assets.preload}
    ${assets.css}
    ${completeMetadata.script}
    <script>
        // Set initial route and language for React Router
        window.__INITIAL_ROUTE__ = "${route}";
        window.__INITIAL_LANGUAGE__ = "${currentLang}";
        ${props.posts ? `window.__INITIAL_POSTS__ = ${JSON.stringify(props.posts)};` : ''}
    </script>
</head>
<body>
    <!-- GTM noscript is intentionally omitted - requires consent -->
    <noscript>
        <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; text-align: center; font-family: system-ui, sans-serif;">
            <p style="font-size: 1.5rem; font-weight: bold;">WhimsyLabs - Virtual Laboratory Software</p>
            <p>Please enable JavaScript to use this website.</p>
            <nav style="margin-top: 20px;">
                <a href="/" style="margin: 0 10px;">Home</a>
                <a href="/blog" style="margin: 0 10px;">Blog</a>
                <a href="/contact" style="margin: 0 10px;">Contact</a>
                <a href="/faq" style="margin: 0 10px;">FAQ</a>
            </nav>
        </div>
    </noscript>
    <div id="root">${renderResult.html}</div>
    ${assets.js}
    <!-- Cookie Consent Banner -->
    <div id="cookie-banner" style="display:none;position:fixed;bottom:0;left:0;right:0;background:#1f1968;color:#fff;padding:16px 20px;z-index:9999;box-shadow:0 -2px 10px rgba(0,0,0,0.2);">
      <div style="max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;">
        <p style="margin:0;flex:1;min-width:200px;font-size:14px;line-height:1.5;">
          We use cookies to analyse site traffic and improve your experience.
          <a href="/privacy/" style="color:#dabeff;text-decoration:underline;">Learn more</a>
        </p>
        <div style="display:flex;gap:10px;flex-shrink:0;">
          <button onclick="acceptCookies()" style="background:#dabeff;color:#1f1968;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:600;font-size:14px;">Accept</button>
          <button onclick="rejectCookies()" style="background:transparent;color:#dabeff;border:2px solid #dabeff;padding:10px 20px;border-radius:6px;cursor:pointer;font-weight:600;font-size:14px;">Reject</button>
        </div>
      </div>
    </div>
    <script>
    (function(){
      var consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        document.getElementById('cookie-banner').style.display = 'block';
      }
    })();
    function acceptCookies() {
      localStorage.setItem('cookie_consent', 'granted');
      document.getElementById('cookie-banner').style.display = 'none';
      window.loadGTM();
    }
    function rejectCookies() {
      localStorage.setItem('cookie_consent', 'denied');
      document.getElementById('cookie-banner').style.display = 'none';
    }
    </script>
    <!-- End Cookie Consent Banner -->
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
        ...route.metadata,
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

    // Generate URLs for each language with intelligent priority and changefreq
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/blog/', priority: '0.9', changefreq: 'daily' },
      { path: '/services/', priority: '0.6', changefreq: 'weekly' },
      { path: '/features/', priority: '0.8', changefreq: 'weekly' },
      { path: '/bett/', priority: '0.9', changefreq: 'weekly' }, // High priority for event page
      { path: '/faq/', priority: '0.9', changefreq: 'monthly' },
      { path: '/contact/', priority: '0.6', changefreq: 'monthly' },
      { path: '/privacy/', priority: '0.3', changefreq: 'yearly' },
      // landing-demo is now the homepage
    ];

    for (const page of staticPages) {
      for (const lang of config.supportedLanguages) {
        const langPrefix = lang === config.defaultLanguage ? '' : `/${lang}`;
        const url = `${config.siteUrl}${langPrefix}${page.path}`;

        sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>`;
        
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
    const BuildValidator = require('./scripts/build-validator.js');
    const validator = new BuildValidator(config.distDir, config.siteUrl);
    
    const posts = await getBlogPosts('en'); // Use English posts for robots.txt structure
    const robotsTxtContent = await validator.generateRobotsTxt(posts);

    await fs.writeFile(`${config.distDir}/robots.txt`, robotsTxtContent);
    console.log(`✅ Generated robots.txt automatically based on build content`);
  } catch (error) {
    console.error("❌ Error generating robots.txt:", error);
  }
}

// Validate build consistency
async function validateBuild() {
  try {
    console.log("🔍 Validating build consistency...");
    const BuildValidator = require('./scripts/build-validator.js');
    const validator = new BuildValidator(config.distDir, config.siteUrl);
    
    const result = await validator.validate();
    
    if (!result.success) {
      console.warn("⚠️ Build validation found issues - see details above");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("❌ Error during build validation:", error);
    return false;
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
    
    // Final validation step
    const validationPassed = await validateBuild();

    console.log("✅ Static site generation complete!");
    console.log(`📊 Generated static files for ${config.supportedLanguages.length} languages`);
    
    if (!validationPassed) {
      console.log("⚠️ Note: Some validation issues were found (see details above)");
    }
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
