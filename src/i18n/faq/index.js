// FAQ translations index
import en from './en.js';
import es from './es.js';
import fr from './fr.js';
import de from './de.js';

const faqTranslations = {
  en,
  es,
  fr,
  de
};

export default faqTranslations;

// Helper function to get FAQ data for a specific language
export const getFAQTranslations = (language = 'en') => {
  return faqTranslations[language] || faqTranslations.en;
};
