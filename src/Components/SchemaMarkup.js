import React from "react";
import { Helmet } from "react-helmet-async";
// Import shared FAQ data
import { getSchemaFAQItems } from "../data/faqData";
import { getCurrentLanguage } from "../i18n";
// Import blog post data
// Dynamic blog post imports - these will be loaded as needed
// Note: We still need static imports for webpack bundling, but we'll make this more maintainable
import * as Post1 from "./blog/Post1";
import * as Post2 from "./blog/Post2";
import * as Post3 from "./blog/Post3";
import * as Post4 from "./blog/Post4";
import * as Post5 from "./blog/Post5";
import * as Post6 from "./blog/Post6";
import * as Post7 from "./blog/Post7";
import * as Post8 from "./blog/Post8";
import * as Post9 from "./blog/Post9";
import * as Post10 from "./blog/Post10";
import * as Post11 from "./blog/Post11";
import * as Post12 from "./blog/Post12";
import * as Post13 from "./blog/Post13";
import * as Post14 from "./blog/Post14";

// Create a dynamic mapping of all posts
const ALL_POSTS = {
  Post1, Post2, Post3, Post4, Post5, Post6, Post7, 
  Post8, Post9, Post10, Post11, Post12, Post13, Post14
};

const SchemaMarkup = () => {
  // Get current path from window.location instead of React Router
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const baseUrl = "https://whimsylabs.ai";

  // Get current language and extract FAQ data in that language
  const currentLanguage = getCurrentLanguage();

  // Extract FAQ data from shared data source
  const extractFAQData = () => {
    // Use the shared FAQ data - this already provides the most important questions
    return getSchemaFAQItems();
  };

  // Extract blog post data dynamically
  const getBlogPostData = () => {
    // Generate blog posts data dynamically from all available posts
    const blogPosts = {};
    
    // Default keywords for different post types (can be customized per post)
    const getKeywordsForPost = (post, index) => {
      const baseKeywords = ["virtual laboratory", "STEM education"];
      
      // Add specific keywords based on post content/title
      if (post.title?.toLowerCase().includes('ai')) {
        return [...baseKeywords, "AI tutoring", "artificial intelligence", "educational technology"];
      }
      if (post.title?.toLowerCase().includes('sustainability') || post.title?.toLowerCase().includes('green')) {
        return [...baseKeywords, "sustainability", "environmental impact", "green labs"];
      }
      if (post.title?.toLowerCase().includes('teacher')) {
        return [...baseKeywords, "teacher support", "educational crisis", "professional development"];
      }
      if (post.title?.toLowerCase().includes('physics')) {
        return [...baseKeywords, "physics simulations", "computational physics", "real-time computing"];
      }
      if (post.title?.toLowerCase().includes('gamification')) {
        return [...baseKeywords, "gamification", "student engagement", "educational rewards"];
      }
      if (post.title?.toLowerCase().includes('career')) {
        return [...baseKeywords, "STEM careers", "professional training", "career preparation"];
      }
      
      // Default keywords
      return [...baseKeywords, "science education", "educational technology", "virtual experiments"];
    };
    
    // Dynamically create entries for all posts
    Object.values(ALL_POSTS).forEach((post, index) => {
      if (post.slug && post.title && post.date) {
        const path = `/blog/${post.slug}`;
        blogPosts[path] = {
          title: post.title,
          datePublished: post.date,
          dateModified: post.date,
          description: post.description || "Insights into virtual laboratory technology and STEM education innovation from WhimsyLabs.",
          slug: post.slug,
          keywords: getKeywordsForPost(post, index),
        };
      }
    });

    return (
      blogPosts[currentPath] || {
        title: "WhimsyLabs Blog - Virtual Laboratory Innovation",
        datePublished: "2025-01-01",
        dateModified: "2025-01-01",
        description:
          "Insights into virtual laboratory technology and STEM education innovation from WhimsyLabs.",
        slug: "blog-post",
        keywords: [
          "virtual laboratory",
          "STEM education",
          "educational technology",
          "advanced simulation",
        ],
      }
    );
  };

  // Organization schema that will be included on all pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WhimsyLabs",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "WhimsyLabs delivers the world's most advanced virtual laboratory platform with industry-leading simulation technology, proprietary physics engine with real-world accuracy, and revolutionary AI assessment capabilities.",
    sameAs: [
      "https://www.youtube.com/@whimsylabs",
      "https://bsky.app/profile/whimsylabs.bsky.social",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "inquiries@whimsylabs.ai",
      contactType: "customer service",
    },
    awards: [
      "BETT 2025 Kids Judge Award Winner - Best Science Lab (Start Up)",
      "Converge Challenge Second Place Winner",
    ],
  };

  // Product schema for the main virtual lab software
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WhimsyLabs Advanced Virtual Laboratory Platform",
    applicationCategory: "EducationalApplication",
    operatingSystem:
      "Web, Windows, MacOS, Linux, Android, VR, Quest2, Quest3, Vive, Index, Pico4",
    offers: {
      "@type": "Offer",
      price: "Contact for premium pricing",
      priceCurrency: "GBP",
    },
    description:
      "The world's most advanced virtual laboratory platform featuring proprietary physics engine with 99.7% accuracy simulation, revolutionary AI assessment, and true hand representation across all devices.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
    },
    featureList: [
      "Real world Accuracy Simulation",
      "Proprietary Physical Chemistry Engine",
      "Revolutionary AI Assessment",
      "True Hand Representation",
      "Cross-Platform Compatibility",
      "Real-time Molecular Interactions",
      "Custom Experiments and Labs Generated by AI",
    ],
  };

  // Testimonials as Review schema
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Review",
          itemReviewed: {
            "@type": "SoftwareApplication",
            name: "WhimsyLabs Virtual Laboratory",
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Kids Judge Bett",
          },
          reviewBody:
            "Very fun and engaging, and will cater fun for all children!",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Review",
          itemReviewed: {
            "@type": "SoftwareApplication",
            name: "WhimsyLabs Virtual Laboratory",
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Bett2025 Lab Manager",
          },
          reviewBody:
            "The feeling of the lab was amazing. Being able to train students in practicals remotely not only saves our glassware/equipment but gives students an extra space to learn lab skills effectively.",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Review",
          itemReviewed: {
            "@type": "SoftwareApplication",
            name: "WhimsyLabs Virtual Laboratory",
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Bett2025 Teacher",
          },
          reviewBody:
            "The automated grading on a curve with a wide range of student outcomes is incredible. It saves me so much time and targets our learning objectives perfectly.",
        },
      },
    ],
  };

  // FAQ Schema generated dynamically from FAQ component data
  const generateFAQSchema = () => {
    const faqData = extractFAQData();
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  };

  const faqSchema = generateFAQSchema();

  // Blog post schema generated dynamically from blog post data
  const generateBlogPostSchema = () => {
    const postData = getBlogPostData();

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: postData.title,
      image: `${baseUrl}/logo.png`,
      datePublished: postData.datePublished,
      dateModified: postData.dateModified,
      author: {
        "@type": "Organization",
        name: "WhimsyLabs",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "WhimsyLabs",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
        },
      },
      url: `${baseUrl}${currentPath}`,
      description: postData.description,
      keywords: postData.keywords,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}${currentPath}`,
      },
      articleSection: "STEM Education Technology",
      wordCount: 2000, // Approximate word count
      inLanguage: "en-GB",
      isAccessibleForFree: true,
      about: [
        {
          "@type": "Thing",
          name: "Virtual Laboratory Technology",
        },
        {
          "@type": "Thing",
          name: "STEM Education",
        },
        {
          "@type": "Thing",
          name: "Educational Technology",
        },
      ],
    };
  };

  // Course schema for educational content
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Virtual Laboratory Skills Training",
    description:
      "Master laboratory skills in WhimsyLabs' advanced virtual environment with 99.7% accuracy simulation. This comprehensive course covers fundamental to expert-level lab techniques across Biology, Chemistry, and Physics using proprietary physics engine technology.",
    provider: {
      "@type": "Organization",
      name: "WhimsyLabs",
      sameAs: baseUrl,
    },
    educationalLevel: "Secondary Education, Higher Education",
    teaches: [
      "Virtual Laboratory Procedures",
      "STEM Practical Skills",
      "Scientific Method Application",
      "Laboratory Safety Protocols",
      "Data Analysis and Interpretation",
    ],
    courseMode: ["Online", "VR", "Blended Learning"],
    availableLanguage: "English",
  };

  // HowTo schema for educational processes
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Conduct Virtual Laboratory Experiments",
    description:
      "Step-by-step guide to performing scientific experiments using WhimsyLabs' advanced virtual laboratory platform with 99.7% accuracy simulation.",
    image: `${baseUrl}/logo.png`,
    totalTime: "PT30M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "GBP",
      value: "0",
    },
    supply: [
      {
        "@type": "HowToSupply",
        name: "Computer or VR Headset",
      },
      {
        "@type": "HowToSupply",
        name: "Internet Connection",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "WhimsyLabs Virtual Laboratory Platform",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Access Virtual Laboratory",
        text: "Log into WhimsyLabs platform using any device - desktop, or VR headset.",
      },
      {
        "@type": "HowToStep",
        name: "Select Experiment",
        text: "Choose from Biology, Chemistry, or Physics experiments with realistic simulations.",
      },
      {
        "@type": "HowToStep",
        name: "Perform Procedures",
        text: "Use true hand representation and proprietary physics engine for realistic lab experience.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze Results",
        text: "Review data with AI-powered assessment and instant feedback from Whimsycat tutor.",
      },
    ],
  };

  // WebSite schema for enhanced search presence
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WhimsyLabs - Advanced Virtual Laboratory Platform",
    url: baseUrl,
    description:
      "The world's most advanced virtual laboratory platform with 99.7% accuracy simulation, proprietary physics engine, and revolutionary AI assessment for STEM education.",
    publisher: {
      "@type": "Organization",
      name: "WhimsyLabs",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "WhimsyLabs Virtual Laboratory",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: ["teacher", "student", "administrator"],
    },
    genre: ["Educational Technology", "STEM Education", "Virtual Reality"],
    inLanguage: "en-GB",
  };

  // TechArticle schema for technical blog posts
  const generateTechArticleSchema = () => {
    const postData = getBlogPostData();

    return {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: postData.title,
      description: postData.description,
      image: `${baseUrl}/logo.png`,
      datePublished: postData.datePublished,
      dateModified: postData.dateModified,
      author: {
        "@type": "Organization",
        name: "WhimsyLabs",
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "WhimsyLabs",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
      url: `${baseUrl}${currentPath}`,
      mainEntityOfPage: `${baseUrl}${currentPath}`,
      proficiencyLevel: "Beginner",
      dependencies: "Virtual Reality Technology, Educational Software",
      applicationCategory: "Educational Technology",
      operatingSystem: "Web, VR, Mobile",
      keywords: postData.keywords.join(", "),
    };
  };

  // Determine which schemas to include based on the current page
  let schemasToInclude = [organizationSchema, websiteSchema]; // Include organization and website schema on all pages

  if (currentPath === "/") {
    schemasToInclude.push(productSchema, reviewsSchema, faqSchema, howToSchema);
  } else if (currentPath === "/services") {
    schemasToInclude.push(productSchema, courseSchema, howToSchema);
  } else if (currentPath === "/features") {
    schemasToInclude.push(productSchema, howToSchema);
  } else if (currentPath === "/faq") {
    schemasToInclude.push(faqSchema, howToSchema); // Add FAQ and HowTo schema to the dedicated FAQ page
  } else if (currentPath.startsWith("/blog")) {
    if (currentPath !== "/blog") {
      // This is a specific blog post - include both BlogPosting and TechArticle schemas
      schemasToInclude.push(
        generateBlogPostSchema(),
        generateTechArticleSchema()
      );
    }
  }

  return (
    <Helmet>
      {schemasToInclude.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SchemaMarkup;
