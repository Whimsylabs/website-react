import React, { useState } from "react";
import "./RoyalSocietyGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

const ArmourersGrantPage = ({ language = "en" }) => {
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
        source: 'armourers_grant_page',
        grant_deadline: formData.deadline
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
          deadline: formData.deadline,
          message: formData.message,
          subject: "Armourers & Brasiers Grant - WhimsyLabs Support Request",
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

      {/* Hero Section - Position WhimsyLabs as the fundable resource */}
      <section className="rsg-hero-section">
        <div
          className="rsg-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="rsg-hero-content">
            <AnimatedTitle
              text="Armourers & Brasiers Science Grants"
              className="rsg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="rsg-hero-subtitle">
              <strong>Up to £600 (primary) or £1,000 (secondary) for practical science in your school.</strong>
              <br />
              WhimsyLabs is the hands-on practical science resource you can fund with this grant: virtual chemistry, biology and physics labs, plus free demo access and application support.
            </p>
            <div className="rsg-hero-badges">
              <div className="rsg-badge rsg-badge-primary">
                🎁 FREE Demo Access
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                📝 Application Support
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                💰 Up to £1,000 Funding
              </div>
            </div>
          </div>

          <div className="rsg-hero-ctas">
            <a href="#apply" className="rsg-cta-button rsg-cta-primary">
              Get Application Support
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
          <h2>Fund Practical Science Your Students Can Enjoy</h2>
          <p className="rsg-section-description">
            The Armourers &amp; Brasiers' Gauntlet Trust "Support Science in Schools" programme funds UK schools
            so that students can enjoy practical science. <strong>WhimsyLabs is exactly the kind of resource this grant
            is designed for:</strong> affordable, hands-on virtual labs that bring practical chemistry, biology and physics
            to every classroom, even where physical lab equipment is limited.
          </p>

          <div className="rsg-info-cards">
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🎯</div>
              <h3>The Opportunity</h3>
              <p>UK primary schools can apply for up to £600, and secondary schools for up to £1,000, toward practical science resources.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🔬</div>
              <h3>A Perfect Fit</h3>
              <p>WhimsyLabs delivers genuine hands-on practical science affordably, ideal for schools where lab equipment is limited.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🚀</div>
              <h3>Ready to Go</h3>
              <p>Free demo access plus application support means a stronger, easier-to-write submission.</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* What You Get Section */}
      <section id="what-you-get" className="rsg-package-section">
        <div className="container">
          <h2>What WhimsyLabs Provides</h2>
          <p className="rsg-section-description">
            We help you turn this grant into real practical science for your students, with
            <strong> free demo access and application support</strong> to get you started.
          </p>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-whimsy">
              <div className="rsg-package-icon">🎁</div>
              <h3>FREE Support for Applicants</h3>
              <ul>
                <li><strong>Free Demo Access:</strong> Try the full WhimsyLabs platform before you apply</li>
                <li><strong>Application Support:</strong> Guidance and sample text for your submission</li>
                <li><strong>Curriculum-Aligned Labs:</strong> Practical chemistry, biology and physics activities</li>
                <li><strong>AI Tutor:</strong> Built-in guidance that supports students as they investigate</li>
                <li><strong>Browser &amp; VR-Capable:</strong> Runs in any browser, with optional VR support</li>
                <li><strong>Teacher Onboarding:</strong> Help getting your team up and running</li>
                <li><strong>Student Progress Tracking:</strong> See learning outcomes at a glance</li>
                <li><strong>Ongoing Support:</strong> Help throughout your project</li>
              </ul>
            </div>
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">💷</div>
              <h3>Your Grant Can Cover</h3>
              <ul>
                <li>Equipment and resources so students can enjoy practical science</li>
                <li>Devices to run virtual labs (computers, Chromebooks or tablets)</li>
                <li>Enrichment projects that extend practical science</li>
                <li>Science events and competitions</li>
                <li>Consumables and materials for investigations</li>
              </ul>
              <p className="rsg-package-highlight">
                <strong>💡 Tip:</strong> Primary schools can apply for up to £600 and secondary schools for up to £1,000,
                enough to equip a class for affordable, hands-on practical science.
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
            Writing grant applications takes time. We make it easier with ready-to-use materials
            and expert support tailored to practical science.
          </p>

          <div className="rsg-features-grid">
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📄</div>
              <h4>Application Guidance</h4>
              <p>
                Adaptable wording for your project description, learning objectives and how
                WhimsyLabs delivers practical science for your students.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📊</div>
              <h4>Evidence Pack</h4>
              <p>
                Research summaries on the impact of hands-on virtual labs, ready to drop into
                your application's evidence section.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🔬</div>
              <h4>Project Ideas</h4>
              <p>
                Proven practical science activities across chemistry, biology and physics that
                work brilliantly in the browser or in VR.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📋</div>
              <h4>Resource Specification</h4>
              <p>
                What you need to run WhimsyLabs and how it fits the "practical science" focus of
                the Support Science in Schools programme.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">✍️</div>
              <h4>Application Review</h4>
              <p>
                We'll review your draft and suggest improvements before you submit. A second
                pair of expert eyes.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🎥</div>
              <h4>Demo Access</h4>
              <p>
                Free demo of WhimsyLabs so you can see exactly what students will experience
                before you apply.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Key Dates Section */}
      <section className="rsg-dates-section">
        <div className="container">
          <h2>When to Apply</h2>
          <p className="rsg-section-description">
            Applications typically open in summer. <strong>Contact us 4-6 weeks before</strong> you plan to apply
            for the best support, and check the official page for current dates.
          </p>

          <div className="rsg-timeline">
            <div className="rsg-timeline-item rsg-timeline-open">
              <div className="rsg-timeline-marker">📅</div>
              <div className="rsg-timeline-content">
                <h3>Applications Typically Open</h3>
                <p className="rsg-date">Early June</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">📝</div>
              <div className="rsg-timeline-content">
                <h3>Typical Closing Date</h3>
                <p className="rsg-date">End of July</p>
                <p className="rsg-deadline-note">→ Contact us in May/June</p>
              </div>
            </div>
            <div className="rsg-timeline-item">
              <div className="rsg-timeline-marker">⚠️</div>
              <div className="rsg-timeline-content">
                <h3>Confirm Current Dates</h3>
                <p className="rsg-deadline-note">Exact 2026 dates not yet published, check the official page below.</p>
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
            UK primary and secondary schools apply directly to the Trust. Here's the quick checklist:
          </p>

          <div className="rsg-eligibility-grid">
            <div className="rsg-eligibility-card rsg-eligible">
              <h3>✅ You Can Apply If:</h3>
              <ul>
                <li>You're a UK primary or secondary school</li>
                <li>You're applying for equipment or resources for practical science</li>
                <li>Your project helps students enjoy hands-on science</li>
                <li>You apply directly to the Trust within the application window</li>
              </ul>
            </div>
            <div className="rsg-eligibility-card rsg-partners">
              <h3>🔬 WhimsyLabs = Fundable Practical Science</h3>
              <ul>
                <li>Virtual chemistry, biology and physics labs students can use hands-on</li>
                <li><strong>Affordable practical science, even where physical lab equipment is limited</strong></li>
                <li>Up to £600 (primary) or £1,000 (secondary) goes a long way with WhimsyLabs</li>
                <li>Free demo access plus application support included</li>
              </ul>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Apply Section */}
      <section id="apply" className="rsg-contact-section">
        <div className="container">
          <h2>Get Application Support From WhimsyLabs</h2>
          <p className="rsg-contact-description">
            Ready to fund practical science for your students? Register your interest and we'll send
            your demo access and application support within 48 hours.
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
              <label htmlFor="deadline">Which Phase Is Your School?</label>
              <select
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
              >
                <option value="">Select phase...</option>
                <option value="primary">Primary (up to £600)</option>
                <option value="secondary">Secondary (up to £1,000)</option>
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
              {formStatus === "sending" ? "Sending..." : "Get My Application Support"}
            </button>

            {formStatus === "success" && (
              <div className="rsg-form-success">
                ✅ <strong>You're in!</strong> Check your email within 48 hours for your demo access and application support.
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
            Schools that partner with us get free demo access, application support, and a practical
            science resource that fits this grant perfectly. Your application is stronger with WhimsyLabs.
          </p>
          <div className="rsg-cta-buttons">
            <a href="#apply" className="btn rsg-cta-primary">
              Partner With WhimsyLabs
            </a>
            <a
              href="https://www.armourershall.co.uk/funding-grants/support-science-schools"
              target="_blank"
              rel="noopener noreferrer"
              className="btn rsg-cta-secondary"
            >
              Armourers &amp; Brasiers Official Page
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default ArmourersGrantPage;
