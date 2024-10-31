import React from 'react';
import './ContactUs.css'; // Assuming you will style it in a separate CSS file

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <a href="mailto:inquiries@whimsylabs.ai" className="btn contact-us" type="button">
        Contact Us
      </a>
    </div>
  );
};

export default ContactUs;
