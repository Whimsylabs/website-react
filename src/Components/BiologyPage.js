import React, { useEffect, useRef } from "react";
import "./SubjectLab.css";
import "./BiologyPage.css";
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
    assessmentTitle: "How Does AI Assessment Work in the Biology Lab?",
    assessment1:
      "WhimsyCat, our AI tutor and assessor, watches how students handle the microscope, prepare samples, and work through dissections — grading technique and procedure, not just written answers. Follow-up questions reference each student's own observations, so answers can't be copied from a chatbot.",
    assessment2:
      "There is no student chat window: WhimsyCat infers everything from actions in the lab. Teachers get a skill-by-skill breakdown covering technique, safety, data collection, and scientific communication.",
    faqTitle: "Virtual Biology Lab FAQ",
    faqs: [
      {
        q: "Can students really do dissections virtually?",
        a: "Yes — organ dissections such as the kidney are fully interactive, with realistic tissue layers and instruments. They remove ethical and squeamishness barriers, and in our school sessions SEND students in particular showed markedly stronger engagement with the virtual kidney dissection.",
      },
      {
        q: "Does virtual microscopy teach real technique?",
        a: "Students focus, adjust the light, and move the stage exactly as they would on a physical microscope. The fine control transfers, so class time on real equipment is spent observing specimens rather than fumbling with knobs.",
      },
      {
        q: "Which curricula does the biology lab cover?",
        a: "Content maps to KS3, GCSE, A-Level, IB, and AP Biology — from cell biology and microscopy to dissection and physiology. Teachers can also build custom practicals with the AI Experiment Builder.",
      },
    ],
    guideTitle: "Read the Teacher's Guide",
    guideText:
      "Our complete guide to virtual biology labs covers dissections, microscopy, curriculum fit, and how teachers combine virtual and physical practice.",
    guideLink: "Virtual Biology Lab: Dissections, Microscopy, and More",
    caseLink: "Case study: virtual kidney dissection and SEND engagement",
    dissectionImageAlt: "Students performing a virtual kidney dissection in the WhimsyLabs lab",
    microscopeImageAlt: "Adjusting focus and stage controls on a simulated microscope in WhimsyLabs",
    crossTitle: "Explore the Other Subject Labs",
    crossChemistry: "Virtual Chemistry Lab",
    crossPhysics: "Virtual Physics Lab",
  },
  es: {
    assessmentTitle: "¿Cómo funciona la evaluación con IA en el laboratorio de biología?",
    assessment1:
      "WhimsyCat, nuestro tutor y evaluador de IA, observa cómo los estudiantes manejan el microscopio, preparan muestras y realizan disecciones — calificando la técnica y el procedimiento, no solo las respuestas escritas. Las preguntas de seguimiento se basan en las observaciones propias de cada estudiante, de modo que las respuestas no pueden copiarse de un chatbot.",
    assessment2:
      "No hay ventana de chat para estudiantes: WhimsyCat lo infiere todo a partir de las acciones en el laboratorio. El profesorado recibe un desglose por competencia: técnica, seguridad, recogida de datos y comunicación científica.",
    faqTitle: "Preguntas frecuentes sobre el laboratorio virtual de biología",
    faqs: [
      {
        q: "¿Pueden los estudiantes hacer disecciones virtuales de verdad?",
        a: "Sí — las disecciones de órganos, como el riñón, son totalmente interactivas, con capas de tejido e instrumentos realistas. Eliminan barreras éticas y de aprensión, y en nuestras sesiones escolares el alumnado con necesidades educativas especiales mostró un compromiso notablemente mayor con la disección virtual de riñón.",
      },
      {
        q: "¿La microscopía virtual enseña técnica real?",
        a: "Los estudiantes enfocan, ajustan la luz y mueven la platina exactamente igual que en un microscopio físico. El control fino se transfiere, así que el tiempo de clase con equipos reales se dedica a observar muestras, no a pelearse con los mandos.",
      },
      {
        q: "¿Qué currículos cubre el laboratorio de biología?",
        a: "El contenido se ajusta a KS3, GCSE, A-Level, IB y AP Biology — desde biología celular y microscopía hasta disección y fisiología. El profesorado también puede crear prácticas personalizadas con el Diseñador de Experimentos con IA.",
      },
    ],
    guideTitle: "Lea la guía para docentes",
    guideText:
      "Nuestra guía completa sobre laboratorios virtuales de biología cubre disecciones, microscopía, encaje curricular y cómo combinar práctica virtual y física.",
    guideLink: "Laboratorio Virtual de Biología: Disecciones, Microscopía y más",
    caseLink: "Caso práctico: disección virtual de riñón y alumnado con NEE",
    dissectionImageAlt: "Estudiantes realizando una disección virtual de riñón en el laboratorio de WhimsyLabs",
    microscopeImageAlt: "Ajustando el enfoque y la platina de un microscopio simulado en WhimsyLabs",
    crossTitle: "Explore los otros laboratorios",
    crossChemistry: "Laboratorio virtual de química",
    crossPhysics: "Laboratorio virtual de física",
  },
  fr: {
    assessmentTitle: "Comment fonctionne l'évaluation par IA dans le laboratoire de biologie ?",
    assessment1:
      "WhimsyCat, notre tuteur et évaluateur IA, observe la façon dont les élèves manipulent le microscope, préparent les échantillons et mènent les dissections — en notant la technique et la procédure, pas seulement les réponses écrites. Les questions de suivi s'appuient sur les observations propres à chaque élève : impossible de copier les réponses d'un chatbot.",
    assessment2:
      "Il n'y a pas de fenêtre de discussion pour les élèves : WhimsyCat déduit tout de leurs actions dans le laboratoire. Les enseignants reçoivent un bilan compétence par compétence : technique, sécurité, collecte de données et communication scientifique.",
    faqTitle: "FAQ du laboratoire virtuel de biologie",
    faqs: [
      {
        q: "Les élèves peuvent-ils vraiment faire des dissections virtuelles ?",
        a: "Oui — les dissections d'organes, comme le rein, sont entièrement interactives, avec des couches de tissus et des instruments réalistes. Elles lèvent les obstacles éthiques et la répugnance, et lors de nos séances en classe, les élèves à besoins éducatifs particuliers se sont montrés nettement plus engagés dans la dissection virtuelle du rein.",
      },
      {
        q: "La microscopie virtuelle enseigne-t-elle une vraie technique ?",
        a: "Les élèves font la mise au point, règlent l'éclairage et déplacent la platine exactement comme sur un microscope physique. Ce contrôle fin se transfère : le temps passé sur du vrai matériel sert à observer les échantillons, pas à tâtonner.",
      },
      {
        q: "Quels programmes le laboratoire de biologie couvre-t-il ?",
        a: "Le contenu correspond aux programmes KS3, GCSE, A-Level, IB et AP Biology — de la biologie cellulaire et la microscopie à la dissection et la physiologie. Les enseignants peuvent aussi créer des TP sur mesure avec le générateur d'expériences IA.",
      },
    ],
    guideTitle: "Lire le guide de l'enseignant",
    guideText:
      "Notre guide complet des laboratoires virtuels de biologie couvre les dissections, la microscopie, l'adéquation aux programmes et la combinaison de la pratique virtuelle et physique.",
    guideLink: "Laboratoire Virtuel de Biologie : Dissections, Microscopie et plus",
    caseLink: "Étude de cas : dissection virtuelle du rein et élèves à besoins particuliers",
    dissectionImageAlt: "Élèves réalisant une dissection virtuelle de rein dans le laboratoire WhimsyLabs",
    microscopeImageAlt: "Réglage de la mise au point et de la platine d'un microscope simulé dans WhimsyLabs",
    crossTitle: "Découvrir les autres laboratoires",
    crossChemistry: "Laboratoire virtuel de chimie",
    crossPhysics: "Laboratoire virtuel de physique",
  },
  de: {
    assessmentTitle: "Wie funktioniert die KI-Bewertung im Biologielabor?",
    assessment1:
      "WhimsyCat, unser KI-Tutor und -Prüfer, beobachtet, wie Schülerinnen und Schüler mit dem Mikroskop umgehen, Proben vorbereiten und Sektionen durchführen — bewertet werden Technik und Vorgehen, nicht nur schriftliche Antworten. Folgefragen beziehen sich auf die eigenen Beobachtungen der Lernenden, sodass Antworten nicht aus einem Chatbot kopiert werden können.",
    assessment2:
      "Es gibt kein Chatfenster für Lernende: WhimsyCat leitet alles aus den Handlungen im Labor ab. Lehrkräfte erhalten eine Aufschlüsselung nach Kompetenzen: Technik, Sicherheit, Datenerfassung und wissenschaftliche Kommunikation.",
    faqTitle: "FAQ zum virtuellen Biologielabor",
    faqs: [
      {
        q: "Können Sektionen wirklich virtuell durchgeführt werden?",
        a: "Ja — Organsektionen wie die Niere sind vollständig interaktiv, mit realistischen Gewebeschichten und Instrumenten. Sie beseitigen ethische Hürden und Berührungsängste; in unseren Schulstunden zeigten gerade Lernende mit Förderbedarf ein deutlich stärkeres Engagement bei der virtuellen Nierensektion.",
      },
      {
        q: "Vermittelt virtuelle Mikroskopie echte Technik?",
        a: "Die Lernenden fokussieren, regeln das Licht und bewegen den Objekttisch genau wie an einem physischen Mikroskop. Die Feinmotorik überträgt sich — die Zeit am echten Gerät wird zum Beobachten genutzt, nicht zum Herumprobieren.",
      },
      {
        q: "Welche Lehrpläne deckt das Biologielabor ab?",
        a: "Die Inhalte entsprechen KS3, GCSE, A-Level, IB und AP Biology — von Zellbiologie und Mikroskopie bis zu Sektion und Physiologie. Mit dem KI-Experiment-Designer können Lehrkräfte zudem eigene Praktika erstellen.",
      },
    ],
    guideTitle: "Lehrkräfte-Leitfaden lesen",
    guideText:
      "Unser vollständiger Leitfaden zu virtuellen Biologielaboren behandelt Sektionen, Mikroskopie, Lehrplanbezug und die Kombination aus virtueller und physischer Praxis.",
    guideLink: "Virtuelles Biologielabor: Sezieren, Mikroskopie und mehr",
    caseLink: "Fallstudie: Virtuelle Nierensektion und Lernende mit Förderbedarf",
    dissectionImageAlt: "Schüler führen eine virtuelle Nierensektion im WhimsyLabs-Labor durch",
    microscopeImageAlt: "Einstellen von Fokus und Objekttisch an einem simulierten Mikroskop in WhimsyLabs",
    crossTitle: "Die anderen Fachlabore entdecken",
    crossChemistry: "Virtuelles Chemielabor",
    crossPhysics: "Virtuelles Physiklabor",
  },
  jp: {
    assessmentTitle: "生物実験室でのAI評価はどのように機能しますか？",
    assessment1:
      "AIチューター兼評価者のWhimsyCatは、顕微鏡の操作、サンプルの準備、解剖の手順など、生徒の作業過程を観察し、記述式の解答だけでなく技術と手順を評価します。フォローアップの設問は各生徒自身の観察結果に基づくため、チャットボットから答えを写すことはできません。",
    assessment2:
      "生徒用のチャット画面はありません。WhimsyCatはラボでの行動からすべてを推定します。教師には、技術・安全・データ収集・科学的コミュニケーションのスキル別の評価が提供されます。",
    faqTitle: "バーチャル生物実験室 よくある質問",
    faqs: [
      {
        q: "本当にバーチャルで解剖ができますか？",
        a: "はい。腎臓などの臓器解剖は、リアルな組織の層と実験器具を備えた完全にインタラクティブなものです。倫理的な障壁や抵抗感を取り除き、学校でのセッションでは特に特別な支援を要する生徒がバーチャル腎臓解剖に高い意欲を示しました。",
      },
      {
        q: "バーチャル顕微鏡で本物の技術が身につきますか？",
        a: "生徒は実際の顕微鏡と同じようにピントを合わせ、光を調整し、ステージを動かします。細かな操作感覚が転移するため、実機を使う授業時間は操作に迷う時間ではなく、標本の観察に使えます。",
      },
      {
        q: "生物実験室はどのカリキュラムに対応していますか？",
        a: "細胞生物学や顕微鏡観察から解剖・生理学まで、KS3、GCSE、A-Level、IB、AP Biologyに対応しています。教師はAI実験ビルダーで独自の実習を作成することもできます。",
      },
    ],
    guideTitle: "教師向けガイドを読む",
    guideText:
      "バーチャル生物実験室の完全ガイドでは、解剖、顕微鏡観察、カリキュラムへの適合、バーチャルと対面実習の組み合わせ方を解説しています。",
    guideLink: "バーチャル生物実験室：解剖、顕微鏡観察など",
    caseLink: "事例：バーチャル腎臓解剖と特別支援を要する生徒のエンゲージメント",
    dissectionImageAlt: "WhimsyLabsのラボでバーチャル腎臓解剖を行う生徒たち",
    microscopeImageAlt: "WhimsyLabsのシミュレートされた顕微鏡でピントとステージを調整している様子",
    crossTitle: "他の教科のラボを見る",
    crossChemistry: "バーチャル化学実験室",
    crossPhysics: "バーチャル物理実験室",
  },
};
EXTRA.ja = EXTRA.jp;

