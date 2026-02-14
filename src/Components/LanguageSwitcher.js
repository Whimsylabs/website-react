import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES, getCurrentLanguage, getLocalizedPath } from '../i18n';
import './LanguageSwitcher.css';

const LanguageSwitcher = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = getCurrentLanguage();
  const currentLanguage = SUPPORTED_LANGUAGES[currentLang];

  const handleLanguageChange = (langCode) => {
    // Get the current path from window.location if not provided
    const pathToUse = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const newPath = getLocalizedPath(pathToUse, langCode);
    window.location.href = newPath;
  };

  return (
    <div className="language-switcher">
      <button 
        className="language-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-code">{currentLanguage.code.toUpperCase()}</span>
        <span className={`language-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {Object.values(SUPPORTED_LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${lang.code === currentLang ? 'active' : ''}`}
              onClick={() => {
                handleLanguageChange(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;