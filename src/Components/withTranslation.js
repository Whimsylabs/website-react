import React from 'react';
import { getCurrentLanguage } from '../i18n';
import { useTranslation } from '../i18n/translations';

// Higher-order component to provide translation functionality
const withTranslation = (WrappedComponent) => {
  return function TranslatedComponent(props) {
    const currentLang = getCurrentLanguage();
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