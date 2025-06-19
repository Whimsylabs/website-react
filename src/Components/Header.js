import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from './images/logo.png';

const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const pdfPath = 'https://storage.googleapis.com/phoenix-application-storage-fine-grained/Hyve/Bett/Bett2025/assets/USER_INPUT/d4ad42d1-e67a-44ff-9c8f-46d4b26622ea?ts=1734104814440';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={`header-container ${menuOpen ? 'menu-active' : ''}`} aria-label="Main site navigation">
            <div className="logo-container">
                <img src={logo} alt="Whimsylabs Logo" className="logo" />
            </div>
            
            <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <ul className={`nav nav-pills ${menuOpen ? 'menu-open' : ''}`} aria-label="Primary navigation">
                <li className="nav-item">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current={location.pathname === '/' ? 'page' : undefined} onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <a href={pdfPath} download className="nav-link" aria-label="Download Features PDF" onClick={() => setMenuOpen(false)}>
                        Features PDF
                    </a>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} aria-label="Contact Us" onClick={() => setMenuOpen(false)}>
                        Contact
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`} aria-label="Read Our Blog" onClick={() => setMenuOpen(false)}>
                        Blog
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/faq" className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`} aria-label="Frequently Asked Questions" onClick={() => setMenuOpen(false)}>
                        FAQ
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;