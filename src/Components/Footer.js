import React from 'react';
import './Footer.css';
// Icons now served from public directory

const Footer = () => {
    return (
        <footer className="footer-container" aria-labelledby="footer-heading">
            <p>© 2025 Whimsylabs – Virtual Laboratory Solutions</p>
            <ul className="footer-links" aria-label="Footer navigation">
                <li><a href="/" className="nav-link" aria-label="Navigate to Home">Home</a></li>
                <li><a href="/services/" className="nav-link" aria-label="View Our Services">Services</a></li>
                <li><a href="/contact/" className="nav-link" aria-label="Contact Us via Email">Contact</a></li>
                <li><a href="/blog/" className="nav-link" aria-label="Visit Our Blog">Blog</a></li>
                <li><a href="/faq/" className="nav-link" aria-label="Frequently Asked Questions">FAQ</a></li>
            </ul>
            
            {/* Social Media Icons */}
            <div className="social-icons">
                <a href="https://bsky.app/profile/whimsylabs.bsky.social" target="_blank" rel="noopener noreferrer" aria-label="Visit our Bluesky profile">
                    <img src="/images/blueskylogosmall.png" alt="Bluesky logo" className="social-icon"/>
                </a>
                <a href="https://www.youtube.com/@whimsylabs" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                    <img src="/images/youtube-iconsmalll.png" alt="YouTube logo" className="social-icon"/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
