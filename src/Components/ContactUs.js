import React from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = ({ buttonText = "Contact Us!" }) => {
  return (
    <section className="contact-us-container" aria-labelledby="contact-us-heading">
      <Link to="/contact" className="btn contact-us" type="button" aria-label="Contact Whimsylabs">
        {buttonText}
      </Link>
    </section>
  );
};

export default ContactUs;
