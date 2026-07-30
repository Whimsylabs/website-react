import React from 'react';
// Removed React Router - using direct HTML links
import './ContactUs.css';
import { getLocalizedPath } from '../i18n';

const ContactUs = ({ buttonText = "Contact Us!", language }) => {
  return (
    <section className="contact-us-container" aria-labelledby="contact-us-heading">
      <a href={getLocalizedPath("/contact/", language)} className="btn contact-us" type="button" aria-label="Contact Whimsylabs">
        {buttonText}
      </a>
    </section>
  );
};

export default ContactUs;
