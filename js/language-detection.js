
// Language detection and routing for WhimsyLabs
(function() {
  'use strict';
  
  const SUPPORTED_LANGUAGES = ["en","es","fr","de","jp"];
  const DEFAULT_LANGUAGE = 'en';
  
  function getCurrentLanguageFromPath() {
    const path = window.location.pathname;
    const langCode = path.split('/')[1];
    return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
  }
  
  function getBrowserLanguage() {
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;
  }
  
  function shouldRedirectForLanguage() {
    const currentLang = getCurrentLanguageFromPath();
    const browserLang = getBrowserLanguage();
    const isRootPath = window.location.pathname === '/';
    
    // Only redirect from root path and if browser language is different
    return isRootPath && browserLang !== DEFAULT_LANGUAGE && currentLang === DEFAULT_LANGUAGE;
  }
  
  // Initialize language detection
  if (shouldRedirectForLanguage()) {
    const browserLang = getBrowserLanguage();
    const newPath = '/' + browserLang + '/';
    
    // Use replace to avoid adding to history
    window.location.replace(newPath);
  }
  
  // Make language utilities available globally
  window.WhimsyLabsI18n = {
    getCurrentLanguage: getCurrentLanguageFromPath,
    getBrowserLanguage: getBrowserLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    defaultLanguage: DEFAULT_LANGUAGE
  };
})();
