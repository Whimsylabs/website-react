import React, { useState, useEffect } from "react";
import "./Features.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import ContactUs from "./ContactUs";
import AnimatedTitle from "./AnimatedTitle";

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
        "Complete experimental freedom with over 10,000 equipment permutations and unlimited procedural pathways. Unlike restrictive competitors, students design their own experiments and learn from authentic mistakes.",
      videoId: "dQw4w9WgXcQ",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/sandbox-learning-revolution-stem-education/",
    },
    {
      id: "ai-tutoring",
      title: "AI Tutoring",
      description:
        "WhimsyCat AI analyzes 200+ behavioral indicators per experiment, providing personalized guidance with 96% correlation to expert assessment. Proactive error detection and contextual support.",
      videoId: "9D2e2e2gzvk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/whimsycat-ai-tutor-transforming-science-education/",
    },
    {
      id: "physics-engine",
      title: "Physics Engine",
      description:
        "Proprietary physics engine with 99.7% accuracy simulation, processing thousands of molecular interactions per second. Real-time fluid dynamics and molecular behavior modeling.",
      videoId: "jNQXAC9IVRw",
      icon: "/images/cat_vr.png",
      blogLink: "/blog/physicality-in-virtual-labs/",
    },
    {
      id: "hand-representation",
      title: "Hand Representation",
      description:
        "Revolutionary true hand representation across all devices. Develop genuine muscle memory through precise 360-degree interactions that transfer directly to physical laboratories.",
      videoId: "L_jWHffIx5E",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/physicality-in-virtual-labs/",
    },
    {
      id: "assessment-system",
      title: "Assessment System",
      description:
        "Advanced AI assessment with dynamic question generation. Each student receives unique, personalized assessments based on their experimental data, eliminating cheating possibilities.",
      videoId: "kJQP7kiw5Fk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
    },
    {
      id: "cross-platform",
      title: "Cross-Platform",
      description:
        "Seamless operation across VR headsets, desktops, tablets, and mobile devices with 96.66% compatibility. Consistent 60+ FPS performance and offline functionality.",
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
      <Header />
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
                text="Industry-Leading Virtual Laboratories"
                className="features-hero-title"
                delay={0}
                darkMode={false}
                uppercase={true}
              />
            ) : (
              <h1 className="features-hero-title">
                Industry-Leading Virtual Laboratories
              </h1>
            )}
            <div className="text-justify">
              <p className="justified-text features-hero-subtitle">
                Page WIP
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
              <h3 className="feature-description-title">
                {features[activeFeature].title}
              </h3>
              <p className="feature-description-text">
                {features[activeFeature].description}
              </p>
              <a
                href={features[activeFeature].blogLink}
                className="feature-learn-more-link"
              >
                Learn More About {features[activeFeature].title} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Section with Feature Buttons */}
      <BubbleContainer>Honk</BubbleContainer>

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
        <ContactUs buttonText="Schedule Your Premium Demo" />
        <div className="faq-teaser">
          <h2>Have Questions?</h2>
          <p>
            Visit our{" "}
            <a href="./faq/" className="faq-link">
              FAQ page
            </a>{" "}
            for answers to common questions, or explore our{" "}
            <a href="./features/" className="faq-link">
              Advanced Features
            </a>{" "}
            to discover our industry-leading capabilities!
          </p>
        </div>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default FeaturesPage;
