import React, { useEffect, useRef, useState } from "react";
import "./Features.css";
import Header from "./Header";
import Footer from "./Footer";
import withTranslation from "./withTranslation";
import { getLocalizedPath } from "../i18n";
import Glassware from "./labGlassware";
import Wave from "./labWave";
import initSubjectLab from "./subjectLab";
import initFeatureLab from "./featureLab";

/**
 * The features page, rebuilt on the subject-lab system so it speaks the same
 * language as /chemistry, /biology and /physics. Copy is sourced from the
 * WhimsyLabs 2026 flyer (docs/WhimsyFlyer_2026-compressed-1.pdf); the grading
 * panel numbers in the assessment mockup are the flyer's own screenshots.
 *
 * English-only on purpose, like the page it replaces, the showcase and flyer
 * copy render identically for every language until a translation pass is due.
 */

/* Liquid gradients for the hero shelf and bench, one per house hue */
const REAGENTS = [
  { id: "featA", from: "#c9a6ff", to: "#6d4ae0" },
  { id: "featB", from: "#7ee0ff", to: "#14b7ff" },
  { id: "featC", from: "#ff8fd0", to: "#e01b84" },
  { id: "featD", from: "#ffd77a", to: "#f59e0b" },
];

/* Small stroked glyphs for the showcase tabs, drawn to sit at 24px */
const GLYPHS = {
  cat: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M5,10 L5,4 L9,7.5 L15,7.5 L19,4 L19,10 C19,15 16,18 12,18 C8,18 5,15 5,10 Z" />
      <circle cx="9.5" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="14.5" cy="11.5" r="0.8" fill="currentColor" />
    </g>
  ),
  flask: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M10,3 L10,9 L5,17 C4.3,18.2 5.1,19.5 6.4,19.5 L17.6,19.5 C18.9,19.5 19.7,18.2 19,17 L14,9 L14,3" />
      <line x1="8" y1="3" x2="16" y2="3" strokeLinecap="round" />
    </g>
  ),
  atom: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9">
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </g>
  ),
  hand: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7,11 L7,5.5 M11,10 L11,4 M15,10 L15,5.5" />
      <path d="M7,11 L7,14 C7,17.5 9,19.5 12,19.5 C15,19.5 17,17.5 17,14 L17,8.5 C17,7.4 15.5,7.4 15.5,8.5" />
      <path d="M7,11 C7,9.9 5.5,9.9 5.5,11 L5.5,13" />
    </g>
  ),
  clipboard: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5.5" y="4.5" width="13" height="15.5" rx="2" />
      <path d="M9.5,4.5 C9.5,3 14.5,3 14.5,4.5" />
      <path d="M9,13 L11,15 L15.5,10" />
    </g>
  ),
  devices: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5.5" width="13" height="9.5" rx="1.5" />
      <line x1="8" y1="18.5" x2="12" y2="18.5" />
      <line x1="10" y1="15" x2="10" y2="18.5" />
      <rect x="15.5" y="10.5" width="5.5" height="9" rx="1.5" fill="var(--lab-paper)" />
    </g>
  ),
};

/* The six-feature showcase. `videoId` only where a real product video exists,
   everything else shows an in-app capture instead of a placeholder embed. */
