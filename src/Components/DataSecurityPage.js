import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './DataSecurityPage.css';
import { Helmet } from 'react-helmet-async';
import withTranslation from './withTranslation';

const DataSecurityPage = ({ t, currentLang, language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>Student Data Security | WhimsyLabs Virtual Lab Software</title>
        <meta name="description" content="Learn how WhimsyLabs protects student data with isolated per-school deployments, no AI training on student data, and full GDPR/FERPA/COPPA compliance." />
        <meta name="keywords" content="student data privacy, EdTech security, FERPA compliance, GDPR education, virtual lab data protection, school data security" />
      </Helmet>
      <Header />
      <div className="data-security-page">
        {/* Hero Section */}
        <section className="security-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">🛡️ Privacy-First Architecture</div>
              <h1 className="hero-title">Your Students' Data.<br />Your Control.</h1>
              <p className="hero-subtitle">
                In an era of high-profile EdTech data breaches, WhimsyLabs is built differently. 
                Our architecture ensures your institution's data stays isolated, protected, and under your control.
              </p>
            </div>
          </div>
        </section>

        {/* Key Commitments */}
        <section className="commitments-section">
          <div className="container">
            <h2 className="section-title">Our Data Commitments</h2>
            <div className="commitments-grid">
              <div className="commitment-card">
                <div className="commitment-icon">🔒</div>
                <h3>Isolated Per-School Deployments</h3>
                <p>
                  Your institution's data never mixes with other schools. Each deployment is completely 
                  isolated — a breach at one institution cannot affect another. This isn't just database 
                  separation; it's architectural isolation by design.
                </p>
              </div>
              
              <div className="commitment-card">
                <div className="commitment-icon">🤖</div>
                <h3>No AI Training on Student Data</h3>
                <p>
                  Your students' work, progress, and interactions are never used to train machine learning 
                  models. Our AI tutor provides personalized guidance without harvesting data for external 
                  model improvement.
                </p>
              </div>
              
              <div className="commitment-card">
                <div className="commitment-icon">📊</div>
                <h3>No Third-Party Trackers</h3>
                <p>
                  We don't use Google Analytics, Meta Pixel, or similar tracking services. No behavioural 
                  profiling. No advertising cookies. Your students' learning data stays in your learning 
                  environment.
                </p>
              </div>
              
              <div className="commitment-card">
                <div className="commitment-icon">📋</div>
                <h3>Data Minimisation Philosophy</h3>
                <p>
                  We collect only what's essential for learning analytics: experiment actions, progress 
                  tracking, and assessment data. No personal information beyond what's needed to provide 
                  the educational service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Collect */}
        <section className="collection-section">
          <div className="container">
            <h2 className="section-title">Exactly What We Collect</h2>
            <p className="section-intro">Transparency matters. Here's precisely what data flows through our systems:</p>
            
            <div className="data-table-container">
              <div className="data-category">
                <h3>📚 Learning Data</h3>
                <ul>
                  <li><strong>Experiment actions</strong> — What students do in the virtual lab (pour, measure, observe)</li>
                  <li><strong>Progress markers</strong> — Which experiments completed, time spent, attempts made</li>
                  <li><strong>Assessment responses</strong> — Answers to lab questions and evaluations</li>
                  <li><strong>Safety compliance</strong> — Whether proper lab procedures were followed</li>
                </ul>
                <div className="data-purpose">
                  <strong>Purpose:</strong> Enable teachers to track progress, provide AI feedback, and generate reports.
                </div>
              </div>
              
              <div className="data-category">
                <h3>👤 Account Data</h3>
                <ul>
                  <li><strong>Username</strong> — Can be pseudonymous (student IDs work fine)</li>
                  <li><strong>School/class association</strong> — Which institution and group</li>
                  <li><strong>Role</strong> — Student, teacher, or administrator</li>
                </ul>
                <div className="data-purpose">
                  <strong>Purpose:</strong> Authentication and access control.
                </div>
              </div>
              
              <div className="data-category data-not-collected">
                <h3>🚫 What We DON'T Collect</h3>
                <ul>
                  <li>Home addresses or phone numbers</li>
                  <li>Biometric data</li>
                  <li>Browsing history outside our platform</li>
                  <li>Social media information</li>
                  <li>Financial information from students</li>
                  <li>Health or medical information</li>
                  <li>Behavioural profiles for advertising</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="compliance-section">
          <div className="container">
            <h2 className="section-title">Regulatory Compliance</h2>
            <div className="compliance-grid">
              <div className="compliance-card">
                <div className="compliance-flag">🇬🇧🇪🇺</div>
                <h3>GDPR</h3>
                <p>Full compliance with UK GDPR and EU General Data Protection Regulation. Your institution is the data controller; we process data only on your behalf.</p>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-flag">🇺🇸</div>
                <h3>FERPA</h3>
                <p>Compliant with the Family Educational Rights and Privacy Act. Educational records are protected and accessible only to authorised parties.</p>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-flag">👶</div>
                <h3>COPPA</h3>
                <p>Children's Online Privacy Protection Act compliance for users under 13. Parental/school consent required; enhanced protections for young learners.</p>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-flag">🇨🇦</div>
                <h3>PIPEDA</h3>
                <p>Compliant with Canada's Personal Information Protection and Electronic Documents Act for Canadian institutions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="architecture-section">
          <div className="container">
            <h2 className="section-title">Security Architecture</h2>
            <div className="architecture-content">
              <div className="architecture-item">
                <div className="arch-icon">🔐</div>
                <div className="arch-details">
                  <h3>Encryption Everywhere</h3>
                  <p>TLS 1.3 for data in transit. AES-256 encryption for data at rest. Your students' work is protected at every stage.</p>
                </div>
              </div>
              
              <div className="architecture-item">
                <div className="arch-icon">🏢</div>
                <div className="arch-details">
                  <h3>School-Level Isolation</h3>
                  <p>Each institution operates in an isolated environment. No shared databases, no cross-contamination risk, no centralised honeypot for attackers.</p>
                </div>
              </div>
              
              <div className="architecture-item">
                <div className="arch-icon">🔑</div>
                <div className="arch-details">
                  <h3>Role-Based Access Control</h3>
                  <p>Students see only their own data. Teachers see only their classes. Administrators see only their institution. No one sees more than they need.</p>
                </div>
              </div>
              
              <div className="architecture-item">
                <div className="arch-icon">📝</div>
                <div className="arch-details">
                  <h3>Audit Logging</h3>
                  <p>All administrative actions are logged and auditable. Know who accessed what and when.</p>
                </div>
              </div>
              
              <div className="architecture-item">
                <div className="arch-icon">💾</div>
                <div className="arch-details">
                  <h3>Secure Backups</h3>
                  <p>Automated encrypted backups with tested restoration procedures. Your data is recoverable even in worst-case scenarios.</p>
                </div>
              </div>
              
              <div className="architecture-item">
                <div className="arch-icon">🌐</div>
                <div className="arch-details">
                  <h3>Offline Capability</h3>
                  <p>The platform works offline. When students are offline, no data leaves their device until they're back online and authenticated.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="rights-section">
          <div className="container">
            <h2 className="section-title">Your Institution's Rights</h2>
            <div className="rights-grid">
              <div className="right-card">
                <h3>📤 Data Export</h3>
                <p>Request a complete export of all your institution's data at any time, in standard formats. Your data is portable.</p>
              </div>
              
              <div className="right-card">
                <h3>🗑️ Data Deletion</h3>
                <p>Request complete deletion of your institution's data when you leave the platform. We don't hold your data hostage.</p>
              </div>
              
              <div className="right-card">
                <h3>🔍 Data Access</h3>
                <p>Review exactly what data we hold about your students. Full transparency, no hidden datasets.</p>
              </div>
              
              <div className="right-card">
                <h3>✏️ Data Correction</h3>
                <p>Correct any inaccurate data. You maintain control over the information in your environment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="comparison-section">
          <div className="container">
            <h2 className="section-title">How We Compare</h2>
            <p className="section-intro">
              After incidents like the PowerSchool breach affecting 60+ million students, schools are right to ask hard questions. 
              Here's how WhimsyLabs differs from typical EdTech platforms:
            </p>
            
            <div className="comparison-table">
              <div className="comparison-row comparison-header">
                <div className="comparison-feature">Feature</div>
                <div className="comparison-typical">Typical EdTech</div>
                <div className="comparison-whimsylabs">WhimsyLabs</div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-feature">Data Architecture</div>
                <div className="comparison-typical">
                  <span className="status-bad">❌</span> Centralised database with millions of records
                </div>
                <div className="comparison-whimsylabs">
                  <span className="status-good">✅</span> Isolated per-school deployments
                </div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-feature">AI Training</div>
                <div className="comparison-typical">
                  <span className="status-bad">❌</span> Often uses student data for model training
                </div>
                <div className="comparison-whimsylabs">
                  <span className="status-good">✅</span> Never trains on student data
                </div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-feature">Third-Party Tracking</div>
                <div className="comparison-typical">
                  <span className="status-bad">❌</span> Google Analytics, Meta Pixel, etc.
                </div>
                <div className="comparison-whimsylabs">
                  <span className="status-good">✅</span> No third-party trackers
                </div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-feature">Breach Impact</div>
                <div className="comparison-typical">
                  <span className="status-bad">❌</span> One breach exposes all schools
                </div>
                <div className="comparison-whimsylabs">
                  <span className="status-good">✅</span> Breach isolated to single institution
                </div>
              </div>
              
              <div className="comparison-row">
                <div className="comparison-feature">Data Ownership</div>
                <div className="comparison-typical">
                  <span className="status-warning">⚠️</span> Often unclear or vendor-controlled
                </div>
                <div className="comparison-whimsylabs">
                  <span className="status-good">✅</span> School is data controller
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="security-cta">
          <div className="container">
            <h2>Have Questions About Data Security?</h2>
            <p>
              We're happy to discuss our security practices with your IT team, complete vendor security questionnaires, 
              or arrange a technical deep-dive with your data protection officer.
            </p>
            <div className="cta-buttons">
              <a href={language && language !== 'en' ? `/${language}/contact/` : '/contact/'} className="cta-button primary">Contact Us</a>
              <a href={language && language !== 'en' ? `/${language}/privacy/` : '/privacy/'} className="cta-button secondary">Read Privacy Policy</a>
            </div>
          </div>
        </section>
      </div>
      <Footer language={language || currentLang} />
    </main>
  );
};

export default withTranslation(DataSecurityPage);
