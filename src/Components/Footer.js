import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <p>© 2025 WhimsyLabs</p>
            <ul className="footer-links">
                <li><a href="#home" className="nav-link">Home</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#services" className="nav-link">Services</a></li>
                <li>
                    <a href="mailto:inquiries@whimsylabs.ai" className="nav-link">Contact</a>
                </li>
                <li><a href="/blog" className="nav-link">Blog</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