const SHOWCASE = [
  {
    id: "ai-tutoring",
    title: "AI Tutoring",
    glyph: "cat",
    only: true,
    hue: "#0e8fc7",
    soft: "rgba(20, 183, 255, 0.14)",
    videoId: "9D2e2e2gzvk",
    badge: "Video demo",
    description:
      "WhimsyCat watches how students work, technique, safety, and procedure, and offers guidance based on their actions. There is no student chat window: pupils never type prompts and never receive generated text.",
    blogLink: "/blog/whimsycat-ai-tutor-transforming-science-education/",
  },
  {
    id: "sandbox-freedom",
    title: "Sandbox Freedom",
    glyph: "flask",
    hue: "#6d4ae0",
    soft: "rgba(109, 74, 224, 0.13)",
    shot: "/images/Sandbox.jpg",
    badge: "In-app capture",
    description:
      "Complete experimental freedom: mix any reagent with any equipment and follow your own procedural pathways. Students design their own experiments and learn from authentic mistakes.",
    blogLink: "/blog/sandbox-learning-revolution-stem-education/",
  },
  {
    id: "physics-engine",
    title: "Physicality Engine",
    glyph: "atom",
    only: true,
    hue: "#c2107a",
    soft: "rgba(224, 27, 132, 0.12)",
    shot: "/images/finalLab.png",
    badge: "In-app capture",
    description:
      "A proprietary physicality-first engine simulates fluids, heat, and molecular behaviour in real time, down to temperature perturbations, impurities, and deviation between samples.",
    blogLink: "/blog/why-traditional-virtual-labs-fail-physics-engine/",
  },
  {
    id: "hand-representation",
    title: "Hand Representation",
    glyph: "hand",
    hue: "#b45309",
    soft: "rgba(245, 158, 11, 0.16)",
    shot: "/images/handGrabbingSmall.png",
    badge: "In-app capture",
    description:
      "True hand representation across all devices. Develop genuine muscle memory through precise interactions, pouring, swirling, focusing, that transfer directly to physical laboratories.",
    blogLink: "/blog/virtual-reality-prepares-students-real-world-stem-careers/",
  },
  {
    id: "assessment-system",
    title: "Assessment System",
    glyph: "clipboard",
    only: true,
    hue: "#047857",
    soft: "rgba(14, 159, 110, 0.14)",
    shot: "/images/grading dashboard.jpg",
    badge: "In-app capture",
    description:
      "Process-based assessment that grades how students work, not just what they write. Follow-up questions are tied to each student's own experimental data, so generic AI answers don't help.",
    blogLink: "/blog/ai-text-grading-fails-process-assessment-works/",
  },
  {
    id: "cross-platform",
    title: "Cross-Platform",
    glyph: "devices",
    hue: "#2563eb",
    soft: "rgba(37, 99, 235, 0.12)",
    shot: "/images/Challenges.jpg",
    badge: "In-app capture",
    description:
      "Runs on VR headsets, desktops, Chromebooks, with a low-bandwidth mode that keeps lessons running on unstable school internet connections.",
    blogLink: "/blog/vr-headsets-vs-chromebooks-cost-per-student/",
  },
];

/* The flyer's own grading panel, verbatim */
const GRADING = [
  ["Experimental Procedure", 88],
  ["Lab Safety & Cleanup", 95],
  ["Data Collection & Analysis", 85],
  ["Scientific Communication", 82],
];

const STATS = [
  { n: "3.5", l: "hours of marking saved weekly" },
  { n: "∞", l: "experiments, no consumables" },
  { n: "4", l: "sciences in one simulation" },
  { n: "24/7", l: "on any school device" },
];

const PIONEER = [
  { name: "Summer Term beta", note: "Full access to Beta AI Grading and Early Modules", hz: "#7ee0ff", soft: "rgba(126, 224, 255, 0.12)" },
  { name: "BETT-rate licence", note: "The 2026/27 Academic Year licence at our introductory rate", hz: "#ff8fd0", soft: "rgba(255, 143, 208, 0.12)" },
  { name: "Direct dev access", note: "Request specific apparatus for the September launch", hz: "#ffd77a", soft: "rgba(255, 215, 122, 0.12)" },
];

const AWARDS = [
  {
    img: "/images/kids_judge_bett.png",
    mono: null,
    title: "BETT 2025 Kids Judge Award, Winner",
    note: "“Best Science Lab (Start Up)”, judged by the people who matter most: the kids.",
  },
  {
    img: null,
    mono: "#1",
    title: "TechLearning's #1 Best of BETT 2026",
    note: "The top pick from TechLearning's coverage of the BETT 2026 show floor.",
    href: "/blog/whimsylabs-wins-techlearning-best-of-bett-2026/",
  },
  {
    img: null,
    mono: "CC",
    title: "Converge Challenge Finalist",
    note: "Among Scotland's most innovative educational technology ventures.",
  },
];

