import React, { useState } from "react";
import "./RoyalSocietyGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

const InclusiveMainstreamFundGrantPage = ({ language = "en" }) => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    email: "",
    role: "",
    strategy: "",
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

    // Send to CRM (fire-and-forget - don't block form submission)
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
        source: 'imf_grant_page',
        strategy_status: formData.strategy
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
          strategy: formData.strategy,
          message: formData.message,
          subject: "Inclusive Mainstream Fund - WhimsyLabs Support Request",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", school: "", email: "", role: "", strategy: "", message: "" });
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

      {/* Hero Section - the money is already in school budgets */}
      <section className="rsg-hero-section">
        <div
          className="rsg-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="rsg-hero-content">
            <AnimatedTitle
              text="Inclusive Mainstream Fund"
              className="rsg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="rsg-hero-subtitle">
              <strong>£400 million is in mainstream school budgets for 2026-27, no application needed.</strong>
              <br />
              WhimsyLabs is the kind of provision this fund was written for: accessible virtual labs that give every pupil full practical science, with the participation evidence your inclusion strategy needs, on the devices you already own.
            </p>
            <div className="rsg-hero-badges">
              <div className="rsg-badge rsg-badge-primary">
                🎁 FREE Demo Access
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                📝 Inclusion Strategy Support
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                💰 Formula-Allocated Funding
              </div>
            </div>
          </div>

          <div className="rsg-hero-ctas">
            <a href="#apply" className="rsg-cta-button rsg-cta-primary">
              Get Strategy Support
            </a>
            <a href="#what-you-get" className="rsg-cta-button rsg-cta-secondary">
              What You Get
            </a>
            <a href="#eligibility" className="rsg-cta-button rsg-cta-secondary">
              Does My School Qualify?
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
          <h2>The Money Arrives Automatically. The Strategy Does Not.</h2>
          <p className="rsg-section-description">
            The Inclusive Mainstream Fund gives mainstream schools in England £400 million in 2026-27, the first
            instalment of £1.6 billion over three years announced in the Schools White Paper. Allocations are
            formula-driven, so there is no bid to write. <strong>The obligation runs the other way:</strong> from
            December 2026, every school must publish an inclusion strategy showing how it removes predictable
            barriers to learning, and the spending has to make that strategy true.
          </p>

          <div className="rsg-info-cards">
            <div className="rsg-info-card">
              <div className="rsg-info-icon">💰</div>
              <h3>Already Allocated</h3>
              <p>£400m to mainstream schools in 2026-27, formula-allocated alongside your core budget. No application, no bidding round.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">📋</div>
              <h3>Strategy Due December</h3>
              <p>Every school publishes an inclusion strategy from December 2026, and is held accountable against it.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🔬</div>
              <h3>Science Is a Named Barrier</h3>
              <p>Physical, sensory and equipment barriers in practical science are exactly the "predictable barriers" the fund tells schools to remove.</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* What You Get Section */}
      <section id="what-you-get" className="rsg-package-section">
        <div className="container">
          <h2>What WhimsyLabs Provides</h2>
          <p className="rsg-section-description">
            We help you turn an IMF spend line into inclusive practical science that evidences itself, with
            <strong> free demo access and inclusion strategy support</strong> to get you started.
          </p>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-whimsy">
              <div className="rsg-package-icon">🎁</div>
              <h3>FREE Support for Schools</h3>
              <ul>
                <li><strong>Free Demo Access:</strong> Try the full WhimsyLabs platform before you commit a penny</li>
                <li><strong>Strategy Wording:</strong> Adaptable text for the practical science section of your inclusion strategy</li>
                <li><strong>Inclusive by Design:</strong> Every pupil performs the full practical themselves in our virtual labs, with no diagnosis-gated adaptations</li>
                <li><strong>Early Support Signals:</strong> WhimsyCat flags struggle and disengagement to the teacher from pupil actions, on the day</li>
                <li><strong>Participation Evidence:</strong> Per-pupil practical participation and progress records, by pupil group</li>
                <li><strong>Browser &amp; VR-Capable:</strong> Runs on the Chromebooks and PCs you already own</li>
                <li><strong>Teacher Onboarding:</strong> Help getting your science team up and running</li>
                <li><strong>Ongoing Support:</strong> Help throughout the year, including inspection preparation</li>
              </ul>
            </div>
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">💷</div>
              <h3>Your IMF Allocation Can Cover</h3>
              <ul>
                <li>Evidence-informed provision that removes predictable barriers to learning</li>
                <li>Universal, whole-school approaches rather than pupil-by-pupil bolt-ons</li>
                <li>Early support delivered without waiting for diagnosis or statutory process</li>
                <li>Resources and software that strengthen inclusive universal practice</li>
                <li>Staff development that embeds inclusive teaching in subjects</li>
              </ul>
              <p className="rsg-package-highlight">
                <strong>💡 Tip:</strong> A whole-school WhimsyLabs subscription is a small fraction of a typical
                allocation, serves every pupil rather than a handful, and generates the participation evidence
                your December strategy commits to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Support Section */}
      <BubbleContainer>
        <section className="rsg-help-section">
          <h2>Inclusion Strategy Support Included</h2>
          <p className="rsg-section-description">
            The strategy document is the accountability mechanism. We make the practical science section
            easy to write and easy to defend.
          </p>

          <div className="rsg-features-grid">
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📄</div>
              <h4>Strategy Wording</h4>
              <p>
                Adaptable text for the DfE template: the barrier named, the universal provision, and the
                evidence measure, ready for your December publication.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📊</div>
              <h4>Evidence Pack</h4>
              <p>
                Research summaries on accessible practical science and SEND engagement, ready to drop into
                your strategy's evidence base.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🧭</div>
              <h4>Ofsted Alignment</h4>
              <p>
                How the provision maps to the September 2026 inclusion toolkit: all four pupil groups,
                owned at subject level, evidenced per pupil.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🔬</div>
              <h4>Provision Design</h4>
              <p>
                Where simulated practicals sit alongside your hands-on programme so that every pupil does
                every practical, every time.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">✍️</div>
              <h4>Strategy Review</h4>
              <p>
                We'll review the practical science section of your draft strategy and suggest improvements
                before you publish.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🎥</div>
              <h4>Demo Access</h4>
              <p>
                Free demo of WhimsyLabs so your SENCO and science lead can see exactly what pupils will
                experience before any spend is committed.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Key Dates Section */}
      <section className="rsg-dates-section">
        <div className="container">
          <h2>The 2026-27 Timeline</h2>
          <p className="rsg-section-description">
            The fund, the new Ofsted toolkit, and the strategy deadline all land this school year.
            <strong> Contact us early in the autumn term</strong> to have provision and evidence in place before December.
          </p>

          <div className="rsg-timeline">
            <div className="rsg-timeline-item rsg-timeline-open">
              <div className="rsg-timeline-marker">💰</div>
              <div className="rsg-timeline-content">
                <h3>Allocations in Budgets</h3>
                <p className="rsg-date">From 2026-27</p>
                <p className="rsg-deadline-note">Published allocations, no application needed</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">🔍</div>
              <div className="rsg-timeline-content">
                <h3>Ofsted Inclusion Toolkit</h3>
                <p className="rsg-date">September 2026</p>
                <p className="rsg-deadline-note">Inclusion inspected subject by subject</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📋</div>
              <div className="rsg-timeline-content">
                <h3>Inclusion Strategies Published</h3>
                <p className="rsg-date">From December 2026</p>
                <p className="rsg-deadline-note">→ Contact us in September/October</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <BubbleContainer>
        <section id="eligibility" className="rsg-eligibility-section">
          <h2>Does Your School Qualify?</h2>
          <p className="rsg-section-description">
            If you are a mainstream school in England, the short answer is yes. Here's the quick checklist:
          </p>

          <div className="rsg-eligibility-grid">
            <div className="rsg-eligibility-card rsg-eligible">
              <h3>✅ Your School Receives IMF If:</h3>
              <ul>
                <li>You're a local authority maintained mainstream school, academy or free school in England</li>
                <li>Separate funding streams cover 16 to 19 providers (£83m) and early years (£47m)</li>
                <li>Allocations arrive by formula, published on GOV.UK alongside conditions of grant</li>
                <li>Spending decisions sit with your leaders, governors and trustees</li>
              </ul>
            </div>
            <div className="rsg-eligibility-card rsg-partners">
              <h3>🔬 WhimsyLabs = Fundable Inclusive Practice</h3>
              <ul>
                <li>Inclusive by design: every pupil performs full practicals, no adapted side-versions</li>
                <li><strong>Early support without diagnosis: struggle is spotted from pupil actions and flagged to the teacher</strong></li>
                <li>Evidence generates itself: participation and progress records by pupil group</li>
                <li>No capital spend: runs on the devices in your cupboard</li>
              </ul>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Apply Section */}
      <section id="apply" className="rsg-contact-section">
        <div className="container">
          <h2>Get Strategy Support From WhimsyLabs</h2>
          <p className="rsg-contact-description">
            Planning your IMF spend or drafting your inclusion strategy? Register your interest and we'll send
            your demo access and strategy support materials within 48 hours.
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
                  placeholder="e.g., SENCO, Head of Science, Headteacher"
                />
              </div>
            </div>

            <div className="rsg-form-group">
              <label htmlFor="strategy">Where Is Your Inclusion Strategy Up To?</label>
              <select
                id="strategy"
                name="strategy"
                value={formData.strategy}
                onChange={handleInputChange}
              >
                <option value="">Select status...</option>
                <option value="not-started">Not started yet</option>
                <option value="drafting">Drafting now</option>
                <option value="published">Published, reviewing provision</option>
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
                placeholder="Which barriers are you prioritising? Primary or secondary? Any specific questions?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="rsg-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending..." : "Get My Strategy Support"}
            </button>

            {formStatus === "success" && (
              <div className="rsg-form-success">
                ✅ <strong>You're in!</strong> Check your email within 48 hours for your demo access and strategy support materials.
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
          <h2>Spend It Where the Barriers Are</h2>
          <p>
            The schools that get the IMF right will pick named, predictable barriers and remove them completely.
            Practical science is one of the clearest candidates in the building, and the evidence writes itself.
            Read our full guide to <a href="/blog/inclusive-mainstream-fund-practical-science">spending the Inclusive Mainstream Fund on practical science</a>.
          </p>
          <div className="rsg-cta-buttons">
            <a href="#apply" className="btn rsg-cta-primary">
              Partner With WhimsyLabs
            </a>
            <a
              href="https://www.gov.uk/government/publications/inclusive-mainstream-fund-2026-to-2027"
              target="_blank"
              rel="noopener noreferrer"
              className="btn rsg-cta-secondary"
            >
              Official GOV.UK Fund Page
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default InclusiveMainstreamFundGrantPage;
