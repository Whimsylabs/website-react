import React, { useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import BubbleContainer from './BubbleContainer';
import ContactUs from './ContactUs';
import './LandingDemo.css';

// ============================================
// MOCK UI COMPONENTS (Code-based "screenshots")
// ============================================

// Assessment Category Card - matches Teacher Dashboard grading UI
const AssessmentCard = ({ icon, title, score, items, color }) => (
  <div className={`assessment-card ${color}`}>
    <div className="assessment-header">
      <span className="assessment-icon">{icon}</span>
      <span className="assessment-title">{title}</span>
      <span className="assessment-score">{score}%</span>
    </div>
    <ul className="assessment-items">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);

// Dashboard Stat Card - matches Teacher Analytics UI
const StatCard = ({ label, value, icon, subtext, trend, highlight }) => (
  <div className={`stat-card ${highlight ? 'stat-highlight' : ''}`}>
    <div className="stat-card-top">
      <div className="stat-card-info">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
      <div className={`stat-icon-box ${highlight ? 'highlight' : ''}`}>
        {icon}
      </div>
    </div>
    {(subtext || trend) && (
      <div className="stat-card-bottom">
        {trend && (
          <span className={`stat-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
        {subtext && <span className="stat-subtext">{subtext}</span>}
      </div>
    )}
  </div>
);

// Class Performance Row - matches Teacher Analytics
const ClassRow = ({ name, students, avgScore, trend, atRisk }) => (
  <div className="class-row">
    <div className="class-info">
      <span className="class-name">{name}</span>
      <span className="class-students">{students} students</span>
    </div>
    <div className="class-metrics">
      <div className="class-score">
        <div className="score-bar-bg">
          <div className="score-bar-fill" style={{ width: `${avgScore}%` }}></div>
        </div>
        <span className="score-value">{avgScore}%</span>
      </div>
      <span className={`class-trend ${trend > 0 ? 'positive' : 'negative'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
      {atRisk > 0 && (
        <span className="at-risk-badge">{atRisk} at risk</span>
      )}
    </div>
  </div>
);

// Skills Breakdown Bar - matches Teacher Analytics
const SkillBar = ({ skill, avgScore, benchmark }) => (
  <div className="skill-row">
    <span className="skill-name">{skill}</span>
    <div className="skill-bar-container">
      <div className="skill-bar-bg">
        <div
          className={`skill-bar-fill ${avgScore >= benchmark ? 'above' : 'below'}`}
          style={{ width: `${avgScore}%` }}
        ></div>
        <div className="skill-benchmark" style={{ left: `${benchmark}%` }}></div>
      </div>
      <span className="skill-score">{avgScore}%</span>
    </div>
  </div>
);

// Assignment Row - matches Teacher Analytics
const AssignmentRow = ({ name, className, submitted, total, avgScore, status }) => (
  <div className="assignment-row">
    <div className="assignment-info">
      <span className="assignment-name">{name}</span>
      <span className="assignment-class">{className}</span>
    </div>
    <div className="assignment-metrics">
      <span className="assignment-progress">{submitted}/{total}</span>
      {avgScore !== null && <span className="assignment-score">Avg: {avgScore}%</span>}
      <span className={`assignment-status status-${status}`}>
        {status === 'complete' ? 'Complete' : status === 'grading' ? 'Grading' : 'In Progress'}
      </span>
    </div>
  </div>
);

// Student Question UI - matches Student Assessment
const QuestionPreview = ({ questionNum, total, type, context, question }) => (
  <div className="question-preview">
    <div className="question-header">
      <span className="question-num">Question {questionNum} of {total}</span>
      <span className={`question-type type-${type}`}>{type}</span>
    </div>
    {context && (
      <div className="question-context">
        <span className="context-icon">📋</span>
        <span className="context-label">Your Lab Data:</span>
        <p className="context-text">{context}</p>
      </div>
    )}
    <p className="question-text">{question}</p>
    {type === 'Numeric Answer' && (
      <div className="question-input">
        <input type="text" placeholder="e.g., 8.2" className="numeric-input" readOnly />
        <span className="input-unit">pH</span>
      </div>
    )}
  </div>
);

// Action Log Entry - matches Grading UI
const ActionLogEntry = ({ time, category, action, isHighlighted }) => (
  <div className={`action-entry ${isHighlighted ? 'highlighted' : ''}`}>
    <span className="action-time">{time}</span>
    <span className={`action-category cat-${category.toLowerCase().replace(/\s/g, '-')}`}>
      {category}
    </span>
    <span className="action-text">{action}</span>
  </div>
);

// Solution Analysis Mockup - shows realistic variability
const SolutionAnalysis = () => (
  <div className="solution-analysis">
    <div className="solution-header">
      <span className="solution-icon">🧪</span>
      <span className="solution-title">Solution Analysis</span>
      <span className="solution-badge live">Simulated</span>
    </div>

    <div className="solution-main">
      <div className="solution-bottle">
        <div className="bottle-label">
          <span className="bottle-name">Hydrochloric Acid</span>
          <span className="bottle-nominal">Labelled: 0.100 M</span>
        </div>
        <div className="bottle-visual">
          <div className="bottle-liquid"></div>
        </div>
      </div>

      <div className="solution-arrow">→</div>

      <div className="solution-actual">
        <div className="actual-header">
          <span className="actual-label">Actual Properties</span>
          <span className="actual-note">Like real lab reagents</span>
        </div>

        <div className="actual-row">
          <span className="actual-property">Concentration</span>
          <span className="actual-value highlight">0.0987 M</span>
          <span className="actual-deviation">-1.3%</span>
        </div>

        <div className="actual-row">
          <span className="actual-property">Room Temp</span>
          <span className="actual-value">21.3°C</span>
          <span className="actual-deviation subtle">ambient</span>
        </div>

        <div className="actual-row">
          <span className="actual-property">Purity</span>
          <span className="actual-value">99.2%</span>
          <span className="actual-deviation">-0.8%</span>
        </div>

        <div className="impurities-section">
          <span className="impurities-label">Trace Impurities</span>
          <div className="impurities-list">
            <span className="impurity">Fe³⁺ 0.3ppm</span>
            <span className="impurity">SO₄²⁻ 0.5ppm</span>
            <span className="impurity">Cl⁻ residue</span>
          </div>
        </div>
      </div>
    </div>

    <div className="solution-footer">
      <span className="footer-icon">⚡</span>
      <span className="footer-text">Each student's solution is unique — just like in a real lab</span>
    </div>
  </div>
);

// ============================================
// MAIN LANDING DEMO COMPONENT
// ============================================

const LandingDemo = ({ language = 'en' }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <main className="landing-demo">
      <Header language={language} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-video-container">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
          >
            <source
              src="https://res.cloudinary.com/dgrrhld5t/video/upload/q_auto/Whimsylabs_Short_1_ushm4f.webm"
              type="video/webm"
            />
            <source
              src="https://res.cloudinary.com/dgrrhld5t/video/upload/q_auto,f_auto/Whimsylabs_Short_1_ushm4f"
              type="video/mp4"
            />
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="hero-content container">
          <div className="hero-logo">
            <img
              src="/logo512.png"
              alt="WhimsyLabs"
              className="hero-logo-img"
            />
          </div>
          <h1 className="hero-title">
            WhimsyLabs: The <em>Practical</em> Solution for Science.
          </h1>
          <p className="hero-tagline">
            Stop clicking 'Next.' Start doing science.
          </p>
          <p className="hero-description">
            WhimsyLabs isn't just a simulator; it's a playground of particles.
            We combine a best-in-class Physicality-First engine with AI-driven
            assessment to deliver the only virtual lab that builds true muscle
            memory while saving teachers hours of marking time.
          </p>
          <p className="hero-subtext">
            You're the expert at teaching. We're just the tool that makes labs
            work — in class or as homework.
          </p>
          <div className="hero-platforms">
            <span className="platform-badge">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              VR Headsets
            </span>
            <span className="platform-badge">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
              </svg>
              Desktop (Chromebook/Mac/PC)
            </span>
          </div>
          <div className="hero-cta">
            <ContactUs language={language} />
          </div>
        </div>
      </section>

      {/* Muscle Memory Section */}
      <BubbleContainer>
        <section className="muscle-memory-section container">
          <div className="section-grid">
            <div className="section-content animate-on-scroll">
              <h2 className="section-title">
                Muscle Memory Forged In Simulations, Not Just Mouse Driven
                Animations.
              </h2>
              <p className="section-text">
                Unlike "slide-show" simulators, our engine replicates the chaos
                and weight of the real world, down to temperature perturbations,
                impurities and deviation between samples. Whether pouring
                titration fluids in VR or adjusting microscope focus on a
                Chromebook, students must use fine motor skills and procedural
                accuracy.
              </p>
              <p className="section-text highlight-text">
                If they drop a beaker, it breaks. If they overheat a compound,
                it reacts.
              </p>
              <p className="section-text">
                This "freedom to fail" builds resilience and genuine
                understanding of laboratory risks.
              </p>
            </div>
            <div className="section-visual animate-on-scroll">
              {/* Code-based UI mockup: Solution Variability */}
              <SolutionAnalysis />

              {/* Code-based UI mockup: Action Log */}
              <div
                className="mockup-container action-log-mockup"
                style={{ marginTop: "20px" }}
              >
                <div className="mockup-header">
                  <span className="mockup-title">Lab Session Log</span>
                  <span className="mockup-badge">Live</span>
                </div>
                <div className="mockup-content">
                  <ActionLogEntry
                    time="0:05"
                    category="Safety"
                    action="Put on safety goggles"
                    isHighlighted={false}
                  />
                  <ActionLogEntry
                    time="0:22"
                    category="Equipment"
                    action="Picked up 250mL conical flask"
                    isHighlighted={false}
                  />
                  <ActionLogEntry
                    time="1:08"
                    category="Transfer"
                    action="Pipetted 25.00mL HCl into flask"
                    isHighlighted={true}
                  />
                  <ActionLogEntry
                    time="1:35"
                    category="Reagent"
                    action="Added 3 drops phenolphthalein"
                    isHighlighted={false}
                  />
                  <ActionLogEntry
                    time="3:00"
                    category="Reaction"
                    action="Neutralization reaction detected"
                    isHighlighted={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Assessment Section */}
      <section className="assessment-section">
        <div className="container">
          <div className="section-grid reverse">
            <div className="section-visual animate-on-scroll">
              {/* Code-based UI mockup: Assessment Cards */}
              <div className="assessment-grid">
                <AssessmentCard
                  icon="🧪"
                  title="Experimental Procedure"
                  score={88}
                  color="purple"
                  items={[
                    "Good pipetting technique",
                    "Minor inconsistency in swirling",
                    "Consistent results achieved",
                  ]}
                />
                <AssessmentCard
                  icon="🛡️"
                  title="Lab Safety & Cleanup"
                  score={95}
                  color="red"
                  items={[
                    "All PPE worn correctly",
                    "Bench spillage cleaned promptly",
                  ]}
                />
                <AssessmentCard
                  icon="📊"
                  title="Data Collection & Analysis"
                  score={85}
                  color="blue"
                  items={[
                    "Burette readings recorded",
                    "Calculation method correct",
                    "Minor rounding errors",
                  ]}
                />
                <AssessmentCard
                  icon="📝"
                  title="Scientific Communication"
                  score={82}
                  color="green"
                  items={[
                    "Lab report adequate but lacks detail",
                    "Error analysis shows understanding",
                  ]}
                />
              </div>
            </div>
            <div className="section-content animate-on-scroll">
              <h2 className="section-title">Assessment Beyond Text.</h2>
              <p className="section-text">
                WhimsyLabs AI-proofs assessments by grading the process, not
                just the result. We track physical inputs within our virtual
                labs, like equipment handling and reaction times, which AI
                cannot simulate.
              </p>
              <p className="section-text">
                Every student's reagents have slightly different concentrations
                and impurities — so every student has a different correct
                answer. ChatGPT assumes perfect 0.1M reagents. Your HCl was
                0.0987M with trace iron. Its "correct" answer will get you
                marked wrong.
              </p>
              <p className="section-text callout-text">
                💡 This makes WhimsyLabs perfect for homework — students can't
                share answers or use AI to cheat.
              </p>
              {/* Code-based UI mockup: Question Preview */}
              <div className="question-mockup-wrapper">
                <QuestionPreview
                  questionNum={5}
                  total={10}
                  type="Numeric Answer"
                  context="You used phenolphthalein as your indicator. Note: Some students used methyl orange - their answer will be different!"
                  question="At what pH did your indicator change colour during YOUR experiment?"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Saving Section */}
      <BubbleContainer>
        <section className="time-saving-section container">
          <div className="time-saving-content animate-on-scroll">
            <div className="time-badge">
              <span className="time-number">3.5</span>
              <span className="time-unit">Hours</span>
              <span className="time-label">Saved Per Week</span>
            </div>
            <div className="time-text">
              <h2 className="section-title">
                Save 3.5 Hours of Grading Per Week.
              </h2>
              <p className="section-text">
                Stop ticking boxes and start teaching. WhimsyLabs assesses skill
                mastery and safety in real-time, providing automatic grading on
                students' capabilities for you to review.
              </p>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Curriculum Labs Section */}
      <section className="curriculum-section">
        <div className="container">
          <div className="section-grid">
            <div className="section-content animate-on-scroll">
              <h2 className="section-title">Labs Built for Your Curriculum</h2>
              <p className="section-text">
                Planning a course means matching labs to curriculum
                expectations. We've built labs specifically for what you need to
                teach — stoichiometry, titrations, electrolysis, and more.
              </p>
              <p className="section-text">
                Use them as-is, or customize the pre-lab and discussion
                questions to fit your lesson plan. Most teachers modify existing
                labs slightly — we make that easy.
              </p>
              <p className="section-text">
                Need something completely custom? Our AI Experiment Builder lets
                you paste any protocol and generate a full lab scenario in
                minutes.
              </p>
              {/* Code-based UI mockup: Protocol Parser */}
              <div className="mockup-container protocol-mockup">
                <div className="mockup-header">
                  <span className="mockup-title">Parse Lab Protocol</span>
                  <button className="parse-btn">✨ Parse with AI</button>
                </div>
                <div className="protocol-content">
                  <div className="protocol-input">
                    <p className="protocol-text">
                      Acid-Base Titration Practical
                    </p>
                    <p className="protocol-objective">
                      Objective: Determine the concentration of an unknown HCl
                      solution using standardized NaOH.
                    </p>
                  </div>
                  <div className="protocol-result">
                    <span className="result-badge success">
                      ✓ Protocol Parsed Successfully
                    </span>
                    <div className="parsed-items">
                      <div className="parsed-group">
                        <span className="group-label">Equipment (5)</span>
                        <span className="group-items">
                          Burette, Pipette, Conical Flask...
                        </span>
                      </div>
                      <div className="parsed-group">
                        <span className="group-label">Reagents (3)</span>
                        <span className="group-items">
                          HCl (0.1M), NaOH (0.1M), Phenolphthalein
                        </span>
                      </div>
                      <div className="parsed-group">
                        <span className="group-label">Reactions (1)</span>
                        <span className="group-items">
                          Acid-Base Neutralization
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-visual animate-on-scroll">
              {/* Code-based UI mockup: Lab Library */}
              <div className="mockup-container lab-library-mockup">
                <div className="mockup-header">
                  <span className="mockup-title">Lab Library</span>
                  <span className="mockup-badge">Chemistry</span>
                </div>
                <div className="mockup-content">
                  <div className="lab-card">
                    <div className="lab-card-header">
                      <span className="lab-icon">🧪</span>
                      <div className="lab-info">
                        <span className="lab-name">Acid-Base Titration</span>
                        <span className="lab-tags">
                          Stoichiometry • Year 9-10
                        </span>
                      </div>
                      <span className="lab-status ready">Ready</span>
                    </div>
                    <div className="lab-card-actions">
                      <button className="lab-btn primary">Assign</button>
                      <button className="lab-btn secondary">Customize</button>
                    </div>
                  </div>
                  <div className="lab-card">
                    <div className="lab-card-header">
                      <span className="lab-icon">⚡</span>
                      <div className="lab-info">
                        <span className="lab-name">Electrolysis of Water</span>
                        <span className="lab-tags">Redox • Year 10-11</span>
                      </div>
                      <span className="lab-status ready">Ready</span>
                    </div>
                    <div className="lab-card-actions">
                      <button className="lab-btn primary">Assign</button>
                      <button className="lab-btn secondary">Customize</button>
                    </div>
                  </div>
                  <div className="lab-card">
                    <div className="lab-card-header">
                      <span className="lab-icon">🔥</span>
                      <div className="lab-info">
                        <span className="lab-name">Enthalpy of Combustion</span>
                        <span className="lab-tags">
                          Thermodynamics • Year 11-12
                        </span>
                      </div>
                      <span className="lab-status ready">Ready</span>
                    </div>
                    <div className="lab-card-actions">
                      <button className="lab-btn primary">Assign</button>
                      <button className="lab-btn secondary">Customize</button>
                    </div>
                  </div>
                  <div className="lab-card custom">
                    <div className="lab-card-header">
                      <span className="lab-icon">✨</span>
                      <div className="lab-info">
                        <span className="lab-name">Create Custom Lab</span>
                        <span className="lab-tags">
                          Use AI to build from your protocol
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Dashboard Section */}
      <section className="dashboard-section">
        <div className="container">
          <div className="section-grid">
            <div className="section-content animate-on-scroll">
              <h2 className="section-title">Data That Drives Intervention</h2>
              <p className="section-text">
                Our dashboard offers a real-time view of student performance,
                not just grades. Instantly identify struggling students for
                timely intervention before they fall behind.
              </p>
              <p className="section-text">
                Export reports easily or integrate directly with your LMS to
                track progress from individual students to entire regions.
              </p>
            </div>
            <div className="section-visual animate-on-scroll">
              {/* Code-based UI mockup: Teacher Dashboard */}
              <div className="mockup-container dashboard-mockup">
                <div className="mockup-header">
                  <span className="mockup-title">
                    Teacher Analytics Dashboard
                  </span>
                  <span className="mockup-badge">This Term</span>
                </div>
                <div className="mockup-content">
                  {/* Stats Row */}
                  <div className="stats-grid">
                    <StatCard
                      label="Total Students"
                      value="78"
                      icon={<span>👥</span>}
                      subtext="Across 3 classes"
                    />
                    <StatCard
                      label="Average Score"
                      value="77%"
                      icon={<span>🎯</span>}
                      trend={4}
                    />
                    <StatCard
                      label="Labs Completed"
                      value="247"
                      icon={<span>🧪</span>}
                      subtext="This term"
                    />
                    <StatCard
                      label="At-Risk Students"
                      value="3"
                      icon={<span>⚠️</span>}
                      highlight={true}
                      subtext="Need attention"
                    />
                  </div>

                  {/* Class Performance */}
                  <div className="classes-section">
                    <h4 className="section-subtitle">Class Performance</h4>
                    <ClassRow
                      name="Year 9 Chemistry A"
                      students={28}
                      avgScore={78}
                      trend={5}
                      atRisk={3}
                    />
                    <ClassRow
                      name="Year 9 Chemistry B"
                      students={26}
                      avgScore={72}
                      trend={-2}
                      atRisk={5}
                    />
                    <ClassRow
                      name="Year 10 Chemistry"
                      students={24}
                      avgScore={81}
                      trend={8}
                      atRisk={1}
                    />
                  </div>

                  {/* Skills Breakdown */}
                  <div className="skills-section">
                    <h4 className="section-subtitle">
                      Skills Assessment (All Classes)
                    </h4>
                    <SkillBar skill="Lab Safety" avgScore={88} benchmark={85} />
                    <SkillBar
                      skill="Measurement Accuracy"
                      avgScore={72}
                      benchmark={80}
                    />
                    <SkillBar
                      skill="Data Recording"
                      avgScore={81}
                      benchmark={75}
                    />
                    <SkillBar
                      skill="Practical Technique"
                      avgScore={69}
                      benchmark={75}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Features Grid */}
      <BubbleContainer>
        <section className="features-grid-section container">
          <div className="features-grid animate-on-scroll">
            <article className="feature-block">
              <div className="feature-icon">🔬</div>
              <h3>Freedom to Explore</h3>
              <p>
                Students aren't limited to following instructions. They can mix
                any reagent with any equipment to test their own hypotheses —
                and see real consequences. Curiosity-driven learning, safely
                contained in a virtual environment.
              </p>
            </article>
            <article className="feature-block">
              <div className="feature-icon">♿</div>
              <h3>Science for Everyone</h3>
              <p>
                Inclusive by default. We support full control remapping,
                text-to-speech, and self-paced modes for SEND learners. Plus,
                our low-bandwidth mode ensures smooth operation even on unstable
                school internet connections.
              </p>
            </article>
            <article className="feature-block">
              <div className="feature-icon">🏆</div>
              <h3>Rewarding Mastery</h3>
              <p>
                We use gamification to drive understanding, not screen time.
                Students earn free Lab Points for safety and accuracy to
                customize their virtual workspace. This builds intrinsic
                motivation to improve skills without using predatory engagement
                tactics.
              </p>
            </article>
          </div>
        </section>
      </BubbleContainer>

      {/* Pioneer Program CTA */}
      <section className="pioneer-section">
        <div className="container">
          <div className="pioneer-content animate-on-scroll">
            <h2 className="section-title">WhimsyLabs Pioneer Program</h2>
            <p className="pioneer-intro">
              Launching globally in September 2026, but schools and institutions
              can get early access starting this April (Summer Term).
            </p>
            <p className="pioneer-cta-text">
              Sign up now to become a WhimsyLabs Pioneer School and receive
              exclusive benefits:
            </p>
            <ul className="pioneer-benefits">
              <li>
                Get full access to the Beta AI Grading and Early Modules for the
                Summer Term.
              </li>
              <li>
                Secure the 2026/27 Academic Year license at our introductory
                BETT rate.
              </li>
              <li>
                Direct access to our dev team to request specific apparatus for
                the September launch.
              </li>
            </ul>
            <div className="pioneer-cta">
              <ContactUs language={language} />
            </div>
          </div>
        </div>
      </section>

      {/* Award Banner */}
      <section className="award-section">
        <div className="container">
          <div className="award-content">
            <h2>Join the Science Education Revolution</h2>
            <p className="award-badge">
              Winner of the BETT 2025 Kids Judge Award
            </p>
          </div>
        </div>
      </section>

      {/* Subjects Footer Banner */}
      <section className="subjects-banner">
        <div className="container">
          <p className="subjects-list">
            Biology • Chemistry • Physics • Electronics
          </p>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
};

export default LandingDemo;
