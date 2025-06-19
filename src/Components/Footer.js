import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import blueskyLogo from './images/blueskylogosmall.png';
import youtubeIcon from './images/youtube-iconsmalll.png';

const Footer = () => {
    return (
        <footer className="footer-container" aria-labelledby="footer-heading">
            <p>© 2025 Whimsylabs – Virtual Laboratory Solutions</p>
            <ul className="footer-links" aria-label="Footer navigation">
                <li><Link to="/" className="nav-link" aria-label="Navigate to Home">Home</Link></li>
                <li><Link to="/services" className="nav-link" aria-label="View Our Services">Services</Link></li>
                <li><a href="mailto:inquiries@whimsylabs.ai" className="nav-link" aria-label="Contact Us via Email">Contact</a></li>
                <li><Link to="/blog" className="nav-link" aria-label="Visit Our Blog">Blog</Link></li>
                <li><Link to="/faq" className="nav-link" aria-label="Frequently Asked Questions">FAQ</Link></li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="social-icons">
                <a href="https://bsky.app/profile/whimsylabs.bsky.social" target="_blank" rel="noopener noreferrer" aria-label="Visit our Bluesky profile">
                    <img src={blueskyLogo} alt="Bluesky logo" className="social-icon"/>
                </a>
                <a href="https://www.youtube.com/@whimsylabs" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                    <img src={youtubeIcon} alt="YouTube logo" className="social-icon"/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
