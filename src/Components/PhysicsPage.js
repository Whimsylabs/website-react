import React, { useEffect, useRef } from "react";
import "./SubjectLab.css";
import "./PhysicsPage.css";
import Header from "./Header";
import Footer from "./Footer";
import withTranslation from "./withTranslation";
import { getLocalizedPath } from "../i18n";
import Wave from "./labWave";
import initSubjectLab from "./subjectLab";

// New-section copy lives here (all languages), following the BlogPost CTA
// pattern, so the page stays self-contained and translations.js is untouched.
const EXTRA = {
  en: {
    assessmentTitle: "How Does AI Assessment Work in the Physics Lab?",
    assessment1:
      "WhimsyCat, our AI tutor and assessor, tracks how students set up apparatus, take measurements, and record data, assessing method and measurement technique as students work, not just the numbers they write down afterwards. Follow-up questions use each student's own readings, so generic AI answers don't help.",
    assessment2:
      "There is no student chat window: WhimsyCat infers everything from actions in the lab. Teachers get a skill-by-skill breakdown covering technique, safety, data collection, and scientific communication.",
    faqTitle: "Virtual Physics Lab FAQ",
    faqs: [
      {
        q: "How is this different from physics animations?",
        a: "Everything runs on a real-time physics engine: masses have weight, liquids splash, and readings vary with technique. Students aren't watching a canned animation, they produce their own imperfect data, which is where the learning happens.",
      },
      {
        q: "Which physics topics are covered?",
        a: "Mechanics, electricity and circuits, waves, optics, magnetism, and thermal physics, aligned to KS3, GCSE, A-Level, IB, and AP Physics, with real-time data collection that students can export and analyse.",
      },
      {
        q: "Can students investigate their own questions?",
        a: "Yes, the sandbox lets students change any variable and design their own investigations, and teachers can generate bespoke practicals in minutes with the AI Experiment Builder.",
      },
    ],
    guideTitle: "Read the Teacher's Guide",
    guideText:
      "Our complete guide to virtual physics labs covers which simulations actually teach, curriculum fit, and how teachers combine virtual and physical practice.",
    guideLink: "Physics Lab Simulator: Virtual Physics Labs That Actually Teach",
    engineLink: "Why real-time physics engines make learning stick",
    labImageAlt: "Manipulating apparatus by hand in the WhimsyLabs virtual physics lab",
    assessmentImageAlt: "The WhimsyLabs teacher dashboard showing a skill-by-skill breakdown of student lab work",
    crossTitle: "Explore the Other Subject Labs",
    crossBiology: "Virtual Biology Lab",
    crossChemistry: "Virtual Chemistry Lab",
  },
  es: {
    assessmentTitle: "¿Cómo funciona la evaluación con IA en el laboratorio de física?",
    assessment1:
      "WhimsyCat, nuestro tutor y evaluador de IA, registra cómo los estudiantes montan los aparatos, toman medidas y anotan datos, evaluando el método y la técnica de medición mientras trabajan, no solo los números que escriben después. Las preguntas de seguimiento usan las lecturas propias de cada estudiante, así que las respuestas genéricas de IA no sirven.",
    assessment2:
      "No hay ventana de chat para estudiantes: WhimsyCat lo infiere todo a partir de las acciones en el laboratorio. El profesorado recibe un desglose por competencia: técnica, seguridad, recogida de datos y comunicación científica.",
    faqTitle: "Preguntas frecuentes sobre el laboratorio virtual de física",
    faqs: [
      {
        q: "¿En qué se diferencia de las animaciones de física?",
        a: "Todo funciona sobre un motor de física en tiempo real: las masas pesan, los líquidos salpican y las lecturas varían según la técnica. Los estudiantes no ven una animación enlatada, generan sus propios datos imperfectos, que es donde ocurre el aprendizaje.",
      },
      {
        q: "¿Qué temas de física se cubren?",
        a: "Mecánica, electricidad y circuitos, ondas, óptica, magnetismo y física térmica, alineados con KS3, GCSE, A-Level, IB y AP Physics, con recogida de datos en tiempo real que los estudiantes pueden exportar y analizar.",
      },
      {
        q: "¿Pueden los estudiantes investigar sus propias preguntas?",
        a: "Sí, el sandbox permite cambiar cualquier variable y diseñar investigaciones propias, y el profesorado puede generar prácticas a medida en minutos con el Diseñador de Experimentos con IA.",
      },
    ],
    guideTitle: "Lea la guía para docentes",
    guideText:
      "Nuestra guía completa sobre laboratorios virtuales de física explica qué simulaciones enseñan de verdad, el encaje curricular y cómo combinar práctica virtual y física.",
    guideLink: "Laboratorio Virtual de Física: Simulaciones que Realmente Enseñan",
    engineLink: "Por qué los motores de física en tiempo real afianzan el aprendizaje",
    labImageAlt: "Manipulando aparatos con la mano en el laboratorio virtual de física de WhimsyLabs",
    assessmentImageAlt: "El panel del profesorado de WhimsyLabs con el desglose por competencia del trabajo de laboratorio",
    crossTitle: "Explore los otros laboratorios",
    crossBiology: "Laboratorio virtual de biología",
    crossChemistry: "Laboratorio virtual de química",
  },
  fr: {
    assessmentTitle: "Comment fonctionne l'évaluation par IA dans le laboratoire de physique ?",
    assessment1:
      "WhimsyCat, notre tuteur et évaluateur IA, suit la façon dont les élèves montent le matériel, prennent leurs mesures et consignent leurs données, en évaluant la méthode et la technique de mesure pendant le travail, pas seulement les chiffres notés ensuite. Les questions de suivi utilisent les relevés propres à chaque élève : les réponses génériques d'une IA ne servent à rien.",
    assessment2:
      "Il n'y a pas de fenêtre de discussion pour les élèves : WhimsyCat déduit tout de leurs actions dans le laboratoire. Les enseignants reçoivent un bilan compétence par compétence : technique, sécurité, collecte de données et communication scientifique.",
    faqTitle: "FAQ du laboratoire virtuel de physique",
    faqs: [
      {
        q: "Quelle différence avec des animations de physique ?",
        a: "Tout repose sur un moteur physique en temps réel : les masses ont un poids, les liquides éclaboussent, les mesures varient selon la technique. Les élèves ne regardent pas une animation préenregistrée, ils produisent leurs propres données imparfaites, et c'est là que se joue l'apprentissage.",
      },
      {
        q: "Quels chapitres de physique sont couverts ?",
        a: "Mécanique, électricité et circuits, ondes, optique, magnétisme et physique thermique, en correspondance avec les programmes KS3, GCSE, A-Level, IB et AP Physics, avec une collecte de données en temps réel que les élèves peuvent exporter et analyser.",
      },
      {
        q: "Les élèves peuvent-ils explorer leurs propres questions ?",
        a: "Oui, le bac à sable permet de modifier n'importe quelle variable et de concevoir ses propres investigations, et les enseignants peuvent générer des TP sur mesure en quelques minutes avec le générateur d'expériences IA.",
      },
    ],
    guideTitle: "Lire le guide de l'enseignant",
    guideText:
      "Notre guide complet des laboratoires virtuels de physique explique quelles simulations enseignent vraiment, l'adéquation aux programmes et la combinaison de la pratique virtuelle et physique.",
    guideLink: "Labo Virtuel de Physique : des Simulations qui Enseignent Vraiment",
    engineLink: "Pourquoi les moteurs physiques en temps réel ancrent l'apprentissage",
    labImageAlt: "Manipulation d'appareils à la main dans le laboratoire virtuel de physique WhimsyLabs",
    assessmentImageAlt: "Le tableau de bord enseignant WhimsyLabs affichant le bilan compétence par compétence du travail en laboratoire",
    crossTitle: "Découvrir les autres laboratoires",
    crossBiology: "Laboratoire virtuel de biologie",
    crossChemistry: "Laboratoire virtuel de chimie",
  },
  de: {
    assessmentTitle: "Wie funktioniert die KI-Bewertung im Physiklabor?",
    assessment1:
      "WhimsyCat, unser KI-Tutor und -Prüfer, verfolgt, wie Schülerinnen und Schüler Apparaturen aufbauen, Messungen durchführen und Daten erfassen, bewertet werden Methode und Messtechnik während der Arbeit, nicht nur die später notierten Zahlen. Folgefragen nutzen die eigenen Messwerte der Lernenden, sodass generische KI-Antworten nicht weiterhelfen.",
    assessment2:
      "Es gibt kein Chatfenster für Lernende: WhimsyCat leitet alles aus den Handlungen im Labor ab. Lehrkräfte erhalten eine Aufschlüsselung nach Kompetenzen: Technik, Sicherheit, Datenerfassung und wissenschaftliche Kommunikation.",
    faqTitle: "FAQ zum virtuellen Physiklabor",
    faqs: [
      {
        q: "Worin unterscheidet sich das von Physik-Animationen?",
        a: "Alles läuft auf einer Echtzeit-Physik-Engine: Massen haben Gewicht, Flüssigkeiten spritzen, Messwerte streuen je nach Technik. Die Lernenden schauen keine vorgefertigte Animation an, sie erzeugen ihre eigenen, unvollkommenen Daten, und genau dort findet das Lernen statt.",
      },
      {
        q: "Welche Physikthemen werden abgedeckt?",
        a: "Mechanik, Elektrizität und Stromkreise, Wellen, Optik, Magnetismus und Wärmelehre, ausgerichtet auf KS3, GCSE, A-Level, IB und AP Physics, mit Datenerfassung in Echtzeit, die Lernende exportieren und auswerten können.",
      },
      {
        q: "Können Lernende eigene Fragestellungen untersuchen?",
        a: "Ja, im Sandbox-Modus lässt sich jede Variable verändern und eine eigene Untersuchung entwerfen; Lehrkräfte können mit dem KI-Experiment-Designer in Minuten maßgeschneiderte Praktika erstellen.",
      },
    ],
    guideTitle: "Lehrkräfte-Leitfaden lesen",
    guideText:
      "Unser vollständiger Leitfaden zu virtuellen Physiklaboren zeigt, welche Simulationen wirklich lehren, wie sie zum Lehrplan passen und wie sich virtuelle und physische Praxis kombinieren lassen.",
    guideLink: "Virtuelles Physiklabor: Simulationen, die wirklich lehren",
    engineLink: "Warum Echtzeit-Physik-Engines das Lernen verankern",
    labImageAlt: "Handhabung von Apparaturen mit der Hand im virtuellen Physiklabor von WhimsyLabs",
    assessmentImageAlt: "Das WhimsyLabs-Lehrkräfte-Dashboard mit der kompetenzweisen Aufschlüsselung der Laborarbeit",
    crossTitle: "Die anderen Fachlabore entdecken",
    crossBiology: "Virtuelles Biologielabor",
    crossChemistry: "Virtuelles Chemielabor",
  },
  jp: {
    assessmentTitle: "物理実験室でのAI評価はどのように機能しますか？",
    assessment1:
      "AIチューター兼評価者のWhimsyCatは、装置の組み立て、測定、データの記録といった生徒の作業過程を追跡し、後で書き留めた数値だけでなく、作業中の方法と測定技術を評価します。フォローアップの設問は各生徒自身の測定値に基づくため、一般的なAIの答えでは対応できません。",
    assessment2:
      "生徒用のチャット画面はありません。WhimsyCatはラボでの行動からすべてを推定します。教師には、技術・安全・データ収集・科学的コミュニケーションのスキル別の評価が提供されます。",
    faqTitle: "バーチャル物理実験室 よくある質問",
    faqs: [
      {
        q: "物理のアニメーション教材と何が違うのですか？",
        a: "すべてがリアルタイム物理エンジン上で動作します。質量には重さがあり、液体は飛び散り、測定値は技術によって変動します。生徒は出来合いのアニメーションを見るのではなく、自分自身の（不完全な）データを生み出します。学びはまさにそこで起こります。",
      },
      {
        q: "どの物理分野に対応していますか？",
        a: "力学、電気と回路、波動、光学、磁気、熱物理学をカバーし、KS3、GCSE、A-Level、IB、AP Physicsに対応しています。リアルタイムで収集したデータは、生徒がエクスポートして分析できます。",
      },
      {
        q: "生徒は自分自身の疑問を探究できますか？",
        a: "はい。サンドボックスではあらゆる変数を変えて独自の探究を設計でき、教師はAI実験ビルダーで数分のうちにオーダーメイドの実習を作成できます。",
      },
    ],
    guideTitle: "教師向けガイドを読む",
    guideText:
      "バーチャル物理実験室の完全ガイドでは、本当に学びにつながるシミュレーションの見分け方、カリキュラムへの適合、バーチャルと対面実習の組み合わせ方を解説しています。",
    guideLink: "バーチャル物理実験室：本当に教えるシミュレーション",
    engineLink: "リアルタイム物理エンジンが学びを定着させる理由",
    labImageAlt: "WhimsyLabsのバーチャル物理実験室で手を使って装置を操作している様子",
    assessmentImageAlt: "実験の取り組みをスキル別に表示したWhimsyLabsの教師用ダッシュボード",
    crossTitle: "他の教科のラボを見る",
    crossBiology: "バーチャル生物実験室",
    crossChemistry: "バーチャル化学実験室",
  },
};
EXTRA.ja = EXTRA.jp;

