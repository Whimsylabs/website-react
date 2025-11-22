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

  ja: {
    // Navigation
    nav: {
      home: "ホーム",
      blog: "ブログ",
      services: "サービス",
      features: "機能",
      faq: "よくある質問",
      contact: "お問い合わせ",
    },

    // Homepage - imported from separate file
    home: homeTranslations.ja,

    // Features
    features: {
      title: "WhimsyLabsの機能 - 最先端のシミュレーション教材技術",
      description:
        "リアルな物理シミュレーション、AI駆動の評価、クロスプラットフォームアクセシビリティ、没入型STEM実験など、WhimsyLabsの強力な機能をご覧ください。",
      uniqueFeatures: "独自の機能",
      realisticSimulations: "リアルな物理シミュレーション",
      realisticSimulationsDesc: "高度な流体力学、リアルな機器操作、本物の実験手順により、実際の筋肉記憶を構築する実物に近い物理シミュレーションを体験してください。",
      aiAssessment: "AI駆動の評価",
      aiAssessmentDesc: "当社のインテリジェント評価システムは、パーソナライズされたフィードバックを提供し、生徒の進捗を追跡し、最適な教育成果のために個々の学習スタイルに適応します。",
      crossPlatform: "クロスプラットフォームアクセシビリティ",
      crossPlatformDesc: "VRヘッドセット、コンピューター、タブレット、スマートフォンなど、あらゆるデバイスでシミュレーション教材にアクセスでき、すべてのプラットフォームで学習の継続性を確保します。",
      immersiveExperiments: "没入型STEM実験",
      seeFullFeatures: "機能紹介PDFを見る",
    },

    // Contact - imported from separate file
    contact: contactTranslations.ja,

    // FAQ
    faq: {
      title: "よくあるご質問",
      subtitle:
        "当社のシミュレーション教材と、STEM教育をどのように変革できるかについてのよくある質問への回答をご覧ください",
    },

    // Common
    common: {
      readMore: "続きを読む",
      backToHome: "ホームに戻る",
      loading: "読み込み中...",
      error: "エラー",
      tryAgain: "再試行",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – シミュレーション教材ソリューション",
      navigation: "フッターナビゲーション",
      home: "ホーム",
      services: "サービス",
      contact: "お問い合わせ",
      blog: "ブログ",
      faq: "よくある質問",
      privacy: "プライバシー",
      homeLabel: "ホームへ移動",
      servicesLabel: "サービスを見る",
      contactLabel: "メールでお問い合わせ",
      blogLabel: "ブログを訪問",
      faqLabel: "よくあるご質問",
      privacyLabel: "プライバシーポリシー",
      blueskyLabel: "Blueskyプロフィールを訪問",
      youtubeLabel: "YouTubeチャンネルを訪問",
      blueskyAlt: "Blueskyロゴ",
      youtubeAlt: "YouTubeロゴ"
    },
  },

  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      blog: "المدونة",
      services: "الخدمات",
      features: "المميزات",
      faq: "الأسئلة الشائعة",
      contact: "اتصل بنا",
    },

    // Homepage - imported from separate file
    home: homeTranslations.ar,

    // Features
    features: {
      title: "مميزات ويمزي لابز - تقنية المختبر الافتراضي المتطورة",
      description:
        "استكشف مميزات ويمزي لابز القوية بما في ذلك محاكاة الفيزياء الواقعية، والتقييم المدفوع بالذكاء الاصطناعي، وإمكانية الوصول عبر المنصات، وتجارب العلوم والتكنولوجيا والهندسة والرياضيات الغامرة.",
      uniqueFeatures: "مميزات فريدة",
      realisticSimulations: "محاكاة فيزياء واقعية",
      realisticSimulationsDesc: "جرّب محاكاة فيزياء واقعية مع ديناميكيات السوائل المتقدمة، والتعامل الواقعي مع المعدات، والإجراءات المختبرية الأصيلة التي تبني ذاكرة عضلية حقيقية.",
      aiAssessment: "تقييم مدفوع بالذكاء الاصطناعي",
      aiAssessmentDesc: "يوفر نظام التقييم الذكي لدينا ملاحظات مخصصة، ويتتبع تقدم الطلاب، ويتكيف مع أنماط التعلم الفردية لنتائج تعليمية مثالية.",
      crossPlatform: "إمكانية الوصول عبر المنصات",
      crossPlatformDesc: "الوصول إلى مختبراتنا الافتراضية على أي جهاز - سماعات الواقع الافتراضي، أجهزة الكمبيوتر، الأجهزة اللوحية، أو الهواتف الذكية - مما يضمن استمرارية التعلم عبر جميع المنصات.",
      immersiveExperiments: "تجارب غامرة في العلوم والتكنولوجيا والهندسة والرياضيات",
      seeFullFeatures: "اطلع على ملف PDF الكامل للمميزات",
    },

    // Contact - imported from separate file
    contact: contactTranslations.ar,

    // FAQ
    faq: {
      title: "الأسئلة الشائعة",
      subtitle:
        "ابحث عن إجابات للأسئلة الشائعة حول برنامج المختبر الافتراضي الخاص بنا وكيف يمكن أن يحوّل تعليم العلوم والتكنولوجيا والهندسة والرياضيات",
    },

    // Privacy
    privacy: {
      title: "سياسة الخصوصية",
      subtitle:
        "تعرّف على كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية عند استخدام برنامج المختبر الافتراضي الخاص بنا",
    },

    // Common
    common: {
      readMore: "اقرأ المزيد",
      backToHome: "العودة إلى الرئيسية",
      loading: "جاري التحميل...",
      error: "خطأ",
      tryAgain: "حاول مرة أخرى",
    },

    // Footer
    footer: {
      copyright: "© 2025 ويمزي لابز – حلول المختبر الافتراضي",
      navigation: "تنقل التذييل",
      home: "الرئيسية",
      services: "الخدمات",
      contact: "اتصل بنا",
      blog: "المدونة",
      faq: "الأسئلة الشائعة",
      privacy: "الخصوصية",
      homeLabel: "الانتقال إلى الرئيسية",
      servicesLabel: "عرض خدماتنا",
      contactLabel: "اتصل بنا عبر البريد الإلكتروني",
      blogLabel: "زيارة مدونتنا",
      faqLabel: "الأسئلة الشائعة",
      privacyLabel: "سياسة الخصوصية",
      blueskyLabel: "زيارة ملفنا الشخصي على Bluesky",
      youtubeLabel: "زيارة قناتنا على YouTube",
      blueskyAlt: "شعار Bluesky",
      youtubeAlt: "شعار YouTube"
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