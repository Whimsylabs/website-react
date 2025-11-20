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
      category: "Educational Innovation",
      description:
        "Complete experimental freedom with infinite equipment permutations and unlimited procedural pathways. Students design their own experiments, form hypotheses, and learn from authentic mistakes in a safe environment. Research shows productive failure pedagogy has effect sizes nearly twice that of a year of instruction from a good teacher.",
      videoId: "dQw4w9WgXcQ",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/sandbox-learning-revolution-stem-education/",
      stats: "Infinite procedural pathways • Zero forced step-by-step guides",
    },
    {
      id: "ai-tutoring",
      title: "24/7 AI Tutoring",
      category: "AI Intelligence",
      description:
        "WhimsyCat AI provides unlimited one-on-one support at any time, from anywhere. Proactively monitors student behavior patterns, identifies struggling students through hesitation and errors, and intervenes with targeted guidance before minor issues become major obstacles. Analyzes 1,000+ student actions per experiment.",
      videoId: "9D2e2e2gzvk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/whimsycat-ai-tutor-transforming-science-education/",
      stats: "58% of students who fall behind never recover • 24/7 availability",
    },
    {
      id: "emotional-intelligence",
      title: "Emotional Intelligence",
      category: "AI Intelligence",
      description:
        "Advanced emotional AI detects frustration through multi-modal analysis including player actions, gaze tracking (in VR), and engagement patterns. Provides empathetic, graduated support when students struggle. Frustration is negatively correlated with performance, and our AI actively prevents it.",
      videoId: "jNQXAC9IVRw",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "Multi-modal analysis • Gaze tracking in VR • Graduated response system",
    },
    {
      id: "personalized-recommendations",
      title: "Personalized Recommendations",
      category: "AI Intelligence",
      description:
        "AI creates individualized daily and weekly practice sessions targeting specific weaknesses through multi-dimensional performance analysis: procedural accuracy, conceptual understanding, problem-solving approach, and learning velocity. Students receive three weekly recommendations focusing on their weakest areas.",
      videoId: "L_jWHffIx5E",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "Multi-dimensional analysis • Weekly personalized labs • Intrinsic motivation",
    },
    {
      id: "physics-engine",
      title: "Real-Time Physics",
      category: "Technical Excellence",
      description:
        "World's most advanced liquid physics using real-time Computational Fluid Dynamics. Fully simulates fluid dynamics with Navier-Stokes equations, modeling viscosity, surface tension, turbulent mixing, and temperature-dependent properties. What academic simulations run on supercomputers for hours, we run in real-time on Chromebooks.",
      videoId: "kJQP7kiw5Fk",
      icon: "/images/cat_vr.png",
      blogLink: "/blog/physicality-in-virtual-labs/",
      stats: "60+ FPS • <50ms response times • Thousands of molecular interactions/second",
    },
    {
      id: "hand-representation",
      title: "Physical Interaction",
      category: "Technical Excellence",
      description:
        "Revolutionary true hand representation develops genuine muscle memory through precise 360-degree interactions. Students physically grasp, tilt, and manipulate equipment in VR. Skills transfer directly to physical laboratories through high-fidelity physical practice - the only platform teaching real physical laboratory skills.",
      videoId: "fJ9rUzIMcZQ",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/physicality-in-virtual-labs/",
      stats: "360° interactions • Authentic muscle memory • Direct physical skill transfer",
    },
    {
      id: "assessment-system",
      title: "Multi-Dimensional Assessment",
      category: "AI Intelligence",
      description:
        "Advanced AI assessment evaluates technique accuracy, safety compliance, data collection quality, and analytical reasoning - not just binary correct/wrong. Provides comprehensive feedback like 'Your titration technique shows strong competency with consistent endpoint detection (pH 8.72 ± 0.05).' Saves teachers 3.5 hours per week.",
      videoId: "9D2e2e2gzvk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "94% correlation to expert assessment • 3.5 hours/week saved • Transparent grading",
    },
    {
      id: "cross-platform",
      title: "Universal Compatibility",
      category: "Accessibility",
      description:
        "Seamless operation across VR headsets, desktops, tablets, and mobile devices with 96.66% device compatibility. Full functionality on basic Chromebooks with consistent 60+ FPS performance. Offline-first architecture works with intermittent connectivity. Democratizes access globally.",
      videoId: "dQw4w9WgXcQ",
      icon: "/images/cat_vr.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "96.66% device coverage • Runs on Chromebooks • Full offline support",
    },
    {
      id: "cost-savings",
      title: "85-90% Cost Reduction",
      category: "Practical Benefits",
      description:
        "Traditional labs cost £80,000-120,000 annually for a typical UK secondary school. WhimsyLabs costs £12,000-18,000 for the same capacity. Zero consumables, no chemical costs, no replacement glassware, no infrastructure requirements. Per-student cost: £10-15 virtual vs £800-1,000 traditional.",
      videoId: "jNQXAC9IVRw",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "85-90% cost reduction • Zero consumables • Unlimited scaling",
    },
    {
      id: "sustainability",
      title: "Environmental Sustainability",
      category: "Practical Benefits",
      description:
        "Physical labs account for 60-65% of university energy consumption and generate 5.5M tonnes of plastic waste annually. WhimsyLabs achieves 98% energy reduction (150 kWh vs 8,500 kWh), zero chemical waste, zero plastic consumables (15,000 pipette tips saved per class/year), and zero water usage (12,000 liters saved annually).",
      videoId: "L_jWHffIx5E",
      icon: "/images/cat_vr.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "98% energy reduction • Zero waste • 5.5M tonnes plastic saved",
    },
    {
      id: "teacher-workload",
      title: "Teacher Workload Relief",
      category: "Practical Benefits",
      description:
        "Addresses the STEM teacher shortage crisis (UK recruited only 50% of needed secondary trainees, physics at 17.3%). Zero lab preparation saves 1-2 hours per instruction hour. AI grading saves 3.5 hours per week. Comprehensive analytics dashboard highlights where teacher intervention is most valuable.",
      videoId: "kJQP7kiw5Fk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "3.5 hours/week saved • Zero prep time • UK at 17.3% physics teacher targets",
    },
    {
      id: "send-support",
      title: "SEND Student Support",
      category: "Educational Innovation",
      description:
        "Multisensory learning combining visual, auditory, and kinesthetic inputs. Self-paced experimentation allows students to repeat actions and focus on one step at a time. Speech-to-action feature in development for students with motor impairments. Universal Design for Learning with multiple means of representation, engagement, and expression.",
      videoId: "fJ9rUzIMcZQ",
      icon: "/images/cat_beaker.png",
      blogLink: "/blog/virtual-kidney-dissection-send-engagement/",
      stats: "Multisensory learning • Self-paced • Speech-to-action (coming soon)",
    },
    {
      id: "career-preparation",
      title: "Career-Ready Skills",
      category: "Educational Innovation",
      description:
        "The only platform teaching physical laboratory skills that transfer to real careers. 70% of employers report science graduates lack essential practical lab skills. Our students demonstrate superior practical competency, proper technique from first attempt, and minimal supervision needed. Used for pharmaceutical and chemical industry workforce training.",
      videoId: "9D2e2e2gzvk",
      icon: "/images/cat_brain.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "70% skills gap addressed • Industry partnerships • Real career preparation",
    },
    {
      id: "gamification",
      title: "Non-Monetized Gamification",
      category: "Engagement",
      description:
        "Comprehensive gamification system increases engagement by 48%. Points for mastery (highest returns for assessment performance), weekly personalized recommendations, and exploration rewards. WhimsyCat cosmetic customization, laboratory personalization, and unique art department (VR creative space). Everything earned through engagement, never purchased - prevents pay-to-win dynamics.",
      videoId: "jNQXAC9IVRw",
      icon: "/images/cat_vr.png",
      blogLink: "/blog/ai-powered-virtual-labs-solving-education-crisis/",
      stats: "48% engagement increase • Zero monetization • Art gallery system",
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
                Discover the comprehensive capabilities that make WhimsyLabs the world's most advanced virtual laboratory platform. From cutting-edge AI tutoring to real-time physics simulations, explore features backed by research and trusted by educators worldwide.
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
              <div className="feature-category-badge">
                {features[activeFeature].category}
              </div>
              <h3 className="feature-description-title">
                {features[activeFeature].title}
              </h3>
              <p className="feature-description-text">
                {features[activeFeature].description}
              </p>
              {features[activeFeature].stats && (
                <div className="feature-stats">
                  <span className="stats-icon">📊</span>
                  <span className="stats-text">{features[activeFeature].stats}</span>
                </div>
              )}
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

      {/* Feature Categories Overview */}
      <section className="feature-categories-section">
        <div className="container">
          <h2 className="categories-title">Feature Categories</h2>
          <p className="categories-subtitle">
            Our comprehensive platform spans six key categories, each designed to address
            specific challenges in STEM education
          </p>

          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">🤖</div>
              <h3>AI Intelligence</h3>
              <p>5 Advanced Features</p>
              <ul className="category-features-list">
                <li>24/7 AI Tutoring</li>
                <li>Emotional Intelligence</li>
                <li>Personalized Recommendations</li>
                <li>Multi-Dimensional Assessment</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon">⚙️</div>
              <h3>Technical Excellence</h3>
              <p>2 Core Features</p>
              <ul className="category-features-list">
                <li>Real-Time Physics Simulations</li>
                <li>Physical Interaction & Muscle Memory</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon">🎓</div>
              <h3>Educational Innovation</h3>
              <p>3 Learning Features</p>
              <ul className="category-features-list">
                <li>Sandbox Freedom</li>
                <li>SEND Student Support</li>
                <li>Career-Ready Skills</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon">💰</div>
              <h3>Practical Benefits</h3>
              <p>3 Impact Features</p>
              <ul className="category-features-list">
                <li>85-90% Cost Reduction</li>
                <li>Environmental Sustainability</li>
                <li>Teacher Workload Relief</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon">🌐</div>
              <h3>Accessibility</h3>
              <p>Universal Access</p>
              <ul className="category-features-list">
                <li>96.66% Device Compatibility</li>
                <li>Works on Chromebooks</li>
                <li>Offline Support</li>
              </ul>
            </div>

            <div className="category-card">
              <div className="category-icon">🎮</div>
              <h3>Engagement</h3>
              <p>Student Motivation</p>
              <ul className="category-features-list">
                <li>Non-Monetized Gamification</li>
                <li>48% Engagement Increase</li>
                <li>Art Department & Gallery</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Section with Feature Buttons */}
      <BubbleContainer>
        <div className="key-differentiators">
          <h2>What Makes WhimsyLabs Different?</h2>
          <div className="differentiators-grid">
            <div className="differentiator-item">
              <span className="differentiator-icon">🏆</span>
              <h4>Only Platform Teaching Physical Laboratory Skills</h4>
              <p>True hand representation develops real muscle memory that transfers to physical labs</p>
            </div>
            <div className="differentiator-item">
              <span className="differentiator-icon">🧪</span>
              <h4>World's Most Advanced Liquid Physics</h4>
              <p>Real-time CFD simulations running on Chromebooks - what supercomputers do in hours</p>
            </div>
            <div className="differentiator-item">
              <span className="differentiator-icon">🤖</span>
              <h4>Most Sophisticated AI Tutor</h4>
              <p>Emotional intelligence with gaze tracking, 24/7 personalized support, multi-dimensional assessment</p>
            </div>
            <div className="differentiator-item">
              <span className="differentiator-icon">🌍</span>
              <h4>Environmental Leadership</h4>
              <p>98% energy reduction, zero waste, 5.5M tonnes plastic saved annually</p>
            </div>
            <div className="differentiator-item">
              <span className="differentiator-icon">💡</span>
              <h4>Complete Sandbox Freedom</h4>
              <p>Infinite pathways, authentic mistakes, productive failure pedagogy</p>
            </div>
            <div className="differentiator-item">
              <span className="differentiator-icon">💰</span>
              <h4>Democratized Access</h4>
              <p>85-90% cost reduction, 96.66% device compatibility, offline support</p>
            </div>
          </div>
        </div>
      </BubbleContainer>

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

      <Footer language={language} />
    </main>
  );
};

export default FeaturesPage;
