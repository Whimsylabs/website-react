import React, { useState } from "react";
import "./ErasmusGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

// Import translations
import enTranslations from "../i18n/grants/erasmus/en";
import esTranslations from "../i18n/grants/erasmus/es";
import frTranslations from "../i18n/grants/erasmus/fr";
import deTranslations from "../i18n/grants/erasmus/de";
import jaTranslations from "../i18n/grants/erasmus/ja";

const translations = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  jp: jaTranslations,
  ja: jaTranslations, // alias
};

const ErasmusGrantPage = ({ language = "en" }) => {
  const t = translations[language] || translations.en;
  
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    role: "",
    country: "",
    projectIdea: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Send to CRM (fire-and-forget - don't block form submission)
    const { first_name, last_name } = parseFullName(formData.name);
    sendToCRM({
      form_type: 'partnership',
      email: formData.email,
      first_name,
      last_name,
      company: formData.school,
      job_title: formData.role,
      message: formData.message,
      metadata: {
        source: 'erasmus_grant_page',
        country: formData.country,
        project_idea: formData.projectIdea
      }
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "56f94211-0d3e-48a1-a2e0-2d174b945080",
          name: formData.name,
          school: formData.school,
          email: formData.email,
          role: formData.role,
          country: formData.country,
          projectIdea: formData.projectIdea,
          message: formData.message,
          subject: "Erasmus+ Grant Inquiry - WhimsyLabs Partner Request",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", school: "", email: "", role: "", country: "", projectIdea: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />

      {/* Hero Section */}
      <section className="erasmus-hero-section">
        <div
          className="erasmus-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="erasmus-hero-content">
            <AnimatedTitle
              text={t.hero.title}
              className="erasmus-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="erasmus-hero-subtitle">
              <strong>{t.hero.subtitle}</strong>
              <br />
              {t.hero.subtitleDescription}
            </p>
            <div className="erasmus-hero-badges">
              <div className="erasmus-badge erasmus-badge-primary">
                💰 €120,000 - €400,000
              </div>
              <div className="erasmus-badge erasmus-badge-secondary">
                📅 {t.hero.badges.duration}
              </div>
              <div className="erasmus-badge erasmus-badge-secondary">
                🇪🇺 {t.hero.badges.callOpen}
              </div>
            </div>
          </div>

          <div className="erasmus-hero-ctas">
            <a href="#apply" className="erasmus-cta-button erasmus-cta-primary">
              {t.hero.cta.apply}
            </a>
            <a href="#what-you-get" className="erasmus-cta-button erasmus-cta-secondary">
              {t.hero.cta.whatYouGet}
            </a>
            <a href="#eligibility" className="erasmus-cta-button erasmus-cta-secondary">
              {t.hero.cta.eligibility}
            </a>
          </div>
        </div>
        <div className="erasmus-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z"
              fill="#201853"
            />
          </svg>
        </div>
      </section>

      {/* The Opportunity Section */}
      <BubbleContainer>
        <section className="erasmus-about-section">
          <h2>{t.about.title}</h2>
          <p className="erasmus-section-description">
            {t.about.description}
          </p>
          
          <div className="erasmus-info-cards">
            <div className="erasmus-info-card">
              <div className="erasmus-info-icon">🎯</div>
              <h3>{t.about.cards.opportunity.title}</h3>
              <p>{t.about.cards.opportunity.description}</p>
            </div>
            <div className="erasmus-info-card">
              <div className="erasmus-info-icon">🤝</div>
              <h3>{t.about.cards.partnership.title}</h3>
              <p>{t.about.cards.partnership.description}</p>
            </div>
            <div className="erasmus-info-card">
              <div className="erasmus-info-icon">🚀</div>
              <h3>{t.about.cards.support.title}</h3>
              <p>{t.about.cards.support.description}</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* What You Get Section */}
      <section id="what-you-get" className="erasmus-package-section">
        <div className="container">
          <h2>{t.whatYouGet.title}</h2>
          <p className="erasmus-section-description">
            {t.whatYouGet.description}
          </p>

          <div className="erasmus-package-grid">
            <div className="erasmus-package-card erasmus-package-whimsy">
              <div className="erasmus-package-icon">🎁</div>
              <h3>{t.whatYouGet.whimsylabs.title}</h3>
              <ul>
                {t.whatYouGet.whimsylabs.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="erasmus-package-card erasmus-package-grant">
              <div className="erasmus-package-icon">💶</div>
              <h3>{t.whatYouGet.grantCovers.title}</h3>
              <ul>
                {t.whatYouGet.grantCovers.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="erasmus-package-highlight">
                <strong>💡 {t.whatYouGet.grantCovers.tip}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Support Section */}
      <BubbleContainer>
        <section className="erasmus-help-section">
          <h2>{t.support.title}</h2>
          <p className="erasmus-section-description">
            {t.support.description}
          </p>

          <div className="erasmus-features-grid">
            {t.support.features.map((feature, index) => (
              <div className="erasmus-feature-item" key={index}>
                <div className="erasmus-feature-number">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </BubbleContainer>

      {/* Key Information Section */}
      <section className="erasmus-dates-section">
        <div className="container">
          <h2>{t.keyInfo.title}</h2>
          <p className="erasmus-section-description">
            {t.keyInfo.description}
          </p>
          
          <div className="erasmus-timeline">
            {t.keyInfo.timeline.map((item, index) => (
              <div className={`erasmus-timeline-item ${item.highlight ? 'erasmus-timeline-open' : ''}`} key={index}>
                <div className="erasmus-timeline-marker">{item.icon}</div>
                <div className="erasmus-timeline-content">
                  <h3>{item.title}</h3>
                  <p className="erasmus-date">{item.date}</p>
                  {item.note && <p className="erasmus-deadline-note">{item.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <BubbleContainer>
        <section id="eligibility" className="erasmus-eligibility-section">
          <h2>{t.eligibility.title}</h2>
          <p className="erasmus-section-description">
            {t.eligibility.description}
          </p>

          <div className="erasmus-eligibility-grid">
            <div className="erasmus-eligibility-card erasmus-eligible">
              <h3>✅ {t.eligibility.canApply.title}</h3>
              <ul>
                {t.eligibility.canApply.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="erasmus-eligibility-card erasmus-partners">
              <h3>🤝 {t.eligibility.partnership.title}</h3>
              <ul>
                {t.eligibility.partnership.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Apply Section */}
      <section id="apply" className="erasmus-contact-section">
        <div className="container">
          <h2>{t.apply.title}</h2>
          <p className="erasmus-contact-description">
            {t.apply.description}
          </p>

          <form className="erasmus-contact-form" onSubmit={handleSubmit}>
            <div className="erasmus-form-row">
              <div className="erasmus-form-group">
                <label htmlFor="name">{t.apply.form.name} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={t.apply.form.namePlaceholder}
                />
              </div>

              <div className="erasmus-form-group">
                <label htmlFor="school">{t.apply.form.school} *</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  required
                  placeholder={t.apply.form.schoolPlaceholder}
                />
              </div>
            </div>

            <div className="erasmus-form-row">
              <div className="erasmus-form-group">
                <label htmlFor="email">{t.apply.form.email} *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={t.apply.form.emailPlaceholder}
                />
              </div>

              <div className="erasmus-form-group">
                <label htmlFor="role">{t.apply.form.role}</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder={t.apply.form.rolePlaceholder}
                />
              </div>
            </div>

            <div className="erasmus-form-group">
              <label htmlFor="country">{t.apply.form.country}</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="">{t.apply.form.countryPlaceholder}</option>
                {t.apply.form.countries.map((country, index) => (
                  <option key={index} value={country.value}>{country.label}</option>
                ))}
              </select>
            </div>

            <div className="erasmus-form-group">
              <label htmlFor="projectIdea">{t.apply.form.projectIdea}</label>
              <textarea
                id="projectIdea"
                name="projectIdea"
                value={formData.projectIdea}
                onChange={handleInputChange}
                rows="3"
                placeholder={t.apply.form.projectIdeaPlaceholder}
              ></textarea>
            </div>

            <div className="erasmus-form-group">
              <label htmlFor="message">{t.apply.form.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder={t.apply.form.messagePlaceholder}
              ></textarea>
            </div>

            <button
              type="submit"
              className="erasmus-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? t.apply.form.sending : t.apply.form.submit}
            </button>

            {formStatus === "success" && (
              <div className="erasmus-form-success">
                ✅ <strong>{t.apply.form.successTitle}</strong> {t.apply.form.successMessage}
              </div>
            )}

            {formStatus === "error" && (
              <div className="erasmus-form-error">
                {t.apply.form.errorMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Final CTA Section */}
      <BubbleContainer>
        <section className="erasmus-cta-section">
          <h2>{t.finalCta.title}</h2>
          <p>{t.finalCta.description}</p>
          <div className="erasmus-cta-buttons">
            <a href="#apply" className="btn erasmus-cta-primary">
              {t.finalCta.partnerButton}
            </a>
            <a 
              href="https://erasmus-plus.ec.europa.eu/programme-guide/part-b/key-action-2/partnerships-for-cooperation" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn erasmus-cta-secondary"
            >
              {t.finalCta.officialButton}
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default ErasmusGrantPage;
