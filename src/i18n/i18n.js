import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations';

// Get current language from URL path
function getCurrentLanguage() {
  if (typeof window === 'undefined') return 'en';
  
  const path = window.location.pathname;
  const langCode = path.split('/')[1];

  return ['en', 'es', 'fr', 'de', 'ja', 'th'].includes(langCode) ? langCode : 'en';
}

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: getCurrentLanguage(),
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    react: {
      useSuspense: false, // Disable suspense for SSR compatibility
    }
  });

export default i18n;