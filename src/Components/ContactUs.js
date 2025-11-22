import React from 'react';
// Removed React Router - using direct HTML links
import './ContactUs.css';

const ContactUs = ({ buttonText = "Contact Us!" }) => {
  return (
    <section className="contact-us-container" aria-labelledby="contact-us-heading">
      <a href="./contact" className="btn contact-us" type="button" aria-label="Contact Whimsylabs">
        {buttonText}
      </a>
    </section>
  );
};

export default ContactUs;
