import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './ContactPage.css';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const [activeForm, setActiveForm] = useState('general'); // 'general' or 'trial'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    role: '',
    phoneNumber: '',
    studentCount: '',
    message: '',
    preferredContact: 'email'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.school || !formData.message) {
      setFormError(true);
      return;
    }
    
    // In a real implementation, you would send the form data to a server here
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    setFormError(false);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      school: '',
      role: '',
      phoneNumber: '',
      studentCount: '',
      message: '',
      preferredContact: 'email'
    });
  };

  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>Contact Us | WhimsyLabs Virtual Lab Software</title>
        <meta name="description" content="Get in touch with WhimsyLabs to request a trial for your school or ask questions about our virtual lab software for STEM education." />
        <meta name="keywords" content="contact WhimsyLabs, virtual lab trial, STEM education software, school lab simulation" />
      </Helmet>
      <Header />
      <div id="contact-page-background">
        <div className="container py-5">
          <div className="contact-header-container">
            <h1 className="contact-main-heading">Contact WhimsyLabs</h1>
            <p className="contact-subheading">
              We'd love to hear from you! Whether you're interested in trying our virtual labs at your school or have general questions, we're here to help.
            </p>
          </div>
          
          <div className="contact-form-selector">
            <button 
              className={`form-selector-button ${activeForm === 'trial' ? 'active' : ''}`}
              onClick={() => setActiveForm('trial')}
            >
              Request a Trial for Your School
            </button>
            <button 
              className={`form-selector-button ${activeForm === 'general' ? 'active' : ''}`}
              onClick={() => setActiveForm('general')}
            >
              General Inquiries
            </button>
          </div>
          
          {formSubmitted ? (
            <div className="form-success-message">
              <h2>Thank You!</h2>
              <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
              <button 
                className="submit-another-button"
                onClick={() => setFormSubmitted(false)}
              >
                Submit Another Message
              </button>
            </div>
          ) : (
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                {formError && (
                  <div className="form-error-message">
                    Please fill out all required fields.
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="name">Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="school">School/Organization <span className="required">*</span></label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                
                {activeForm === 'trial' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="role">Your Role</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="">Select your role</option>
                        <option value="teacher">Teacher</option>
                        <option value="administrator">Administrator</option>
                        <option value="it_staff">IT Staff</option>
                        <option value="department_head">Department Head</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="studentCount">Number of Students</label>
                      <input
                        type="number"
                        id="studentCount"
                        name="studentCount"
                        value={formData.studentCount}
                        onChange={handleInputChange}
                        className="form-control"
                        min="1"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Preferred Contact Method</label>
                      <div className="radio-group">
                        <label>
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleInputChange}
                          />
                          Email
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleInputChange}
                          />
                          Phone
                        </label>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="form-group">
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    rows="5"
                    placeholder={activeForm === 'trial' 
                      ? "Tell us about your school's needs and what subjects you're interested in for the trial."
                      : "How can we help you?"}
                  ></textarea>
                </div>
                
                <div className="form-group form-privacy-notice">
                  <p>By submitting this form, you agree to our <a href="/privacy">Privacy Policy</a>. We'll only use your information to respond to your inquiry.</p>
                </div>
                
                <button type="submit" className="submit-button">
                  {activeForm === 'trial' ? 'Request Trial' : 'Send Message'}
                </button>
              </form>
            </div>
          )}
          
          <div className="contact-alternative">
            <h3>Prefer to email us directly?</h3>
            <p>Reach out to <a href="mailto:hello@whimsylabs.ai">hello@whimsylabs.ai</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContactPage;