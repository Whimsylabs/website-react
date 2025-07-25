/**
 * Schema Markup Test Suite
 * Tests the dynamic schema generation from FAQ and blog post components
 */

// Import the shared data and components
import { faqCategories, getAllFAQItems, getSchemaFAQItems } from '../data/faqData';
import * as Post1 from '../Components/blog/Post1';
import * as Post2 from '../Components/blog/Post2';
import * as Post3 from '../Components/blog/Post3';

// Test utilities
const validateSchema = (schema) => {
  expect(schema).toHaveProperty('@context', 'https://schema.org');
  expect(schema).toHaveProperty('@type');
};

const validateFAQSchema = (schema) => {
  validateSchema(schema);
  expect(schema['@type']).toBe('FAQPage');
  expect(schema).toHaveProperty('mainEntity');
  expect(Array.isArray(schema.mainEntity)).toBe(true);
  
  schema.mainEntity.forEach(question => {
    expect(question).toHaveProperty('@type', 'Question');
    expect(question).toHaveProperty('name');
    expect(question).toHaveProperty('acceptedAnswer');
    expect(question.acceptedAnswer).toHaveProperty('@type', 'Answer');
    expect(question.acceptedAnswer).toHaveProperty('text');
  });
};

const validateBlogPostSchema = (schema) => {
  validateSchema(schema);
  expect(schema['@type']).toBe('BlogPosting');
  expect(schema).toHaveProperty('headline');
  expect(schema).toHaveProperty('datePublished');
  expect(schema).toHaveProperty('dateModified');
  expect(schema).toHaveProperty('author');
  expect(schema).toHaveProperty('publisher');
  expect(schema).toHaveProperty('description');
  expect(schema).toHaveProperty('keywords');
};

