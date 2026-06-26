import React, { useState } from "react";
import "./RoyalSocietyGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

const ScienceCommunityGrantPage = ({ language = "en" }) => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    role: "",
    partnerType: "",
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
        source: 'science_community_grant_page',
        partner_type: formData.partnerType
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
          partnerType: formData.partnerType,
          message: formData.message,
          subject: "Science Community Grant - WhimsyLabs Partner Request",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", school: "", email: "", role: "", partnerType: "", message: "" });
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
              text="Royal Society Science Community Grants"
              className="rsg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="rsg-hero-subtitle">
              <strong>Up to £105,000 over 3 years for school-STEM professional partnerships.</strong>
              <br />
              WhimsyLabs can be your STEM partner: our industry scientist founders fulfil the partnership requirement.
            </p>
            <div className="rsg-hero-badges">
              <div className="rsg-badge rsg-badge-primary">
                🎁 FREE Software During Grant
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                🔬 STEM Partner Included
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                💰 Up to £105,000 over 3 Years
              </div>
            </div>
          </div>

          <div className="rsg-hero-ctas">
            <a href="#apply" className="rsg-cta-button rsg-cta-primary">
              Partner With WhimsyLabs
            </a>
            <a href="#what-you-get" className="rsg-cta-button rsg-cta-secondary">
              What You Get
            </a>
            <a href="#eligibility" className="rsg-cta-button rsg-cta-secondary">
              Am I Eligible?
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
          <h2>£105,000 for Long-Term STEM Partnerships</h2>
          <p className="rsg-section-description">
            Science Community Grants fund sustained partnerships between schools and STEM professionals over 3 years.
            <strong> WhimsyLabs is your complete STEM partner:</strong> our industry scientist founders fulfil the partnership requirement, 
            and we provide free software plus full support.
          </p>
          
          <div className="rsg-info-cards">
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🎯</div>
              <h3>The Opportunity</h3>
              <p>Up to £35,000 per year for 3 years. Fund transformative, long-term STEM projects with professional partners.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🔬</div>
              <h3>We're Your STEM Partner</h3>
              <p>Our founders are industry experienced scientists. We fulfil the STEM professional requirement AND provide the technology.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🚀</div>
              <h3>3-Year Commitment</h3>
              <p>Build a sustainable STEM programme with ongoing support, not a one-off project.</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* What You Get Section */}
      <section id="what-you-get" className="rsg-package-section">
        <div className="container">
          <h2>What WhimsyLabs Provides</h2>
          <p className="rsg-section-description">
            Partner with WhimsyLabs for your Science Community Grant application. Our software and expertise are 
            included <strong>free for grant recipients</strong>.
          </p>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-whimsy">
              <div className="rsg-package-icon">🎁</div>
              <h3>FREE for Grant Recipients</h3>
              <ul>
                <li><strong>Full WhimsyLabs Platform:</strong> All virtual experiments for 3 years</li>
                <li><strong>STEM Partnership:</strong> Our scientists fulfil the partner requirement</li>
                <li><strong>Application Support:</strong> Templates and proposal writing help</li>
                <li><strong>Teacher Training:</strong> Full onboarding and ongoing CPD</li>
                <li><strong>Impact Documentation:</strong> Evidence gathering for annual reports</li>
                <li><strong>Technical Support:</strong> Dedicated support throughout the grant</li>
              </ul>
            </div>
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">💷</div>
              <h3>Your Grant Could Cover</h3>
              <ul>
                <li>VR equipment across multiple year groups</li>
                <li>Staff time for STEM coordination</li>
                <li>Student enrichment activities</li>
                <li>Science club resources</li>
                <li>Outreach and community engagement</li>
                <li>Celebration events and showcases</li>
              </ul>
              <p className="rsg-package-highlight">
                <strong>💡 Tip:</strong> This grant suits ambitious 3-year programmes that embed STEM culture across your school.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Support Section */}
      <BubbleContainer>
        <section className="rsg-help-section">
          <h2>Application Support Included</h2>
          <p className="rsg-section-description">
            Science Community Grants are competitive. We help you build a strong 3-year partnership proposal.
          </p>

          <div className="rsg-features-grid">
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📄</div>
              <h4>3-Year Planning</h4>
              <p>
                Help designing a sustainable programme that builds year-on-year with clear milestones 
                and outcomes.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📊</div>
              <h4>Impact Framework</h4>
              <p>
                Measurable outcomes for your application: engagement metrics, attainment data, 
                and progression tracking.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🔬</div>
              <h4>Partnership Model</h4>
              <p>
                Clear documentation of how our industry scientists work alongside your teachers 
                as STEM partners.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📋</div>
              <h4>Budget Planning</h4>
              <p>
                Sample 3-year budgets showing how to allocate £35,000/year for maximum impact.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">✍️</div>
              <h4>Application Review</h4>
              <p>
                We'll review your draft application and provide detailed feedback before submission.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🎥</div>
              <h4>Demo Access</h4>
              <p>
                Free WhimsyLabs demo for your application. Show reviewers exactly what your 
                partnership delivers.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Key Dates Section */}
      <section className="rsg-dates-section">
        <div className="container">
          <h2>Application Timeline</h2>
          <p className="rsg-section-description">
            Science Community Grants have an annual application window. <strong>Contact us 2-3 months before</strong> 
            the deadline for the best support.
          </p>
          
          <div className="rsg-timeline">
            <div className="rsg-timeline-item rsg-timeline-open">
              <div className="rsg-timeline-marker">📅</div>
              <div className="rsg-timeline-content">
                <h3>Typical Timeline</h3>
                <p className="rsg-date">Applications: Spring</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>Grant Period</h3>
                <p className="rsg-date">3 Years</p>
                <p className="rsg-deadline-note">Up to £35,000 per year</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">🎯</div>
              <div className="rsg-timeline-content">
                <h3>Contact Us</h3>
                <p className="rsg-date">2-3 Months Before</p>
                <p className="rsg-deadline-note">Allow time for partnership planning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <BubbleContainer>
        <section id="eligibility" className="rsg-eligibility-section">
          <h2>Are You Eligible?</h2>
          <p className="rsg-section-description">
            Science Community Grants require schools to partner with STEM professionals:
          </p>

          <div className="rsg-eligibility-grid">
            <div className="rsg-eligibility-card rsg-eligible">
              <h3>✅ You Can Apply If:</h3>
              <ul>
                <li>You're a UK state-funded school</li>
                <li>You can commit to a 3-year programme</li>
                <li>You want to embed STEM across your school</li>
                <li>You have teacher capacity to lead the project</li>
              </ul>
            </div>
            <div className="rsg-eligibility-card rsg-partners">
              <h3>🔬 WhimsyLabs = Your STEM Partner</h3>
              <ul>
                <li>Science Community Grants require a STEM professional partner</li>
                <li><strong>WhimsyLabs qualifies: our founders are industry scientists</strong></li>
                <li>We provide both the expertise AND the technology</li>
                <li>One partnership covers all requirements</li>
              </ul>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Apply Section */}
      <section id="apply" className="rsg-contact-section">
        <div className="container">
          <h2>Partner With WhimsyLabs</h2>
          <p className="rsg-contact-description">
            Interested in a Science Community Grant? Register your interest and we'll discuss how 
            our partnership can support your 3-year STEM vision.
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
                  placeholder="e.g., Head of Science, STEM Lead"
                />
              </div>
            </div>

            <div className="rsg-form-group">
              <label htmlFor="partnerType">Do you have other STEM partners in mind?</label>
              <select
                id="partnerType"
                name="partnerType"
                value={formData.partnerType}
                onChange={handleInputChange}
              >
                <option value="">Select an option...</option>
                <option value="whimsy-only">WhimsyLabs as sole STEM partner</option>
                <option value="whimsy-plus">WhimsyLabs plus other partners</option>
                <option value="exploring">Still exploring options</option>
              </select>
            </div>

            <div className="rsg-form-group">
              <label htmlFor="message">Tell Us About Your Vision</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="What's your 3-year STEM vision? Which subjects or year groups? Any specific goals?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="rsg-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending..." : "Start Partnership Discussion"}
            </button>

            {formStatus === "success" && (
              <div className="rsg-form-success">
                ✅ <strong>Thank you!</strong> We'll be in touch within 48 hours to discuss your Science Community Grant partnership.
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
          <h2>Transform Your School's STEM Culture</h2>
          <p>
            Science Community Grants fund ambitious 3-year partnerships. With WhimsyLabs as your STEM partner, 
            you get industry expertise and cutting-edge virtual labs.
          </p>
          <div className="rsg-cta-buttons">
            <a href="#apply" className="btn rsg-cta-primary">
              Partner With WhimsyLabs
            </a>
            <a 
              href="https://royalsociety.org/grants/science-community-grants/" 
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

export default ScienceCommunityGrantPage;
