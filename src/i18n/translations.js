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
      title: "Frequently Asked Questions - WhimsyLabs Virtual Lab Software",
      description: "Get expert answers to common questions about WhimsyLabs virtual laboratory software, implementation, pricing, and how our STEM simulations enhance education.",
      subtitle:
        "Find answers to common questions about our virtual lab software and how it can transform STEM education",
    },

    // Blog
    blog: {
      title: "WhimsyLabs Blog - Virtual Lab Innovation & STEM Education Insights",
      description: "Stay updated with the latest in virtual laboratory technology, STEM education trends, teaching strategies, and WhimsyLabs platform developments.",
    },

    // Services
    services: {
      title: "WhimsyLabs Services - Custom Virtual Lab Solutions for Education",
      description: "Comprehensive virtual laboratory services including custom lab development, curriculum integration, teacher training, and technical support for schools.",
    },

    // Privacy
    privacy: {
      title: "Privacy Policy",
      subtitle:
        "Learn how we collect, use, and protect your personal information when using our virtual laboratory software",
    },

    // BETT Page
    bett: {
      title: "Meet Us at BETT 2026 | WhimsyLabs Virtual Lab Software",
      description: "Visit WhimsyLabs at BETT 2026 (ExCeL London, Jan 21-23). Book a demo at Booth FS10 and discover our award-winning virtual laboratory software.",
      heroTitle: "Visit Us at BETT 2026",
      heroSubtitle: "Experience the Future of Science Education at BETT 2026!",
      dates: "Event Dates",
      location: "Location",
      award: "Awards",
      videoTitle: "See WhimsyLabs in Action",
      videoDescription: "Watch our virtual laboratory platform transform STEM education through realistic physics simulations and personalized learning.",
      whyVisitTitle: "Why Visit Our Booth?",
      whyVisitDescription: "WhimsyLabs is an award-winning virtual laboratory that replaces linear simulations with a true sandbox environment. Join us at BETT 2026 to experience our 'Physicality-First' live demonstration.",
      feature1Title: "Dynamic Assessment",
      feature1Desc: "Students generate unique data, leading to personalized data interpretation and analysis.",
      feature2Title: "Automated Grading",
      feature2Desc: "Real-time evaluation of lab skills, technique, safety, and design. Teachers save 3.5 hours/week on grading.",
      feature3Title: "Custom Experiments",
      feature3Desc: "Bespoke lab scenarios in minutes, supporting any curriculum or niche need.",
      feature4Title: "Sandbox Freedom",
      feature4Desc: "Complete freedom to mix reagents and design protocols, fostering genuine discovery over 'on-rails' experiences.",
      feature5Title: "Authentic Physicality",
      feature5Desc: "Students physically manipulate equipment, building true muscle memory and active recall.",
      feature6Title: "Ethical Gamification",
      feature6Desc: "Students earn points for mastery, spent in a non-monetized shop for small rewards, driving intrinsic motivation.",
      feature7Title: "Inclusive by Design",
      feature7Desc: "Built for SEND accessibility and self-paced exploration.",
      feature8Title: "Offline-Capable",
      feature8Desc: "Offline capable functionality with weak internet with Lab-Preloading.",
      feature9Title: "Global Reach & Flexibility",
      feature9Desc: "Supports curriculum standards worldwide, with seamless Web (Chromebooks) & VR integration.",
      bookingTitle: "Book Your BETT 2026 Appointment",
      bookingDescription: "Schedule a personalized demo at our booth. Select a time that works for you and we'll give you an exclusive walkthrough of our virtual lab platform.",
      calendlyNote: "Can't make it to BETT? Book a virtual meeting with our team instead.",
      contactTitle: "Request a Call or Meeting",
      contactDescription: "Fill out the form below and our team will get back to you to schedule a personalized demonstration.",
      formName: "Your Name",
      formNamePlaceholder: "John Smith",
      formSchool: "School/Organization",
      formSchoolPlaceholder: "Example School or University",
      formEmail: "Email Address",
      formEmailPlaceholder: "your.email@school.edu",
      formMessage: "Additional Information (Optional)",
      formMessagePlaceholder: "Tell us about your needs or any specific questions...",
      formSubmit: "Request Meeting",
      formSending: "Sending...",
      formSuccess: "Thank you! We'll be in touch shortly to schedule your meeting.",
      formError: "Sorry, there was an error submitting the form. Please try again or email us directly at contact@whimsylabs.ai",
      ctaTitle: "Ready to Transform Science Education?",
      ctaText: "Don't miss this opportunity to see WhimsyLabs in person at BETT 2026. Book your appointment or request a call today!",
      ctaBooking: "Book BETT Appointment",
      ctaContact: "Request a Call",
      blogButtonText: "Read Our Full BETT 2026 Blog Post",
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
      title: "Preguntas Frecuentes - Software de Laboratorio Virtual WhimsyLabs",
      description: "Obtén respuestas expertas a preguntas comunes sobre el software de laboratorio virtual WhimsyLabs, implementación, precios y cómo nuestras simulaciones STEM mejoran la educación.",
      subtitle:
        "Encuentra respuestas a preguntas comunes sobre nuestro software de laboratorio virtual y cómo puede transformar la educación STEM",
    },

    // Blog
    blog: {
      title: "Blog WhimsyLabs - Innovación en Laboratorios Virtuales y Educación STEM",
      description: "Mantente actualizado con lo último en tecnología de laboratorio virtual, tendencias de educación STEM, estrategias de enseñanza y desarrollos de la plataforma WhimsyLabs.",
    },

    // Services
    services: {
      title: "Servicios WhimsyLabs - Soluciones de Laboratorio Virtual Personalizadas",
      description: "Servicios integrales de laboratorio virtual incluyendo desarrollo de laboratorios personalizados, integración curricular, capacitación docente y soporte técnico para escuelas.",
    },

    // BETT Page
    bett: {
      title: "Encuéntranos en BETT 2026 | Software de Laboratorio Virtual WhimsyLabs",
      description: "Visita WhimsyLabs en BETT 2026 (ExCeL Londres, 21-23 enero). Reserva una demo en el Stand FS10 y descubre nuestro premiado software de laboratorio virtual.",
      heroTitle: "Visítanos en BETT 2026",
      heroSubtitle: "Experimenta el Futuro de la Educación Científica en el Stand FS10",
      dates: "Fechas del Evento",
      location: "Ubicación",
      award: "Premios",
      videoTitle: "Ve WhimsyLabs en Acción",
      videoDescription: "Observa cómo nuestra plataforma de laboratorio virtual transforma la educación STEM mediante simulaciones físicas realistas y aprendizaje personalizado.",
      whyVisitTitle: "¿Por Qué Visitar Nuestro Stand?",
      whyVisitDescription: "WhimsyLabs es un laboratorio virtual galardonado que reemplaza las simulaciones lineales con un verdadero entorno sandbox. Únete a nosotros en BETT 2026 para experimentar nuestra demostración en vivo 'Physicality-First'.",
      feature1Title: "Evaluación Dinámica",
      feature1Desc: "Los estudiantes generan datos únicos, lo que lleva a una interpretación y análisis de datos personalizada.",
      feature2Title: "Calificación Automatizada",
      feature2Desc: "Evaluación en tiempo real de habilidades de laboratorio, técnica, seguridad y diseño. Los profesores ahorran 3.5 horas/semana en calificación.",
      feature3Title: "Experimentos Personalizados",
      feature3Desc: "Escenarios de laboratorio a medida en minutos, compatibles con cualquier plan de estudios o necesidad específica.",
      feature4Title: "Libertad Sandbox",
      feature4Desc: "Libertad completa para mezclar reactivos y diseñar protocolos, fomentando el descubrimiento genuino sobre experiencias 'sobre rieles'.",
      feature5Title: "Fisicalidad Auténtica",
      feature5Desc: "Los estudiantes manipulan físicamente el equipo, construyendo verdadera memoria muscular y recuerdo activo.",
      feature6Title: "Gamificación Ética",
      feature6Desc: "Los estudiantes ganan puntos por dominio, gastados en una tienda no monetizada para pequeñas recompensas, impulsando la motivación intrínseca.",
      feature7Title: "Inclusivo por Diseño",
      feature7Desc: "Construido para accesibilidad SEND y exploración a ritmo propio.",
      feature8Title: "Capacidad Sin Conexión",
      feature8Desc: "Funcionalidad completa con internet débil mediante precarga de laboratorio.",
      feature9Title: "Alcance Global y Flexibilidad",
      feature9Desc: "Compatible con estándares curriculares mundiales, con integración perfecta Web (Chromebooks) y VR.",
      bookingTitle: "Reserva tu Cita en BETT 2026",
      bookingDescription: "Programa una demostración personalizada en nuestro stand. Selecciona una hora que te funcione y te daremos un recorrido exclusivo de nuestra plataforma de laboratorio virtual.",
      calendlyNote: "¿No puedes asistir a BETT? Reserva una reunión virtual con nuestro equipo.",
      contactTitle: "Solicita una Llamada o Reunión",
      contactDescription: "Completa el formulario a continuación y nuestro equipo se pondrá en contacto contigo para programar una demostración personalizada.",
      formName: "Tu Nombre",
      formNamePlaceholder: "Juan Pérez",
      formSchool: "Escuela/Organización",
      formSchoolPlaceholder: "Escuela o Universidad Ejemplo",
      formEmail: "Correo Electrónico",
      formEmailPlaceholder: "tu.correo@escuela.edu",
      formMessage: "Información Adicional (Opcional)",
      formMessagePlaceholder: "Cuéntanos sobre tus necesidades o preguntas específicas...",
      formSubmit: "Solicitar Reunión",
      formSending: "Enviando...",
      formSuccess: "¡Gracias! Nos pondremos en contacto contigo pronto para programar tu reunión.",
      formError: "Lo sentimos, hubo un error al enviar el formulario. Por favor, intenta nuevamente o envíanos un correo directamente a contact@whimsylabs.ai",
      ctaTitle: "¿Listo para Transformar la Educación Científica?",
      ctaText: "¡No pierdas esta oportunidad de ver WhimsyLabs en persona en BETT 2026! Reserva tu cita o solicita una llamada hoy.",
      ctaBooking: "Reservar Cita en BETT",
      ctaContact: "Solicitar una Llamada",
      blogButtonText: "Lee Nuestro Artículo Completo de BETT 2026",
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

    // Blog
    blog: {
      post10: {
        whimsyrambleAlt: "Tutor de IA WhimsyCat mostrando un mensaje de prueba para demostrar sus capacidades de comunicación"
      }
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
      title: "Questions Fréquemment Posées - Logiciel de Laboratoire Virtuel WhimsyLabs",
      description: "Obtenez des réponses d'experts aux questions courantes sur le logiciel de laboratoire virtuel WhimsyLabs, l'implémentation, les prix et comment nos simulations STEM améliorent l'éducation.",
      subtitle:
        "Trouvez des réponses aux questions courantes sur notre logiciel de laboratoire virtuel et comment il peut transformer l'éducation STEM",
    },

    // Blog
    blog: {
      title: "Blog WhimsyLabs - Innovation en Laboratoires Virtuels et Perspectives Éducation STEM",
      description: "Restez informé des dernières innovations en technologie de laboratoire virtuel, tendances de l'éducation STEM, stratégies pédagogiques et développements de la plateforme WhimsyLabs.",
    },

    // Services
    services: {
      title: "Services WhimsyLabs - Solutions de Laboratoire Virtuel Personnalisées",
      description: "Services complets de laboratoire virtuel incluant développement de laboratoires personnalisés, intégration curriculaire, formation des enseignants et support technique pour les écoles.",
    },

    // BETT Page
    bett: {
      title: "Rencontrez-nous au BETT 2026 | Logiciel de Laboratoire Virtuel WhimsyLabs",
      description: "Visitez WhimsyLabs au BETT 2026 (ExCeL Londres, 21-23 janvier). Réservez une démo au Stand FS10 et découvrez notre logiciel de laboratoire virtuel primé.",
      heroTitle: "Visitez-nous au BETT 2026",
      heroSubtitle: "Découvrez l'Avenir de l'Éducation Scientifique au Stand FS10!",
      dates: "Dates de l'Événement",
      location: "Emplacement",
      award: "Récompenses",
      videoTitle: "Voyez WhimsyLabs en Action",
      videoDescription: "Regardez notre plateforme de laboratoire virtuel transformer l'éducation STEM grâce à des simulations physiques réalistes et un apprentissage personnalisé.",
      whyVisitTitle: "Pourquoi Visiter Notre Stand?",
      whyVisitDescription: "WhimsyLabs est un laboratoire virtuel primé qui remplace les simulations linéaires par un véritable environnement sandbox. Rejoignez-nous au BETT 2026 pour découvrir notre démonstration en direct 'Physicality-First'.",
      feature1Title: "Évaluation Dynamique",
      feature1Desc: "Les étudiants génèrent des données uniques, conduisant à une interprétation et une analyse de données personnalisées.",
      feature2Title: "Notation Automatisée",
      feature2Desc: "Évaluation en temps réel des compétences de laboratoire, technique, sécurité et conception. Les enseignants économisent 3,5 heures/semaine sur la notation.",
      feature3Title: "Expériences Personnalisées",
      feature3Desc: "Scénarios de laboratoire sur mesure en quelques minutes, supportant n'importe quel programme ou besoin de niche.",
      feature4Title: "Liberté Sandbox",
      feature4Desc: "Liberté complète de mélanger les réactifs et de concevoir des protocoles, favorisant une véritable découverte plutôt que des expériences 'sur rails'.",
      feature5Title: "Physicalité Authentique",
      feature5Desc: "Les étudiants manipulent physiquement l'équipement, construisant une véritable mémoire musculaire et un rappel actif.",
      feature6Title: "Gamification Éthique",
      feature6Desc: "Les étudiants gagnent des points pour la maîtrise, dépensés dans une boutique non monétisée pour de petites récompenses, stimulant la motivation intrinsèque.",
      feature7Title: "Inclusif par Conception",
      feature7Desc: "Construit pour l'accessibilité SEND et l'exploration à son propre rythme.",
      feature8Title: "Capable Hors Ligne",
      feature8Desc: "Fonctionnalité complète avec une connexion Internet faible grâce au préchargement de laboratoire.",
      feature9Title: "Portée Mondiale et Flexibilité",
      feature9Desc: "Prend en charge les normes curriculaires mondiales, avec une intégration transparente Web (Chromebooks) et VR.",
      bookingTitle: "Réservez Votre Rendez-vous au BETT 2026",
      bookingDescription: "Planifiez une démonstration personnalisée à notre stand. Choisissez un horaire qui vous convient et nous vous offrirons une visite exclusive de notre plateforme de laboratoire virtuel.",
      calendlyNote: "Vous ne pouvez pas venir au BETT? Réservez une réunion virtuelle avec notre équipe.",
      contactTitle: "Demander un Appel ou une Réunion",
      contactDescription: "Remplissez le formulaire ci-dessous et notre équipe vous contactera pour planifier une démonstration personnalisée.",
      formName: "Votre Nom",
      formNamePlaceholder: "Jean Dupont",
      formSchool: "École/Organisation",
      formSchoolPlaceholder: "École ou Université Exemple",
      formEmail: "Adresse E-mail",
      formEmailPlaceholder: "votre.email@ecole.edu",
      formMessage: "Informations Supplémentaires (Optionnel)",
      formMessagePlaceholder: "Parlez-nous de vos besoins ou questions spécifiques...",
      formSubmit: "Demander une Réunion",
      formSending: "Envoi en cours...",
      formSuccess: "Merci! Nous vous contacterons bientôt pour planifier votre réunion.",
      formError: "Désolé, une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer ou nous envoyer un e-mail directement à contact@whimsylabs.ai",
      ctaTitle: "Prêt à Transformer l'Éducation Scientifique?",
      ctaText: "Ne manquez pas cette opportunité de voir WhimsyLabs en personne au BETT 2026. Réservez votre rendez-vous ou demandez un appel aujourd'hui!",
      ctaBooking: "Réserver Rendez-vous BETT",
      ctaContact: "Demander un Appel",
      blogButtonText: "Lisez Notre Article Complet sur BETT 2026",
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

    // Blog
    blog: {
      post10: {
        whimsyrambleAlt: "Tuteur IA WhimsyCat affichant un message de test pour d\u00e9montrer ses capacit\u00e9s de communication"
      }
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
      title: "Häufig Gestellte Fragen - WhimsyLabs Virtuelles Labor Software",
      description: "Erhalten Sie Expertenantworten auf häufige Fragen über WhimsyLabs virtuelle Labor-Software, Implementierung, Preise und wie unsere STEM-Simulationen die Bildung verbessern.",
      subtitle:
        "Finden Sie Antworten auf häufige Fragen zu unserer virtuellen Labor-Software und wie sie die STEM-Bildung transformieren kann",
    },

    // Blog
    blog: {
      title: "WhimsyLabs Blog - Innovation in Virtuellen Laboren & STEM-Bildung Einblicke",
      description: "Bleiben Sie auf dem Laufenden mit den neuesten Entwicklungen in der virtuellen Labor-Technologie, STEM-Bildungstrends, Unterrichtsstrategien und WhimsyLabs Plattform-Entwicklungen.",
    },

    // Services
    services: {
      title: "WhimsyLabs Dienstleistungen - Maßgeschneiderte Virtuelle Labor-Lösungen",
      description: "Umfassende virtuelle Labor-Dienstleistungen einschließlich benutzerdefinierter Labor-Entwicklung, Lehrplan-Integration, Lehrerfortbildung und technischem Support für Schulen.",
    },

    // BETT Page
    bett: {
      title: "Treffen Sie uns auf der BETT 2026 | WhimsyLabs Virtuelles Labor Software",
      description: "Besuchen Sie WhimsyLabs auf der BETT 2026 (ExCeL London, 21.-23. Januar). Buchen Sie eine Demo am Stand FS10 und entdecken Sie unsere preisgekrönte virtuelle Labor-Software.",
      heroTitle: "Besuchen Sie uns auf der BETT 2026",
      heroSubtitle: "Erleben Sie die Zukunft der Naturwissenschaftlichen Bildung am Stand FS10!",
      dates: "Veranstaltungsdaten",
      location: "Standort",
      award: "Auszeichnungen",
      videoTitle: "Sehen Sie WhimsyLabs in Aktion",
      videoDescription: "Sehen Sie, wie unsere virtuelle Laborplattform die STEM-Bildung durch realistische Physiksimulationen und personalisiertes Lernen transformiert.",
      whyVisitTitle: "Warum Unseren Stand Besuchen?",
      whyVisitDescription: "WhimsyLabs ist ein preisgekröntes virtuelles Labor, das lineare Simulationen durch eine echte Sandbox-Umgebung ersetzt. Schließen Sie sich uns auf der BETT 2026 an, um unsere 'Physicality-First' Live-Demonstration zu erleben.",
      feature1Title: "Dynamische Bewertung",
      feature1Desc: "Schüler generieren einzigartige Daten, die zu personalisierter Dateninterpretation und -analyse führen.",
      feature2Title: "Automatisierte Benotung",
      feature2Desc: "Echtzeitbewertung von Laborfähigkeiten, Technik, Sicherheit und Design. Lehrer sparen 3,5 Stunden/Woche bei der Benotung.",
      feature3Title: "Benutzerdefinierte Experimente",
      feature3Desc: "Maßgeschneiderte Laborszenarien in Minuten, die jeden Lehrplan oder Nischenbedarf unterstützen.",
      feature4Title: "Sandbox-Freiheit",
      feature4Desc: "Vollständige Freiheit, Reagenzien zu mischen und Protokolle zu entwerfen, die echte Entdeckung statt 'auf Schienen' Erfahrungen fördern.",
      feature5Title: "Authentische Physikalität",
      feature5Desc: "Schüler manipulieren Geräte physisch und bauen echtes Muskelgedächtnis und aktiven Rückruf auf.",
      feature6Title: "Ethische Gamification",
      feature6Desc: "Schüler verdienen Punkte für Meisterschaft, die in einem nicht monetarisierten Shop für kleine Belohnungen ausgegeben werden, um intrinsische Motivation zu fördern.",
      feature7Title: "Inklusiv durch Design",
      feature7Desc: "Entwickelt für SEND-Zugänglichkeit und selbstbestimmte Erkundung.",
      feature8Title: "Offline-Fähig",
      feature8Desc: "Volle Funktionalität bei schwachem Internet durch Labor-Vorladung.",
      feature9Title: "Globale Reichweite & Flexibilität",
      feature9Desc: "Unterstützt weltweite Curriculum-Standards mit nahtloser Web (Chromebooks) & VR-Integration.",
      bookingTitle: "Buchen Sie Ihren BETT 2026 Termin",
      bookingDescription: "Planen Sie eine personalisierte Demo an unserem Stand. Wählen Sie eine passende Zeit und wir geben Ihnen eine exklusive Führung durch unsere virtuelle Laborplattform.",
      calendlyNote: "Können Sie nicht zur BETT kommen? Buchen Sie stattdessen ein virtuelles Treffen mit unserem Team.",
      contactTitle: "Anruf oder Meeting Anfordern",
      contactDescription: "Füllen Sie das untenstehende Formular aus und unser Team wird sich mit Ihnen in Verbindung setzen, um eine personalisierte Demonstration zu planen.",
      formName: "Ihr Name",
      formNamePlaceholder: "Max Mustermann",
      formSchool: "Schule/Organisation",
      formSchoolPlaceholder: "Beispielschule oder Universität",
      formEmail: "E-Mail-Adresse",
      formEmailPlaceholder: "ihre.email@schule.edu",
      formMessage: "Zusätzliche Informationen (Optional)",
      formMessagePlaceholder: "Erzählen Sie uns von Ihren Bedürfnissen oder spezifischen Fragen...",
      formSubmit: "Meeting Anfordern",
      formSending: "Wird gesendet...",
      formSuccess: "Vielen Dank! Wir werden uns in Kürze mit Ihnen in Verbindung setzen, um Ihr Meeting zu planen.",
      formError: "Entschuldigung, beim Absenden des Formulars ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder senden Sie uns direkt eine E-Mail an contact@whimsylabs.ai",
      ctaTitle: "Bereit, die Naturwissenschaftliche Bildung zu Transformieren?",
      ctaText: "Verpassen Sie nicht diese Gelegenheit, WhimsyLabs persönlich auf der BETT 2026 zu sehen. Buchen Sie noch heute Ihren Termin oder fordern Sie einen Anruf an!",
      ctaBooking: "BETT-Termin Buchen",
      ctaContact: "Anruf Anfordern",
      blogButtonText: "Lesen Sie Unseren Vollständigen BETT 2026 Blog-Artikel",
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

    // Blog
    blog: {
      post10: {
        whimsyrambleAlt: "WhimsyCat AI-Tutor zeigt eine Testnachricht zur Demonstration seiner Kommunikationsf\u00e4higkeiten"
      }
    },
  },

  jp: {
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
    home: homeTranslations.jp,

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
    contact: contactTranslations.jp,

    // FAQ
    faq: {
      title: "よくあるご質問 - WhimsyLabsバーチャルラボソフトウェア",
      description: "WhimsyLabsバーチャルラボソフトウェア、実装、価格設定、そしてSTEMシミュレーションが教育をどのように向上させるかについてのよくある質問への専門的な回答をご覧ください。",
      subtitle:
        "当社のシミュレーション教材と、STEM教育をどのように変革できるかについてのよくある質問への回答をご覧ください",
    },

    // Blog
    blog: {
      title: "WhimsyLabsブログ - バーチャルラボ革新とSTEM教育の洞察",
      description: "バーチャルラボ技術、STEM教育トレンド、教授戦略、WhimsyLabsプラットフォーム開発の最新情報をお届けします。",
    },

    // Services
    services: {
      title: "WhimsyLabsサービス - カスタムバーチャルラボソリューション",
      description: "カスタムラボ開発、カリキュラム統合、教師研修、学校向け技術サポートを含む包括的なバーチャルラボサービス。",
    },

    // BETT Page
    bett: {
      title: "BETT 2026でお会いしましょう | WhimsyLabs シミュレーション教材",
      description: "BETT 2026（ExCeL ロンドン、1月21-23日）でWhimsyLabsをご訪問ください。ブースFS10でデモを予約し、受賞歴のあるシミュレーション教材をご覧ください。",
      heroTitle: "BETT 2026でお会いしましょう",
      heroSubtitle: "理科教育の未来を体験しましょう！ブースFS10へようこそ",
      dates: "イベント日程",
      location: "場所",
      award: "受賞歴",
      videoTitle: "WhimsyLabsの実際の動作をご覧ください",
      videoDescription: "AI搭載のシミュレーション教材プラットフォームが、リアルな物理シミュレーションとパーソナライズされた学習を通じてSTEM教育をどのように変革するかをご覧ください。",
      whyVisitTitle: "当社のブースを訪問する理由は？",
      whyVisitDescription: "WhimsyLabsは、線形シミュレーションを真のサンドボックス環境に置き換える受賞歴のあるシミュレーション教材です。BETT 2026で当社の「フィジカリティ・ファースト」ライブデモンストレーションを体験してください。",
      feature1Title: "動的評価",
      feature1Desc: "学生が独自のデータを生成し、個別化されたデータ解釈と分析につながります。",
      feature2Title: "自動採点",
      feature2Desc: "実験スキル、技術、安全性、設計のリアルタイム評価。教師は週3.5時間の採点時間を節約できます。",
      feature3Title: "カスタム実験",
      feature3Desc: "数分でオーダーメイドの実験シナリオを作成し、あらゆるカリキュラムやニッチなニーズに対応します。",
      feature4Title: "サンドボックスの自由",
      feature4Desc: "試薬を混合しプロトコルを設計する完全な自由により、「レール上」の体験ではなく真の発見を促進します。",
      feature5Title: "本物の物理性",
      feature5Desc: "学生が機器を物理的に操作し、真の筋肉記憶と能動的想起を構築します。",
      feature6Title: "倫理的なゲーミフィケーション",
      feature6Desc: "学生は習熟度に応じてポイントを獲得し、非収益化されたショップで小さな報酬に使用することで、内発的動機付けを促進します。",
      feature7Title: "包括的な設計",
      feature7Desc: "SENDアクセシビリティと自分のペースでの探索のために構築されています。",
      feature8Title: "オフライン対応",
      feature8Desc: "実験のプリロードにより、弱いインターネット接続でも完全な機能を提供します。",
      feature9Title: "グローバルリーチと柔軟性",
      feature9Desc: "世界中のカリキュラム基準をサポートし、Web（Chromebook）とVRのシームレスな統合を実現します。",
      bookingTitle: "BETT 2026のご予約",
      bookingDescription: "当社のブースでパーソナライズされたデモをスケジュールしてください。ご都合の良い時間を選択していただければ、シミュレーション教材プラットフォームの独占的なウォークスルーを提供いたします。",
      calendlyNote: "BETTにお越しになれませんか？代わりに当社チームとのバーチャルミーティングを予約してください。",
      contactTitle: "電話またはミーティングのリクエスト",
      contactDescription: "以下のフォームにご記入いただければ、パーソナライズされたデモンストレーションをスケジュールするために当社チームがご連絡いたします。",
      formName: "お名前",
      formNamePlaceholder: "山田太郎",
      formSchool: "学校/組織",
      formSchoolPlaceholder: "例：〇〇学校または大学",
      formEmail: "メールアドレス",
      formEmailPlaceholder: "your.email@school.edu",
      formMessage: "追加情報（任意）",
      formMessagePlaceholder: "ご要望や具体的なご質問をお聞かせください...",
      formSubmit: "ミーティングをリクエスト",
      formSending: "送信中...",
      formSuccess: "ありがとうございます！ミーティングのスケジュールについて、まもなくご連絡いたします。",
      formError: "申し訳ございません、フォームの送信中にエラーが発生しました。もう一度お試しいただくか、contact@whimsylabs.aiまで直接メールでお問い合わせください。",
      ctaTitle: "理科教育を変革する準備はできていますか？",
      ctaText: "BETT 2026でWhimsyLabsを直接ご覧になる機会をお見逃しなく。今すぐご予約またはお電話をリクエストしてください！",
      ctaBooking: "BETTの予約",
      ctaContact: "電話をリクエスト",
      blogButtonText: "BETT 2026の完全なブログ記事を読む",
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

    // Blog
    blog: {
      post10: {
        whimsyrambleAlt: "WhimsyCat AIチューターがコミュニケーション能力を示すためのテストメッセージを表示"
      }
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