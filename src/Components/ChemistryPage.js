import React from "react";
import "./ChemistryPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import withTranslation from "./withTranslation";

const ChemistryPage = ({ t, language }) => {
  const experiments = [
    {
      icon: "🧪",
      titleKey: "chemistry.experiments.titration.title",
      descKey: "chemistry.experiments.titration.desc",
    },
    {
      icon: "⚗️",
      titleKey: "chemistry.experiments.reactions.title",
      descKey: "chemistry.experiments.reactions.desc",
    },
    {
      icon: "🔬",
      titleKey: "chemistry.experiments.molecular.title",
      descKey: "chemistry.experiments.molecular.desc",
    },
    {
      icon: "🔥",
      titleKey: "chemistry.experiments.combustion.title",
      descKey: "chemistry.experiments.combustion.desc",
    },
    {
      icon: "💧",
      titleKey: "chemistry.experiments.electrolysis.title",
      descKey: "chemistry.experiments.electrolysis.desc",
    },
    {
      icon: "⚖️",
      titleKey: "chemistry.experiments.stoichiometry.title",
      descKey: "chemistry.experiments.stoichiometry.desc",
    },
  ];

  const benefits = [
    {
      icon: "🛡️",
      titleKey: "chemistry.benefits.safety.title",
      descKey: "chemistry.benefits.safety.desc",
    },
    {
      icon: "♻️",
      titleKey: "chemistry.benefits.unlimited.title",
      descKey: "chemistry.benefits.unlimited.desc",
    },
    {
      icon: "🎯",
      titleKey: "chemistry.benefits.feedback.title",
      descKey: "chemistry.benefits.feedback.desc",
    },
    {
      icon: "📊",
      titleKey: "chemistry.benefits.data.title",
      descKey: "chemistry.benefits.data.desc",
    },
  ];

  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />

      {/* Hero Section */}
      <section className="chemistry-hero-section">
        <div className="chemistry-hero-content">
          <span className="chemistry-brand-tag">WhimsyLabs Virtual Lab</span>
          <h1 className="chemistry-hero-title">{t("chemistry.hero.title")}</h1>
          <p className="chemistry-hero-subtitle">{t("chemistry.hero.subtitle")}</p>
          <div className="chemistry-hero-cta">
            <a href={`/${language === 'en' ? '' : language + '/'}contact`} className="chemistry-btn-primary">
              {t("chemistry.hero.cta")}
            </a>
            <a href={`/${language === 'en' ? '' : language + '/'}features`} className="chemistry-btn-secondary">
              {t("chemistry.hero.ctaSecondary")}
            </a>
          </div>
        </div>
        <div className="chemistry-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z" fill="#201853" />
          </svg>
        </div>
      </section>

      <BubbleContainer>
        {/* Introduction Section */}
        <section className="chemistry-intro-section">
          <div className="chemistry-container">
            <h2 className="chemistry-section-title">{t("chemistry.intro.title")}</h2>
            <p className="chemistry-intro-text">{t("chemistry.intro.text1")}</p>
            <p className="chemistry-intro-text">{t("chemistry.intro.text2")}</p>
          </div>
        </section>

        {/* Experiments Section */}
        <section className="chemistry-experiments-section">
          <div className="chemistry-container">
            <h2 className="chemistry-section-title">{t("chemistry.experiments.title")}</h2>
            <p className="chemistry-section-subtitle">{t("chemistry.experiments.subtitle")}</p>
            <div className="chemistry-experiments-grid">
              {experiments.map((exp, index) => (
                <div key={index} className="chemistry-experiment-card">
                  <div className="chemistry-experiment-icon">{exp.icon}</div>
                  <h3 className="chemistry-experiment-title">{t(exp.titleKey)}</h3>
                  <p className="chemistry-experiment-desc">{t(exp.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="chemistry-benefits-section">
          <div className="chemistry-container">
            <h2 className="chemistry-section-title">{t("chemistry.benefits.title")}</h2>
            <div className="chemistry-benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="chemistry-benefit-card">
                  <div className="chemistry-benefit-icon">{benefit.icon}</div>
                  <h3 className="chemistry-benefit-title">{t(benefit.titleKey)}</h3>
                  <p className="chemistry-benefit-desc">{t(benefit.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="chemistry-curriculum-section">
          <div className="chemistry-container">
            <h2 className="chemistry-section-title">{t("chemistry.curriculum.title")}</h2>
            <p className="chemistry-curriculum-text">{t("chemistry.curriculum.text")}</p>
            <div className="chemistry-curriculum-badges">
              <span className="chemistry-badge">GCSE</span>
              <span className="chemistry-badge">A-Level</span>
              <span className="chemistry-badge">IB</span>
              <span className="chemistry-badge">AP Chemistry</span>
              <span className="chemistry-badge">KS3</span>
              <span className="chemistry-badge">KS4</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="chemistry-cta-section">
          <div className="chemistry-container">
            <h2 className="chemistry-cta-title">{t("chemistry.cta.title")}</h2>
            <p className="chemistry-cta-text">{t("chemistry.cta.text")}</p>
            <a href={`/${language === 'en' ? '' : language + '/'}contact`} className="chemistry-btn-primary chemistry-btn-large">
              {t("chemistry.cta.button")}
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation(ChemistryPage);
