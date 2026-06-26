import React, { useState } from "react";
import "./JapanEducationGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

// Import translations
import jaTranslations from "../i18n/grants/japan-education/ja";
import enTranslations from "../i18n/grants/japan-education/en";

const JapanEducationGrantPage = ({ language = "jp" }) => {
  // Get the appropriate translations based on language
  const t = language === "jp" ? jaTranslations : enTranslations;

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
        source: 'japan_education_grant_page',
        grant_type: formData.grantType,
        country: 'Japan'
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
          subject: "Japan Education Grant Inquiry - WhimsyLabs",
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
      <section className="jeg-hero-section">
        <div
          className="jeg-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="jeg-hero-content">
            <AnimatedTitle
              text={t.hero.title}
              className="jeg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="jeg-hero-subtitle">
              <strong>{t.hero.subtitleStrong}</strong>
              <br />
              {t.hero.subtitleText}
            </p>
            <div className="jeg-hero-badges">
              <div className="jeg-badge jeg-badge-primary">
                {t.hero.badge1}
              </div>
              <div className="jeg-badge jeg-badge-secondary">
                {t.hero.badge2}
              </div>
              <div className="jeg-badge jeg-badge-secondary">
                {t.hero.badge3}
              </div>
            </div>
          </div>

          <div className="jeg-hero-ctas">
            <a href="#apply" className="jeg-cta-button jeg-cta-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#grants" className="jeg-cta-button jeg-cta-secondary">
              {t.hero.ctaSecondary}
            </a>
            <a href="#giga" className="jeg-cta-button jeg-cta-secondary">
              {t.hero.ctaTertiary}
            </a>
          </div>
        </div>
        <div className="jeg-wave-divider">
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
        <section className="jeg-about-section">
          <h2>{t.about.title}</h2>
          <p className="jeg-section-description">
            {t.about.description}
          </p>
          
          <div className="jeg-info-cards">
            <div className="jeg-info-card">
              <div className="jeg-info-icon">🎯</div>
              <h3>{t.about.card1.title}</h3>
              <p>{t.about.card1.text}</p>
            </div>
            <div className="jeg-info-card">
              <div className="jeg-info-icon">💻</div>
              <h3>{t.about.card2.title}</h3>
              <p>{t.about.card2.text}</p>
            </div>
            <div className="jeg-info-card">
              <div className="jeg-info-icon">🤝</div>
              <h3>{t.about.card3.title}</h3>
              <p>{t.about.card3.text}</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* GIGA School Section */}
      <section id="giga" className="jeg-giga-section">
        <div className="container">
          <h2>{t.giga.title}</h2>
          <p className="jeg-section-description">
            {t.giga.description}
          </p>

          <div className="jeg-giga-grid">
            <div className="jeg-giga-card jeg-giga-compatible">
              <div className="jeg-giga-icon">✅</div>
              <h3>{t.giga.compatible.title}</h3>
              <ul>
                {t.giga.compatible.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="jeg-giga-card jeg-giga-benefits">
              <div className="jeg-giga-icon">🎓</div>
              <h3>{t.giga.benefits.title}</h3>
              <ul>
                {t.giga.benefits.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Types Section */}
      <BubbleContainer>
        <section id="grants" className="jeg-grants-section">
          <h2>{t.grants.title}</h2>
          <p className="jeg-section-description">
            {t.grants.description}
          </p>

          {/* MEXT Grant */}
          <div className="jeg-grant-card">
            <div className="jeg-grant-header">
              <div className="jeg-grant-icon">🏛️</div>
              <div className="jeg-grant-title-block">
                <h3>{t.grants.mext.title}</h3>
                <span className="jeg-grant-subtitle">{t.grants.mext.subtitle}</span>
              </div>
            </div>
            <div className="jeg-grant-content">
              <p>{t.grants.mext.description}</p>
              <div className="jeg-grant-details">
                <div className="jeg-grant-detail">
                  <strong>{t.grants.mext.targetLabel}</strong>
                  <span>{t.grants.mext.target}</span>
                </div>
                <div className="jeg-grant-detail">
                  <strong>{t.grants.mext.purposeLabel}</strong>
                  <span>{t.grants.mext.purpose}</span>
                </div>
              </div>
              <div className="jeg-grant-highlight">
                <p>{t.grants.mext.highlight}</p>
              </div>
            </div>
          </div>

          {/* JSPS Kakenhi */}
          <div className="jeg-grant-card">
            <div className="jeg-grant-header">
              <div className="jeg-grant-icon">🔬</div>
              <div className="jeg-grant-title-block">
                <h3>{t.grants.jsps.title}</h3>
                <span className="jeg-grant-subtitle">{t.grants.jsps.subtitle}</span>
              </div>
            </div>
            <div className="jeg-grant-content">
              <p>{t.grants.jsps.description}</p>
              <div className="jeg-grant-details">
                <div className="jeg-grant-detail">
                  <strong>{t.grants.jsps.targetLabel}</strong>
                  <span>{t.grants.jsps.target}</span>
                </div>
                <div className="jeg-grant-detail">
                  <strong>{t.grants.jsps.amountLabel}</strong>
                  <span>{t.grants.jsps.amount}</span>
                </div>
              </div>
              <div className="jeg-grant-highlight">
                <p>{t.grants.jsps.highlight}</p>
              </div>
            </div>
          </div>

          {/* GIGA School Grant */}
          <div className="jeg-grant-card">
            <div className="jeg-grant-header">
              <div className="jeg-grant-icon">💻</div>
              <div className="jeg-grant-title-block">
                <h3>{t.grants.gigaGrant.title}</h3>
                <span className="jeg-grant-subtitle">{t.grants.gigaGrant.subtitle}</span>
              </div>
            </div>
            <div className="jeg-grant-content">
              <p>{t.grants.gigaGrant.description}</p>
              <div className="jeg-grant-details">
                <div className="jeg-grant-detail">
                  <strong>{t.grants.gigaGrant.targetLabel}</strong>
                  <span>{t.grants.gigaGrant.target}</span>
                </div>
                <div className="jeg-grant-detail">
                  <strong>{t.grants.gigaGrant.focusLabel}</strong>
                  <span>{t.grants.gigaGrant.focus}</span>
                </div>
              </div>
              <div className="jeg-grant-highlight">
                <p>{t.grants.gigaGrant.highlight}</p>
              </div>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* How We Help Section */}
      <section className="jeg-help-section">
        <div className="container">
          <h2>{t.help.title}</h2>
          <p className="jeg-section-description">
            {t.help.description}
          </p>

          <div className="jeg-features-grid">
            {t.help.features.map((feature, index) => (
              <div className="jeg-feature-item" key={index}>
                <div className="jeg-feature-number">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <BubbleContainer>
        <section id="apply" className="jeg-contact-section">
          <h2>{t.apply.title}</h2>
          <p className="jeg-contact-description">
            {t.apply.description}
          </p>

          <form className="jeg-contact-form" onSubmit={handleSubmit}>
            <div className="jeg-form-row">
              <div className="jeg-form-group">
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

              <div className="jeg-form-group">
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

            <div className="jeg-form-row">
              <div className="jeg-form-group">
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

              <div className="jeg-form-group">
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

            <div className="jeg-form-group">
              <label htmlFor="grantType">{t.apply.form.grantType}</label>
              <select
                id="grantType"
                name="grantType"
                value={formData.grantType}
                onChange={handleInputChange}
              >
                <option value="">{t.apply.form.grantTypeOptions.select}</option>
                <option value="mext">{t.apply.form.grantTypeOptions.mext}</option>
                <option value="jsps">{t.apply.form.grantTypeOptions.jsps}</option>
                <option value="giga">{t.apply.form.grantTypeOptions.giga}</option>
                <option value="other">{t.apply.form.grantTypeOptions.other}</option>
              </select>
            </div>

            <div className="jeg-form-group">
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
              className="jeg-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? t.apply.form.sending : t.apply.form.submit}
            </button>

            {formStatus === "success" && (
              <div className="jeg-form-success">
                ✅ {t.apply.form.success}
              </div>
            )}

            {formStatus === "error" && (
              <div className="jeg-form-error">
                {t.apply.form.error}
              </div>
            )}
          </form>
        </section>
      </BubbleContainer>

      {/* Final CTA Section */}
      <section className="jeg-cta-section">
        <div className="container">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.description}</p>
          <div className="jeg-cta-buttons">
            <a href="#apply" className="btn jeg-cta-primary">
              {t.cta.primaryButton}
            </a>
            <a 
              href="https://www.mext.go.jp/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn jeg-cta-secondary"
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

export default JapanEducationGrantPage;
