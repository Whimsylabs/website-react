// Use CommonJS for Node.js compatibility during build
const translations = {
  en: require("./faq/en").default || require("./faq/en"),
  es: require("./faq/es").default || require("./faq/es"),
  fr: require("./faq/fr").default || require("./faq/fr"),
  de: require("./faq/de").default || require("./faq/de"),
};

const extractSchemaFAQData = (language) => {
  // Default to English if language not found, or use the provided language
  const targetLang = translations[language] ? language : 'en';
  const langData = translations[targetLang];

  if (!langData || !langData.faqs) {
    // Should not happen if en is present, but good for safety
    throw new Error(`Translations not found for language: ${targetLang}`);
  }

  // Get ALL FAQ keys from the translations
  const allFAQKeys = Object.keys(langData.faqs);

  // Map all FAQ items for schema
  return allFAQKeys.map((key) => {
    const item = langData.faqs[key];
    if (!item) {
      // Fallback to English if specific item is missing in target language
      return translations.en.faqs[key];
    }
    return item;
  }).filter(item => item && item.question && item.answer); // Filter out any invalid items
};

// Export for both CommonJS (build.js) and ES modules (React)
module.exports = { extractSchemaFAQData };
// ES6 export for React components (handled by Babel)
if (typeof exports !== 'undefined') {
  exports.extractSchemaFAQData = extractSchemaFAQData;
}
