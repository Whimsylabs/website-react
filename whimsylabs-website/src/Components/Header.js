import React from 'react';
import './Header.css';
import logo from './images/logo.png'; // Import the logo image file

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-container">
        <img src={logo} alt="Whimsylabs Logo" className="logo" />
      </div>
      <ul className="nav nav-pills">
        <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Mission</a></li>
        <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
      </ul>
    </header>
  );
};

export default Header;
