import React, { useState } from "react";
import "./RoyalSocietyGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";

const RoyalSocietyGrantPage = ({ language = "en" }) => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    role: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "56f94211-0d3e-48a1-a2e0-2d174b945080",
          name: formData.name,
          school: formData.school,
          email: formData.email,
          role: formData.role,
          message: formData.message,
          subject: "Royal Society Partnership Grant Enquiry - WhimsyLabs",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", school: "", email: "", role: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />

      {/* Hero Section */}
      <section className="rsg-hero-section">
        <div
          className="rsg-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="rsg-hero-content">
            <AnimatedTitle
              text="Royal Society Partnership Grants"
              className="rsg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="rsg-hero-subtitle">
              Get up to £3,000 to bring VR science to your classroom
            </p>
            <div className="rsg-hero-badges">
              <div className="rsg-badge rsg-badge-primary">
                💰 Up to £3,000 Funding
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                🔬 For UK Schools
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                🤝 We Help You Apply
              </div>
            </div>
          </div>

          <div className="rsg-hero-ctas">
            <a href="#how-we-help" className="rsg-cta-button rsg-cta-secondary">
              How We Help
            </a>
            <a href="#eligibility" className="rsg-cta-button rsg-cta-secondary">
              Am I Eligible?
            </a>
            <a href="#contact" className="rsg-cta-button rsg-cta-secondary">
              Get Started
            </a>
          </div>
        </div>
        <div className="rsg-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z"
              fill="#201853"
            />
          </svg>
        </div>
      </section>

      {/* What Are Partnership Grants */}
      <BubbleContainer>
        <section className="rsg-about-section">
          <h2>What Are Royal Society Partnership Grants?</h2>
          <p className="rsg-section-description">
            The Royal Society Partnership Grants scheme funds projects that bring cutting-edge 
            STEM experiences into schools. Schools can receive up to £3,000 to run investigative 
            projects in partnership with a STEM professional from academia or industry.
          </p>
          
          <div className="rsg-info-cards">
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🎓</div>
              <h3>For Schools</h3>
              <p>UK state-funded schools with students aged 5-18 can apply for funding to enhance STEM education.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🔬</div>
              <h3>STEM Partnership</h3>
              <p>Work alongside a scientist or engineer from a university or company to inspire your students.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">💡</div>
              <h3>Investigative Projects</h3>
              <p>Design hands-on experiments and investigations that go beyond the standard curriculum.</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Key Dates Section */}
      <section className="rsg-dates-section">
        <div className="container">
          <h2>Key Dates for 2026</h2>
          <p className="rsg-section-description">
            There are three application windows throughout the year. Plan ahead and we'll help you prepare.
          </p>
          
          <div className="rsg-timeline">
            <div className="rsg-timeline-item rsg-timeline-open">
              <div className="rsg-timeline-marker">📅</div>
              <div className="rsg-timeline-content">
                <h3>Applications Open</h3>
                <p className="rsg-date">23 February 2026</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>First Deadline</h3>
                <p className="rsg-date">30 April 2026</p>
                <p className="rsg-deadline-note">Spring round - ideal for autumn term projects</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>Second Deadline</h3>
                <p className="rsg-date">10 July 2026</p>
                <p className="rsg-deadline-note">Summer round - for winter term start</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>Final Deadline</h3>
                <p className="rsg-date">30 November 2026</p>
                <p className="rsg-deadline-note">Autumn round - spring term projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <BubbleContainer>
        <section id="how-we-help" className="rsg-help-section">
          <h2>How WhimsyLabs Helps You</h2>
          <p className="rsg-section-description">
            We make applying for a Partnership Grant straightforward. From application support 
            to providing the VR software, we're with you every step of the way.
          </p>

          <div className="rsg-features-grid">
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">1</div>
              <h4>Free Pilot Access</h4>
              <p>
                Get complimentary access to WhimsyLabs virtual lab software throughout your
                project period. No software costs eat into your grant — we'll also provide a
                free demo for your grant application.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">2</div>
              <h4>Application Support</h4>
              <p>
                We'll help you craft a compelling application. Our team can provide 
                project ideas, learning objectives, and evidence of VR's impact on science education.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">3</div>
              <h4>STEM Partner Connections</h4>
              <p>
                Need a STEM partner? We can help connect you with researchers and scientists 
                from universities who are keen to work with schools.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">4</div>
              <h4>Project Planning</h4>
              <p>
                We'll work with you to design an investigation that makes the most of 
                VR — from virtual chemistry experiments to physics simulations.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">5</div>
              <h4>Training & Support</h4>
              <p>
                Receive full training for teachers on using WhimsyLabs, plus ongoing 
                technical support throughout your project.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">6</div>
              <h4>Impact Documentation</h4>
              <p>
                We'll help you gather evidence and document student outcomes for your 
                project report to the Royal Society.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* The Package Section */}
      <section className="rsg-package-section">
        <div className="container">
          <h2>The Package</h2>
          <p className="rsg-section-description">
            Here's how a typical WhimsyLabs Partnership Grant project works:
          </p>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">💷</div>
              <h3>Your Grant Covers</h3>
              <ul>
                <li>VR headsets for your classroom (typically 6-10 devices)</li>
                <li>Optional: tablet for teacher control</li>
                <li>Any physical materials for investigations</li>
                <li>STEM partner expenses (travel, time)</li>
                <li>Celebration event for students</li>
              </ul>
            </div>
            <div className="rsg-package-card rsg-package-whimsy">
              <div className="rsg-package-icon">🎁</div>
              <h3>WhimsyLabs Provides FREE</h3>
              <ul>
                <li>Full access to WhimsyLabs VR science platform</li>
                <li>All virtual experiments and lab environments</li>
                <li>Teacher dashboard and student progress tracking</li>
                <li>Curriculum-aligned lesson plans</li>
                <li>Ongoing technical support</li>
              </ul>
            </div>
          </div>

          <div className="rsg-package-note">
            <p>
              <strong>💡 Pro Tip:</strong> Most successful applications budget around £2,000-2,500 
              for VR hardware, leaving room for partner expenses and student celebration activities.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <BubbleContainer>
        <section id="eligibility" className="rsg-eligibility-section">
          <h2>Are You Eligible?</h2>
          <p className="rsg-section-description">
            Check if your school qualifies for a Royal Society Partnership Grant:
          </p>

          <div className="rsg-eligibility-grid">
            <div className="rsg-eligibility-card rsg-eligible">
              <h3>✅ You Can Apply If:</h3>
              <ul>
                <li>You're a UK state-funded school</li>
                <li>Your students are aged 5-18</li>
                <li>You can partner with a STEM professional</li>
                <li>You haven't received this grant in the past 2 years</li>
                <li>Your project is investigative (not just demonstrations)</li>
              </ul>
            </div>
            <div className="rsg-eligibility-card rsg-partners">
              <h3>🤝 STEM Partners Can Be:</h3>
              <ul>
                <li>University researchers or academics</li>
                <li>PhD students or postdocs</li>
                <li>Scientists from research institutes</li>
                <li>STEM professionals from industry</li>
                <li>Engineers from companies</li>
              </ul>
            </div>
          </div>

          <div className="rsg-eligibility-cta">
            <p>Not sure if you qualify? Don't have a STEM partner yet?</p>
            <a href="#contact" className="rsg-cta-button rsg-cta-primary">
              Let's Chat — We Can Help!
            </a>
          </div>
        </section>
      </BubbleContainer>

      {/* Contact Form Section */}
      <section id="contact" className="rsg-contact-section">
        <div className="container">
          <h2>Get Started</h2>
          <p className="rsg-contact-description">
            Ready to bring VR science to your classroom? Fill in the form below and we'll 
            get in touch to discuss your Partnership Grant application.
          </p>

          <form className="rsg-contact-form" onSubmit={handleSubmit}>
            <div className="rsg-form-row">
              <div className="rsg-form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="rsg-form-group">
                <label htmlFor="school">School Name *</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  required
                  placeholder="Your school's name"
                />
              </div>
            </div>

            <div className="rsg-form-row">
              <div className="rsg-form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@school.edu"
                />
              </div>

              <div className="rsg-form-group">
                <label htmlFor="role">Your Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., Head of Science, Teacher"
                />
              </div>
            </div>

            <div className="rsg-form-group">
              <label htmlFor="message">Tell Us About Your Interest</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="What subjects do you teach? Have you applied for a Partnership Grant before? Do you have a STEM partner in mind?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="rsg-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending..." : "Get In Touch"}
            </button>

            {formStatus === "success" && (
              <div className="rsg-form-success">
                Thanks for your interest! We'll be in touch within 2 working days to discuss your application.
              </div>
            )}

            {formStatus === "error" && (
              <div className="rsg-form-error">
                Something went wrong. Please try again or email us directly at hello@whimsylabs.ai
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Final CTA Section */}
      <BubbleContainer>
        <section className="rsg-cta-section">
          <h2>Don't Miss Out on £3,000 for VR Science</h2>
          <p>
            The Royal Society Partnership Grants are one of the best-kept secrets in education funding. 
            With our help, applying is easier than you think.
          </p>
          <div className="rsg-cta-buttons">
            <a href="#contact" className="btn rsg-cta-primary">
              Start Your Application
            </a>
            <a 
              href="https://royalsociety.org/grants/partnership-grants/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn rsg-cta-secondary"
            >
              Royal Society Official Page
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default RoyalSocietyGrantPage;
