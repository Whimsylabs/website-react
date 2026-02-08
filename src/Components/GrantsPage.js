import React from "react";
import "./GrantsPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import withTranslation from "./withTranslation";
import { getLocalizedPath } from "../i18n";

// Grant data - Royal Society is UK-only so not translated
const GRANTS_DATA = [
  {
    id: "royal-society",
    name: "Royal Society Partnership Grants",
    country: "UK",
    flag: "🇬🇧",
    amount: "£3,000",
    description: "Funding for investigative STEM projects that bring cutting-edge science into the classroom through partnerships with research scientists.",
    link: "/grants/royal-society/",
    available: true,
    translateKey: null, // UK-specific, no translation
  },
  {
    id: "coming-soon-1",
    country: "Various",
    flag: "🌍",
    amount: "TBD",
    link: null,
    available: false,
    translateKey: "moreGrants", // Use translation
  },
];

const GrantCard = ({ grant, t, currentLang }) => {
  // Use translations for coming soon card
  const name = grant.translateKey ? t(`grants.${grant.translateKey}Title`) : grant.name;
  const description = grant.translateKey ? t(`grants.${grant.translateKey}Desc`) : grant.description;
  
  const cardContent = (
    <>
      <div className="grants-card-header">
        <span className="grants-card-flag">{grant.flag}</span>
        <span className="grants-card-country">{grant.country}</span>
      </div>
      <h3 className="grants-card-title">{name}</h3>
      <div className="grants-card-amount">{grant.amount}</div>
      <p className="grants-card-description">{description}</p>
      {grant.available ? (
        <span className="grants-card-button">{t("grants.learnMore")} →</span>
      ) : (
        <span className="grants-card-coming-soon">{t("grants.comingSoon")}</span>
      )}
    </>
  );

  if (grant.available && grant.link) {
    return (
      <a href={getLocalizedPath(grant.link, currentLang)} className="grants-card grants-card-available">
        {cardContent}
      </a>
    );
  }

  return (
    <div className="grants-card grants-card-unavailable">
      {cardContent}
    </div>
  );
};

const GrantsPage = ({ t, currentLang }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Header currentLang={currentLang} />

      {/* Hero Section */}
      <section className="grants-hero-section">
        <div
          className="grants-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="grants-hero-content">
            <AnimatedTitle
              text={t("grants.heroTitle")}
              className="grants-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="grants-hero-subtitle">
              <strong>{t("grants.heroSubtitle")}</strong>
            </p>
          </div>
        </div>
        <div className="grants-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z"
              fill="#dabeff"
            />
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <BubbleContainer>
        <section className="grants-intro-section">
          <div className="grants-intro-box">
            <h2>{t("grants.introTitle")}</h2>
            <p 
              className="grants-intro-text"
              dangerouslySetInnerHTML={{ __html: t("grants.introText1") }}
            />
            <p 
              className="grants-intro-text"
              dangerouslySetInnerHTML={{ __html: t("grants.introText2") }}
            />
            <p 
              className="grants-intro-text"
              dangerouslySetInnerHTML={{ __html: t("grants.introText3") }}
            />
          </div>
        </section>
      </BubbleContainer>

      {/* Grants Grid Section */}
      <section className="grants-grid-section">
        <div className="container">
          <h2 className="grants-grid-title">{t("grants.gridTitle")}</h2>
          <p className="grants-grid-subtitle">
            {t("grants.gridSubtitle")}
          </p>
          
          <div className="grants-grid">
            {GRANTS_DATA.map((grant) => (
              <GrantCard key={grant.id} grant={grant} t={t} currentLang={currentLang} />
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA Section */}
      <div className="container" style={{ padding: "2rem 1rem 4rem" }}>
        <section className="grants-support-section">
          <h2>{t("grants.supportTitle")}</h2>
          <p className="grants-support-text">
            {t("grants.supportText")}
          </p>
          <div className="grants-cta-buttons">
            <a href={getLocalizedPath("/contact", currentLang)} className="grants-cta-button grants-cta-primary">
              {t("grants.ctaContact")}
            </a>
            <a href={getLocalizedPath("/", currentLang)} className="grants-cta-button grants-cta-secondary">
              {t("grants.ctaFeatures")}
            </a>
          </div>
        </section>
      </div>

      <Footer currentLang={currentLang} />
    </main>
  );
};

export default withTranslation(GrantsPage);
