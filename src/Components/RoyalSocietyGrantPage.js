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
    deadline: "",
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
          deadline: formData.deadline,
          message: formData.message,
          subject: "Partnership Grant Application - WhimsyLabs Partner Request",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", school: "", email: "", role: "", deadline: "", message: "" });
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

      {/* Hero Section - Position WhimsyLabs as THE Partner */}
      <section className="rsg-hero-section">
        <div
          className="rsg-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="rsg-hero-content">
            <AnimatedTitle
              text="Your Partnership Grant Partner"
              className="rsg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="rsg-hero-subtitle">
              <strong>WhimsyLabs is your Royal Society Partnership Grant solution.</strong>
              <br />
              Free VR science software. Application support. Everything you need.
            </p>
            <div className="rsg-hero-badges">
              <div className="rsg-badge rsg-badge-primary">
                🎁 FREE Software During Grant
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                📝 Application Templates
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                💰 Up to £3,000 Funding
              </div>
            </div>
          </div>

          <div className="rsg-hero-ctas">
            <a href="#apply" className="rsg-cta-button rsg-cta-primary">
              Apply With WhimsyLabs
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
          <h2>£3,000 for VR Science in Your Classroom</h2>
          <p className="rsg-section-description">
            The Royal Society Partnership Grants fund schools to run cutting-edge STEM projects. 
            <strong> WhimsyLabs is your ready-made solution</strong> — we provide everything you need 
            to submit a winning application and bring immersive science to your students.
          </p>
          
          <div className="rsg-info-cards">
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🎯</div>
              <h3>The Opportunity</h3>
              <p>UK state schools can apply for up to £3,000 to fund investigative STEM projects with industry partners.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🤝</div>
              <h3>WhimsyLabs = Your Partner</h3>
              <p>We're your technology partner. Free software, application support, and technical documentation included.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🚀</div>
              <h3>Ready to Go</h3>
              <p>Don't start from scratch. Our proven partnership model makes your application stronger.</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* What You Get Section */}
      <section id="what-you-get" className="rsg-package-section">
        <div className="container">
          <h2>What WhimsyLabs Provides — FREE</h2>
          <p className="rsg-section-description">
            When you partner with WhimsyLabs for your grant application, you get everything below 
            at <strong>no cost</strong>. Your entire £3,000 goes toward VR hardware and other project needs.
          </p>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-whimsy">
              <div className="rsg-package-icon">🎁</div>
              <h3>FREE for Grant Recipients</h3>
              <ul>
                <li><strong>Full WhimsyLabs Platform Access</strong> — All virtual experiments and lab environments</li>
                <li><strong>Application Support Pack</strong> — Templates, project ideas, and sample text</li>
                <li><strong>Technical Documentation</strong> — Ready-to-use content for your proposal</li>
                <li><strong>Teacher Training</strong> — Full onboarding for your team</li>
                <li><strong>Student Progress Dashboard</strong> — Track learning outcomes</li>
                <li><strong>Curriculum-Aligned Lessons</strong> — Ready-made lesson plans</li>
                <li><strong>Ongoing Technical Support</strong> — Help throughout your project</li>
                <li><strong>Impact Documentation</strong> — Evidence gathering for your Royal Society report</li>
              </ul>
            </div>
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">💷</div>
              <h3>Your Grant Covers</h3>
              <ul>
                <li>VR headsets for your classroom (6-10 devices typical)</li>
                <li>Optional tablet for teacher control</li>
                <li>Physical materials for investigations</li>
                <li>STEM partner expenses (if needed)</li>
                <li>Celebration event for students</li>
              </ul>
              <p className="rsg-package-highlight">
                <strong>💡 Pro Tip:</strong> Budget £2,000-2,500 for VR hardware — that's where your grant has most impact.
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
            Writing grant applications is time-consuming. We make it easy with ready-to-use materials 
            and expert support.
          </p>

          <div className="rsg-features-grid">
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📄</div>
              <h4>Application Templates</h4>
              <p>
                Pre-written sections you can adapt for your school. Project descriptions, 
                learning objectives, and methodology — all tailored for VR science.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📊</div>
              <h4>Evidence Pack</h4>
              <p>
                Research summaries showing VR's impact on science learning. Ready to drop 
                into your application's evidence section.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🔬</div>
              <h4>Project Ideas</h4>
              <p>
                Proven investigation frameworks that work brilliantly with VR — from 
                virtual chemistry experiments to physics simulations.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📋</div>
              <h4>Technical Specification</h4>
              <p>
                Hardware requirements, software capabilities, and setup documentation — 
                everything reviewers need to understand your project.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">✍️</div>
              <h4>Application Review</h4>
              <p>
                We'll review your draft application and suggest improvements before 
                you submit. A second pair of expert eyes.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🎥</div>
              <h4>Demo Access</h4>
              <p>
                Free demo of WhimsyLabs for your application. Show reviewers exactly 
                what students will experience.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Key Dates Section */}
      <section className="rsg-dates-section">
        <div className="container">
          <h2>2026 Application Deadlines</h2>
          <p className="rsg-section-description">
            Three opportunities to apply. <strong>Contact us 4-6 weeks before</strong> your target deadline 
            for the best support.
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
                <h3>Spring Deadline</h3>
                <p className="rsg-date">30 April 2026</p>
                <p className="rsg-deadline-note">→ Contact us by mid-March</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>Summer Deadline</h3>
                <p className="rsg-date">10 July 2026</p>
                <p className="rsg-deadline-note">→ Contact us by late May</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>Autumn Deadline</h3>
                <p className="rsg-date">30 November 2026</p>
                <p className="rsg-deadline-note">→ Contact us by mid-October</p>
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
            Most UK state schools can apply. Here's the quick checklist:
          </p>

          <div className="rsg-eligibility-grid">
            <div className="rsg-eligibility-card rsg-eligible">
              <h3>✅ You Can Apply If:</h3>
              <ul>
                <li>You're a UK state-funded school</li>
                <li>Your students are aged 5-18</li>
                <li>You haven't received this grant in the past 2 years</li>
                <li>Your project involves student investigation (not just demos)</li>
              </ul>
            </div>
            <div className="rsg-eligibility-card rsg-partners">
              <h3>🤝 About STEM Partners</h3>
              <ul>
                <li>Royal Society requires a STEM professional partner</li>
                <li>This can be a university researcher, PhD student, or industry scientist</li>
                <li><strong>Don't have one? We can help connect you</strong></li>
                <li>WhimsyLabs is your technology partner — separate from your STEM partner</li>
              </ul>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Apply Section */}
      <section id="apply" className="rsg-contact-section">
        <div className="container">
          <h2>Apply With WhimsyLabs as Your Partner</h2>
          <p className="rsg-contact-description">
            Ready to bring VR science to your classroom? Register your interest and we'll send 
            your application support pack within 48 hours.
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
              <label htmlFor="deadline">Which Deadline Are You Targeting?</label>
              <select
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
              >
                <option value="">Select a deadline...</option>
                <option value="april-2026">30 April 2026 (Spring)</option>
                <option value="july-2026">10 July 2026 (Summer)</option>
                <option value="november-2026">30 November 2026 (Autumn)</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>

            <div className="rsg-form-group">
              <label htmlFor="message">Anything Else We Should Know?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="What subjects do you teach? Have you applied for grants before? Any specific questions?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="rsg-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending..." : "Get My Application Pack"}
            </button>

            {formStatus === "success" && (
              <div className="rsg-form-success">
                ✅ <strong>You're in!</strong> Check your email within 48 hours for your application support pack. 
                We'll also reach out to schedule a quick call if helpful.
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
          <h2>Don't Write Your Application Alone</h2>
          <p>
            Schools that partner with us get free software, application templates, and expert support. 
            Your grant application is stronger with WhimsyLabs.
          </p>
          <div className="rsg-cta-buttons">
            <a href="#apply" className="btn rsg-cta-primary">
              Partner With WhimsyLabs
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