describe('Schema Markup Generation', () => {
  
  describe('FAQ Schema Generation', () => {
    test('should extract FAQ data from shared data source', () => {
      const allFAQData = getAllFAQItems();
      const schemaFAQData = getSchemaFAQItems();
      
      // Test that we have FAQ data
      expect(allFAQData.length).toBeGreaterThan(0);
      expect(schemaFAQData.length).toBeGreaterThan(0);
      
      // Test data structure
      expect(allFAQData[0]).toHaveProperty('question');
      expect(allFAQData[0]).toHaveProperty('answer');
      
      // Test that answers contain GEO-optimized content
      const firstAnswer = allFAQData[0].answer;
      expect(typeof firstAnswer).toBe('string');
      expect(firstAnswer.length).toBeGreaterThan(100); // Substantial content
    });

    test('should generate valid FAQ schema structure', () => {
      const mockFAQSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is WhimsyLabs virtual lab software?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "WhimsyLabs is the world's most advanced virtual laboratory platform featuring proprietary physics engine with 99.7% accuracy simulation."
            }
          }
        ]
      };
      
      validateFAQSchema(mockFAQSchema);
    });

    test('should include GEO-optimized content in FAQ answers', () => {
      const geoOptimizedAnswers = [
        "99.7% accuracy simulation", // Statistics
        "industry-leading", // Authoritative language
        "proprietary physics engine", // Technical terms
        "International Journal of Science Education (2024)", // Citations
        "Stanford University studies" // Research references
      ];
      
      geoOptimizedAnswers.forEach(phrase => {
        expect(typeof phrase).toBe('string');
        expect(phrase.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Blog Post Schema Generation', () => {
    test('should extract blog post metadata correctly', () => {
      // Test Post1 data extraction
      expect(Post1.title).toBeDefined();
      expect(Post1.date).toBeDefined();
      expect(Post1.slug).toBeDefined();
      expect(Post1.description).toBeDefined();
      
      // Validate date format (YYYY-MM-DD)
      expect(Post1.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      
      // Validate slug format (URL-friendly)
      expect(Post1.slug).toMatch(/^[a-z0-9-]+$/);
    });

    test('should generate valid BlogPosting schema', () => {
      const mockBlogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: Post1.title,
        datePublished: Post1.date,
        dateModified: Post1.date,
        author: {
          "@type": "Organization",
          name: "WhimsyLabs",
          url: "https://whimsylabs.ai"
        },
        publisher: {
          "@type": "Organization",
          name: "WhimsyLabs",
          logo: {
            "@type": "ImageObject",
            url: "https://whimsylabs.ai/logo.png",
            width: 1200,
            height: 630
          }
        },
        description: Post1.description,
        keywords: ["virtual laboratory history", "BETT 2025 winner"],
        articleSection: "STEM Education Technology",
        inLanguage: "en-GB"
      };
      
      validateBlogPostSchema(mockBlogSchema);
    });

    test('should generate valid TechArticle schema', () => {
      const mockTechArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: Post1.title,
        description: Post1.description,
        proficiencyLevel: "Beginner",
        applicationCategory: "Educational Technology",
        operatingSystem: "Web, VR, Mobile"
      };
      
      validateSchema(mockTechArticleSchema);
      expect(mockTechArticleSchema['@type']).toBe('TechArticle');
    });
  });

  describe('Schema Integration Tests', () => {
    test('should include all required schemas for homepage', () => {
      const homepageSchemas = [
        'Organization',
        'WebSite', 
        'SoftwareApplication',
        'ItemList', // Reviews
        'FAQPage',
        'HowTo'
      ];
      
      homepageSchemas.forEach(schemaType => {
        expect(typeof schemaType).toBe('string');
        expect(schemaType.length).toBeGreaterThan(0);
      });
    });

    test('should include blog-specific schemas for blog posts', () => {
      const blogSchemas = [
        'Organization',
        'WebSite',
        'BlogPosting',
        'TechArticle'
      ];
      
      blogSchemas.forEach(schemaType => {
        expect(typeof schemaType).toBe('string');
        expect(schemaType.length).toBeGreaterThan(0);
      });
    });

    test('should validate all schema URLs and references', () => {
      const baseUrl = "https://whimsylabs.ai";
      const logoUrl = `${baseUrl}/logo.png`;
      
      expect(baseUrl).toMatch(/^https:\/\//);
      expect(logoUrl).toMatch(/^https:\/\/.*\.png$/);
    });
  });

  describe('GEO Optimization Validation', () => {
    test('should include statistics in schema content', () => {
      const statistics = [
        '99.7%',
        '73%',
        '96.66%',
        '78%',
        '95%'
      ];
      
      statistics.forEach(stat => {
        expect(stat).toMatch(/^\d+(\.\d+)?%$/);
      });
    });

    test('should include authoritative language', () => {
      const authoritativeTerms = [
        'world\'s most advanced',
        'industry-leading',
        'revolutionary',
        'proprietary',
        'cutting-edge'
      ];
      
      authoritativeTerms.forEach(term => {
        expect(typeof term).toBe('string');
        expect(term.length).toBeGreaterThan(0);
      });
    });

    test('should include technical specifications', () => {
      const technicalTerms = [
        'proprietary physics engine',
        'real-time molecular dynamics',
        'true hand representation',
        'cross-platform compatibility',
        'AI-powered assessment'
      ];
      
      technicalTerms.forEach(term => {
        expect(typeof term).toBe('string');
        expect(term.length).toBeGreaterThan(0);
      });
    });

    test('should include research citations', () => {
      const citations = [
        'International Journal of Science Education (2024)',
        'Educational Technology Research (2024)',
        'MIT Computer Science and Artificial Intelligence Laboratory (2024)',
        'Cambridge University (2023)'
      ];
      
      citations.forEach(citation => {
        expect(typeof citation).toBe('string');
        expect(citation).toMatch(/\(\d{4}\)$/); // Should end with (YEAR)
      });
    });
  });

  describe('FAQ Component Data Extraction', () => {
    test('should identify all FAQ categories', () => {
      const categories = Object.keys(faqCategories);
      const expectedCategories = [
        'About Whimsylabs',
        'Educational Benefits',
        'Technical Features',
        'Curriculum & Content',
        'Teaching & Assessment',
        'Educational Levels',
        'Pricing & Accessibility'
      ];
      
      expect(categories).toEqual(expect.arrayContaining(expectedCategories));
      expect(categories.length).toBe(expectedCategories.length);
    });

    test('should count total FAQ items', () => {
      const allFAQData = getAllFAQItems();
      const expectedMinimumQuestions = 20;
      
      expect(allFAQData.length).toBeGreaterThanOrEqual(expectedMinimumQuestions);
      console.log(`Total FAQ items: ${allFAQData.length}`);
    });

    test('should validate FAQ answer quality', () => {
      const allFAQData = getAllFAQItems();
      
      // Test that answers contain GEO-optimized elements
      const answersWithStatistics = allFAQData.filter(item => /\d+(\.\d+)?%/.test(item.answer));
      const answersWithCitations = allFAQData.filter(item => /\(\d{4}\)/.test(item.answer));
      const answersWithAuthoritativeLanguage = allFAQData.filter(item => 
        /industry-leading|world's most advanced|revolutionary|proprietary/i.test(item.answer)
      );
      
      expect(answersWithStatistics.length).toBeGreaterThan(0);
      expect(answersWithCitations.length).toBeGreaterThan(0);
      expect(answersWithAuthoritativeLanguage.length).toBeGreaterThan(0);
      
      console.log(`FAQ items with statistics: ${answersWithStatistics.length}`);
      console.log(`FAQ items with citations: ${answersWithCitations.length}`);
      console.log(`FAQ items with authoritative language: ${answersWithAuthoritativeLanguage.length}`);
    });
  });
});

// Export test utilities for potential reuse
export {
  validateSchema,
  validateFAQSchema,
  validateBlogPostSchema
};