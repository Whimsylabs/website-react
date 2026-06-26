/**
 * English translations for US Education Grants Page
 */

const enTranslations = {
  hero: {
    title: "US STEM Education Grants",
    subtitleStrong: "Federal and state funding for virtual science labs in American schools.",
    subtitleText: "WhimsyLabs helps districts and schools navigate Title IV-A, NSF, and state-specific STEM funding. Free demos and application support available.",
    badge1: "🎁 Free Demo",
    badge2: "📝 Application Support",
    badge3: "🇺🇸 US Schools",
    ctaPrimary: "Contact Us",
    ctaSecondary: "View Grants",
    ctaTertiary: "Learn More"
  },

  about: {
    title: "About US STEM Funding",
    description: "The United States offers multiple federal and state funding streams for STEM education technology. From Title IV-A block grants to NSF research funding, there are opportunities for districts of all sizes to enhance science education with virtual laboratory software.",
    card1: {
      title: "Federal Funding",
      text: "Title IV-A and other federal programs provide substantial funding for educational technology, including virtual labs and STEM resources."
    },
    card2: {
      title: "State Programs",
      text: "Most states offer additional STEM education grants, often with simpler application processes than federal programs."
    },
    card3: {
      title: "Research Partnerships",
      text: "NSF and IES grants support research on STEM education effectiveness, perfect for districts wanting to evaluate virtual lab impact."
    }
  },

  grants: {
    title: "Available Funding Programs",
    description: "Below are key US funding programs that can support virtual laboratory software implementation. WhimsyLabs provides free demos and documentation support for all applications.",
    
    titleIV: {
      title: "Title IV-A (SSAE) Block Grants",
      subtitle: "Varies by state allocation",
      description: "The Student Support and Academic Enrichment (SSAE) program provides formula grants to states, which then distribute funds to districts. A well-rounded education—including STEM—is one of three allowable use categories.",
      targetLabel: "Eligible",
      target: "All K-12 public school districts",
      purposeLabel: "Focus Areas",
      purpose: "Well-rounded education including STEM",
      highlight: "Virtual labs qualify as 'effective use of technology' under Title IV-A. WhimsyLabs can provide the technical specifications and educational evidence needed for your application."
    },

    nsfItest: {
      title: "NSF ITEST (Innovative Technology Experiences for Students and Teachers)",
      subtitle: "Research grants - varies by project",
      description: "ITEST supports research on technology-rich STEM learning experiences. Grants fund partnerships between researchers and practitioners to develop and study innovative approaches.",
      targetLabel: "Eligible",
      target: "Universities, districts, nonprofits in partnership",
      purposeLabel: "Focus",
      purpose: "Technology-rich STEM experiences",
      highlight: "WhimsyLabs can partner with universities on ITEST proposals, providing virtual lab software and supporting research on learning outcomes."
    },

    cte: {
      title: "Career & Technical Education (Perkins V)",
      subtitle: "$1.465 billion nationally",
      description: "Perkins V funding supports career and technical education programs, including STEM pathways. Virtual labs can demonstrate real-world science careers and build technical skills.",
      targetLabel: "Eligible",
      target: "High schools, community colleges, career centers",
      purposeLabel: "Focus",
      purpose: "Career-connected STEM learning",
      highlight: "Our physics, chemistry, and biology simulations align with CTE program goals by demonstrating authentic scientific practices used in STEM careers."
    },

    ies: {
      title: "IES Education Research Grants",
      subtitle: "Research funding - varies by program",
      description: "The Institute of Education Sciences funds rigorous research on educational interventions. Virtual labs represent a strong candidate for efficacy and effectiveness studies.",
      targetLabel: "Eligible",
      target: "Research institutions, universities",
      purposeLabel: "Focus",
      purpose: "STEM education research",
      highlight: "We welcome research partnerships and can support IES-funded studies with detailed usage data, randomized implementation designs, and ongoing technical support."
    },

    stateGrants: {
      title: "State-Specific STEM Grants",
      subtitle: "Varies by state",
      description: "Most states offer their own STEM education funding programs, often with streamlined application processes. These can be faster to access than federal programs.",
      targetLabel: "Eligible",
      target: "Varies by state",
      purposeLabel: "Examples",
      purpose: "CA, TX, NY, FL all have dedicated STEM initiatives",
      highlight: "We maintain current information on state-level funding and can help identify the best opportunities for your location."
    }
  },

  help: {
    title: "How WhimsyLabs Supports Your Application",
    description: "We provide comprehensive support for federal and state grant applications. All support is provided free of charge.",
    features: [
      {
        icon: "📄",
        title: "Technical Specifications",
        text: "Complete documentation covering system requirements, security measures, COPPA/FERPA compliance, and accessibility standards."
      },
      {
        icon: "📊",
        title: "Research Evidence",
        text: "Published research on virtual lab effectiveness, plus case studies from US schools using WhimsyLabs."
      },
      {
        icon: "📋",
        title: "Standards Alignment",
        text: "Documentation showing alignment with NGSS, state standards, and Common Core math/ELA connections."
      },
      {
        icon: "🎥",
        title: "Stakeholder Demos",
        text: "Live demonstrations for school boards, principals, or grant reviewers showing exactly what students will experience."
      },
      {
        icon: "💬",
        title: "Application Review",
        text: "We'll review your draft application and provide feedback on technology descriptions and expected outcomes."
      },
      {
        icon: "🤝",
        title: "Implementation Support",
        text: "After funding, we provide professional development, technical support, and outcome documentation."
      }
    ]
  },

  apply: {
    title: "Get Started Today",
    description: "Ready to explore funding options for your district? Contact us for a free demo and personalized guidance on which grants best match your needs.",
    form: {
      name: "Your Name",
      namePlaceholder: "e.g., Jennifer Martinez",
      school: "School / District",
      schoolPlaceholder: "e.g., Lincoln Unified School District",
      email: "Email Address",
      emailPlaceholder: "e.g., jmartinez@lincoln.k12.us",
      role: "Your Role",
      rolePlaceholder: "e.g., STEM Coordinator",
      grantType: "Funding Program of Interest",
      grantTypeOptions: {
        select: "Select a program...",
        titleIV: "Title IV-A (SSAE)",
        nsfItest: "NSF ITEST",
        cte: "Career & Technical Education",
        ies: "IES Research",
        state: "State-Specific Grants",
        other: "Other / Not Sure Yet"
      },
      message: "Questions or Comments",
      messagePlaceholder: "Tell us about your district, the grade levels you serve, or any questions you have about funding options.",
      submit: "Send Inquiry",
      sending: "Sending...",
      success: "Thank you for your inquiry. We will contact you within 2 business days.",
      error: "Submission failed. Please contact us directly at hello@whimsylabs.ai"
    }
  },

  resources: {
    title: "Useful Resources",
    description: "Find more information about US STEM education funding.",
    links: [
      {
        title: "STEM Grants Database",
        url: "https://stemgrants.com",
        description: "Comprehensive database of STEM funding opportunities"
      },
      {
        title: "Progress Learning Grant Guide",
        url: "https://www.progresslearning.com/stem-grants",
        description: "State-by-state STEM funding resources"
      }
    ]
  },

  cta: {
    title: "Transform Science Education in Your District",
    description: "Join districts across America using WhimsyLabs to deliver engaging, standards-aligned science instruction. We'll help you find the right funding.",
    primaryButton: "Request Free Demo",
    secondaryButton: "View All Grants"
  }
};

export default enTranslations;
