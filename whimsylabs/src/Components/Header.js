import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-end py-3 mb-0">
      <ul className="nav nav-pills">
        <li className="nav-item px-5"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
        <li className="nav-item px-5"><a href="#" className="nav-link">Home</a></li>
        <li className="nav-item px-5"><a href="#" className="nav-link">Home</a></li>
        <li className="nav-item px-5"><a href="#" className="nav-link">Home</a></li>
      </ul>
    </header>
  );
};

export default Header;