const FeaturesPage = ({ language }) => {
  const pageRef = useRef(null);

  // The page's own reduced-motion switch, the same control students get in
  // the lab. Toggling re-initialises every interactive module in calm mode.
  // It only ever ADDS calm: an OS-level reduced-motion preference is always
  // honoured regardless of the checkbox.
  const [calm, setCalm] = useState(false);
  const [osReduced, setOsReduced] = useState(false);

  useEffect(() => {
    setOsReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Progressive enhancement only, the page is complete without this running.
  useEffect(() => {
    const offLab = initSubjectLab(pageRef.current, { forceReduced: calm });
    const offFeat = initFeatureLab(pageRef.current, { forceReduced: calm });
    return () => {
      offLab();
      offFeat();
    };
  }, [calm]);

  const BENCH = ["erlenmeyer", "beaker", "roundFlask", "wideBeaker", "testTube"];
  const GRADS = ["featA", "featB", "featC", "featD"];

  return (
    <main className={`lab-page lab-page--features${calm ? " lab-calm" : ""}`} ref={pageRef}>
      <Header language={language} />

      {/* Liquid gradients live once, here, so any vessel on the page can
          reference them without depending on another svg existing. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          {REAGENTS.map((r) => (
            <linearGradient id={r.id} key={r.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={r.from} stopOpacity="0.95" />
              <stop offset="100%" stopColor={r.to} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {/* ================= Hero ================= */}
      <section className="lab-hero lab-hero--liquid lab-band--tex">
        <div className="container">
          <div className="lab-hero-grid">
            <div>
              {/* Keeps the exact "Virtual Lab" phrase validate-page-content
                  expects, as the old hero title did. */}
              <span className="lab-eyebrow">WhimsyLabs Virtual Lab · The Full Tour</span>
              <h1 className="lab-hero-title">AI Science Tutor &amp; Virtual Lab Features</h1>
              <p className="lab-hero-sub">
                Stop clicking, start doing. WhimsyLabs isn&rsquo;t just a simulator
               , it&rsquo;s a playground of particles: the only virtual lab that
                builds true muscle memory while saving teachers hours of marking
                time.
              </p>
              {/* The elevator pitch, scannable in five seconds */}
              <ul className="feat-ticks">
                <li>Real physics, not animations</li>
                <li>Grades the doing, not the typing</li>
                <li>No student chat window, by design</li>
              </ul>
              <div className="lab-hero-cta">
                <a href={getLocalizedPath("/contact/", language)} className="lab-btn">
                  Become a Pioneer School
                </a>
                <a href={getLocalizedPath("/bett/", language)} className="lab-btn-ghost">
                  Book a demo at BETT 2026
                </a>
              </div>
              <p className="feat-hero-hint" aria-hidden="true">
                Fair warning: this page contains a droppable beaker, and WhimsyCat is grading you.
              </p>
            </div>

            {/* A shelf of glassware holding live liquid, stir it */}
            <div className="lab-rack feat-shelf" aria-hidden="true">
              <div className="feat-shelf-row">
                <Glassware name="erlenmeyer" id="hero-erlenmeyer" variant="outline" gradient="featA" />
                <Glassware name="testTube" id="hero-testTube" variant="outline" gradient="featB" />
                <Glassware name="roundFlask" id="hero-roundFlask" variant="outline" gradient="featC" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You descend out of the hero and into the liquid */}
      <div className="lab-liquid" data-lab-liquid-surface aria-hidden="true">
        <canvas></canvas>
      </div>

      <div className="lab-body" data-lab-body>
        {/* ---- Showcase: six features, one hue each ---- */}
        <section className="lab-band lab-band--light lab-band--pad lab-submerged" data-lab-band="light" data-lab-section>
          <div className="lab-bubbles-field" data-lab-bubble-field aria-hidden="true">
            <canvas></canvas>
          </div>
          <div className="container">
            <div className="animate-on-scroll lab-head-center">
              <span className="lab-eyebrow">The features</span>
              <h2 className="section-title">Pick a Feature, See It for Real</h2>
              <p className="section-text">
                Six things WhimsyLabs does that a slide-show simulator cannot.
                Every capture below is the actual product, not a mock-up.
              </p>
            </div>

            <div data-lab-tabs>
              <div className="lab-tablist" role="tablist" aria-label="WhimsyLabs features">
                {SHOWCASE.map((f, i) => (
                  <button
                    key={f.id}
                    className="lab-tab"
                    role="tab"
                    type="button"
                    id={`lab-tab-${f.id}`}
                    aria-controls={`lab-panel-${f.id}`}
                    aria-selected={i === 0 ? "true" : "false"}
                    style={{ "--tab-hue": f.hue, "--tab-soft": f.soft }}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="feat-glyph">
                      {GLYPHS[f.glyph]}
                    </svg>
                    {f.title}
                    {f.only && <span className="feat-tab-only">Only WhimsyLabs</span>}
                  </button>
                ))}
              </div>

              {SHOWCASE.map((f, i) => (
                <div
                  key={f.id}
                  className="lab-panel"
                  role="tabpanel"
                  id={`lab-panel-${f.id}`}
                  aria-labelledby={`lab-tab-${f.id}`}
                  hidden={i !== 0}
                  style={{ "--tab-hue": f.hue, "--tab-soft": f.soft }}
                >
                  <div className="mockup-container">
                    <div className="mockup-header">
                      <span className="mockup-title">{f.title}</span>
                      <span className="mockup-badge">{f.badge}</span>
                    </div>
                    <div className="mockup-content">
                      <div className="lab-panel-grid">
                        <div>
                          <p className="section-text">{f.description}</p>
                          <a className="lab-link" href={getLocalizedPath(f.blogLink, language)}>
                            Learn more about {f.title.toLowerCase()}
                          </a>
                        </div>
                        {f.videoId ? (
                          <div className="feat-embed">
                            <iframe
                              src={`https://www.youtube.com/embed/${f.videoId}`}
                              title={`${f.title}, WhimsyLabs demo`}
                              loading="lazy"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <figure className="lab-shot">
                            <img src={f.shot} alt={`${f.title} in the WhimsyLabs virtual lab`} loading="lazy" />
                            <figcaption>In-app capture</figcaption>
                          </figure>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Physicality ---- */}
        <section className="lab-band lab-band--tint" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll" style={{ paddingTop: "72px" }}>
              {/* Each claim lights up in the house magenta the first time the
                  visitor proves it in the drop zone below */}
              <p className="lab-pull">
                <span data-pull-break>If they drop a beaker, it breaks.</span>{" "}
                <span data-pull-heat>If they overheat a compound, it reacts.</span>
              </p>
            </div>
            <div className="section-grid">
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">Physicality first</span>
                <h2 className="section-title">Muscle Memory Forged in Simulations, Not Mouse-Driven Animations</h2>
                <p className="section-text">
                  Unlike &ldquo;slide-show&rdquo; simulators, our engine replicates the
                  chaos and weight of the real world, down to temperature
                  perturbations, impurities, and deviation between samples.
                  Whether pouring titration fluids in VR or adjusting microscope
                  focus on a Chromebook, students must use fine motor skills and
                  procedural accuracy.
                </p>
                <p className="section-text">
                  This freedom to fail builds resilience and a genuine
                  understanding of laboratory risks, read more about{" "}
                  <a href={getLocalizedPath("/blog/physicality-in-virtual-labs/", language)}>
                    why physicality matters in virtual labs
                  </a>.
                </p>
              </div>
              {/* The claim, made falsifiable: an actual droppable beaker.
                  Static glass ships in the HTML; JS makes it grabbable. */}
              <div className="section-visual animate-on-scroll">
                <div className="feat-drop" data-feat-drop aria-hidden="true">
                  <canvas></canvas>
                  <svg className="feat-drop-fallback" viewBox="0 0 140 150" focusable="false">
                    <path d="M42,74 L98,74 L98,110 Q98,124 84,124 L56,124 Q42,124 42,110 Z" fill="url(#featB)" opacity="0.85" />
                    <path d="M40,18 L40,110 Q40,126 56,126 L84,126 Q100,126 100,110 L100,18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
                    <line x1="33" y1="18" x2="107" y2="18" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                    <line x1="12" y1="134" x2="128" y2="134" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  <p className="feat-drop-hint">Go on, drop it.</p>
                  <div className="lab-readout" data-drop-readout>0 beakers broken · £0.00 in damages</div>
                </div>
              </div>
            </div>

            {/* The engine test, head to head */}
            <div className="animate-on-scroll feat-versus">
              <div className="mockup-container">
                <div className="mockup-header">
                  <span className="mockup-title">Slide-show simulator vs WhimsyLabs</span>
                </div>
                <div className="mockup-content">
                  <div className="lab-table-wrap">
                    <table className="lab-table">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col" className="lab-col-win">WhimsyLabs</th>
                          <th scope="col">Slide-show sims</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">What runs the experiment</th>
                          <td className="lab-col-win">A real-time physics engine</td>
                          <td className="lab-col-alt">A pre-drawn animation</td>
                        </tr>
                        <tr>
                          <th scope="row">When you make a mistake</th>
                          <td className="lab-col-win">The beaker breaks</td>
                          <td className="lab-col-alt">The button is disabled</td>
                        </tr>
                        <tr>
                          <th scope="row">The data you collect</th>
                          <td className="lab-col-win">Yours, scatter and all</td>
                          <td className="lab-col-alt">Identical every run</td>
                        </tr>
                        <tr>
                          <th scope="row">What gets assessed</th>
                          <td className="lab-col-win">Technique, process, safety</td>
                          <td className="lab-col-alt">The final multiple choice</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <p className="feat-versus-note">
                Even the sceptics land here, see{" "}
                <a href={getLocalizedPath("/blog/edtech-critics-right-passive-learning-vs-active-labs/", language)}>
                  why the edtech critics are half right about passive learning
                </a>.
              </p>
            </div>
          </div>
        </section>

        {/* ---- Bench divider: apparatus holding real liquid ---- */}
        <div className="container">
          <div className="lab-bench" aria-hidden="true">
            <div className="lab-bench-row">
              {BENCH.map((name, i) => (
                <Glassware key={name} name={name} id={`bench-${name}`} variant="outline" gradient={GRADS[i % GRADS.length]} />
              ))}
            </div>
          </div>
        </div>

        {/* ---- Assessment: the differentiator, on the page's one dark band ---- */}
        <section className="lab-band lab-band--dark lab-band--tex lab-submerged" data-lab-band="dark" data-lab-section>
          <Wave />
          <Wave flip />
          <div className="lab-bubbles-field" data-lab-bubble-field aria-hidden="true">
            <canvas></canvas>
          </div>
          <div className="container">
            <div className="section-grid reverse">
              <div className="section-visual animate-on-scroll">
                <div className="mockup-container">
                  <div className="mockup-header">
                    <span className="mockup-title">Titration · AI grading breakdown</span>
                    <span className="mockup-badge">From actions, not answers</span>
                  </div>
                  <div className="mockup-content">
                    <div className="skills-section">
                      {GRADING.map(([name, score]) => (
                        <div className="skill-row" key={name}>
                          <span className="skill-name">{name}</span>
                          <div className="skill-bar-container">
                            <div className="skill-bar-bg">
                              <div className="skill-bar-fill" style={{ width: `${score}%` }}></div>
                            </div>
                          </div>
                          <span className="skill-score">{score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">Assessment beyond text</span>
                <h2 className="section-title">How Does WhimsyLabs Make Assessment AI-Proof?</h2>
                <p className="section-text">
                  WhimsyLabs grades the process, not just the result. We track
                  physical inputs inside the lab, equipment handling, technique,
                  and reaction times, which generative AI cannot simulate.
                  Follow-up questions are tied to each student&rsquo;s unique
                  experimental data (&ldquo;At what pH did <em>your</em> indicator
                  change colour?&rdquo;), so generic AI answers are no help.
                </p>
                <p className="section-text">
                  WhimsyCat has no student chat window, it infers everything
                  from actions in the lab, which is how WhimsyLabs meets{" "}
                  <a href={getLocalizedPath("/blog/dfe-ai-safety-standards-tutor-checklist/", language)}>
                    the DfE&rsquo;s AI safety expectations by design
                  </a>. For the full story, see{" "}
                  <a href={getLocalizedPath("/ai-assessment/", language)}>
                    how our AI-proof assessment works
                  </a>.
                </p>
              </div>
            </div>

            {/* The concept, demonstrated on the reader: WhimsyCat grades this
                visit from actions alone. Ships with resting scores; JS updates
                them as the visitor stirs, explores, reads, and drops things. */}
            <div className="feat-watch animate-on-scroll">
              <div className="mockup-container" data-feat-watch>
                <div className="mockup-header">
                  <span className="mockup-title">WhimsyCat · grading this visit</span>
                  <span className="mockup-badge">Live, from your actions</span>
                </div>
                <div className="mockup-content">
                  <div className="feat-watch-grid">
                    {/* The assessor, on duty, featureLab tilts it toward the
                        cursor and lets it react to what it observes */}
                    <div className="feat-watch-cat" data-watch-cat>
                      <img src="/images/Cat_only2.svg" alt="" loading="lazy" />
                      <span className="feat-watch-duty">on duty</span>
                    </div>
                    <div className="skills-section">
                      {[
                        ["curiosity", "Curiosity", 0],
                        ["stirring", "Stirring technique", 0],
                        ["risk", "Risk assessment", 100],
                        ["thoroughness", "Thoroughness", 0],
                      ].map(([key, label, start]) => (
                        <div className="skill-row" data-watch-skill={key} key={key}>
                          <span className="skill-name">{label}</span>
                          <div className="skill-bar-container">
                            <div className="skill-bar-bg">
                              <div className="skill-bar-fill" style={{ width: `${start}%` }}></div>
                            </div>
                          </div>
                          <span className="skill-score">{start}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="feat-watch-log" data-watch-log>Awaiting your first action…</p>
                </div>
              </div>
              <p className="feat-watch-note">
                No chat window, no typing, scored from actions alone, exactly
                like the real thing. In the real lab, WhimsyCat even{" "}
                <a href={getLocalizedPath("/blog/emotional-intelligence-ai-tutors-whimsycat-frustration-detection/", language)}>
                  notices frustration
                </a>. Nothing here is recorded or sent anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* ---- Teachers: the numbers, then the dashboard ---- */}
        <section className="lab-band lab-band--tint" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll" style={{ paddingTop: "72px" }}>
              <div className="lab-statband">
                {STATS.map((s) => (
                  <div key={s.l}>
                    <span className="lab-stat-n">{s.n}</span>
                    <span className="lab-stat-l">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="section-grid">
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">For teachers</span>
                <h2 className="section-title">Data That Drives Intervention</h2>
                <p className="section-text">
                  Stop ticking boxes and start teaching. WhimsyLabs assesses
                  skill mastery and safety in real time, providing automatic
                  grading of students&rsquo; practical capabilities for you to
                  review, with a quick or detailed breakdown per student.
                </p>
                <p className="section-text">
                  The teacher dashboard is a real-time view of performance, not
                  just grades: instantly identify struggling students for timely
                  intervention, then export reports or integrate with your LMS to
                  track progress from individual students to entire regions. See
                  how the numbers stack up in{" "}
                  <a href={getLocalizedPath("/blog/ai-assessment-crisis-solution/", language)}>
                    the assessment crisis, and what solves it
                  </a>.
                </p>
                <p className="section-text">
                  And because the tutor never clocks off, students can practise
                  around the clock,{" "}
                  <a href={getLocalizedPath("/blog/24-7-ai-tutoring-personalized-daily-recommendations/", language)}>
                    24/7 AI tutoring with personalised daily recommendations
                  </a>.
                </p>
                {/* Verbatim from the testimonial carousel, a real teacher on
                    exactly this feature */}
                <blockquote className="feat-quote">
                  <p>
                    &ldquo;The automated grading on a curve with a wide range of
                    student outcomes is incredible. It saves me so much time and
                    targets our learning objectives perfectly.&rdquo;
                  </p>
                  <cite>Secondary school teacher · live demo</cite>
                </blockquote>
              </div>
              <div className="section-visual animate-on-scroll">
                <figure className="lab-figure">
                  <img
                    src="/images/teachdash.jpg"
                    alt="WhimsyLabs teacher dashboard showing class overview, grading queue, and quick actions"
                    loading="lazy"
                  />
                  <figcaption aria-hidden="true">
                    The class at a glance, who is on track, who needs you now.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Three-up: rules, inclusion, motivation ---- */}
        <section className="lab-band lab-band--light lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll lab-head-center">
              <span className="lab-eyebrow">Built in, not bolted on</span>
              <h2 className="section-title">Your Lab, Every Student, Real Motivation</h2>
            </div>
            <div className="feat-cards animate-on-scroll">
              <div className="feat-card" style={{ "--card-hue": "#6d4ae0" }}>
                <img src="/images/custom.jpg" alt="The AI Experiment Builder listing equipment and reagents for a titration practical" loading="lazy" />
                <h3>Your Lab, Your Rules</h3>
                <p>
                  Don&rsquo;t be limited by pre-set scenarios. Students mix any
                  reagent with any equipment to test their own hypotheses, and
                  the AI Experiment Builder lets teachers generate bespoke lab
                  scenarios in minutes to fit any lesson plan.
                </p>
                <a className="lab-link" href={getLocalizedPath("/blog/teachers-are-experts-custom-experiment-designer/", language)}>
                  Teachers are the experts
                </a>
              </div>
              <div className="feat-card" style={{ "--card-hue": "#0e8fc7" }}>
                <img src="/images/Ethanolsafety.jpg" alt="A fully simulated hazard label for pure ethyl alcohol inside the virtual lab" loading="lazy" />
                <h3>Science for Everyone</h3>
                <p>
                  Inclusive by default: full control remapping, text-to-speech,
                  and self-paced modes support SEND learners, while low-bandwidth
                  mode keeps lessons running smoothly on unstable school internet
                  connections.
                </p>
                <a className="lab-link" href={getLocalizedPath("/blog/virtual-kidney-dissection-send-engagement/", language)}>
                  The SEND engagement story
                </a>
                {/* Not a mock-up: this switch genuinely calms the whole page,
                    the way the same setting calms the lab for students */}
                <label className="feat-calm-toggle">
                  <input
                    type="checkbox"
                    checked={calm || osReduced}
                    disabled={osReduced}
                    onChange={(e) => setCalm(e.target.checked)}
                  />
                  <span>Try it now: reduce motion on this page</span>
                </label>
                <p className="feat-calm-note">
                  {osReduced
                    ? "Your system already asks for reduced motion, so this page is honouring it."
                    : "Not a mock-up. Tick it, then scroll back up: the beaker, the liquid, the bubbles and WhimsyCat all settle down, and everything still works."}
                </p>
              </div>
              <div className="feat-card" style={{ "--card-hue": "#c2107a" }}>
                <img src="/images/basicskins.jpg" alt="Two collectable WhimsyCat skins earned with Lab Points" loading="lazy" />
                <h3>Rewarding Mastery</h3>
                <p>
                  Gamification that drives understanding, not screen time.
                  Students earn free Lab Points for safety and accuracy to
                  customise their virtual workspace, intrinsic motivation
                  without predatory engagement tactics.
                </p>
                <a className="lab-link" href={getLocalizedPath("/blog/gamification-science-education-points-rewards-engagement/", language)}>
                  How the points work
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---- One lab, four sciences, and the doors to each ---- */}
        <section className="lab-band lab-band--tint lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll">
              <span className="lab-eyebrow">One simulation</span>
              <h2 className="section-title">One Fully-Simulated STEM Lab</h2>
              <p className="section-text">
                Biology, chemistry, physics and electronics live in the same
                simulation, with real interactions between them, heat a
                solution, wire a sensor, culture a sample, all on one bench.
                Explore each subject&rsquo;s lab in depth:
              </p>
              <div className="lab-cross">
                <a className="lab-cross-item" href={getLocalizedPath("/chemistry/", language)}>
                  <svg viewBox="0 -0.5 54 170" aria-hidden="true" focusable="false">
                    <rect x="11" y="6" width="32" height="141" fill="currentColor" />
                    <circle cx="27" cy="147" r="16" fill="currentColor" />
                  </svg>
                  Virtual Chemistry Lab
                </a>
                <a className="lab-cross-item" href={getLocalizedPath("/biology/", language)}>
                  <svg viewBox="0 0 54 170" aria-hidden="true" focusable="false">
                    <path d="M14,4 C40,40 14,80 40,120 C50,138 44,158 34,166" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                  </svg>
                  Virtual Biology Lab
                </a>
                <a className="lab-cross-item" href={getLocalizedPath("/physics/", language)}>
                  <svg viewBox="0 0 54 170" aria-hidden="true" focusable="false">
                    <line x1="27" y1="0" x2="27" y2="96" stroke="currentColor" strokeWidth="7" />
                    <circle cx="27" cy="128" r="34" fill="currentColor" />
                  </svg>
                  Virtual Physics Lab
                </a>
                <span className="lab-cross-item feat-cross-soon">
                  <svg viewBox="0 0 54 170" aria-hidden="true" focusable="false">
                    <path d="M27,0 L27,55 M27,115 L27,170 M13,55 L41,55 L41,115 L13,115 Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
                  </svg>
                  Electronics, in the same lab
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Awards ---- */}
        <section className="lab-band lab-band--light lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll lab-head-center">
              <span className="lab-eyebrow">Recognition</span>
              <h2 className="section-title">Awards &amp; Recognition</h2>
            </div>
            <div className="feat-awards animate-on-scroll">
              {AWARDS.map((a) => (
                <div className="feat-award" key={a.title}>
                  {a.img ? (
                    <img src={a.img} alt="" loading="lazy" />
                  ) : (
                    <span className="feat-award-mono" aria-hidden="true">{a.mono}</span>
                  )}
                  <h3>
                    {a.href ? (
                      <a className="feat-award-link" href={getLocalizedPath(a.href, language)}>{a.title}</a>
                    ) : (
                      a.title
                    )}
                  </h3>
                  <p>{a.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- Read next ---- */}
        <section className="lab-band lab-band--tint lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll">
              <span className="lab-eyebrow">Read next</span>
              <h2 className="section-title">Choosing a Virtual Lab?</h2>
              <p className="section-text">
                The two guides schools use to compare platforms, what to look
                for, what to avoid, and how the options stack up in 2026.
              </p>
              <ul className="lab-links">
                <li>
                  <a className="lab-link" href={getLocalizedPath("/blog/how-to-choose-virtual-lab-software-school/", language)}>
                    How to choose virtual lab software for your school
                  </a>
                </li>
                <li>
                  <a className="lab-link" href={getLocalizedPath("/blog/virtual-lab-software-guide-2026/", language)}>
                    Virtual lab software: the complete 2026 guide
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---- Quick questions ---- */}
        <section className="lab-band lab-band--light lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll">
              <span className="lab-eyebrow">Quick questions</span>
              <h2 className="section-title">The Three Things Schools Ask First</h2>
              <div className="lab-faq">
                <details className="lab-faq-item" open>
                  <summary>
                    <h3 className="lab-faq-q">Is there a student chat window?</h3>
                  </summary>
                  <p className="lab-faq-a">
                    No, and that is deliberate. WhimsyCat infers everything from a
                    student&rsquo;s actions in the lab: pupils never type prompts and
                    never receive generated text. There is no conversation to
                    monitor, so safeguarding is built into the architecture rather
                    than bolted on as a filter, which is how WhimsyLabs meets the
                    DfE&rsquo;s AI safety expectations by design. A distinction that
                    matters more every term, as{" "}
                    <a href={getLocalizedPath("/blog/ai-chatbot-lawsuits-2026-schools/", language)}>
                      the 2026 chatbot lawsuits
                    </a>{" "}
                    keep demonstrating.
                  </p>
                </details>
                <details className="lab-faq-item">
                  <summary>
                    <h3 className="lab-faq-q">What does it run on?</h3>
                  </summary>
                  <p className="lab-faq-a">
                    VR headsets and desktop, Chromebook, Mac, and PC, with a low-bandwidth mode built for unstable school
                    internet connections. One licence, every device. Weighing up
                    hardware? See{" "}
                    <a href={getLocalizedPath("/blog/vr-headsets-vs-chromebooks-cost-per-student/", language)}>
                      VR headsets vs Chromebooks: cost per student
                    </a>.
                  </p>
                </details>
                <details className="lab-faq-item">
                  <summary>
                    <h3 className="lab-faq-q">When can my school start?</h3>
                  </summary>
                  <p className="lab-faq-a">
                    Now. Pioneer Schools get Summer Term access to the beta AI
                    grading and early modules ahead of the global launch in
                    September 2026, and lock in the introductory BETT rate for the
                    2026/27 academic year.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= Pioneer Program CTA ================= */}
      <section
        className="lab-band lab-band--dark lab-band--tiled lab-band--tex lab-submerged"
        data-lab-band="dark"
        style={{ padding: "90px 0" }}
      >
        <Wave />
        <div className="lab-bubbles-field" data-lab-bubble-field aria-hidden="true">
          <canvas></canvas>
        </div>
        <div className="container">
          <div className="animate-on-scroll">
            <span className="lab-eyebrow">Get started</span>
            <h2 className="section-title">WhimsyLabs Pioneer Program</h2>
            <p className="section-text">
              WhimsyLabs launches globally in September 2026, and Pioneer
              Schools get early access now. Sign up to receive:
            </p>
            <div className="lab-hazards">
              {PIONEER.map((p) => (
                <div className="lab-hazard lab-hazard--hue" key={p.name} style={{ "--hz": p.hz, "--hz-soft": p.soft }}>
                  <b>{p.name}</b>
                  <span>{p.note}</span>
                </div>
              ))}
            </div>
            <div className="lab-hero-cta" style={{ marginTop: "28px" }}>
              <a href={getLocalizedPath("/contact/", language)} className="lab-btn">
                Become a Pioneer School
              </a>
              <a href={getLocalizedPath("/bett/", language)} className="lab-btn-ghost">
                Book a demo at BETT 2026
              </a>
            </div>
            <p className="section-text" style={{ marginTop: "26px" }}>
              Have questions? Visit the{" "}
              <a href={getLocalizedPath("/faq/", language)}>FAQ</a> for answers,
              or explore our{" "}
              <a href={getLocalizedPath("/services/", language)}>Services</a> to
              see how WhimsyLabs fits your school.
            </p>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation(FeaturesPage);
