import React, { useState } from "react";
import "./EUGrantsPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

// Import translations
import enTranslations from "../i18n/grants/eu-education/en";

const EUGrantsPage = ({ language = "en" }) => {
  // Get the appropriate translations based on language
  const t = enTranslations; // Currently English only

  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    role: "",
    grantType: "",
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

    // Send to CRM (fire-and-forget)
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
        source: 'eu_grants_page',
        grant_type: formData.grantType,
        region: 'European Union'
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
          grantType: formData.grantType,
          message: formData.message,
          subject: "EU Education Grant Inquiry - WhimsyLabs",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", school: "", email: "", role: "", grantType: "", message: "" });
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
      <section className="eug-hero-section">
        <div
          className="eug-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="eug-hero-content">
            <AnimatedTitle
              text={t.hero.title}
              className="eug-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="eug-hero-subtitle">
              <strong>{t.hero.subtitleStrong}</strong>
              <br />
              {t.hero.subtitleText}
            </p>
            <div className="eug-hero-badges">
              <div className="eug-badge eug-badge-primary">
                {t.hero.badge1}
              </div>
              <div className="eug-badge eug-badge-secondary">
                {t.hero.badge2}
              </div>
              <div className="eug-badge eug-badge-secondary">
                {t.hero.badge3}
              </div>
            </div>
          </div>

          <div className="eug-hero-ctas">
            <a href="#apply" className="eug-cta-button eug-cta-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#grants" className="eug-cta-button eug-cta-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="eug-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z"
              fill="#201853"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <BubbleContainer>
        <section className="eug-about-section">
          <h2>{t.about.title}</h2>
          <p className="eug-section-description">
            {t.about.description}
          </p>
          
          <div className="eug-info-cards">
            <div className="eug-info-card">
              <div className="eug-info-icon">💰</div>
              <h3>{t.about.card1.title}</h3>
              <p>{t.about.card1.text}</p>
            </div>
            <div className="eug-info-card">
              <div className="eug-info-icon">🌍</div>
              <h3>{t.about.card2.title}</h3>
              <p>{t.about.card2.text}</p>
            </div>
            <div className="eug-info-card">
              <div className="eug-info-icon">🤝</div>
              <h3>{t.about.card3.title}</h3>
              <p>{t.about.card3.text}</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Grant Types Section */}
      <BubbleContainer>
        <section id="grants" className="eug-grants-section">
          <h2>{t.grants.title}</h2>
          <p className="eug-section-description">
            {t.grants.description}
          </p>

          {/* Key Actions */}
          <div className="eug-grant-card">
            <div className="eug-grant-header">
              <div className="eug-grant-icon">🇪🇺</div>
              <div className="eug-grant-title-block">
                <h3>{t.grants.keyActions.title}</h3>
                <span className="eug-grant-subtitle">{t.grants.keyActions.subtitle}</span>
              </div>
            </div>
            <div className="eug-grant-content">
              <p>{t.grants.keyActions.description}</p>
              <div className="eug-grant-details">
                <div className="eug-grant-detail">
                  <strong>{t.grants.keyActions.targetLabel}</strong>
                  <span>{t.grants.keyActions.target}</span>
                </div>
                <div className="eug-grant-detail">
                  <strong>{t.grants.keyActions.purposeLabel}</strong>
                  <span>{t.grants.keyActions.purpose}</span>
                </div>
              </div>
              <div className="eug-grant-highlight">
                <p>{t.grants.keyActions.highlight}</p>
              </div>
            </div>
          </div>

          {/* Digital AI */}
          <div className="eug-grant-card">
            <div className="eug-grant-header">
              <div className="eug-grant-icon">🤖</div>
              <div className="eug-grant-title-block">
                <h3>{t.grants.digitalAI.title}</h3>
                <span className="eug-grant-subtitle">{t.grants.digitalAI.subtitle}</span>
              </div>
            </div>
            <div className="eug-grant-content">
              <p>{t.grants.digitalAI.description}</p>
              <div className="eug-grant-details">
                <div className="eug-grant-detail">
                  <strong>{t.grants.digitalAI.targetLabel}</strong>
                  <span>{t.grants.digitalAI.target}</span>
                </div>
                <div className="eug-grant-detail">
                  <strong>{t.grants.digitalAI.purposeLabel}</strong>
                  <span>{t.grants.digitalAI.purpose}</span>
                </div>
              </div>
              <div className="eug-grant-highlight">
                <p>{t.grants.digitalAI.highlight}</p>
              </div>
            </div>
          </div>

          {/* Digital Education */}
          <div className="eug-grant-card">
            <div className="eug-grant-header">
              <div className="eug-grant-icon">💻</div>
              <div className="eug-grant-title-block">
                <h3>{t.grants.digitalEducation.title}</h3>
                <span className="eug-grant-subtitle">{t.grants.digitalEducation.subtitle}</span>
              </div>
            </div>
            <div className="eug-grant-content">
              <p>{t.grants.digitalEducation.description}</p>
              <div className="eug-grant-details">
                <div className="eug-grant-detail">
                  <strong>{t.grants.digitalEducation.targetLabel}</strong>
                  <span>{t.grants.digitalEducation.target}</span>
                </div>
                <div className="eug-grant-detail">
                  <strong>{t.grants.digitalEducation.purposeLabel}</strong>
                  <span>{t.grants.digitalEducation.purpose}</span>
                </div>
              </div>
              <div className="eug-grant-highlight">
                <p>{t.grants.digitalEducation.highlight}</p>
              </div>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Partnership Section */}
      <section className="eug-partnership-section">
        <div className="container">
          <h2>{t.partnership.title}</h2>
          <p className="eug-section-description">
            {t.partnership.description}
          </p>

          <div className="eug-partnership-grid">
            {t.partnership.benefits.map((benefit, index) => (
              <div className="eug-partnership-card" key={index}>
                <div className="eug-partnership-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <BubbleContainer>
        <section className="eug-help-section">
          <div className="container">
            <h2>{t.help.title}</h2>
            <p className="eug-section-description">
              {t.help.description}
            </p>

            <div className="eug-features-grid">
              {t.help.features.map((feature, index) => (
                <div className="eug-feature-item" key={index}>
                  <div className="eug-feature-number">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Apply Section */}
      <BubbleContainer>
        <section id="apply" className="eug-contact-section">
          <h2>{t.apply.title}</h2>
          <p className="eug-contact-description">
            {t.apply.description}
          </p>

          <form className="eug-contact-form" onSubmit={handleSubmit}>
            <div className="eug-form-row">
              <div className="eug-form-group">
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

              <div className="eug-form-group">
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

            <div className="eug-form-row">
              <div className="eug-form-group">
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

              <div className="eug-form-group">
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

            <div className="eug-form-group">
              <label htmlFor="grantType">{t.apply.form.grantType}</label>
              <select
                id="grantType"
                name="grantType"
                value={formData.grantType}
                onChange={handleInputChange}
              >
                <option value="">{t.apply.form.grantTypeOptions.select}</option>
                <option value="ka2">{t.apply.form.grantTypeOptions.ka2}</option>
                <option value="digital-ai">{t.apply.form.grantTypeOptions.digitalAI}</option>
                <option value="digital-ed">{t.apply.form.grantTypeOptions.digitalEd}</option>
                <option value="other">{t.apply.form.grantTypeOptions.other}</option>
              </select>
            </div>

            <div className="eug-form-group">
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
              className="eug-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? t.apply.form.sending : t.apply.form.submit}
            </button>

            {formStatus === "success" && (
              <div className="eug-form-success">
                ✅ {t.apply.form.success}
              </div>
            )}

            {formStatus === "error" && (
              <div className="eug-form-error">
                {t.apply.form.error}
              </div>
            )}
          </form>
        </section>
      </BubbleContainer>

      {/* Resources Section */}
      <section className="eug-resources-section">
        <div className="container">
          <h2>{t.resources.title}</h2>
          <p className="eug-section-description">{t.resources.description}</p>
          <div className="eug-resources-list">
            {t.resources.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="eug-resource-link"
              >
                <span className="eug-resource-title">{link.title}</span>
                <span className="eug-resource-desc">{link.description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="eug-cta-section">
        <div className="container">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.description}</p>
          <div className="eug-cta-buttons">
            <a href="#apply" className="btn eug-cta-primary">
              {t.cta.primaryButton}
            </a>
            <a 
              href="/grants/" 
              className="btn eug-cta-secondary"
            >
              {t.cta.secondaryButton}
            </a>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
};

export default EUGrantsPage;
