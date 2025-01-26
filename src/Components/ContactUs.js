import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <section className="contact-us-container" aria-labelledby="contact-us-heading">
      <h2 id="contact-us-heading" className="visually-hidden"></h2>
      <a href="mailto:inquiries@whimsylabs.ai" className="btn contact-us" type="button" aria-label="Email Whimsylabs">
        Contact Us!
      </a>
    </section>
  );
};

export default ContactUs;
