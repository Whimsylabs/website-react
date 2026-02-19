import React, { useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import BubbleContainer from './BubbleContainer';
import SplashSection from './SplashSection';
import ContactUs from './ContactUs';
import Testimonial from './Testimonial';
import Partners from './Partners';
import SpeakerButton from './SpeakerButton';
import { useTranslation } from '../i18n/translations';
import { getLocalizedPath } from '../i18n';
import './LandingDemo.css';

// Helper to get audio path for landing sections
const getLandingAudioPath = (sectionId, lang) => {
  const audioLang = lang === 'ja' ? 'jp' : lang;
  return `/audio/landing/${audioLang}/${sectionId}.mp3`;
};

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
const ClassRow = ({ name, students, avgScore, trend, atRisk, studentsLabel, atRiskLabel }) => (
  <div className="class-row">
    <div className="class-info">
      <span className="class-name">{name}</span>
      <span className="class-students">{students} {studentsLabel}</span>
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
        <span className="at-risk-badge">{atRisk} {atRiskLabel}</span>
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
const QuestionPreview = ({ questionNum, total, type, context, question, t }) => (
  <div className="question-preview">
    <div className="question-header">
      <span className="question-num">{t('home.demo.mockups.questionOf').replace('{num}', questionNum).replace('{total}', total)}</span>
      <span className={`question-type type-${type}`}>{type}</span>
    </div>
    {context && (
      <div className="question-context">
        <span className="context-icon">📊</span>
        <span className="context-label">{t('home.demo.mockups.yourLabData')}</span>
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
    {type === 'Calculation' && (
      <div className="question-input calculation">
        <textarea placeholder="Volume of NaOH = 24.80 - 0.50 = 24.30 mL..." className="calc-input" readOnly rows={3} />
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
const SolutionAnalysis = ({ t }) => (
  <div className="solution-analysis">
    <div className="solution-header">
      <span className="solution-icon">🧪</span>
      <span className="solution-title">{t('home.demo.mockups.solutionAnalysis')}</span>
      <span className="solution-badge live">{t('home.demo.mockups.simulated')}</span>
    </div>

    <div className="solution-main">
      <div className="solution-bottle">
        <div className="bottle-label">
          <span className="bottle-name">{t('home.demo.mockups.hydrochloricAcid')}</span>
          <span className="bottle-nominal">{t('home.demo.mockups.labelledConc')}</span>
        </div>
        <div className="bottle-visual">
          <div className="bottle-liquid"></div>
        </div>
      </div>

      <div className="solution-arrow">→</div>

      <div className="solution-actual">
        <div className="actual-header">
          <span className="actual-label">{t('home.demo.mockups.actualProperties')}</span>
          <span className="actual-note">{t('home.demo.mockups.likeRealReagents')}</span>
        </div>

        <div className="actual-row">
          <span className="actual-property">{t('home.demo.mockups.concentration')}</span>
          <span className="actual-value highlight">0.0987 M</span>
          <span className="actual-deviation">-1.3%</span>
        </div>

        <div className="actual-row">
          <span className="actual-property">{t('home.demo.mockups.roomTemp')}</span>
          <span className="actual-value">21.3°C</span>
          <span className="actual-deviation subtle">{t('home.demo.mockups.ambient')}</span>
        </div>

        <div className="actual-row">
          <span className="actual-property">{t('home.demo.mockups.purity')}</span>
          <span className="actual-value">99.2%</span>
          <span className="actual-deviation">-0.8%</span>
        </div>

        <div className="impurities-section">
          <span className="impurities-label">{t('home.demo.mockups.traceImpurities')}</span>
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
      <span className="footer-text">{t('home.demo.mockups.uniqueSolution')}</span>
    </div>
  </div>
);

// ============================================
// MAIN LANDING DEMO COMPONENT
// ============================================

const LandingDemo = ({ language = 'en' }) => {
  const { t } = useTranslation(language);
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
      {/* Floating decorations for wide screens - random selection */}
      <div className="floating-decorations">
        <img src="/images/microscope.webp" alt="Microscope illustration representing biology virtual labs" className="floating-deco left-1" aria-hidden="true" loading="lazy" />
        <img src="/images/molecule.webp" alt="Molecular structure illustration for chemistry simulations" className="floating-deco left-2" aria-hidden="true" loading="lazy" />
        <img src="/images/bubble beaker.webp" alt="Laboratory beaker with bubbling reaction" className="floating-deco right-1" aria-hidden="true" loading="lazy" />
      </div>
      
      <Header language={language} />

      <div id="main-content" className="page-content">
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
          <SpeakerButton
            audioSrc={getLandingAudioPath('hero', language)}
            label={t('common.listenToSection') || 'Listen'}
            size="small"
            className="whimsy-theme hero-speaker"
          />
          <div className="hero-logo">
            <img
              src="/logo.png"
              alt="WhimsyLabs"
              className="hero-logo-img"
              fetchpriority="high"
            />
          </div>
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('home.demo.heroTitle') }} />
          <p className="hero-tagline">
            {t('home.demo.heroTagline')}
          </p>
          <p className="hero-description">
            {t('home.demo.heroDescription')}
          </p>
          <p className="hero-subtext hero-dual-focus">
            <strong>{t('home.demo.heroDualFocus')}</strong>{' '}
            <span dangerouslySetInnerHTML={{ __html: t('home.demo.heroDualFocusText') }} />
          </p>
          <div className="hero-platforms-wrapper">
            <span className="hero-splash-sticker platforms-sticker">
              {t('home.demo.splashSticker') || 'No VR required!'}
            </span>
            <div className="hero-platforms">
              <span className="platform-badge vr-badge">
                <img src="/images/cat_vr.png" alt="WhimsyCat mascot wearing VR headset" className="platform-icon" />
                {t('home.demo.vrHeadsets')}
              </span>
              <span className="platform-plus">+</span>
              <span className="platform-badge desktop-badge">
                <img src="/images/cat_desktop.png" alt="WhimsyCat mascot at desktop computer" className="platform-icon desktop-icon" />
                {t('home.demo.desktop')}
              </span>
            </div>
          </div>
          <div className="hero-cta">
            <ContactUs language={language} buttonText={t('home.demo.joinPioneer')} />
          </div>
        </div>
      </section>

      {/* What is WhimsyLabs? - Definitional Section for GEO */}
      <section className="definition-section">
        <div className="container">
          <div className="definition-content animate-on-scroll">
            <div className="section-header-row">
              <h2 className="section-title">{t('home.demo.whatIsTitle')}</h2>
              <SpeakerButton
                audioSrc={getLandingAudioPath('what-is', language)}
                label={t('common.listenToSection') || 'Listen to section'}
                size="small"
                className="whimsy-theme section-speaker"
              />
            </div>
            <p className="section-text definition-text">
              {t('home.demo.whatIsText')}
            </p>
          </div>
        </div>
      </section>

      {/* Muscle Memory Section */}
      <BubbleContainer>
        <section className="muscle-memory-section container">
          <div className="section-grid">
            <div className="section-content animate-on-scroll">
              <div className="section-header-row">
                <h2 className="section-title">
                  {t('home.demo.muscleMemoryTitle')}
                </h2>
                <SpeakerButton
                  audioSrc={getLandingAudioPath('physics', language)}
                  label={t('common.listenToSection') || 'Listen'}
                  size="small"
                  className="whimsy-theme section-speaker"
                />
              </div>
              <p className="section-text">
                {t('home.demo.muscleMemoryText1')}<sup><a href="https://jneuroengrehab.biomedcentral.com/articles/10.1186/s12984-019-0587-8" target="_blank" rel="noopener noreferrer" className="citation-link" aria-label="Citation 1: Motor learning research study">[1]</a></sup>
              </p>
              <p className="section-text highlight-text">
                {t('home.demo.muscleMemoryHighlight')}
              </p>
              <p className="section-text">
                {t('home.demo.muscleMemoryText2')}
              </p>
            </div>
            <div className="section-visual animate-on-scroll">
              {/* Code-based UI mockup: Solution Variability */}
              <SolutionAnalysis t={t} />

              {/* Code-based UI mockup: Action Log */}
              <div
                className="mockup-container action-log-mockup"
                style={{ marginTop: "20px" }}
              >
                <div className="mockup-header">
                  <span className="mockup-title">{t('home.demo.mockups.labSessionLog')}</span>
                  <span className="mockup-badge">{t('home.demo.mockups.live')}</span>
                </div>
                <div className="mockup-content">
                  <ActionLogEntry
                    time="0:05"
                    category={t('home.demo.mockups.safety')}
                    action={t('home.demo.mockups.putOnGoggles')}
                    isHighlighted={false}
                  />
                  <ActionLogEntry
                    time="0:22"
                    category={t('home.demo.mockups.equipment')}
                    action={t('home.demo.mockups.pickedUpFlask')}
                    isHighlighted={false}
                  />
                  <ActionLogEntry
                    time="1:08"
                    category={t('home.demo.mockups.transfer')}
                    action={t('home.demo.mockups.pipettedHCl')}
                    isHighlighted={true}
                  />
                  <ActionLogEntry
                    time="1:35"
                    category={t('home.demo.mockups.reagent')}
                    action={t('home.demo.mockups.addedIndicator')}
                    isHighlighted={false}
                  />
                  <ActionLogEntry
                    time="3:00"
                    category={t('home.demo.mockups.reaction')}
                    action={t('home.demo.mockups.neutralization')}
                    isHighlighted={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </BubbleContainer>

      {/* Assessment Section - in SplashSection */}
      <SplashSection topColor="#95CEF6" bottomColor="#f8f9fc">
      <section className="assessment-section splash-inner">
        <div className="container">
          <div className="section-grid reverse">
            <div className="section-visual animate-on-scroll">
              {/* Code-based UI mockup: Assessment Cards */}
              <div className="assessment-grid">
                <AssessmentCard
                  icon="🧪"
                  title={t('home.demo.mockups.experimentalProcedure')}
                  score={88}
                  color="purple"
                  items={[
                    t('home.demo.mockups.goodPipetting'),
                    t('home.demo.mockups.minorSwirling'),
                    t('home.demo.mockups.consistentResults'),
                  ]}
                />
                <AssessmentCard
                  icon="🛡️"
                  title={t('home.demo.mockups.labSafety')}
                  score={95}
                  color="red"
                  items={[
                    t('home.demo.mockups.ppeWorn'),
                    t('home.demo.mockups.spillageCleaned'),
                  ]}
                />
                <AssessmentCard
                  icon="📊"
                  title={t('home.demo.mockups.dataCollection')}
                  score={85}
                  color="blue"
                  items={[
                    t('home.demo.mockups.buretteRecorded'),
                    t('home.demo.mockups.calculationCorrect'),
                    t('home.demo.mockups.roundingErrors'),
                  ]}
                />
                <AssessmentCard
                  icon="📝"
                  title={t('home.demo.mockups.scientificComm')}
                  score={82}
                  color="green"
                  items={[
                    t('home.demo.mockups.labReportAdequate'),
                    t('home.demo.mockups.errorAnalysis'),
                  ]}
                />
              </div>
            </div>
            <div className="section-content animate-on-scroll">
              <div className="section-header-row">
                <h2 className="section-title">{t('home.demo.assessmentTitle')}</h2>
                <SpeakerButton
                  audioSrc={getLandingAudioPath('assessment', language)}
                  label={t('common.listenToSection') || 'Listen'}
                  size="small"
                  className="whimsy-theme section-speaker"
                />
              </div>
              <p className="section-text">
                {t('home.demo.assessmentText1')}
              </p>
              <p className="section-text">
                {t('home.demo.assessmentText2')}
              </p>
              <p className="section-text callout-text">
                {t('home.demo.assessmentCallout')}
              </p>
              {/* Code-based UI mockup: Question Preview */}
              <div className="question-mockup-wrapper">
                <QuestionPreview
                  questionNum={5}
                  total={10}
                  type={t('home.demo.mockups.calculation')}
                  context={t('home.demo.mockups.titrationData')}
                  question={t('home.demo.mockups.calculateConc')}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Saving Section - also in SplashSection */}
        <section className="time-saving-section container splash-inner">
          <div className="time-saving-content animate-on-scroll">
            <div className="time-badge">
              <span className="time-number">3.5</span>
              <span className="time-unit">{t('home.demo.mockups.hours')}</span>
              <span className="time-label">{t('home.demo.mockups.savedPerWeek')}</span>
            </div>
            <div className="time-text">
              <div className="section-header-row">
                <h2 className="section-title">
                  {t('home.demo.timeSavingTitle')}<sup><a href="https://journals.sagepub.com/doi/10.3102/0034654314564881" target="_blank" rel="noopener noreferrer" className="citation-link" aria-label="Citation 2: Time-saving research study">[2]</a></sup>
                </h2>
                <SpeakerButton
                  audioSrc={getLandingAudioPath('time-saving', language)}
                  label={t('common.listenToSection') || 'Listen'}
                  size="small"
                  className="whimsy-theme section-speaker"
                />
              </div>
              <p className="section-text">
                {t('home.demo.timeSavingText')}
              </p>
            </div>
          </div>
        </section>
      </SplashSection>

      {/* Curriculum Labs Section */}
      <section className="curriculum-section">
        <div className="container">
          <div className="section-grid">
            <div className="section-content animate-on-scroll">
              <div className="section-header-row">
                <h2 className="section-title">{t('home.demo.curriculumTitle')}</h2>
                <SpeakerButton
                  audioSrc={getLandingAudioPath('curriculum', language)}
                  label={t('common.listenToSection') || 'Listen'}
                  size="small"
                  className="whimsy-theme section-speaker"
                />
              </div>
              <p className="section-text">
                {t('home.demo.curriculumText1')}
              </p>
              <p className="section-text">
                {t('home.demo.curriculumText2')}
              </p>
              <p className="section-text">
                {t('home.demo.curriculumText3')}
              </p>
              <p className="section-text">
                {t('home.demo.curriculumText4')}
              </p>
              {/* Code-based UI mockup: Protocol Parser */}
              <div className="mockup-container protocol-mockup">
                <div className="mockup-header">
                  <span className="mockup-title">{t('home.demo.mockups.parseLabProtocol')}</span>
                  <button className="parse-btn">{t('home.demo.mockups.parseWithAI')}</button>
                </div>
                <div className="protocol-content">
                  <div className="protocol-input">
                    <p className="protocol-text">
                      {t('home.demo.mockups.acidBaseTitration')}
                    </p>
                    <p className="protocol-objective">
                      {t('home.demo.mockups.objectiveDetermine')}
                    </p>
                  </div>
                  <div className="protocol-result">
                    <span className="result-badge success">
                      {t('home.demo.mockups.protocolParsed')}
                    </span>
                    <div className="parsed-items">
                      <div className="parsed-group">
                        <span className="group-label">{t('home.demo.mockups.equipment5')}</span>
                        <span className="group-items">
                          {t('home.demo.mockups.equipmentItems')}
                        </span>
                      </div>
                      <div className="parsed-group">
                        <span className="group-label">{t('home.demo.mockups.reagents3')}</span>
                        <span className="group-items">
                          {t('home.demo.mockups.reagentItems')}
                        </span>
                      </div>
                      <div className="parsed-group">
                        <span className="group-label">{t('home.demo.mockups.reactions1')}</span>
                        <span className="group-items">
                          {t('home.demo.mockups.reactionItem')}
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
                  <span className="mockup-title">{t('home.demo.mockups.labLibrary')}</span>
                  <span className="mockup-badge">{t('home.demo.mockups.chemistry')}</span>
                </div>
                <div className="library-tabs">
                  <button className="library-tab active">{t('home.demo.mockups.mySchool')}</button>
                  <button className="library-tab">{t('home.demo.mockups.community')}</button>
                  <button className="library-tab">{t('home.demo.mockups.whimsylabs')}</button>
                </div>
                <div className="mockup-content">
                  <div className="lab-card">
                    <div className="lab-card-header">
                      <span className="lab-icon">🧪</span>
                      <div className="lab-info">
                        <span className="lab-name">{t('home.demo.mockups.acidBaseTitrationLab')}</span>
                        <span className="lab-tags">
                          {t('home.demo.mockups.stoichiometryYear')}
                        </span>
                      </div>
                      <span className="lab-status ready">{t('home.demo.mockups.ready')}</span>
                    </div>
                    <div className="lab-card-actions">
                      <button className="lab-btn primary">{t('home.demo.mockups.assign')}</button>
                      <button className="lab-btn secondary">{t('home.demo.mockups.customize')}</button>
                    </div>
                  </div>
                  <div className="lab-card">
                    <div className="lab-card-header">
                      <span className="lab-icon">⚡</span>
                      <div className="lab-info">
                        <span className="lab-name">{t('home.demo.mockups.electrolysisWater')}</span>
                        <span className="lab-tags">{t('home.demo.mockups.redoxYear')}</span>
                      </div>
                      <span className="lab-status ready">{t('home.demo.mockups.ready')}</span>
                    </div>
                    <div className="lab-card-actions">
                      <button className="lab-btn primary">{t('home.demo.mockups.assign')}</button>
                      <button className="lab-btn secondary">{t('home.demo.mockups.customize')}</button>
                    </div>
                  </div>
                  <div className="lab-card">
                    <div className="lab-card-header">
                      <span className="lab-icon">🔥</span>
                      <div className="lab-info">
                        <span className="lab-name">{t('home.demo.mockups.enthalpyCombustion')}</span>
                        <span className="lab-tags">
                          {t('home.demo.mockups.thermoYear')}
                        </span>
                      </div>
                      <span className="lab-status ready">{t('home.demo.mockups.ready')}</span>
                    </div>
                    <div className="lab-card-actions">
                      <button className="lab-btn primary">{t('home.demo.mockups.assign')}</button>
                      <button className="lab-btn secondary">{t('home.demo.mockups.customize')}</button>
                    </div>
                  </div>
                  <div className="lab-card custom">
                    <div className="lab-card-header">
                      <span className="lab-icon">✨</span>
                      <div className="lab-info">
                        <span className="lab-name">{t('home.demo.mockups.createCustomLab')}</span>
                        <span className="lab-tags">
                          {t('home.demo.mockups.useAIBuild')}
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
              <div className="section-header-row">
                <h2 className="section-title">{t('home.demo.dashboardTitle')}</h2>
                <SpeakerButton
                  audioSrc={getLandingAudioPath('dashboard', language)}
                  label={t('common.listenToSection') || 'Listen'}
                  size="small"
                  className="whimsy-theme section-speaker"
                />
              </div>
              <p className="section-text">
                {t('home.demo.dashboardText1')}
              </p>
              <p className="section-text">
                {t('home.demo.dashboardText2')}
              </p>
            </div>
            <div className="section-visual animate-on-scroll">
              {/* Code-based UI mockup: Teacher Dashboard */}
              <div className="mockup-container dashboard-mockup">
                <div className="mockup-header">
                  <span className="mockup-title">
                    {t('home.demo.mockups.teacherDashboard')}
                  </span>
                  <span className="mockup-badge">{t('home.demo.mockups.thisTerm')}</span>
                </div>
                <div className="mockup-content">
                  {/* Stats Row */}
                  <div className="stats-grid">
                    <StatCard
                      label={t('home.demo.mockups.totalStudents')}
                      value="78"
                      icon={<span>👥</span>}
                      subtext={t('home.demo.mockups.across3Classes')}
                    />
                    <StatCard
                      label={t('home.demo.mockups.averageScore')}
                      value="77%"
                      icon={<span>🎯</span>}
                      trend={4}
                    />
                    <StatCard
                      label={t('home.demo.mockups.labsCompleted')}
                      value="247"
                      icon={<span>🧪</span>}
                      subtext={t('home.demo.mockups.thisTerm')}
                    />
                    <StatCard
                      label={t('home.demo.mockups.atRiskStudents')}
                      value="3"
                      icon={<span>⚠️</span>}
                      highlight={true}
                      subtext={t('home.demo.mockups.needAttention')}
                    />
                  </div>

                  {/* Class Performance */}
                  <div className="classes-section">
                    <h3 className="section-subtitle">{t('home.demo.mockups.classPerformance')}</h3>
                    <ClassRow
                      name={t('home.demo.mockups.year9ChemistryA')}
                      students={28}
                      avgScore={78}
                      trend={5}
                      atRisk={3}
                      studentsLabel={t('home.demo.mockups.students')}
                      atRiskLabel={t('home.demo.mockups.atRisk')}
                    />
                    <ClassRow
                      name={t('home.demo.mockups.year9ChemistryB')}
                      students={26}
                      avgScore={72}
                      trend={-2}
                      atRisk={5}
                      studentsLabel={t('home.demo.mockups.students')}
                      atRiskLabel={t('home.demo.mockups.atRisk')}
                    />
                    <ClassRow
                      name={t('home.demo.mockups.year10Chemistry')}
                      students={24}
                      avgScore={81}
                      trend={8}
                      atRisk={1}
                      studentsLabel={t('home.demo.mockups.students')}
                      atRiskLabel={t('home.demo.mockups.atRisk')}
                    />
                  </div>

                  {/* Skills Breakdown */}
                  <div className="skills-section">
                    <h3 className="section-subtitle">
                      {t('home.demo.mockups.skillsAssessment')}
                    </h3>
                    <SkillBar skill={t('home.demo.mockups.labSafety')} avgScore={88} benchmark={85} />
                    <SkillBar
                      skill={t('home.demo.mockups.measurementAccuracy')}
                      avgScore={72}
                      benchmark={80}
                    />
                    <SkillBar
                      skill={t('home.demo.mockups.dataRecording')}
                      avgScore={81}
                      benchmark={75}
                    />
                    <SkillBar
                      skill={t('home.demo.mockups.practicalTechnique')}
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

      {/* Three Features Grid - Gassy Section */}
      <section className="gassy-section">
        <div className="gassy-bubbles"></div>
        <div className="features-grid-section container">
          <div className="gassy-header">
            <h2 className="gassy-title">{t('home.demo.whyStudentsLove')}<sup><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11684589/" target="_blank" rel="noopener noreferrer" className="citation-link" aria-label="Citation 3: Student engagement research">[3]</a></sup></h2>
            <div className="bett-award-badges">
              <a href={getLocalizedPath("/blog/whimsylabs-education-revolution", language)} className="bett-award-badge">
                <span className="award-text">{t('home.demo.mockups.bettAward')}</span>
              </a>
              <a href="https://www.techlearning.com/learning/classroom-tools/best-of-bett-2026-the-floor-of-bett-uk-reveals-the-future-of-education-tech" target="_blank" rel="noopener noreferrer" className="bett-award-badge techlearning">
                <span className="award-text">{t('home.demo.mockups.techLearningAward')}</span>
              </a>
            </div>
          </div>
          <div className="features-grid animate-on-scroll">
            <article className="feature-block">
              <img src="/images/meowdy.png" alt="WhimsyCat mascot exploring with curiosity" className="feature-icon-img" loading="lazy" />
              <div className="feature-header-row">
                <h3>{t('home.demo.freedomToExplore')}</h3>
                <SpeakerButton
                  audioSrc={getLandingAudioPath('freedom', language)}
                  size="small"
                  className="whimsy-theme"
                />
              </div>
              <p>
                {t('home.demo.freedomToExploreText')}
              </p>
            </article>
            <article className="feature-block">
              <img src="/images/cat_beaker.png" alt="WhimsyCat mascot with science beaker representing inclusive education" className="feature-icon-img" loading="lazy" />
              <div className="feature-header-row">
                <h3>{t('home.demo.scienceForEveryone')}</h3>
                <SpeakerButton
                  audioSrc={getLandingAudioPath('send', language)}
                  size="small"
                  className="whimsy-theme"
                />
              </div>
              <p>
                {t('home.demo.scienceForEveryoneText')}
              </p>
            </article>
            <article className="feature-block">
              <img src="/images/cat_brain.png" alt="WhimsyCat mascot with brain icon representing mastery-based learning" className="feature-icon-img" loading="lazy" />
              <div className="feature-header-row">
                <h3>{t('home.demo.rewardingMastery')}</h3>
                <SpeakerButton
                  audioSrc={getLandingAudioPath('gamification', language)}
                  size="small"
                  className="whimsy-theme"
                />
              </div>
              <p>
                {t('home.demo.rewardingMasteryText')}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Pioneer Program CTA */}
      <section className="pioneer-section">
        <div className="container">
          <div className="pioneer-content animate-on-scroll">
            <div className="section-header-row">
              <h2 className="section-title">{t('home.demo.pioneerTitle')}</h2>
              <SpeakerButton
                audioSrc={getLandingAudioPath('pioneer', language)}
                label={t('common.listenToSection') || 'Listen'}
                size="small"
                className="whimsy-theme section-speaker"
              />
            </div>
            <p className="pioneer-intro">
              {t('home.demo.pioneerIntro')}
            </p>
            <p className="pioneer-cta-text">
              {t('home.demo.pioneerCtaText')}
            </p>
            <ul className="pioneer-benefits">
              <li>
                {t('home.demo.pioneerBenefit1')}
              </li>
              <li>
                {t('home.demo.pioneerBenefit2')}
              </li>
              <li>
                {t('home.demo.pioneerBenefit3')}
              </li>
            </ul>
            <div className="pioneer-cta">
              <ContactUs language={language} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <BubbleContainer>
        <Testimonial />
      </BubbleContainer>

      {/* Subjects Footer Banner */}
      <section className="subjects-banner">
        <div className="container">
          <p className="subjects-list">
            {t('home.demo.subjectsBanner')}
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <Partners />

      {/* References Section */}
      <section className="references-section">
        <div className="container">
          <h3 className="references-title">{t('home.demo.referencesTitle')}</h3>
          <ol className="references-list">
            <li id="ref-1">
              Levac, D.E., Huber, M.E., & Sternad, D. (2019). Learning and transfer of complex motor skills in virtual reality: a perspective review. <em>Journal of NeuroEngineering and Rehabilitation</em>, 16, 121. 
              <a href="https://jneuroengrehab.biomedcentral.com/articles/10.1186/s12984-019-0587-8" target="_blank" rel="noopener noreferrer">doi:10.1186/s12984-019-0587-8</a>
            </li>
            <li id="ref-2">
              Van der Kleij, F.M., Feskens, R.C.W., & Eggen, T.J.H.M. (2015). Effects of Feedback in a Computer-Based Learning Environment on Students' Learning Outcomes: A Meta-Analysis. <em>Review of Educational Research</em>, 85(4), 475-511.
              <a href="https://journals.sagepub.com/doi/10.3102/0034654314564881" target="_blank" rel="noopener noreferrer">doi:10.3102/0034654314564881</a>
            </li>
            <li id="ref-3">
              Shu, Y., et al. (2024). Effectiveness of virtual laboratory in engineering education: A meta-analysis. <em>PLoS ONE</em>, 19(12). Effect sizes: motivation (3.571), engagement (2.888).
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11684589/" target="_blank" rel="noopener noreferrer">doi:10.1371/journal.pone.0316269</a>
            </li>
          </ol>
        </div>
      </section>
      </div>

      <Footer language={language} />
    </main>
  );
};

export default LandingDemo;
