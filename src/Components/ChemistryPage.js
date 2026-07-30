import React, { useEffect, useRef } from "react";
import "./SubjectLab.css";
import "./ChemistryPage.css";
import Header from "./Header";
import Footer from "./Footer";
import withTranslation from "./withTranslation";
import { getLocalizedPath } from "../i18n";
import Glassware from "./labGlassware";
import Wave from "./labWave";
import initSubjectLab, { PIPETTE } from "./subjectLab";

// New-section copy lives here (all languages), following the BlogPost CTA
// pattern, so the page stays self-contained and translations.js is untouched.
const EXTRA = {
  en: {
    assessmentTitle: "How Does AI Assessment Work in the Chemistry Lab?",
    assessment1:
      "WhimsyCat, our AI tutor and assessor, watches how students work — burette technique, swirling, indicator choice, endpoint judgement — and grades the process, not just the final figure. Follow-up questions are tied to each student's own results, so answers can't be copied from a chatbot.",
    assessment2:
      "There is no student chat window: WhimsyCat infers everything from actions in the lab. Teachers get a skill-by-skill breakdown covering technique, safety, data collection, and scientific communication.",
    faqTitle: "Virtual Chemistry Lab FAQ",
    faqs: [
      {
        q: "Can students practise GCSE required practicals virtually?",
        a: "Yes — the experiment library covers the major exam-board required practicals, including acid–base titrations, electrolysis, and energy changes. Virtual runs are ideal for building technique before assessed physical practicals; check your exam board's guidance on what may be assessed virtually.",
      },
      {
        q: "Is it safe to simulate dangerous reactions?",
        a: "That is the point: reactions too hazardous or expensive for a school lab — concentrated acids, vigorous combustion — are fully simulated, complete with realistic hazards and consequences, so students build real risk awareness with zero real risk.",
      },
      {
        q: "Do simulated titrations behave like real ones?",
        a: "Yes. Reactions run on simulated chemistry over time, determined by molarity, pH, and reactivity — with impurities and sample-to-sample variation — so no two runs are identical, just like a real bench.",
      },
    ],
    guideTitle: "Read the Teacher's Guide",
    guideText:
      "Our complete guide to virtual chemistry labs covers lesson planning, exam-board fit, and how teachers combine virtual and physical practice.",
    guideLink: "Virtual Chemistry Lab: A Teacher's Complete Guide",
    labImageAlt: "Heating a beaker of liquid over a Bunsen burner in the WhimsyLabs virtual chemistry lab",
    safetyImageAlt: "A fully simulated hazard label for pure ethyl alcohol inside the virtual lab",
    crossTitle: "Explore the Other Subject Labs",
    crossBiology: "Virtual Biology Lab",
    crossPhysics: "Virtual Physics Lab",

    // --- Copy added for the rebuilt page. English only for now, on purpose:
    // `extra` below merges over EXTRA.en, so every language falls back to
    // these until the wording has settled and is worth translating. ---
    safetyTitle: "Every Hazard, None of the Risk",
    safetyText1:
      "Reagents in the lab carry their real hazards. Concentrated acids burn, solvents catch, and gases build pressure in a sealed vessel — and students meet all of it, with consequences that follow from what they actually did.",
    safetyText2:
      "That is the part a physical school lab cannot teach. Technicians remove the dangerous reagent before the lesson starts, so students never learn what makes it dangerous. Here they can get it wrong, see what happens, and try again.",
    safetyNote:
      "Hazard data, pictograms and handling rules are attached to every substance, so safety is something students read off the bottle rather than something a worksheet tells them.",
    hazards: [
      { name: "Corrosive", note: "Concentrated acids and alkalis burn skin and etch glass" },
      { name: "Flammable", note: "Solvent vapour ignites from an unattended Bunsen" },
      { name: "Pressure", note: "Gas evolved in a stoppered flask has to go somewhere" },
      { name: "Toxic", note: "Fume-cupboard reagents behave badly on an open bench" },
    ],
    detailWhat: "What students do",
    detailSkills: "What WhimsyCat marks",
    details: {
      titration: {
        what: "Fill the burette, choose an indicator, and run the titre down to a colour change they have to judge themselves. Concordant results need repeating, because the first run is rarely the good one.",
        skills: ["Burette technique", "Indicator choice", "Endpoint judgement", "Concordance"],
      },
      reactions: {
        what: "Change concentration, temperature or surface area and watch the rate respond in real time. Nothing is on rails — the reaction runs on simulated chemistry, so the data has scatter in it.",
        skills: ["Variable control", "Timing accuracy", "Data recording", "Rate analysis"],
      },
      combustion: {
        what: "Burn fuels under a calorimeter, lose heat to the room, and find out why the measured enthalpy never matches the data book.",
        skills: ["Apparatus setup", "Heat-loss awareness", "Calculation", "Error analysis"],
      },
      electrolysis: {
        what: "Wire the cell, pick the electrodes, and identify what collects where — with electrode choice actually changing the products.",
        skills: ["Circuit assembly", "Product prediction", "Gas testing", "Half equations"],
      },
    },
    moreTitle: "Also in the library",
    more: [
      { name: "Flame tests", note: "Metal-ion identification by emission colour" },
      { name: "Chromatography", note: "Separating mixtures and calculating Rf values" },
      { name: "Organic synthesis", note: "Reflux, distillation and yield calculation" },
      { name: "Qualitative analysis", note: "Identifying unknown salts by test sequence" },
      { name: "Molar volume of gas", note: "Collecting and measuring evolved gas" },
      { name: "Custom practicals", note: "Any procedure a teacher writes, built by the AI Experiment Builder" },
    ],
    variabilityTitle: "Every bench, a different sample",
    variabilityNote: "Generated per student",
    whyLead:
      "Because a simulation that always gives the right answer teaches students that experiments always give the right answer.",
    stats: [
      { n: "∞", l: "runs per student" },
      { n: "0", l: "cost per repeat" },
      { n: "100%", l: "of hazards simulated" },
      { n: "24/7", l: "access in any browser" },
    ],
    compareTitle: "Virtual vs physical bench",
    compareCol0: "",
    compareCol1: "WhimsyLabs",
    compareCol2: "Physical bench",
    compareRows: [
      { label: "Runs per student", virtual: "Unlimited", physical: "One, if the class is lucky" },
      { label: "Cost per repeat", virtual: "None", physical: "Reagents and technician time" },
      { label: "Dangerous reagents", virtual: "All of them", physical: "Removed before the lesson" },
      { label: "Evidence of technique", virtual: "Every action logged", physical: "Whatever the teacher saw" },
    ],
    eyebrows: {
      overview: "Overview",
      safety: "Safety",
      library: "Experiment library",
      assessment: "Assessment",
      benefits: "Why it works",
      curriculum: "Curriculum fit",
      faq: "Questions",
      next: "Read next",
      start: "Get started",
    },
  },
  es: {
    assessmentTitle: "¿Cómo funciona la evaluación con IA en el laboratorio de química?",
    assessment1:
      "WhimsyCat, nuestro tutor y evaluador de IA, observa cómo trabajan los estudiantes — técnica de bureta, agitación, elección del indicador, criterio del punto final — y califica el proceso, no solo la cifra final. Las preguntas de seguimiento se basan en los resultados propios de cada estudiante, de modo que las respuestas no pueden copiarse de un chatbot.",
    assessment2:
      "No hay ventana de chat para estudiantes: WhimsyCat lo infiere todo a partir de las acciones en el laboratorio. El profesorado recibe un desglose por competencia: técnica, seguridad, recogida de datos y comunicación científica.",
    faqTitle: "Preguntas frecuentes sobre el laboratorio virtual de química",
    faqs: [
      {
        q: "¿Pueden los estudiantes practicar virtualmente las prácticas obligatorias?",
        a: "Sí — la biblioteca de experimentos cubre las prácticas obligatorias de los principales planes de estudio, incluidas titulaciones ácido-base, electrólisis y cambios de energía. Las sesiones virtuales son ideales para dominar la técnica antes de las prácticas físicas evaluadas.",
      },
      {
        q: "¿Es seguro simular reacciones peligrosas?",
        a: "Esa es la idea: las reacciones demasiado peligrosas o costosas para un laboratorio escolar — ácidos concentrados, combustiones vigorosas — están totalmente simuladas, con riesgos y consecuencias realistas, para que el alumnado desarrolle conciencia del riesgo sin riesgo real.",
      },
      {
        q: "¿Las titulaciones simuladas se comportan como las reales?",
        a: "Sí. Las reacciones se ejecutan con química simulada en el tiempo, según molaridad, pH y reactividad — con impurezas y variación entre muestras — de modo que no hay dos ensayos idénticos, igual que en un banco real.",
      },
    ],
    guideTitle: "Lea la guía para docentes",
    guideText:
      "Nuestra guía completa sobre laboratorios virtuales de química cubre la planificación de clases, el encaje curricular y cómo combinar práctica virtual y física.",
    guideLink: "Laboratorio Virtual de Química: Guía Completa para Profesores",
    labImageAlt: "Calentando un vaso de precipitados sobre un mechero Bunsen en el laboratorio virtual de WhimsyLabs",
    safetyImageAlt: "Etiqueta de peligro totalmente simulada de etanol puro dentro del laboratorio virtual",
    crossTitle: "Explore los otros laboratorios",
    crossBiology: "Laboratorio virtual de biología",
    crossPhysics: "Laboratorio virtual de física",
    eyebrows: {
      overview: "Resumen",
      library: "Biblioteca de experimentos",
      assessment: "Evaluación",
      benefits: "Por qué funciona",
      curriculum: "Encaje curricular",
      faq: "Preguntas",
      next: "Siga leyendo",
      start: "Empezar",
    },
  },
  fr: {
    assessmentTitle: "Comment fonctionne l'évaluation par IA dans le laboratoire de chimie ?",
    assessment1:
      "WhimsyCat, notre tuteur et évaluateur IA, observe la façon dont les élèves travaillent — technique de burette, agitation, choix de l'indicateur, jugement du point d'équivalence — et note le processus, pas seulement le résultat final. Les questions de suivi s'appuient sur les résultats propres à chaque élève : impossible de copier les réponses d'un chatbot.",
    assessment2:
      "Il n'y a pas de fenêtre de discussion pour les élèves : WhimsyCat déduit tout de leurs actions dans le laboratoire. Les enseignants reçoivent un bilan compétence par compétence : technique, sécurité, collecte de données et communication scientifique.",
    faqTitle: "FAQ du laboratoire virtuel de chimie",
    faqs: [
      {
        q: "Les élèves peuvent-ils s'entraîner virtuellement aux travaux pratiques obligatoires ?",
        a: "Oui — la bibliothèque d'expériences couvre les principaux travaux pratiques exigés par les programmes, dont les titrages acide-base, l'électrolyse et les transferts d'énergie. Les séances virtuelles sont idéales pour acquérir la technique avant les TP physiques évalués.",
      },
      {
        q: "Est-il sûr de simuler des réactions dangereuses ?",
        a: "C'est tout l'intérêt : les réactions trop dangereuses ou coûteuses pour un laboratoire scolaire — acides concentrés, combustions vives — sont entièrement simulées, avec des risques et conséquences réalistes, pour développer une vraie conscience du risque sans danger réel.",
      },
      {
        q: "Les titrages simulés se comportent-ils comme les vrais ?",
        a: "Oui. Les réactions reposent sur une chimie simulée dans le temps, selon la molarité, le pH et la réactivité — avec impuretés et variations entre échantillons — si bien que deux essais ne sont jamais identiques, comme sur une vraie paillasse.",
      },
    ],
    guideTitle: "Lire le guide de l'enseignant",
    guideText:
      "Notre guide complet des laboratoires virtuels de chimie couvre la préparation des cours, l'adéquation aux programmes et la combinaison de la pratique virtuelle et physique.",
    guideLink: "Laboratoire Virtuel de Chimie : Guide Complet pour les Enseignants",
    labImageAlt: "Chauffage d'un bécher au bec Bunsen dans le laboratoire virtuel WhimsyLabs",
    safetyImageAlt: "Étiquette de danger entièrement simulée d'éthanol pur dans le laboratoire virtuel",
    crossTitle: "Découvrir les autres laboratoires",
    crossBiology: "Laboratoire virtuel de biologie",
    crossPhysics: "Laboratoire virtuel de physique",
    eyebrows: {
      overview: "Aperçu",
      library: "Bibliothèque d'expériences",
      assessment: "Évaluation",
      benefits: "Pourquoi ça marche",
      curriculum: "Adéquation aux programmes",
      faq: "Questions",
      next: "À lire ensuite",
      start: "Commencer",
    },
  },
  de: {
    assessmentTitle: "Wie funktioniert die KI-Bewertung im Chemielabor?",
    assessment1:
      "WhimsyCat, unser KI-Tutor und -Prüfer, beobachtet, wie Schülerinnen und Schüler arbeiten — Bürettentechnik, Schwenken, Indikatorwahl, Endpunktbestimmung — und bewertet den Prozess, nicht nur das Endergebnis. Folgefragen beziehen sich auf die eigenen Messwerte der Lernenden, sodass Antworten nicht aus einem Chatbot kopiert werden können.",
    assessment2:
      "Es gibt kein Chatfenster für Lernende: WhimsyCat leitet alles aus den Handlungen im Labor ab. Lehrkräfte erhalten eine Aufschlüsselung nach Kompetenzen: Technik, Sicherheit, Datenerfassung und wissenschaftliche Kommunikation.",
    faqTitle: "FAQ zum virtuellen Chemielabor",
    faqs: [
      {
        q: "Können Pflichtpraktika virtuell geübt werden?",
        a: "Ja — die Experimentbibliothek deckt die wichtigsten lehrplanrelevanten Praktika ab, darunter Säure-Base-Titrationen, Elektrolyse und Energieumsätze. Virtuelle Durchläufe eignen sich ideal, um die Technik vor bewerteten Präsenzpraktika zu festigen.",
      },
      {
        q: "Ist es sicher, gefährliche Reaktionen zu simulieren?",
        a: "Genau darum geht es: Reaktionen, die für ein Schullabor zu gefährlich oder zu teuer sind — konzentrierte Säuren, heftige Verbrennungen — sind vollständig simuliert, mit realistischen Gefahren und Konsequenzen. So entsteht echtes Risikobewusstsein ohne echtes Risiko.",
      },
      {
        q: "Verhalten sich simulierte Titrationen wie echte?",
        a: "Ja. Reaktionen laufen auf simulierter Chemie in Echtzeit ab, bestimmt durch Molarität, pH-Wert und Reaktivität — mit Verunreinigungen und Probenstreuung. Keine zwei Durchläufe sind identisch, genau wie an einer echten Laborbank.",
      },
    ],
    guideTitle: "Lehrkräfte-Leitfaden lesen",
    guideText:
      "Unser vollständiger Leitfaden zu virtuellen Chemielaboren behandelt Unterrichtsplanung, Lehrplanbezug und die Kombination aus virtueller und physischer Praxis.",
    guideLink: "Virtuelles Chemielabor: Ein vollständiger Leitfaden für Lehrkräfte",
    labImageAlt: "Erhitzen eines Becherglases über einem Bunsenbrenner im virtuellen Labor von WhimsyLabs",
    safetyImageAlt: "Vollständig simuliertes Gefahrenetikett für reines Ethanol im virtuellen Labor",
    crossTitle: "Die anderen Fachlabore entdecken",
    crossBiology: "Virtuelles Biologielabor",
    crossPhysics: "Virtuelles Physiklabor",
    eyebrows: {
      overview: "Überblick",
      library: "Experimentbibliothek",
      assessment: "Bewertung",
      benefits: "Warum es funktioniert",
      curriculum: "Lehrplanbezug",
      faq: "Fragen",
      next: "Weiterlesen",
      start: "Loslegen",
    },
  },
  jp: {
    assessmentTitle: "化学実験室でのAI評価はどのように機能しますか？",
    assessment1:
      "AIチューター兼評価者のWhimsyCatは、ビュレットの操作、撹拌、指示薬の選択、終点の判断など、生徒の作業過程を観察し、最終的な数値だけでなくプロセスを評価します。フォローアップの設問は各生徒自身の実験データに基づくため、チャットボットから答えを写すことはできません。",
    assessment2:
      "生徒用のチャット画面はありません。WhimsyCatはラボでの行動からすべてを推定します。教師には、技術・安全・データ収集・科学的コミュニケーションのスキル別の評価が提供されます。",
    faqTitle: "バーチャル化学実験室 よくある質問",
    faqs: [
      {
        q: "必修実験をバーチャルで練習できますか？",
        a: "はい。実験ライブラリは、酸塩基滴定、電気分解、エネルギー変化など、主要カリキュラムの必修実験をカバーしています。評価対象の対面実験の前に、技術を身につける練習として最適です。",
      },
      {
        q: "危険な反応をシミュレートしても安全ですか？",
        a: "それこそが目的です。濃酸や激しい燃焼など、学校の実験室では危険すぎる・高価すぎる反応も完全にシミュレートされ、現実的な危険と結果を再現します。実際のリスクなしに、本物のリスク意識を育てます。",
      },
      {
        q: "シミュレートされた滴定は実物と同じように振る舞いますか？",
        a: "はい。反応はモル濃度・pH・反応性に基づく化学シミュレーションで時間経過とともに進行し、不純物や試料間のばらつきも再現されるため、実際の実験台と同様、二つとして同じ結果にはなりません。",
      },
    ],
    guideTitle: "教師向けガイドを読む",
    guideText:
      "バーチャル化学実験室の完全ガイドでは、授業計画、カリキュラムへの適合、バーチャルと対面実習の組み合わせ方を解説しています。",
    guideLink: "仮想化学実験室：教師のための完全ガイド",
    labImageAlt: "WhimsyLabsのバーチャル化学実験室でビーカーをブンゼンバーナーで加熱している様子",
    safetyImageAlt: "バーチャルラボ内の純エタノールの完全にシミュレートされた危険表示ラベル",
    crossTitle: "他の教科のラボを見る",
    crossBiology: "バーチャル生物実験室",
    crossPhysics: "バーチャル物理実験室",
    eyebrows: {
      overview: "概要",
      library: "実験ライブラリ",
      assessment: "評価",
      benefits: "効果の理由",
      curriculum: "カリキュラム適合",
      faq: "よくある質問",
      next: "次に読む",
      start: "はじめる",
    },
  },
};
EXTRA.ja = EXTRA.jp;

