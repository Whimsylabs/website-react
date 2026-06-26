import React, { useState } from "react";
import "./RoyalSocietyGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

const UKSchoolFundingGrantPage = ({ language = "en" }) => {
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
        source: 'uk_school_funding_page'
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
          message: formData.message,
          subject: "UK School Funding Enquiry - WhimsyLabs via Pupil Premium / SEN Budgets",
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

      {/* Hero Section - Fund WhimsyLabs from budgets you already hold */}
      <section className="rsg-hero-section">
        <div
          className="rsg-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="rsg-hero-content">
            <AnimatedTitle
              text="Fund Virtual Labs with Pupil Premium & SEN Budgets"
              className="rsg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="rsg-hero-subtitle">
              <strong>No competitive application needed.</strong>
              <br />
              UK state schools can fund WhimsyLabs from budgets they already hold — Pupil Premium and the notional SEN budget — as a documented, evidence-based spending decision.
            </p>
            <div className="rsg-hero-badges">
              <div className="rsg-badge rsg-badge-primary">
                ✅ Budgets You Already Hold
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                📊 Evidence Summaries Provided
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                💷 Value-for-Money Case
              </div>
            </div>
          </div>

          <div className="rsg-hero-ctas">
            <a href="#enquire" className="rsg-cta-button rsg-cta-primary">
              Get a Funding Pack
            </a>
            <a href="#pupil-premium" className="rsg-cta-button rsg-cta-secondary">
              Pupil Premium
            </a>
            <a href="#sen-budget" className="rsg-cta-button rsg-cta-secondary">
              SEN Budget
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
          <h2>Allocate, Don't Apply</h2>
          <p className="rsg-section-description">
            These aren't grants you win in a competition. <strong>Pupil Premium and the notional SEN budget are discretionary
            funds every English state school already holds.</strong> You decide how to spend them — so funding WhimsyLabs is simply a
            documented, evidence-based spending decision, not an external bid.
          </p>

          <div className="rsg-info-cards">
            <div className="rsg-info-card">
              <div className="rsg-info-icon">💷</div>
              <h3>Budgets You Already Hold</h3>
              <p>Pupil Premium and the notional SEN budget sit in your school's own funding — no awarding body, no deadline, no competition.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">📊</div>
              <h3>Allowable Spend</h3>
              <p>DfE guidance explicitly allows software that supports high-quality teaching and assistive technology for SEND pupils.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">📝</div>
              <h3>We Document It</h3>
              <p>WhimsyLabs supplies evidence summaries and a value-for-money case so your spending decision is properly justified.</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Pupil Premium Section */}
      <section id="pupil-premium" className="rsg-package-section">
        <div className="container">
          <h2>Funding WhimsyLabs from Pupil Premium</h2>
          <p className="rsg-section-description">
            Pupil Premium is additional funding to improve outcomes for disadvantaged pupils in England. The DfE's official
            "menu of approaches" explicitly allows spending on <strong>"technology to support high-quality teaching — for example,
            software to support diagnostic assessment."</strong> Instructional science software like WhimsyLabs is an allowable
            Pupil Premium spend when it benefits disadvantaged pupils.
          </p>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">💷</div>
              <h3>2026–27 Per-Pupil Rates (England)</h3>
              <ul>
                <li><strong>£1,550</strong> — FSM Ever-6, primary</li>
                <li><strong>£1,100</strong> — FSM Ever-6, secondary</li>
                <li><strong>£2,690</strong> — Looked-after / previously-looked-after children</li>
                <li><strong>£360</strong> — Service Pupil Premium</li>
              </ul>
              <p className="rsg-package-highlight">
                <strong>💡 Note:</strong> These rates are set per eligible pupil — your total Pupil Premium allocation depends on
                how many pupils qualify at your school.
              </p>
            </div>
            <div className="rsg-package-card rsg-package-whimsy">
              <div className="rsg-package-icon">🔬</div>
              <h3>Why WhimsyLabs Qualifies</h3>
              <ul>
                <li><strong>Supports high-quality teaching:</strong> curriculum-aligned virtual chemistry, biology and physics labs</li>
                <li><strong>Benefits disadvantaged pupils:</strong> hands-on practical science without the cost barrier of physical kit</li>
                <li><strong>Runs on what schools have:</strong> browser-based and Chromebook-friendly — no expensive hardware needed</li>
                <li><strong>AI tutor support:</strong> targeted, individualised help that closes gaps for pupils who need it most</li>
                <li><strong>Evidence-ready:</strong> we provide research summaries to underpin your Pupil Premium strategy statement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEN Budget Section */}
      <BubbleContainer>
        <section id="sen-budget" className="rsg-help-section">
          <h2>Funding WhimsyLabs from the Notional SEN Budget</h2>
          <p className="rsg-section-description">
            Every mainstream school holds a notional SEN budget to support pupils with special educational needs. DfE guidance
            states this budget <strong>"can help fund equipment, such as computers and assistive technology."</strong> WhimsyLabs'
            accessible, inclusive virtual labs are an allowable use of this funding for your SEND pupils. (Amounts are set by your
            local authority; the first ~£6,000 of additional SEN support per pupil typically comes from the school budget.)
          </p>

          <div className="rsg-features-grid">
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">♿</div>
              <h4>Built for Accessibility</h4>
              <p>
                Designed with SEND in mind — adjustable pacing, clear visuals, audio support and a calm, low-pressure
                environment that lets every pupil take part in practical science.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🤖</div>
              <h4>Patient AI Tutor</h4>
              <p>
                An always-available AI tutor gives individualised, step-by-step guidance — ideal for pupils who benefit from
                repetition and one-to-one style support.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🧪</div>
              <h4>Safe, Repeatable Practicals</h4>
              <p>
                Pupils can repeat experiments as many times as they need, with no risk and no consumable cost — removing
                barriers that often exclude SEND learners from the lab.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">💻</div>
              <h4>Assistive Technology</h4>
              <p>
                As browser-based software accessed on existing computers and Chromebooks, WhimsyLabs fits squarely within
                "computers and assistive technology" allowed under the notional SEN budget.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🥽</div>
              <h4>VR-Capable When Helpful</h4>
              <p>
                For pupils who engage better through immersion, the same labs are VR-capable — an inclusive option, never a
                requirement.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📋</div>
              <h4>Provision Mapping Support</h4>
              <p>
                We help you describe WhimsyLabs within your SEND provision so the spend is documented and defensible at review.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* What We Provide Section */}
      <section className="rsg-dates-section">
        <div className="container">
          <h2>What WhimsyLabs Provides to Support the Decision</h2>
          <p className="rsg-section-description">
            A spending decision needs to be justified. We give you everything you need to <strong>document the rationale</strong> and
            demonstrate value for money.
          </p>

          <div className="rsg-timeline">
            <div className="rsg-timeline-item rsg-timeline-open">
              <div className="rsg-timeline-marker">📊</div>
              <div className="rsg-timeline-content">
                <h3>Evidence Summaries</h3>
                <p className="rsg-date">Research on virtual labs &amp; outcomes</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">💷</div>
              <div className="rsg-timeline-content">
                <h3>Value-for-Money Case</h3>
                <p className="rsg-date">Cost per pupil vs. physical labs</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>Strategy Statement Wording</h3>
                <p className="rsg-date">Drop-in text for your documentation</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">🎥</div>
              <div className="rsg-timeline-content">
                <h3>Free Demo &amp; Onboarding</h3>
                <p className="rsg-date">See it before you allocate budget</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility / Which budget Section */}
      <BubbleContainer>
        <section className="rsg-eligibility-section">
          <h2>Which Budget Fits Your School?</h2>
          <p className="rsg-section-description">
            Most English state schools hold both of these budgets. Use whichever best matches the pupils you want to support:
          </p>

          <div className="rsg-eligibility-grid">
            <div className="rsg-eligibility-card rsg-eligible">
              <h3>💷 Use Pupil Premium If:</h3>
              <ul>
                <li>You have disadvantaged pupils (FSM Ever-6, looked-after, or service children)</li>
                <li>You want to raise attainment in science for those pupils</li>
                <li>You're updating your Pupil Premium strategy statement</li>
                <li>You want software that supports high-quality teaching</li>
              </ul>
            </div>
            <div className="rsg-eligibility-card rsg-partners">
              <h3>♿ Use the Notional SEN Budget If:</h3>
              <ul>
                <li>You're supporting pupils with special educational needs</li>
                <li>You need accessible, inclusive practical science</li>
                <li>You're funding computers or assistive technology</li>
                <li>You want to strengthen your SEND provision offer</li>
              </ul>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Enquire Section */}
      <section id="enquire" className="rsg-contact-section">
        <div className="container">
          <h2>Get Your School Funding Pack</h2>
          <p className="rsg-contact-description">
            Tell us a little about your school and we'll send evidence summaries, a value-for-money case, and ready-to-use
            wording for your Pupil Premium or SEN documentation — usually within 48 hours.
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
                  placeholder="e.g., Head of Science, SENCO, Business Manager"
                />
              </div>
            </div>

            <div className="rsg-form-group">
              <label htmlFor="message">Anything Else We Should Know?</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                placeholder="Which budget are you considering? How many pupils? Any specific questions?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="rsg-submit-btn"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending..." : "Get My Funding Pack"}
            </button>

            {formStatus === "success" && (
              <div className="rsg-form-success">
                ✅ <strong>You're in!</strong> Check your email within 48 hours for your funding pack with evidence summaries and
                value-for-money documentation. We'll also offer a quick call if helpful.
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
          <h2>Already Funded — Just Allocate It</h2>
          <p>
            The money is already in your school's hands. WhimsyLabs gives you the evidence and value-for-money case to spend
            Pupil Premium or SEN budget on accessible, curriculum-aligned virtual science — confidently and defensibly.
          </p>
          <div className="rsg-cta-buttons">
            <a href="#enquire" className="btn rsg-cta-primary">
              Get Your Funding Pack
            </a>
            <a
              href="https://www.gov.uk/government/publications/pupil-premium"
              target="_blank"
              rel="noopener noreferrer"
              className="btn rsg-cta-secondary"
            >
              Official DfE Pupil Premium Guidance
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default UKSchoolFundingGrantPage;