/* English-only additions, on purpose: `extra` merges over EXTRA.en, so every
   language falls back to these until the wording has settled. */
const PHYS_EXTRA = {
  eyebrows: {
    overview: "Overview",
    engine: "The engine",
    library: "Experiment library",
    assessment: "Assessment",
    benefits: "Why it works",
    curriculum: "Curriculum fit",
    faq: "Questions",
    next: "Read next",
    start: "Get started",
  },
  engineTitle: "An Animation Cannot Be Wrong",
  engineText1:
    "Most virtual physics is a recording. Drag the slider and the pre-drawn result plays back, correct every time, because the answer was decided when the animation was made rather than by anything the student did.",
  engineText2:
    "Ours runs on a real-time physics engine. Masses have weight, pendulums lose energy to the air, and a badly clamped ruler gives a badly measured result, so students produce their own imperfect data and have to reason about why it is imperfect.",
  engineNote:
    "Apparatus is manipulated directly rather than configured through a form, so setting up the experiment is part of the experiment.",
  enginePoints: [
    { name: "Real forces", note: "Mass, friction and momentum, not a lookup table" },
    { name: "Honest error", note: "Readings vary with how the apparatus was set up" },
    { name: "Free variables", note: "Change anything, not just what a slider allows" },
    { name: "Live data", note: "Values logged as the experiment runs" },
  ],
  detailWhat: "What students do",
  details: {
    circuits: {
      what: "Build the circuit component by component, then measure it, with a voltmeter that loads the circuit and a lamp that dims when you add another in series.",
      skills: ["Circuit assembly", "Meter placement", "Reading accuracy", "Fault finding"],
    },
    mechanics: {
      what: "Release trolleys down a ramp and time them, with friction and air resistance taking their cut, so the numbers never quite match the ideal calculation.",
      skills: ["Apparatus setup", "Timing accuracy", "Repeat readings", "Graph analysis"],
    },
    waves: {
      what: "Drive a ripple tank or a stretched string and measure wavelength and frequency directly, watching interference build from the two sources rather than being told about it.",
      skills: ["Measurement", "Frequency control", "Pattern interpretation", "Calculation"],
    },
    optics: {
      what: "Place lenses and mirrors on the bench, trace the rays, and find the focal length by moving the screen until the image is genuinely sharp.",
      skills: ["Ray tracing", "Focal measurement", "Image description", "Precision"],
    },
  },
  moreTitle: "Also in the library",
  more: [
    { name: "Magnetism", note: "Field mapping, electromagnets and motor effect" },
    { name: "Thermal physics", note: "Specific heat capacity and cooling curves" },
    { name: "Radioactivity", note: "Half-life and absorption, with no source to license" },
    { name: "Hooke's law", note: "Springs loaded to and past the elastic limit" },
    { name: "Density and pressure", note: "Displacement, floating and manometers" },
    { name: "Custom practicals", note: "Any procedure a teacher writes, built by the AI Experiment Builder" },
  ],
  variabilityTitle: "Every run, a different reading",
  variabilityNote: "Generated per student",
  whyLead:
    "Because a result that comes out perfect every time teaches students that real experiments do too.",
  stats: [
    { n: "∞", l: "repeat readings" },
    { n: "0", l: "apparatus failures" },
    { n: "100%", l: "of equipment available" },
    { n: "24/7", l: "access in any browser" },
  ],
  compareTitle: "Virtual vs physical bench",
  compareCol1: "WhimsyLabs",
  compareCol2: "Physical bench",
  compareRows: [
    { label: "Working apparatus", virtual: "Always", physical: "Whatever still works" },
    { label: "Repeat readings", virtual: "Unlimited", physical: "Limited by lesson time" },
    { label: "Dangerous equipment", virtual: "All of it", physical: "Demonstration only" },
    { label: "Evidence of technique", virtual: "Every action logged", physical: "Whatever the teacher saw" },
  ],
  chainHint: "Grab a gold link and pull",
};

