import React from 'react';
import Feature from './Feature';
import './FeaturesSection.css';
import catBeaker from './images/cat_beaker.png';
import catVr from './images/cat_vr.png';
import catBrain from './images/cat_brain.png';

const FeaturesSection = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="unique-features-heading">OUR UNIQUE FEATURES</h2>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row mt-5">
        <div className="col-4">
          <Feature
            imgSrc={catBeaker}
            title="SIMULATION DEPTH and ACCURACY"
            description="Our real-time academic simulations are the result..."
          />
        </div>
        <div className="col-4">
          <Feature
            imgSrc={catVr}
            title="VR/DESKTOP/ON THE GO ACCESS"
            description="In VR, desktop, and mobile our lab is accessible..."
            delay={0.25}
          />
        </div>
        <div className="col-4">
          <Feature
            imgSrc={catBrain}
            title="AI SUPPORTED TUTOR AND ASSESSOR"
            description="Our software provides a built-in tutor support..."
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
