// FAQ Data Generator for Multilingual Support
// This generates the FAQ data structure in any language using the complete translation files

import faqTranslations from './faq/index.js';
import { faqCategories as originalFaqCategories } from '../data/faqData.js';

// Generate FAQ categories structure for a specific language
export const generateFAQCategories = (language = 'en') => {
  const translations = faqTranslations[language] || faqTranslations.en;
  
  // If it's English, return the original structure
  if (language === 'en') {
    return originalFaqCategories;
  }
  
  // For other languages, build the structure using translations
  const translatedCategories = {};
  
  Object.keys(originalFaqCategories).forEach(originalCategoryName => {
    const translatedCategoryName = translations.categories[originalCategoryName] || originalCategoryName;
    translatedCategories[translatedCategoryName] = [];
    
    originalFaqCategories[originalCategoryName].forEach(originalFaq => {
      // Generate the same key that was used in the translation files
      const faqKey = originalFaq.question
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      
      const translatedFaq = translations.faqs[faqKey];
      
      if (translatedFaq && !translatedFaq.question.startsWith('[TRANSLATE]')) {
        // Use translated version
        translatedCategories[translatedCategoryName].push(translatedFaq);
      } else {
        // Fallback to English if translation not available or not completed
        translatedCategories[translatedCategoryName].push(originalFaq);
      }
    });
  });
  
  return translatedCategories;
};

// Helper function to get all FAQ items as a flat array for a specific language
export const getAllFAQItems = (language = 'en') => {
  const faqCategories = generateFAQCategories(language);
  const allItems = [];
  Object.values(faqCategories).forEach(category => {
    allItems.push(...category);
  });
  return allItems;
};

// Helper function to get FAQ items for schema markup (top priority items)
export const getSchemaFAQItems = (language = 'en') => {
  const faqCategories = generateFAQCategories(language);
  const categories = Object.values(faqCategories);
  
  // Get the first few questions from each major category
  const schemaItems = [];
  
  if (categories[0]) schemaItems.push(categories[0][0]); // About Whimsylabs - What is
  if (categories[0]) schemaItems.push(categories[0][2]); // About Whimsylabs - What makes different
  if (categories[1]) schemaItems.push(categories[1][0]); // Educational Benefits - How help
  if (categories[1]) schemaItems.push(categories[1][1]); // Educational Benefits - Compare traditional
  if (categories[2]) schemaItems.push(categories[2][2]); // Technical Features - Accuracy
  if (categories[2]) schemaItems.push(categories[2][0]); // Technical Features - Web/VR
  if (categories[3]) schemaItems.push(categories[3][0]); // Curriculum - Subjects
  if (categories[4]) schemaItems.push(categories[4][4]); // Teaching - Remote teaching
  
  return schemaItems.filter(Boolean); // Remove any undefined items
};