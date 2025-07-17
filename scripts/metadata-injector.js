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
        title: 'WhimsyLabs Blog - Latest Virtual Laboratory Innovations & Teaching Resources',
        description: 'Stay updated with WhimsyLabs\' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.',
        keywords: 'virtual laboratory technology, STEM education resources, science teaching tools, online lab teaching',
      },
      '/services': {
        title: 'WhimsyLabs Services - Custom Virtual Lab Solutions for Education & Industry',
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
      }
    };

    return metaInfo[route] || metaInfo['/'];
  }

  /**
   * Generate basic meta tags for a route
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
    <meta name="author" content="WhimsyLabs">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="canonical" href="${this.baseUrl}${route}">`;
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
    
    return `
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:url" content="${this.baseUrl}${route}">
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
   * @returns {string} - JSON-LD structured data script tags
   */
  generateStructuredData(route) {
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
        "operatingSystem": "Web, Windows, MacOS, iOS, Android, VR",
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

    if (route === '/faq') {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is WhimsyLabs virtual lab software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "WhimsyLabs is a sandbox virtual laboratory simulation that gives you the freedom to explore, play and learn scientific concepts firsthand."
            }
          }
        ]
      };
      schemas.push(faqSchema);
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
      return {
        title: helmetMeta.title,
        meta: helmetMeta.meta,
        link: helmetMeta.link,
        script: helmetMeta.script + '\n    ' + this.generateStructuredData(route),
        style: helmetMeta.style
      };
    }

    // Generate default metadata
    const basicMeta = this.generateBasicMetaTags(route, customMeta);
    const ogMeta = this.generateOpenGraphTags(route, customMeta);
    const twitterMeta = this.generateTwitterCardTags(route, customMeta);
    const structuredData = this.generateStructuredData(route);

    return {
      title: '',
      meta: basicMeta + ogMeta + twitterMeta,
      link: '',
      script: structuredData,
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