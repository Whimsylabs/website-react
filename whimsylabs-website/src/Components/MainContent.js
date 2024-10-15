import React from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSection from './FeaturesSection';
import './MainContent.css';

const MainContent = () => {
  return (
    <div className="container-fluid text-center p-0">
      <WelcomeSection />
      <FeaturesSection />
    </div>
  );
};

export default MainContent;