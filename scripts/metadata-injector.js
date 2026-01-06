/**
 * Metadata Injection System - Extracts and injects SEO metadata into static HTML
 */
class MetadataInjector {
  constructor() {
    this.baseUrl = 'https://whimsylabs.ai';
  }

  /**
   * Extract metadata from React Helmet context
   * @param {Object} helmetContext - Helmet context from server-side rendering
   * @returns {Object} - Extracted metadata
   */
  extractHelmetMetadata(helmetContext) {
    if (!helmetContext || !helmetContext.helmet) {
      return {};
    }

    const helmet = helmetContext.helmet;
    
    return {
      title: helmet.title?.toString() || '',
      meta: helmet.meta?.toString() || '',
      link: helmet.link?.toString() || '',
      script: helmet.script?.toString() || '',
      style: helmet.style?.toString() || ''
    };
  }

  /**
   * Get default metadata for a route
   * @param {string} route - The route path
   * @returns {Object} - Default metadata
   */
  getDefaultMetadata(route) {
    const metaInfo = {
      '/': {
        title: 'WhimsyLabs - Award-Winning Virtual Lab Software for STEM Education',
        description: 'WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.',
        keywords: 'virtual lab software, online lab simulations, STEM virtual labs for schools, science education technology',
      },
      '/blog': {
        title: 'WhimsyLabs Blog - Virtual Laboratory Innovations & STEM Education',
        description: 'Stay updated with WhimsyLabs\' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.',
        keywords: 'virtual laboratory technology, STEM education resources, science teaching tools, online lab teaching',
      },
      '/services': {
        title: 'WhimsyLabs Services - Custom Virtual Lab Solutions for Education',
        description: 'Discover WhimsyLabs\' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments.',
        keywords: 'virtual lab solutions, science education technology, remote laboratory learning, interactive science experiments',
      },
      '/features': {
        title: 'WhimsyLabs Features - Cutting-Edge Virtual Laboratory Technology',
        description: 'Explore WhimsyLabs\' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.',
        keywords: 'virtual laboratory features, science simulation software, AI assessment tools, immersive STEM learning',
      },
      '/faq': {
        title: 'Frequently Asked Questions | WhimsyLabs Virtual Lab Software',
        description: 'Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators.',
        keywords: 'virtual lab software FAQ, online lab simulations help, STEM virtual labs questions, virtual laboratory software support',
      },
      '/contact': {
        title: 'Contact Us | WhimsyLabs Virtual Lab Software',
        description: 'Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education.',
        keywords: 'contact WhimsyLabs, virtual lab trial, STEM education contact',
      },
      '/bett': {
        title: 'WhimsyLabs - Award-Winning Virtual Lab Software for STEM Education',
        description: 'WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.',
        keywords: 'virtual lab software, online lab simulations, STEM virtual labs for schools, science education technology',
      },
      '/demo': {
        title: 'Demo | WhimsyLabs Virtual Lab Software',
        description: 'Try WhimsyLabs virtual laboratory software with our interactive demo. Experience our STEM education platform and see how virtual labs enhance science learning.',
        keywords: 'virtual lab demo, online lab simulation trial, STEM education demo, science laboratory software demo',
      },
      '/privacy': {
        title: 'Privacy Policy | WhimsyLabs Virtual Lab Software',
        description: 'Read WhimsyLabs privacy policy to understand how we protect your data and privacy when using our virtual laboratory software for STEM education.',
        keywords: 'WhimsyLabs privacy policy, virtual lab data protection, STEM education privacy, online lab security',
      },
      '/spa': {
        title: 'WhimsyLabs - Award-Winning Virtual Lab Software for STEM Education',
        description: 'WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.',
        keywords: 'virtual lab software, online lab simulations, STEM virtual labs for schools, science education technology',
      }
    };

    return metaInfo[route] || metaInfo['/'];
  }

