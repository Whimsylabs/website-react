import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from './images/logo.png';

const Header = () => {
    const location = useLocation();
    const pdfPath = 'https://storage.googleapis.com/phoenix-application-storage-fine-grained/Hyve/Bett/Bett2025/assets/USER_INPUT/d4ad42d1-e67a-44ff-9c8f-46d4b26622ea?ts=1734104814440';

    return (
        <header className="header-container" aria-label="Main site navigation">
            <div className="logo-container">
                <img src={logo} alt="Whimsylabs Logo" className="logo" />
            </div>
            <ul className="nav nav-pills" aria-label="Primary navigation">
                <li className="nav-item">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current={location.pathname === '/' ? 'page' : undefined}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <a href={pdfPath} download className="nav-link" aria-label="Download Features PDF">
                        Features PDF
                    </a>
                </li>
                <li className="nav-item">
                <a href="mailto:inquiries@whimsylabs.ai" className="nav-link" aria-label="Contact Us">
                    Contact
                </a>
                </li>
                <li className="nav-item">
                    <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`} aria-label="Read Our Blog">
                        Blog
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/faq" className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`} aria-label="Frequently Asked Questions">
                        FAQ
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;