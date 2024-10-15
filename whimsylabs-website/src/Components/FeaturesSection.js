import React from 'react';
import Feature from './Feature';
import './FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h2>OUR UNIQUE FEATURES</h2>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row mt-5">
        <Feature
          imgSrc="/images/cat_beaker.png"
          title="SIMULATION DEPTH and ACCURACY"
          description="Our real-time academic simulations are the result..."
        />
        <Feature
          imgSrc="/images/cat_vr.png"
          title="VR/DESKTOP/ON THE GO ACCESS"
          description="In VR, desktop, and mobile our lab is accessible..."
        />
        <Feature
          imgSrc="/images/cat_brain.png"
          title="AI SUPPORTED TUTOR AND ASSESSOR"
          description="Our software provides a built-in tutor support..."
        />
      </div>
    </div>
  );
};

export default FeaturesSection;