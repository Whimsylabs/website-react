import React from 'react';
import Feature from './Feature';
import './FeaturesSection.css';
import catBeaker from './images/cat_beaker.png';
import catVr from './images/cat_vr.png';
import catBrain from './images/cat_brain.png';

const FeaturesSection = () => {
  return (
    <section className="features-section container" aria-labelledby="features-heading">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 id="features-heading" className="unique-features-heading">OUR UNIQUE VIRTUAL LAB FEATURES</h2>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row mt-5">
        <article className="col-4">
          <Feature
            imgSrc={catBeaker}
            title="Realistic Science Simulations"
            description="Our virtual lab software accurately models every biological, chemical, and physical reaction and process, providing students with a true-to-life sandbox experience that mirrors real-world laboratory conditions. These online lab simulations allow students to explore STEM concepts firsthand in a fully interactive environment."
          />
        </article>
        <article className="col-4">
          <Feature
            imgSrc={catVr}
            title="Multi-Platform Accessibility"
            description="Access our virtual laboratory simulations on any device - VR headsets for immersive learning, desktop computers for classroom use, or mobile devices for on-the-go study. Our realistic physics engine ensures that each interaction closely replicates physical lab experiences, enhancing skill acquisition for students across all platforms."
            delay={0.25}
          />
        </article>
        <article className="col-4">
          <Feature
            imgSrc={catBrain}
            title="AI-Powered Assessment Tools"
            description="Our virtual lab software includes sophisticated AI-driven assessment tools that provide instant, detailed feedback on students' actions. This gives educators measurable insights into learning progress while saving valuable time on grading. The system adapts to individual learning styles, supporting both teachers and students with personalized guidance."
            delay={0.5}
          />
        </article>
      </div>
    </section>
  );
};

export default FeaturesSection;