  /**
   * Generate canonical and hreflang tags
   * @param {string} route - The route path
   * @returns {string} - HTML canonical and hreflang tags
   */
  generateCanonicalAndHreflangTags(route) {
    // Extract language from route
    const langMatch = route.match(/^\/([a-z]{2})\//);
    const language = langMatch ? langMatch[1] : null;
    
    let baseRoute;
    
    if (language) {
      // For language-specific routes, extract base route without language
      baseRoute = route.replace(`/${language}`, '');
    } else {
      // For main English routes
      baseRoute = route;
    }
    
    // Ensure trailing slash consistency - always add trailing slash except for root
    if (baseRoute !== '/' && !baseRoute.endsWith('/')) {
      baseRoute += '/';
    }
    
    // Canonical points to self (each language page is canonical for its language)
    let canonicalRoute = route;
    if (canonicalRoute !== '/' && !canonicalRoute.endsWith('/')) {
      canonicalRoute += '/';
    }
    
    let tags = `
    <link rel="canonical" href="${this.baseUrl}${canonicalRoute}">`;
    
    // Add hreflang tags for international versions - ensure consistent trailing slash handling
    const languages = ['en', 'de', 'es', 'fr', 'ja'];
    const languageMap = { 'en': '', 'de': '/de', 'es': '/es', 'fr': '/fr', 'ja': '/jp' };
    
    for (const lang of languages) {
      const langPrefix = languageMap[lang];
      // Build the full URL ensuring no double slashes and consistent trailing slashes
      let hreflangUrl;
      if (baseRoute === '/') {
        // Root case: /en => /, /de => /de/, etc.
        hreflangUrl = langPrefix === '' ? `${this.baseUrl}/` : `${this.baseUrl}${langPrefix}/`;
      } else {
        // Non-root case: ensure baseRoute has trailing slash and combine properly
        const normalizedBaseRoute = baseRoute.endsWith('/') ? baseRoute : baseRoute + '/';
        hreflangUrl = `${this.baseUrl}${langPrefix}${normalizedBaseRoute}`;
      }
      
      tags += `
    <link rel="alternate" hreflang="${lang}" href="${hreflangUrl}">`;
    }
    
    // Add x-default hreflang pointing to English with consistent format
    let xDefaultUrl;
    if (baseRoute === '/') {
      xDefaultUrl = `${this.baseUrl}/`;
    } else {
      const normalizedBaseRoute = baseRoute.endsWith('/') ? baseRoute : baseRoute + '/';
      xDefaultUrl = `${this.baseUrl}${normalizedBaseRoute}`;
    }
    
    tags += `
    <link rel="alternate" hreflang="x-default" href="${xDefaultUrl}">`;
    
    return tags;
  }

  /**
   * Generate basic meta tags
   * @param {string} route - The route path
   * @param {Object} customMeta - Custom metadata to override defaults
   * @returns {string} - HTML meta tags
   */
  generateBasicMetaTags(route, customMeta = {}) {
    const defaultMeta = this.getDefaultMetadata(route);
    const meta = { ...defaultMeta, ...customMeta };
    
    return `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}">
    <meta name="keywords" content="${meta.keywords}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="WhimsyLabs">${this.generateCanonicalAndHreflangTags(route)}`;
  }

  /**
   * Generate Open Graph meta tags
   * @param {string} route - The route path
   * @param {Object} customMeta - Custom metadata
   * @returns {string} - HTML Open Graph meta tags
   */
  generateOpenGraphTags(route, customMeta = {}) {
    const defaultMeta = this.getDefaultMetadata(route);
    const meta = { ...defaultMeta, ...customMeta };
    
    // Ensure consistent trailing slash for og:url to match canonical URL
    const normalizedRoute = route.endsWith('/') ? route : route + '/';
    
    return `
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:url" content="${this.baseUrl}${normalizedRoute}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="WhimsyLabs">
    <meta property="og:locale" content="en_GB">
    <meta property="og:image" content="${this.baseUrl}/logo.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">`;
  }

  /**
   * Generate Twitter Card meta tags
   * @param {string} route - The route path
   * @param {Object} customMeta - Custom metadata
   * @returns {string} - HTML Twitter Card meta tags
   */
  generateTwitterCardTags(route, customMeta = {}) {
    const defaultMeta = this.getDefaultMetadata(route);
    const meta = { ...defaultMeta, ...customMeta };
    
    return `
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${this.baseUrl}/logo.png">`;
  }

  /**
   * Generate structured data (JSON-LD) for a route
   * @param {string} route - The route path
   * @param {Object} data - Optional data object (for blog posts, etc.)
   * @returns {string} - JSON-LD structured data script tags
   */
  generateStructuredData(route, data = {}) {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WhimsyLabs",
      "url": this.baseUrl,
      "logo": `${this.baseUrl}/logo.png`,
      "description": "WhimsyLabs provides award-winning virtual laboratory software for science education, used in schools, colleges, and universities worldwide.",
      "sameAs": [
        "https://www.youtube.com/@whimsylabs",
        "https://bsky.app/profile/whimsylabs.bsky.social"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "inquiries@whimsylabs.ai",
        "contactType": "customer service"
      }
    };

    let schemas = [organizationSchema];

    // Add route-specific schemas
    if (route === '/') {
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "WhimsyLabs Virtual Laboratory",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web, Windows, MacOS, Android, VR",
        "offers": {
          "@type": "Offer",
          "price": "Contact for pricing",
          "priceCurrency": "GBP"
        },
        "description": "A sandbox virtual laboratory simulation that gives you the freedom to explore, play and learn scientific concepts firsthand.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "120"
        }
      };
      schemas.push(productSchema);
    }

    // Generate FAQ schema for all language versions of FAQ page
    if (route === '/faq' || route.endsWith('/faq')) {
      // Dynamically load ALL FAQ items
      const { getAllFAQItems } = require('../src/data/faqData.js');
      const allFAQs = getAllFAQItems();

      // Helper to strip HTML tags
      const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      };

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFAQs.map(faq => ({
          "@type": "Question",
          "name": stripHtml(faq.question),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": stripHtml(faq.answer)
          }
        }))
      };
      schemas.push(faqSchema);
    }

    // Generate BlogPosting schema for blog posts
    if (route.includes('/blog/') && route !== '/blog' && !route.endsWith('/blog/')) {
      // Extract language from route
      const langMatch = route.match(/^\/([a-z]{2})\//);
      const language = langMatch ? langMatch[1] : 'en';
      const inLanguage = language === 'en' ? 'en-GB' : language;

      // Calculate estimated reading time (assuming 200 words per minute)
      const description = data.description || '';
      const wordCount = description ? description.split(/\s+/).length * 10 : 1000;
      const readingMinutes = Math.max(3, Math.ceil(wordCount / 200));

      const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": data.title || "WhimsyLabs Blog Post",
        "description": data.description || "",
        "image": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/logo.png`,
          "width": 1200,
          "height": 630
        },
        "datePublished": data.date || data.datePublished || new Date().toISOString().split('T')[0],
        "dateModified": data.dateModified || data.date || data.datePublished || new Date().toISOString().split('T')[0],
        "author": {
          "@type": "Person",
          "name": "Marisa French",
          "url": "https://www.linkedin.com/in/drmarisafrench/",
          "sameAs": [
            "https://www.linkedin.com/in/drmarisafrench/"
          ]
        },
        "publisher": {
          "@type": "Organization",
          "name": "WhimsyLabs",
          "url": this.baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${this.baseUrl}/logo.png`,
            "width": 1200,
            "height": 630
          }
        },
        "url": `${this.baseUrl}${route}`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${this.baseUrl}${route}`
        },
        "timeRequired": `PT${readingMinutes}M`,
        "articleSection": "STEM Education Technology",
        "wordCount": wordCount,
        "inLanguage": inLanguage,
        "isAccessibleForFree": true,
        "about": [
          {
            "@type": "Thing",
            "name": "Virtual Laboratory Technology"
          },
          {
            "@type": "Thing",
            "name": "STEM Education"
          },
          {
            "@type": "Thing",
            "name": "Educational Technology"
          }
        ]
      };

      // Add keywords if available
      if (data.keywords) {
        blogPostSchema.keywords = Array.isArray(data.keywords) ? data.keywords.join(", ") : data.keywords;
      }

      schemas.push(blogPostSchema);

      // Also add breadcrumb schema for blog posts
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": this.baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${this.baseUrl}${language === 'en' ? '' : '/' + language}/blog/`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": data.title || "Blog Post",
          "item": `${this.baseUrl}${route}`
        }
      ];

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      };

      schemas.push(breadcrumbSchema);
    }

    return schemas.map(schema =>
      `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    ).join('\n    ');
  }

  /**
   * Generate complete metadata for a route
   * @param {string} route - The route path
   * @param {Object} helmetContext - Helmet context from SSR
   * @param {Object} customMeta - Custom metadata
   * @returns {Object} - Complete metadata object
   */
  generateCompleteMetadata(route, helmetContext = null, customMeta = {}) {
    // If we have helmet context, use it; otherwise generate default metadata
    if (helmetContext && helmetContext.helmet) {
      const helmetMeta = this.extractHelmetMetadata(helmetContext);
      const blueskyScript = '<script type="module" src="https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js" async></script>';
      return {
        title: helmetMeta.title,
        meta: helmetMeta.meta,
        link: helmetMeta.link,
        script: blueskyScript + '\n    ' + helmetMeta.script + '\n    ' + this.generateStructuredData(route, customMeta),
        style: helmetMeta.style
      };
    }

    // Generate default metadata
    const basicMeta = this.generateBasicMetaTags(route, customMeta);
    const ogMeta = this.generateOpenGraphTags(route, customMeta);
    const twitterMeta = this.generateTwitterCardTags(route, customMeta);
    const structuredData = this.generateStructuredData(route, customMeta);
    const blueskyScript = '<script type="module" src="https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js" async></script>';

    return {
      title: '',
      meta: basicMeta + ogMeta + twitterMeta,
      link: '',
      script: blueskyScript + '\n    ' + structuredData,
      style: ''
    };
  }

  /**
   * Inject metadata into HTML template
   * @param {string} htmlTemplate - Base HTML template
   * @param {Object} metadata - Metadata to inject
   * @returns {string} - HTML with injected metadata
   */
  injectMetadata(htmlTemplate, metadata) {
    let html = htmlTemplate;

    // Inject title (replace existing or add if missing)
    if (metadata.title) {
      if (html.includes('<title>')) {
        html = html.replace(/<title>.*?<\/title>/, metadata.title);
      } else {
        html = html.replace('</head>', `  ${metadata.title}\n  </head>`);
      }
    }

    // Inject meta tags
    if (metadata.meta) {
      html = html.replace('</head>', `  ${metadata.meta}\n  </head>`);
    }

    // Inject link tags
    if (metadata.link) {
      html = html.replace('</head>', `  ${metadata.link}\n  </head>`);
    }

    // Inject scripts
    if (metadata.script) {
      html = html.replace('</head>', `  ${metadata.script}\n  </head>`);
    }

    // Inject styles
    if (metadata.style) {
      html = html.replace('</head>', `  ${metadata.style}\n  </head>`);
    }

    return html;
  }
}

module.exports = MetadataInjector;