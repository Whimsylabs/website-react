import React, { useState } from 'react';
import './Header.css';
import LanguageSwitcher from './LanguageSwitcher';
import withTranslation from './withTranslation';
import { getLocalizedPath } from '../i18n';
// Logo now served from public directory

const Header = ({ t, currentLang }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pdfPath = 'https://storage.googleapis.com/phoenix-application-storage-fine-grained/Hyve/Bett/Bett2025/assets/USER_INPUT/d4ad42d1-e67a-44ff-9c8f-46d4b26622ea?ts=1734104814440';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={`header-container ${menuOpen ? 'menu-active' : ''}`} aria-label="Main site navigation">
            <div className="logo-container">
                <img src="/images/logo.png" alt="Whimsylabs Logo" className="logo" />
            </div>
            
            <div className="mobile-controls">
                <div className="mobile-language-switcher">
                    <LanguageSwitcher />
                </div>
                <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle navigation menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            
            <ul className={`nav nav-pills ${menuOpen ? 'menu-open' : ''}`} aria-label="Primary navigation">
                <li className="nav-item">
                    <a href={getLocalizedPath('/', currentLang)} className="nav-link" aria-label={t('nav.home')} onClick={() => setMenuOpen(false)}>
                        {t('nav.home')}
                    </a>
                </li>
                <li className="nav-item">
                    <a href={pdfPath} download className="nav-link" aria-label="Download Features PDF" onClick={() => setMenuOpen(false)}>
                        Features PDF
                    </a>
                </li>
                {/* Pricing temporarily disabled */}
                {/* <li className="nav-item">
                    <a href="/pricing/" className="nav-link" aria-label="View Pricing" onClick={() => setMenuOpen(false)}>
                        Pricing
                    </a>
                </li> */}
                <li className="nav-item">
                    <a href={getLocalizedPath('/contact', currentLang)} className="nav-link" aria-label={t('nav.contact')} onClick={() => setMenuOpen(false)}>
                        {t('nav.contact')}
                    </a>
                </li>
                <li className="nav-item">
                    <a href={getLocalizedPath('/blog', currentLang)} className="nav-link" aria-label={t('nav.blog')} onClick={() => setMenuOpen(false)}>
                        {t('nav.blog')}
                    </a>
                </li>
                {/* Ignite Pitch temporarily disabled */}
                {/* <li className="nav-item">
                    <a href="/ignite-pitch/" className="nav-link" aria-label="Ignite Pitch Deck" onClick={() => setMenuOpen(false)}>
                        Ignite Pitch
                    </a>
                </li> */}
                <li className="nav-item">
                    <a href={getLocalizedPath('/faq', currentLang)} className="nav-link" aria-label={t('nav.faq')} onClick={() => setMenuOpen(false)}>
                        {t('nav.faq')}
                    </a>
                </li>
                <li className="nav-item language-switcher-nav">
                    <LanguageSwitcher />
                </li>
            </ul>
        </header>
    );
};

export default withTranslation(Header);