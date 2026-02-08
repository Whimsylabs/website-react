import React from 'react';
import './Footer.css';
import withTranslation from './withTranslation';
import { getLocalizedPath } from '../i18n';
// Icons now served from public directory

const Footer = ({ t, currentLang }) => {
    return (
        <footer className="footer-container" aria-labelledby="footer-heading">
            <p>{t('footer.copyright')}</p>
            <ul className="footer-links" aria-label={t('footer.navigation')}>
                <li><a href={getLocalizedPath("/", currentLang)} className="nav-link" aria-label={t('footer.homeLabel')}>{t('footer.home')}</a></li>
                <li><a href={getLocalizedPath("/features", currentLang)} className="nav-link" aria-label={t('footer.featuresLabel')}>{t('footer.features')}</a></li>
                <li><a href={getLocalizedPath("/services", currentLang)} className="nav-link" aria-label={t('footer.servicesLabel')}>{t('footer.services')}</a></li>
                <li><a href={getLocalizedPath("/bett", currentLang)} className="nav-link" aria-label={t('footer.bettLabel')}>{t('footer.bett')}</a></li>
                <li><a href={getLocalizedPath("/contact", currentLang)} className="nav-link" aria-label={t('footer.contactLabel')}>{t('footer.contact')}</a></li>
                <li><a href={getLocalizedPath("/blog", currentLang)} className="nav-link" aria-label={t('footer.blogLabel')}>{t('footer.blog')}</a></li>
                <li><a href={getLocalizedPath("/faq", currentLang)} className="nav-link" aria-label={t('footer.faqLabel')}>{t('footer.faq')}</a></li>
                <li><a href={getLocalizedPath("/privacy", currentLang)} className="nav-link" aria-label={t('footer.privacyLabel')}>{t('footer.privacy')}</a></li>
                <li><a href={getLocalizedPath("/data-security", currentLang)} className="nav-link" aria-label="Data Security">Data Security</a></li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="social-icons">
                <a href="https://bsky.app/profile/whimsylabs.bsky.social" target="_blank" rel="noopener noreferrer" aria-label={t('footer.blueskyLabel')}>
                    <img src="/images/blueskylogosmall.png" alt={t('footer.blueskyAlt')} className="social-icon"/>
                </a>
                <a href="https://www.youtube.com/@whimsylabs" target="_blank" rel="noopener noreferrer" aria-label={t('footer.youtubeLabel')}>
                    <img src="/images/youtube-iconsmalll.png" alt={t('footer.youtubeAlt')} className="social-icon"/>
                </a>
            </div>
        </footer>
    );
};

export default withTranslation(Footer);
