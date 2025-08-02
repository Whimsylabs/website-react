import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FAQ from './FAQ';
import './FAQPage.css';
import { Helmet } from 'react-helmet-async';
import withTranslation from './withTranslation';

const FAQPage = ({ t, currentLang }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>Frequently Asked Questions | WhimsyLabs Virtual Lab Software</title>
        <meta name="description" content="Get answers to common questions about WhimsyLabs virtual lab software, online lab simulations, and how our STEM virtual labs help students and educators." />
        <meta name="keywords" content="virtual lab software FAQ, online lab simulations help, STEM virtual labs questions, virtual laboratory software support" />
      </Helmet>
      <Header />
      <div id="faq-tiled-background">
        <div className="container py-5">
          <div className="faq-header-container">
            <h1 className="faq-main-heading">{t('faq.title')}</h1>
            <p className="faq-subheading">
              {t('faq.subtitle')}
            </p>
          </div>
          <div className="faq-content-container">
            <FAQ />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default withTranslation(FAQPage);