/* Tube geometry from public/images/kit-chemsitry/Test_tube.svg; the x values
   are the rack's four slots. */
const TUBE = { w: 32, top: 6, bodyH: 141, bulbR: 16, bulbCy: 147, bottom: 163 };
const TUBE_W = TUBE.w;

const REAGENTS = [
  { id: "labTubeA", from: "#c9a6ff", to: "#6d4ae0" },
  { id: "labTubeB", from: "#7ee0ff", to: "#14b7ff" },
  { id: "labTubeC", from: "#ff8fd0", to: "#e01b84" },
  { id: "labTubeD", from: "#ffd77a", to: "#f59e0b" },
];

const RACK_TUBES = [
  { x: 41, level: 58, grad: "labTubeA" },
  { x: 106.33, level: 82, grad: "labTubeB" },
  { x: 171.67, level: 46, grad: "labTubeC" },
  { x: 237, level: 96, grad: "labTubeD" },
];

/* One hue per hazard card, indexed against EXTRA.*.hazards so the copy stays
   translatable without carrying colour. 400-tier values read on the dark band. */
const HAZARD_HUES = [
  { hz: "#fbbf24", soft: "rgba(251, 191, 36, 0.12)" }, // corrosive
  { hz: "#f87171", soft: "rgba(248, 113, 113, 0.12)" }, // flammable
  { hz: "#38bdf8", soft: "rgba(56, 189, 248, 0.12)" }, // pressure
  { hz: "#c084fc", soft: "rgba(192, 132, 252, 0.12)" }, // toxic
];

