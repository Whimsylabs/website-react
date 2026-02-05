import React from 'react';
import './Footer.css';
import withTranslation from './withTranslation';
// Icons now served from public directory

const Footer = ({ t }) => {
    return (
        <footer className="footer-container" aria-labelledby="footer-heading">
            <p>{t('footer.copyright')}</p>
            <ul className="footer-links" aria-label={t('footer.navigation')}>
                <li><a href="/" className="nav-link" aria-label={t('footer.homeLabel')}>{t('footer.home')}</a></li>
                <li><a href="/services/" className="nav-link" aria-label={t('footer.servicesLabel')}>{t('footer.services')}</a></li>
                <li><a href="/contact/" className="nav-link" aria-label={t('footer.contactLabel')}>{t('footer.contact')}</a></li>
                <li><a href="/blog/" className="nav-link" aria-label={t('footer.blogLabel')}>{t('footer.blog')}</a></li>
                <li><a href="/faq/" className="nav-link" aria-label={t('footer.faqLabel')}>{t('footer.faq')}</a></li>
                <li><a href="/privacy/" className="nav-link" aria-label={t('footer.privacyLabel')}>{t('footer.privacy')}</a></li>
                <li><a href="/data-security/" className="nav-link" aria-label="Data Security">Data Security</a></li>
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
