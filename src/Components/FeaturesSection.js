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
            description="Every biological, chemical and physical reaction and process is accurately modelled, providing users with a true-to-life sandbox experience that mirrors real world laboratory conditions and risks. Explore science firsthand with the freedom of a fully simulated open lab to explore in!"
          />
        </div>
        <div className="col-4">
          <Feature
            imgSrc={catVr}
            title="VR/DESKTOP/ON THE GO ACCESS"
            description="Our platform's realistic physics engine ensures that each movement and interaction within the virtual lab closely replicates the physical feel and response, enhancing muscle memory and practical skill acquisition. Use our desktop/mobile versions for on the go and ease of use access!"
            delay={0.25}
          />
        </div>
        <div className="col-4">
          <Feature
            imgSrc={catBrain}
            title="AI SUPPORTED TUTOR AND ASSESSOR"
            description="Elevate learning effectiveness with AI-driven assessment. Instant, detailed feedback on users' actions gives measurable improvements in learning ability and proficiency. We support both teachers by saving them time and students by improving their learning!"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
