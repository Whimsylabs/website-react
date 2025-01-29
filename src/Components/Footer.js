import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container" aria-labelledby="footer-heading">
            <p>© 2025 Whimsylabs – Virtual Laboratory Solutions</p>
            <ul className="footer-links" aria-label="Footer navigation">
                <li><Link to="/" className="nav-link" aria-label="Navigate to Home">Home</Link></li>
                {/* <li><Link to="/about" className="nav-link" aria-label="Learn About Us">About</Link></li> */}
                <li><Link to="/services" className="nav-link" aria-label="View Our Services">Services</Link></li>
                <li><a href="mailto:inquiries@whimsylabs.ai" className="nav-link" aria-label="Contact Us via Email">Contact</a></li>
                <li><Link to="/blog" className="nav-link" aria-label="Visit Our Blog">Blog</Link></li>
            </ul>
        </footer>
    );
};

export default Footer;
