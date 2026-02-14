import React, { useEffect, useState } from 'react';
import './WelcomeSection.css';
// Logo now served from public directory
import ContactUs from './ContactUs';
import AnimatedTitle from './AnimatedTitle';
import withTranslation from './withTranslation';

const WelcomeSection = ({ t }) => {
  const titleText = t('home.welcomeTitle');
  const bodyText = t('home.welcomeText');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="tiled-1" className="welcome-section">
      <div className="container py-3 d-flex align-items-center justify-content-center">
        <img src="/images/logo.png" alt="WhimsyLabs Virtual Lab Software Logo" className="logo me-3" />
        <div className="text-container">
          {mounted ? (
            <AnimatedTitle
              text={titleText}
              className="welcome-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
          ) : (
            <h1 className="welcome-hero-title">{titleText}</h1>
          )}
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