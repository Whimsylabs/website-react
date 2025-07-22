import React from "react";
import "./Features.css";

const FeaturesPage = () => {
  return (
    <main className="features-page">
      {/* Hero Section */}
      <section className="features-hero">
        <div className="container">
          <h1 className="features-hero-title">
            Advanced Virtual Laboratory Features
          </h1>
          <p className="features-hero-subtitle">
            Experience the most sophisticated virtual lab platform with cutting-edge simulations, 
            AI-powered assessment, and unlimited experimental possibilities
          </p>
          
          {/* Video Section */}
          <div className="features-video-container">
            <div className="features-video-frame">
              <iframe
                src="https://www.youtube.com/embed/9D2e2e2gzvk"
                title="WhimsyLabs Virtual Lab Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="features-video"
              ></iframe>
            </div>
          </div>
          
          <p className="features-video-description">
            Experience our industry-leading virtual laboratory with hyper-realistic simulations, 
            advanced physics modeling, and revolutionary AI tutoring that adapts to each student's learning style.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="core-features-section">
        <div className="container">
          <h2 className="section-title">Premium Laboratory Features</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/images/cat_beaker.png" alt="Advanced Simulations" />
              </div>
              <h3>Industry-Leading Simulations</h3>
              <p>
                Our proprietary physics engine delivers the most detailed molecular-level 
                simulations in the market, processing thousands of interactions per second 
                with 99.7% accuracy compared to real-world laboratory conditions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src="/images/cat_vr.png" alt="Sandbox Freedom" />
              </div>
              <h3>Complete Sandbox Freedom</h3>
              <p>
                Unlike restrictive step-by-step competitors, WhimsyLabs offers unlimited 
                experimental pathways with infinite equipment permutations, enabling 
                authentic scientific discovery and creative problem-solving.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src="/images/cat_brain.png" alt="Muscle Memory Development" />
              </div>
              <h3>True Muscle Memory Development</h3>
              <p>
                Revolutionary hand representation technology allows students to develop 
                genuine laboratory muscle memory through precise 360-degree interactions, 
                ensuring seamless transfer to physical lab environments.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src="/images/cat_beaker.png" alt="Custom Experiments" />
              </div>
              <h3>Infinite Custom Experiments</h3>
              <p>
                Our AI-powered experiment designer generates unlimited unique laboratory 
                configurations in minutes, allowing educators to create bespoke practicals 
                tailored to any curriculum requirement.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src="/images/cat_brain.png" alt="AI Autograding" />
              </div>
              <h3>Advanced AI Autograding</h3>
              <p>
                Sophisticated assessment system analyzes 200+ behavioral indicators per 
                experiment, providing detailed feedback with 96% correlation to expert 
                human assessment while saving educators 3.5 hours per week.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src="/images/cat_vr.png" alt="Dynamic Tutoring" />
              </div>
              <h3>In-Lab Dynamic AI Tutoring</h3>
              <p>
                WhimsyCat AI tutor provides real-time, context-aware guidance without 
                constraining exploration, proactively identifying learning difficulties 
                and offering personalized support like an expert teaching assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Superiority Section */}
      <section className="technical-section">
        <div className="container">
          <h2 className="section-title">Technical Superiority</h2>
          
          <div className="tech-features-grid">
            <div className="tech-feature">
              <h3>Hyper-Realistic Fluid Physics</h3>
              <p>
                Advanced computational fluid dynamics simulation enables precise pipetting, 
                titration, and chemical handling with detection of subtle errors like air 
                bubbles in burettes.
              </p>
            </div>

            <div className="tech-feature">
              <h3>Multi-Platform Excellence</h3>
              <p>
                Seamless operation across VR headsets, desktops, tablets, and mobile devices 
                with 96.66% compatibility and consistent 60+ FPS performance on all platforms.
              </p>
            </div>

            <div className="tech-feature">
              <h3>Offline-First Architecture</h3>
              <p>
                Advanced caching technology enables full laboratory functionality offline 
                or with connections as slow as 1 Mbps, ensuring universal accessibility.
              </p>
            </div>

            <div className="tech-feature">
              <h3>Enterprise-Grade Security</h3>
              <p>
                Full GDPR, COPPA, and FERPA compliance with data minimization philosophy 
                and transparent handling documentation for institutional confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Devices Section */}
      <section className="devices-section">
        <div className="container">
          <h2 className="section-title">Universal Device Support</h2>
          
          <div className="devices-grid">
            <div className="device-card">
              <div className="device-icon">
                <img src="/images/cat_vr.png" alt="VR Headsets" />
              </div>
              <h3>VR Headsets</h3>
              <p>
                Full immersive experience with haptic feedback and natural hand tracking 
                for the most realistic laboratory simulation available.
              </p>
            </div>

            <div className="device-card">
              <div className="device-icon">
                <img src="/images/cat_brain.png" alt="Desktop & Laptop" />
              </div>
              <h3>Desktop & Laptop</h3>
              <p>
                High-performance WebGL rendering with mouse and keyboard controls, 
                optimized for classroom and individual study environments.
              </p>
            </div>

            <div className="device-card">
              <div className="device-icon">
                <img src="/images/cat_beaker.png" alt="Tablets & Mobile" />
              </div>
              <h3>Tablets & Mobile</h3>
              <p>
                Touch-optimized interface with responsive design, enabling laboratory 
                access anywhere with consistent functionality across all screen sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-cta-section">
        <div className="container">
          <h2>Experience Premium Virtual Laboratory Technology</h2>
          <p>
            Join leading educational institutions worldwide who trust WhimsyLabs 
            for the most advanced virtual laboratory experience available.
          </p>
          <a href="/contact" className="cta-button">
            Request Premium Demo
          </a>
        </div>
      </section>
    </main>
  );
};

export default FeaturesPage;