/**
 * English translations for Canada Education Grants Page
 */

const enTranslations = {
  hero: {
    title: "Canada STEM Education Grants",
    subtitleStrong: "Federal and provincial funding for virtual science labs in Canadian schools.",
    subtitleText: "WhimsyLabs helps schools and districts access funding for STEM education technology. Free demos and application support available.",
    badge1: "🎁 Free Demo",
    badge2: "📝 Application Support",
    badge3: "🇨🇦 Canadian Schools",
    ctaPrimary: "Contact Us",
    ctaSecondary: "View Grants",
    ctaTertiary: "Learn More"
  },

  about: {
    title: "About Canadian STEM Funding",
    description: "Canada offers diverse funding opportunities for STEM education at federal and provincial levels. From corporate grants to government initiatives, there are multiple pathways to fund virtual laboratory software implementation in your school or district.",
    card1: {
      title: "Corporate Grants",
      text: "Major companies like Best Buy Canada offer substantial grants specifically for K-12 STEM and technology programs."
    },
    card2: {
      title: "Provincial Funding",
      text: "Each province has its own education funding programs, with Ontario recently committing $750M to STEM education."
    },
    card3: {
      title: "Research Programs",
      text: "Federal programs like iSTEM/GEI support STEM education research and graduate student involvement in schools."
    }
  },

  grants: {
    title: "Available Grant Programs",
    description: "Below are key Canadian funding programs that can support virtual laboratory software implementation. WhimsyLabs provides free demos and documentation support for all applications.",
    
    bestBuy: {
      title: "Best Buy STEM School Tech Grants",
      subtitle: "Up to $10,000",
      description: "Best Buy Canada's School Tech Grant program provides funding for K-12 schools to implement technology and STEM programs. Grants can cover software, equipment, and professional development.",
      targetLabel: "Eligible",
      target: "K-12 Canadian schools",
      purposeLabel: "Focus",
      purpose: "Tech/STEM programs and equipment",
      highlight: "Virtual laboratory software qualifies as STEM technology. WhimsyLabs can provide the technical specifications and educational evidence needed for your application."
    },

    istem: {
      title: "iSTEM / GEI Program",
      subtitle: "Up to $15,000",
      description: "The iSTEM and Graduate Education Innovation programs fund graduate student internships in schools, supporting STEM education research and practical implementation of innovative approaches.",
      targetLabel: "Eligible",
      target: "Universities partnering with schools",
      purposeLabel: "Focus",
      purpose: "Graduate internships in STEM education",
      highlight: "We welcome research partnerships and can support graduate students studying virtual lab implementation and effectiveness."
    },

    provincial: {
      title: "Provincial Education Funding",
      subtitle: "Varies by province",
      description: "Canadian provinces allocate substantial funding for education technology and STEM initiatives. Ontario alone has committed $750 million to enhance STEM education across the province.",
      targetLabel: "Eligible",
      target: "Public schools by province",
      purposeLabel: "Examples",
      purpose: "Ontario ($750M STEM), BC Tech Initiative, Alberta Innovation",
      highlight: "We can help you navigate your province's specific funding opportunities and provide documentation tailored to provincial requirements."
    }
  },

  provincialDetails: {
    title: "Provincial Funding Highlights",
    description: "STEM education funding varies by province. Here are some current opportunities:",
    provinces: [
      {
        name: "Ontario",
        icon: "🍁",
        details: "$750M commitment to STEM education enhancement",
        focus: "Technology integration, teacher training, curriculum development"
      },
      {
        name: "British Columbia",
        icon: "🌲",
        details: "BC Tech Education Initiative",
        focus: "Digital learning tools, coding education, science resources"
      },
      {
        name: "Alberta",
        icon: "🏔️",
        details: "Alberta Innovation Fund for Education",
        focus: "EdTech adoption, STEM career pathways, hands-on learning"
      },
      {
        name: "Quebec",
        icon: "⚜️",
        details: "Programme d'innovation en éducation",
        focus: "Digital transformation, science education, research partnerships"
      }
    ]
  },

  help: {
    title: "How WhimsyLabs Supports Your Application",
    description: "We provide comprehensive support for Canadian grant applications. All support is provided free of charge.",
    features: [
      {
        icon: "📄",
        title: "Technical Specifications",
        text: "Complete documentation covering system requirements, security measures, and Canadian privacy law compliance (PIPEDA)."
      },
      {
        icon: "📊",
        title: "Educational Evidence",
        text: "Research data demonstrating virtual lab effectiveness, plus case studies from North American schools."
      },
      {
        icon: "📋",
        title: "Curriculum Alignment",
        text: "Documentation showing alignment with provincial science curricula and Pan-Canadian science standards."
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
        title: "Bilingual Support",
        text: "French and English documentation available to support applications in both official languages."
      }
    ]
  },

  apply: {
    title: "Get Started Today",
    description: "Ready to explore funding options for your school or district? Contact us for a free demo and personalised guidance on which grants best match your needs.",
    form: {
      name: "Your Name",
      namePlaceholder: "e.g., David Chen",
      school: "School / District",
      schoolPlaceholder: "e.g., Vancouver School Board",
      email: "Email Address",
      emailPlaceholder: "e.g., dchen@vsb.bc.ca",
      role: "Your Role",
      rolePlaceholder: "e.g., Science Department Head",
      grantType: "Funding Program of Interest",
      grantTypeOptions: {
        select: "Select a program...",
        bestBuy: "Best Buy STEM Tech Grants",
        istem: "iSTEM / GEI Program",
        provincial: "Provincial Funding",
        other: "Other / Not Sure Yet"
      },
      message: "Questions or Comments",
      messagePlaceholder: "Tell us about your school, the grades you serve, your province, or any questions you have about funding options.",
      submit: "Send Enquiry",
      sending: "Sending...",
      success: "Thank you for your enquiry. We will contact you within 2 business days.",
      error: "Submission failed. Please contact us directly at hello@whimsylabs.ai"
    }
  },

  resources: {
    title: "Useful Resources",
    description: "Find more information about Canadian STEM education funding.",
    links: [
      {
        title: "Canadian Grant Funding for STEM",
        url: "https://teachergeek.com/pages/canadian-grant-funding-opportunities",
        description: "Comprehensive guide to Canadian education grants"
      }
    ]
  },

  cta: {
    title: "Transform Science Education in Your School",
    description: "Join schools across Canada using WhimsyLabs to deliver engaging, curriculum-aligned science instruction. We'll help you find the right funding.",
    primaryButton: "Request Free Demo",
    secondaryButton: "View All Grants"
  }
};

export default enTranslations;
