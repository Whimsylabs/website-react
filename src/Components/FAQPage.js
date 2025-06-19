import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FAQ from './FAQ';
import './FAQPage.css';
import { Helmet } from 'react-helmet-async';

const FAQPage = () => {
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
            <h1 className="faq-main-heading">Frequently Asked Questions</h1>
            <p className="faq-subheading">
              Find answers to common questions about our virtual lab software and how it can transform STEM education
            </p>
          </div>
          <div className="faq-content-container">
            <FAQ />
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Provide a noscript fallback for browsers with JavaScript disabled */}
      <noscript>
        <style jsx="true">{`
          #root { display: none; }
          #noscript-fallback { display: block; }
        `}</style>
        <div id="noscript-fallback">
          <meta httpEquiv="refresh" content="0;url=/faq/noscript.html" />
        </div>
      </noscript>
    </main>
  );
};

export default FAQPage;