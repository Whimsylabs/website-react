// Home data generator - loads home translations for all languages

// Import home translations
const homeEn = require('./home/en.js');
const homeEs = require('./home/es.js');
const homeFr = require('./home/fr.js');
const homeDe = require('./home/de.js');
const homeJa = require('./home/ja.js');
const homeKo = require('./home/ko.js');

const homeTranslations = {
  en: homeEn.default || homeEn,
  es: homeEs.default || homeEs,
  fr: homeFr.default || homeFr,
  de: homeDe.default || homeDe,
  ja: homeJa.default || homeJa,
  ko: homeKo.default || homeKo,
};

/**
 * Get home translations for a specific language
 * @param {string} lang - Language code (en, es, fr, de, ja, ko)
 * @returns {Object} Home translations for the specified language
 */
function getHomeTranslations(lang = 'en') {
  return homeTranslations[lang] || homeTranslations.en;
}

/**
 * Get all home translations
 * @returns {Object} All home translations organized by language
 */
function getAllHomeTranslations() {
  return homeTranslations;
}

// Export for both CommonJS and ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getHomeTranslations,
    getAllHomeTranslations,
    homeTranslations
  };
} else {
  window.getHomeTranslations = getHomeTranslations;
  window.getAllHomeTranslations = getAllHomeTranslations;
  window.homeTranslations = homeTranslations;
}