/* English-only additions, on purpose: `extra` merges over EXTRA.en, so every
   language falls back to these until the wording has settled. */
const BIO_EXTRA = {
  eyebrows: {
    overview: "Overview",
    library: "Experiment library",
    ethics: "Ethics",
    assessment: "Assessment",
    benefits: "Why it works",
    curriculum: "Curriculum fit",
    faq: "Questions",
    next: "Read next",
    start: "Get started",
  },
  ethicsTitle: "No Animal Has To Die For A Lesson Plan",
  ethicsText1:
    "A school dissection costs a life, arrives frozen, and happens once. Students who object are handed a worksheet instead, and quietly learn less than everyone else in the room.",
  ethicsText2:
    "A virtual dissection has none of those problems. Every student does it, as many times as they need, with the same specimen — and can undo a bad cut instead of ruining the only heart in the box.",
  ethicsNote:
    "Specimens are anatomically modelled rather than photographed, so structures can be isolated, rotated and re-entered — which a real dissection cannot offer once the first incision is made.",
  ethicsPoints: [
    { name: "No specimens", note: "Nothing sourced, stored, or disposed of" },
    { name: "No opt-out gap", note: "Objecting students do the same practical" },
    { name: "Reversible", note: "A wrong cut is undone, not fatal" },
    { name: "Repeatable", note: "The same organ, as many times as needed" },
  ],
  detailWhat: "What students do",
  details: {
    microscopy: {
      what: "Prepare the slide, set the stage, and bring a real specimen into focus by working the coarse and fine adjustment — with the depth of field behaving as it actually does.",
      skills: ["Slide preparation", "Focusing technique", "Magnification choice", "Observation"],
    },
    dissection: {
      what: "Work through an anatomically modelled specimen layer by layer, identifying structures as they are exposed rather than reciting them from a diagram.",
      skills: ["Incision accuracy", "Structure identification", "Sequence", "Recording"],
    },
    dna: {
      what: "Extract, separate and read genetic material, following the procedure end to end instead of watching an animation of it.",
      skills: ["Procedure order", "Reagent handling", "Gel interpretation", "Analysis"],
    },
    photosynthesis: {
      what: "Vary light, carbon dioxide and temperature, and measure the rate of oxygen production as the plant actually responds.",
      skills: ["Variable control", "Measurement", "Data recording", "Rate analysis"],
    },
  },
  moreTitle: "Also in the library",
  more: [
    { name: "Osmosis and diffusion", note: "Potato cores, concentration gradients, mass change" },
    { name: "Enzyme activity", note: "pH and temperature effects on reaction rate" },
    { name: "Food tests", note: "Benedict's, biuret, iodine and emulsion tests" },
    { name: "Respiration", note: "Measuring gas exchange in germinating seeds" },
    { name: "Population sampling", note: "Quadrats, transects and abundance estimates" },
    { name: "Custom practicals", note: "Any procedure a teacher writes, built by the AI Experiment Builder" },
  ],
  variabilityTitle: "Every specimen, a different sample",
  variabilityNote: "Generated per student",
  whyLead:
    "Because a dissection you watch on a screen is a video, and a dissection you perform is a practical.",
  stats: [
    { n: "∞", l: "repeat attempts" },
    { n: "0", l: "specimens used" },
    { n: "100%", l: "of students take part" },
    { n: "24/7", l: "access in any browser" },
  ],
  compareTitle: "Virtual vs physical dissection",
  compareCol1: "WhimsyLabs",
  compareCol2: "Physical bench",
  compareRows: [
    { label: "Specimens required", virtual: "None", physical: "One per group, single use" },
    { label: "Repeat attempts", virtual: "Unlimited", physical: "None — the cut is final" },
    { label: "Students who opt out", virtual: "Still take part", physical: "Given a worksheet" },
    { label: "Evidence of technique", virtual: "Every action logged", physical: "Whatever the teacher saw" },
  ],
};