const PhysicsPage = ({ t, language }) => {
  // Merge over English so copy added since the last translation pass still
  // renders in every language instead of coming out undefined.
  const extra = { ...EXTRA.en, ...(EXTRA[language] || {}), ...PHYS_EXTRA };
  const eb = PHYS_EXTRA.eyebrows;
  const pageRef = useRef(null);

  // Progressive enhancement only, the page is complete without this running.
  useEffect(() => initSubjectLab(pageRef.current), []);

  // hue colours the selected tab and skill fills; soft tints the panel badge
  const featured = [
    { key: "circuits", shot: "/images/Sandbox.jpg", hue: "#d97706", soft: "rgba(217, 119, 6, 0.14)" },
    { key: "mechanics", shot: "/images/handGrabbingSmall.png", hue: "#0e8fc7", soft: "rgba(20, 183, 255, 0.14)" },
    { key: "waves", shot: "/images/Challenges.jpg", hue: "#c2107a", soft: "rgba(224, 27, 132, 0.12)" },
    { key: "optics", shot: "/images/finalLab.png", hue: "#6d4ae0", soft: "rgba(109, 74, 224, 0.13)" },
  ];

  // Hoist geometry, shared with subjectLab.js
  const CX = 60;
  const R = 30;
  const GEAR_Y = 58;
  const TOP = GEAR_Y + R;

  return (
    <main className="lab-page lab-page--physics" ref={pageRef}>
      <Header language={language} />

      <div className="lab-body" data-lab-body>
        {/* The hoist hangs down the right margin, outside the text column */}
        <div className="lab-rail" data-lab-hoist-rail aria-hidden="true">
          <div className="lab-rail-sticky">
            <div className="lab-instrument">
              <svg viewBox="0 0 120 640" focusable="false">
                {/* Mount */}
                <line x1="16" y1="12" x2="104" y2="12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                <line x1={CX} y1="12" x2={CX} y2={GEAR_Y - R} stroke="currentColor" strokeWidth="4" />

                <g data-hoist-chain />

                {/* Gear */}
                <g transform={`translate(${CX},${GEAR_Y})`}>
                  <g data-hoist-gear>
                    {Array.from({ length: 18 }, (_, i) => (
                      <rect key={i} x="-3.2" y={-(R + 7)} width="6.4" height="8" fill="currentColor" transform={`rotate(${i * 20})`} />
                    ))}
                    <circle r={R} fill="none" stroke="currentColor" strokeWidth="5" />
                    {Array.from({ length: 8 }, (_, i) => (
                      <line key={i} x1="0" y1="0" x2="0" y2={-R} stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" transform={`rotate(${i * 45})`} />
                    ))}
                    <circle r="6.5" fill="none" stroke="currentColor" strokeWidth="4.5" />
                  </g>
                </g>

                {/* Load, origin is the top of the wire, so it swings as a pendulum */}
                <g data-hoist-load transform={`translate(${CX},${TOP + 26})`}>
                  <line x1="0" y1="0" x2="0" y2="15" stroke="currentColor" strokeWidth="4" />
                  <rect x="-23" y="11" width="46" height="9" rx="2" fill="currentColor" />
                  <rect x="-18" y="20" width="36" height="38" rx="3" fill="none" stroke="currentColor" strokeWidth="4" />
                  {[1, 2, 3].map((i) => (
                    <line key={i} x1="-18" y1={20 + i * 9.5} x2="18" y2={20 + i * 9.5} stroke="currentColor" strokeWidth="2.5" opacity="0.45" />
                  ))}
                </g>
              </svg>
              <div className="lab-readout" data-lab-readout>0.00 m payout</div>
            </div>
          </div>
        </div>

        {/* ================= Hero ================= */}
        <section className="lab-hero lab-band lab-band--dark lab-band--tex" data-lab-band="dark">
          <div className="container">
            <div className="lab-hero-grid">
              <div>
                {/* Keeps the exact "Virtual Lab" phrase validate-page-content
                    requires on every language, as the old brand tag did. */}
                <span className="lab-eyebrow">WhimsyLabs Virtual Lab · Physics</span>
                <h1 className="lab-hero-title">{t("physics.hero.title")}</h1>
                <p className="lab-hero-sub">{t("physics.hero.subtitle")}</p>
                <div className="lab-hero-cta">
                  <a href={getLocalizedPath("/contact/", language)} className="lab-btn">
                    {t("physics.hero.cta")}
                  </a>
                  <a href={getLocalizedPath("/features/", language)} className="lab-btn-ghost">
                    {t("physics.hero.ctaSecondary")}
                  </a>
                </div>
              </div>
              <div className="lab-hero-art" aria-hidden="true">
                <figure className="lab-shot">
                  <img src="/images/handGrabbingSmall.png" alt="" loading="eager" />
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Overview ---- */}
        <section className="lab-band lab-band--light" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="section-grid">
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">{eb.overview}</span>
                <h2 className="section-title">{t("physics.intro.title")}</h2>
                <p className="section-text">{t("physics.intro.text1")}</p>
                <p className="section-text">{t("physics.intro.text2")}</p>
              </div>
              <div className="section-visual animate-on-scroll">
                <div className="mockup-container">
                  <div className="mockup-header">
                    <span className="mockup-title">{extra.variabilityTitle}</span>
                    <span className="mockup-badge">{extra.variabilityNote}</span>
                  </div>
                  <div className="mockup-content">
                    <div className="actual-row">
                      <span className="actual-property">Trolley mass</span>
                      <span className="actual-value highlight">0.4972 kg</span>
                      <span className="actual-deviation">-0.6%</span>
                    </div>
                    <div className="actual-row">
                      <span className="actual-property">Ramp friction</span>
                      <span className="actual-value">0.043 µ</span>
                      <span className="actual-deviation subtle">surface</span>
                    </div>
                    <div className="actual-row">
                      <span className="actual-property">Timing gate</span>
                      <span className="actual-value">±0.002 s</span>
                      <span className="actual-deviation">resolution</span>
                    </div>
                  </div>
                </div>
                {/* Blurred product frame behind the play button, so the box
                    reads as a video and not a flat gradient */}
                <div
                  className="lab-video lab-video--poster"
                  style={{ marginTop: "18px", "--poster": "url(/images/handGrabbingSmall.png)" }}
                >
                  <span className="lab-video-play" aria-hidden="true"></span>
                  <span className="lab-video-label">VIDEO, LAB WALKTHROUGH</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Chain divider: grab a gold link and pull ---- */}
        <div className="container">
          <div className="lab-chain" data-lab-chain>
            <svg viewBox="0 0 620 170" preserveAspectRatio="none" focusable="false" aria-hidden="true">
              <circle cx="12" cy="30" r="5" fill="currentColor" />
              <circle cx="608" cy="30" r="5" fill="currentColor" />
              <path data-chain-curve fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="M12,30 L608,30" />
              <g data-chain-links />
              <g data-chain-handles />
            </svg>
            <p className="lab-chain-hint">{extra.chainHint}</p>
          </div>
        </div>

        {/* ---- Experiments ---- */}
        <section className="lab-band lab-band--tint lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll lab-head-center">
              <span className="lab-eyebrow">{eb.library}</span>
              <h2 className="section-title">{t("physics.experiments.title")}</h2>
              <p className="section-text">{t("physics.experiments.subtitle")}</p>
            </div>

            <div data-lab-tabs>
              <div className="lab-tablist" role="tablist" aria-label={t("physics.experiments.title")}>
                {featured.map((f, i) => (
                  <button
                    key={f.key}
                    className="lab-tab"
                    role="tab"
                    type="button"
                    id={`lab-tab-${f.key}`}
                    aria-controls={`lab-panel-${f.key}`}
                    aria-selected={i === 0 ? "true" : "false"}
                    style={{ "--tab-hue": f.hue, "--tab-soft": f.soft }}
                  >
                    {t(`physics.experiments.${f.key}.title`)}
                  </button>
                ))}
              </div>

              {featured.map((f, i) => (
                <div
                  key={f.key}
                  className="lab-panel"
                  role="tabpanel"
                  id={`lab-panel-${f.key}`}
                  aria-labelledby={`lab-tab-${f.key}`}
                  hidden={i !== 0}
                  style={{ "--tab-hue": f.hue, "--tab-soft": f.soft }}
                >
                  <div className="mockup-container">
                    <div className="mockup-header">
                      <span className="mockup-title">{t(`physics.experiments.${f.key}.title`)}</span>
                      <span className="mockup-badge">Live simulation</span>
                    </div>
                    <div className="mockup-content">
                      <div className="lab-panel-grid">
                        <div>
                          <p className="section-text">{t(`physics.experiments.${f.key}.desc`)}</p>
                          <p className="section-text">
                            <b>{extra.detailWhat}:</b> {extra.details[f.key].what}
                          </p>
                          <div className="skills-section">
                            {extra.details[f.key].skills.map((s) => (
                              <div className="skill-row" key={s}>
                                <span className="skill-name">{s}</span>
                                <div className="skill-bar-container">
                                  <div className="skill-bar-bg">
                                    <div className="skill-bar-fill" style={{ width: "100%" }}></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <figure className="lab-shot">
                          <img
                            src={f.shot}
                            alt={`${t(`physics.experiments.${f.key}.title`)} in the WhimsyLabs virtual physics lab`}
                            loading="lazy"
                          />
                          <figcaption>In-app capture</figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-on-scroll">
              <h3 className="lab-faq-q" style={{ marginTop: "34px" }}>{extra.moreTitle}</h3>
              <ul className="lab-more">
                {extra.more.map((m) => (
                  <li key={m.name}><b>{m.name}</b>, {m.note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---- The engine: physics' equivalent of chemistry's safety section ---- */}
        <section className="lab-band lab-band--dark lab-band--tex" data-lab-band="dark" data-lab-section>
          <div className="lab-wave lab-wave--ground" aria-hidden="true">
            <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
              <path d="M0,0 C220,58 420,4 620,30 C820,56 1010,14 1200,44 L1200,0 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="container">
            <div className="section-grid">
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">{eb.engine}</span>
                <h2 className="section-title">{extra.engineTitle}</h2>
                <p className="section-text">{extra.engineText1}</p>
                <p className="section-text">{extra.engineText2}</p>
                <div className="lab-hazards">
                  {extra.enginePoints.map((h, i) => (
                    <div
                      className="lab-hazard lab-hazard--hue"
                      key={h.name}
                      style={{
                        "--hz": ["#fbbf24", "#38bdf8", "#f472b6", "#7fe3b0"][i],
                        "--hz-soft": [
                          "rgba(251, 191, 36, 0.12)",
                          "rgba(56, 189, 248, 0.12)",
                          "rgba(244, 114, 182, 0.12)",
                          "rgba(127, 227, 176, 0.12)",
                        ][i],
                      }}
                    >
                      <b>{h.name}</b>
                      <span>{h.note}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section-visual animate-on-scroll">
                <figure className="lab-figure">
                  <img src="/images/handGrabbingSmall.png" alt={extra.labImageAlt} loading="lazy" />
                  {/* aria-hidden: the alt attribute already conveys this to AT */}
                  <figcaption aria-hidden="true">{extra.engineNote}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Assessment ---- */}
        <section className="lab-band lab-band--light" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="section-grid reverse">
              <div className="section-visual animate-on-scroll">
                <div className="mockup-container">
                  <div className="mockup-header">
                    <span className="mockup-title">Circuits · skills breakdown</span>
                    <span className="mockup-badge">From actions, not answers</span>
                  </div>
                  <div className="mockup-content">
                    <div className="skills-section">
                      {[
                        ["Circuit assembly", 91],
                        ["Meter placement", 74],
                        ["Reading accuracy", 86],
                        ["Repeat readings", 80],
                        ["Lab safety", 95],
                      ].map(([name, score]) => (
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
                <span className="lab-eyebrow">{eb.assessment}</span>
                <h2 className="section-title">{extra.assessmentTitle}</h2>
                <p className="section-text">{extra.assessment1}</p>
                <p className="section-text">{extra.assessment2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Why virtual physics labs ---- */}
        <section className="lab-band lab-band--tint" data-lab-band="light" data-lab-section>
          <div className="container">
            {/* The argument gets display scale before the detail: the lead
                line as a pull-quote, then the numbers on the site's
                lavender-to-sky band. */}
            <div className="animate-on-scroll" style={{ paddingTop: "72px" }}>
              <p className="lab-pull">{extra.whyLead}</p>
              <div className="lab-statband">
                {extra.stats.map((s) => (
                  <div key={s.l}>
                    <span className="lab-stat-n">{s.n}</span>
                    <span className="lab-stat-l">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="section-grid">
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">{eb.benefits}</span>
                <h2 className="section-title">{t("physics.benefits.title")}</h2>
                {["interactive", "precision", "variables", "analysis"].map((k) => (
                  <p className="section-text" key={k}>
                    <b>{t(`physics.benefits.${k}.title`)}.</b> {t(`physics.benefits.${k}.desc`)}
                  </p>
                ))}
              </div>
              <div className="section-visual animate-on-scroll">
                <div className="mockup-container">
                  <div className="mockup-header">
                    <span className="mockup-title">{extra.compareTitle}</span>
                  </div>
                  <div className="mockup-content">
                    <div className="lab-table-wrap">
                      <table className="lab-table">
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col" className="lab-col-win">{extra.compareCol1}</th>
                            <th scope="col">{extra.compareCol2}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {extra.compareRows.map((r) => (
                            <tr key={r.label}>
                              <th scope="row">{r.label}</th>
                              <td className="lab-col-win">{r.virtual}</td>
                              <td className="lab-col-alt">{r.physical}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Curriculum ---- */}
        <section className="lab-band lab-band--light lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll">
              <span className="lab-eyebrow">{eb.curriculum}</span>
              <h2 className="section-title">{t("physics.curriculum.title")}</h2>
              <p className="section-text">{t("physics.curriculum.text")}</p>
              <div className="lab-tags">
                {[
                  "GCSE", "A-Level", "KS3", "KS4",
                  "AP Physics 1", "AP Physics 2", "NGSS",
                  "IB Diploma", "Scottish Highers", "Australian Curriculum",
                ].map((tag) => (
                  <span className="lab-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- FAQ, native disclosures, so the tail of the page keeps an
             interaction without any JS ---- */}
        <section className="lab-band lab-band--tint lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll">
              <span className="lab-eyebrow">{eb.faq}</span>
              <h2 className="section-title">{extra.faqTitle}</h2>
              <div className="lab-faq">
                {extra.faqs.map((item, index) => (
                  <details className="lab-faq-item" key={index} open={index === 0}>
                    <summary>
                      <h3 className="lab-faq-q">{item.q}</h3>
                    </summary>
                    <p className="lab-faq-a">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- Read next ---- */}
        <section className="lab-band lab-band--light lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll">
              <span className="lab-eyebrow">{eb.next}</span>
              <h2 className="section-title">{extra.guideTitle}</h2>
              <p className="section-text">{extra.guideText}</p>
              <ul className="lab-links">
                <li>
                  <a className="lab-link" href={getLocalizedPath("/blog/virtual-physics-lab-simulations-teach/", language)}>
                    {extra.guideLink}
                  </a>
                </li>
                <li>
                  <a className="lab-link" href={getLocalizedPath("/blog/why-traditional-virtual-labs-fail-physics-engine/", language)}>
                    {extra.engineLink}
                  </a>
                </li>
              </ul>

              <h3 className="lab-faq-q" style={{ marginTop: "30px" }}>{extra.crossTitle}</h3>
              <div className="lab-cross">
                <a className="lab-cross-item" href={getLocalizedPath("/chemistry/", language)}>
                  <svg viewBox="0 -0.5 54 170" aria-hidden="true" focusable="false">
                    <rect x="11" y="6" width="32" height="141" fill="currentColor" />
                    <circle cx="27" cy="147" r="16" fill="currentColor" />
                  </svg>
                  {extra.crossChemistry}
                </a>
                <a className="lab-cross-item" href={getLocalizedPath("/biology/", language)}>
                  <svg viewBox="0 0 54 170" aria-hidden="true" focusable="false">
                    <path d="M14,4 C40,40 14,80 40,120 C50,138 44,158 34,166" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
                  </svg>
                  {extra.crossBiology}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section
          className="lab-band lab-band--dark lab-band--tiled lab-band--tex"
          data-lab-band="dark"
          style={{ padding: "90px 0" }}
        >
          <Wave />
          <div className="container">
            <div className="animate-on-scroll">
              <span className="lab-eyebrow">{eb.start}</span>
              <h2 className="section-title">{t("physics.cta.title")}</h2>
              <p className="section-text">{t("physics.cta.text")}</p>
              <div className="lab-hero-cta" style={{ marginTop: "24px" }}>
                <a href={getLocalizedPath("/contact/", language)} className="lab-btn">
                  {t("physics.cta.button")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation(PhysicsPage);
