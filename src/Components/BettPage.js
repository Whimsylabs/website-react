import React, { useState } from "react";
import "./BettPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import withTranslation from "./withTranslation";
import ScrollingMap from "./ScrollingMap";
import SplashSection from "./SplashSection";

const BettPage = ({ t, language }) => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    phone: "",
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

    try {
      // Using Web3Forms - you'll need to replace this with your actual access key
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "56f94211-0d3e-48a1-a2e0-2d174b945080", // Replace with actual key
          name: formData.name,
          school: formData.school,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: "BETT 2026 Meeting Request from WhimsyLabs Website",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", school: "", email: "", message: "" });
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

      <section className="bett-hero-section">
        <div
          className="bett-map-section-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="bett-hero-content">
            <AnimatedTitle
              text={t("bett.heroTitle")}
              className="bett-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <div className="bett-hero-badges">
              <div className="bett-award-badge">
                BETT 2025 Kids Judge Award Winner
              </div>
              <div className="bett-date-badge">21-23 January 2026</div>
              <div className="bett-date-badge">Stand FS10</div>
            </div>
          </div>

          <div className="bett-map-grid">
            <div className="bett-map-info">
              <div className="bett-info-card-large">
                <div className="bett-info-icon">📍</div>
                <h3>{t("bett.location")}</h3>
                <p className="bett-info-large-text">
                  ExCeL London
                  <br />
                  South Stand, Booth FS10
                </p>
              </div>
              <p className="bett-map-description">
                Follow the animated path to find our booth at the exhibition!
              </p>
            </div>

            <div className="bett-map-display">
              <ScrollingMap
                imagePath="/images/bett map.jpg"
                pathData="M 404 96 L 404 185 L 360 185 L 360 646 L 418 646 L 419 679 L 397 681"
                viewBox="0 0 938 785"
                speed={0.0003}
                numTokens={3}
              />
            </div>
          </div>
          <div className="bett-hero-ctas">
            <a href="#booking" className="bett-cta-button bett-cta-secondary">
              Schedule Your BETT Meeting
            </a>
            <a href="#video" className="bett-cta-button bett-cta-secondary">
              Discover WhimsyLabs
            </a>
            <a href="#contact" className="bett-cta-button bett-cta-secondary">
              Connect After BETT
            </a>
          </div>
        </div>
        <div className="bett-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            {/* Set fill to #2C2170 */}
            <path
              d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z"
              fill="#201853"
            />
          </svg>
        </div>
      </section>

      <BubbleContainer>
        <section id="video" className="bett-video-why-section">
          <h2>{t("bett.videoTitle")}</h2>
          <p className="bett-section-description">
            {t("bett.videoDescription")}
          </p>
          <div className="bett-video-container">
            <iframe
              src="https://www.youtube.com/embed/9D2e2e2gzvk"
              title="WhimsyLabs Virtual Lab Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="bett-video"
            ></iframe>
          </div>

          <div className="bett-why-visit">
            <h2>{t("bett.whyVisitTitle")}</h2>
            <p className="bett-section-description">
              {t("bett.whyVisitDescription")}
            </p>

            <div className="bett-features-grid">
              <div className="bett-feature-item">
                <h4>{t("bett.feature1Title")}</h4>
                <p>{t("bett.feature1Desc")}</p>
              </div>
              <div className="bett-feature-item">
                <h4>{t("bett.feature2Title")}</h4>
                <p>{t("bett.feature2Desc")}</p>
              </div>
              <div className="bett-feature-item">
                <h4>{t("bett.feature3Title")}</h4>
                <p>{t("bett.feature3Desc")}</p>
              </div>
              <div className="bett-feature-item">
                <h4>{t("bett.feature4Title")}</h4>
                <p>{t("bett.feature4Desc")}</p>
              </div>
              <div className="bett-feature-item">
                <h4>{t("bett.feature5Title")}</h4>
                <p>{t("bett.feature5Desc")}</p>
              </div>
              <div className="bett-feature-item">
                <h4>{t("bett.feature6Title")}</h4>
                <p>{t("bett.feature6Desc")}</p>
              </div>
              <div className="bett-feature-item">
                <h4>{t("bett.feature7Title")}</h4>
                <p>{t("bett.feature7Desc")}</p>
              </div>
              <div className="bett-feature-item">
                <h4>{t("bett.feature8Title")}</h4>
                <p>{t("bett.feature8Desc")}</p>
              </div>
              <div className="bett-feature-item">
                <h4>{t("bett.feature9Title")}</h4>
                <p>{t("bett.feature9Desc")}</p>
              </div>
            </div>
          </div>
          
          <div className="bett-blog-link-section" style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
            <a 
              href="/blog/whimsylabs-bett-2026-exhibition-announcement" 
              className="bett-cta-button bett-cta-primary"

            >
              {t("bett.blogButtonText")}
            </a>
          </div>
        </section>
      </BubbleContainer>

      <SplashSection bottomColor="#F7F8F9">
        <section id="booking" className="bett-booking-section">
          <h2>{t("bett.bookingTitle")}</h2>
          <p className="bett-booking-description">
            {t("bett.bookingDescription")}
          </p>

          <div className="bett-calendly-container">
            <p className="bett-calendly-fallback">
              {t("bett.calendlyFallback")}{" "}
              <a
                href="https://calendly.com/whimsylaboratories/bett-2026"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("bett.calendlyFallbackLink")}
              </a>
            </p>
            {/* Calendly inline widget */}
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/whimsylaboratories/bett-2026?month=2026-01"
              style={{ minWidth: "320px", height: "700px" }}
            ></div>
            <script
              type="text/javascript"
              src="https://assets.calendly.com/assets/external/widget.js"
              async
            ></script>
          </div>

          <p className="bett-calendly-note">{t("bett.calendlyNote")}</p>
        </section>
      </SplashSection>

      <section id="contact" className="bett-contact-section">
        <div className="container">
          <h2>{t("bett.contactTitle")}</h2>
          <p className="bett-contact-description">
            {t("bett.contactDescription")}
          </p>

          <form className="bett-contact-form" onSubmit={handleSubmit}>
            <div className="bett-form-row">
              <div className="bett-form-group">
                <label htmlFor="name">{t("bett.formName")} *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={t("bett.formNamePlaceholder")}
                />
              </div>

              <div className="bett-form-group">
                <label htmlFor="school">{t("bett.formSchool")} *</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  required
                  placeholder={t("bett.formSchoolPlaceholder")}
                />
              </div>
            </div>

            <div className="bett-form-group">
              <label htmlFor="email">{t("bett.formEmail")} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder={t("bett.formEmailPlaceholder")}
              />
            </div>

            <div className="bett-form-group">
              <label htmlFor="phone">{t("bett.formPhone")}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t("bett.formPhonePlaceholder")}
              />
            </div>

            <div className="bett-form-group">
              <label htmlFor="message">{t("bett.formMessage")}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder={t("bett.formMessagePlaceholder")}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bett-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending"
                ? t("bett.formSending")
                : t("bett.formSubmit")}
            </button>

            {formStatus === "success" && (
              <div className="bett-form-success">{t("bett.formSuccess")}</div>
            )}

            {formStatus === "error" && (
              <div className="bett-form-error">{t("bett.formError")}</div>
            )}
          </form>
        </div>
      </section>

      <BubbleContainer>
        <section className="bett-cta-section">
          <h2>{t("bett.ctaTitle")}</h2>
          <p>{t("bett.ctaText")}</p>
          <div className="bett-cta-buttons">
            <a href="#booking" className="btn bett-cta-primary">
              {t("bett.ctaBooking")}
            </a>
            <a href="#contact" className="btn bett-cta-secondary">
              {t("bett.ctaContact")}
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation(BettPage);
