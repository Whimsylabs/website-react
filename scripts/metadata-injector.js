/**
 * Metadata Injection System - Extracts and injects SEO metadata into static HTML
 */

// Import translations for multilingual metadata
const { translations } = require('../src/i18n/translations.js');

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
    // Extract language from route (e.g., /es/blog/ → es, /jp/faq/ → jp)
    const langMatch = route.match(/^\/([a-z]{2})(?=\/|$)/);
    const routeLang = langMatch ? langMatch[1] : 'en';
    // Map jp to ja for translations lookup (Japanese uses 'jp' in URLs but 'ja' internally might vary)
    const lang = routeLang === 'jp' ? 'jp' : routeLang;
    
    // Get translations for this language, fallback to English
    const t = translations[lang] || translations.en;
    
    // Normalize route by stripping language prefix (e.g., /jp/blog/ → /blog/, /es/services/ → /services/)
    const normalizedRoute = route.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

    // Use translated metadata where available, with English fallbacks
    const metaInfo = {
      '/': {
        title: t.landingDemo?.title || 'WhimsyLabs Virtual Science Lab | Award-Winning Software for STEM Education',
        description: t.landingDemo?.description || 'WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.',
        keywords: 'virtual lab software, virtual science lab, online lab simulation, science simulation software, STEM virtual labs for schools, virtual lab for schools, AI science tutor, VR science lab, interactive lab simulation, physics-first virtual lab',
      },
      '/blog': {
        title: t.blog?.title || 'Science Education Blog | WhimsyLabs Virtual Lab Insights',
        description: t.blog?.description || 'Stay updated with WhimsyLabs\' latest developments in virtual laboratory technology, teaching strategies, and STEM education resources for educators.',
        keywords: 'virtual laboratory technology, STEM education resources, AI in science education, VR STEM learning, gamified science learning, science teaching tools, EdTech blog, science education',
      },
      '/services': {
        title: t.services?.title || 'Virtual Lab for Schools | WhimsyLabs Education Services',
        description: t.services?.description || 'Discover WhimsyLabs\' customizable virtual lab solutions for enhancing science education through AI-driven simulations, remote learning, and interactive experiments.',
        keywords: 'virtual lab for schools, classroom lab software, K-12 virtual lab, virtual lab for teachers, school science software, STEM teacher shortage solution, lab equipment cost reduction, custom virtual lab',
      },
      '/features': {
        title: t.features?.title || 'AI Science Tutor & Virtual Lab Features | WhimsyLabs',
        description: t.features?.description || 'Explore WhimsyLabs\' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.',
        keywords: 'physics simulation, AI science tutor, hands-on virtual learning, interactive lab simulation, VR science lab, real-time physics simulation, automated lab assessment, virtual laboratory features',
      },
      '/faq': {
        title: t.faq?.title || 'Virtual Science Lab FAQ | WhimsyLabs Questions & Answers',
        description: t.faq?.description || 'Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators.',
        keywords: 'virtual lab FAQ, virtual science lab questions, online lab simulation help, safe lab experiments, virtual dissection, VR lab for schools',
      },
      '/contact': {
        title: t.contact?.title || 'Contact Us | WhimsyLabs Virtual Lab Software',
        description: t.contact?.description || 'Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education.',
        keywords: 'contact WhimsyLabs, virtual lab trial, virtual lab demo request, school science software inquiry',
      },
      '/bett': {
        title: t.bett?.title || 'WhimsyLabs at BETT 2026 | Award-Winning Virtual Lab Software',
        description: t.bett?.description || 'Visit WhimsyLabs at BETT 2026 to experience our award-winning virtual science lab. Book a demo of our AI-powered lab simulation software.',
        keywords: 'BETT 2026, EdTech exhibition, virtual lab demo, science education technology, WhimsyLabs BETT, education technology show',
      },
      '/demo': {
        title: 'Demo | WhimsyLabs Virtual Lab Software',
        description: 'Try WhimsyLabs virtual laboratory software with our interactive demo. Experience our STEM education platform and see how virtual labs enhance science learning.',
        keywords: 'virtual lab demo, online lab simulation trial, free virtual lab, science lab software demo, try virtual lab',
      },
      '/privacy': {
        title: t.privacy?.title || 'Privacy Policy | WhimsyLabs Virtual Lab Software',
        description: t.privacy?.description || 'Read WhimsyLabs privacy policy to understand how we protect your data and privacy when using our virtual laboratory software for STEM education.',
        keywords: 'WhimsyLabs privacy policy, virtual lab data protection, student data privacy, EdTech privacy',
      },
      '/data-security': {
        title: t.dataSecurity?.title || 'Student Data Security | WhimsyLabs Virtual Lab Software',
        description: t.dataSecurity?.description || 'How WhimsyLabs protects student data with isolated per-school deployments, no AI training, full GDPR/FERPA/COPPA compliance.',
        keywords: 'student data privacy, EdTech security, FERPA compliance, GDPR education, COPPA compliance, school data security, virtual lab data protection',
      },
      '/grants': {
        title: 'STEM Education Grants & Funding Support | WhimsyLabs',
        description: 'Find grants for VR science labs in schools. WhimsyLabs helps you apply for STEM education funding with free demo access.',
        keywords: 'STEM grants, education funding, school grants, VR equipment funding, science lab grants, virtual lab funding',
      },
      '/grants/royal-society': {
        title: 'Royal Society Partnership Grants | WhimsyLabs',
        description: 'UK schools can get up to £3,000 for VR science projects. WhimsyLabs offers free virtual lab software and full application support.',
        keywords: 'Royal Society Partnership Grants, UK school grants, STEM funding UK, VR lab grants, science education grants',
      },
      '/chemistry': {
        title: t.chemistry?.title || 'Virtual Chemistry Lab | Interactive Chemistry Simulations | WhimsyLabs',
        description: t.chemistry?.description || 'Explore interactive virtual chemistry experiments with realistic simulations. Safe, unlimited practice for titrations, reactions, and molecular chemistry.',
        keywords: 'virtual chemistry lab, chemistry simulations, online chemistry experiments, titration simulation, molecular modelling, GCSE chemistry, A-level chemistry, IB chemistry, AP chemistry',
      },
      '/biology': {
        title: t.biology?.title || 'Virtual Biology Lab | Interactive Biology Simulations | WhimsyLabs',
        description: t.biology?.description || 'Explore interactive virtual biology experiments with realistic simulations. Dissections, microscopy, and cellular biology without ethical concerns.',
        keywords: 'virtual biology lab, biology simulations, online biology experiments, virtual dissection, microscopy simulation, GCSE biology, A-level biology, IB biology, AP biology',
      },
      '/physics': {
        title: t.physics?.title || 'Virtual Physics Lab | Interactive Physics Simulations | WhimsyLabs',
        description: t.physics?.description || 'Explore interactive virtual physics experiments with realistic simulations. Mechanics, electricity, waves, and more with real-time data collection.',
        keywords: 'virtual physics lab, physics simulations, online physics experiments, circuit simulation, mechanics simulation, GCSE physics, A-level physics, IB physics, AP physics',
      },
      '/spa': {
        title: t.landingDemo?.title || 'WhimsyLabs - Award-Winning Virtual Lab Software for STEM Education',
        description: t.landingDemo?.description || 'WhimsyLabs provides interactive virtual lab software for Biology, Chemistry, and Physics. Our online lab simulations enhance STEM education in schools across the EU.',
        keywords: 'virtual lab software, virtual science lab, online lab simulation, science simulation software, STEM virtual labs for schools',
      }
    };

    return metaInfo[normalizedRoute] || metaInfo['/'];
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
   * Get the og:locale value for a given language code
   * @param {string} langCode - Language code (en, es, fr, de, jp)
   * @returns {string} - Proper og:locale value (e.g., en_GB, fr_FR)
   */
  getOgLocale(langCode) {
    const localeMap = {
      'en': 'en_GB',
      'es': 'es_ES',
      'fr': 'fr_FR',
      'de': 'de_DE',
      'jp': 'ja_JP'
    };
    return localeMap[langCode] || 'en_GB';
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
    
    // Extract language from route (e.g., /fr/blog/ -> fr)
    const langMatch = route.match(/^\/([a-z]{2})\//);
    const langCode = langMatch ? langMatch[1] : 'en';
    const ogLocale = this.getOgLocale(langCode);
    
    return `
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:url" content="${this.baseUrl}${normalizedRoute}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="WhimsyLabs">
    <meta property="og:locale" content="${ogLocale}">
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
    // Extract language from route
    const langMatch = route.match(/^\/([a-z]{2})\//);
    const language = langMatch ? langMatch[1] : 'en';
    const langCode = language === 'jp' ? 'ja' : language;

    // Schema translations for Course and LearningResource
    const schemaTranslations = {
      en: {
        courseName: "WhimsyLabs Virtual Laboratory - Interactive STEM Education",
        courseDescription: "Learn biology, chemistry, and physics through interactive virtual laboratory simulations. Hands-on experimentation in a safe, engaging virtual environment with AI-powered tutoring and automated assessment.",
        teaches: [
          "Biology laboratory techniques",
          "Chemistry experimental procedures",
          "Physics simulation and experimentation",
          "Scientific method and inquiry",
          "Laboratory safety protocols",
          "Data collection and analysis"
        ],
        educationalUse: [
          "Professional development",
          "Self-study",
          "Research",
          "Teaching resource"
        ]
      },
      es: {
        courseName: "Laboratorio Virtual WhimsyLabs - Educación STEM Interactiva",
        courseDescription: "Aprende biología, química y física a través de simulaciones interactivas de laboratorio virtual. Experimentación práctica en un entorno virtual seguro y atractivo con tutoría impulsada por IA y evaluación automatizada.",
        teaches: [
          "Técnicas de laboratorio de biología",
          "Procedimientos experimentales de química",
          "Simulación y experimentación de física",
          "Método científico e investigación",
          "Protocolos de seguridad en el laboratorio",
          "Recopilación y análisis de datos"
        ],
        educationalUse: [
          "Desarrollo profesional",
          "Autoestudio",
          "Investigación",
          "Recurso didáctico"
        ]
      },
      fr: {
        courseName: "Laboratoire Virtuel WhimsyLabs - Éducation STEM Interactive",
        courseDescription: "Apprenez la biologie, la chimie et la physique grâce à des simulations interactives de laboratoire virtuel. Expérimentation pratique dans un environnement virtuel sûr et engageant avec tutorat alimenté par IA et évaluation automatisée.",
        teaches: [
          "Techniques de laboratoire de biologie",
          "Procédures expérimentales de chimie",
          "Simulation et expérimentation de physique",
          "Méthode scientifique et recherche",
          "Protocoles de sécurité en laboratoire",
          "Collecte et analyse de données"
        ],
        educationalUse: [
          "Développement professionnel",
          "Auto-apprentissage",
          "Recherche",
          "Ressource pédagogique"
        ]
      },
      de: {
        courseName: "WhimsyLabs Virtuelles Labor - Interaktive STEM-Bildung",
        courseDescription: "Lernen Sie Biologie, Chemie und Physik durch interaktive virtuelle Laborsimulationen. Praktisches Experimentieren in einer sicheren, ansprechenden virtuellen Umgebung mit KI-gestütztem Tutoring und automatisierter Bewertung.",
        teaches: [
          "Biologische Labortechniken",
          "Chemische experimentelle Verfahren",
          "Physiksimulation und Experimente",
          "Wissenschaftliche Methode und Forschung",
          "Laborsicherheitsprotokolle",
          "Datenerfassung und -analyse"
        ],
        educationalUse: [
          "Berufliche Entwicklung",
          "Selbststudium",
          "Forschung",
          "Lehrmittel"
        ]
      },
      ja: {
        courseName: "WhimsyLabs バーチャル実験室 - インタラクティブSTEM教育",
        courseDescription: "インタラクティブなバーチャル実験室シミュレーションを通じて、生物学、化学、物理学を学びます。AI搭載の個別指導と自動評価を備えた、安全で魅力的な仮想環境での実践的な実験。",
        teaches: [
          "生物学の実験技術",
          "化学の実験手順",
          "物理学のシミュレーションと実験",
          "科学的方法と探究",
          "実験室の安全プロトコル",
          "データ収集と分析"
        ],
        educationalUse: [
          "専門能力開発",
          "自己学習",
          "研究",
          "教育リソース"
        ]
      }
    };

    const t = schemaTranslations[langCode] || schemaTranslations.en;

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
    if (route === '/' || route.match(/^\/[a-z]{2}\/?$/)) {
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

      // Add Course schema for educational platform
      const courseSchema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": t.courseName,
        "description": t.courseDescription,
        "provider": {
          "@type": "Organization",
          "name": "WhimsyLabs",
          "url": this.baseUrl
        },
        "educationalLevel": "Secondary Education, Higher Education",
        "coursePrerequisites": "None - suitable for students ages 11+",
        "teaches": t.teaches,
        "availableLanguage": ["en", "es", "fr", "de", "ja"],
        "inLanguage": langCode,
        "isAccessibleForFree": false,
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "PT1H"
        },
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student"
        },
        "competencyRequired": "Basic scientific literacy",
        "educationalCredentialAwarded": "Completion certificate available",
        "timeRequired": "PT1H",
        "about": [
          {
            "@type": "Thing",
            "name": "STEM Education"
          },
          {
            "@type": "Thing",
            "name": "Virtual Laboratory"
          },
          {
            "@type": "Thing",
            "name": "Science Education"
          }
        ]
      };
      schemas.push(courseSchema);
    }

    // Generate Event schema for BETT 2026 page
    if (route === '/bett' || route.endsWith('/bett')) {
      const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "WhimsyLabs at BETT 2026",
        "description": "Visit WhimsyLabs at BETT 2026 to experience our award-winning virtual laboratory software. Book a demo at our booth and discover how we're transforming STEM education.",
        "startDate": "2026-01-21T09:00:00+00:00",
        "endDate": "2026-01-23T17:00:00+00:00",
        "eventStatus": "https://schema.org/EventEnded",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "ExCeL London",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "One Western Gateway, Royal Victoria Dock",
            "addressLocality": "London",
            "postalCode": "E16 1XL",
            "addressCountry": "GB"
          }
        },
        "organizer": {
          "@type": "Organization",
          "name": "WhimsyLabs",
          "url": this.baseUrl
        },
        "offers": {
          "@type": "Offer",
          "url": `${this.baseUrl}/bett`,
          "price": "0",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock",
          "validFrom": "2025-01-01T00:00:00+00:00"
        },
        "performer": {
          "@type": "Organization",
          "name": "WhimsyLabs"
        },
        "image": `${this.baseUrl}/logo.png`,
        "url": `${this.baseUrl}/bett`
      };
      schemas.push(eventSchema);
    }

    // Generate Breadcrumb schema for non-home pages (except blog posts which have their own)
    const normalizedRoute = route.replace(/\/$/, ''); // Remove trailing slash
    const isBlogPost = route.includes('/blog/') && route !== '/blog' && !route.endsWith('/blog/') && !route.endsWith('/blog');
    const isHomePage = route === '/' || route.match(/^\/[a-z]{2}\/?$/);
    
    if (!isHomePage && !isBlogPost) {
      // Extract language and base path
      const langMatch = route.match(/^\/([a-z]{2})\//);
      const routeLang = langMatch ? langMatch[1] : 'en';
      const basePath = langMatch ? route.replace(`/${langMatch[1]}`, '') : route;
      const langPrefix = routeLang === 'en' ? '' : `/${routeLang}`;
      
      // Build breadcrumb items
      const breadcrumbItems = [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${this.baseUrl}${langPrefix}/`
      }];
      
      // Parse path parts (excluding language)
      const pathParts = basePath.split('/').filter(p => p && !['de', 'es', 'fr', 'jp'].includes(p));
      let currentUrl = `${this.baseUrl}${langPrefix}`;
      
      pathParts.forEach((part, index) => {
        currentUrl += `/${part}`;
        const name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": breadcrumbItems.length + 1,
          "name": name,
          "item": currentUrl + '/'
        });
      });
      
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      };
      schemas.push(breadcrumbSchema);
    }

    // Generate VideoObject schema for homepage video
    if (isHomePage) {
      const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "WhimsyLabs Virtual Laboratory Demo",
        "description": "Experience the world's most advanced virtual laboratory platform. See how WhimsyLabs transforms STEM education with realistic physics simulations, AI-powered tutoring, and hands-on virtual experiments.",
        "thumbnailUrl": `${this.baseUrl}/logo.png`,
        "uploadDate": "2025-01-01",
        "duration": "PT2M30S",
        "contentUrl": `${this.baseUrl}/videos/placeholder.webm`,
        "embedUrl": `${this.baseUrl}/`,
        "publisher": {
          "@type": "Organization",
          "name": "WhimsyLabs",
          "logo": {
            "@type": "ImageObject",
            "url": `${this.baseUrl}/logo.png`
          }
        },
        "educationalLevel": "Secondary Education, Higher Education",
        "learningResourceType": "Video",
        "teaches": [
          "Virtual laboratory techniques",
          "STEM education technology",
          "Interactive science simulations"
        ]
      };
      schemas.push(videoSchema);
    }

    // Generate Review snippets for homepage
    if (isHomePage) {
      const reviewSchemas = [
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": "WhimsyLabs Virtual Laboratory"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Kids Judge Bett"
          },
          "reviewBody": "Very fun and engaging, and will cater fun for all children!"
        },
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": "WhimsyLabs Virtual Laboratory"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Bett2025 Lab Manager"
          },
          "reviewBody": "The feeling of the lab was amazing. Being able to train students in practicals remotely not only saves our glassware/equipment but gives students an extra space to learn lab skills effectively."
        },
        {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": "WhimsyLabs Virtual Laboratory"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Bett2025 Teacher"
          },
          "reviewBody": "The automated grading on a curve with a wide range of student outcomes is incredible. It saves me so much time and targets our learning objectives perfectly."
        }
      ];
      schemas.push(...reviewSchemas);
    }

    // Generate FAQ schema for all language versions of FAQ page
    if (route === '/faq' || route === '/faq/' || route.includes('/faq/') || route.endsWith('/faq')) {
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
      // Language was already extracted at the top of the function
      const inLanguage = langCode === 'en' ? 'en-GB' : langCode;

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
      if (data.keywords && Array.isArray(data.keywords) && data.keywords.length > 0) {
        blogPostSchema.keywords = data.keywords.join(", ");
      } else if (data.keywords && typeof data.keywords === 'string') {
        blogPostSchema.keywords = data.keywords;
      } else {
        // Fallback keywords
        blogPostSchema.keywords = "virtual laboratory, STEM education, science education technology";
      }

      schemas.push(blogPostSchema);

      // Add LearningResource schema for educational blog content
      const learningResourceSchema = {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": data.title || "WhimsyLabs Educational Article",
        "description": data.description || "",
        "url": `${this.baseUrl}${route}`,
        "author": {
          "@type": "Person",
          "name": "Marisa French",
          "url": "https://www.linkedin.com/in/drmarisafrench/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "WhimsyLabs",
          "url": this.baseUrl
        },
        "datePublished": data.date || data.datePublished || new Date().toISOString().split('T')[0],
        "educationalLevel": "Secondary Education, Higher Education",
        "learningResourceType": "Article",
        "inLanguage": inLanguage,
        "isAccessibleForFree": true,
        "timeRequired": `PT${readingMinutes}M`,
        "educationalUse": t.educationalUse,
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": ["teacher", "student", "administrator"]
        },
        "about": [
          {
            "@type": "Thing",
            "name": "STEM Education"
          },
          {
            "@type": "Thing",
            "name": "Virtual Laboratory"
          },
          {
            "@type": "Thing",
            "name": "Educational Technology"
          }
        ],
        "teaches": "STEM education best practices and virtual laboratory technology",
        "assesses": "Understanding of modern educational technology and virtual learning environments"
      };
      schemas.push(learningResourceSchema);

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
   * @param {Object} dataOrHelmetContext - Either route data object or Helmet context from SSR
   * @param {Object} customMeta - Custom metadata (optional, for backwards compatibility)
   * @returns {Object} - Complete metadata object
   */
  generateCompleteMetadata(route, dataOrHelmetContext = null, customMeta = {}) {
    // Check if second parameter is helmet context (has .helmet property) or route data
    const isHelmetContext = dataOrHelmetContext && dataOrHelmetContext.helmet;
    const data = isHelmetContext ? customMeta : dataOrHelmetContext || {};
    const helmetContext = isHelmetContext ? dataOrHelmetContext : null;

    // If we have helmet context, use it; otherwise generate default metadata
    if (helmetContext && helmetContext.helmet) {
      const helmetMeta = this.extractHelmetMetadata(helmetContext);
      const blueskyScript = '<script type="module" src="https://cdn.jsdelivr.net/npm/bsky-embed/dist/bsky-embed.es.js" async></script>';
      return {
        title: helmetMeta.title,
        meta: helmetMeta.meta,
        link: helmetMeta.link,
        script: blueskyScript + '\n    ' + helmetMeta.script + '\n    ' + this.generateStructuredData(route, data),
        style: helmetMeta.style
      };
    }

    // Generate default metadata
    const basicMeta = this.generateBasicMetaTags(route, data);
    const ogMeta = this.generateOpenGraphTags(route, data);
    const twitterMeta = this.generateTwitterCardTags(route, data);
    const structuredData = this.generateStructuredData(route, data);
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