const ChemistryPage = ({ t, language }) => {
  // Merge over English so copy added since the last translation pass still
  // renders in every language instead of coming out undefined.
  const extra = { ...EXTRA.en, ...(EXTRA[language] || {}) };
  // Nested objects need their own merge — a shallow spread would replace the
  // English eyebrows wholesale and lose any key the translation predates.
  const eb = { ...EXTRA.en.eyebrows, ...(extra.eyebrows || {}) };
  const pageRef = useRef(null);

  // Progressive enhancement only — the page is complete without this running.
  useEffect(() => initSubjectLab(pageRef.current), []);

  const { vbW, vbH, x, w, top, barrelEnd, tipY, inset } = PIPETTE;
  const cxp = x + w / 2;

  // Four experiments get the tab treatment; the rest are listed below it.
  // Screenshots are placeholders drawn from existing product captures until
  // per-experiment ones are shot. Each tab carries one of the hero rack's
  // reagents: `grad` fills its vessel icon, `hue` (an AA-safe dark variant of
  // the same reagent) colours the selected tab and the panel's skill fills.
  const featured = [
    { key: "titration", vessel: "testTube", shot: "/images/Sandbox.jpg", grad: "labTubeA", hue: "#6d4ae0", soft: "rgba(109, 74, 224, 0.13)" },
    { key: "reactions", vessel: "erlenmeyer", shot: "/images/Challenges.jpg", grad: "labTubeB", hue: "#0e8fc7", soft: "rgba(20, 183, 255, 0.14)" },
    { key: "combustion", vessel: "beaker", shot: "/images/finalLab.png", grad: "labTubeD", hue: "#b45309", soft: "rgba(245, 158, 11, 0.16)" },
    { key: "electrolysis", vessel: "wideBeaker", shot: "/images/custom.jpg", grad: "labTubeC", hue: "#c2107a", soft: "rgba(224, 27, 132, 0.12)" },
  ];

  const BENCH = ["erlenmeyer", "beaker", "roundFlask", "wideBeaker", "testTube"];
  const BENCH_GRADS = ["labTubeA", "labTubeB", "labTubeC", "labTubeD"];

  return (
    <main className="lab-page lab-page--chemistry" ref={pageRef}>
      <Header language={language} />

      {/* Reagent gradients live once, here, so any vessel on the page can
          reference them without depending on another svg existing. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          {REAGENTS.map((r) => (
            <linearGradient id={r.id} key={r.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={r.from} stopOpacity="0.95" />
              <stop offset="100%" stopColor={r.to} />
            </linearGradient>
          ))}
          <linearGradient id="labPipetteFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a6ff" />
            <stop offset="100%" stopColor="#6d4ae0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ================= Hero ================= */}
      <section className="lab-hero lab-hero--liquid">
        <div className="container">
          <div className="lab-hero-grid">
            <div>
              {/* Keeps the exact "Virtual Lab" phrase validate-page-content
                  requires on every language, as the old brand tag did. */}
              <span className="lab-eyebrow">WhimsyLabs Virtual Lab · Chemistry</span>
              <h1 className="lab-hero-title">{t("chemistry.hero.title")}</h1>
              <p className="lab-hero-sub">{t("chemistry.hero.subtitle")}</p>
              <div className="lab-hero-cta">
                <a href={getLocalizedPath("/contact/", language)} className="lab-btn">
                  {t("chemistry.hero.cta")}
                </a>
                <a href={getLocalizedPath("/features/", language)} className="lab-btn-ghost">
                  {t("chemistry.hero.ctaSecondary")}
                </a>
              </div>
            </div>

            {/* Rack of reagents — sloshes and bubbles, and you can stir it */}
            <div className="lab-rack">
              <svg viewBox="0 0 311 186" data-lab-rack role="img" aria-label={t("chemistry.hero.title")}>
                <defs>
                  {RACK_TUBES.map((tb) => (
                    <clipPath id={`labTubeClip-${tb.x}`} key={tb.x}>
                      <rect x={tb.x} y={TUBE.top} width={TUBE.w} height={TUBE.bodyH} />
                      <circle cx={tb.x + TUBE.w / 2} cy={TUBE.bulbCy} r={TUBE.bulbR} />
                    </clipPath>
                  ))}
                </defs>

                {/* Liquid sits behind the glass outline */}
                {RACK_TUBES.map((tb) => (
                  <g
                    key={tb.x}
                    data-lab-liq
                    data-liq-x={tb.x}
                    data-liq-w={TUBE_W}
                    data-liq-level={tb.level}
                    data-liq-bottom={171}
                    clipPath={`url(#labTubeClip-${tb.x})`}
                  >
                    {/* Resting level ships in the HTML so the tubes are full
                        even if the surface simulation never runs */}
                    <path
                      data-liq-surface
                      fill={`url(#${tb.grad})`}
                      d={
                        "M" + tb.x + "," + tb.level +
                        " L" + (tb.x + TUBE.w) + "," + tb.level +
                        " L" + (tb.x + TUBE.w) + "," + (TUBE.bottom + 8) +
                        " L" + tb.x + "," + (TUBE.bottom + 8) + " Z"
                      }
                    />
                    <g data-liq-bubbles />
                  </g>
                ))}

                {/* Glass and rack, as drawn in the kit */}
                <g fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.92">
                  {RACK_TUBES.map((tb) => (
                    <g key={tb.x}>
                      <path
                        d={`M${tb.x},${TUBE.top} L${tb.x},${TUBE.bulbCy} M${tb.x + TUBE.w},${TUBE.top} L${tb.x + TUBE.w},${TUBE.bulbCy}`}
                      />
                      <path
                        d={`M${tb.x},${TUBE.bulbCy} a${TUBE.bulbR},${TUBE.bulbR} 0 0 0 ${TUBE.w},0`}
                      />
                      <line x1={tb.x - 4.5} y1={TUBE.top} x2={tb.x + TUBE.w + 4.5} y2={TUBE.top} strokeLinecap="round" strokeWidth="8" />
                    </g>
                  ))}
                </g>
                <g fill="#ffffff" opacity="0.55">
                  <rect y="32" width="311" height="11" rx="2" />
                  <rect y="163" width="311" height="11" rx="2" />
                  <rect y="1" width="17" height="185" rx="2" />
                  <rect x="294" y="1" width="17" height="185" rx="2" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* You descend out of the hero and into the liquid */}
      <div className="lab-liquid" data-lab-liquid-surface aria-hidden="true">
        <canvas></canvas>
      </div>

      {/* ================= Body ================= */}
      <div className="lab-body" data-lab-body>
        <div className="lab-rail" data-lab-rail aria-hidden="true">
          <div className="lab-rail-sticky">
            <div className="lab-instrument">
              <svg viewBox={"0 0 " + vbW + " " + vbH} data-lab-burette focusable="false">
                <rect
                  data-lab-liquid
                  x={x + inset}
                  y={top}
                  width={w - inset * 2}
                  height={barrelEnd - top}
                  fill="url(#labPipetteFill)"
                />
                <path data-lab-meniscus fill="url(#labPipetteFill)" />
                <path data-lab-meniscus-line fill="none" stroke="#5b34d6" strokeWidth="2.5" />

                {/* Straight graduated barrel tapering to a delivery tip */}
                <path
                  d={
                    "M" + x + "," + top +
                    " L" + x + "," + barrelEnd +
                    " L" + (cxp - 2.4) + "," + tipY +
                    " L" + (cxp + 2.4) + "," + tipY +
                    " L" + (x + w) + "," + barrelEnd +
                    " L" + (x + w) + "," + top
                  }
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <line x1={x - 7} y1={top} x2={x + w + 7} y2={top} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <g data-lab-grads />
              </svg>
              <div className="lab-readout" data-lab-readout>0.0 mL dispensed</div>
            </div>
          </div>
        </div>

        {/* ---- Overview: prose + solution-variability mockup ---- */}
        <section
          className="lab-band lab-band--light lab-submerged"
          data-lab-band="light"
          data-lab-section
        >
          {/* You are under the surface here, so bubbles drift up behind it */}
          <div className="lab-bubbles-field" data-lab-bubble-field aria-hidden="true">
            <canvas></canvas>
          </div>
          <div className="container">
            <div className="section-grid">
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">{eb.overview}</span>
                <h2 className="section-title">{t("chemistry.intro.title")}</h2>
                <p className="section-text">{t("chemistry.intro.text1")}</p>
                <p className="section-text">{t("chemistry.intro.text2")}</p>
              </div>
              <div className="section-visual animate-on-scroll">
                <div className="mockup-container">
                  <div className="mockup-header">
                    <span className="mockup-title">{extra.variabilityTitle}</span>
                    <span className="mockup-badge">{extra.variabilityNote}</span>
                  </div>
                  <div className="mockup-content">
                    <div className="actual-row">
                      <span className="actual-property">Concentration</span>
                      <span className="actual-value highlight">0.0987 M</span>
                      <span className="actual-deviation">-1.3%</span>
                    </div>
                    <div className="actual-row">
                      <span className="actual-property">Room temp</span>
                      <span className="actual-value">21.3°C</span>
                      <span className="actual-deviation subtle">ambient</span>
                    </div>
                    <div className="actual-row">
                      <span className="actual-property">Purity</span>
                      <span className="actual-value">99.2%</span>
                      <span className="actual-deviation">-0.8%</span>
                    </div>
                    <div className="impurities-section">
                      <span className="impurities-label">Trace impurities</span>
                      <div className="impurities-list">
                        <span className="impurity">Fe³⁺ 0.3ppm</span>
                        <span className="impurity">SO₄²⁻ 0.5ppm</span>
                        <span className="impurity">Cl⁻ residue</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placeholder — a real embed drops straight in here. The
                    blurred frame behind the play button is a product capture,
                    so the box reads as a video and not a flat gradient. */}
                <div
                  className="lab-video lab-video--poster"
                  style={{ marginTop: "18px", "--poster": "url(/images/finalLab.png)" }}
                >
                  <span className="lab-video-play" aria-hidden="true"></span>
                  <span className="lab-video-label">VIDEO — LAB WALKTHROUGH</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Experiments: four in detail, the rest listed ---- */}
        <section className="lab-band lab-band--tint lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll lab-head-center">
              <span className="lab-eyebrow">{eb.library}</span>
              <h2 className="section-title">{t("chemistry.experiments.title")}</h2>
              <p className="section-text">{t("chemistry.experiments.subtitle")}</p>
            </div>

            <div data-lab-tabs>
              <div className="lab-tablist" role="tablist" aria-label={t("chemistry.experiments.title")}>
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
                    {/* The tab's vessel holds live liquid in its reagent's
                        colour — the four tabs are the hero rack, revisited */}
                    <Glassware name={f.vessel} id={`tab-${f.key}`} variant="outline" gradient={f.grad} />
                    {t(`chemistry.experiments.${f.key}.title`)}
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
                      <span className="mockup-title">{t(`chemistry.experiments.${f.key}.title`)}</span>
                      <span className="mockup-badge">Live simulation</span>
                    </div>
                    <div className="mockup-content">
                      <div className="lab-panel-grid">
                        <div>
                          <p className="section-text">{t(`chemistry.experiments.${f.key}.desc`)}</p>
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
                          <img src={f.shot} alt={`${t(`chemistry.experiments.${f.key}.title`)} in the WhimsyLabs virtual chemistry lab`} loading="lazy" />
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
                  <li key={m.name}><b>{m.name}</b> — {m.note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---- Bench divider: apparatus holding real liquid ---- */}
        <div className="container">
          <div className="lab-bench" aria-hidden="true">
            <div className="lab-bench-row">
              {BENCH.map((name, i) => (
                <Glassware
                  key={name}
                  name={name}
                  id={`bench-${name}`}
                  variant="outline"
                  gradient={BENCH_GRADS[i % BENCH_GRADS.length]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ---- Safety: its own section, inverted. Wave seams cut the band's
             edges, the plus-lattice textures the ground, and bubbles rise
             behind the content — dark, but not flat. ---- */}
        <section className="lab-band lab-band--dark lab-band--tex lab-submerged" data-lab-band="dark" data-lab-section>
          <Wave />
          <Wave flip />
          <div className="lab-bubbles-field" data-lab-bubble-field aria-hidden="true">
            <canvas></canvas>
          </div>
          <div className="container">
            <div className="section-grid">
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">{eb.safety}</span>
                <h2 className="section-title">{extra.safetyTitle}</h2>
                <p className="section-text">{extra.safetyText1}</p>
                <p className="section-text">{extra.safetyText2}</p>
                <div className="lab-hazards">
                  {extra.hazards.map((h, i) => (
                    <div
                      className="lab-hazard lab-hazard--hue"
                      key={h.name}
                      style={{ "--hz": HAZARD_HUES[i % HAZARD_HUES.length].hz, "--hz-soft": HAZARD_HUES[i % HAZARD_HUES.length].soft }}
                    >
                      <b>{h.name}</b>
                      <span>{h.note}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section-visual animate-on-scroll">
                <figure className="lab-figure">
                  <img src="/images/Ethanolsafety.jpg" alt={extra.safetyImageAlt} loading="lazy" />
                  {/* aria-hidden: the alt attribute already conveys this to AT */}
                  <figcaption aria-hidden="true">{extra.safetyNote}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Assessment: light, so the safety band reads as the page's one
             dark interlude before the CTA and the dark-headed skills card
             pops instead of dissolving into a dark ground ---- */}
        <section className="lab-band lab-band--light" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="section-grid reverse">
              <div className="section-visual animate-on-scroll">
                <div className="mockup-container">
                  <div className="mockup-header">
                    <span className="mockup-title">Titration · skills breakdown</span>
                    <span className="mockup-badge">From actions, not answers</span>
                  </div>
                  <div className="mockup-content">
                    <div className="skills-section">
                      {[
                        ["Burette technique", 88],
                        ["Indicator choice", 95],
                        ["Endpoint judgement", 76],
                        ["Concordant results", 84],
                        ["Lab safety", 92],
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

        {/* ---- Why virtual chemistry labs ---- */}
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
                <h2 className="section-title">{t("chemistry.benefits.title")}</h2>
                {["safety", "unlimited", "feedback", "data"].map((k) => (
                  <p className="section-text" key={k}>
                    <b>{t(`chemistry.benefits.${k}.title`)}.</b>{" "}
                    {t(`chemistry.benefits.${k}.desc`)}
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
                            <th scope="col">{extra.compareCol0}</th>
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
              <h2 className="section-title">{t("chemistry.curriculum.title")}</h2>
              <p className="section-text">{t("chemistry.curriculum.text")}</p>
              <div className="lab-tags">
                {[
                  "GCSE", "A-Level", "KS3", "KS4",
                  "AP Chemistry", "NGSS", "US High School Chemistry",
                  "IB Diploma", "Scottish Highers", "Australian Curriculum",
                ].map((tag) => (
                  <span className="lab-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---- Second bench: the lab reappears before the page tails off ---- */}
        <div className="container">
          <div className="lab-bench" aria-hidden="true">
            <div className="lab-bench-row">
              {["roundFlask", "testTube", "wideBeaker", "erlenmeyer", "beaker"].map((name, i) => (
                <Glassware
                  key={name}
                  name={name}
                  id={`bench2-${name}`}
                  variant="outline"
                  gradient={BENCH_GRADS[(i + 2) % BENCH_GRADS.length]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ---- FAQ — native disclosures, so the tail of the page keeps an
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
                  <a className="lab-link" href={getLocalizedPath("/blog/virtual-chemistry-lab-teachers-guide/", language)}>
                    {extra.guideLink}
                  </a>
                </li>
              </ul>

              <h3 className="lab-faq-q" style={{ marginTop: "30px" }}>{extra.crossTitle}</h3>
              <div className="lab-cross">
                <a className="lab-cross-item" href={getLocalizedPath("/biology/", language)}>
                  <svg viewBox="0 -0.5 54 170" aria-hidden="true" focusable="false">
                    <rect x="11" y="6" width="32" height="141" fill="currentColor" />
                    <circle cx="27" cy="147" r="16" fill="currentColor" />
                  </svg>
                  {extra.crossBiology}
                </a>
                <a className="lab-cross-item" href={getLocalizedPath("/physics/", language)}>
                  <svg viewBox="0 0 54 170" aria-hidden="true" focusable="false">
                    <line x1="27" y1="0" x2="27" y2="96" stroke="currentColor" strokeWidth="7" />
                    <circle cx="27" cy="128" r="34" fill="currentColor" />
                  </svg>
                  {extra.crossPhysics}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= CTA ================= */}
      {/* Tiled like the hero, so the page ends where it began; bubbles and the
          wave seam carry the lab through to the last band */}
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
            <span className="lab-eyebrow">{eb.start}</span>
            <h2 className="section-title">{t("chemistry.cta.title")}</h2>
            <p className="section-text">{t("chemistry.cta.text")}</p>
            <div className="lab-hero-cta" style={{ marginTop: "24px" }}>
              <a href={getLocalizedPath("/contact/", language)} className="lab-btn">
                {t("chemistry.cta.button")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation(ChemistryPage);
