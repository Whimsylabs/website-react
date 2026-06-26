import React from "react";
import "./PhysicsPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import withTranslation from "./withTranslation";

const PhysicsPage = ({ t, language }) => {
  const experiments = [
    {
      icon: "⚡",
      titleKey: "physics.experiments.circuits.title",
      descKey: "physics.experiments.circuits.desc",
    },
    {
      icon: "🎢",
      titleKey: "physics.experiments.mechanics.title",
      descKey: "physics.experiments.mechanics.desc",
    },
    {
      icon: "🌊",
      titleKey: "physics.experiments.waves.title",
      descKey: "physics.experiments.waves.desc",
    },
    {
      icon: "🔭",
      titleKey: "physics.experiments.optics.title",
      descKey: "physics.experiments.optics.desc",
    },
    {
      icon: "🧲",
      titleKey: "physics.experiments.magnetism.title",
      descKey: "physics.experiments.magnetism.desc",
    },
    {
      icon: "🌡️",
      titleKey: "physics.experiments.thermodynamics.title",
      descKey: "physics.experiments.thermodynamics.desc",
    },
  ];

  const benefits = [
    {
      icon: "🎮",
      titleKey: "physics.benefits.interactive.title",
      descKey: "physics.benefits.interactive.desc",
    },
    {
      icon: "📐",
      titleKey: "physics.benefits.precision.title",
      descKey: "physics.benefits.precision.desc",
    },
    {
      icon: "🔄",
      titleKey: "physics.benefits.variables.title",
      descKey: "physics.benefits.variables.desc",
    },
    {
      icon: "📊",
      titleKey: "physics.benefits.analysis.title",
      descKey: "physics.benefits.analysis.desc",
    },
  ];

  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />

      {/* Hero Section */}
      <section className="physics-hero-section">
        <div className="physics-hero-content">
          <span className="physics-brand-tag">WhimsyLabs Virtual Lab</span>
          <h1 className="physics-hero-title">{t("physics.hero.title")}</h1>
          <p className="physics-hero-subtitle">{t("physics.hero.subtitle")}</p>
          <div className="physics-hero-cta">
            <a href={`/${language === 'en' ? '' : language + '/'}contact`} className="physics-btn-primary">
              {t("physics.hero.cta")}
            </a>
            <a href={`/${language === 'en' ? '' : language + '/'}features`} className="physics-btn-secondary">
              {t("physics.hero.ctaSecondary")}
            </a>
          </div>
        </div>
        <div className="physics-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z" fill="#201853" />
          </svg>
        </div>
      </section>

      <BubbleContainer>
        {/* Introduction Section */}
        <section className="physics-intro-section">
          <div className="physics-container">
            <h2 className="physics-section-title">{t("physics.intro.title")}</h2>
            <p className="physics-intro-text">{t("physics.intro.text1")}</p>
            <p className="physics-intro-text">{t("physics.intro.text2")}</p>
            <p className="physics-intro-text">
              <a href={`/${language === 'en' ? '' : language + '/'}blog/virtual-physics-lab-simulations-teach`} className="physics-learn-more-link">
                {t("physics.intro.learnMore") || "Learn more about our physics lab simulator →"}
              </a>
            </p>
          </div>
        </section>

        {/* Experiments Section */}
        <section className="physics-experiments-section">
          <div className="physics-container">
            <h2 className="physics-section-title">{t("physics.experiments.title")}</h2>
            <p className="physics-section-subtitle">{t("physics.experiments.subtitle")}</p>
            <div className="physics-experiments-grid">
              {experiments.map((exp, index) => (
                <div key={index} className="physics-experiment-card">
                  <div className="physics-experiment-icon">{exp.icon}</div>
                  <h3 className="physics-experiment-title">{t(exp.titleKey)}</h3>
                  <p className="physics-experiment-desc">{t(exp.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="physics-benefits-section">
          <div className="physics-container">
            <h2 className="physics-section-title">{t("physics.benefits.title")}</h2>
            <div className="physics-benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="physics-benefit-card">
                  <div className="physics-benefit-icon">{benefit.icon}</div>
                  <h3 className="physics-benefit-title">{t(benefit.titleKey)}</h3>
                  <p className="physics-benefit-desc">{t(benefit.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="physics-curriculum-section">
          <div className="physics-container">
            <h2 className="physics-section-title">{t("physics.curriculum.title")}</h2>
            <p className="physics-curriculum-text">{t("physics.curriculum.text")}</p>
            <div className="physics-curriculum-badges">
              <span className="physics-badge">GCSE</span>
              <span className="physics-badge">A-Level</span>
              <span className="physics-badge">IB</span>
              <span className="physics-badge">AP Physics</span>
              <span className="physics-badge">KS3</span>
              <span className="physics-badge">KS4</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="physics-cta-section">
          <div className="physics-container">
            <h2 className="physics-cta-title">{t("physics.cta.title")}</h2>
            <p className="physics-cta-text">{t("physics.cta.text")}</p>
            <a href={`/${language === 'en' ? '' : language + '/'}contact`} className="physics-btn-primary physics-btn-large">
              {t("physics.cta.button")}
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation(PhysicsPage);
