import React, { useEffect } from 'react';
import './WelcomeSection.css';
import logo from './images/logo.png'; // Import the logo image file

const WelcomeSection = () => {
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
    }, []);

  return (
    <div id="tiled-1">
      <div className="container py-3 d-flex align-items-center justify-content-center">
        <img src={logo} alt="Whimsylabs Logo" className="logo me-3" />
        <div className="text-container">
          <h1 className="wave-text">Welcome to WhimsyLabs!</h1>
          <div className="text-justify">
            <p className="justified-text">
                Whimsylabs is a sandbox virtual laboratory simulation that gives you the freedom to explore, play and learn scientific concepts firsthand. Whether you are a student, a teacher, a researcher, or a curious learner, Whimsylabs lets you explore and experiment with various scientific phenomena and equipment, without the limitations and risks of a real lab, building up laboratory skills to enter a physical lab safely.
            </p>
          </div>
        </div>
      </div>
      <a href="mailto:marisa.french@whimsylabs.ai" className="btn contact-us" type="button">
        Contact Us
      </a>
    </div>
  );
};

export default WelcomeSection;