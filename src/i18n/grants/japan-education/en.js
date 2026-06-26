/**
 * English translations for Japan Education Grant Page
 * For international schools in Japan and English-speaking educators
 */

const enTranslations = {
  hero: {
    title: "Japan Education Grants",
    subtitleStrong: "Fund your school's virtual science lab with Japanese education grants.",
    subtitleText: "WhimsyLabs helps with grant applications and provides free demos. Fully compatible with GIGA School Chromebooks.",
    badge1: "🎁 Free Demo",
    badge2: "📝 Application Support",
    badge3: "💻 GIGA School Ready",
    ctaPrimary: "Contact Us",
    ctaSecondary: "View Grants",
    ctaTertiary: "GIGA School Info"
  },

  about: {
    title: "About WhimsyLabs Virtual Lab",
    description: "WhimsyLabs provides virtual laboratories for Physics, Chemistry, and Biology. Schools with limited lab space or equipment can offer students realistic science experiments. Various Japanese education grants can help fund your implementation.",
    card1: {
      title: "Grant Funding Available",
      text: "MEXT (Ministry of Education) and JSPS Kakenhi grants can be used for ICT educational materials. We provide all documentation needed for applications."
    },
    card2: {
      title: "GIGA School Compatible",
      text: "WhimsyLabs runs on Chromebooks, Windows, and iPads - all devices distributed under the GIGA School program. No additional hardware required."
    },
    card3: {
      title: "Application Support",
      text: "We provide technical specifications, educational evidence, and implementation plans needed for grant applications. Contact us for assistance."
    }
  },

  giga: {
    title: "GIGA School Program Compatibility",
    description: "WhimsyLabs is designed to run smoothly on devices distributed to students across Japan under the GIGA School Program (GIGAスクール構想).",
    compatible: {
      title: "Supported Devices",
      items: [
        "Chromebook (GIGA School Standard)",
        "Windows PC / Tablets",
        "iPad / iOS Devices",
        "Android Tablets",
        "VR Headsets (Optional)"
      ]
    },
    benefits: {
      title: "Benefits",
      items: [
        "No additional hardware purchases needed",
        "Use existing GIGA School devices",
        "Web-based - no installation required",
        "Works on school networks",
        "1:1 device learning enabled"
      ]
    }
  },

  grants: {
    title: "Major Grant Programs",
    description: "Below are key grant programs that can fund ICT educational materials and science equipment. WhimsyLabs provides documentation support for all these programs.",
    
    mext: {
      title: "MEXT ICT Education Promotion",
      subtitle: "文部科学省 教育ICT活用推進事業",
      description: "The Ministry of Education, Culture, Sports, Science and Technology (MEXT) runs various programs to enhance education quality through ICT as part of the GIGA School initiative. These can fund digital teaching materials and teacher training.",
      targetLabel: "Eligible",
      target: "Public and private elementary, junior high, and high schools",
      purposeLabel: "Main Uses",
      purpose: "ICT equipment, digital materials, teacher training",
      highlight: "WhimsyLabs qualifies as 'digital teaching material' (デジタル教材). We provide educational effectiveness evidence for your application."
    },

    jsps: {
      title: "JSPS Grants-in-Aid (Kakenhi)",
      subtitle: "日本学術振興会 科学研究費助成事業（科研費）",
      description: "Kakenhi, managed by the Japan Society for the Promotion of Science, supports research activities at universities and technical colleges. It can fund research on teaching methods and educational material development.",
      targetLabel: "Eligible",
      target: "Universities, technical colleges, research institutions",
      amountLabel: "Grant Amount",
      amount: "Varies by category (¥100K - ¥10M+)",
      highlight: "Can be used for research on science education effectiveness using simulation materials. We welcome collaborative research inquiries."
    },

    gigaGrant: {
      title: "GIGA School Related Subsidies",
      subtitle: "GIGAスクール構想関連補助金",
      description: "Phase 2 of the GIGA School Program focuses not just on device renewal but also on enriching educational content. Various municipal subsidies are available.",
      targetLabel: "Eligible",
      target: "Municipal boards of education, public schools",
      focusLabel: "Focus Areas",
      focus: "Digital materials, learning systems, teacher training",
      highlight: "Since WhimsyLabs runs on GIGA School standard devices, you can implement it with content costs only - no additional hardware budget needed."
    }
  },

  help: {
    title: "WhimsyLabs Application Support",
    description: "We provide the following support free of charge to help with your grant application. Please don't hesitate to contact us.",
    features: [
      {
        icon: "📄",
        title: "Technical Specifications",
        text: "Documentation covering system requirements, security measures, and data protection policies needed for your application."
      },
      {
        icon: "📊",
        title: "Educational Evidence",
        text: "Research data demonstrating virtual lab learning effectiveness, plus case studies from international implementations."
      },
      {
        icon: "📋",
        title: "Implementation Templates",
        text: "Templates for curriculum integration, lesson plans, and implementation schedules to help with your proposal."
      },
      {
        icon: "🎥",
        title: "Free Demos & Workshops",
        text: "We can provide demonstrations for reviewers and stakeholders, plus teacher training workshops."
      },
      {
        icon: "💬",
        title: "Application Review",
        text: "We'll review your draft application and provide advice on technical content and descriptions."
      },
      {
        icon: "🤝",
        title: "Ongoing Support",
        text: "After implementation, we continue providing teacher training and operational support. We also help with outcome reports."
      }
    ]
  },

  apply: {
    title: "Contact Us",
    description: "We're happy to discuss how to use education grants for WhimsyLabs implementation at your school. Start with a free demo and we'll recommend the best plan for your needs.",
    form: {
      name: "Your Name",
      namePlaceholder: "e.g., Taro Yamada",
      school: "School / Institution",
      schoolPlaceholder: "e.g., Tokyo International School",
      email: "Email Address",
      emailPlaceholder: "e.g., teacher@school.ac.jp",
      role: "Your Role",
      rolePlaceholder: "e.g., Science Department Head",
      grantType: "Grant of Interest",
      grantTypeOptions: {
        select: "Select an option...",
        mext: "MEXT Related Programs",
        jsps: "JSPS Kakenhi",
        giga: "GIGA School Subsidies",
        other: "Other / Not Sure Yet"
      },
      message: "Questions or Comments",
      messagePlaceholder: "Please tell us about subjects you're considering, student numbers, or any questions you have.",
      submit: "Send Inquiry",
      sending: "Sending...",
      success: "Thank you for your inquiry. We will contact you within 2 business days.",
      error: "Submission failed. Please contact us directly at hello@whimsylabs.ai"
    }
  },

  cta: {
    title: "Try a Free Demo Today",
    description: "Experience WhimsyLabs' virtual laboratories firsthand and see how they can enhance science education at your school. We're here to help with grant applications and implementation planning.",
    primaryButton: "Request Free Demo",
    secondaryButton: "MEXT Website"
  }
};

export default enTranslations;
