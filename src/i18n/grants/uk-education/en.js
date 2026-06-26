/**
 * English translations for UK Education Grants Page
 */

const enTranslations = {
  hero: {
    title: "UK STEM Education Grants",
    subtitleStrong: "Fund your school's virtual science lab with UK education grants.",
    subtitleText: "WhimsyLabs helps with grant applications and provides free demos. We support schools across the UK to access funding for STEM education.",
    badge1: "🎁 Free Demo",
    badge2: "📝 Application Support",
    badge3: "🇬🇧 UK Schools",
    ctaPrimary: "Contact Us",
    ctaSecondary: "View Grants",
    ctaTertiary: "Learn More"
  },

  about: {
    title: "About UK STEM Funding",
    description: "The UK offers numerous grant opportunities for schools to enhance science education. From the Royal Society to charitable foundations, these grants can help fund virtual laboratory software, teacher training, and innovative STEM projects. WhimsyLabs can help you navigate these opportunities.",
    card1: {
      title: "Multiple Funding Sources",
      text: "From Royal Society grants to charitable foundations, UK schools have access to diverse funding opportunities for STEM education enhancement."
    },
    card2: {
      title: "All School Types",
      text: "Whether you're a state school, academy, or independent school, there are grant programmes designed to support your STEM initiatives."
    },
    card3: {
      title: "Full Application Support",
      text: "We provide technical specifications, educational evidence, and implementation plans needed for your grant applications."
    }
  },

  grants: {
    title: "Available Grant Programmes",
    description: "Below are key UK grant programmes that can fund virtual laboratory software and STEM education resources. WhimsyLabs provides free demos and application support for all these programmes.",
    
    royalSociety: {
      title: "Royal Society Partnership Grants",
      subtitle: "Up to £3,000",
      description: "Fund innovative STEM projects that bring real-world science into schools. These grants support partnerships between schools and STEM professionals, helping students understand career pathways.",
      targetLabel: "Eligible",
      target: "UK state and independent schools",
      purposeLabel: "Focus Areas",
      purpose: "STEM projects, Gatsby Career Benchmarks",
      highlight: "WhimsyLabs virtual labs align perfectly with Gatsby Career Benchmarks, demonstrating how scientists work and inspiring future STEM careers."
    },

    scienceCommunity: {
      title: "Royal Society Science Community Grant",
      subtitle: "Up to £105,000 over 3 years",
      description: "For schools partnering with STEM professionals to deliver sustained science enrichment. These multi-year grants enable long-term programme development and teacher training.",
      targetLabel: "Eligible",
      target: "Schools partnering with STEM professionals",
      purposeLabel: "Duration",
      purpose: "Multi-year partnerships (up to 3 years)",
      highlight: "WhimsyLabs can serve as your STEM technology partner, providing virtual lab software, teacher training, and ongoing support throughout the grant period."
    },

    ironmongers: {
      title: "Ironmongers' Foundation",
      subtitle: "Up to £10,000",
      description: "Supporting STEM education initiatives that reach disadvantaged students aged 11-18. Focus on practical science engagement and career inspiration.",
      targetLabel: "Eligible",
      target: "Schools serving disadvantaged students aged 11-18",
      purposeLabel: "Priority",
      purpose: "Widening participation, STEM careers",
      highlight: "Virtual labs enable unlimited practical work regardless of equipment budgets, perfect for schools wanting to provide premium science experiences to all students."
    },

    bsw: {
      title: "British Science Week Grants",
      subtitle: "£400 Kick Start Grant",
      description: "Annual grants for schools to run British Science Week events. Theme for 2026: 'Curiosity'. Perfect for schools in challenging circumstances or new to running science events.",
      targetLabel: "Eligible",
      target: "Schools in challenging circumstances",
      purposeLabel: "Deadline",
      purpose: "March 2026 applications",
      highlight: "Use WhimsyLabs to run engaging virtual experiments during Science Week—no equipment setup needed, and students can continue exploring at home."
    },

    euk: {
      title: "EUK Education STEM Bursary",
      subtitle: "£650",
      description: "Financial support for trainee teachers and NQTs pursuing STEM education. Helps cover costs of teaching resources and professional development.",
      targetLabel: "Eligible",
      target: "Trainee teachers and NQTs",
      purposeLabel: "Deadline",
      purpose: "31 July for 2025/26 academic year",
      highlight: "New teachers can use WhimsyLabs to deliver engaging practicals from day one, building confidence with classroom technology."
    },

    crest: {
      title: "CREST Awards / See Science",
      subtitle: "Varies by programme",
      description: "CREST Awards provide a framework for student-led STEM projects. See Science grants support schools in Wales to deliver hands-on science activities.",
      targetLabel: "Eligible",
      target: "UK schools (See Science: Wales)",
      purposeLabel: "Deadline",
      purpose: "Main grants deadline 31 March 2026",
      highlight: "WhimsyLabs supports CREST project work with unlimited virtual experimentation, helping students design and test hypotheses independently."
    },

    ogden: {
      title: "Ogden Trust Schools Grants",
      subtitle: "Up to £600",
      description: "Supporting physics and engineering enrichment in schools. Focus on sparking curiosity and demonstrating STEM career pathways.",
      targetLabel: "Eligible",
      target: "UK state schools",
      purposeLabel: "Focus",
      purpose: "Physics and engineering projects",
      highlight: "Our physics simulations align perfectly with Ogden Trust objectives, providing realistic mechanics, electricity, and wave experiments."
    }
  },

  help: {
    title: "How WhimsyLabs Supports Your Application",
    description: "We provide comprehensive support to help you secure funding for virtual laboratory software. All support is provided free of charge.",
    features: [
      {
        icon: "📄",
        title: "Technical Specifications",
        text: "Complete documentation covering system requirements, security measures, data protection, and GDPR compliance for your application."
      },
      {
        icon: "📊",
        title: "Educational Evidence",
        text: "Research data demonstrating virtual lab effectiveness, plus case studies from UK schools already using WhimsyLabs."
      },
      {
        icon: "📋",
        title: "Implementation Plans",
        text: "Ready-to-use curriculum integration guides and lesson plans that demonstrate how you'll use the grant funding."
      },
      {
        icon: "🎥",
        title: "Free Demos",
        text: "Live demonstrations for governors, SLT, or grant reviewers showing exactly what students will experience."
      },
      {
        icon: "💬",
        title: "Application Review",
        text: "We'll review your draft application and provide advice on technical descriptions and expected outcomes."
      },
      {
        icon: "🤝",
        title: "Ongoing Support",
        text: "After implementation, we provide teacher training, technical support, and help with grant outcome reports."
      }
    ]
  },

  apply: {
    title: "Get Started Today",
    description: "Ready to explore funding options for your school? Contact us for a free demo and personalised guidance on which grants best match your needs.",
    form: {
      name: "Your Name",
      namePlaceholder: "e.g., Sarah Johnson",
      school: "School / Institution",
      schoolPlaceholder: "e.g., Oakwood Academy",
      email: "Email Address",
      emailPlaceholder: "e.g., s.johnson@school.sch.uk",
      role: "Your Role",
      rolePlaceholder: "e.g., Head of Science",
      grantType: "Grant of Interest",
      grantTypeOptions: {
        select: "Select a grant programme...",
        royalSociety: "Royal Society Partnership Grants",
        scienceCommunity: "Science Community Grant",
        ironmongers: "Ironmongers' Foundation",
        bsw: "British Science Week",
        ogden: "Ogden Trust",
        other: "Other / Not Sure Yet"
      },
      message: "Questions or Comments",
      messagePlaceholder: "Tell us about your school, the subjects you're considering, student numbers, or any questions you have.",
      submit: "Send Enquiry",
      sending: "Sending...",
      success: "Thank you for your enquiry. We will contact you within 2 business days.",
      error: "Submission failed. Please contact us directly at hello@whimsylabs.ai"
    }
  },

  resources: {
    title: "Useful Resources",
    description: "Find more information about UK STEM education funding.",
    links: [
      {
        title: "STEM Learning Grants Directory",
        url: "https://stem.org.uk/resources/community/collection/134293",
        description: "Comprehensive list of STEM education funding opportunities"
      }
    ]
  },

  cta: {
    title: "Ready to Transform Science Education?",
    description: "Join hundreds of UK schools using WhimsyLabs to deliver engaging, practical science education. We'll help you find the right funding.",
    primaryButton: "Request Free Demo",
    secondaryButton: "View All Grants"
  }
};

export default enTranslations;
