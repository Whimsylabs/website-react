import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import logo from './images/logo.png'; // Import the logo image file

const Header = () => {
  const location = useLocation(); // Get the current path

  return (
    <header className="header-container">
      <div className="logo-container">
        <img src={logo} alt="Whimsylabs Logo" className="logo" />
      </div>
      <ul className="nav nav-pills">
        {/* Dynamically apply the "active" class based on the current location */}
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="#features"
            className={`nav-link ${location.hash === '#features' ? 'active' : ''}`}
          >
            Features
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#mission"
            className={`nav-link ${location.hash === '#mission' ? 'active' : ''}`}
          >
            Mission
          </a>
        </li>
        <li className="nav-item">
          <a href="mailto:inquiries@whimsylabs.ai" className="nav-link">
            Contact
          </a>
        </li>
        <li className="nav-item">
          <Link
            to="/blog"
            className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}
          >
            Blog
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
