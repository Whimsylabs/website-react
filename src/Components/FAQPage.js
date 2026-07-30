import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FAQ from './FAQ';
import './FAQPage.css';
import { Helmet } from 'react-helmet-async';
import withTranslation from './withTranslation';

const FAQPage = ({ t, currentLang, language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>Virtual Lab FAQ: Pricing, Setup & Free Trials | WhimsyLabs</title>
        <meta name="description" content="How much does WhimsyLabs cost? Do you need VR headsets? How do free school trials work? Clear answers to 40+ questions about our virtual lab software." />
        <meta name="keywords" content="virtual lab software FAQ, online lab simulations help, STEM virtual labs questions, virtual laboratory software support" />
      </Helmet>
      <Header currentLang={language || currentLang} />
      <div id="faq-tiled-background" className="page-content">
        <div className="container py-5">
          <div className="faq-header-container">
            <h1 className="faq-main-heading">{t('faq.title')}</h1>
            <p className="faq-subheading">
              {t('faq.subtitle')}
            </p>
          </div>
          <div className="faq-content-container">
            <FAQ language={currentLang} />
          </div>
        </div>
      </div>
      <Footer language={language || currentLang} />
    </main>
  );
};

export default withTranslation(FAQPage);