import React, { useEffect } from 'react';
import './WelcomeSection.css';
// Logo now served from public directory
import ContactUs from './ContactUs';
import withTranslation from './withTranslation';

const WelcomeSection = ({ t }) => {
  const titleText = t('home.welcomeTitle');
  const bodyText = t('home.welcomeText');
  
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
        <img src="/images/logo.png" alt="WhimsyLabs Virtual Lab Software Logo" className="logo me-3" />
        <div className="text-container">
          <h1 className="wave-text">{titleText}</h1>
          <div className="text-justify">
            <p className="justified-text">
                {bodyText}
            </p>
          </div>
        </div>
      </div>
      <ContactUs buttonText={t('home.joinPilot')} />
    </section>
  );
};

export default withTranslation(WelcomeSection);