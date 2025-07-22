import React, { useState } from "react";
import "./Features.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import ContactUs from "./ContactUs";
import AnimatedTitle from "./AnimatedTitle";

const FeaturesPage = () => {
  const [currentVideo, setCurrentVideo] = useState("9D2e2e2gzvk");
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: "sandbox-freedom",
      title: "Sandbox Freedom",
      description:
        "Complete experimental freedom with over 10,000 equipment permutations and unlimited procedural pathways. Unlike restrictive competitors, students design their own experiments and learn from authentic mistakes.",
      videoId: "9D2e2e2gzvk",
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
      videoId: "9D2e2e2gzvk",
      icon: "/images/cat_vr.png",
      blogLink: "/blog/physicality-in-virtual-labs/",
    },
    {
      id: "hand-representation",
      title: "Hand Representation",
      description:
        "Revolutionary true hand representation across all devices. Develop genuine muscle memory through precise 360-degree interactions that transfer directly to physical laboratories.",
      videoId: "9D2e2e2gzvk",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/physicality-in-virtual-labs/",
    },
    {
      id: "assessment-system",
      title: "Assessment System",
      description:
        "Advanced AI assessment with dynamic question generation. Each student receives unique, personalized assessments based on their experimental data, eliminating cheating possibilities.",
      videoId: "9D2e2e2gzvk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
    },
    {
      id: "cross-platform",
      title: "Cross-Platform",
      description:
        "Seamless operation across VR headsets, desktops, tablets, and mobile devices with 96.66% compatibility. Consistent 60+ FPS performance and offline functionality.",
      videoId: "9D2e2e2gzvk",
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

      {/* Hero Section with Tiled Background */}
      <section id="tiled-1" className="features-welcome-section">
        <div className="container py-3 d-flex align-items-center justify-content-center">
          <img
            src="/images/logo.png"
            alt="WhimsyLabs Advanced Features Logo"
            className="logo me-3"
          />
          <div className="text-container">
            <AnimatedTitle
              text="Industry-Leading Virtual Laboratories"
              className="features-hero-title"
              delay={0}
              darkMode={false}
              uppercase={false}
            />
            <div className="text-justify">
              <p className="justified-text features-hero-subtitle">
                Experience the world's most advanced virtual laboratory platform
                with proprietary physics engine, 99.7% accuracy simulation, and
                revolutionary AI assessment capabilities that redefine STEM
                education.
              </p>
            </div>
          </div>
        </div>
        <ContactUs buttonText="Request Premium Demo" />
        <div className="interactive-features-section">
          <AnimatedTitle
            text="Revolutionary Laboratory Features"
            className="features-main-title medium"
            as="h2"
            delay={0.5}
            darkMode={true}
            uppercase={false}
          />

          <div className="features-video-container">
            <div className="features-video-frame">
              <iframe
                key={currentVideo}
                src={`https://www.youtube.com/embed/${currentVideo}`}
                title="WhimsyLabs Virtual Lab Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="features-video"
              ></iframe>
              <div className="feature-buttons-grid">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    className={`feature-button ${
                      activeFeature === index ? "active" : ""
                    }`}
                    onClick={() => handleFeatureClick(index)}
                  >
                    <div className="feature-button-icon">
                      <img src={feature.icon} alt={feature.title} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <a
                      href={feature.blogLink}
                      className="blog-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Learn More →
                    </a>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Section with Feature Buttons */}
      <BubbleContainer>WOWEE</BubbleContainer>

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
        </div>
      </div>

      {/* Final CTA Section with Bubble Background */}
      <BubbleContainer>
        <h1>Ready to Experience the Future of Science Education?</h1>
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

      <Footer />
    </main>
  );
};

export default FeaturesPage;
