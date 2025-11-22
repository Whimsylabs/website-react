// Contact data generator - loads contact translations for all languages

// Import contact translations
const contactEn = require('./contact/en.js');
const contactEs = require('./contact/es.js');
const contactFr = require('./contact/fr.js');
const contactDe = require('./contact/de.js');
const contactJa = require('./contact/ja.js');
const contactAr = require('./contact/ar.js');

const contactTranslations = {
  en: contactEn.default || contactEn,
  es: contactEs.default || contactEs,
  fr: contactFr.default || contactFr,
  de: contactDe.default || contactDe,
  ja: contactJa.default || contactJa,
  ar: contactAr.default || contactAr,
};

/**
 * Get contact translations for a specific language
 * @param {string} lang - Language code (en, es, fr, de, ja, ar)
 * @returns {Object} Contact translations for the specified language
 */
function getContactTranslations(lang = 'en') {
  return contactTranslations[lang] || contactTranslations.en;
}

/**
 * Get all contact translations
 * @returns {Object} All contact translations organized by language
 */
function getAllContactTranslations() {
  return contactTranslations;
}

// Export for both CommonJS and ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getContactTranslations,
    getAllContactTranslations,
    contactTranslations
  };
} else {
  window.getContactTranslations = getContactTranslations;
  window.getAllContactTranslations = getAllContactTranslations;
  window.contactTranslations = contactTranslations;
}