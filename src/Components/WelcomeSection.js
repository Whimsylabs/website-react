import React, { useEffect } from 'react';
import './WelcomeSection.css';
import logo from './images/logo.png'; // Import the logo image file
import ContactUs from './ContactUs';

const WelcomeSection = ({ 
  titleText = "Welcome to WhimsyLabs Virtual Lab Software!", 
  bodyText = "WhimsyLabs provides award-winning virtual laboratory software that gives educators and students the freedom to explore, play and learn scientific concepts firsthand. Whether you're teaching Biology, Chemistry, or Physics, our online lab simulations let students experiment with scientific phenomena and equipment without the limitations and risks of a physical lab. Our STEM virtual labs for schools help students build laboratory skills safely while providing educators with powerful assessment tools." 
}) => {
    useEffect(() => {
      const text = document.querySelector(".wave-text");
      if (text) {
        text.innerHTML = text.textContent
          .split("")
          .map((char, index) => {
            const style = `display: inline-block; animation: wave 2.5s ease-in-out infinite; animation-delay: ${index * 0.05}s`;
            return `<span style="${style}">${char}</span>`;
          })
          .join("");
      }
    }, [titleText]);

  return (
    <section id="tiled-1" className="welcome-section">
      <div className="container py-3 d-flex align-items-center justify-content-center">
        <img src={logo} alt="WhimsyLabs Virtual Lab Software Logo" className="logo me-3" />
        <div className="text-container">
          <h1 className="wave-text">{titleText}</h1>
          <div className="text-justify">
            <p className="justified-text">
                {bodyText}
            </p>
          </div>
        </div>
      </div>
      <ContactUs />
    </section>
  );
};

export default WelcomeSection;