import React, { useState, useEffect } from "react";
import "./Features.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import ContactUs from "./ContactUs";
import AnimatedTitle from "./AnimatedTitle";
import FeatureHighlights from "./FeatureHighlights";
import { getLocalizedPath } from '../i18n';

const FeaturesPage = ({ language }) => {
  const [currentVideo, setCurrentVideo] = useState("9D2e2e2gzvk");
  const [activeFeature, setActiveFeature] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const features = [
    {
      id: "sandbox-freedom",
      title: "Sandbox Freedom",
      description:
        "Complete experimental freedom: mix any reagent with any equipment and follow your own procedural pathways. Students design their own experiments and learn from authentic mistakes.",
      videoId: "dQw4w9WgXcQ",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/sandbox-learning-revolution-stem-education/",
    },
    {
      id: "ai-tutoring",
      title: "AI Tutoring",
      description:
        "WhimsyCat watches how students work — technique, safety, and procedure — and offers guidance based on their actions. There is no student chat window: pupils never type prompts or receive generated text.",
      videoId: "9D2e2e2gzvk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/whimsycat-ai-tutor-transforming-science-education/",
    },
    {
      id: "physics-engine",
      title: "Physics Lab Simulator",
      description:
        "A proprietary physicality-first engine simulates fluids, heat, and molecular behaviour in real time — down to temperature perturbations, impurities, and deviation between samples.",
      videoId: "jNQXAC9IVRw",
      icon: "/images/cat_vr.png",
      blogLink: "/blog/virtual-physics-lab-simulations-teach/",
    },
    {
      id: "hand-representation",
      title: "Hand Representation",
      description:
        "True hand representation across all devices. Develop genuine muscle memory through precise interactions — pouring, swirling, focusing — that transfer directly to physical laboratories.",
      videoId: "L_jWHffIx5E",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/physicality-in-virtual-labs/",
    },
    {
      id: "assessment-system",
      title: "Assessment System",
      description:
        "Process-based assessment that grades how students work, not just what they write. Follow-up questions are tied to each student's own experimental data, so generic AI answers don't help.",
      videoId: "kJQP7kiw5Fk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
    },
    {
      id: "cross-platform",
      title: "Cross-Platform",
      description:
        "Runs on VR headsets, desktops, Chromebooks, tablets, and phones, with a low-bandwidth mode that keeps lessons running on unstable school internet connections.",
      videoId: "fJ9rUzIMcZQ",
      icon: "/images/cat_vr.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
    },
  ];

  const handleFeatureClick = (index) => {
    setActiveFeature(index);
    setCurrentVideo(features[index].videoId);
  };

  return (
    <main className="container-fluid text-center p-0">
      <Header currentLang={language} />
      <section id="tiled-1" className="features-welcome-section">
        <div className="container py-3 d-flex align-items-center justify-content-center">
          <img
            src="/images/logo.png"
            alt="WhimsyLabs Virtual Lab Software Logo"
            className="logo me-3"
          />
          <div className="text-container">
            {mounted ? (
              <AnimatedTitle
                text="AI Science Tutor & Virtual Lab Features"
                className="features-hero-title"
                delay={0}
                darkMode={false}
                uppercase={true}
              />
            ) : (
              <h1 className="features-hero-title">
                AI Science Tutor & Virtual Lab Features
              </h1>
            )}
            <div className="text-justify">
              <p className="justified-text features-hero-subtitle">
                Stop clicking, start doing. WhimsyLabs combines a
                physicality-first engine with AI-driven assessment to deliver a
                virtual lab that builds true muscle memory while saving
                teachers hours of marking time. Available on VR headsets and
                desktop (Chromebook, Mac, PC).
              </p>
            </div>
          </div>
        </div>

        <div className="interactive-features-section">
          {/* Feature Buttons Row */}
          <div className="feature-buttons-row">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                className={`feature-tab-button ${
                  activeFeature === index ? "active" : ""
                }`}
                onClick={() => handleFeatureClick(index)}
              >
                <div className="feature-tab-icon">
                  <img src={feature.icon} alt={feature.title} />
                </div>
                <span className="feature-tab-title">{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Video Container */}
          <div className="features-video-container">
            <div className="features-video-frame">
              {mounted ? (
                <iframe
                  key={currentVideo}
                  src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1`}
                  title="WhimsyLabs Virtual Lab Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="features-video"
                ></iframe>
              ) : (
                <div className="features-video video-placeholder">
                  <div className="video-placeholder-content">
                    <div className="video-placeholder-icon">▶</div>
                    <p>Loading video...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feature Description Below Video */}
          <div className="feature-description-container">
            <div className="feature-description-content">
              <h2 className="feature-description-title">
                {features[activeFeature].title}
              </h2>
              <p className="feature-description-text">
                {features[activeFeature].description}
              </p>
              <a
                href={getLocalizedPath(features[activeFeature].blogLink, language)}
                className="feature-learn-more-link"
              >
                Learn More About {features[activeFeature].title} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* In-depth feature sections from the 2026 features flyer */}
      <FeatureHighlights language={language} />

      {/* Awards & Recognition Section */}
      <div className="awards-recognition" style={{ marginBottom: "2rem" }}>
        <h2>Awards & Recognition</h2>
        <div
          className="awards-container"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            className="award-item"
            style={{ textAlign: "center", maxWidth: "250px" }}
          >
            <div className="award-icon" style={{ marginBottom: "1rem" }}>
              <img
                src="/images/kids_judge_bett.png"
                alt="BETT 2025 Kids Judge Award"
                style={{ height: "80px" }}
              />
            </div>
            <h4 style={{ margin: "0.5rem 0" }}>
              BETT 2025 Kids Judge Award Winner
            </h4>
            <p style={{ fontSize: "0.9rem" }}>
              "Best Science Lab (Start Up)" category - recognized for innovation
              and educational impact
            </p>
          </div>
          <div
            className="award-item"
            style={{ textAlign: "center", maxWidth: "250px" }}
          >
            <div className="award-icon" style={{ marginBottom: "1rem" }}>
              <img
                src="/images/cat_brain.png"
                alt="Converge Challenge Award"
                style={{ height: "80px" }}
              />
            </div>
            <h4 style={{ margin: "0.5rem 0" }}>Converge Challenge Finalist</h4>
            <p style={{ fontSize: "0.9rem" }}>
              Recognized among Scotland's most innovative educational technology
              ventures
            </p>
          </div>
          <div
            className="award-item"
            style={{ textAlign: "center", maxWidth: "250px" }}
          >
            <div className="award-icon" style={{ marginBottom: "1rem" }}>
              <span style={{ fontSize: "4rem" }}>⭐</span>
            </div>
            <h4 style={{ margin: "0.5rem 0" }}>TechLearning's #1 Best of BETT 2026</h4>
            <p style={{ fontSize: "0.9rem" }}>
              Featured as the top pick from TechLearning's coverage of the BETT 2026 show floor
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA Section with Bubble Background */}
      <BubbleContainer>
        <h2>Ready to Experience the Future of Science Education?</h2>
        <ContactUs buttonText="Schedule Your Premium Demo" language={language} />
        <div className="faq-teaser">
          <h2>Have Questions?</h2>
          <p>
            Visit our{" "}
            <a href={getLocalizedPath("/faq/", language)} className="faq-link">
              FAQ page
            </a>{" "}
            for answers to common questions, or explore our{" "}
            <a href={getLocalizedPath("/services/", language)} className="faq-link">
              Services
            </a>{" "}
            to see how we can help your school!
          </p>
          <p style={{ marginTop: '15px' }}>
            Coming to BETT 2026?{" "}
            <a href={getLocalizedPath("/bett/", language)} className="faq-link">
              Book a demo at our booth
            </a>!
          </p>
        </div>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default FeaturesPage;
