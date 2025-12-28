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

    // BETT Page
    bett: {
      title: "Meet Us at BETT 2026 | WhimsyLabs Virtual Lab Software",
      description: "Visit WhimsyLabs at BETT 2026 (ExCeL London, Jan 21-23). Book a demo at Booth FS10 and discover our award-winning virtual laboratory software.",
      heroTitle: "Visit Us at BETT 2026",
      heroSubtitle: "Experience the Future of Science Education",
      dates: "Event Dates",
      location: "Location",
      award: "Awards",
      videoTitle: "See WhimsyLabs in Action",
      videoDescription: "Watch our AI-powered virtual laboratory platform transform STEM education through realistic physics simulations and personalized learning.",
      aboutTitle: "Why Visit Our Booth?",
      aboutText1: "WhimsyLabs is an award-winning virtual laboratory that replaces linear simulations with a true sandbox environment. Our platform leverages proprietary real-time physics simulation to enable genuine procedural fluency and muscle memory across both VR and web-based applications.",
      aboutText2: "Join us at BETT 2026 to experience our 'Physicality-First' live demonstration and discover why we're the student-choice winner for next-generation learning.",
      feature1Title: "Sandbox Freedom",
      feature1Desc: "Complete experimental freedom with unlimited procedural pathways and authentic learning from mistakes.",
      feature2Title: "AI-Driven Assessment",
      feature2Desc: "Dynamic assessment generating unique student data, with automated grading saving educators 3.5 hours weekly.",
      feature3Title: "Global Accessibility",
      feature3Desc: "Supports Chromebooks and VR integration with offline functionality and SEND accessibility.",
      feature4Title: "Ethical Gamification",
      feature4Desc: "Authentic physical interaction with customizable experiments and curriculum flexibility.",
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

    // BETT Page
    bett: {
      title: "Encuéntranos en BETT 2026 | Software de Laboratorio Virtual WhimsyLabs",
      description: "Visita WhimsyLabs en BETT 2026 (ExCeL Londres, 21-23 enero). Reserva una demo en el Stand FS10 y descubre nuestro premiado software de laboratorio virtual.",
      heroTitle: "Visítanos en BETT 2026",
      heroSubtitle: "Experimenta el Futuro de la Educación Científica",
      dates: "Fechas del Evento",
      location: "Ubicación",
      award: "Premios",
      videoTitle: "Ve WhimsyLabs en Acción",
      videoDescription: "Observa cómo nuestra plataforma de laboratorio virtual impulsada por IA transforma la educación STEM mediante simulaciones físicas realistas y aprendizaje personalizado.",
      aboutTitle: "¿Por Qué Visitar Nuestro Stand?",
      aboutText1: "WhimsyLabs es un laboratorio virtual galardonado que reemplaza las simulaciones lineales con un verdadero entorno sandbox. Nuestra plataforma aprovecha la simulación física en tiempo real para permitir una fluidez procedimental genuina y memoria muscular en aplicaciones VR y basadas en web.",
      aboutText2: "Únete a nosotros en BETT 2026 para experimentar nuestra demostración en vivo 'Physicality-First' y descubre por qué somos la opción elegida por los estudiantes para el aprendizaje de próxima generación.",
      feature1Title: "Libertad Sandbox",
      feature1Desc: "Libertad experimental completa con vías procedimentales ilimitadas y aprendizaje auténtico de los errores.",
      feature2Title: "Evaluación Impulsada por IA",
      feature2Desc: "Evaluación dinámica que genera datos únicos de estudiantes, con calificación automatizada que ahorra 3.5 horas semanales a los educadores.",
      feature3Title: "Accesibilidad Global",
      feature3Desc: "Compatible con Chromebooks e integración VR con funcionalidad sin conexión y accesibilidad SEND.",
      feature4Title: "Gamificación Ética",
      feature4Desc: "Interacción física auténtica con experimentos personalizables y flexibilidad curricular.",
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

    // BETT Page
    bett: {
      title: "Rencontrez-nous au BETT 2026 | Logiciel de Laboratoire Virtuel WhimsyLabs",
      description: "Visitez WhimsyLabs au BETT 2026 (ExCeL Londres, 21-23 janvier). Réservez une démo au Stand FS10 et découvrez notre logiciel de laboratoire virtuel primé.",
      heroTitle: "Visitez-nous au BETT 2026",
      heroSubtitle: "Découvrez l'Avenir de l'Éducation Scientifique",
      dates: "Dates de l'Événement",
      location: "Emplacement",
      award: "Récompenses",
      videoTitle: "Voyez WhimsyLabs en Action",
      videoDescription: "Regardez notre plateforme de laboratoire virtuel alimentée par l'IA transformer l'éducation STEM grâce à des simulations physiques réalistes et un apprentissage personnalisé.",
      aboutTitle: "Pourquoi Visiter Notre Stand?",
      aboutText1: "WhimsyLabs est un laboratoire virtuel primé qui remplace les simulations linéaires par un véritable environnement sandbox. Notre plateforme exploite la simulation physique en temps réel pour permettre une véritable fluidité procédurale et une mémoire musculaire dans les applications VR et web.",
      aboutText2: "Rejoignez-nous au BETT 2026 pour découvrir notre démonstration en direct 'Physicality-First' et découvrez pourquoi nous sommes le choix des étudiants pour l'apprentissage de nouvelle génération.",
      feature1Title: "Liberté Sandbox",
      feature1Desc: "Liberté expérimentale complète avec des voies procédurales illimitées et un apprentissage authentique des erreurs.",
      feature2Title: "Évaluation Pilotée par IA",
      feature2Desc: "Évaluation dynamique générant des données uniques pour chaque étudiant, avec notation automatisée économisant 3,5 heures par semaine aux éducateurs.",
      feature3Title: "Accessibilité Mondiale",
      feature3Desc: "Prend en charge les Chromebooks et l'intégration VR avec fonctionnalité hors ligne et accessibilité SEND.",
      feature4Title: "Gamification Éthique",
      feature4Desc: "Interaction physique authentique avec des expériences personnalisables et une flexibilité curriculaire.",
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

    // BETT Page
    bett: {
      title: "Treffen Sie uns auf der BETT 2026 | WhimsyLabs Virtuelles Labor Software",
      description: "Besuchen Sie WhimsyLabs auf der BETT 2026 (ExCeL London, 21.-23. Januar). Buchen Sie eine Demo am Stand FS10 und entdecken Sie unsere preisgekrönte virtuelle Labor-Software.",
      heroTitle: "Besuchen Sie uns auf der BETT 2026",
      heroSubtitle: "Erleben Sie die Zukunft der Naturwissenschaftlichen Bildung",
      dates: "Veranstaltungsdaten",
      location: "Standort",
      award: "Auszeichnungen",
      videoTitle: "Sehen Sie WhimsyLabs in Aktion",
      videoDescription: "Sehen Sie, wie unsere KI-gestützte virtuelle Laborplattform die STEM-Bildung durch realistische Physiksimulationen und personalisiertes Lernen transformiert.",
      aboutTitle: "Warum Unseren Stand Besuchen?",
      aboutText1: "WhimsyLabs ist ein preisgekröntes virtuelles Labor, das lineare Simulationen durch eine echte Sandbox-Umgebung ersetzt. Unsere Plattform nutzt proprietäre Echtzeit-Physiksimulation, um echte prozedurale Flüssigkeit und Muskelgedächtnis sowohl in VR- als auch webbasierten Anwendungen zu ermöglichen.",
      aboutText2: "Schließen Sie sich uns auf der BETT 2026 an, um unsere 'Physicality-First' Live-Demonstration zu erleben und zu entdecken, warum wir die Schülerwahl für das Lernen der nächsten Generation sind.",
      feature1Title: "Sandbox-Freiheit",
      feature1Desc: "Vollständige experimentelle Freiheit mit unbegrenzten prozeduralen Pfaden und authentischem Lernen aus Fehlern.",
      feature2Title: "KI-Gesteuerte Bewertung",
      feature2Desc: "Dynamische Bewertung, die einzigartige Schülerdaten generiert, mit automatisierter Benotung, die Pädagogen wöchentlich 3,5 Stunden spart.",
      feature3Title: "Globale Zugänglichkeit",
      feature3Desc: "Unterstützt Chromebooks und VR-Integration mit Offline-Funktionalität und SEND-Zugänglichkeit.",
      feature4Title: "Ethische Gamification",
      feature4Desc: "Authentische physische Interaktion mit anpassbaren Experimenten und curricularer Flexibilität.",
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
      title: "よくあるご質問",
      subtitle:
        "当社のシミュレーション教材と、STEM教育をどのように変革できるかについてのよくある質問への回答をご覧ください",
    },

    // BETT Page
    bett: {
      title: "BETT 2026でお会いしましょう | WhimsyLabs シミュレーション教材",
      description: "BETT 2026（ExCeL ロンドン、1月21-23日）でWhimsyLabsをご訪問ください。ブースFS10でデモを予約し、受賞歴のあるシミュレーション教材をご覧ください。",
      heroTitle: "BETT 2026でお会いしましょう",
      heroSubtitle: "理科教育の未来を体験",
      dates: "イベント日程",
      location: "場所",
      award: "受賞歴",
      videoTitle: "WhimsyLabsの実際の動作をご覧ください",
      videoDescription: "AI搭載のシミュレーション教材プラットフォームが、リアルな物理シミュレーションとパーソナライズされた学習を通じてSTEM教育をどのように変革するかをご覧ください。",
      aboutTitle: "当社のブースを訪問する理由は？",
      aboutText1: "WhimsyLabsは、線形シミュレーションを真のサンドボックス環境に置き換える受賞歴のあるシミュレーション教材です。当社のプラットフォームは、独自のリアルタイム物理シミュレーションを活用して、VRとWebベースのアプリケーションの両方で本物の手続き的流暢性と筋肉記憶を可能にします。",
      aboutText2: "BETT 2026で当社の「フィジカリティ・ファースト」ライブデモンストレーションを体験し、なぜ私たちが次世代学習の学生の選択であるかをご確認ください。",
      feature1Title: "サンドボックスの自由",
      feature1Desc: "無制限の手続き的経路と失敗からの本物の学習による完全な実験の自由。",
      feature2Title: "AI駆動の評価",
      feature2Desc: "一意の学生データを生成する動的評価と、教育者の週3.5時間を節約する自動採点。",
      feature3Title: "グローバルアクセシビリティ",
      feature3Desc: "Chromebookサポート、VR統合、オフライン機能、SENDアクセシビリティ。",
      feature4Title: "倫理的ゲーミフィケーション",
      feature4Desc: "カスタマイズ可能な実験とカリキュラムの柔軟性を備えた本物の物理的相互作用。",
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