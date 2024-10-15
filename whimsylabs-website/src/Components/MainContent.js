import React from 'react';
import Feature from './Feature';
import './MainContent.css';

const MainContent = () => {
  return (
    <div className="container-fluid text-center p-0">
      <div id="tiled-1">
        <div className="container py-3">
          <div className="row">
            <div className="col-md-4 col-sm-12 text-center mb-3">
              <img src="/images/logo.svg" className="img-fluid" alt="WhimsyLabs Logo" />
            </div>
            <div className="col-md-8 col-sm-12">
              <h1>Welcome to WhimsyLabs!</h1>
              <div className="text-justify">
                <p>
                  Whimsylabs is a sandbox virtual laboratory in VR, desktop and mobile...
                </p>
                <p>
                  Founded by a team of passionate individuals...
                </p>
              </div>
            </div>
          </div>
        </div>
        <a href="mailto:whimsylaboratories@gmail.com" className="btn contact-us" type="button">
          Contact Us
        </a>
      </div>

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
    </div>
  );
};

export default MainContent;
