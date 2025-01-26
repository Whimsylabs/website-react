import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="visually-hidden">Footer Navigation</h2>
            <p>© 2025 Whimsylabs – Virtual Laboratory Solutions</p>
            <ul className="footer-links" aria-label="Footer navigation">
                <li><a href="#home" className="nav-link" aria-label="Navigate to Home">Home</a></li>
                <li><a href="#about" className="nav-link" aria-label="Learn About Us">About</a></li>
                <li><a href="#services" className="nav-link" aria-label="View Our Services">Services</a></li>
                <li><a href="mailto:inquiries@whimsylabs.ai" className="nav-link" aria-label="Contact Us via Email">Contact</a></li>
                <li><a href="/blog" className="nav-link" aria-label="Visit Our Blog">Blog</a></li>
            </ul>
        </footer>
    );
};

export default Footer;