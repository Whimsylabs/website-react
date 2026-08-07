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
const { getGrantMetadata } = require("./src/data/grantMetadata");
// Per-post language allowlist (keyed by slug). Region-specific posts are only
// published in the listed languages (build codes: en, es, fr, de, jp); other
// languages get a redirect stub to the English URL.
const blogPostLanguageRestrictions = require("./src/i18n/blogPostLanguageRestrictions.json");
// Static routes published in English only (no translated copy exists).
const englishOnlyRoutes = require("./src/i18n/englishOnlyRoutes.json");
// Post ID <-> slug mapping. Single source of truth: src/i18n/blogPostSlugs.json
const blogPostSlugs = require("./src/i18n/blogPostSlugs.json");
const blogSlugToPostId = Object.fromEntries(
  Object.entries(blogPostSlugs).map(([id, slug]) => [slug, id])
);

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
  "/grants": getGrantMetadata("/grants", lang),
  "/grants/royal-society": getGrantMetadata("/grants/royal-society", lang),
  "/grants/science-community": getGrantMetadata("/grants/science-community", lang),
  "/grants/british-science-week": getGrantMetadata("/grants/british-science-week", lang),
  "/grants/armourers": getGrantMetadata("/grants/armourers", lang),
  "/grants/uk-school-funding": getGrantMetadata("/grants/uk-school-funding", lang),
  "/grants/us-education": getGrantMetadata("/grants/us-education", lang),
  "/grants/japan-education": getGrantMetadata("/grants/japan-education", lang),
  "/grants/erasmus-plus": getGrantMetadata("/grants/erasmus-plus", lang),
  "/grants/inclusive-mainstream-fund": getGrantMetadata("/grants/inclusive-mainstream-fund", lang),
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
  "/industrial": {
    // English-only route (see src/i18n/englishOnlyRoutes.json): no translation lookup.
    title: "Virtual Process & Safety Training for Industry | WhimsyLabs",
    description: "SafeLab by WhimsyLabs: simulation training where process and lab staff practise COSHH handling, spill response and quality procedures repeatedly, on standard PCs or VR. Ufi VocTech funded. Free pilot places open.",
    keywords: "industrial safety training simulation, COSHH training, spill response training, VR safety training, process operator training, lab technician training, competency assessment",
  },
  "/data-security": {
    title: translations[lang]?.dataSecurity?.title || "Student Data Security | WhimsyLabs Virtual Lab Software",
    description: translations[lang]?.dataSecurity?.description || "How WhimsyLabs protects student data with isolated per-school deployments, no AI training, full GDPR/FERPA/COPPA compliance.",
    keywords: "student data privacy, EdTech security, FERPA compliance, GDPR education, virtual lab data protection, school data security",
  },
  "/chemistry": {
    title: translations[lang]?.chemistry?.title || "Virtual Chemistry Lab | Interactive Chemistry Simulations | WhimsyLabs",
    description: translations[lang]?.chemistry?.description || "Explore interactive virtual chemistry experiments with realistic simulations. Safe, unlimited practice for titrations, reactions, and molecular chemistry.",
    keywords: "virtual chemistry lab, chemistry simulations, online chemistry experiments, titration simulation, molecular modelling, GCSE chemistry, A-level chemistry",
  },
  "/biology": {
    title: translations[lang]?.biology?.title || "Virtual Biology Lab | Interactive Biology Simulations | WhimsyLabs",
    description: translations[lang]?.biology?.description || "Explore interactive virtual biology experiments with realistic simulations. Dissections, microscopy, and cellular biology without ethical concerns.",
    keywords: "virtual biology lab, biology simulations, online biology experiments, virtual dissection, microscopy simulation, GCSE biology, A-level biology",
  },
  "/physics": {
    title: translations[lang]?.physics?.title || "Virtual Physics Lab | Interactive Physics Simulations | WhimsyLabs",
    description: translations[lang]?.physics?.description || "Explore interactive virtual physics experiments with realistic simulations. Mechanics, electricity, waves, and more with real-time data collection.",
    keywords: "virtual physics lab, physics simulations, online physics experiments, circuit simulation, mechanics simulation, GCSE physics, A-level physics",
  },
  "/ai-assessment": {
    title: translations[lang]?.aiAssessment?.title || "AI-Proof Assessment for Science Labs | WhimsyLabs",
    description: translations[lang]?.aiAssessment?.description || "AI can write a lab report but can't do a titration. WhimsyLabs grades technique, decisions and safety in the lab, nothing to fake.",
    keywords: "AI-proof assessment, process-based assessment, AI detection alternative, practical skills assessment, science lab grading, AI assessment schools",
  },
  "/choose-virtual-lab": {
    title: translations[lang]?.chooseVirtualLab?.title || "How to Choose Virtual Lab Software: A Buyer's Guide",
    description: translations[lang]?.chooseVirtualLab?.description || "A 12-point checklist for choosing virtual lab software: physics vs animation, AI assessment, accessibility, data protection and cost.",
    keywords: "choose virtual lab software, virtual lab comparison, best virtual lab software, virtual lab buyer's guide, Labster alternatives, virtual lab checklist",
  },
  "/send": {
    title: translations[lang]?.sendScience?.title || "Accessible Science Practicals for SEND | WhimsyLabs",
    description: translations[lang]?.sendScience?.description || "Virtual labs built for SEND: control remapping, text-to-speech, self-paced practicals, and evidence for the 2026 SEND White Paper.",
    keywords: "SEND science practicals, accessible virtual labs, SEND white paper 2026, inclusive science education, SEND lab access, special educational needs science",
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
  "/data-security": "DataSecurityPage",
  "/industrial": "IndustrialPage",
  "/bett": "BettPage",
  "/grants": "GrantsPage",
  "/grants/royal-society": "RoyalSocietyGrantPage",
  "/grants/science-community": "ScienceCommunityGrantPage",
  "/grants/british-science-week": "BritishScienceWeekGrantPage",
  "/grants/japan-education": "JapanEducationGrantPage",
  "/grants/erasmus-plus": "ErasmusGrantPage",
  "/grants/armourers": "ArmourersGrantPage",
  "/grants/uk-school-funding": "UKSchoolFundingGrantPage",
  "/grants/us-education": "USGrantsPage",
  "/grants/inclusive-mainstream-fund": "InclusiveMainstreamFundGrantPage",
  "/chemistry": "ChemistryPage",
  "/biology": "BiologyPage",
  "/physics": "PhysicsPage",
  "/ai-assessment": "AIAssessmentPage",
  "/choose-virtual-lab": "ChooseVirtualLabPage",
  "/send": "SendSciencePage",
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
      // English-only routes (e.g. the UK industrial pilot page) are not built
      // per-language: no translated copy exists, so emitting /es/... etc. would
      // ship duplicate English content under a translated URL.
      if (lang !== config.defaultLanguage && englishOnlyRoutes.includes(path)) return;

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

    ReactComponents.DataSecurityPage =
      require("./src/Components/DataSecurityPage.js").default;
    console.log("✅ Loaded DataSecurityPage");

    ReactComponents.IndustrialPage =
      require("./src/Components/IndustrialPage.js").default;
    console.log("✅ Loaded IndustrialPage");

    ReactComponents.BettPage = require("./src/Components/BettPage.js").default;
    console.log("✅ Loaded BettPage");

    ReactComponents.GrantsPage = require("./src/Components/GrantsPage.js").default;
    console.log("✅ Loaded GrantsPage");

    ReactComponents.RoyalSocietyGrantPage = require("./src/Components/RoyalSocietyGrantPage.js").default;
    console.log("✅ Loaded RoyalSocietyGrantPage");


    ReactComponents.ScienceCommunityGrantPage = require("./src/Components/ScienceCommunityGrantPage.js").default;
    console.log("✅ Loaded ScienceCommunityGrantPage");


    ReactComponents.BritishScienceWeekGrantPage = require("./src/Components/BritishScienceWeekGrantPage.js").default;
    console.log("✅ Loaded BritishScienceWeekGrantPage");

    ReactComponents.JapanEducationGrantPage = require("./src/Components/JapanEducationGrantPage.js").default;
    console.log("✅ Loaded JapanEducationGrantPage");

    ReactComponents.ErasmusGrantPage = require("./src/Components/ErasmusGrantPage.js").default;
    console.log("✅ Loaded ErasmusGrantPage");
    ReactComponents.ArmourersGrantPage = require("./src/Components/ArmourersGrantPage.js").default;
    console.log("✅ Loaded ArmourersGrantPage");
    ReactComponents.UKSchoolFundingGrantPage = require("./src/Components/UKSchoolFundingGrantPage.js").default;
    console.log("✅ Loaded UKSchoolFundingGrantPage");
    ReactComponents.USGrantsPage = require("./src/Components/USGrantsPage.js").default;
    console.log("✅ Loaded USGrantsPage");
    ReactComponents.InclusiveMainstreamFundGrantPage = require("./src/Components/InclusiveMainstreamFundGrantPage.js").default;
    console.log("✅ Loaded InclusiveMainstreamFundGrantPage");

    ReactComponents.ChemistryPage = require("./src/Components/ChemistryPage.js").default;
    console.log("✅ Loaded ChemistryPage");
    ReactComponents.BiologyPage = require("./src/Components/BiologyPage.js").default;
    console.log("✅ Loaded BiologyPage");
    ReactComponents.PhysicsPage = require("./src/Components/PhysicsPage.js").default;
    console.log("✅ Loaded PhysicsPage");
    ReactComponents.AIAssessmentPage = require("./src/Components/AIAssessmentPage.js").default;
    console.log("✅ Loaded AIAssessmentPage");
    ReactComponents.ChooseVirtualLabPage = require("./src/Components/ChooseVirtualLabPage.js").default;
    console.log("✅ Loaded ChooseVirtualLabPage");
    ReactComponents.SendSciencePage = require("./src/Components/SendSciencePage.js").default;
    console.log("✅ Loaded SendSciencePage");

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

    if (path.resolve(reactStaticDir) === path.resolve(destStaticDir)) {
      // distDir is the same as buildDir, so the files are already in place;
      // fs.copy rejects self-copies with "Source and destination must not be the same"
      console.log("✅ React build static files already in place (distDir same as buildDir)");
    } else if (await fs.pathExists(reactStaticDir)) {
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
    const Post20 = require("./src/Components/blog/Post20.js");
    const Post21 = require("./src/Components/blog/Post21.js");
    const Post22 = require("./src/Components/blog/Post22.js");
    const Post23 = require("./src/Components/blog/Post23.js");
    const Post24 = require("./src/Components/blog/Post24.js");
    const Post25 = require("./src/Components/blog/Post25.js");
    const Post26 = require("./src/Components/blog/Post26.js");
    const Post27 = require("./src/Components/blog/Post27.js");
    const Post28 = require("./src/Components/blog/Post28.js");
    const Post29 = require("./src/Components/blog/Post29.js");
    const Post30 = require("./src/Components/blog/Post30.js");
    const Post31 = require("./src/Components/blog/Post31.js");
    const Post32 = require("./src/Components/blog/Post32.js");
    const Post33 = require("./src/Components/blog/Post33.js");
    const Post34 = require("./src/Components/blog/Post34.js");
    const Post38 = require("./src/Components/blog/Post38.js");

    const fallbackPosts = [Post1, Post2, Post3, Post4, Post5, Post6, Post7, Post8, Post9, Post10, Post11, Post12, Post13, Post14, Post15, Post16, Post17, Post18, Post19, Post20, Post21, Post22, Post23, Post24, Post25, Post26, Post27, Post28, Post29, Post30, Post31, Post32, Post33, Post34, Post38];
    
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
      const Post20 = require("./src/Components/blog/Post20.js");
      const Post21 = require("./src/Components/blog/Post21.js");
      const Post22 = require("./src/Components/blog/Post22.js");
      const Post23 = require("./src/Components/blog/Post23.js");
      const Post24 = require("./src/Components/blog/Post24.js");
      const Post25 = require("./src/Components/blog/Post25.js");
      const Post26 = require("./src/Components/blog/Post26.js");
      const Post27 = require("./src/Components/blog/Post27.js");
      const Post28 = require("./src/Components/blog/Post28.js");
      const Post29 = require("./src/Components/blog/Post29.js");
      const Post30 = require("./src/Components/blog/Post30.js");
      const Post31 = require("./src/Components/blog/Post31.js");
      const Post32 = require("./src/Components/blog/Post32.js");
      const Post33 = require("./src/Components/blog/Post33.js");
      const Post34 = require("./src/Components/blog/Post34.js");
      const Post38 = require("./src/Components/blog/Post38.js");

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
        },
        {
          id: Post20.slug,
          title: Post20.title,
          date: Post20.date,
          description: Post20.description,
          content: Post20.content,
          path: `/blog/${Post20.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post21.slug,
          title: Post21.title,
          date: Post21.date,
          description: Post21.description,
          content: Post21.content,
          path: `/blog/${Post21.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post22.slug,
          title: Post22.title,
          date: Post22.date,
          description: Post22.description,
          content: Post22.content,
          path: `/blog/${Post22.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post23.slug,
          title: Post23.title,
          date: Post23.date,
          description: Post23.description,
          content: Post23.content,
          path: `/blog/${Post23.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post24.slug,
          title: Post24.title,
          date: Post24.date,
          description: Post24.description,
          content: Post24.content,
          path: `/blog/${Post24.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post25.slug,
          title: Post25.title,
          date: Post25.date,
          description: Post25.description,
          content: Post25.content,
          path: `/blog/${Post25.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post26.slug,
          title: Post26.title,
          date: Post26.date,
          description: Post26.description,
          content: Post26.content,
          path: `/blog/${Post26.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post27.slug,
          title: Post27.title,
          date: Post27.date,
          description: Post27.description,
          content: Post27.content,
          path: `/blog/${Post27.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post28.slug,
          title: Post28.title,
          date: Post28.date,
          description: Post28.description,
          content: Post28.content,
          path: `/blog/${Post28.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post29.slug,
          title: Post29.title,
          date: Post29.date,
          description: Post29.description,
          content: Post29.content,
          path: `/blog/${Post29.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post30.slug,
          title: Post30.title,
          date: Post30.date,
          description: Post30.description,
          content: Post30.content,
          path: `/blog/${Post30.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post31.slug,
          title: Post31.title,
          date: Post31.date,
          description: Post31.description,
          content: Post31.content,
          path: `/blog/${Post31.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post32.slug,
          title: Post32.title,
          date: Post32.date,
          description: Post32.description,
          content: Post32.content,
          path: `/blog/${Post32.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post33.slug,
          title: Post33.title,
          date: Post33.date,
          description: Post33.description,
          content: Post33.content,
          path: `/blog/${Post33.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post34.slug,
          title: Post34.title,
          date: Post34.date,
          description: Post34.description,
          content: Post34.content,
          path: `/blog/${Post34.slug}`,
          language: 'en',
          hasFullTranslation: true
        },
        {
          id: Post38.slug,
          title: Post38.title,
          date: Post38.date,
          description: Post38.description,
          content: Post38.content,
          path: `/blog/${Post38.slug}`,
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

    // For blog posts, render content to HTML string for SSR (ALL languages)
    if (route.includes('/blog/') && !route.endsWith('/blog') && !route.endsWith('/blog/') && data.slug) {
      props.slug = data.slug;
      props.title = data.title;
      props.description = data.description;
      props.date = data.date;
      
      // SSR: Render blog content to HTML string
      try {
        const ReactDOMServer = require('react-dom/server');
        const language = data.language || 'en';
        
        // Map slug to post ID (post1, post2, etc.)
        const slugToPostId = blogSlugToPostId;
        
        const postId = slugToPostId[data.slug];
        let postModule = null;
        
        if (postId) {
          // Map language codes: config uses 'jp', translation files use 'ja'
          const langCode = language === 'jp' ? 'ja' : language;
          
          // Try to load translated content first, fall back to English
          try {
            if (language !== 'en') {
              postModule = require(`./src/i18n/blog/${postId}/${langCode}.js`);
            }
          } catch (e) {
            // Distinguish a genuinely missing translation (expected, fall back to
            // English) from a translation file that EXISTS but failed to load (a real
            // bug, e.g. a missing `import React`). The latter must be loud, otherwise
            // the page silently ships English content under a translated URL.
            if (e.code === 'MODULE_NOT_FOUND') {
              console.warn(`⚠️ No ${langCode} translation for ${postId}, using English fallback`);
            } else {
              console.error(`❌ ${langCode} translation for ${postId} FAILED TO LOAD, serving ENGLISH instead: ${e.message.split('\n')[0]}`);
            }
          }
          
          // Fall back to English if no translation
          if (!postModule || !postModule.content) {
            const postNum = postId.replace('post', '');
            postModule = require(`./src/Components/blog/Post${postNum}.js`);
          }
          
          if (postModule && postModule.content) {
            // Render JSX content to HTML string
            const contentHtml = ReactDOMServer.renderToStaticMarkup(postModule.content);
            props.content = contentHtml;
            // Expose the rendered article to the metadata injector so the
            // BlogPosting schema can report a real wordCount/reading time
            data.contentHtml = contentHtml;

            // Also use translated title if available
            if (postModule.title) {
              props.title = postModule.title;
            }
            
            console.log(`✅ SSR rendered ${language} content for ${data.slug}`);
          }
        }
      } catch (ssrError) {
        console.warn(`⚠️ Could not SSR blog content for ${data.slug}:`, ssrError.message);
      }
    }

    // Generate complete metadata (after blog content SSR so schema markup can
    // use the rendered article via data.contentHtml)
    const completeMetadata = metadataInjector.generateCompleteMetadata(
      route,
      data
    );

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
      { path: '/grants/', priority: '0.7', changefreq: 'weekly' }, // Grants index
      { path: '/grants/royal-society/', priority: '0.8', changefreq: 'weekly' }, // Royal Society Partnership Grants
      { path: '/grants/science-community/', priority: '0.7', changefreq: 'weekly' }, // Royal Society Science Community Grant
      { path: '/grants/british-science-week/', priority: '0.8', changefreq: 'weekly' }, // British Science Week Kick Start
      { path: '/grants/japan-education/', priority: '0.8', changefreq: 'weekly' }, // Japan MEXT/GIGA + foundation grants
      { path: '/grants/erasmus-plus/', priority: '0.9', changefreq: 'weekly' }, // Erasmus+ KA220 EU grants
      { path: '/grants/armourers/', priority: '0.7', changefreq: 'weekly' }, // Armourers & Brasiers science grants
      { path: '/grants/uk-school-funding/', priority: '0.7', changefreq: 'weekly' }, // Pupil Premium / SEN budgets
      { path: '/grants/us-education/', priority: '0.8', changefreq: 'weekly' }, // US Title IV-A / DonorsChoose
      { path: '/grants/inclusive-mainstream-fund/', priority: '0.8', changefreq: 'weekly' }, // DfE Inclusive Mainstream Fund 2026-27
      { path: '/faq/', priority: '0.9', changefreq: 'monthly' },
      { path: '/contact/', priority: '0.6', changefreq: 'monthly' },
      { path: '/privacy/', priority: '0.3', changefreq: 'yearly' },
      { path: '/data-security/', priority: '0.4', changefreq: 'yearly' },
      // DPA excluded from sitemap - single-language legal document, linked from footer
      { path: '/chemistry/', priority: '0.8', changefreq: 'weekly' }, // Subject landing page
      { path: '/biology/', priority: '0.8', changefreq: 'weekly' }, // Subject landing page
      { path: '/physics/', priority: '0.8', changefreq: 'weekly' }, // Subject landing page
      { path: '/ai-assessment/', priority: '0.8', changefreq: 'weekly' }, // Assessment pillar page
      { path: '/choose-virtual-lab/', priority: '0.8', changefreq: 'weekly' }, // Buyer's guide
      { path: '/send/', priority: '0.8', changefreq: 'weekly' }, // SEND accessibility page
      { path: '/industrial/', priority: '0.8', changefreq: 'weekly' }, // Industrial / vocational (English only)
      // landing-demo is now the homepage
    ];

    for (const page of staticPages) {
      // English-only pages appear once, with no alternate-language links.
      const isEnglishOnly = englishOnlyRoutes.includes(page.path.replace(/\/$/, ''));
      const pageLangs = isEnglishOnly ? [config.defaultLanguage] : config.supportedLanguages;

      for (const lang of pageLangs) {
        const langPrefix = lang === config.defaultLanguage ? '' : `/${lang}`;
        const url = `${config.siteUrl}${langPrefix}${page.path}`;

        sitemap += `
    <url>
        <loc>${url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>`;

        // Add alternate language links
        for (const altLang of pageLangs) {
          const altLangPrefix = altLang === config.defaultLanguage ? '' : `/${altLang}`;
          const altUrl = `${config.siteUrl}${altLangPrefix}${page.path}`;
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
      const allowedLangs = blogPostLanguageRestrictions[post.id]; // post.id is the slug

      for (const lang of config.supportedLanguages) {
        if (allowedLangs && !allowedLangs.includes(lang)) continue; // region-specific: omit unpublished languages
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
          if (allowedLangs && !allowedLangs.includes(altLang)) continue; // region-specific: omit unpublished languages
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

// Generate llms.txt, the emerging convention AI assistants and crawlers use
// to discover a site's key content (https://llmstxt.org/)
async function generateLlmsTxt() {
  try {
    const posts = await getBlogPosts('en');
    const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    let llmsTxt = `# WhimsyLabs

> WhimsyLabs is award-winning virtual laboratory software for science education. Students conduct realistic Biology, Chemistry, and Physics experiments in a fully simulated sandbox lab, on desktop, mobile, or VR, while WhimsyCat, the built-in AI tutor, assesses their practical skills. WhimsyCat has no student chat window: it infers everything from students' actions in the lab, so pupils never type prompts or receive generated text. Winner of the BETT 2025 Kids Judge Award (Best Science Lab, Start Up).

The site is available in English (default, no URL prefix), Spanish (/es/), French (/fr/), German (/de/), and Japanese (/jp/).

## Key pages

- [Home](${config.siteUrl}/): What WhimsyLabs is, how the physics-first simulation and AI assessment work
- [Features](${config.siteUrl}/features/): Full feature set, realistic simulations, AI assessment, cross-platform access
- [Services](${config.siteUrl}/services/): Solutions for schools and K-12 classrooms, trials, and onboarding
- [AI-Proof Assessment](${config.siteUrl}/ai-assessment/): Why process-based assessment beats AI detection, and how WhimsyLabs grades technique
- [How to Choose Virtual Lab Software](${config.siteUrl}/choose-virtual-lab/): A 12-point buyer's checklist for schools comparing virtual lab platforms
- [SEND Science Practicals](${config.siteUrl}/send/): Accessible practicals, control remapping, text-to-speech, self-paced modes
- [Virtual Chemistry Lab](${config.siteUrl}/chemistry/): Titrations, reactions, electrolysis with simulated chemistry
- [Virtual Biology Lab](${config.siteUrl}/biology/): Dissections, microscopy, and physiology
- [Virtual Physics Lab](${config.siteUrl}/physics/): Mechanics, circuits, waves on a real-time physics engine
- [FAQ](${config.siteUrl}/faq/): 40+ answered questions on pricing, setup, VR requirements, and curriculum fit
- [Grants](${config.siteUrl}/grants/): Funding routes schools can use to pay for WhimsyLabs
- [Data Security](${config.siteUrl}/data-security/): Student data protection, GDPR/FERPA/COPPA compliance
- [Contact](${config.siteUrl}/contact/): Book a demo or request a school trial

## Blog

`;

    for (const post of sortedPosts) {
      const description = (post.description || '').replace(/\s+/g, ' ').trim();
      llmsTxt += `- [${post.title}](${config.siteUrl}/blog/${post.id}/): ${description}\n`;
    }

    await fs.writeFile(`${config.distDir}/llms.txt`, llmsTxt);
    console.log(`✅ Generated llms.txt with ${sortedPosts.length} blog posts`);
  } catch (error) {
    console.error("❌ Error generating llms.txt:", error);
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

// Generate 200-status redirect stubs for region-specific posts in languages they are
// not published in (e.g. /de/blog/<uk-post>/ -> /blog/<uk-post>/). Static MPA redirect
// (meta refresh + JS) with noindex + a canonical to the English URL. These pages exist
// (HTTP 200) so the localized URL is a real redirect rather than a 404. SEO/content
// validators detect and skip them via scripts/is-redirect-stub.js.
async function generateRestrictedRedirects() {
  let count = 0;
  for (const [slug, allowedLangs] of Object.entries(blogPostLanguageRestrictions)) {
    const targetPath = `/blog/${slug}/`; // English (default) canonical URL
    for (const lang of config.supportedLanguages) {
      if (lang === config.defaultLanguage || allowedLangs.includes(lang)) continue;
      const dir = `${config.distDir}/${lang}/blog/${slug}`;
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, follow">
    <title>Redirecting to English version | WhimsyLabs</title>
    <link rel="canonical" href="${config.siteUrl}${targetPath}">
    <meta http-equiv="refresh" content="0; url=${targetPath}">
    <script>window.location.replace("${targetPath}");</script>
</head>
<body>
    <p>This article is available in English. Redirecting to <a href="${targetPath}">${targetPath}</a>.</p>
</body>
</html>`;
      await fs.ensureDir(dir);
      await fs.writeFile(`${dir}/index.html`, html);
      count++;
    }
  }
  if (count > 0) {
    console.log(`🔁 Generated ${count} language redirect stubs for region-specific posts`);
  }
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
    await generateRestrictedRedirects();
    await generateSitemap();
    await generateRobotsTxt();
    await generateLlmsTxt();
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
