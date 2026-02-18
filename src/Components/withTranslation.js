import React from 'react';
import { getCurrentLanguage } from '../i18n';
import { useTranslation } from '../i18n/translations';

// Higher-order component to provide translation functionality
const withTranslation = (WrappedComponent) => {
  return function TranslatedComponent(props) {
    // Use language from props (for SSR) or detect from URL (for client-side)
    // Check both 'language' and 'currentLang' props since components may use either
    const currentLang = props.language || props.currentLang || getCurrentLanguage();
    const { t } = useTranslation(currentLang);
    

    
    return (
      <WrappedComponent 
        {...props} 
        t={t} 
        currentLang={currentLang}
      />
    );
  };
};

export default withTranslation;