import React from "react";
import Feature from "./Feature";
import "./FeaturesSection.css";
import withTranslation from "./withTranslation";
// Images now served from public directory
// Removed React Router - using direct HTML links

const FeaturesSection = ({ t }) => {
  
  return (
    <section
      className="features-section container"
      aria-labelledby="features-heading"
    >
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 id="features-heading" className="unique-features-heading">
            {t('features.uniqueFeatures')}
          </h2>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="row mt-5">
        <article className="col-4">
          <Feature
            imgSrc="/images/cat_beaker.png"
            title={t('features.realisticSimulations')}
            description={t('features.realisticSimulationsDesc')}
          />
        </article>
        <article className="col-4">
          <Feature
            imgSrc="/images/cat_vr.png"
            title={t('features.crossPlatform')}
            description={t('features.crossPlatformDesc')}
            delay={0.25}
          />
        </article>
        <article className="col-4">
          <Feature
            imgSrc="/images/cat_brain.png"
            title={t('features.aiAssessment')}
            description={t('features.aiAssessmentDesc')}
            delay={0.5}
          />
        </article>
      </div>

      {/* Replace faq-teaser with a button-style link */}
      <div className="features-btn">
        <a
          href="https://d3w5afnqqrsdxl.cloudfront.net/api-bett.expoplatform.co.uk/media/MTc2ODgzNDM3NjY5NmU0NTQ4NjNjY2I=.pdf"
          className="features-faq-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('features.seeFullFeatures')}
        </a>
      </div>
    </section>
  );
};

export default withTranslation(FeaturesSection);
