import React, { useState } from "react";
import "./UKGrantsPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

// Import translations
import enTranslations from "../i18n/grants/uk-education/en";

const UKGrantsPage = ({ language = "en" }) => {
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
        source: 'uk_grants_page',
        grant_type: formData.grantType,
        country: 'United Kingdom'
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
          subject: "UK Education Grant Inquiry - WhimsyLabs",
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
      <section className="ukg-hero-section">
        <div
          className="ukg-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="ukg-hero-content">
            <AnimatedTitle
              text={t.hero.title}
              className="ukg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="ukg-hero-subtitle">
              <strong>{t.hero.subtitleStrong}</strong>
              <br />
              {t.hero.subtitleText}
            </p>
            <div className="ukg-hero-badges">
              <div className="ukg-badge ukg-badge-primary">
                {t.hero.badge1}
              </div>
              <div className="ukg-badge ukg-badge-secondary">
                {t.hero.badge2}
              </div>
              <div className="ukg-badge ukg-badge-secondary">
                {t.hero.badge3}
              </div>
            </div>
          </div>

          <div className="ukg-hero-ctas">
            <a href="#apply" className="ukg-cta-button ukg-cta-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#grants" className="ukg-cta-button ukg-cta-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="ukg-wave-divider">
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
        <section className="ukg-about-section">
          <h2>{t.about.title}</h2>
          <p className="ukg-section-description">
            {t.about.description}
          </p>
          
          <div className="ukg-info-cards">
            <div className="ukg-info-card">
              <div className="ukg-info-icon">🎯</div>
              <h3>{t.about.card1.title}</h3>
              <p>{t.about.card1.text}</p>
            </div>
            <div className="ukg-info-card">
              <div className="ukg-info-icon">🏫</div>
              <h3>{t.about.card2.title}</h3>
              <p>{t.about.card2.text}</p>
            </div>
            <div className="ukg-info-card">
              <div className="ukg-info-icon">🤝</div>
              <h3>{t.about.card3.title}</h3>
              <p>{t.about.card3.text}</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Grant Types Section */}
      <BubbleContainer>
        <section id="grants" className="ukg-grants-section">
          <h2>{t.grants.title}</h2>
          <p className="ukg-section-description">
            {t.grants.description}
          </p>

          {/* Royal Society Partnership Grants */}
          <div className="ukg-grant-card">
            <div className="ukg-grant-header">
              <div className="ukg-grant-icon">👑</div>
              <div className="ukg-grant-title-block">
                <h3>{t.grants.royalSociety.title}</h3>
                <span className="ukg-grant-subtitle">{t.grants.royalSociety.subtitle}</span>
              </div>
            </div>
            <div className="ukg-grant-content">
              <p>{t.grants.royalSociety.description}</p>
              <div className="ukg-grant-details">
                <div className="ukg-grant-detail">
                  <strong>{t.grants.royalSociety.targetLabel}</strong>
                  <span>{t.grants.royalSociety.target}</span>
                </div>
                <div className="ukg-grant-detail">
                  <strong>{t.grants.royalSociety.purposeLabel}</strong>
                  <span>{t.grants.royalSociety.purpose}</span>
                </div>
              </div>
              <div className="ukg-grant-highlight">
                <p>{t.grants.royalSociety.highlight}</p>
              </div>
            </div>
          </div>

          {/* Science Community Grant */}
          <div className="ukg-grant-card">
            <div className="ukg-grant-header">
              <div className="ukg-grant-icon">🔬</div>
              <div className="ukg-grant-title-block">
                <h3>{t.grants.scienceCommunity.title}</h3>
                <span className="ukg-grant-subtitle">{t.grants.scienceCommunity.subtitle}</span>
              </div>
            </div>
            <div className="ukg-grant-content">
              <p>{t.grants.scienceCommunity.description}</p>
              <div className="ukg-grant-details">
                <div className="ukg-grant-detail">
                  <strong>{t.grants.scienceCommunity.targetLabel}</strong>
                  <span>{t.grants.scienceCommunity.target}</span>
                </div>
                <div className="ukg-grant-detail">
                  <strong>{t.grants.scienceCommunity.purposeLabel}</strong>
                  <span>{t.grants.scienceCommunity.purpose}</span>
                </div>
              </div>
              <div className="ukg-grant-highlight">
                <p>{t.grants.scienceCommunity.highlight}</p>
              </div>
            </div>
          </div>

          {/* Ironmongers Foundation */}
          <div className="ukg-grant-card">
            <div className="ukg-grant-header">
              <div className="ukg-grant-icon">⚒️</div>
              <div className="ukg-grant-title-block">
                <h3>{t.grants.ironmongers.title}</h3>
                <span className="ukg-grant-subtitle">{t.grants.ironmongers.subtitle}</span>
              </div>
            </div>
            <div className="ukg-grant-content">
              <p>{t.grants.ironmongers.description}</p>
              <div className="ukg-grant-details">
                <div className="ukg-grant-detail">
                  <strong>{t.grants.ironmongers.targetLabel}</strong>
                  <span>{t.grants.ironmongers.target}</span>
                </div>
                <div className="ukg-grant-detail">
                  <strong>{t.grants.ironmongers.purposeLabel}</strong>
                  <span>{t.grants.ironmongers.purpose}</span>
                </div>
              </div>
              <div className="ukg-grant-highlight">
                <p>{t.grants.ironmongers.highlight}</p>
              </div>
            </div>
          </div>

          {/* British Science Week */}
          <div className="ukg-grant-card">
            <div className="ukg-grant-header">
              <div className="ukg-grant-icon">🧪</div>
              <div className="ukg-grant-title-block">
                <h3>{t.grants.bsw.title}</h3>
                <span className="ukg-grant-subtitle">{t.grants.bsw.subtitle}</span>
              </div>
            </div>
            <div className="ukg-grant-content">
              <p>{t.grants.bsw.description}</p>
              <div className="ukg-grant-details">
                <div className="ukg-grant-detail">
                  <strong>{t.grants.bsw.targetLabel}</strong>
                  <span>{t.grants.bsw.target}</span>
                </div>
                <div className="ukg-grant-detail">
                  <strong>{t.grants.bsw.purposeLabel}</strong>
                  <span>{t.grants.bsw.purpose}</span>
                </div>
              </div>
              <div className="ukg-grant-highlight">
                <p>{t.grants.bsw.highlight}</p>
              </div>
            </div>
          </div>

          {/* EUK Education */}
          <div className="ukg-grant-card">
            <div className="ukg-grant-header">
              <div className="ukg-grant-icon">🎓</div>
              <div className="ukg-grant-title-block">
                <h3>{t.grants.euk.title}</h3>
                <span className="ukg-grant-subtitle">{t.grants.euk.subtitle}</span>
              </div>
            </div>
            <div className="ukg-grant-content">
              <p>{t.grants.euk.description}</p>
              <div className="ukg-grant-details">
                <div className="ukg-grant-detail">
                  <strong>{t.grants.euk.targetLabel}</strong>
                  <span>{t.grants.euk.target}</span>
                </div>
                <div className="ukg-grant-detail">
                  <strong>{t.grants.euk.purposeLabel}</strong>
                  <span>{t.grants.euk.purpose}</span>
                </div>
              </div>
              <div className="ukg-grant-highlight">
                <p>{t.grants.euk.highlight}</p>
              </div>
            </div>
          </div>

          {/* CREST Awards */}
          <div className="ukg-grant-card">
            <div className="ukg-grant-header">
              <div className="ukg-grant-icon">🏆</div>
              <div className="ukg-grant-title-block">
                <h3>{t.grants.crest.title}</h3>
                <span className="ukg-grant-subtitle">{t.grants.crest.subtitle}</span>
              </div>
            </div>
            <div className="ukg-grant-content">
              <p>{t.grants.crest.description}</p>
              <div className="ukg-grant-details">
                <div className="ukg-grant-detail">
                  <strong>{t.grants.crest.targetLabel}</strong>
                  <span>{t.grants.crest.target}</span>
                </div>
                <div className="ukg-grant-detail">
                  <strong>{t.grants.crest.purposeLabel}</strong>
                  <span>{t.grants.crest.purpose}</span>
                </div>
              </div>
              <div className="ukg-grant-highlight">
                <p>{t.grants.crest.highlight}</p>
              </div>
            </div>
          </div>

          {/* Ogden Trust */}
          <div className="ukg-grant-card">
            <div className="ukg-grant-header">
              <div className="ukg-grant-icon">⚛️</div>
              <div className="ukg-grant-title-block">
                <h3>{t.grants.ogden.title}</h3>
                <span className="ukg-grant-subtitle">{t.grants.ogden.subtitle}</span>
              </div>
            </div>
            <div className="ukg-grant-content">
              <p>{t.grants.ogden.description}</p>
              <div className="ukg-grant-details">
                <div className="ukg-grant-detail">
                  <strong>{t.grants.ogden.targetLabel}</strong>
                  <span>{t.grants.ogden.target}</span>
                </div>
                <div className="ukg-grant-detail">
                  <strong>{t.grants.ogden.purposeLabel}</strong>
                  <span>{t.grants.ogden.purpose}</span>
                </div>
              </div>
              <div className="ukg-grant-highlight">
                <p>{t.grants.ogden.highlight}</p>
              </div>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* How We Help Section */}
      <section className="ukg-help-section">
        <div className="container">
          <h2>{t.help.title}</h2>
          <p className="ukg-section-description">
            {t.help.description}
          </p>

          <div className="ukg-features-grid">
            {t.help.features.map((feature, index) => (
              <div className="ukg-feature-item" key={index}>
                <div className="ukg-feature-number">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <BubbleContainer>
        <section id="apply" className="ukg-contact-section">
          <h2>{t.apply.title}</h2>
          <p className="ukg-contact-description">
            {t.apply.description}
          </p>

          <form className="ukg-contact-form" onSubmit={handleSubmit}>
            <div className="ukg-form-row">
              <div className="ukg-form-group">
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

              <div className="ukg-form-group">
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

            <div className="ukg-form-row">
              <div className="ukg-form-group">
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

              <div className="ukg-form-group">
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

            <div className="ukg-form-group">
              <label htmlFor="grantType">{t.apply.form.grantType}</label>
              <select
                id="grantType"
                name="grantType"
                value={formData.grantType}
                onChange={handleInputChange}
              >
                <option value="">{t.apply.form.grantTypeOptions.select}</option>
                <option value="royal-society">{t.apply.form.grantTypeOptions.royalSociety}</option>
                <option value="science-community">{t.apply.form.grantTypeOptions.scienceCommunity}</option>
                <option value="ironmongers">{t.apply.form.grantTypeOptions.ironmongers}</option>
                <option value="bsw">{t.apply.form.grantTypeOptions.bsw}</option>
                <option value="ogden">{t.apply.form.grantTypeOptions.ogden}</option>
                <option value="other">{t.apply.form.grantTypeOptions.other}</option>
              </select>
            </div>

            <div className="ukg-form-group">
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
              className="ukg-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? t.apply.form.sending : t.apply.form.submit}
            </button>

            {formStatus === "success" && (
              <div className="ukg-form-success">
                ✅ {t.apply.form.success}
              </div>
            )}

            {formStatus === "error" && (
              <div className="ukg-form-error">
                {t.apply.form.error}
              </div>
            )}
          </form>
        </section>
      </BubbleContainer>

      {/* Resources Section */}
      <section className="ukg-resources-section">
        <div className="container">
          <h2>{t.resources.title}</h2>
          <p className="ukg-section-description">{t.resources.description}</p>
          <div className="ukg-resources-list">
            {t.resources.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ukg-resource-link"
              >
                <span className="ukg-resource-title">{link.title}</span>
                <span className="ukg-resource-desc">{link.description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="ukg-cta-section">
        <div className="container">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.description}</p>
          <div className="ukg-cta-buttons">
            <a href="#apply" className="btn ukg-cta-primary">
              {t.cta.primaryButton}
            </a>
            <a 
              href="/grants/" 
              className="btn ukg-cta-secondary"
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

export default UKGrantsPage;
