import React, { useState } from "react";
import "./CanadaGrantsPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

// Import translations
import enTranslations from "../i18n/grants/canada-education/en";

const CanadaGrantsPage = ({ language = "en" }) => {
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
        source: 'canada_grants_page',
        grant_type: formData.grantType,
        country: 'Canada'
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
          subject: "Canada Education Grant Inquiry - WhimsyLabs",
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
      <section className="cag-hero-section">
        <div
          className="cag-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="cag-hero-content">
            <AnimatedTitle
              text={t.hero.title}
              className="cag-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="cag-hero-subtitle">
              <strong>{t.hero.subtitleStrong}</strong>
              <br />
              {t.hero.subtitleText}
            </p>
            <div className="cag-hero-badges">
              <div className="cag-badge cag-badge-primary">
                {t.hero.badge1}
              </div>
              <div className="cag-badge cag-badge-secondary">
                {t.hero.badge2}
              </div>
              <div className="cag-badge cag-badge-secondary">
                {t.hero.badge3}
              </div>
            </div>
          </div>

          <div className="cag-hero-ctas">
            <a href="#apply" className="cag-cta-button cag-cta-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#grants" className="cag-cta-button cag-cta-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="cag-wave-divider">
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
        <section className="cag-about-section">
          <h2>{t.about.title}</h2>
          <p className="cag-section-description">
            {t.about.description}
          </p>
          
          <div className="cag-info-cards">
            <div className="cag-info-card">
              <div className="cag-info-icon">🏢</div>
              <h3>{t.about.card1.title}</h3>
              <p>{t.about.card1.text}</p>
            </div>
            <div className="cag-info-card">
              <div className="cag-info-icon">🍁</div>
              <h3>{t.about.card2.title}</h3>
              <p>{t.about.card2.text}</p>
            </div>
            <div className="cag-info-card">
              <div className="cag-info-icon">🔬</div>
              <h3>{t.about.card3.title}</h3>
              <p>{t.about.card3.text}</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Grant Types Section */}
      <BubbleContainer>
        <section id="grants" className="cag-grants-section">
          <h2>{t.grants.title}</h2>
          <p className="cag-section-description">
            {t.grants.description}
          </p>

          {/* Best Buy */}
          <div className="cag-grant-card">
            <div className="cag-grant-header">
              <div className="cag-grant-icon">🏪</div>
              <div className="cag-grant-title-block">
                <h3>{t.grants.bestBuy.title}</h3>
                <span className="cag-grant-subtitle">{t.grants.bestBuy.subtitle}</span>
              </div>
            </div>
            <div className="cag-grant-content">
              <p>{t.grants.bestBuy.description}</p>
              <div className="cag-grant-details">
                <div className="cag-grant-detail">
                  <strong>{t.grants.bestBuy.targetLabel}</strong>
                  <span>{t.grants.bestBuy.target}</span>
                </div>
                <div className="cag-grant-detail">
                  <strong>{t.grants.bestBuy.purposeLabel}</strong>
                  <span>{t.grants.bestBuy.purpose}</span>
                </div>
              </div>
              <div className="cag-grant-highlight">
                <p>{t.grants.bestBuy.highlight}</p>
              </div>
            </div>
          </div>

          {/* iSTEM */}
          <div className="cag-grant-card">
            <div className="cag-grant-header">
              <div className="cag-grant-icon">🎓</div>
              <div className="cag-grant-title-block">
                <h3>{t.grants.istem.title}</h3>
                <span className="cag-grant-subtitle">{t.grants.istem.subtitle}</span>
              </div>
            </div>
            <div className="cag-grant-content">
              <p>{t.grants.istem.description}</p>
              <div className="cag-grant-details">
                <div className="cag-grant-detail">
                  <strong>{t.grants.istem.targetLabel}</strong>
                  <span>{t.grants.istem.target}</span>
                </div>
                <div className="cag-grant-detail">
                  <strong>{t.grants.istem.purposeLabel}</strong>
                  <span>{t.grants.istem.purpose}</span>
                </div>
              </div>
              <div className="cag-grant-highlight">
                <p>{t.grants.istem.highlight}</p>
              </div>
            </div>
          </div>

          {/* Provincial */}
          <div className="cag-grant-card">
            <div className="cag-grant-header">
              <div className="cag-grant-icon">🍁</div>
              <div className="cag-grant-title-block">
                <h3>{t.grants.provincial.title}</h3>
                <span className="cag-grant-subtitle">{t.grants.provincial.subtitle}</span>
              </div>
            </div>
            <div className="cag-grant-content">
              <p>{t.grants.provincial.description}</p>
              <div className="cag-grant-details">
                <div className="cag-grant-detail">
                  <strong>{t.grants.provincial.targetLabel}</strong>
                  <span>{t.grants.provincial.target}</span>
                </div>
                <div className="cag-grant-detail">
                  <strong>{t.grants.provincial.purposeLabel}</strong>
                  <span>{t.grants.provincial.purpose}</span>
                </div>
              </div>
              <div className="cag-grant-highlight">
                <p>{t.grants.provincial.highlight}</p>
              </div>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Provincial Details Section */}
      <section className="cag-provincial-section">
        <div className="container">
          <h2>{t.provincialDetails.title}</h2>
          <p className="cag-section-description">
            {t.provincialDetails.description}
          </p>

          <div className="cag-provincial-grid">
            {t.provincialDetails.provinces.map((province, index) => (
              <div className="cag-provincial-card" key={index}>
                <div className="cag-provincial-icon">{province.icon}</div>
                <h3>{province.name}</h3>
                <p className="cag-provincial-details">{province.details}</p>
                <p className="cag-provincial-focus"><strong>Focus:</strong> {province.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <BubbleContainer>
        <section className="cag-help-section">
          <div className="container">
            <h2>{t.help.title}</h2>
            <p className="cag-section-description">
              {t.help.description}
            </p>

            <div className="cag-features-grid">
              {t.help.features.map((feature, index) => (
                <div className="cag-feature-item" key={index}>
                  <div className="cag-feature-number">{feature.icon}</div>
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
        <section id="apply" className="cag-contact-section">
          <h2>{t.apply.title}</h2>
          <p className="cag-contact-description">
            {t.apply.description}
          </p>

          <form className="cag-contact-form" onSubmit={handleSubmit}>
            <div className="cag-form-row">
              <div className="cag-form-group">
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

              <div className="cag-form-group">
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

            <div className="cag-form-row">
              <div className="cag-form-group">
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

              <div className="cag-form-group">
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

            <div className="cag-form-group">
              <label htmlFor="grantType">{t.apply.form.grantType}</label>
              <select
                id="grantType"
                name="grantType"
                value={formData.grantType}
                onChange={handleInputChange}
              >
                <option value="">{t.apply.form.grantTypeOptions.select}</option>
                <option value="best-buy">{t.apply.form.grantTypeOptions.bestBuy}</option>
                <option value="istem">{t.apply.form.grantTypeOptions.istem}</option>
                <option value="provincial">{t.apply.form.grantTypeOptions.provincial}</option>
                <option value="other">{t.apply.form.grantTypeOptions.other}</option>
              </select>
            </div>

            <div className="cag-form-group">
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
              className="cag-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? t.apply.form.sending : t.apply.form.submit}
            </button>

            {formStatus === "success" && (
              <div className="cag-form-success">
                ✅ {t.apply.form.success}
              </div>
            )}

            {formStatus === "error" && (
              <div className="cag-form-error">
                {t.apply.form.error}
              </div>
            )}
          </form>
        </section>
      </BubbleContainer>

      {/* Resources Section */}
      <section className="cag-resources-section">
        <div className="container">
          <h2>{t.resources.title}</h2>
          <p className="cag-section-description">{t.resources.description}</p>
          <div className="cag-resources-list">
            {t.resources.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cag-resource-link"
              >
                <span className="cag-resource-title">{link.title}</span>
                <span className="cag-resource-desc">{link.description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cag-cta-section">
        <div className="container">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.description}</p>
          <div className="cag-cta-buttons">
            <a href="#apply" className="btn cag-cta-primary">
              {t.cta.primaryButton}
            </a>
            <a 
              href="/grants/" 
              className="btn cag-cta-secondary"
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

export default CanadaGrantsPage;
