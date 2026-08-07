import React, { useState } from "react";
import "./RoyalSocietyGrantPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import AnimatedTitle from "./AnimatedTitle";
import { sendToCRM, parseFullName } from "../utils/crmWebhook";

const USGrantsPage = ({ language = "en" }) => {
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
        source: 'us_grants_page',
        country: 'United States'
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
          subject: "US School Funding Inquiry - WhimsyLabs Virtual Science Labs",
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
              text="US School Funding for Virtual Science Labs"
              className="rsg-hero-title"
              delay={0}
              darkMode={false}
              uppercase={true}
            />
            <p className="rsg-hero-subtitle">
              <strong>Fund WhimsyLabs virtual lab software with Title IV-A and DonorsChoose.</strong>
              <br />
              Bring browser-based, VR-capable chemistry, biology, and physics labs to your K-12 students. Runs on the Chromebooks you already have.
            </p>
            <div className="rsg-hero-badges">
              <div className="rsg-badge rsg-badge-primary">
                🎁 FREE Demo Access
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                📄 Title IV-A Justification One-Pager
              </div>
              <div className="rsg-badge rsg-badge-secondary">
                💻 Works on Chromebooks
              </div>
            </div>
          </div>

          <div className="rsg-hero-ctas">
            <a href="#apply" className="rsg-cta-button rsg-cta-primary">
              Get Funding Help
            </a>
            <a href="#funding" className="rsg-cta-button rsg-cta-secondary">
              Funding Routes
            </a>
            <a href="#eligibility" className="rsg-cta-button rsg-cta-secondary">
              Is This for Me?
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
          <h2>Real Science Labs, Funded by Money You Already Have</h2>
          <p className="rsg-section-description">
            For most US schools, the realistic route to funding virtual science labs is not federal competitive
            or research grants. It is <strong>district Title IV-A funds plus DonorsChoose</strong>. A WhimsyLabs
            subscription is a strong, defensible fit for both, and we provide the paperwork to make the case.
          </p>

          <div className="rsg-info-cards">
            <div className="rsg-info-card">
              <div className="rsg-info-icon">🏛️</div>
              <h3>Title IV-A Is the Best Federal Route</h3>
              <p>The Student Support and Academic Enrichment program funds "Effective Use of Technology," which covers blended-learning software like WhimsyLabs.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">💛</div>
              <h3>DonorsChoose Is Always Open</h3>
              <p>Teachers crowdfund directly. Digital subscriptions and VR are explicitly eligible, with no deadline to wait for.</p>
            </div>
            <div className="rsg-info-card">
              <div className="rsg-info-icon">📄</div>
              <h3>We Make the Case for You</h3>
              <p>We provide a Title IV-A justification one-pager, evidence summaries, and free demo access so coordinators can say yes.</p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Funding Routes Section */}
      <section id="funding" className="rsg-package-section">
        <div className="container">
          <h2>Your Funding Routes</h2>
          <p className="rsg-section-description">
            Several proven ways to pay for WhimsyLabs. The strongest options for most schools are listed first.
          </p>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-whimsy">
              <div className="rsg-package-icon">📚</div>
              <h3>Title IV-A (SSAE), Best Federal Route</h3>
              <p>
                Federal ESSA formula funds that flow to your district. One of its three core areas is
                <strong> "Effective Use of Technology,"</strong> which covers instructional and blended-learning
                software and digital resources.
              </p>
              <ul>
                <li>A WhimsyLabs software/VR-lab <strong>subscription is a strong fit</strong></li>
                <li><strong>NOT</strong> subject to the 15% device-infrastructure cap</li>
                <li>Sell to your district's Title coordinators, not the federal government</li>
                <li>Official program details at ed.gov</li>
              </ul>
            </div>
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">💛</div>
              <h3>DonorsChoose, Always Open</h3>
              <p>
                Teacher crowdfunding from a 501(c)(3) nonprofit. <strong>Digital subscriptions and VR are
                explicitly eligible.</strong>
              </p>
              <ul>
                <li>Rolling and always open, no deadline</li>
                <li>Public, charter, AND private school teachers</li>
                <li>Teachers create projects directly at donorschoose.org</li>
              </ul>
              <p className="rsg-package-highlight">
                <strong>💡 Tip:</strong> Pair a DonorsChoose project with district Title IV-A funds, that
                combination covers most schools.
              </p>
            </div>
          </div>

          <div className="rsg-package-grid">
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">🏫</div>
              <h3>Title I, Part A</h3>
              <p>
                Federal funds for high-poverty schools that can support <strong>supplemental science
                instruction for disadvantaged students.</strong> Use of funds is at your district's discretion,
                so talk to your Title I coordinator about adding WhimsyLabs.
              </p>
            </div>
            <div className="rsg-package-card rsg-package-grant">
              <div className="rsg-package-icon">🍑</div>
              <h3>State Grants Where VR Qualifies</h3>
              <p>
                Many states fund classroom innovation directly. For example, the <strong>Georgia Teacher Grants
                for Innovation</strong> (Georgia Foundation for Public Education) award <strong>$500–$2,500</strong>
                to Georgia public-school teachers, and <strong>VR is explicitly funded.</strong> Rounds run quarterly.
                Check whether your state offers something similar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <BubbleContainer>
        <section className="rsg-help-section">
          <h2>How WhimsyLabs Helps You Get Funded</h2>
          <p className="rsg-section-description">
            We do not just hand you a login. We give you the materials that turn a funding conversation into
            an approved purchase.
          </p>

          <div className="rsg-features-grid">
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📄</div>
              <h4>Title IV-A Justification One-Pager</h4>
              <p>
                A ready-to-share document mapping WhimsyLabs to the "Effective Use of Technology" area,
                so your Title coordinator can approve it quickly.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">📊</div>
              <h4>Evidence Summaries</h4>
              <p>
                Research-backed summaries showing the impact of virtual and VR labs on science learning,
                formatted to drop into any proposal or board memo.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🎥</div>
              <h4>Free Demo Access</h4>
              <p>
                Show decision-makers exactly what students will experience. A live demo makes the case far
                better than a brochure.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">💛</div>
              <h4>DonorsChoose Guidance</h4>
              <p>
                We help teachers frame a WhimsyLabs project so it reads clearly to donors and gets fully
                funded faster.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">💻</div>
              <h4>No New Hardware Needed</h4>
              <p>
                WhimsyLabs runs in the browser on the Chromebooks your school already owns, and scales up to
                VR headsets when you are ready.
              </p>
            </div>
            <div className="rsg-feature-item">
              <div className="rsg-feature-number">🤖</div>
              <h4>Built-In AI Tutor</h4>
              <p>
                An AI tutor guides students through chemistry, biology, and physics investigations, supporting
                differentiated learning at scale.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Eligibility Section */}
      <BubbleContainer>
        <section id="eligibility" className="rsg-eligibility-section">
          <h2>Is This Funding for Your School?</h2>
          <p className="rsg-section-description">
            Most US K-12 schools can fund WhimsyLabs through at least one of these routes. Here is the quick check:
          </p>

          <div className="rsg-eligibility-grid">
            <div className="rsg-eligibility-card rsg-eligible">
              <h3>✅ A Good Fit If:</h3>
              <ul>
                <li>You are a US K-12 school (public, charter, or private)</li>
                <li>Your district receives Title IV-A or Title I funds</li>
                <li>You want hands-on chemistry, biology, or physics without a physical lab</li>
                <li>Your students use Chromebooks or other browsers</li>
              </ul>
            </div>
            <div className="rsg-eligibility-card rsg-partners">
              <h3>🎯 Why WhimsyLabs Qualifies</h3>
              <ul>
                <li>It is instructional/blended-learning software, a Title IV-A "Effective Use of Technology" fit</li>
                <li>A subscription is not subject to the 15% device-infrastructure cap</li>
                <li>Digital subscriptions and VR are explicitly DonorsChoose-eligible</li>
                <li>VR is explicitly funded by state programs like Georgia's Teacher Grants for Innovation</li>
              </ul>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Apply Section */}
      <section id="apply" className="rsg-contact-section">
        <div className="container">
          <h2>Get Your Funding Pack</h2>
          <p className="rsg-contact-description">
            Tell us about your school and we will send your Title IV-A justification one-pager, evidence
            summaries, and free demo access within 48 hours.
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
                <label htmlFor="school">School or District *</label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  required
                  placeholder="Your school or district name"
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
                  placeholder="your.email@school.org"
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
                  placeholder="e.g., Science Teacher, Title Coordinator, Principal"
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
                placeholder="What subjects do you teach? Which funding route are you considering? Any specific questions?"
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
                ✅ <strong>You're in!</strong> Check your email within 48 hours for your funding pack and demo
                access. We'll also reach out to schedule a quick call if helpful.
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
          <h2>Don't Wait for a Lab Budget You'll Never Get</h2>
          <p>
            Title IV-A funds and DonorsChoose can put real virtual science labs in front of your students this
            year. We'll help you make the case.
          </p>
          <div className="rsg-cta-buttons">
            <a href="#apply" className="btn rsg-cta-primary">
              Get Funding Help
            </a>
            <a
              href="https://www.ed.gov/grants-and-programs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn rsg-cta-secondary"
            >
              ed.gov Grants & Programs
            </a>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default USGrantsPage;