const BiologyPage = ({ t, language }) => {
  // Merge over English so copy added since the last translation pass still
  // renders in every language instead of coming out undefined.
  const extra = { ...EXTRA.en, ...(EXTRA[language] || {}), ...BIO_EXTRA };
  const eb = BIO_EXTRA.eyebrows;
  const pageRef = useRef(null);

  // Progressive enhancement only — the page is complete without this running.
  useEffect(() => initSubjectLab(pageRef.current), []);

  // Each tab carries its own hue (an AA-safe dark value for the selected tab
  // and skill fills, plus a soft tint for the panel badge) so the library
  // reads as four specimens rather than four grey buttons.
  const featured = [
    { key: "microscopy", shot: "/images/microscope.webp", hue: "#047857", soft: "rgba(14, 159, 110, 0.14)" },
    { key: "dissection", shot: "/images/kidney_barclays.jpg", hue: "#c2107a", soft: "rgba(224, 27, 132, 0.12)" },
    { key: "dna", shot: "/images/Sandbox.jpg", hue: "#6d4ae0", soft: "rgba(109, 74, 224, 0.13)" },
    { key: "photosynthesis", shot: "/images/potato.jpg", hue: "#b45309", soft: "rgba(245, 158, 11, 0.16)" },
  ];

  // One hue per ethics card, indexed against ethicsPoints
  const ETHICS_HUES = ["#0e9f6e", "#14b7ff", "#6d4ae0", "#f59e0b"];

  // Resting helix, rendered server-side so the strand exists without JS
  const H0 = 900;
  const strandPath = (offset) => {
    const pts = [];
    for (let y = -10; y <= H0 + 10; y += 6) {
      const tt = (y / 168) * Math.PI * 2 + offset;
      pts.push(`${(60 + Math.sin(tt) * 26).toFixed(2)},${y}`);
    }
    return `M${pts.join(" L")}`;
  };

  return (
    <main className="lab-page lab-page--biology" ref={pageRef}>
      <Header language={language} />

      {/* The strand spans everything between header and footer */}
      <div className="lab-body" data-lab-body>
        <div className="lab-rail lab-rail--left" data-lab-strand-rail aria-hidden="true">
          <div className="lab-rail-sticky">
            <div className="lab-instrument">
              <svg className="lab-strand" viewBox={`0 0 120 ${H0}`} data-lab-strand focusable="false">
                <g data-strand-rungs />
                <path data-strand-a d={strandPath(0)} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <path data-strand-b d={strandPath(Math.PI)} fill="none" stroke="var(--lab-accent)" strokeWidth="3.5" strokeLinecap="round" />
                <g data-strand-marks />
              </svg>
              <div className="lab-readout" data-lab-readout>0.0 turns</div>
            </div>
          </div>
        </div>

        {/* ================= Hero ================= */}
        <section className="lab-hero lab-band lab-band--dark lab-band--tex" data-lab-band="dark">
          <Wave flip />
          <div className="container">
            <div className="lab-hero-grid">
              <div>
                {/* Keeps the exact "Virtual Lab" phrase validate-page-content
                    requires on every language, as the old brand tag did. */}
                <span className="lab-eyebrow">WhimsyLabs Virtual Lab · Biology</span>
                <h1 className="lab-hero-title">{t("biology.hero.title")}</h1>
                <p className="lab-hero-sub">{t("biology.hero.subtitle")}</p>
                <div className="lab-hero-cta">
                  <a href={getLocalizedPath("/contact/", language)} className="lab-btn">
                    {t("biology.hero.cta")}
                  </a>
                  <a href={getLocalizedPath("/features/", language)} className="lab-btn-ghost">
                    {t("biology.hero.ctaSecondary")}
                  </a>
                </div>
              </div>
              <div className="lab-hero-art" aria-hidden="true">
                <figure className="lab-shot">
                  <img src="/images/kidney_barclays.jpg" alt="" loading="eager" />
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
                <h2 className="section-title">{t("biology.intro.title")}</h2>
                <p className="section-text">{t("biology.intro.text1")}</p>
                <p className="section-text">{t("biology.intro.text2")}</p>
              </div>
              <div className="section-visual animate-on-scroll">
                <div className="mockup-container">
                  <div className="mockup-header">
                    <span className="mockup-title">{extra.variabilityTitle}</span>
                    <span className="mockup-badge">{extra.variabilityNote}</span>
                  </div>
                  <div className="mockup-content">
                    <div className="actual-row">
                      <span className="actual-property">Specimen mass</span>
                      <span className="actual-value highlight">142.7 g</span>
                      <span className="actual-deviation">+2.1%</span>
                    </div>
                    <div className="actual-row">
                      <span className="actual-property">Stage temp</span>
                      <span className="actual-value">21.6°C</span>
                      <span className="actual-deviation subtle">ambient</span>
                    </div>
                    <div className="actual-row">
                      <span className="actual-property">Stain uptake</span>
                      <span className="actual-value">96.4%</span>
                      <span className="actual-deviation">-1.2%</span>
                    </div>
                  </div>
                </div>
                {/* Blurred product frame behind the play button, so the box
                    reads as a video and not a flat gradient */}
                <div
                  className="lab-video lab-video--poster"
                  style={{ marginTop: "18px", "--poster": "url(/images/microscope.webp)" }}
                >
                  <span className="lab-video-play" aria-hidden="true"></span>
                  <span className="lab-video-label">VIDEO — LAB WALKTHROUGH</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ---- Experiments ---- */}
        <section className="lab-band lab-band--tint lab-band--pad" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="animate-on-scroll lab-head-center">
              <span className="lab-eyebrow">{eb.library}</span>
              <h2 className="section-title">{t("biology.experiments.title")}</h2>
              <p className="section-text">{t("biology.experiments.subtitle")}</p>
            </div>

            <div data-lab-tabs>
              <div className="lab-tablist" role="tablist" aria-label={t("biology.experiments.title")}>
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
                    {t(`biology.experiments.${f.key}.title`)}
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
                      <span className="mockup-title">{t(`biology.experiments.${f.key}.title`)}</span>
                      <span className="mockup-badge">Live simulation</span>
                    </div>
                    <div className="mockup-content">
                      <div className="lab-panel-grid">
                        <div>
                          <p className="section-text">{t(`biology.experiments.${f.key}.desc`)}</p>
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
                            alt={`${t(`biology.experiments.${f.key}.title`)} in the WhimsyLabs virtual biology lab`}
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
                  <li key={m.name}><b>{m.name}</b> — {m.note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---- Ethics, encapsulated: bilayer above and below, so the section
                 is literally held inside a membrane ---- */}
        <section className="lab-band lab-cell" data-lab-band="light" data-lab-section>
          <div className="lab-membrane lab-membrane--top" data-lab-membrane aria-hidden="true">
            <canvas></canvas>
          </div>
          <div className="lab-cell-inner">
          <div className="container">
            <div className="section-grid">
              <div className="section-content animate-on-scroll">
                <span className="lab-eyebrow">{eb.ethics}</span>
                <h2 className="section-title">{extra.ethicsTitle}</h2>
                <p className="section-text">{extra.ethicsText1}</p>
                <p className="section-text">{extra.ethicsText2}</p>
                <div className="lab-hazards">
                  {extra.ethicsPoints.map((h, i) => (
                    <div
                      className="lab-hazard lab-hazard--hue"
                      key={h.name}
                      style={{ "--hz": ETHICS_HUES[i % ETHICS_HUES.length] }}
                    >
                      <b>{h.name}</b>
                      <span>{h.note}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section-visual animate-on-scroll">
                <figure className="lab-figure">
                  <img src="/images/kidney_barclays.jpg" alt={extra.dissectionImageAlt} loading="lazy" />
                  {/* aria-hidden: the alt attribute already conveys this to AT */}
                  <figcaption aria-hidden="true">{extra.ethicsNote}</figcaption>
                </figure>
              </div>
            </div>
          </div>
          </div>
          <div className="lab-membrane lab-membrane--bottom" data-lab-membrane aria-hidden="true">
            <canvas></canvas>
          </div>
        </section>


        {/* ---- Assessment ---- */}
        <section className="lab-band lab-band--light" data-lab-band="light" data-lab-section>
          <div className="container">
            <div className="section-grid reverse">
              <div className="section-visual animate-on-scroll">
                <div className="mockup-container">
                  <div className="mockup-header">
                    <span className="mockup-title">Dissection · skills breakdown</span>
                    <span className="mockup-badge">From actions, not answers</span>
                  </div>
                  <div className="mockup-content">
                    <div className="skills-section">
                      {[
                        ["Incision accuracy", 86],
                        ["Structure identification", 94],
                        ["Slide preparation", 78],
                        ["Observation recording", 88],
                        ["Lab safety", 93],
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

        {/* ---- Why virtual biology labs ---- */}
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
                <h2 className="section-title">{t("biology.benefits.title")}</h2>
                {["ethical", "repeat", "detail", "progress"].map((k) => (
                  <p className="section-text" key={k}>
                    <b>{t(`biology.benefits.${k}.title`)}.</b> {t(`biology.benefits.${k}.desc`)}
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
              <h2 className="section-title">{t("biology.curriculum.title")}</h2>
              <p className="section-text">{t("biology.curriculum.text")}</p>
              <div className="lab-tags">
                {[
                  "GCSE", "A-Level", "KS3", "KS4",
                  "AP Biology", "NGSS", "US High School Biology",
                  "IB Diploma", "Scottish Highers", "Australian Curriculum",
                ].map((tag) => (
                  <span className="lab-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

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
                  <a className="lab-link" href={getLocalizedPath("/blog/virtual-biology-lab-dissections-microscopy/", language)}>
                    {extra.guideLink}
                  </a>
                </li>
                <li>
                  <a className="lab-link" href={getLocalizedPath("/blog/virtual-kidney-dissection-send-engagement/", language)}>
                    {extra.caseLink}
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

        {/* ================= CTA ================= */}
        {/* Tiled like the hero, so the page ends where it began */}
        <section
          className="lab-band lab-band--dark lab-band--tiled lab-band--tex"
          data-lab-band="dark"
          style={{ padding: "90px 0" }}
        >
          <Wave />
          <div className="container">
            <div className="animate-on-scroll">
              <span className="lab-eyebrow">{eb.start}</span>
              <h2 className="section-title">{t("biology.cta.title")}</h2>
              <p className="section-text">{t("biology.cta.text")}</p>
              <div className="lab-hero-cta" style={{ marginTop: "24px" }}>
                <a href={getLocalizedPath("/contact/", language)} className="lab-btn">
                  {t("biology.cta.button")}
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

export default withTranslation(BiologyPage);
