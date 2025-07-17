import React from 'react';
import { Helmet } from 'react-helmet-async';
// Removed React Router - getting location from window.location

const SchemaMarkup = () => {
  // Get current path from window.location instead of React Router
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const baseUrl = "https://whimsylabs.ai";

  // Organization schema that will be included on all pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WhimsyLabs",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "WhimsyLabs provides award-winning virtual laboratory software for science education, used in schools, colleges, and universities worldwide.",
    "sameAs": [
      "https://www.youtube.com/@whimsylabs",
      "https://bsky.app/profile/whimsylabs.bsky.social"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "inquiries@whimsylabs.ai",
      "contactType": "customer service"
    }
  };

  // Product schema for the main virtual lab software
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WhimsyLabs Virtual Laboratory",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web, Windows, MacOS, iOS, Android, VR",
    "offers": {
      "@type": "Offer",
      "price": "Contact for pricing",
      "priceCurrency": "GBP"
    },
    "description": "A sandbox virtual laboratory simulation that gives you the freedom to explore, play and learn scientific concepts firsthand. Accurately models biological, chemical, and physical reactions and processes.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "120"
    }
  };

  // Testimonials as Review schema
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Kids Judge Bett"
          },
          "reviewBody": "Very fun and engaging, and will cater fun for all children!"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Bett2025 Lab Manager"
          },
          "reviewBody": "The feeling of the lab was amazing. Being able to train students in practicals remotely not only saves our glassware/equipment but gives students an extra space to learn lab skills effectively."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Bett2025 Teacher"
          },
          "reviewBody": "The automated grading on a curve with a wide range of student outcomes is incredible. It saves me so much time and targets our learning objectives perfectly."
        }
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is WhimsyLabs virtual lab software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WhimsyLabs is a sandbox virtual laboratory simulation that gives you the freedom to explore, play and learn scientific concepts firsthand. It accurately models biological, chemical, and physical reactions and processes, providing a true-to-life experience."
        }
      },
      {
        "@type": "Question",
        "name": "How do virtual labs help students learn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Virtual labs help students learn by providing hands-on experience without the limitations and risks of a real lab. They allow students to explore and experiment with various scientific phenomena and equipment, building laboratory skills that transfer to physical labs. Our AI-supported tutor provides instant feedback to improve learning outcomes."
        }
      },
      {
        "@type": "Question",
        "name": "Can WhimsyLabs virtual labs be used for remote teaching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, WhimsyLabs is specifically designed for both in-classroom and remote teaching scenarios. Students can access the virtual labs from anywhere, on desktop, mobile, or VR devices, making it perfect for distance learning, homework assignments, and self-paced study."
        }
      },
      {
        "@type": "Question",
        "name": "What subjects do WhimsyLabs virtual labs cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "WhimsyLabs covers Biology, Chemistry, and Physics with accurately modeled experiments and simulations. Our virtual labs allow students to perform dissections, chemical reactions, and physics experiments in a safe, controlled environment."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are the simulations in WhimsyLabs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every biological, chemical, and physical reaction and process in WhimsyLabs is accurately modeled, providing users with a true-to-life sandbox experience that mirrors real-world laboratory conditions and risks. Our realistic physics engine ensures that each movement and interaction closely replicates the physical feel and response."
        }
      }
    ]
  };

  // Blog post schema (only for blog post pages)
  const getBlogPostSchema = (slug) => {
    // This would ideally be dynamically generated based on the actual blog post data
    // For now, we'll use placeholder data
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "A Blog Post from WhimsyLabs",
      "image": `${baseUrl}/logo.png`,
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01",
      "author": {
        "@type": "Organization",
        "name": "WhimsyLabs"
      },
      "publisher": {
        "@type": "Organization",
        "name": "WhimsyLabs",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "url": `${baseUrl}${currentPath}`,
      "description": "A blog post about virtual laboratory technology and STEM education."
    };
  };

  // Course schema for educational content
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Virtual Laboratory Skills",
    "description": "Learn laboratory skills in a safe, virtual environment with WhimsyLabs. This course covers basic to advanced lab techniques across Biology, Chemistry, and Physics.",
    "provider": {
      "@type": "Organization",
      "name": "WhimsyLabs",
      "sameAs": baseUrl
    }
  };

  // Determine which schemas to include based on the current page
  let schemasToInclude = [organizationSchema]; // Include organization schema on all pages

  if (currentPath === '/') {
    schemasToInclude.push(productSchema, reviewsSchema, faqSchema);
  } else if (currentPath === '/services') {
    schemasToInclude.push(productSchema, courseSchema);
  } else if (currentPath === '/features') {
    schemasToInclude.push(productSchema);
  } else if (currentPath === '/faq') {
    schemasToInclude.push(faqSchema); // Add FAQ schema to the dedicated FAQ page
  } else if (currentPath.startsWith('/blog')) {
    if (currentPath !== '/blog') {
      // This is a specific blog post
      schemasToInclude.push(getBlogPostSchema(currentPath.replace('/blog/', '')));
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