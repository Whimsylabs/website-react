import React, { useState } from "react";
import "./RoyalSocietyGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

const BritishScienceWeekGrantPage = ({ language = "en" }) => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    role: "",
    eventType: "",
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

    const { first_name, last_name } = parseFullName(formData.name);
    sendToCRM({
      form_type: 'partnership',
      email: formData.email,
      first_name,
      last_name,
      company: formData.school,
      job_title: formData.role,
      message: formData.message,
      metadata: {
        source: 'british_science_week_grant_page',
        event_type: formData.eventType
      }
    });

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
          eventType: formData.eventType,
          message: formData.message,
          subject: "British Science Week 2026 - WhimsyLabs Demo Request",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", school: "", email: "", role: "", eventType: "", message: "" });
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
              text="British Science Week 2026"
              className="rsg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="rsg-hero-subtitle">
              <strong>£400 Kick Start grants for schools in challenging circumstances.</strong>
              <br />
              March 2027. WhimsyLabs provides FREE demo access for your Science Week event.
            </p>
            <div className="rsg-hero-badges">
              <div className="rsg-badge rsg-badge-primary">
                🎁 FREE Demo for Science Week
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                📅 March 2027
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                💰 £400 Kick Start Grants
              </div>
            </div>
          </div>

          <div className="rsg-hero-ctas">
            <a href="#apply" className="rsg-cta-button rsg-cta-primary">
              Get Free Demo Access
            </a>
            <a href="#what-you-get" className="rsg-cta-button rsg-cta-secondary">
              What You Get
            </a>
            <a href="#ideas" className="rsg-cta-button rsg-cta-secondary">
              Event Ideas
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

      {/* The Opportunity Section */}
      <BubbleContainer>
        <section className="rsg-about-section">
          <h2>Spark Curiosity During British Science Week</h2>
          <p className="rsg-section-description">
            Each year's British Science Week is a perfect moment for VR science exploration.
            <strong> Let students ask "what if?" and find out — safely, in virtual labs.</strong>
            WhimsyLabs provides free demo access for your Science Week event.
          </p>
          
          <div className="rsg-info-cards">
            <div className="rsg-info-card">
              <div className="rsg-info-icon">❓</div>
              <h3>Any Theme</h3>
              <p>Whatever the year's theme, VR labs let students explore their own questions hands-on.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">📅</div>
              <h3>The Dates</h3>
              <p>March 2027. Plan your school's Science Week event with VR as the centrepiece.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">💰</div>
              <h3>Kick Start Grants</h3>
              <p>£400 grants available to help schools run engaging Science Week activities.</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* What You Get Section */}
      <section id="what-you-get" className="rsg-package-section">
        <div className="container">
          <h2>What WhimsyLabs Provides</h2>
          <p className="rsg-section-description">
            Running a British Science Week event? We provide free demo access to make it unforgettable.
          </p>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-whimsy">
              <div className="rsg-package-icon">🎁</div>
              <h3>FREE for Science Week</h3>
              <ul>
                <li><strong>Demo Access:</strong> Free WhimsyLabs access during Science Week</li>
                <li><strong>Event Ideas:</strong> Ready-to-run VR activities for any Science Week theme</li>
                <li><strong>Activity Sheets:</strong> Student worksheets linking VR to the theme</li>
                <li><strong>Setup Support:</strong> Technical help getting VR ready for your event</li>
                <li><strong>Grant Application Help:</strong> Support applying for Kick Start funding</li>
              </ul>
            </div>
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">💷</div>
              <h3>Your £400 Could Cover</h3>
              <ul>
                <li>VR headset rental for the week</li>
                <li>Science Week decorations and materials</li>
                <li>Guest speaker or STEM ambassador</li>
                <li>Student prizes and certificates</li>
                <li>Refreshments for a science fair</li>
              </ul>
              <p className="rsg-package-highlight">
                <strong>💡 Tip:</strong> Even without the grant, WhimsyLabs demo access is free for Science Week!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Ideas Section */}
      <BubbleContainer>
        <section id="ideas" className="rsg-help-section">
          <h2>Science Week Event Ideas</h2>
          <p className="rsg-section-description">
            Science Week is the perfect time for VR exploration. Here are event ideas that work brilliantly:
          </p>

          <div className="rsg-features-grid">
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🔬</div>
              <h4>VR Lab Discovery Day</h4>
              <p>
                Set up VR stations where students explore experiments they've always wondered about. 
                "What happens if I mix these chemicals?"
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">❓</div>
              <h4>Question Wall</h4>
              <p>
                Students post their science questions, then use VR labs to investigate and find answers. 
                Perfect for sparking scientific curiosity.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🏆</div>
              <h4>Science Week Challenge</h4>
              <p>
                Teams compete to solve VR lab challenges. Fastest circuit builder? 
                Most accurate titration? Best hypothesis?
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">👨‍👩‍👧‍👦</div>
              <h4>Family Science Evening</h4>
              <p>
                Invite parents to experience VR science with their children. 
                A memorable way to showcase your school's STEM provision.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🎪</div>
              <h4>Science Fair Booth</h4>
              <p>
                VR as one station at your Science Fair. Students demonstrate experiments 
                to visitors — no safety concerns!
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📸</div>
              <h4>Science Selfie Station</h4>
              <p>
                Photo opportunities with VR labs. Students share their Science Week 
                experience on social media.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Key Dates Section */}
      <section className="rsg-dates-section">
        <div className="container">
          <h2>Key Dates for 2026</h2>
          <p className="rsg-section-description">
            Plan ahead for British Science Week 2026. <strong>Contact us in January</strong> to ensure 
            your VR access is ready.
          </p>
          
          <div className="rsg-timeline">
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>Grant Applications Open</h3>
                <p className="rsg-date">Autumn 2026</p>
                <p className="rsg-deadline-note">Check BSW website for exact dates</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📧</div>
              <div className="rsg-timeline-content">
                <h3>Contact WhimsyLabs</h3>
                <p className="rsg-date">January 2027</p>
                <p className="rsg-deadline-note">Get demo access set up</p>
              </div>
            </div>
            <div className="rsg-timeline-item rsg-timeline-open">
              <div className="rsg-timeline-marker">🎉</div>
              <div className="rsg-timeline-content">
                <h3>British Science Week</h3>
                <p className="rsg-date">March 2027</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <BubbleContainer>
        <section id="eligibility" className="rsg-eligibility-section">
          <h2>Who Can Participate?</h2>
          <p className="rsg-section-description">
            British Science Week is open to everyone. Kick Start grants prioritise schools in challenging circumstances:
          </p>

          <div className="rsg-eligibility-grid">
            <div className="rsg-eligibility-card rsg-eligible">
              <h3>✅ Free Demo Access For:</h3>
              <ul>
                <li>Any UK school planning a Science Week event</li>
                <li>Youth groups and community organisations</li>
                <li>Libraries and public venues</li>
                <li>Home educators running Science Week activities</li>
              </ul>
            </div>
            <div className="rsg-eligibility-card rsg-partners">
              <h3>💰 Kick Start Grants For:</h3>
              <ul>
                <li>Schools with limited budgets</li>
                <li>Schools serving disadvantaged communities</li>
                <li>First-time Science Week participants</li>
                <li>Events reaching underrepresented groups</li>
              </ul>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Apply Section */}
      <section id="apply" className="rsg-contact-section">
        <div className="container">
          <h2>Get Free Demo Access for Science Week</h2>
          <p className="rsg-contact-description">
            Planning a British Science Week event? Register your interest and we'll provide 
            free WhimsyLabs access for your school.
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
                <label htmlFor="school">School/Organisation Name *</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  required
                  placeholder="Your organisation's name"
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
                  placeholder="e.g., Science Lead, Event Coordinator"
                />
              </div>
            </div>

            <div className="rsg-form-group">
              <label htmlFor="eventType">What type of event are you planning?</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
              >
                <option value="">Select an option...</option>
                <option value="whole-school">Whole-school Science Week</option>
                <option value="discovery-day">VR Discovery Day</option>
                <option value="family-evening">Family Science Evening</option>
                <option value="science-fair">Science Fair</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>

            <div className="rsg-form-group">
              <label htmlFor="message">Tell Us About Your Plans</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="What are you planning for Science Week? How many students involved? Any specific ideas?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="rsg-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending..." : "Get Free Demo Access"}
            </button>

            {formStatus === "success" && (
              <div className="rsg-form-success">
                ✅ <strong>You're registered!</strong> We'll be in touch to set up your free Science Week demo access.
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
          <h2>Make Science Week Unforgettable</h2>
          <p>
            VR labs turn British Science Week into an experience students will remember. 
            Free demo access, event ideas, and support — all at no cost.
          </p>
          <div className="rsg-cta-buttons">
            <a href="#apply" className="btn rsg-cta-primary">
              Get Free Demo Access
            </a>
            <a 
              href="https://www.britishscienceweek.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn rsg-cta-secondary"
            >
              British Science Week Official Site
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default BritishScienceWeekGrantPage;
