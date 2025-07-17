import React, { useState } from 'react';
import './Header.css';
// Logo now served from public directory

const Header = () => {
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
            
            <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <ul className={`nav nav-pills ${menuOpen ? 'menu-open' : ''}`} aria-label="Primary navigation">
                <li className="nav-item">
                    <a href="/" className="nav-link" aria-label="Home" onClick={() => setMenuOpen(false)}>
                        Home
                    </a>
                </li>
                <li className="nav-item">
                    <a href={pdfPath} download className="nav-link" aria-label="Download Features PDF" onClick={() => setMenuOpen(false)}>
                        Features PDF
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/contact/" className="nav-link" aria-label="Contact Us" onClick={() => setMenuOpen(false)}>
                        Contact
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/blog/" className="nav-link" aria-label="Read Our Blog" onClick={() => setMenuOpen(false)}>
                        Blog
                    </a>
                </li>
                <li className="nav-item">
                    <a href="/faq/" className="nav-link" aria-label="Frequently Asked Questions" onClick={() => setMenuOpen(false)}>
                        FAQ
                    </a>
                </li>
            </ul>
        </header>
    );
};

export default Header;