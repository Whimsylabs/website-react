import React, { useEffect } from "react";
import "./Features.css";
import Header from './Header';
import Footer from './Footer';
import BubbleContainer from './BubbleContainer';
import SplashSection from './SplashSection';
import ContactUs from './ContactUs';

const FeaturesPage = () => {
  useEffect(() => {
    // Zenless Zone Zero style text animation
    const animateText = (selector, delay = 0) => {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent;
        element.innerHTML = text
          .split("")
          .map((char, index) => {
            if (char === ' ') return ' ';
            const animationDelay = (index * 0.05) + delay;
            return `<span class="zzz-char" style="animation-delay: ${animationDelay}s">${char}</span>`;
          })
          .join("");
      }
    };

    // Apply animations to key titles
    setTimeout(() => {
      animateText('.features-hero-title', 0);
      animateText('.features-main-title', 0.5);
      animateText('.tech-title', 1);
    }, 100);
  }, []);

  return (
    <main className="container-fluid text-center p-0">
      <Header />
      
      {/* Hero Section with Tiled Background */}
      <section id="tiled-1" className="features-welcome-section">
        <div className="container py-3 d-flex align-items-center justify-content-center">
          <img src="/images/logo.png" alt="WhimsyLabs Advanced Features Logo" className="logo me-3" />
          <div className="text-container">
            <h1 className="features-hero-title zzz-title">
              INDUSTRY-LEADING VIRTUAL LABORATORY
            </h1>
            <div className="text-justify">
              <p className="justified-text features-hero-subtitle">
                Experience the world's most advanced virtual laboratory platform with proprietary physics engine, 
                99.7% accuracy simulation, and revolutionary AI assessment capabilities that redefine STEM education.
              </p>
            </div>
          </div>
        </div>
        <ContactUs buttonText='Request Premium Demo' />
      </section>

      {/* Video Section with Bubble Background */}
      <BubbleContainer>
        <div className="features-video-container">
          <div className="features-video-frame">
            <iframe
              src="https://www.youtube.com/embed/9D2e2e2gzvk"
              title="WhimsyLabs Virtual Lab Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="features-video"
            ></iframe>
          </div>
          <p className="features-video-description">
            Witness the future of science education with our industry-leading simulation technology, 
            advanced physics modeling, and revolutionary AI tutoring system.
          </p>
        </div>
      </BubbleContainer>

      {/* Main Features Section with Splash Background */}
      <SplashSection>
        <section className="features-section container" aria-labelledby="features-heading">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 text-center">
              <h2 id="features-heading" className="features-main-title zzz-title">
                REVOLUTIONARY LABORATORY FEATURES
              </h2>
            </div>
            <div className="col-3"></div>
          </div>
          
          <div className="row mt-5">
            <article className="col-4">
              <div className="col-4 vstack">
                <div className="home-bubble animate" style={{animationDelay: '0s'}}>
                  <div className="p-3">
                    <img src="/images/cat_beaker.png" className="img-fluid mb-2" alt="Industry-Leading Simulations" />
                    <h4 className="unique-header">Industry-Leading Simulation Technology</h4>
                    <p>Our proprietary physics engine delivers the most advanced molecular-level simulations in the market, processing thousands of interactions per second with 99.7% accuracy. Unlike competitors' pre-scripted animations, our platform fully simulates fluid dynamics and molecular interactions in real-time, creating the most authentic virtual laboratory experience available.</p>
                  </div>
                </div>
              </div>
            </article>
            
            <article className="col-4">
              <div className="col-4 vstack">
                <div className="home-bubble animate" style={{animationDelay: '0.25s'}}>
                  <div className="p-3">
                    <img src="/images/cat_vr.png" className="img-fluid mb-2" alt="Revolutionary Physical Interaction" />
                    <h4 className="unique-header">Revolutionary Physical Interaction</h4>
                    <p>Experience the only virtual laboratory with true hand representation and physical interaction across all devices - from premium VR headsets to standard Chromebooks. Our breakthrough technology enables genuine muscle memory development through precise 360-degree interactions, ensuring skills transfer directly to physical laboratories - a capability unmatched by any competitor.</p>
                  </div>
                </div>
              </div>
            </article>
            
            <article className="col-4">
              <div className="col-4 vstack">
                <div className="home-bubble animate" style={{animationDelay: '0.5s'}}>
                  <div className="p-3">
                    <img src="/images/cat_brain.png" className="img-fluid mb-2" alt="Advanced AI Ecosystem" />
                    <h4 className="unique-header">Advanced AI Ecosystem</h4>
                    <p>Our platform features the most sophisticated AI assessment and tutoring system in educational technology. WhimsyCat AI analyzes over 200 behavioral indicators per experiment, providing detailed feedback with 96% correlation to expert human assessment. This proactive system identifies potential errors before they occur and delivers personalized guidance precisely when needed - functioning like an expert teaching assistant for every student.</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </SplashSection>

      {/* Technical Superiority Section with Bubble Background */}
      <BubbleContainer>
        <div className="technical-superiority-section">
          <h2 className="tech-title zzz-title">TECHNICAL SUPERIORITY</h2>
          
          <div className="tech-features-container">
            <div className="tech-feature-bubble animate" style={{animationDelay: '0s'}}>
              <h3>Hyper-Realistic Fluid Physics</h3>
              <p>Advanced computational fluid dynamics simulation enables precise pipetting, titration, and chemical handling with detection of subtle errors like air bubbles in burettes.</p>
            </div>
            
            <div className="tech-feature-bubble animate" style={{animationDelay: '0.2s'}}>
              <h3>Multi-Platform Excellence</h3>
              <p>Seamless operation across VR headsets, desktops, tablets, and mobile devices with 96.66% compatibility and consistent 60+ FPS performance on all platforms.</p>
            </div>
            
            <div className="tech-feature-bubble animate" style={{animationDelay: '0.4s'}}>
              <h3>Offline-First Architecture</h3>
              <p>Advanced caching technology enables full laboratory functionality offline or with connections as slow as 1 Mbps, ensuring universal accessibility.</p>
            </div>
            
            <div className="tech-feature-bubble animate" style={{animationDelay: '0.6s'}}>
              <h3>Enterprise-Grade Security</h3>
              <p>Full GDPR, COPPA, and FERPA compliance with data minimization philosophy and transparent handling documentation for institutional confidence.</p>
            </div>
          </div>
        </div>
      </BubbleContainer>

      {/* Awards & Recognition Section */}
      <div className="awards-recognition" style={{marginBottom: "2rem"}}>
        <h2>Awards & Recognition</h2>
        <div className="awards-container" style={{display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem"}}>
          <div className="award-item" style={{textAlign: "center", maxWidth: "250px"}}>
            <div className="award-icon" style={{marginBottom: "1rem"}}>
              <img src="/images/kids_judge_bett.png" alt="BETT 2025 Kids Judge Award" style={{height: "80px"}} />
            </div>
            <h4 style={{margin: "0.5rem 0"}}>BETT 2025 Kids Judge Award Winner</h4>
            <p style={{fontSize: "0.9rem"}}>"Best Science Lab (Start Up)" category - recognized for innovation and educational impact</p>
          </div>
          <div className="award-item" style={{textAlign: "center", maxWidth: "250px"}}>
            <div className="award-icon" style={{marginBottom: "1rem"}}>
              <img src="/images/cat_brain.png" alt="Converge Challenge Award" style={{height: "80px"}} />
            </div>
            <h4 style={{margin: "0.5rem 0"}}>Converge Challenge Finalist</h4>
            <p style={{fontSize: "0.9rem"}}>Recognized among Scotland's most innovative educational technology ventures</p>
          </div>
        </div>
      </div>

      {/* Final CTA Section with Bubble Background */}
      <BubbleContainer>
        <h1>Ready to Experience the Future of Science Education?</h1>
        <ContactUs buttonText='Schedule Your Premium Demo' />
        <div className="faq-teaser">
          <h2>Have Questions?</h2>
          <p>Visit our <a href="./faq/" className="faq-link">FAQ page</a> for answers to common questions, or explore our <a href="./features/" className="faq-link">Advanced Features</a> to discover our industry-leading capabilities!</p>
        </div>
      </BubbleContainer>

      <Footer />
    </main>
  );
};

export default FeaturesPage;