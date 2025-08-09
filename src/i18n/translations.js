// Import separate translation modules
const { homeTranslations } = require('./homeDataGenerator');
const { contactTranslations } = require('./contactDataGenerator');

// Translation strings for all supported languages
const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      blog: "Blog",
      services: "Services",
      features: "Features",
      faq: "FAQ",
      contact: "Contact",
    },

    // Homepage - imported from separate file
    home: homeTranslations.en,

    // Features
    features: {
      title: "WhimsyLabs Features - Cutting-Edge Virtual Laboratory Technology",
      description:
        "Explore WhimsyLabs' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.",
      uniqueFeatures: "Unique Features",
      realisticSimulations: "Realistic Physics Simulations",
      realisticSimulationsDesc: "Experience true-to-life physics simulations with advanced fluid dynamics, realistic equipment handling, and authentic laboratory procedures that build real muscle memory.",
      aiAssessment: "AI-Driven Assessment",
      aiAssessmentDesc: "Our intelligent assessment system provides personalized feedback, tracks student progress, and adapts to individual learning styles for optimal educational outcomes.",
      crossPlatform: "Cross-Platform Accessibility",
      crossPlatformDesc: "Access our virtual labs on any device - VR headsets, computers, tablets, or smartphones - ensuring learning continuity across all platforms.",
      immersiveExperiments: "Immersive STEM Experiments",
      seeFullFeatures: "See Full Features PDF",
    },

    // Contact - imported from separate file
    contact: contactTranslations.en,

    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "Find answers to common questions about our virtual lab software and how it can transform STEM education",
    },

    // Privacy
    privacy: {
      title: "Privacy Policy",
      subtitle:
        "Learn how we collect, use, and protect your personal information when using our virtual laboratory software",
    },

    // Common
    common: {
      readMore: "Read More",
      backToHome: "Back to Home",
      loading: "Loading...",
      error: "Error",
      tryAgain: "Try Again",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – Virtual Laboratory Solutions",
      navigation: "Footer navigation",
      home: "Home",
      services: "Services", 
      contact: "Contact",
      blog: "Blog",
      faq: "FAQ",
      privacy: "Privacy",
      homeLabel: "Navigate to Home",
      servicesLabel: "View Our Services",
      contactLabel: "Contact Us via Email",
      blogLabel: "Visit Our Blog",
      faqLabel: "Frequently Asked Questions",
      privacyLabel: "Privacy Policy",
      blueskyLabel: "Visit our Bluesky profile",
      youtubeLabel: "Visit our YouTube channel",
      blueskyAlt: "Bluesky logo",
      youtubeAlt: "YouTube logo"
    },
  },

  es: {
    // Navigation
    nav: {
      home: "Inicio",
      blog: "Blog",
      services: "Servicios",
      features: "Características",
      faq: "Preguntas Frecuentes",
      contact: "Contacto",
    },

    // Homepage - imported from separate file
    home: homeTranslations.es,

    // Features
    features: {
      title:
        "Características de WhimsyLabs - Tecnología de Laboratorio Virtual de Vanguardia",
      description:
        "Explora las potentes características de WhimsyLabs incluyendo simulaciones físicas realistas, evaluación impulsada por IA, accesibilidad multiplataforma y experimentos STEM inmersivos.",
      uniqueFeatures: "Características Únicas",
      realisticSimulations: "Simulaciones Físicas Realistas",
      realisticSimulationsDesc: "Experimenta simulaciones físicas realistas con dinámicas de fluidos avanzadas, manejo realista de equipos y procedimientos de laboratorio auténticos que desarrollan memoria muscular real.",
      aiAssessment: "Evaluación Impulsada por IA",
      aiAssessmentDesc: "Nuestro sistema de evaluación inteligente proporciona retroalimentación personalizada, rastrea el progreso del estudiante y se adapta a estilos de aprendizaje individuales para resultados educativos óptimos.",
      crossPlatform: "Accesibilidad Multiplataforma",
      crossPlatformDesc: "Accede a nuestros laboratorios virtuales en cualquier dispositivo - cascos VR, computadoras, tabletas o teléfonos inteligentes - asegurando continuidad de aprendizaje en todas las plataformas.",
      immersiveExperiments: "Experimentos STEM Inmersivos",
      seeFullFeatures: "Ver PDF de Características Completas",
    },

    // Contact - imported from separate file
    contact: contactTranslations.es,

    // FAQ
    faq: {
      title: "Preguntas Frecuentes",
      subtitle:
        "Encuentra respuestas a preguntas comunes sobre nuestro software de laboratorio virtual y cómo puede transformar la educación STEM",
    },

    // Common
    common: {
      readMore: "Leer Más",
      backToHome: "Volver al Inicio",
      loading: "Cargando...",
      error: "Error",
      tryAgain: "Intentar de Nuevo",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – Soluciones de Laboratorio Virtual",
      navigation: "Navegación del pie de página",
      home: "Inicio",
      services: "Servicios",
      contact: "Contacto",
      blog: "Blog",
      faq: "FAQ",
      privacy: "Privacidad",
      homeLabel: "Navegar al Inicio",
      servicesLabel: "Ver Nuestros Servicios",
      contactLabel: "Contáctanos por Email",
      blogLabel: "Visita Nuestro Blog",
      faqLabel: "Preguntas Frecuentes",
      privacyLabel: "Política de Privacidad",
      blueskyLabel: "Visita nuestro perfil de Bluesky",
      youtubeLabel: "Visita nuestro canal de YouTube",
      blueskyAlt: "Logo de Bluesky",
      youtubeAlt: "Logo de YouTube"
    },
  },

  fr: {
    // Navigation
    nav: {
      home: "Accueil",
      blog: "Blog",
      services: "Services",
      features: "Fonctionnalités",
      faq: "FAQ",
      contact: "Contact",
    },

    // Homepage - imported from separate file
    home: homeTranslations.fr,

    // Features
    features: {
      title:
        "Fonctionnalités WhimsyLabs - Technologie de Laboratoire Virtuel de Pointe",
      description:
        "Explorez les fonctionnalités puissantes de WhimsyLabs incluant des simulations physiques réalistes, une évaluation pilotée par IA, une accessibilité multiplateforme et des expériences STEM immersives.",
      uniqueFeatures: "Fonctionnalités Uniques",
      realisticSimulations: "Simulations Physiques Réalistes",
      realisticSimulationsDesc: "Découvrez des simulations physiques réalistes avec une dynamique des fluides avancée, une manipulation d'équipement réaliste et des procédures de laboratoire authentiques qui développent une vraie mémoire musculaire.",
      aiAssessment: "Évaluation Pilotée par IA",
      aiAssessmentDesc: "Notre système d'évaluation intelligent fournit des commentaires personnalisés, suit les progrès des étudiants et s'adapte aux styles d'apprentissage individuels pour des résultats éducatifs optimaux.",
      crossPlatform: "Accessibilité Multiplateforme",
      crossPlatformDesc: "Accédez à nos laboratoires virtuels sur n'importe quel appareil - casques VR, ordinateurs, tablettes ou smartphones - assurant la continuité d'apprentissage sur toutes les plateformes.",
      immersiveExperiments: "Expériences STEM Immersives",
      seeFullFeatures: "Voir le PDF des Fonctionnalités Complètes",
    },

    // Contact - imported from separate file
    contact: contactTranslations.fr,

    // FAQ
    faq: {
      title: "Questions Fréquemment Posées",
      subtitle:
        "Trouvez des réponses aux questions courantes sur notre logiciel de laboratoire virtuel et comment il peut transformer l'éducation STEM",
    },

    // Common
    common: {
      readMore: "Lire Plus",
      backToHome: "Retour à l'Accueil",
      loading: "Chargement...",
      error: "Erreur",
      tryAgain: "Réessayer",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – Solutions de Laboratoire Virtuel",
      navigation: "Navigation du pied de page",
      home: "Accueil",
      services: "Services",
      contact: "Contact",
      blog: "Blog",
      faq: "FAQ",
      privacy: "Confidentialité",
      homeLabel: "Naviguer vers l'Accueil",
      servicesLabel: "Voir Nos Services",
      contactLabel: "Nous Contacter par Email",
      blogLabel: "Visiter Notre Blog",
      faqLabel: "Questions Fréquemment Posées",
      privacyLabel: "Politique de Confidentialité",
      blueskyLabel: "Visitez notre profil Bluesky",
      youtubeLabel: "Visitez notre chaîne YouTube",
      blueskyAlt: "Logo Bluesky",
      youtubeAlt: "Logo YouTube"
    },
  },

  de: {
    // Navigation
    nav: {
      home: "Startseite",
      blog: "Blog",
      services: "Dienstleistungen",
      features: "Funktionen",
      faq: "FAQ",
      contact: "Kontakt",
    },

    // Homepage - imported from separate file
    home: homeTranslations.de,

    // Features
    features: {
      title: "WhimsyLabs Funktionen - Modernste Virtuelle Labor-Technologie",
      description:
        "Entdecken Sie WhimsyLabs' leistungsstarke Funktionen einschließlich realistischer Physiksimulationen, KI-gesteuerte Bewertung, plattformübergreifende Zugänglichkeit und immersive STEM-Experimente.",
      uniqueFeatures: "Einzigartige Funktionen",
      realisticSimulations: "Realistische Physiksimulationen",
      realisticSimulationsDesc: "Erleben Sie lebensechte Physiksimulationen mit fortgeschrittener Fluiddynamik, realistischer Gerätehandhabung und authentischen Laborverfahren, die echtes Muskelgedächtnis aufbauen.",
      aiAssessment: "KI-gesteuerte Bewertung",
      aiAssessmentDesc: "Unser intelligentes Bewertungssystem bietet personalisiertes Feedback, verfolgt den Fortschritt der Studenten und passt sich an individuelle Lernstile für optimale Bildungsergebnisse an.",
      crossPlatform: "Plattformübergreifende Zugänglichkeit",
      crossPlatformDesc: "Greifen Sie auf unsere virtuellen Labore auf jedem Gerät zu - VR-Headsets, Computer, Tablets oder Smartphones - und gewährleisten Sie Lernkontinuität auf allen Plattformen.",
      immersiveExperiments: "Immersive STEM-Experimente",
      seeFullFeatures: "Vollständiges Funktionen-PDF ansehen",
    },

    // Contact - imported from separate file
    contact: contactTranslations.de,

    // FAQ
    faq: {
      title: "Häufig Gestellte Fragen",
      subtitle:
        "Finden Sie Antworten auf häufige Fragen zu unserer virtuellen Labor-Software und wie sie die STEM-Bildung transformieren kann",
    },

    // Common
    common: {
      readMore: "Mehr Lesen",
      backToHome: "Zurück zur Startseite",
      loading: "Laden...",
      error: "Fehler",
      tryAgain: "Erneut Versuchen",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – Virtuelle Laborlösungen",
      navigation: "Footer-Navigation",
      home: "Startseite",
      services: "Dienstleistungen",
      contact: "Kontakt",
      blog: "Blog",
      faq: "FAQ",
      privacy: "Datenschutz",
      homeLabel: "Zur Startseite navigieren",
      servicesLabel: "Unsere Dienstleistungen ansehen",
      contactLabel: "Kontaktieren Sie uns per E-Mail",
      blogLabel: "Besuchen Sie unseren Blog",
      faqLabel: "Häufig gestellte Fragen",
      privacyLabel: "Datenschutzrichtlinie",
      blueskyLabel: "Besuchen Sie unser Bluesky-Profil",
      youtubeLabel: "Besuchen Sie unseren YouTube-Kanal",
      blueskyAlt: "Bluesky-Logo",
      youtubeAlt: "YouTube-Logo"
    },
  },
};

// Translation hook
function useTranslation(lang = "en") {
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };

  return { t };
}

// Export for both CommonJS and ES modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { translations, useTranslation };
} else {
  window.translations = translations;
  window.useTranslation = useTranslation;
}