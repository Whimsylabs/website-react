import en from "./faq/en";
import es from "./faq/es";
import fr from "./faq/fr";
import de from "./faq/de";

const translations = {
  en,
  es,
  fr,
  de,
};

// Keys corresponding to the items selected in getSchemaFAQItems in src/data/faqData.js
const schemaFAQKeys = [
  "what-is-whimsylabs-virtual-lab-software",
  "what-makes-whimsylabs-different-from-other-virtual",
  "how-do-virtual-labs-help-students-learn",
  "how-does-whimsylabs-compare-to-traditional-labs",
  "how-accurate-are-the-simulations-in-whimsylabs",
  "how-does-whimsylabs-web-and-vr-environment-work",
  "what-subjects-do-whimsylabs-virtual-labs-cover",
  "can-whimsylabs-virtual-labs-be-used-for-remote-tea",
];

export const extractSchemaFAQData = (language) => {
  // Default to English if language not found, or use the provided language
  const targetLang = translations[language] ? language : 'en';
  const langData = translations[targetLang];
  
  if (!langData || !langData.faqs) {
    // Should not happen if en is present, but good for safety
    throw new Error(`Translations not found for language: ${targetLang}`);
  }

  return schemaFAQKeys.map((key) => {
    const item = langData.faqs[key];
    if (!item) {
      // Fallback to English if specific item is missing in target language
      return translations.en.faqs[key];
    }
    return item;
  });
};
