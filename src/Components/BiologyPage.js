import React from "react";
import "./BiologyPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import withTranslation from "./withTranslation";

const BiologyPage = ({ t, language }) => {
  const experiments = [
    {
      icon: "🔬",
      titleKey: "biology.experiments.microscopy.title",
      descKey: "biology.experiments.microscopy.desc",
    },
    {
      icon: "🫀",
      titleKey: "biology.experiments.dissection.title",
      descKey: "biology.experiments.dissection.desc",
    },
    {
      icon: "🧬",
      titleKey: "biology.experiments.dna.title",
      descKey: "biology.experiments.dna.desc",
    },
    {
      icon: "🦠",
      titleKey: "biology.experiments.cells.title",
      descKey: "biology.experiments.cells.desc",
    },
    {
      icon: "🌱",
      titleKey: "biology.experiments.photosynthesis.title",
      descKey: "biology.experiments.photosynthesis.desc",
    },
    {
      icon: "🩸",
      titleKey: "biology.experiments.circulation.title",
      descKey: "biology.experiments.circulation.desc",
    },
  ];

  const benefits = [
    {
      icon: "🐸",
      titleKey: "biology.benefits.ethical.title",
      descKey: "biology.benefits.ethical.desc",
    },
    {
      icon: "🔁",
      titleKey: "biology.benefits.repeat.title",
      descKey: "biology.benefits.repeat.desc",
    },
    {
      icon: "🎯",
      titleKey: "biology.benefits.detail.title",
      descKey: "biology.benefits.detail.desc",
    },
    {
      icon: "📈",
      titleKey: "biology.benefits.progress.title",
      descKey: "biology.benefits.progress.desc",
    },
  ];

  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />

      {/* Hero Section */}
      <section className="biology-hero-section">
        <div className="biology-hero-content">
          <span className="biology-brand-tag">WhimsyLabs Virtual Lab</span>
          <h1 className="biology-hero-title">{t("biology.hero.title")}</h1>
          <p className="biology-hero-subtitle">{t("biology.hero.subtitle")}</p>
          <div className="biology-hero-cta">
            <a href={`/${language === 'en' ? '' : language + '/'}contact`} className="biology-btn-primary">
              {t("biology.hero.cta")}
            </a>
            <a href={`/${language === 'en' ? '' : language + '/'}features`} className="biology-btn-secondary">
              {t("biology.hero.ctaSecondary")}
            </a>
          </div>
        </div>
        <div className="biology-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z" fill="#201853" />
          </svg>
        </div>
      </section>

      <BubbleContainer>
        {/* Introduction Section */}
        <section className="biology-intro-section">
          <div className="biology-container">
            <h2 className="biology-section-title">{t("biology.intro.title")}</h2>
            <p className="biology-intro-text">{t("biology.intro.text1")}</p>
            <p className="biology-intro-text">{t("biology.intro.text2")}</p>
          </div>
        </section>

        {/* Experiments Section */}
        <section className="biology-experiments-section">
          <div className="biology-container">
            <h2 className="biology-section-title">{t("biology.experiments.title")}</h2>
            <p className="biology-section-subtitle">{t("biology.experiments.subtitle")}</p>
            <div className="biology-experiments-grid">
              {experiments.map((exp, index) => (
                <div key={index} className="biology-experiment-card">
                  <div className="biology-experiment-icon">{exp.icon}</div>
                  <h3 className="biology-experiment-title">{t(exp.titleKey)}</h3>
                  <p className="biology-experiment-desc">{t(exp.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="biology-benefits-section">
          <div className="biology-container">
            <h2 className="biology-section-title">{t("biology.benefits.title")}</h2>
            <div className="biology-benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="biology-benefit-card">
                  <div className="biology-benefit-icon">{benefit.icon}</div>
                  <h3 className="biology-benefit-title">{t(benefit.titleKey)}</h3>
                  <p className="biology-benefit-desc">{t(benefit.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="biology-curriculum-section">
          <div className="biology-container">
            <h2 className="biology-section-title">{t("biology.curriculum.title")}</h2>
            <p className="biology-curriculum-text">{t("biology.curriculum.text")}</p>
            <div className="biology-curriculum-badges">
              <span className="biology-badge">GCSE</span>
              <span className="biology-badge">A-Level</span>
              <span className="biology-badge">IB</span>
              <span className="biology-badge">AP Biology</span>
              <span className="biology-badge">KS3</span>
              <span className="biology-badge">KS4</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="biology-cta-section">
          <div className="biology-container">
            <h2 className="biology-cta-title">{t("biology.cta.title")}</h2>
            <p className="biology-cta-text">{t("biology.cta.text")}</p>
            <a href={`/${language === 'en' ? '' : language + '/'}contact`} className="biology-btn-primary biology-btn-large">
              {t("biology.cta.button")}
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation(BiologyPage);
