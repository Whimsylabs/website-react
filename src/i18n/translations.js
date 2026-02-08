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
      grants: "Grants",
    },

    // Homepage - imported from separate file
    home: homeTranslations.en,

    // Features
    features: {
      title: "AI Science Tutor & Virtual Lab Features | WhimsyLabs",
      description:
        "Explore WhimsyLabs' powerful features including realistic physics simulations, AI-driven assessment, cross-platform accessibility, and immersive STEM experiments.",
      uniqueFeatures: "AI Science Tutor & Virtual Lab Features",
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
      title: "Virtual Science Lab FAQ | WhimsyLabs Questions & Answers",
      description: "Get expert answers to common questions about WhimsyLabs virtual laboratory software, implementation, pricing, and how our STEM simulations enhance education.",
      subtitle:
        "Find answers to common questions about our virtual lab software and how it can transform STEM education",
      heading: "Virtual Science Lab: Frequently Asked Questions",
    },

    // Blog
    blog: {
      title: "Science Education Blog | WhimsyLabs Virtual Lab Insights",
      description: "Stay updated with the latest in virtual laboratory technology, STEM education trends, teaching strategies, and WhimsyLabs platform developments.",
    },

    // Services
    services: {
      title: "Virtual Lab for Schools | WhimsyLabs Education Services",
      description: "Comprehensive virtual laboratory services including custom lab development, curriculum integration, teacher training, and technical support for schools.",
    },

    // Privacy
    privacy: {
      title: "Privacy Policy | WhimsyLabs Data Protection",
      subtitle:
        "Learn how we collect, use, and protect your personal information when using our virtual laboratory software",
      description: "Read WhimsyLabs privacy policy to understand how we collect, use, and protect your data when using our virtual laboratory software for STEM education.",
    },

    // Data Security
    dataSecurity: {
      title: "Student Data Security | WhimsyLabs Virtual Lab Software",
      description: "How WhimsyLabs protects student data with encryption, MFA, GDPR/FERPA/COPPA compliance, and a commitment to never sell data.",
      badge: "Privacy-First Architecture",
      heroTitle: "Your Students' Data. Your Control.",
      heroSubtitle: "Built with privacy at the core. Your institution's data stays protected, encrypted, and under your control.",
      commitmentsTitle: "Our Security Commitments",
      mfaTitle: "Multi-Factor Authentication",
      mfaDesc: "Administrative accounts require multi-factor authentication. Teachers, coordinators, and IT staff all use MFA to access student data.",
      encryptionTitle: "Per-School Encryption",
      encryptionDesc: "Each school's data is encrypted with unique keys. Your institution's information remains protected and separate from other schools.",
      sessionTitle: "Session Protection",
      sessionDesc: "Multiple layers of session security prevent unauthorised access. Suspicious activity triggers automatic protection measures.",
      noSalesTitle: "No Data Sales",
      noSalesDesc: "We do not sell, rent, or trade student data. Ever. No advertising partners, no data brokers, no exceptions.",
      aiTitle: "Responsible AI Use",
      aiDesc: "If we use interaction patterns to improve our AI tutor, data is fully anonymised first. You can opt out entirely.",
      auditTitle: "Full Audit Trail",
      auditDesc: "Administrative actions are logged with timestamps. Full accountability, available for your review on request.",
      complianceTitle: "Regulatory Compliance",
      gdprDesc: "Full compliance with UK GDPR and EU General Data Protection Regulation. Your institution is the data controller; we process data only on your behalf.",
      ferpaDesc: "Compliant with the Family Educational Rights and Privacy Act. Educational records are protected and accessible only to authorised parties.",
      coppaDesc: "Children's Online Privacy Protection Act compliance for users under 13. Parental/school consent required; enhanced protections for young learners.",
      pipedaDesc: "Compliant with Canada's Personal Information Protection and Electronic Documents Act for Canadian institutions.",
      collectTitle: "What We Collect",
      collectIntro: "Transparency matters. Here's what data flows through our systems:",
      learningData: "Learning Data",
      accountData: "Account Data",
      notCollected: "What We Don't Collect",
      architectureTitle: "Security Architecture",
      builtTitle: "Built Differently",
      builtIntro: "Recent high-profile EdTech breaches have exposed millions of student records. We designed WhimsyLabs to avoid the common vulnerabilities.",
      rightsTitle: "Your Institution's Rights",
      exportTitle: "Data Export",
      exportDesc: "Request a complete export of all your institution's data at any time, in standard formats.",
      deleteTitle: "Data Deletion",
      deleteDesc: "Request complete deletion of your institution's data when you leave the platform.",
      accessTitle: "Data Access",
      accessDesc: "Review exactly what data we hold about your students. Full transparency.",
      correctTitle: "Data Correction",
      correctDesc: "Correct any inaccurate data. You maintain control over your information.",
      ctaTitle: "Questions About Data Security?",
      ctaDesc: "We're happy to discuss our security practices with your IT team, complete vendor security questionnaires, or arrange a technical review with your data protection officer.",
      contactBtn: "Contact Us",
      privacyBtn: "Privacy Policy",
      // Data collection items
      experimentActions: "Experiment actions",
      experimentActionsDesc: "What students do in the virtual lab",
      progressMarkers: "Progress markers",
      progressMarkersDesc: "Which experiments completed, time spent",
      assessmentResponses: "Assessment responses",
      assessmentResponsesDesc: "Answers to lab questions",
      safetyCompliance: "Safety compliance",
      safetyComplianceDesc: "Whether proper procedures were followed",
      username: "Username",
      usernameDesc: "Can be pseudonymous (student IDs work fine)",
      schoolAssociation: "School/class association",
      schoolAssociationDesc: "Which institution and group",
      role: "Role",
      roleDesc: "Student, teacher, or administrator",
      notCollectedItems: "Home addresses, phone numbers, biometric data, browsing history, social media, financial info, health info, advertising profiles",
      // Architecture items
      archEncryption: "Encryption",
      archEncryptionDesc: "Data encrypted in transit and at rest. Your students' work is protected at every stage.",
      archRoleAccess: "Role-Based Access",
      archRoleAccessDesc: "Students see only their own data. Teachers see only their classes. Administrators see only their institution.",
      archAudit: "Audit Logging",
      archAuditDesc: "Administrative actions are logged and auditable. Every data export, every permission change.",
      archBackups: "Secure Backups",
      archBackupsDesc: "Automated encrypted backups with tested restoration procedures.",
      archOffline: "Offline Capability",
      archOfflineDesc: "The platform works offline. When offline, no data leaves the device until the student reconnects.",
      // Checklist items
      checkMfa: "Multi-factor authentication required for administrative access",
      checkEncryption: "Per-school encryption keys limit exposure if something goes wrong",
      checkNocentral: "No centralised database containing all schools' data",
      checkNosale: "Your data is never sold or shared with third parties",
      checkAudit: "Complete audit trail available on request",
      checkController: "You remain the data controller at all times",
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
      calendlyFallback: "Calendar not loading?",
      calendlyFallbackLink: "Book directly on Calendly",
      calendlyNote: "Can't make it to BETT? Book a virtual meeting with our team instead.",
      contactTitle: "Request a Call or Meeting",
      contactDescription: "Fill out the form below and our team will get back to you to schedule a personalized demonstration.",
      formName: "Your Name",
      formNamePlaceholder: "John Smith",
      formSchool: "School/Organization",
      formSchoolPlaceholder: "Example School or University",
      formEmail: "Email Address",
      formEmailPlaceholder: "your.email@school.edu",
      formPhone: "Phone Number (Optional)",
      formPhonePlaceholder: "+44 20 1234 5678",
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

    // Chemistry Page
    chemistry: {
      title: "Virtual Chemistry Lab | Interactive Chemistry Simulations | WhimsyLabs",
      description: "Explore interactive virtual chemistry experiments with realistic simulations. Safe, unlimited practice for titrations, reactions, and molecular chemistry.",
      hero: {
        title: "Virtual Chemistry Lab for Schools",
        subtitle: "Safe, engaging chemistry experiments with realistic physics simulations. From titrations to combustion reactions — all without the hazards.",
        cta: "Book a Demo",
        ctaSecondary: "See Features",
      },
      intro: {
        title: "Transform Chemistry Education",
        text1: "Chemistry is hands-on by nature. But traditional labs face challenges: limited equipment, safety concerns, time constraints, and the impossibility of repeating expensive experiments.",
        text2: "WhimsyLabs virtual chemistry lab solves these problems with physics-accurate simulations that let students practice titrations, observe reactions, and explore molecular structures — safely and as many times as needed.",
      },
      experiments: {
        title: "Chemistry Experiments Available",
        subtitle: "Our growing library covers key curriculum topics across GCSE, A-Level, IB, and beyond",
        titration: {
          title: "Acid-Base Titrations",
          desc: "Master the precision of titration technique with realistic burette controls and colour-change indicators.",
        },
        reactions: {
          title: "Chemical Reactions",
          desc: "Observe exothermic and endothermic reactions, precipitation, and neutralisation in real-time.",
        },
        molecular: {
          title: "Molecular Modelling",
          desc: "Build and visualise 3D molecular structures, bond angles, and electron configurations.",
        },
        combustion: {
          title: "Combustion Analysis",
          desc: "Safely explore combustion reactions, flame tests, and energy release measurements.",
        },
        electrolysis: {
          title: "Electrolysis",
          desc: "Investigate electrolytic cells, electrode reactions, and Faraday's laws of electrolysis.",
        },
        stoichiometry: {
          title: "Stoichiometry Practice",
          desc: "Apply molar calculations in practical contexts with instant feedback on accuracy.",
        },
      },
      benefits: {
        title: "Why Virtual Chemistry Labs?",
        safety: {
          title: "Complete Safety",
          desc: "No risk from corrosive acids, toxic gases, or open flames. Students can experiment freely without danger.",
        },
        unlimited: {
          title: "Unlimited Repetition",
          desc: "Repeat experiments as many times as needed. No wasted chemicals, no restocking, no cleanup.",
        },
        feedback: {
          title: "Instant AI Feedback",
          desc: "WhimsyCat AI tutor guides students through techniques and catches mistakes before they become habits.",
        },
        data: {
          title: "Real-Time Data",
          desc: "Generate accurate graphs and data tables automatically. Focus on interpretation, not manual recording.",
        },
      },
      curriculum: {
        title: "Aligned to Your Curriculum",
        text: "Our chemistry simulations map directly to examination specifications, ensuring every experiment reinforces required practical skills.",
      },
      cta: {
        title: "Ready to Upgrade Your Chemistry Lab?",
        text: "Join schools across the UK using WhimsyLabs to make chemistry practical, safe, and engaging.",
        button: "Get Started Today",
      },
    },

    // Biology Page
    biology: {
      title: "Virtual Biology Lab | Interactive Biology Simulations | WhimsyLabs",
      description: "Explore interactive virtual biology experiments with realistic simulations. Dissections, microscopy, and cellular biology without ethical concerns.",
      hero: {
        title: "Virtual Biology Lab for Schools",
        subtitle: "Explore life sciences with ethical, engaging experiments. From cell biology to organ dissections — all without harming animals.",
        cta: "Book a Demo",
        ctaSecondary: "See Features",
      },
      intro: {
        title: "Transform Biology Education",
        text1: "Biology is about understanding life. But traditional labs face challenges: ethical concerns about dissections, limited microscope access, and the impossibility of observing processes in real-time.",
        text2: "WhimsyLabs virtual biology lab solves these problems with detailed simulations that let students explore cells, perform virtual dissections, and observe biological processes — ethically and repeatedly.",
      },
      experiments: {
        title: "Biology Experiments Available",
        subtitle: "Our growing library covers key curriculum topics across GCSE, A-Level, IB, and beyond",
        microscopy: {
          title: "Microscopy & Cell Studies",
          desc: "Explore plant and animal cells, prepare slides, and adjust focus just like a real microscope.",
        },
        dissection: {
          title: "Virtual Dissections",
          desc: "Perform detailed organ dissections ethically. Explore kidneys, hearts, lungs, and more.",
        },
        dna: {
          title: "DNA & Genetics",
          desc: "Extract DNA, run gel electrophoresis, and explore inheritance patterns hands-on.",
        },
        cells: {
          title: "Cell Division",
          desc: "Observe mitosis and meiosis in real-time, identifying stages and chromosome behaviour.",
        },
        photosynthesis: {
          title: "Photosynthesis",
          desc: "Investigate factors affecting photosynthesis rate with controlled variable experiments.",
        },
        circulation: {
          title: "Circulatory System",
          desc: "Trace blood flow, examine heart structure, and measure pulse under different conditions.",
        },
      },
      benefits: {
        title: "Why Virtual Biology Labs?",
        ethical: {
          title: "Ethical Learning",
          desc: "No animals harmed. Students can explore anatomy and physiology without ethical compromises.",
        },
        repeat: {
          title: "Repeat & Master",
          desc: "Practice dissection techniques unlimited times. Build confidence before any real-world work.",
        },
        detail: {
          title: "Microscopic Detail",
          desc: "Zoom into cellular structures impossible to see in school microscopes. Label and annotate findings.",
        },
        progress: {
          title: "Track Progress",
          desc: "AI-powered assessment tracks technique development and identifies areas for improvement.",
        },
      },
      curriculum: {
        title: "Aligned to Your Curriculum",
        text: "Our biology simulations map directly to examination specifications, ensuring every experiment reinforces required practical skills.",
      },
      cta: {
        title: "Ready to Upgrade Your Biology Lab?",
        text: "Join schools across the UK using WhimsyLabs to make biology practical, ethical, and engaging.",
        button: "Get Started Today",
      },
    },

    // Physics Page
    physics: {
      title: "Virtual Physics Lab | Interactive Physics Simulations | WhimsyLabs",
      description: "Explore interactive virtual physics experiments with realistic simulations. Mechanics, electricity, waves, and more with real-time data collection.",
      hero: {
        title: "Virtual Physics Lab for Schools",
        subtitle: "Master physics concepts with interactive simulations. From circuits to mechanics — precise measurements without equipment limitations.",
        cta: "Book a Demo",
        ctaSecondary: "See Features",
      },
      intro: {
        title: "Transform Physics Education",
        text1: "Physics is about understanding how the universe works. But traditional labs face challenges: expensive equipment, time-consuming setup, and difficulty repeating experiments with different variables.",
        text2: "WhimsyLabs virtual physics lab solves these problems with accurate simulations that let students build circuits, investigate mechanics, and explore wave phenomena — with instant variable control and real-time data.",
      },
      experiments: {
        title: "Physics Experiments Available",
        subtitle: "Our growing library covers key curriculum topics across GCSE, A-Level, IB, and beyond",
        circuits: {
          title: "Electrical Circuits",
          desc: "Build series and parallel circuits, measure voltage and current, investigate Ohm's law.",
        },
        mechanics: {
          title: "Forces & Motion",
          desc: "Explore Newton's laws, friction, momentum, and energy conservation with adjustable parameters.",
        },
        waves: {
          title: "Waves & Sound",
          desc: "Investigate wave properties, interference, standing waves, and the Doppler effect.",
        },
        optics: {
          title: "Light & Optics",
          desc: "Explore reflection, refraction, lenses, and the electromagnetic spectrum interactively.",
        },
        magnetism: {
          title: "Magnetism & EM",
          desc: "Investigate magnetic fields, electromagnets, motors, and electromagnetic induction.",
        },
        thermodynamics: {
          title: "Thermal Physics",
          desc: "Explore heat transfer, specific heat capacity, and gas laws with precise measurements.",
        },
      },
      benefits: {
        title: "Why Virtual Physics Labs?",
        interactive: {
          title: "Truly Interactive",
          desc: "Manipulate variables in real-time and instantly see the effects. No waiting for equipment setup.",
        },
        precision: {
          title: "Precise Measurements",
          desc: "Digital instruments provide accuracy impossible with school equipment. Focus on understanding, not error.",
        },
        variables: {
          title: "Control Variables",
          desc: "Easily isolate variables and repeat experiments. Test hypotheses systematically.",
        },
        analysis: {
          title: "Instant Analysis",
          desc: "Generate graphs automatically from experimental data. More time for interpretation and learning.",
        },
      },
      curriculum: {
        title: "Aligned to Your Curriculum",
        text: "Our physics simulations map directly to examination specifications, ensuring every experiment reinforces required practical skills.",
      },
      cta: {
        title: "Ready to Upgrade Your Physics Lab?",
        text: "Join schools across the UK using WhimsyLabs to make physics practical, precise, and engaging.",
        button: "Get Started Today",
      },
    },

    // Landing Demo (Homepage)
    landingDemo: {
      title: "WhimsyLabs Virtual Science Lab | Award-Winning STEM Education Software",
      description: "WhimsyLabs virtual laboratory software transforms STEM education with physics-first simulations and AI-driven assessment. Build real lab skills safely.",
    },

    // Common
    common: {
      readMore: "Read More",
      backToHome: "Back to Home",
      loading: "Loading...",
      error: "Error",
      tryAgain: "Try Again",
    },

    // Grants Page
    grants: {
      heroTitle: "Funding Support for Schools",
      heroSubtitle: "Helping schools access grants for laptops, VR headsets, and STEM equipment",
      introTitle: "Navigate the Funding Landscape",
      introText1: "Securing funding for educational technology can be challenging. At WhimsyLabs, we understand the grant application process and want to help schools access the resources they need. Our virtual lab software works on <strong>regular computers and Chromebooks</strong> as well as VR headsets, so grants can fund whatever hardware best fits your school's needs.",
      introText2: "We've compiled information on grants that can fund laptops, Chromebooks, VR headsets, and other STEM equipment. Our team includes <strong>members with PhDs who are experienced in grant writing</strong>, and we're here to support you through the application process with guidance, resources, and letters of support.",
      introText3: "<strong>We're happy to help any school apply for grants</strong> — and as part of your grant application, we'll provide free access to a WhimsyLabs demo so you can showcase the virtual lab platform to your grant reviewers.",
      gridTitle: "Available Funding Opportunities",
      gridSubtitle: "Explore grants that can help fund computers, VR equipment, and more for your school",
      supportTitle: "Need Help With Your Application?",
      supportText: "We're here to support schools throughout the grant application process. Whether you need a letter of support, help articulating the educational benefits of virtual labs, or guidance on completing your application, get in touch.",
      ctaContact: "Contact Us for Support",
      ctaFeatures: "Explore Our Features",
      learnMore: "Learn More",
      comingSoon: "Coming Soon",
      moreGrantsTitle: "More Grants Coming Soon",
      moreGrantsDesc: "We're researching additional funding opportunities for schools across the UK, US, and EU. Check back soon for updates!",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – Virtual Laboratory Solutions",
      navigation: "Footer navigation",
      home: "Home",
      features: "Features",
      services: "Services", 
      bett: "BETT 2026",
      contact: "Contact",
      blog: "Blog",
      faq: "FAQ",
      privacy: "Privacy",
      homeLabel: "Navigate to Home",
      featuresLabel: "View Our Features",
      servicesLabel: "View Our Services",
      bettLabel: "Visit Us at BETT 2026",
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
      grants: "Subvenciones",
    },

    // Homepage - imported from separate file
    home: homeTranslations.es,

    // Features
    features: {
      title:
        "Tutor de Ciencias con IA y Laboratorio Virtual | WhimsyLabs",
      description:
        "Explora las potentes características de WhimsyLabs incluyendo simulaciones físicas realistas, evaluación impulsada por IA, accesibilidad multiplataforma y experimentos STEM inmersivos.",
      uniqueFeatures: "Tutor de Ciencias con IA y Funciones del Laboratorio Virtual",
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
      title: "FAQ del Laboratorio Virtual de Ciencias | WhimsyLabs",
      description: "Obtén respuestas expertas a preguntas comunes sobre el software de laboratorio virtual WhimsyLabs, implementación, precios y cómo nuestras simulaciones STEM mejoran la educación.",
      subtitle:
        "Encuentra respuestas a preguntas comunes sobre nuestro software de laboratorio virtual y cómo puede transformar la educación STEM",
      heading: "Laboratorio Virtual de Ciencias: Preguntas Frecuentes",
    },

    // Blog
    blog: {
      title: "Blog de Educación Científica | WhimsyLabs",
      description: "Mantente actualizado con lo último en tecnología de laboratorio virtual, tendencias de educación STEM, estrategias de enseñanza y desarrollos de la plataforma WhimsyLabs.",
      post10: {
        whimsyrambleAlt: "Tutor de IA WhimsyCat mostrando un mensaje de prueba para demostrar sus capacidades de comunicación"
      }
    },

    // Services
    services: {
      title: "Laboratorio Virtual para Escuelas | Servicios Educativos WhimsyLabs",
      description: "Servicios integrales de laboratorio virtual incluyendo desarrollo de laboratorios personalizados, integración curricular, capacitación docente y soporte técnico para escuelas.",
    },

    // Privacy
    privacy: {
      title: "Política de Privacidad | Protección de Datos WhimsyLabs",
      subtitle:
        "Aprende cómo recopilamos, usamos y protegemos tu información personal al usar nuestro software de laboratorio virtual",
      description: "Lee la política de privacidad de WhimsyLabs para entender cómo recopilamos, usamos y protegemos tus datos personales al usar nuestro software de laboratorio virtual para educación STEM.",
    },

    // Data Security
    dataSecurity: {
      title: "Seguridad de Datos Estudiantiles | WhimsyLabs Laboratorio Virtual",
      description: "Descubre cómo WhimsyLabs protege los datos estudiantiles con cifrado por escuela, autenticación multifactor, cumplimiento total de GDPR/FERPA/COPPA, y nuestro compromiso de nunca vender datos.",
      badge: "Arquitectura de Privacidad Primero",
      heroTitle: "Los Datos de Tus Estudiantes. Tu Control.",
      heroSubtitle: "Nuestro software de virtual lab está construido con la privacidad en el centro. Los datos de tu institución permanecen protegidos, cifrados y bajo tu control.",
      commitmentsTitle: "Nuestros Compromisos de Seguridad",
      mfaTitle: "Autenticación Multifactor",
      mfaDesc: "Las cuentas administrativas requieren autenticación multifactor. Profesores, coordinadores y personal de TI usan MFA para acceder a datos estudiantiles.",
      encryptionTitle: "Cifrado por Escuela",
      encryptionDesc: "Los datos de cada escuela están cifrados con claves únicas. La información de tu institución permanece protegida y separada de otras escuelas.",
      sessionTitle: "Protección de Sesión",
      sessionDesc: "Múltiples capas de seguridad de sesión previenen accesos no autorizados. La actividad sospechosa activa medidas de protección automáticas.",
      noSalesTitle: "Sin Venta de Datos",
      noSalesDesc: "No vendemos, alquilamos ni comerciamos datos estudiantiles. Nunca. Sin socios publicitarios, sin intermediarios de datos, sin excepciones.",
      aiTitle: "Uso Responsable de IA",
      aiDesc: "Si usamos patrones de interacción para mejorar nuestro tutor de IA, los datos se anonimizan completamente primero. Puedes optar por no participar.",
      auditTitle: "Registro de Auditoría Completo",
      auditDesc: "Las acciones administrativas se registran con marcas de tiempo. Responsabilidad total, disponible para tu revisión bajo solicitud.",
      complianceTitle: "Cumplimiento Regulatorio",
      gdprDesc: "Cumplimiento total con GDPR del Reino Unido y Reglamento General de Protección de Datos de la UE. Tu institución es el controlador de datos; procesamos datos solo en tu nombre.",
      ferpaDesc: "Cumplimiento con la Ley de Derechos Educativos y Privacidad de la Familia. Los registros educativos están protegidos y accesibles solo para partes autorizadas.",
      coppaDesc: "Cumplimiento con la Ley de Protección de Privacidad en Línea para Niños para usuarios menores de 13 años. Se requiere consentimiento parental/escolar.",
      pipedaDesc: "Cumplimiento con la Ley de Protección de Información Personal de Canadá para instituciones canadienses.",
      collectTitle: "Qué Recopilamos",
      collectIntro: "La transparencia importa. Esto es lo que fluye por nuestros sistemas:",
      learningData: "Datos de Aprendizaje",
      accountData: "Datos de Cuenta",
      notCollected: "Lo Que No Recopilamos",
      architectureTitle: "Arquitectura de Seguridad",
      builtTitle: "Construido Diferente",
      builtIntro: "Brechas recientes de alto perfil en EdTech han expuesto millones de registros estudiantiles. Diseñamos WhimsyLabs para evitar las vulnerabilidades comunes.",
      rightsTitle: "Derechos de Tu Institución",
      exportTitle: "Exportación de Datos",
      exportDesc: "Solicita una exportación completa de todos los datos de tu institución en cualquier momento, en formatos estándar.",
      deleteTitle: "Eliminación de Datos",
      deleteDesc: "Solicita la eliminación completa de los datos de tu institución cuando dejes la plataforma.",
      accessTitle: "Acceso a Datos",
      accessDesc: "Revisa exactamente qué datos tenemos sobre tus estudiantes. Transparencia total.",
      correctTitle: "Corrección de Datos",
      correctDesc: "Corrige cualquier dato inexacto. Mantienes el control sobre tu información.",
      ctaTitle: "¿Preguntas Sobre Seguridad de Datos?",
      ctaDesc: "Estamos encantados de discutir nuestras prácticas de seguridad con tu equipo de TI o completar cuestionarios de seguridad de proveedores.",
      contactBtn: "Contáctanos",
      privacyBtn: "Política de Privacidad",
      experimentActions: "Acciones de experimento",
      experimentActionsDesc: "Lo que los estudiantes hacen en el laboratorio virtual",
      progressMarkers: "Marcadores de progreso",
      progressMarkersDesc: "Qué experimentos se completaron, tiempo dedicado",
      assessmentResponses: "Respuestas de evaluación",
      assessmentResponsesDesc: "Respuestas a preguntas del laboratorio",
      safetyCompliance: "Cumplimiento de seguridad",
      safetyComplianceDesc: "Si se siguieron los procedimientos adecuados",
      username: "Nombre de usuario",
      usernameDesc: "Puede ser seudónimo (los IDs de estudiante funcionan)",
      schoolAssociation: "Asociación escuela/clase",
      schoolAssociationDesc: "Qué institución y grupo",
      role: "Rol",
      roleDesc: "Estudiante, profesor o administrador",
      notCollectedItems: "Direcciones, teléfonos, datos biométricos, historial de navegación, redes sociales, información financiera, información de salud, perfiles publicitarios",
      archEncryption: "Cifrado",
      archEncryptionDesc: "Datos cifrados en tránsito y en reposo. El trabajo de tus estudiantes está protegido en cada etapa.",
      archRoleAccess: "Acceso Basado en Roles",
      archRoleAccessDesc: "Los estudiantes ven solo sus datos. Los profesores ven solo sus clases. Los administradores ven solo su institución.",
      archAudit: "Registro de Auditoría",
      archAuditDesc: "Las acciones administrativas se registran y son auditables. Cada exportación de datos, cada cambio de permisos.",
      archBackups: "Copias de Seguridad",
      archBackupsDesc: "Copias de seguridad cifradas automatizadas con procedimientos de restauración probados.",
      archOffline: "Capacidad Sin Conexión",
      archOfflineDesc: "La plataforma funciona sin conexión. Sin conexión, ningún dato sale del dispositivo hasta que el estudiante se reconecta.",
      checkMfa: "Autenticación multifactor requerida para acceso administrativo",
      checkEncryption: "Las claves de cifrado por escuela limitan la exposición si algo sale mal",
      checkNocentral: "Sin base de datos centralizada con datos de todas las escuelas",
      checkNosale: "Tus datos nunca se venden ni comparten con terceros",
      checkAudit: "Registro de auditoría completo disponible bajo solicitud",
      checkController: "Permaneces como controlador de datos en todo momento",
    },

    // BETT Page
    bett: {
      title: "Encuéntranos en BETT 2026 | WhimsyLabs Laboratorio Virtual",
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
      calendlyFallback: "¿El calendario no carga?",
      calendlyFallbackLink: "Reserva directamente en Calendly",
      calendlyNote: "¿No puedes asistir a BETT? Reserva una reunión virtual con nuestro equipo.",
      contactTitle: "Solicita una Llamada o Reunión",
      contactDescription: "Completa el formulario a continuación y nuestro equipo se pondrá en contacto contigo para programar una demostración personalizada.",
      formName: "Tu Nombre",
      formNamePlaceholder: "Juan Pérez",
      formSchool: "Escuela/Organización",
      formSchoolPlaceholder: "Escuela o Universidad Ejemplo",
      formEmail: "Correo Electrónico",
      formEmailPlaceholder: "tu.correo@escuela.edu",
      formPhone: "Número de Teléfono (Opcional)",
      formPhonePlaceholder: "+34 91 123 45 67",
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

    // Chemistry Page
    chemistry: {
      title: "Laboratorio Virtual de Química | Simulaciones | WhimsyLabs",
      description: "Explora experimentos virtuales de química interactivos con simulaciones realistas. Práctica segura e ilimitada de titulaciones, reacciones y química molecular.",
      hero: {
        title: "Laboratorio Virtual de Química para Escuelas",
        subtitle: "Experimentos de química seguros y atractivos con simulaciones físicas realistas. Desde titulaciones hasta reacciones de combustión — todo sin riesgos.",
        cta: "Solicitar Demo",
        ctaSecondary: "Ver Características",
      },
      intro: {
        title: "Transforma la Educación en Química",
        text1: "La química es práctica por naturaleza. Pero los laboratorios tradicionales enfrentan desafíos: equipos limitados, preocupaciones de seguridad, restricciones de tiempo e imposibilidad de repetir experimentos costosos.",
        text2: "El laboratorio virtual de química de WhimsyLabs resuelve estos problemas con simulaciones precisas que permiten a los estudiantes practicar titulaciones, observar reacciones y explorar estructuras moleculares — de forma segura y tantas veces como necesiten.",
      },
      experiments: {
        title: "Experimentos de Química Disponibles",
        subtitle: "Nuestra biblioteca cubre temas curriculares clave en todos los niveles educativos",
        titration: {
          title: "Titulaciones Ácido-Base",
          desc: "Domina la precisión de la técnica de titulación con controles de bureta realistas e indicadores de cambio de color.",
        },
        reactions: {
          title: "Reacciones Químicas",
          desc: "Observa reacciones exotérmicas y endotérmicas, precipitación y neutralización en tiempo real.",
        },
        molecular: {
          title: "Modelado Molecular",
          desc: "Construye y visualiza estructuras moleculares 3D, ángulos de enlace y configuraciones electrónicas.",
        },
        combustion: {
          title: "Análisis de Combustión",
          desc: "Explora de forma segura reacciones de combustión, pruebas de llama y mediciones de liberación de energía.",
        },
        electrolysis: {
          title: "Electrólisis",
          desc: "Investiga celdas electrolíticas, reacciones de electrodos y las leyes de Faraday de la electrólisis.",
        },
        stoichiometry: {
          title: "Práctica de Estequiometría",
          desc: "Aplica cálculos molares en contextos prácticos con retroalimentación instantánea sobre precisión.",
        },
      },
      benefits: {
        title: "¿Por Qué Laboratorios Virtuales de Química?",
        safety: {
          title: "Seguridad Completa",
          desc: "Sin riesgo de ácidos corrosivos, gases tóxicos o llamas abiertas. Los estudiantes pueden experimentar libremente sin peligro.",
        },
        unlimited: {
          title: "Repetición Ilimitada",
          desc: "Repite experimentos tantas veces como sea necesario. Sin químicos desperdiciados, sin reposición, sin limpieza.",
        },
        feedback: {
          title: "Retroalimentación IA Instantánea",
          desc: "El tutor IA WhimsyCat guía a los estudiantes a través de las técnicas y detecta errores antes de que se conviertan en hábitos.",
        },
        data: {
          title: "Datos en Tiempo Real",
          desc: "Genera gráficos y tablas de datos precisos automáticamente. Enfócate en la interpretación, no en el registro manual.",
        },
      },
      curriculum: {
        title: "Alineado a Tu Currículo",
        text: "Nuestras simulaciones de química se mapean directamente a las especificaciones de exámenes, asegurando que cada experimento refuerce las habilidades prácticas requeridas.",
      },
      cta: {
        title: "¿Listo para Mejorar Tu Laboratorio de Química?",
        text: "Únete a las escuelas que usan WhimsyLabs para hacer la química práctica, segura y atractiva.",
        button: "Comienza Hoy",
      },
    },

    // Biology Page
    biology: {
      title: "Laboratorio Virtual de Biología | Simulaciones | WhimsyLabs",
      description: "Explora experimentos virtuales de biología con simulaciones realistas. Disecciones, microscopía y biología celular sin preocupaciones éticas.",
      hero: {
        title: "Laboratorio Virtual de Biología para Escuelas",
        subtitle: "Explora las ciencias de la vida con experimentos éticos y atractivos. Desde biología celular hasta disecciones — sin dañar animales.",
        cta: "Reservar Demo",
        ctaSecondary: "Ver Características",
      },
      intro: {
        title: "Transforma la Educación en Biología",
        text1: "La biología trata de entender la vida. Pero los laboratorios tradicionales enfrentan desafíos: preocupaciones éticas sobre disecciones, acceso limitado a microscopios y la imposibilidad de observar procesos en tiempo real.",
        text2: "El laboratorio virtual de biología de WhimsyLabs resuelve estos problemas con simulaciones detalladas que permiten a los estudiantes explorar células, realizar disecciones virtuales y observar procesos biológicos — de manera ética y repetida.",
      },
      experiments: {
        title: "Experimentos de Biología Disponibles",
        subtitle: "Nuestra biblioteca cubre temas clave del currículo",
        microscopy: { title: "Microscopía y Estudios Celulares", desc: "Explora células vegetales y animales, prepara portaobjetos y ajusta el enfoque como un microscopio real." },
        dissection: { title: "Disecciones Virtuales", desc: "Realiza disecciones detalladas de órganos de manera ética. Explora riñones, corazones, pulmones y más." },
        dna: { title: "ADN y Genética", desc: "Extrae ADN, realiza electroforesis en gel y explora patrones de herencia de forma práctica." },
        cells: { title: "División Celular", desc: "Observa mitosis y meiosis en tiempo real, identificando etapas y comportamiento cromosómico." },
        photosynthesis: { title: "Fotosíntesis", desc: "Investiga los factores que afectan la tasa de fotosíntesis con experimentos de variables controladas." },
        circulation: { title: "Sistema Circulatorio", desc: "Rastrea el flujo sanguíneo, examina la estructura del corazón y mide el pulso bajo diferentes condiciones." },
      },
      benefits: {
        title: "¿Por Qué Laboratorios Virtuales de Biología?",
        ethical: { title: "Aprendizaje Ético", desc: "Sin daño a animales. Los estudiantes exploran anatomía y fisiología sin compromisos éticos." },
        repeat: { title: "Repetir y Dominar", desc: "Practica técnicas de disección ilimitadamente. Gana confianza antes de cualquier trabajo real." },
        detail: { title: "Detalle Microscópico", desc: "Amplía estructuras celulares imposibles de ver en microscopios escolares." },
        progress: { title: "Seguimiento de Progreso", desc: "La evaluación con IA rastrea el desarrollo de técnicas e identifica áreas de mejora." },
      },
      curriculum: { title: "Alineado a Tu Currículo", text: "Nuestras simulaciones de biología se mapean directamente a las especificaciones de exámenes." },
      cta: { title: "¿Listo para Mejorar Tu Laboratorio de Biología?", text: "Únete a las escuelas que usan WhimsyLabs para hacer la biología práctica, ética y atractiva.", button: "Comienza Hoy" },
    },

    // Physics Page
    physics: {
      title: "Laboratorio Virtual de Física | Simulaciones Interactivas | WhimsyLabs",
      description: "Explora experimentos virtuales de física con simulaciones realistas. Mecánica, electricidad, ondas y más con recopilación de datos en tiempo real.",
      hero: {
        title: "Laboratorio Virtual de Física para Escuelas",
        subtitle: "Domina conceptos de física con simulaciones interactivas. Desde circuitos hasta mecánica — mediciones precisas sin limitaciones de equipo.",
        cta: "Reservar Demo",
        ctaSecondary: "Ver Características",
      },
      intro: {
        title: "Transforma la Educación en Física",
        text1: "La física trata de entender cómo funciona el universo. Pero los laboratorios tradicionales enfrentan desafíos: equipos costosos, configuración que consume tiempo y dificultad para repetir experimentos con diferentes variables.",
        text2: "El laboratorio virtual de física de WhimsyLabs resuelve estos problemas con simulaciones precisas que permiten a los estudiantes construir circuitos, investigar mecánica y explorar fenómenos ondulatorios.",
      },
      experiments: {
        title: "Experimentos de Física Disponibles",
        subtitle: "Nuestra biblioteca cubre temas clave del currículo",
        circuits: { title: "Circuitos Eléctricos", desc: "Construye circuitos en serie y paralelo, mide voltaje y corriente, investiga la ley de Ohm." },
        mechanics: { title: "Fuerzas y Movimiento", desc: "Explora las leyes de Newton, fricción, momento y conservación de energía con parámetros ajustables." },
        waves: { title: "Ondas y Sonido", desc: "Investiga propiedades de ondas, interferencia, ondas estacionarias y el efecto Doppler." },
        optics: { title: "Luz y Óptica", desc: "Explora reflexión, refracción, lentes y el espectro electromagnético de forma interactiva." },
        magnetism: { title: "Magnetismo y EM", desc: "Investiga campos magnéticos, electroimanes, motores e inducción electromagnética." },
        thermodynamics: { title: "Física Térmica", desc: "Explora transferencia de calor, capacidad calorífica específica y leyes de los gases." },
      },
      benefits: {
        title: "¿Por Qué Laboratorios Virtuales de Física?",
        interactive: { title: "Verdaderamente Interactivo", desc: "Manipula variables en tiempo real y ve los efectos instantáneamente." },
        precision: { title: "Mediciones Precisas", desc: "Instrumentos digitales proporcionan precisión imposible con equipos escolares." },
        variables: { title: "Control de Variables", desc: "Aísla variables fácilmente y repite experimentos. Prueba hipótesis sistemáticamente." },
        analysis: { title: "Análisis Instantáneo", desc: "Genera gráficos automáticamente de datos experimentales. Más tiempo para interpretación." },
      },
      curriculum: { title: "Alineado a Tu Currículo", text: "Nuestras simulaciones de física se mapean directamente a las especificaciones de exámenes." },
      cta: { title: "¿Listo para Mejorar Tu Laboratorio de Física?", text: "Únete a las escuelas que usan WhimsyLabs para hacer la física práctica, precisa y atractiva.", button: "Comienza Hoy" },
    },

    // Landing Demo (Homepage)
    landingDemo: {
      title: "WhimsyLabs Laboratorio Virtual | Software de Educación STEM",
      description: "Experimenta el motor de laboratorio virtual de WhimsyLabs con evaluación impulsada por IA. Desarrolla memoria muscular real mientras ahorras horas de calificación.",
    },

    // Common
    common: {
      readMore: "Leer Más",
      backToHome: "Volver al Inicio",
      loading: "Cargando...",
      error: "Error",
      tryAgain: "Intentar de Nuevo",
    },

    // Grants Page
    grants: {
      heroTitle: "Apoyo de Financiación para Escuelas",
      heroSubtitle: "Ayudando a las escuelas a acceder a subvenciones para portátiles, gafas VR y equipos STEM",
      introTitle: "Navega el Panorama de Financiación",
      introText1: "Conseguir financiación para tecnología educativa puede ser un desafío. En WhimsyLabs, entendemos el proceso de solicitud de subvenciones y queremos ayudar a las escuelas a acceder a los recursos que necesitan. Nuestro software de laboratorio virtual funciona en <strong>ordenadores y Chromebooks normales</strong> además de gafas VR, por lo que las subvenciones pueden financiar el hardware que mejor se adapte a las necesidades de tu escuela.",
      introText2: "Hemos recopilado información sobre subvenciones que pueden financiar portátiles, Chromebooks, gafas VR y otros equipos STEM. Nuestro equipo incluye <strong>miembros con doctorados con experiencia en redacción de subvenciones</strong>, y estamos aquí para apoyarte durante el proceso de solicitud con orientación, recursos y cartas de apoyo.",
      introText3: "<strong>Estamos encantados de ayudar a cualquier escuela a solicitar subvenciones</strong> — y como parte de tu solicitud, proporcionaremos acceso gratuito a una demo de WhimsyLabs para que puedas mostrar la plataforma de laboratorio virtual a los evaluadores.",
      gridTitle: "Oportunidades de Financiación Disponibles",
      gridSubtitle: "Explora subvenciones que pueden ayudar a financiar ordenadores, equipos VR y más para tu escuela",
      supportTitle: "¿Necesitas Ayuda con tu Solicitud?",
      supportText: "Estamos aquí para apoyar a las escuelas durante todo el proceso de solicitud de subvenciones. Ya sea que necesites una carta de apoyo, ayuda para articular los beneficios educativos de los laboratorios virtuales, u orientación para completar tu solicitud, contáctanos.",
      ctaContact: "Contáctanos para Apoyo",
      ctaFeatures: "Explora Nuestras Características",
      learnMore: "Saber Más",
      comingSoon: "Próximamente",
      moreGrantsTitle: "Más Subvenciones Próximamente",
      moreGrantsDesc: "Estamos investigando oportunidades de financiación adicionales para escuelas en Reino Unido, EE.UU. y la UE. ¡Vuelve pronto para actualizaciones!",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – Soluciones de Laboratorio Virtual",
      navigation: "Navegación del pie de página",
      home: "Inicio",
      features: "Características",
      services: "Servicios",
      bett: "BETT 2026",
      contact: "Contacto",
      blog: "Blog",
      faq: "FAQ",
      privacy: "Privacidad",
      homeLabel: "Navegar al Inicio",
      featuresLabel: "Ver Nuestras Características",
      servicesLabel: "Ver Nuestros Servicios",
      bettLabel: "Visítanos en BETT 2026",
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
      grants: "Subventions",
    },

    // Homepage - imported from separate file
    home: homeTranslations.fr,

    // Features
    features: {
      title:
        "Tuteur Scientifique IA et Laboratoire Virtuel | WhimsyLabs",
      description:
        "Explorez les fonctionnalités puissantes de WhimsyLabs incluant des simulations physiques réalistes, une évaluation pilotée par IA, une accessibilité multiplateforme et des expériences STEM immersives.",
      uniqueFeatures: "Tuteur Scientifique IA et Fonctionnalités du Laboratoire Virtuel",
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
      title: "FAQ du Laboratoire Scientifique Virtuel | WhimsyLabs",
      description: "Obtenez des réponses d'experts aux questions courantes sur le logiciel de laboratoire virtuel WhimsyLabs, l'implémentation, les prix et comment nos simulations STEM améliorent l'éducation.",
      subtitle:
        "Trouvez des réponses aux questions courantes sur notre logiciel de laboratoire virtuel et comment il peut transformer l'éducation STEM",
      heading: "Laboratoire Scientifique Virtuel : Questions Fréquentes",
    },

    // Blog
    blog: {
      title: "Blog d'Éducation Scientifique | WhimsyLabs",
      description: "Restez informé des dernières innovations en technologie de laboratoire virtuel, tendances de l'éducation STEM, stratégies pédagogiques et développements de la plateforme WhimsyLabs.",
      post10: {
        whimsyrambleAlt: "Tuteur IA WhimsyCat affichant un message de test pour démontrer ses capacités de communication"
      }
    },

    // Services
    services: {
      title: "Laboratoire Virtuel pour Écoles | Services Éducatifs WhimsyLabs",
      description: "Services complets de laboratoire virtuel incluant développement de laboratoires personnalisés, intégration curriculaire, formation des enseignants et support technique pour les écoles.",
    },

    // Privacy
    privacy: {
      title: "Politique de Confidentialité | WhimsyLabs",
      subtitle:
        "Découvrez comment nous collectons, utilisons et protégeons vos informations personnelles lors de l'utilisation de notre logiciel de laboratoire virtuel",
      description: "Lisez la politique de confidentialité de WhimsyLabs pour comprendre comment nous collectons, utilisons et protégeons vos données lors de l'utilisation de notre logiciel de laboratoire virtuel pour l'éducation STEM.",
    },

    // Data Security
    dataSecurity: {
      title: "Sécurité des Données Étudiantes | WhimsyLabs Laboratoire Virtuel",
      description: "Découvrez comment WhimsyLabs protège les données étudiantes avec chiffrement par école, authentification multifacteur, conformité RGPD/FERPA/COPPA, et notre engagement à ne jamais vendre de données.",
      badge: "Architecture Confidentialité d'Abord",
      heroTitle: "Les Données de Vos Étudiants. Votre Contrôle.",
      heroSubtitle: "Notre logiciel de virtual lab est conçu avec la confidentialité au cœur. Les données de votre établissement restent protégées, chiffrées et sous votre contrôle.",
      commitmentsTitle: "Nos Engagements de Sécurité",
      mfaTitle: "Authentification Multifacteur",
      mfaDesc: "Les comptes administratifs nécessitent une authentification multifacteur. Enseignants, coordinateurs et personnel informatique utilisent tous le MFA.",
      encryptionTitle: "Chiffrement par École",
      encryptionDesc: "Les données de chaque école sont chiffrées avec des clés uniques. Les informations de votre établissement restent protégées et séparées.",
      sessionTitle: "Protection de Session",
      sessionDesc: "Plusieurs couches de sécurité de session empêchent les accès non autorisés. L'activité suspecte déclenche des mesures de protection automatiques.",
      noSalesTitle: "Aucune Vente de Données",
      noSalesDesc: "Nous ne vendons, louons ni échangeons les données étudiantes. Jamais. Aucun partenaire publicitaire, aucun courtier en données, aucune exception.",
      aiTitle: "Utilisation Responsable de l'IA",
      aiDesc: "Si nous utilisons des modèles d'interaction pour améliorer notre tuteur IA, les données sont entièrement anonymisées. Vous pouvez vous désinscrire.",
      auditTitle: "Piste d'Audit Complète",
      auditDesc: "Les actions administratives sont enregistrées avec horodatage. Responsabilité totale, disponible pour révision sur demande.",
      complianceTitle: "Conformité Réglementaire",
      gdprDesc: "Conformité totale avec le RGPD britannique et européen. Votre établissement est le responsable du traitement; nous traitons les données uniquement en votre nom.",
      ferpaDesc: "Conforme à la loi FERPA. Les dossiers éducatifs sont protégés et accessibles uniquement aux parties autorisées.",
      coppaDesc: "Conformité COPPA pour les utilisateurs de moins de 13 ans. Consentement parental/scolaire requis; protections renforcées pour les jeunes apprenants.",
      pipedaDesc: "Conforme à la loi canadienne PIPEDA pour les établissements canadiens.",
      collectTitle: "Ce Que Nous Collectons",
      collectIntro: "La transparence compte. Voici les données qui transitent par nos systèmes:",
      learningData: "Données d'Apprentissage",
      accountData: "Données de Compte",
      notCollected: "Ce Que Nous Ne Collectons Pas",
      architectureTitle: "Architecture de Sécurité",
      builtTitle: "Conçu Différemment",
      builtIntro: "Des violations récentes très médiatisées dans l'EdTech ont exposé des millions de dossiers étudiants. Nous avons conçu WhimsyLabs pour éviter les vulnérabilités courantes.",
      rightsTitle: "Droits de Votre Établissement",
      exportTitle: "Export de Données",
      exportDesc: "Demandez un export complet de toutes les données de votre établissement à tout moment, dans des formats standards.",
      deleteTitle: "Suppression de Données",
      deleteDesc: "Demandez la suppression complète des données de votre établissement lorsque vous quittez la plateforme.",
      accessTitle: "Accès aux Données",
      accessDesc: "Examinez exactement quelles données nous détenons sur vos étudiants. Transparence totale.",
      correctTitle: "Correction de Données",
      correctDesc: "Corrigez toute donnée inexacte. Vous gardez le contrôle sur vos informations.",
      ctaTitle: "Questions sur la Sécurité des Données?",
      ctaDesc: "Nous sommes heureux de discuter de nos pratiques de sécurité avec votre équipe informatique ou de remplir des questionnaires de sécurité.",
      contactBtn: "Contactez-Nous",
      privacyBtn: "Politique de Confidentialité",
      experimentActions: "Actions d'expérience",
      experimentActionsDesc: "Ce que les étudiants font dans le laboratoire virtuel",
      progressMarkers: "Marqueurs de progression",
      progressMarkersDesc: "Quelles expériences terminées, temps passé",
      assessmentResponses: "Réponses d'évaluation",
      assessmentResponsesDesc: "Réponses aux questions de laboratoire",
      safetyCompliance: "Conformité sécurité",
      safetyComplianceDesc: "Si les procédures appropriées ont été suivies",
      username: "Nom d'utilisateur",
      usernameDesc: "Peut être pseudonyme (les IDs étudiants fonctionnent)",
      schoolAssociation: "Association école/classe",
      schoolAssociationDesc: "Quel établissement et groupe",
      role: "Rôle",
      roleDesc: "Étudiant, enseignant ou administrateur",
      notCollectedItems: "Adresses, téléphones, données biométriques, historique de navigation, réseaux sociaux, infos financières, infos de santé, profils publicitaires",
      archEncryption: "Chiffrement",
      archEncryptionDesc: "Données chiffrées en transit et au repos. Le travail de vos étudiants est protégé à chaque étape.",
      archRoleAccess: "Accès Basé sur les Rôles",
      archRoleAccessDesc: "Les étudiants voient uniquement leurs données. Les enseignants voient uniquement leurs classes. Les administrateurs voient uniquement leur établissement.",
      archAudit: "Journalisation d'Audit",
      archAuditDesc: "Les actions administratives sont enregistrées et auditables. Chaque export de données, chaque changement de permission.",
      archBackups: "Sauvegardes Sécurisées",
      archBackupsDesc: "Sauvegardes chiffrées automatisées avec procédures de restauration testées.",
      archOffline: "Capacité Hors Ligne",
      archOfflineDesc: "La plateforme fonctionne hors ligne. Hors ligne, aucune donnée ne quitte l'appareil jusqu'à la reconnexion.",
      checkMfa: "Authentification multifacteur requise pour l'accès administratif",
      checkEncryption: "Les clés de chiffrement par école limitent l'exposition en cas de problème",
      checkNocentral: "Pas de base de données centralisée contenant les données de toutes les écoles",
      checkNosale: "Vos données ne sont jamais vendues ni partagées avec des tiers",
      checkAudit: "Piste d'audit complète disponible sur demande",
      checkController: "Vous restez le responsable du traitement des données en permanence",
    },

    // BETT Page
    bett: {
      title: "Rencontrez-nous au BETT 2026 | WhimsyLabs Laboratoire Virtuel",
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
      calendlyFallback: "Le calendrier ne se charge pas?",
      calendlyFallbackLink: "Réservez directement sur Calendly",
      calendlyNote: "Vous ne pouvez pas venir au BETT? Réservez une réunion virtuelle avec notre équipe.",
      contactTitle: "Demander un Appel ou une Réunion",
      contactDescription: "Remplissez le formulaire ci-dessous et notre équipe vous contactera pour planifier une démonstration personnalisée.",
      formName: "Votre Nom",
      formNamePlaceholder: "Jean Dupont",
      formSchool: "École/Organisation",
      formSchoolPlaceholder: "École ou Université Exemple",
      formEmail: "Adresse E-mail",
      formEmailPlaceholder: "votre.email@ecole.edu",
      formPhone: "Numéro de Téléphone (Optionnel)",
      formPhonePlaceholder: "+33 1 23 45 67 89",
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

    // Chemistry Page
    chemistry: {
      title: "Laboratoire Virtuel de Chimie | Simulations | WhimsyLabs",
      description: "Explorez des expériences de chimie virtuelles interactives avec des simulations réalistes. Pratique sûre et illimitée des titrages, réactions et chimie moléculaire.",
      hero: {
        title: "Laboratoire Virtuel de Chimie pour Écoles",
        subtitle: "Des expériences de chimie sûres et engageantes avec des simulations physiques réalistes. Des titrages aux réactions de combustion — le tout sans danger.",
        cta: "Réserver une Démo",
        ctaSecondary: "Voir les Fonctionnalités",
      },
      intro: {
        title: "Transformez l'Enseignement de la Chimie",
        text1: "La chimie est pratique par nature. Mais les laboratoires traditionnels font face à des défis: équipement limité, préoccupations de sécurité, contraintes de temps et impossibilité de répéter des expériences coûteuses.",
        text2: "Le laboratoire virtuel de chimie WhimsyLabs résout ces problèmes avec des simulations précises permettant aux étudiants de pratiquer les titrages, observer les réactions et explorer les structures moléculaires — en toute sécurité et autant de fois que nécessaire.",
      },
      experiments: {
        title: "Expériences de Chimie Disponibles",
        subtitle: "Notre bibliothèque couvre les sujets clés du programme à tous les niveaux",
        titration: {
          title: "Titrages Acide-Base",
          desc: "Maîtrisez la précision de la technique de titrage avec des contrôles de burette réalistes et des indicateurs de changement de couleur.",
        },
        reactions: {
          title: "Réactions Chimiques",
          desc: "Observez les réactions exothermiques et endothermiques, la précipitation et la neutralisation en temps réel.",
        },
        molecular: {
          title: "Modélisation Moléculaire",
          desc: "Construisez et visualisez des structures moléculaires 3D, angles de liaison et configurations électroniques.",
        },
        combustion: {
          title: "Analyse de Combustion",
          desc: "Explorez en toute sécurité les réactions de combustion, tests de flamme et mesures de libération d'énergie.",
        },
        electrolysis: {
          title: "Électrolyse",
          desc: "Étudiez les cellules électrolytiques, réactions d'électrodes et les lois de Faraday sur l'électrolyse.",
        },
        stoichiometry: {
          title: "Pratique de Stœchiométrie",
          desc: "Appliquez les calculs molaires dans des contextes pratiques avec un retour instantané sur la précision.",
        },
      },
      benefits: {
        title: "Pourquoi des Laboratoires Virtuels de Chimie?",
        safety: {
          title: "Sécurité Totale",
          desc: "Aucun risque d'acides corrosifs, gaz toxiques ou flammes nues. Les étudiants peuvent expérimenter librement sans danger.",
        },
        unlimited: {
          title: "Répétition Illimitée",
          desc: "Répétez les expériences autant de fois que nécessaire. Pas de produits chimiques gaspillés, pas de réapprovisionnement, pas de nettoyage.",
        },
        feedback: {
          title: "Retour IA Instantané",
          desc: "Le tuteur IA WhimsyCat guide les étudiants à travers les techniques et détecte les erreurs avant qu'elles ne deviennent des habitudes.",
        },
        data: {
          title: "Données en Temps Réel",
          desc: "Générez automatiquement des graphiques et tableaux de données précis. Concentrez-vous sur l'interprétation, pas sur l'enregistrement manuel.",
        },
      },
      curriculum: {
        title: "Aligné sur Votre Programme",
        text: "Nos simulations de chimie correspondent directement aux spécifications d'examen, garantissant que chaque expérience renforce les compétences pratiques requises.",
      },
      cta: {
        title: "Prêt à Améliorer Votre Laboratoire de Chimie?",
        text: "Rejoignez les écoles qui utilisent WhimsyLabs pour rendre la chimie pratique, sûre et engageante.",
        button: "Commencez Aujourd'hui",
      },
    },

    // Biology Page
    biology: {
      title: "Laboratoire Virtuel de Biologie | Simulations Bio | WhimsyLabs",
      description: "Explorez des expériences virtuelles de biologie avec des simulations réalistes. Dissections, microscopie et biologie cellulaire sans préoccupations éthiques.",
      hero: {
        title: "Laboratoire Virtuel de Biologie pour Écoles",
        subtitle: "Explorez les sciences de la vie avec des expériences éthiques et engageantes. De la biologie cellulaire aux dissections — sans nuire aux animaux.",
        cta: "Réserver une Démo",
        ctaSecondary: "Voir les Fonctionnalités",
      },
      intro: {
        title: "Transformez l'Éducation en Biologie",
        text1: "La biologie consiste à comprendre la vie. Mais les laboratoires traditionnels font face à des défis: préoccupations éthiques sur les dissections, accès limité aux microscopes et impossibilité d'observer les processus en temps réel.",
        text2: "Le laboratoire virtuel de biologie WhimsyLabs résout ces problèmes avec des simulations détaillées permettant aux étudiants d'explorer les cellules, d'effectuer des dissections virtuelles et d'observer les processus biologiques — de manière éthique et répétée.",
      },
      experiments: {
        title: "Expériences de Biologie Disponibles",
        subtitle: "Notre bibliothèque couvre les sujets clés du programme",
        microscopy: { title: "Microscopie et Études Cellulaires", desc: "Explorez les cellules végétales et animales, préparez des lames et ajustez la mise au point comme un vrai microscope." },
        dissection: { title: "Dissections Virtuelles", desc: "Effectuez des dissections d'organes détaillées de manière éthique. Explorez reins, cœurs, poumons et plus." },
        dna: { title: "ADN et Génétique", desc: "Extrayez l'ADN, effectuez une électrophorèse sur gel et explorez les modèles d'hérédité de manière pratique." },
        cells: { title: "Division Cellulaire", desc: "Observez la mitose et la méiose en temps réel, identifiant les étapes et le comportement chromosomique." },
        photosynthesis: { title: "Photosynthèse", desc: "Étudiez les facteurs affectant le taux de photosynthèse avec des expériences à variables contrôlées." },
        circulation: { title: "Système Circulatoire", desc: "Tracez le flux sanguin, examinez la structure du cœur et mesurez le pouls dans différentes conditions." },
      },
      benefits: {
        title: "Pourquoi des Laboratoires Virtuels de Biologie?",
        ethical: { title: "Apprentissage Éthique", desc: "Aucun animal blessé. Les étudiants explorent l'anatomie et la physiologie sans compromis éthiques." },
        repeat: { title: "Répéter et Maîtriser", desc: "Pratiquez les techniques de dissection de manière illimitée. Gagnez en confiance avant tout travail réel." },
        detail: { title: "Détail Microscopique", desc: "Zoomez sur des structures cellulaires impossibles à voir dans les microscopes scolaires." },
        progress: { title: "Suivi des Progrès", desc: "L'évaluation par IA suit le développement des techniques et identifie les domaines à améliorer." },
      },
      curriculum: { title: "Aligné sur Votre Programme", text: "Nos simulations de biologie correspondent directement aux spécifications d'examen." },
      cta: { title: "Prêt à Améliorer Votre Laboratoire de Biologie?", text: "Rejoignez les écoles qui utilisent WhimsyLabs pour rendre la biologie pratique, éthique et engageante.", button: "Commencez Aujourd'hui" },
    },

    // Physics Page
    physics: {
      title: "Laboratoire Virtuel de Physique | Simulations Physique | WhimsyLabs",
      description: "Explorez des expériences virtuelles de physique avec des simulations réalistes. Mécanique, électricité, ondes et plus avec collecte de données en temps réel.",
      hero: {
        title: "Laboratoire Virtuel de Physique pour Écoles",
        subtitle: "Maîtrisez les concepts de physique avec des simulations interactives. Des circuits à la mécanique — mesures précises sans limitations d'équipement.",
        cta: "Réserver une Démo",
        ctaSecondary: "Voir les Fonctionnalités",
      },
      intro: {
        title: "Transformez l'Éducation en Physique",
        text1: "La physique consiste à comprendre comment fonctionne l'univers. Mais les laboratoires traditionnels font face à des défis: équipements coûteux, installation chronophage et difficulté à répéter les expériences avec différentes variables.",
        text2: "Le laboratoire virtuel de physique WhimsyLabs résout ces problèmes avec des simulations précises permettant aux étudiants de construire des circuits, d'étudier la mécanique et d'explorer les phénomènes ondulatoires.",
      },
      experiments: {
        title: "Expériences de Physique Disponibles",
        subtitle: "Notre bibliothèque couvre les sujets clés du programme",
        circuits: { title: "Circuits Électriques", desc: "Construisez des circuits série et parallèle, mesurez tension et courant, étudiez la loi d'Ohm." },
        mechanics: { title: "Forces et Mouvement", desc: "Explorez les lois de Newton, la friction, la quantité de mouvement et la conservation de l'énergie." },
        waves: { title: "Ondes et Son", desc: "Étudiez les propriétés des ondes, l'interférence, les ondes stationnaires et l'effet Doppler." },
        optics: { title: "Lumière et Optique", desc: "Explorez la réflexion, la réfraction, les lentilles et le spectre électromagnétique de manière interactive." },
        magnetism: { title: "Magnétisme et EM", desc: "Étudiez les champs magnétiques, les électroaimants, les moteurs et l'induction électromagnétique." },
        thermodynamics: { title: "Physique Thermique", desc: "Explorez le transfert de chaleur, la capacité thermique spécifique et les lois des gaz." },
      },
      benefits: {
        title: "Pourquoi des Laboratoires Virtuels de Physique?",
        interactive: { title: "Vraiment Interactif", desc: "Manipulez les variables en temps réel et voyez les effets instantanément." },
        precision: { title: "Mesures Précises", desc: "Les instruments numériques fournissent une précision impossible avec l'équipement scolaire." },
        variables: { title: "Contrôle des Variables", desc: "Isolez facilement les variables et répétez les expériences. Testez les hypothèses systématiquement." },
        analysis: { title: "Analyse Instantanée", desc: "Générez des graphiques automatiquement à partir des données expérimentales." },
      },
      curriculum: { title: "Aligné sur Votre Programme", text: "Nos simulations de physique correspondent directement aux spécifications d'examen." },
      cta: { title: "Prêt à Améliorer Votre Laboratoire de Physique?", text: "Rejoignez les écoles qui utilisent WhimsyLabs pour rendre la physique pratique, précise et engageante.", button: "Commencez Aujourd'hui" },
    },

    // Landing Demo (Homepage)
    landingDemo: {
      title: "WhimsyLabs Laboratoire Virtuel | Logiciel d'Éducation STEM",
      description: "Découvrez le moteur de laboratoire virtuel de WhimsyLabs avec évaluation pilotée par IA. Développez une vraie mémoire musculaire tout en économisant des heures de correction.",
    },

    // Common
    common: {
      readMore: "Lire Plus",
      backToHome: "Retour à l'Accueil",
      loading: "Chargement...",
      error: "Erreur",
      tryAgain: "Réessayer",
    },

    // Grants Page
    grants: {
      heroTitle: "Soutien au Financement pour les Écoles",
      heroSubtitle: "Aider les écoles à accéder aux subventions pour ordinateurs portables, casques VR et équipements STEM",
      introTitle: "Naviguer dans le Paysage du Financement",
      introText1: "Obtenir un financement pour la technologie éducative peut être difficile. Chez WhimsyLabs, nous comprenons le processus de demande de subvention et voulons aider les écoles à accéder aux ressources dont elles ont besoin. Notre logiciel de laboratoire virtuel fonctionne sur <strong>des ordinateurs et Chromebooks ordinaires</strong> ainsi que sur des casques VR, donc les subventions peuvent financer le matériel qui convient le mieux aux besoins de votre école.",
      introText2: "Nous avons compilé des informations sur les subventions pouvant financer ordinateurs portables, Chromebooks, casques VR et autres équipements STEM. Notre équipe comprend <strong>des membres titulaires de doctorats expérimentés dans la rédaction de demandes de subventions</strong>, et nous sommes là pour vous accompagner tout au long du processus avec des conseils, des ressources et des lettres de soutien.",
      introText3: "<strong>Nous sommes heureux d'aider toute école à demander des subventions</strong> — et dans le cadre de votre demande, nous fournirons un accès gratuit à une démo WhimsyLabs afin que vous puissiez présenter la plateforme de laboratoire virtuel à vos évaluateurs.",
      gridTitle: "Opportunités de Financement Disponibles",
      gridSubtitle: "Explorez les subventions qui peuvent aider à financer ordinateurs, équipements VR et plus pour votre école",
      supportTitle: "Besoin d'Aide pour Votre Demande?",
      supportText: "Nous sommes là pour accompagner les écoles tout au long du processus de demande de subvention. Que vous ayez besoin d'une lettre de soutien, d'aide pour articuler les avantages éducatifs des laboratoires virtuels, ou de conseils pour compléter votre demande, contactez-nous.",
      ctaContact: "Contactez-nous pour du Soutien",
      ctaFeatures: "Explorez Nos Fonctionnalités",
      learnMore: "En Savoir Plus",
      comingSoon: "Bientôt Disponible",
      moreGrantsTitle: "Plus de Subventions Bientôt",
      moreGrantsDesc: "Nous recherchons des opportunités de financement supplémentaires pour les écoles au Royaume-Uni, aux États-Unis et dans l'UE. Revenez bientôt pour les mises à jour!",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – Solutions de Laboratoire Virtuel",
      navigation: "Navigation du pied de page",
      home: "Accueil",
      features: "Fonctionnalités",
      services: "Services",
      bett: "BETT 2026",
      contact: "Contact",
      blog: "Blog",
      faq: "FAQ",
      privacy: "Confidentialité",
      homeLabel: "Naviguer vers l'Accueil",
      featuresLabel: "Voir Nos Fonctionnalités",
      servicesLabel: "Voir Nos Services",
      bettLabel: "Visitez-nous au BETT 2026",
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
      grants: "Fördermittel",
    },

    // Homepage - imported from separate file
    home: homeTranslations.de,

    // Features
    features: {
      title: "KI-Wissenschaftstutor & Virtuelles Labor | WhimsyLabs",
      description:
        "Entdecken Sie WhimsyLabs' leistungsstarke Funktionen einschließlich realistischer Physiksimulationen, KI-gesteuerte Bewertung, plattformübergreifende Zugänglichkeit und immersive STEM-Experimente.",
      uniqueFeatures: "KI-Wissenschaftstutor & Virtuelles Labor Funktionen",
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
      title: "Virtuelles Wissenschaftslabor FAQ | WhimsyLabs",
      description: "Erhalten Sie Expertenantworten auf häufige Fragen über WhimsyLabs virtuelle Labor-Software, Implementierung, Preise und wie unsere STEM-Simulationen die Bildung verbessern.",
      subtitle:
        "Finden Sie Antworten auf häufige Fragen zu unserer virtuellen Labor-Software und wie sie die STEM-Bildung transformieren kann",
      heading: "Virtuelles Wissenschaftslabor: Häufig Gestellte Fragen",
    },

    // Blog
    blog: {
      title: "Wissenschaftsbildung Blog | WhimsyLabs",
      description: "Bleiben Sie auf dem Laufenden mit den neuesten Entwicklungen in der virtuellen Labor-Technologie, STEM-Bildungstrends, Unterrichtsstrategien und WhimsyLabs Plattform-Entwicklungen.",
      post10: {
        whimsyrambleAlt: "WhimsyCat AI-Tutor zeigt eine Testnachricht zur Demonstration seiner Kommunikationsfähigkeiten"
      }
    },

    // Services
    services: {
      title: "Virtuelles Labor für Schulen | WhimsyLabs Bildungsdienste",
      description: "Umfassende virtuelle Labor-Dienstleistungen einschließlich benutzerdefinierter Labor-Entwicklung, Lehrplan-Integration, Lehrerfortbildung und technischem Support für Schulen.",
    },

    // Privacy
    privacy: {
      title: "Datenschutzrichtlinie | WhimsyLabs Datenschutz",
      subtitle:
        "Erfahren Sie, wie wir Ihre persönlichen Informationen sammeln, verwenden und schützen, wenn Sie unsere virtuelle Labor-Software verwenden",
      description: "Lesen Sie die Datenschutzrichtlinie von WhimsyLabs, um zu verstehen, wie wir Ihre Daten sammeln, verwenden und schützen, wenn Sie unsere virtuelle Labor-Software für die STEM-Bildung verwenden.",
    },

    // Data Security
    dataSecurity: {
      title: "Schülerdatensicherheit | WhimsyLabs Virtuelles Labor",
      description: "Erfahren Sie, wie WhimsyLabs Schülerdaten mit schulspezifischer Verschlüsselung, Multi-Faktor-Authentifizierung, DSGVO/FERPA/COPPA-Konformität schützt und niemals Daten verkauft.",
      badge: "Datenschutz-Erste Architektur",
      heroTitle: "Die Daten Ihrer Schüler. Ihre Kontrolle.",
      heroSubtitle: "Unsere virtual lab Software wurde mit Datenschutz im Kern entwickelt. Die Daten Ihrer Institution bleiben geschützt, verschlüsselt und unter Ihrer Kontrolle.",
      commitmentsTitle: "Unsere Sicherheitsverpflichtungen",
      mfaTitle: "Multi-Faktor-Authentifizierung",
      mfaDesc: "Administrative Konten erfordern Multi-Faktor-Authentifizierung. Lehrer, Koordinatoren und IT-Personal nutzen alle MFA für den Zugriff auf Schülerdaten.",
      encryptionTitle: "Verschlüsselung pro Schule",
      encryptionDesc: "Die Daten jeder Schule werden mit einzigartigen Schlüsseln verschlüsselt. Die Informationen Ihrer Institution bleiben geschützt und von anderen Schulen getrennt.",
      sessionTitle: "Sitzungsschutz",
      sessionDesc: "Mehrere Sicherheitsebenen verhindern unbefugten Zugriff. Verdächtige Aktivitäten lösen automatische Schutzmaßnahmen aus.",
      noSalesTitle: "Kein Datenverkauf",
      noSalesDesc: "Wir verkaufen, vermieten oder handeln keine Schülerdaten. Niemals. Keine Werbepartner, keine Datenhändler, keine Ausnahmen.",
      aiTitle: "Verantwortungsvoller KI-Einsatz",
      aiDesc: "Wenn wir Interaktionsmuster zur Verbesserung unseres KI-Tutors verwenden, werden die Daten vollständig anonymisiert. Sie können sich abmelden.",
      auditTitle: "Vollständiger Audit-Trail",
      auditDesc: "Administrative Aktionen werden mit Zeitstempeln protokolliert. Volle Rechenschaftspflicht, auf Anfrage zur Überprüfung verfügbar.",
      complianceTitle: "Regulatorische Konformität",
      gdprDesc: "Volle Konformität mit der UK-DSGVO und der EU-Datenschutz-Grundverordnung. Ihre Institution ist der Datenverantwortliche; wir verarbeiten Daten nur in Ihrem Namen.",
      ferpaDesc: "FERPA-konform. Bildungsunterlagen sind geschützt und nur für autorisierte Parteien zugänglich.",
      coppaDesc: "COPPA-Konformität für Nutzer unter 13 Jahren. Eltern-/Schuleinwilligung erforderlich; verstärkter Schutz für junge Lernende.",
      pipedaDesc: "Konform mit dem kanadischen PIPEDA für kanadische Institutionen.",
      collectTitle: "Was Wir Erfassen",
      collectIntro: "Transparenz zählt. Hier sind die Daten, die durch unsere Systeme fließen:",
      learningData: "Lerndaten",
      accountData: "Kontodaten",
      notCollected: "Was Wir Nicht Erfassen",
      architectureTitle: "Sicherheitsarchitektur",
      builtTitle: "Anders Gebaut",
      builtIntro: "Jüngste hochkarätige EdTech-Verstöße haben Millionen von Schülerdaten offengelegt. Wir haben WhimsyLabs entwickelt, um häufige Schwachstellen zu vermeiden.",
      rightsTitle: "Rechte Ihrer Institution",
      exportTitle: "Datenexport",
      exportDesc: "Fordern Sie jederzeit einen vollständigen Export aller Daten Ihrer Institution in Standardformaten an.",
      deleteTitle: "Datenlöschung",
      deleteDesc: "Fordern Sie die vollständige Löschung der Daten Ihrer Institution an, wenn Sie die Plattform verlassen.",
      accessTitle: "Datenzugang",
      accessDesc: "Überprüfen Sie genau, welche Daten wir über Ihre Schüler haben. Volle Transparenz.",
      correctTitle: "Datenkorrektur",
      correctDesc: "Korrigieren Sie ungenaue Daten. Sie behalten die Kontrolle über Ihre Informationen.",
      ctaTitle: "Fragen zur Datensicherheit?",
      ctaDesc: "Wir besprechen gerne unsere Sicherheitspraktiken mit Ihrem IT-Team oder füllen Sicherheitsfragebögen aus.",
      contactBtn: "Kontaktieren Sie Uns",
      privacyBtn: "Datenschutzrichtlinie",
      experimentActions: "Experimentaktionen",
      experimentActionsDesc: "Was Schüler im virtuellen Labor tun",
      progressMarkers: "Fortschrittsmarker",
      progressMarkersDesc: "Welche Experimente abgeschlossen, aufgewendete Zeit",
      assessmentResponses: "Bewertungsantworten",
      assessmentResponsesDesc: "Antworten auf Laborfragen",
      safetyCompliance: "Sicherheitskonformität",
      safetyComplianceDesc: "Ob die richtigen Verfahren befolgt wurden",
      username: "Benutzername",
      usernameDesc: "Kann pseudonym sein (Schüler-IDs funktionieren)",
      schoolAssociation: "Schul-/Klassenverbindung",
      schoolAssociationDesc: "Welche Institution und Gruppe",
      role: "Rolle",
      roleDesc: "Schüler, Lehrer oder Administrator",
      notCollectedItems: "Adressen, Telefonnummern, biometrische Daten, Browserverlauf, soziale Medien, Finanzinfos, Gesundheitsinfos, Werbeprofile",
      archEncryption: "Verschlüsselung",
      archEncryptionDesc: "Daten werden während der Übertragung und im Ruhezustand verschlüsselt. Die Arbeit Ihrer Schüler ist in jeder Phase geschützt.",
      archRoleAccess: "Rollenbasierter Zugriff",
      archRoleAccessDesc: "Schüler sehen nur ihre eigenen Daten. Lehrer sehen nur ihre Klassen. Administratoren sehen nur ihre Institution.",
      archAudit: "Audit-Protokollierung",
      archAuditDesc: "Administrative Aktionen werden protokolliert und sind überprüfbar. Jeder Datenexport, jede Berechtigungsänderung.",
      archBackups: "Sichere Backups",
      archBackupsDesc: "Automatisierte verschlüsselte Backups mit getesteten Wiederherstellungsverfahren.",
      archOffline: "Offline-Fähigkeit",
      archOfflineDesc: "Die Plattform funktioniert offline. Offline verlassen keine Daten das Gerät bis zur Wiederverbindung.",
      checkMfa: "Multi-Faktor-Authentifizierung für administrativen Zugriff erforderlich",
      checkEncryption: "Schulspezifische Verschlüsselungsschlüssel begrenzen die Exposition bei Problemen",
      checkNocentral: "Keine zentrale Datenbank mit Daten aller Schulen",
      checkNosale: "Ihre Daten werden niemals verkauft oder mit Dritten geteilt",
      checkAudit: "Vollständiger Audit-Trail auf Anfrage verfügbar",
      checkController: "Sie bleiben jederzeit der Datenverantwortliche",
    },

    // BETT Page
    bett: {
      title: "Treffen Sie uns auf der BETT 2026 | WhimsyLabs Labor",
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
      calendlyFallback: "Kalender lädt nicht?",
      calendlyFallbackLink: "Direkt auf Calendly buchen",
      calendlyNote: "Können Sie nicht zur BETT kommen? Buchen Sie stattdessen ein virtuelles Treffen mit unserem Team.",
      contactTitle: "Anruf oder Meeting Anfordern",
      contactDescription: "Füllen Sie das untenstehende Formular aus und unser Team wird sich mit Ihnen in Verbindung setzen, um eine personalisierte Demonstration zu planen.",
      formName: "Ihr Name",
      formNamePlaceholder: "Max Mustermann",
      formSchool: "Schule/Organisation",
      formSchoolPlaceholder: "Beispielschule oder Universität",
      formEmail: "E-Mail-Adresse",
      formEmailPlaceholder: "ihre.email@schule.edu",
      formPhone: "Telefonnummer (Optional)",
      formPhonePlaceholder: "+49 30 12345678",
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

    // Chemistry Page
    chemistry: {
      title: "Virtuelles Chemielabor | Chemie-Simulationen | WhimsyLabs",
      description: "Entdecken Sie interaktive virtuelle Chemieexperimente mit realistischen Simulationen. Sichere, unbegrenzte Übung für Titrationen, Reaktionen und Molekülchemie.",
      hero: {
        title: "Virtuelles Chemielabor für Schulen",
        subtitle: "Sichere, ansprechende Chemieexperimente mit realistischen Physiksimulationen. Von Titrationen bis Verbrennungsreaktionen — alles ohne Gefahren.",
        cta: "Demo Buchen",
        ctaSecondary: "Funktionen Ansehen",
      },
      intro: {
        title: "Chemieunterricht Transformieren",
        text1: "Chemie ist von Natur aus praktisch. Aber traditionelle Labore stehen vor Herausforderungen: begrenzte Ausrüstung, Sicherheitsbedenken, Zeitbeschränkungen und die Unmöglichkeit, teure Experimente zu wiederholen.",
        text2: "Das virtuelle Chemielabor von WhimsyLabs löst diese Probleme mit physikalisch genauen Simulationen, die Schülern ermöglichen, Titrationen zu üben, Reaktionen zu beobachten und Molekülstrukturen zu erkunden — sicher und so oft wie nötig.",
      },
      experiments: {
        title: "Verfügbare Chemieexperimente",
        subtitle: "Unsere wachsende Bibliothek deckt wichtige Lehrplanthemen auf allen Bildungsstufen ab",
        titration: {
          title: "Säure-Base-Titrationen",
          desc: "Beherrschen Sie die Präzision der Titrationstechnik mit realistischen Bürettenkontrollen und Farbwechselindikatoren.",
        },
        reactions: {
          title: "Chemische Reaktionen",
          desc: "Beobachten Sie exotherme und endotherme Reaktionen, Fällung und Neutralisation in Echtzeit.",
        },
        molecular: {
          title: "Molekülmodellierung",
          desc: "Bauen und visualisieren Sie 3D-Molekülstrukturen, Bindungswinkel und Elektronenkonfigurationen.",
        },
        combustion: {
          title: "Verbrennungsanalyse",
          desc: "Erkunden Sie sicher Verbrennungsreaktionen, Flammentests und Energiefreisetzungsmessungen.",
        },
        electrolysis: {
          title: "Elektrolyse",
          desc: "Untersuchen Sie elektrolytische Zellen, Elektrodenreaktionen und die Faradayschen Gesetze der Elektrolyse.",
        },
        stoichiometry: {
          title: "Stöchiometrie-Übung",
          desc: "Wenden Sie Molberechnungen in praktischen Kontexten mit sofortigem Feedback zur Genauigkeit an.",
        },
      },
      benefits: {
        title: "Warum Virtuelle Chemielabore?",
        safety: {
          title: "Vollständige Sicherheit",
          desc: "Kein Risiko durch ätzende Säuren, giftige Gase oder offene Flammen. Schüler können gefahrlos frei experimentieren.",
        },
        unlimited: {
          title: "Unbegrenzte Wiederholung",
          desc: "Wiederholen Sie Experimente so oft wie nötig. Keine verschwendeten Chemikalien, kein Nachfüllen, kein Aufräumen.",
        },
        feedback: {
          title: "Sofortiges KI-Feedback",
          desc: "Der KI-Tutor WhimsyCat führt Schüler durch Techniken und erkennt Fehler, bevor sie zu Gewohnheiten werden.",
        },
        data: {
          title: "Echtzeitdaten",
          desc: "Generieren Sie automatisch genaue Diagramme und Datentabellen. Konzentrieren Sie sich auf die Interpretation, nicht auf manuelle Aufzeichnung.",
        },
      },
      curriculum: {
        title: "An Ihren Lehrplan Angepasst",
        text: "Unsere Chemiesimulationen sind direkt auf Prüfungsspezifikationen abgestimmt und stellen sicher, dass jedes Experiment die erforderlichen praktischen Fähigkeiten verstärkt.",
      },
      cta: {
        title: "Bereit, Ihr Chemielabor zu Verbessern?",
        text: "Schließen Sie sich Schulen an, die WhimsyLabs nutzen, um Chemie praktisch, sicher und ansprechend zu gestalten.",
        button: "Heute Starten",
      },
    },

    // Biology Page
    biology: {
      title: "Virtuelles Biologielabor | Interaktive Simulationen | WhimsyLabs",
      description: "Erkunden Sie virtuelle Biologieexperimente mit realistischen Simulationen. Sezierungen, Mikroskopie und Zellbiologie ohne ethische Bedenken.",
      hero: {
        title: "Virtuelles Biologielabor für Schulen",
        subtitle: "Erkunden Sie Lebenswissenschaften mit ethischen, ansprechenden Experimenten. Von Zellbiologie bis zu Sezierungen — alles ohne Tiere zu schädigen.",
        cta: "Demo Buchen",
        ctaSecondary: "Funktionen Ansehen",
      },
      intro: {
        title: "Biologieunterricht Transformieren",
        text1: "Biologie handelt vom Verständnis des Lebens. Aber traditionelle Labore stehen vor Herausforderungen: ethische Bedenken bei Sezierungen, begrenzter Mikroskopzugang und die Unmöglichkeit, Prozesse in Echtzeit zu beobachten.",
        text2: "Das virtuelle Biologielabor von WhimsyLabs löst diese Probleme mit detaillierten Simulationen, die Schülern ermöglichen, Zellen zu erkunden, virtuelle Sezierungen durchzuführen und biologische Prozesse zu beobachten.",
      },
      experiments: {
        title: "Verfügbare Biologieexperimente",
        subtitle: "Unsere Bibliothek deckt wichtige Lehrplanthemen ab",
        microscopy: { title: "Mikroskopie & Zellstudien", desc: "Erkunden Sie pflanzliche und tierische Zellen, bereiten Sie Objektträger vor und stellen Sie den Fokus wie bei einem echten Mikroskop ein." },
        dissection: { title: "Virtuelle Sezierungen", desc: "Führen Sie detaillierte Organsezierungen ethisch durch. Erkunden Sie Nieren, Herzen, Lungen und mehr." },
        dna: { title: "DNA & Genetik", desc: "Extrahieren Sie DNA, führen Sie Gelelektrophorese durch und erkunden Sie Vererbungsmuster praktisch." },
        cells: { title: "Zellteilung", desc: "Beobachten Sie Mitose und Meiose in Echtzeit und identifizieren Sie Phasen und Chromosomenverhalten." },
        photosynthesis: { title: "Photosynthese", desc: "Untersuchen Sie Faktoren, die die Photosyntheserate beeinflussen, mit kontrollierten Variablenexperimenten." },
        circulation: { title: "Kreislaufsystem", desc: "Verfolgen Sie den Blutfluss, untersuchen Sie die Herzstruktur und messen Sie den Puls unter verschiedenen Bedingungen." },
      },
      benefits: {
        title: "Warum Virtuelle Biologielabore?",
        ethical: { title: "Ethisches Lernen", desc: "Keine Tiere verletzt. Schüler erkunden Anatomie und Physiologie ohne ethische Kompromisse." },
        repeat: { title: "Wiederholen & Meistern", desc: "Üben Sie Seziertechniken unbegrenzt. Gewinnen Sie Vertrauen vor jeder realen Arbeit." },
        detail: { title: "Mikroskopische Details", desc: "Zoomen Sie in Zellstrukturen, die in Schulmikroskopen unmöglich zu sehen sind." },
        progress: { title: "Fortschritt Verfolgen", desc: "KI-gestützte Bewertung verfolgt die Technikentwicklung und identifiziert Verbesserungsbereiche." },
      },
      curriculum: { title: "An Ihren Lehrplan Angepasst", text: "Unsere Biologiesimulationen sind direkt auf Prüfungsspezifikationen abgestimmt." },
      cta: { title: "Bereit, Ihr Biologielabor zu Verbessern?", text: "Schließen Sie sich Schulen an, die WhimsyLabs nutzen, um Biologie praktisch, ethisch und ansprechend zu gestalten.", button: "Heute Starten" },
    },

    // Physics Page
    physics: {
      title: "Virtuelles Physiklabor | Interaktive Simulationen | WhimsyLabs",
      description: "Erkunden Sie virtuelle Physikexperimente mit realistischen Simulationen. Mechanik, Elektrizität, Wellen und mehr mit Echtzeit-Datenerfassung.",
      hero: {
        title: "Virtuelles Physiklabor für Schulen",
        subtitle: "Meistern Sie Physikkonzepte mit interaktiven Simulationen. Von Schaltkreisen bis zur Mechanik — präzise Messungen ohne Ausrüstungsbeschränkungen.",
        cta: "Demo Buchen",
        ctaSecondary: "Funktionen Ansehen",
      },
      intro: {
        title: "Physikunterricht Transformieren",
        text1: "Physik handelt davon zu verstehen, wie das Universum funktioniert. Aber traditionelle Labore stehen vor Herausforderungen: teure Ausrüstung, zeitaufwändiger Aufbau und Schwierigkeiten, Experimente mit verschiedenen Variablen zu wiederholen.",
        text2: "Das virtuelle Physiklabor von WhimsyLabs löst diese Probleme mit genauen Simulationen, die Schülern ermöglichen, Schaltkreise zu bauen, Mechanik zu untersuchen und Wellenphänomene zu erkunden.",
      },
      experiments: {
        title: "Verfügbare Physikexperimente",
        subtitle: "Unsere Bibliothek deckt wichtige Lehrplanthemen ab",
        circuits: { title: "Elektrische Schaltkreise", desc: "Bauen Sie Reihen- und Parallelschaltungen, messen Sie Spannung und Strom, untersuchen Sie das Ohmsche Gesetz." },
        mechanics: { title: "Kräfte & Bewegung", desc: "Erkunden Sie Newtons Gesetze, Reibung, Impuls und Energieerhaltung mit einstellbaren Parametern." },
        waves: { title: "Wellen & Schall", desc: "Untersuchen Sie Welleneigenschaften, Interferenz, stehende Wellen und den Doppler-Effekt." },
        optics: { title: "Licht & Optik", desc: "Erkunden Sie Reflexion, Brechung, Linsen und das elektromagnetische Spektrum interaktiv." },
        magnetism: { title: "Magnetismus & EM", desc: "Untersuchen Sie Magnetfelder, Elektromagnete, Motoren und elektromagnetische Induktion." },
        thermodynamics: { title: "Wärmelehre", desc: "Erkunden Sie Wärmeübertragung, spezifische Wärmekapazität und Gasgesetze mit präzisen Messungen." },
      },
      benefits: {
        title: "Warum Virtuelle Physiklabore?",
        interactive: { title: "Wirklich Interaktiv", desc: "Manipulieren Sie Variablen in Echtzeit und sehen Sie die Auswirkungen sofort." },
        precision: { title: "Präzise Messungen", desc: "Digitale Instrumente bieten Genauigkeit, die mit Schulausrüstung unmöglich ist." },
        variables: { title: "Variablenkontrolle", desc: "Isolieren Sie Variablen einfach und wiederholen Sie Experimente. Testen Sie Hypothesen systematisch." },
        analysis: { title: "Sofortige Analyse", desc: "Generieren Sie automatisch Diagramme aus Experimentaldaten. Mehr Zeit für Interpretation." },
      },
      curriculum: { title: "An Ihren Lehrplan Angepasst", text: "Unsere Physiksimulationen sind direkt auf Prüfungsspezifikationen abgestimmt." },
      cta: { title: "Bereit, Ihr Physiklabor zu Verbessern?", text: "Schließen Sie sich Schulen an, die WhimsyLabs nutzen, um Physik praktisch, präzise und ansprechend zu gestalten.", button: "Heute Starten" },
    },

    // Landing Demo (Homepage)
    landingDemo: {
      title: "WhimsyLabs Virtuelles Wissenschaftslabor | MINT-Bildungssoftware",
      description: "Erleben Sie die Physik-basierte virtuelle Labor-Engine von WhimsyLabs mit KI-gesteuerter Bewertung. Entwickeln Sie echtes Muskelgedächtnis und sparen Sie Stunden bei der Benotung.",
    },

    // Common
    common: {
      readMore: "Mehr Lesen",
      backToHome: "Zurück zur Startseite",
      loading: "Laden...",
      error: "Fehler",
      tryAgain: "Erneut Versuchen",
    },

    // Grants Page
    grants: {
      heroTitle: "Förderunterstützung für Schulen",
      heroSubtitle: "Wir helfen Schulen beim Zugang zu Fördermitteln für Laptops, VR-Headsets und MINT-Ausrüstung",
      introTitle: "Navigieren Sie durch die Förderlandschaft",
      introText1: "Die Finanzierung von Bildungstechnologie zu sichern kann eine Herausforderung sein. Bei WhimsyLabs verstehen wir den Antragsprocess und möchten Schulen helfen, die benötigten Ressourcen zu erhalten. Unsere virtuelle Laborsoftware funktioniert auf <strong>normalen Computern und Chromebooks</strong> sowie auf VR-Headsets, sodass Fördermittel die Hardware finanzieren können, die am besten zu den Bedürfnissen Ihrer Schule passt.",
      introText2: "Wir haben Informationen über Fördermittel zusammengestellt, die Laptops, Chromebooks, VR-Headsets und andere MINT-Ausrüstung finanzieren können. Unser Team umfasst <strong>Mitglieder mit Doktortiteln, die Erfahrung im Schreiben von Förderanträgen haben</strong>, und wir sind hier, um Sie durch den Antragsprozess mit Beratung, Ressourcen und Unterstützungsschreiben zu begleiten.",
      introText3: "<strong>Wir helfen gerne jeder Schule bei der Beantragung von Fördermitteln</strong> — und als Teil Ihres Antrags stellen wir kostenlosen Zugang zu einer WhimsyLabs-Demo bereit, damit Sie die virtuelle Laborplattform Ihren Gutachtern präsentieren können.",
      gridTitle: "Verfügbare Fördermöglichkeiten",
      gridSubtitle: "Entdecken Sie Fördermittel, die Computer, VR-Ausrüstung und mehr für Ihre Schule finanzieren können",
      supportTitle: "Brauchen Sie Hilfe bei Ihrem Antrag?",
      supportText: "Wir sind hier, um Schulen während des gesamten Antragsprozesses zu unterstützen. Ob Sie ein Unterstützungsschreiben benötigen, Hilfe bei der Darstellung der Bildungsvorteile virtueller Labore, oder Anleitung beim Ausfüllen Ihres Antrags, kontaktieren Sie uns.",
      ctaContact: "Kontaktieren Sie uns für Unterstützung",
      ctaFeatures: "Entdecken Sie unsere Funktionen",
      learnMore: "Mehr Erfahren",
      comingSoon: "Demnächst Verfügbar",
      moreGrantsTitle: "Weitere Fördermittel Bald Verfügbar",
      moreGrantsDesc: "Wir recherchieren zusätzliche Fördermöglichkeiten für Schulen in Großbritannien, den USA und der EU. Schauen Sie bald wieder vorbei für Updates!",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – Virtuelle Laborlösungen",
      navigation: "Footer-Navigation",
      home: "Startseite",
      features: "Funktionen",
      services: "Dienstleistungen",
      bett: "BETT 2026",
      contact: "Kontakt",
      blog: "Blog",
      faq: "FAQ",
      privacy: "Datenschutz",
      homeLabel: "Zur Startseite navigieren",
      featuresLabel: "Unsere Funktionen ansehen",
      servicesLabel: "Unsere Dienstleistungen ansehen",
      bettLabel: "Besuchen Sie uns auf der BETT 2026",
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
      grants: "助成金",
    },

    // Homepage - imported from separate file
    home: homeTranslations.jp,

    // Features
    features: {
      title: "AI科学チューターとバーチャルラボ機能 | WhimsyLabs",
      description:
        "WhimsyLabsの強力な機能をご覧ください。リアルな物理シミュレーション、AI駆動の自動評価システム、VRとウェブ対応のクロスプラットフォームアクセシビリティ、そして生徒の探究心を刺激する没入型STEM実験環境を提供します。教育現場の課題解決に最適な機能を搭載しています。",
      uniqueFeatures: "AI科学チューターとバーチャルラボ機能",
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
      title: "仮想科学実験室FAQ | WhimsyLabs",
      description: "WhimsyLabsバーチャルラボソフトウェアに関するよくある質問への専門的な回答をご覧ください。導入方法、価格プラン、技術要件、カリキュラムへの統合方法、そしてSTEMシミュレーションが学校教育をどのように向上させるかについて詳しくご説明します。",
      subtitle:
        "当社のシミュレーション教材と、STEM教育をどのように変革できるかについてのよくある質問への回答をご覧ください",
      heading: "仮想科学実験室：よくあるご質問",
    },

    // Blog
    blog: {
      title: "科学教育ブログ | WhimsyLabs",
      description: "WhimsyLabsの最新情報をご覧ください。バーチャルラボ技術の革新的な開発、STEM教育のトレンド、効果的な教授戦略、プラットフォームの開発状況など、教育者の皆様に役立つ情報を定期的にお届けします。科学教育の未来を一緒に探求しましょう。",
      post10: {
        whimsyrambleAlt: "WhimsyCat AIチューターがコミュニケーション能力を示すためのテストメッセージを表示"
      }
    },

    // Services
    services: {
      title: "学校向けバーチャルラボ | WhimsyLabs教育サービス",
      description: "学校向けの包括的なバーチャルラボサービスをご提供します。カスタム実験開発、カリキュラムへの統合支援、教師向けトレーニングプログラム、継続的な技術サポートなど、STEM教育の質を向上させるための充実したサービスをご利用いただけます。導入から運用まで、全面的にサポートいたします。",
    },

    // Privacy
    privacy: {
      title: "プライバシーポリシー | WhimsyLabs 個人情報保護",
      subtitle:
        "シミュレーション教材をご利用の際に、お客様の個人情報をどのように収集、使用、保護しているかをご確認ください",
      description: "WhimsyLabsのプライバシーポリシーをお読みいただき、STEM教育向けシミュレーション教材をご利用の際に、お客様の個人情報とデータをどのように収集、使用、保護しているかをご理解ください。個人情報保護に関する当社の取り組みをご確認いただけます。",
    },

    // Data Security
    dataSecurity: {
      title: "生徒データセキュリティ | WhimsyLabs バーチャルラボ",
      description: "WhimsyLabsが学校ごとの暗号化、多要素認証、GDPR/FERPA/COPPA完全準拠で生徒データを保護する方法をご紹介。データ販売は一切行いません。",
      badge: "プライバシーファースト設計",
      heroTitle: "生徒のデータ。あなたの管理下に。",
      heroSubtitle: "当社のvirtual labソフトウェアはプライバシーを核に構築。貴校のデータは保護され、暗号化され、あなたの管理下に置かれます。",
      commitmentsTitle: "セキュリティへの取り組み",
      mfaTitle: "多要素認証",
      mfaDesc: "管理者アカウントには多要素認証が必要です。教師、コーディネーター、ITスタッフ全員がMFAを使用して生徒データにアクセスします。",
      encryptionTitle: "学校ごとの暗号化",
      encryptionDesc: "各学校のデータは固有のキーで暗号化されます。貴校の情報は保護され、他の学校から分離されています。",
      sessionTitle: "セッション保護",
      sessionDesc: "複数のセキュリティ層が不正アクセスを防止します。不審な活動は自動的に保護措置を起動します。",
      noSalesTitle: "データ販売なし",
      noSalesDesc: "生徒データを販売、レンタル、取引することはありません。絶対に。広告パートナーなし、データブローカーなし、例外なし。",
      aiTitle: "責任あるAI利用",
      aiDesc: "AIチューターの改善にインタラクションパターンを使用する場合、データは完全に匿名化されます。オプトアウトも可能です。",
      auditTitle: "完全な監査証跡",
      auditDesc: "管理アクションはタイムスタンプ付きで記録されます。完全な説明責任、リクエストに応じてレビュー可能。",
      complianceTitle: "規制遵守",
      gdprDesc: "英国GDPRおよびEU一般データ保護規則に完全準拠。貴校がデータ管理者であり、当社は貴校に代わってのみデータを処理します。",
      ferpaDesc: "FERPA準拠。教育記録は保護され、承認された当事者のみがアクセスできます。",
      coppaDesc: "13歳未満のユーザー向けCOPPA準拠。保護者/学校の同意が必要。若い学習者への保護強化。",
      pipedaDesc: "カナダの機関向けにカナダPIPEDA準拠。",
      collectTitle: "収集するデータ",
      collectIntro: "透明性が重要です。システムを通過するデータは以下の通りです：",
      learningData: "学習データ",
      accountData: "アカウントデータ",
      notCollected: "収集しないデータ",
      architectureTitle: "セキュリティアーキテクチャ",
      builtTitle: "異なる設計思想",
      builtIntro: "最近のEdTech大規模侵害で数百万の生徒記録が露出しました。WhimsyLabsは一般的な脆弱性を回避するよう設計されています。",
      rightsTitle: "貴校の権利",
      exportTitle: "データエクスポート",
      exportDesc: "いつでも標準形式で貴校の全データの完全なエクスポートをリクエストできます。",
      deleteTitle: "データ削除",
      deleteDesc: "プラットフォームを離れる際に貴校のデータの完全な削除をリクエストできます。",
      accessTitle: "データアクセス",
      accessDesc: "生徒に関して保持しているデータを正確に確認できます。完全な透明性。",
      correctTitle: "データ訂正",
      correctDesc: "不正確なデータを訂正できます。情報の管理を維持します。",
      ctaTitle: "データセキュリティに関するご質問は？",
      ctaDesc: "ITチームとのセキュリティ実践についての話し合いや、セキュリティアンケートへの回答を喜んでお受けします。",
      contactBtn: "お問い合わせ",
      privacyBtn: "プライバシーポリシー",
      experimentActions: "実験アクション",
      experimentActionsDesc: "生徒がバーチャルラボで行うこと",
      progressMarkers: "進捗マーカー",
      progressMarkersDesc: "完了した実験、費やした時間",
      assessmentResponses: "評価回答",
      assessmentResponsesDesc: "ラボの質問への回答",
      safetyCompliance: "安全コンプライアンス",
      safetyComplianceDesc: "適切な手順が守られたかどうか",
      username: "ユーザー名",
      usernameDesc: "匿名可（学生IDで可）",
      schoolAssociation: "学校/クラス所属",
      schoolAssociationDesc: "どの機関とグループ",
      role: "役割",
      roleDesc: "生徒、教師、または管理者",
      notCollectedItems: "住所、電話番号、生体データ、閲覧履歴、SNS情報、財務情報、健康情報、広告プロファイル",
      archEncryption: "暗号化",
      archEncryptionDesc: "転送中および保存中のデータを暗号化。生徒の作業はあらゆる段階で保護されています。",
      archRoleAccess: "ロールベースアクセス",
      archRoleAccessDesc: "生徒は自分のデータのみ閲覧。教師は自分のクラスのみ。管理者は自分の機関のみ。",
      archAudit: "監査ログ",
      archAuditDesc: "管理アクションはログに記録され監査可能。すべてのデータエクスポート、すべての権限変更。",
      archBackups: "安全なバックアップ",
      archBackupsDesc: "テスト済み復元手順による自動暗号化バックアップ。",
      archOffline: "オフライン機能",
      archOfflineDesc: "プラットフォームはオフラインで動作。オフライン時、再接続までデータはデバイスから出ません。",
      checkMfa: "管理アクセスには多要素認証が必要",
      checkEncryption: "学校ごとの暗号化キーで問題発生時の影響を限定",
      checkNocentral: "すべての学校データを含む集中データベースなし",
      checkNosale: "データは第三者に販売・共有されません",
      checkAudit: "リクエストに応じて完全な監査証跡を提供",
      checkController: "常にデータ管理者はお客様です",
    },

    // BETT Page
    bett: {
      title: "BETT 2026でお会いしましょう | WhimsyLabs シミュレーション教材",
      description: "BETT 2026（ExCeL ロンドン、1月21-23日）でWhimsyLabsをご訪問ください。ブースFS10で個別デモのご予約を承っております。BETT UK 2025で受賞した革新的なバーチャルラボプラットフォームの実演をぜひご体験ください。",
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
      calendlyFallback: "カレンダーが読み込まれませんか？",
      calendlyFallbackLink: "Calendlyで直接予約",
      calendlyNote: "BETTにお越しになれませんか？代わりに当社チームとのバーチャルミーティングを予約してください。",
      contactTitle: "電話またはミーティングのリクエスト",
      contactDescription: "以下のフォームにご記入いただければ、パーソナライズされたデモンストレーションをスケジュールするために当社チームがご連絡いたします。",
      formName: "お名前",
      formNamePlaceholder: "山田太郎",
      formSchool: "学校/組織",
      formSchoolPlaceholder: "例：〇〇学校または大学",
      formEmail: "メールアドレス",
      formEmailPlaceholder: "your.email@school.edu",
      formPhone: "電話番号（任意）",
      formPhonePlaceholder: "+81 3-1234-5678",
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

    // Chemistry Page
    chemistry: {
      title: "バーチャル化学実験室 | インタラクティブ化学シミュレーション | WhimsyLabs",
      description: "リアルなシミュレーションでインタラクティブな仮想化学実験を体験できます。滴定、反応、分子化学の安全で無制限の練習が可能。",
      hero: {
        title: "学校向けバーチャル化学実験室",
        subtitle: "リアルな物理シミュレーションによる安全で魅力的な化学実験。滴定から燃焼反応まで — すべて危険なく。",
        cta: "デモを予約",
        ctaSecondary: "機能を見る",
      },
      intro: {
        title: "化学教育を変革する",
        text1: "化学は本質的に実践的です。しかし、従来の実験室には課題があります：限られた設備、安全上の懸念、時間的制約、そして高価な実験を繰り返すことの不可能性。",
        text2: "WhimsyLabsのバーチャル化学実験室は、生徒が滴定を練習し、反応を観察し、分子構造を探索できる物理的に正確なシミュレーションでこれらの問題を解決します — 安全に、何度でも。",
      },
      experiments: {
        title: "利用可能な化学実験",
        subtitle: "私たちの成長中のライブラリは、すべての教育レベルの主要なカリキュラムトピックをカバーしています",
        titration: {
          title: "酸塩基滴定",
          desc: "リアルなビュレットコントロールと色変化指示薬で滴定技術の精度をマスター。",
        },
        reactions: {
          title: "化学反応",
          desc: "発熱・吸熱反応、沈殿、中和をリアルタイムで観察。",
        },
        molecular: {
          title: "分子モデリング",
          desc: "3D分子構造、結合角、電子配置を構築・視覚化。",
        },
        combustion: {
          title: "燃焼分析",
          desc: "燃焼反応、炎色反応、エネルギー放出測定を安全に探索。",
        },
        electrolysis: {
          title: "電気分解",
          desc: "電解槽、電極反応、ファラデーの電気分解の法則を調査。",
        },
        stoichiometry: {
          title: "化学量論の練習",
          desc: "モル計算を実践的な文脈で適用し、正確さについて即座にフィードバック。",
        },
      },
      benefits: {
        title: "なぜバーチャル化学実験室なのか？",
        safety: {
          title: "完全な安全性",
          desc: "腐食性の酸、有毒ガス、裸火のリスクなし。生徒は危険なく自由に実験できます。",
        },
        unlimited: {
          title: "無制限の繰り返し",
          desc: "必要なだけ実験を繰り返せます。無駄な薬品なし、補充なし、片付けなし。",
        },
        feedback: {
          title: "即時AIフィードバック",
          desc: "AIチューターWhimsyCatが技術を通じて生徒を導き、癖になる前にミスを発見。",
        },
        data: {
          title: "リアルタイムデータ",
          desc: "正確なグラフとデータ表を自動生成。手動記録ではなく解釈に集中。",
        },
      },
      curriculum: {
        title: "カリキュラムに対応",
        text: "私たちの化学シミュレーションは試験仕様に直接マッピングされ、すべての実験が必要な実技スキルを強化することを保証します。",
      },
      cta: {
        title: "化学実験室をアップグレードする準備はできましたか？",
        text: "WhimsyLabsを使用して化学を実践的、安全、魅力的にしている学校に参加しましょう。",
        button: "今日から始める",
      },
    },

    // Biology Page
    biology: {
      title: "バーチャル生物学実験室 | インタラクティブシミュレーション | WhimsyLabs",
      description: "リアルなシミュレーションでインタラクティブな仮想生物学実験を体験できます。解剖、顕微鏡、細胞生物学を倫理的に学習が可能。",
      hero: {
        title: "学校向けバーチャル生物学実験室",
        subtitle: "倫理的で魅力的な実験で生命科学を探求。細胞生物学から解剖まで — 動物を傷つけずに学習。",
        cta: "デモを予約",
        ctaSecondary: "機能を見る",
      },
      intro: {
        title: "生物学教育を変革",
        text1: "生物学は生命を理解することです。しかし、従来の実験室は課題に直面しています：解剖に関する倫理的懸念、顕微鏡へのアクセス制限、リアルタイムでプロセスを観察する不可能性。",
        text2: "WhimsyLabsのバーチャル生物学実験室は、生徒が細胞を探求し、仮想解剖を行い、生物学的プロセスを観察できる詳細なシミュレーションでこれらの問題を解決します。",
      },
      experiments: {
        title: "利用可能な生物学実験",
        subtitle: "私たちのライブラリはカリキュラムの主要トピックをカバー",
        microscopy: { title: "顕微鏡と細胞研究", desc: "植物細胞と動物細胞を探索し、スライドを準備し、本物の顕微鏡のようにフォーカスを調整。" },
        dissection: { title: "バーチャル解剖", desc: "倫理的に詳細な臓器解剖を実行。腎臓、心臓、肺などを探索。" },
        dna: { title: "DNAと遺伝学", desc: "DNAを抽出し、ゲル電気泳動を行い、遺伝パターンを実践的に探索。" },
        cells: { title: "細胞分裂", desc: "有糸分裂と減数分裂をリアルタイムで観察し、段階と染色体の動きを特定。" },
        photosynthesis: { title: "光合成", desc: "制御変数実験で光合成速度に影響する要因を調査。" },
        circulation: { title: "循環系", desc: "血流を追跡し、心臓の構造を調べ、さまざまな条件下で脈拍を測定。" },
      },
      benefits: {
        title: "なぜバーチャル生物学実験室？",
        ethical: { title: "倫理的学習", desc: "動物を傷つけない。倫理的な妥協なしに解剖学と生理学を探求。" },
        repeat: { title: "繰り返し習得", desc: "解剖技術を無制限に練習。実際の作業前に自信をつける。" },
        detail: { title: "顕微鏡的詳細", desc: "学校の顕微鏡では見えない細胞構造にズームイン。" },
        progress: { title: "進捗追跡", desc: "AI駆動評価が技術開発を追跡し、改善すべき領域を特定。" },
      },
      curriculum: { title: "カリキュラムに対応", text: "私たちの生物学シミュレーションは試験仕様に直接マッピングされています。" },
      cta: { title: "生物学実験室をアップグレードする準備はできましたか？", text: "WhimsyLabsを使用して生物学を実践的、倫理的、魅力的にしている学校に参加しましょう。", button: "今日から始める" },
    },

    // Physics Page
    physics: {
      title: "バーチャル物理学実験室 | インタラクティブシミュレーション | WhimsyLabs",
      description: "リアルなシミュレーションでインタラクティブな仮想物理学実験を体験できます。力学、電気、波動など、リアルタイムデータ収集で学習。",
      hero: {
        title: "学校向けバーチャル物理学実験室",
        subtitle: "インタラクティブシミュレーションで物理概念を習得。回路から力学まで — 機器の制限なしに正確な測定。",
        cta: "デモを予約",
        ctaSecondary: "機能を見る",
      },
      intro: {
        title: "物理学教育を変革",
        text1: "物理学は宇宙の仕組みを理解することです。しかし、従来の実験室は課題に直面しています：高価な機器、時間のかかる設定、異なる変数での実験を繰り返す難しさ。",
        text2: "WhimsyLabsのバーチャル物理学実験室は、生徒が回路を構築し、力学を調査し、波動現象を探求できる正確なシミュレーションでこれらの問題を解決します。",
      },
      experiments: {
        title: "利用可能な物理学実験",
        subtitle: "私たちのライブラリはカリキュラムの主要トピックをカバー",
        circuits: { title: "電気回路", desc: "直列と並列回路を構築し、電圧と電流を測定し、オームの法則を調査。" },
        mechanics: { title: "力と運動", desc: "ニュートンの法則、摩擦、運動量、エネルギー保存を調整可能なパラメータで探求。" },
        waves: { title: "波と音", desc: "波の性質、干渉、定常波、ドップラー効果を調査。" },
        optics: { title: "光と光学", desc: "反射、屈折、レンズ、電磁スペクトルをインタラクティブに探求。" },
        magnetism: { title: "磁気とEM", desc: "磁場、電磁石、モーター、電磁誘導を調査。" },
        thermodynamics: { title: "熱物理学", desc: "熱伝達、比熱容量、気体の法則を正確な測定で探求。" },
      },
      benefits: {
        title: "なぜバーチャル物理学実験室？",
        interactive: { title: "真にインタラクティブ", desc: "リアルタイムで変数を操作し、効果を即座に確認。" },
        precision: { title: "正確な測定", desc: "デジタル機器が学校の機器では不可能な精度を提供。" },
        variables: { title: "変数制御", desc: "変数を簡単に分離し、実験を繰り返す。仮説を体系的にテスト。" },
        analysis: { title: "即時分析", desc: "実験データからグラフを自動生成。解釈により多くの時間を。" },
      },
      curriculum: { title: "カリキュラムに対応", text: "私たちの物理学シミュレーションは試験仕様に直接マッピングされています。" },
      cta: { title: "物理学実験室をアップグレードする準備はできましたか？", text: "WhimsyLabsを使用して物理学を実践的、正確、魅力的にしている学校に参加しましょう。", button: "今日から始める" },
    },

    // Landing Demo (Homepage)
    landingDemo: {
      title: "WhimsyLabs 仮想科学実験室 | STEM教育ソフトウェア",
      description: "WhimsyLabsの物理ベースのバーチャルラボエンジンをAI駆動評価で体験。本物の筋肉記憶を構築しながら、採点時間を節約できます。",
    },

    // Common
    common: {
      readMore: "続きを読む",
      backToHome: "ホームに戻る",
      loading: "読み込み中...",
      error: "エラー",
      tryAgain: "再試行",
    },

    // Grants Page
    grants: {
      heroTitle: "学校向け助成金サポート",
      heroSubtitle: "ノートパソコン、VRヘッドセット、STEM機器のための助成金取得を支援します",
      introTitle: "助成金の世界をナビゲート",
      introText1: "教育テクノロジーの資金調達は難しい場合があります。WhimsyLabsでは、助成金申請プロセスを理解しており、学校が必要なリソースにアクセスできるよう支援したいと考えています。当社のバーチャルラボソフトウェアは、VRヘッドセットだけでなく<strong>通常のコンピューターやChromebook</strong>でも動作するため、助成金で学校のニーズに最適なハードウェアを調達できます。",
      introText2: "ノートパソコン、Chromebook、VRヘッドセット、その他のSTEM機器に資金を提供できる助成金の情報をまとめました。当社のチームには<strong>助成金申請書作成の経験を持つ博士号取得者</strong>が含まれており、ガイダンス、リソース、推薦状を通じて申請プロセスをサポートいたします。",
      introText3: "<strong>どの学校の助成金申請もお手伝いいたします</strong>。申請の一環として、WhimsyLabsのデモへの無料アクセスを提供し、審査員にバーチャルラボプラットフォームをご紹介いただけます。",
      gridTitle: "利用可能な助成金",
      gridSubtitle: "学校向けのコンピューター、VR機器などの資金調達に役立つ助成金をご覧ください",
      supportTitle: "申請にお困りですか？",
      supportText: "助成金申請プロセス全体を通じて学校をサポートいたします。推薦状が必要な場合、バーチャルラボの教育的メリットの説明にお困りの場合、または申請書の記入についてのガイダンスが必要な場合は、お気軽にお問い合わせください。",
      ctaContact: "サポートのお問い合わせ",
      ctaFeatures: "機能を見る",
      learnMore: "詳細を見る",
      comingSoon: "近日公開",
      moreGrantsTitle: "その他の助成金は近日公開",
      moreGrantsDesc: "英国、米国、EUの学校向けの追加の助成金機会を調査中です。最新情報をお待ちください！",
    },

    // Footer
    footer: {
      copyright: "© 2025 Whimsylabs – シミュレーション教材ソリューション",
      navigation: "フッターナビゲーション",
      home: "ホーム",
      features: "機能",
      services: "サービス",
      bett: "BETT 2026",
      contact: "お問い合わせ",
      blog: "ブログ",
      faq: "よくある質問",
      privacy: "プライバシー",
      homeLabel: "ホームへ移動",
      featuresLabel: "機能を見る",
      servicesLabel: "サービスを見る",
      bettLabel: "BETT 2026でお会いしましょう",
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