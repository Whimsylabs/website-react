import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import { getLocalizedPath } from "../i18n";
import "./AIAssessmentPage.css";

// Pillar page consolidating the AI-assessment blog cluster
// (Posts 20, 36, 37, 39, 40, 43) into a single landing page.

// Numbered citation superscript, links to the references list
const Cite = ({ n }) => (
  <sup className="aia-cite">
    <a href={`#aia-ref-${n}`} aria-label={`Citation ${n}`}>[{n}]</a>
  </sup>
);

// Session log row for the "under the hood" mockup
const LogRow = ({ time, cat, catClass, text, flag }) => (
  <div className={`aia-log-row ${flag ? "flagged" : ""}`}>
    <span className="aia-log-time">{time}</span>
    <span className={`aia-log-cat ${catClass}`}>{cat}</span>
    <span className="aia-log-text">{text}</span>
  </div>
);

const AIAssessmentPage = ({ language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Header currentLang={language} />

      {/* Hero: dark band */}
      <section className="aia-hero">
        <div className="aia-hero-pattern"></div>
        <div className="aia-hero-card">
          <div className="aia-award-chips">
            <span className="aia-chip">🏆 BETT 2025 Kids&rsquo; Judge Award</span>
            <span className="aia-chip">⭐ Tech&amp;Learning Best of BETT 2026</span>
          </div>
          <h1 className="aia-title">
            AI-Proof Assessment: Grade the Process, Not the Product
          </h1>
          <p className="aia-subtitle">
            Generative AI can write any lab report, but it can&rsquo;t do a
            titration. WhimsyLabs grades what students actually do in the lab:
            their technique, their decisions, their safety habits. There&rsquo;s
            nothing for AI to fake, and nothing for you to police.
          </p>
          <p className="aia-byline">
            Written by{" "}
            <a href="https://www.linkedin.com/in/drmarisafrench/" target="_blank" rel="noopener noreferrer">
              Dr Marisa French
            </a>
          </p>
          <div className="aia-hero-ctas">
            <a href={getLocalizedPath("/contact/", language)} className="aia-btn aia-btn-primary">
              Book a Demo
            </a>
            <a href={getLocalizedPath("/features/", language)} className="aia-btn aia-btn-secondary">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Stats: lavender tint band */}
      <section className="aia-stats" aria-label="The assessment problem in three numbers">
        <div className="aia-stat">
          <span className="aia-stat-value">94%</span>
          <span className="aia-stat-label">
            of UK undergraduates use generative AI to help with assessed work<Cite n={4} />
          </span>
        </div>
        <div className="aia-stat">
          <span className="aia-stat-value">40%</span>
          <span className="aia-stat-label">
            how often AI and human graders agree exactly when marking the same essay<Cite n={2} />
          </span>
        </div>
        <div className="aia-stat">
          <span className="aia-stat-value">82%</span>
          <span className="aia-stat-label">
            of educators worry about students using generative AI on assignments<Cite n={3} />
          </span>
        </div>
      </section>

      {/* Band: white. The problem, side by side */}
      <section className="aia-band aia-band--white" aria-label="Why detection fails and what to do instead">
        <div className="aia-inner">
          <div className="aia-duo">
            <div className="aia-duo-card">
              <h2>Why Doesn&rsquo;t AI Detection Work?</h2>
              <p className="aia-answer">
                <strong>Direct answer:</strong> AI detectors can&rsquo;t
                reliably tell human writing from machine writing, and their
                mistakes land on real students. Reported false-positive rates
                run between 5% and 20%<Cite n={1} />, and a study presented at
                the 2024 American Educational Research Association conference
                found AI and human graders reach exact agreement only about
                40% of the time<Cite n={2} />.
              </p>
              <p>
                Detection also turns the classroom adversarial. Students are
                treated as cheats until proven innocent, and the tools flag
                non-native English speakers and neurodivergent students most
                often. In Pearson&rsquo;s 2025 formative-assessment research,
                82% of educators said they were concerned about students using
                generative AI on assignments<Cite n={3} />. Two years of
                detection tools haven&rsquo;t shifted that number, because
                catching AI text doesn&rsquo;t bring back the learning the
                assignment was meant to produce. The fix isn&rsquo;t better
                policing. It&rsquo;s setting work AI can&rsquo;t do.
              </p>
            </div>
            <div className="aia-duo-card">
              <h2>What Is Process-Based Assessment?</h2>
              <p className="aia-answer">
                <strong>Direct answer:</strong> Process-based assessment grades
                <em> how</em> a student works: their hypotheses, technique,
                decisions, and how they respond when something unexpected
                happens, rather than only the final answer they hand in. The
                reasoning and the physical actions have to be the
                student&rsquo;s own, so there&rsquo;s nothing a chatbot can
                produce on their behalf.
              </p>
              <p>
                A correct molarity at the end of a titration tells you very
                little on its own. The student may have reasoned carefully,
                copied a neighbour, or guessed. The process tells you what the
                number hides: did they clear the air bubble from the burette,
                slow to dropwise near the endpoint, and repeat the anomalous
                reading? Pearson&rsquo;s research found educators rank essays
                and multiple-choice questions as the formats most vulnerable
                to AI misuse, and simulations as the least<Cite n={3} />.
                Practical, simulated work is where assessment can still be
                trusted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Band: soft tint. How grading works */}
      <section className="aia-band aia-band--tint" aria-label="How WhimsyLabs grades the process">
        <div className="aia-inner">
          <div className="aia-row">
            <div className="aia-row-text">
              <h2>How Does WhimsyLabs Grade the Process?</h2>
              <p className="aia-answer">
                <strong>Direct answer:</strong> WhimsyLabs logs every action a
                student takes in the virtual lab, from equipment handling to
                measurement precision, timing, and safety. Its AI then
                suggests grades across five dimensions (experimental
                procedure, data collection, calculations, lab safety, and
                scientific communication) for you to review and approve.
              </p>
              <p>
                Each suggestion carries a confidence level, so you can see
                where the automated marking is dependable and where your
                judgement matters more. Student behaviour is compared with
                expert pathways for each experiment, which surfaces the gaps
                written reports never show, like the student who can explain
                why swirling matters but never swirls the flask. Follow-up
                questions are built from each student&rsquo;s own experimental
                data, so a generic AI answer is no help.
              </p>
              <p>
                Physical actions also remove the ambiguity that breaks
                text-based AI marking. A virtual pipette that recorded 2.47 mL
                transferred needs no interpretation. There are no synonyms for
                a physical action, and no wording to misread.
              </p>
            </div>
            <div className="aia-row-image">
              <img
                src="/images/grading dashboard.jpg"
                alt="WhimsyLabs AI grading breakdown scoring experimental procedure, data collection, lab safety, and scientific communication for a student"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Band: bubble gradient. WhimsyCat safety */}
      <BubbleContainer speed={12}>
        <div className="aia-inner">
          <div className="aia-safety-card">
            <div className="aia-row reverse">
              <div className="aia-row-text">
                <h2>Is the AI Safe for Students?</h2>
                <p className="aia-answer">
                  <strong>Direct answer:</strong> Yes, because WhimsyCat, our
                  AI tutor and assessor, has no student chat window. It works
                  everything out from students&rsquo; actions in the lab.
                  Pupils never type prompts and never receive generated text.
                </p>
                <p>
                  The risks the Department for Education&rsquo;s 2026
                  generative AI product safety standards target (manipulation,
                  dependence, harmful generated content, jailbreaking) all
                  start with an open chat channel pointed at a
                  child<Cite n={6} />. WhimsyCat removes that channel by
                  design. There is nothing to jailbreak, no conversation to
                  grow dependent on, and no free text to filter. Signs of
                  struggle or frustration, like repeated failed attempts or a
                  long hesitation, are picked up from behaviour and flagged to
                  the teacher, who stays the human in the loop.
                </p>
                <p>
                  Read the full breakdown in{" "}
                  <a href={getLocalizedPath("/blog/dfe-ai-safety-standards-tutor-checklist/", language)}>
                    how WhimsyCat meets the DfE AI safety standards without a chat box
                  </a>.
                </p>
              </div>
              <div className="aia-row-image">
                <img
                  src="/images/whimsycat-observing.jpg"
                  alt="WhimsyCat, the WhimsyLabs AI tutor, observing a student's virtual experiment without a chat window"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </BubbleContainer>

      {/* Band: dark. Under the hood */}
      <section className="aia-band aia-band--dark" id="how-it-works" aria-label="How action-based grading works">
        <div className="aia-inner">
          <h2>Under the Hood: How Action-Based Grading Actually Works</h2>
          <p className="aia-answer aia-answer-dark">
            <strong>Direct answer:</strong> Every session runs through five
            stages: capture, structure, assess, guide, and replay. Actions
            are logged in the simulation, compared against the expected
            pathway for that practical, and graded by a language model we
            fine-tuned for lab work. At no stage does a student type
            anything.
          </p>
          <div className="aia-pipeline-grid">
            <ol className="aia-pipeline-list">
              <li>
                <strong>Capture.</strong> Our action logger records every
                meaningful event in the lab across more than forty
                categories: reagent additions, pours and pipette transfers,
                heating and stirring, reaction milestones, equipment
                connections, and safety events. Hand and head movement is
                sampled five times a second, so hesitation and technique are
                part of the record. The logger also knows <em>why</em> things
                changed. It can tell a reagent the student added from one
                produced by a reaction, so a lucky accident never grades the
                same as a deliberate step.
              </li>
              <li>
                <strong>Structure.</strong> The raw stream is condensed into
                a compact session log: every action timestamped, with its
                safety level and outcome. The same log exports as a
                plain-English report, so nothing the AI sees is hidden from
                you.
              </li>
              <li>
                <strong>Assess.</strong> The log is compared with the
                expected actions and outcomes for that practical: what a
                competent scientist would have done, and what should have
                resulted. A language model we fine-tuned for this job
                suggests grades across the five skill areas, each with a
                confidence level, for you to review. It was trained on
                synthetic lab sessions we generate in-house, covering
                correct and flawed procedures at every skill level. It is
                never trained on pupils&rsquo; data.
              </li>
              <li>
                <strong>Guide.</strong> WhimsyCat runs off the same action
                stream. When the pattern says a student is stuck, it
                responds with guidance drawn from a library of pre-written,
                cached responses. Nothing is generated live in front of a
                student, and there is no text prompt anywhere in the student
                experience.
              </li>
              <li>
                <strong>Replay.</strong> Because the log is complete, any
                session can be replayed. You can scrub to the exact moment a
                titration went wrong and watch it happen, students can
                review their own technique, and every suggested grade has a
                visible evidence trail behind it.
              </li>
            </ol>
            <div className="aia-log-mockup" aria-hidden="true">
              <div className="aia-log-header">
                <span className="aia-log-title">Lab Session Log</span>
                <span className="aia-log-badge">Live</span>
              </div>
              <div className="aia-log-body">
                <LogRow time="00:12" cat="Safety" catClass="cat-safety" text="Put on safety goggles" />
                <LogRow time="02:34" cat="Equipment" catClass="cat-equipment" text="Picked up 250mL conical flask" />
                <LogRow time="03:18" cat="Transfer" catClass="cat-transfer" text="Pipetted 25.00mL HCl into flask" />
                <LogRow time="05:02" cat="Reagent" catClass="cat-reagent" text="Added 3 drops phenolphthalein" />
                <LogRow time="09:47" cat="Safety" catClass="cat-safety" text="Bench spillage cleaned promptly" flag />
                <LogRow time="14:21" cat="Reaction" catClass="cat-reaction" text="Neutralisation endpoint detected" />
              </div>
              <div className="aia-log-footer">
                <span className="aia-log-score">Safety score: 96/100</span>
                <span className="aia-log-replay">▶ Replay available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band: white. Student AI use + authorities */}
      <section className="aia-band aia-band--white" aria-label="Student AI use and what the authorities say">
        <div className="aia-inner">
          <div className="aia-section">
            <h2>Do Students Really Use AI That Much?</h2>
            <p className="aia-answer">
              <strong>Direct answer:</strong> Yes. The Higher Education Policy
              Institute&rsquo;s 2026 Student Generative AI Survey found 94% of
              UK undergraduates use generative AI to help with assessed work,
              and 12% put AI-generated text straight into their
              submissions<Cite n={4} />.
            </p>
            <p>
              That figure isn&rsquo;t evidence of mass cheating. It&rsquo;s
              evidence that grading things AI produces effortlessly no longer
              measures learning. While the mark rewards the final document,
              using AI to make it is the rational move. Grade the process
              instead and the incentives flip: students can still use AI to
              revise, but the skills being marked (technique, observation,
              adapting when a practical goes wrong) have to be shown
              first-hand.
            </p>
          </div>

          <div className="aia-authorities">
            <h2>What Do the OECD and DfE Say?</h2>
            <p className="aia-answer">
              <strong>Direct answer:</strong> Both point the same way. The OECD
              recommends process-oriented assessment for the AI age, and the
              DfE&rsquo;s AI safety standards reward tools that avoid open
              generative chat with pupils.
            </p>
            <ul className="aia-authority-list">
              <li>
                The{" "}
                <a
                  href="https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OECD Digital Education Outlook 2026
                </a>{" "}
                concludes that assessment focused only on final outputs is
                becoming inadequate, and urges educators to look at how
                students engage with learning. It also warns about cognitive
                offloading, citing studies where AI-assisted students
                completed tasks 48% more successfully but performed 17% worse
                once the AI was taken away<Cite n={5} />.
              </li>
              <li>
                The{" "}
                <a
                  href="https://www.gov.uk/government/publications/generative-ai-product-safety-standards/generative-ai-product-safety-standards"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DfE&rsquo;s generative AI product safety standards
                </a>{" "}
                (updated January 2026) require AI tools in schools to guard
                against manipulation, dependence, harmful content, and
                training on pupils&rsquo; work without consent. WhimsyCat
                meets these requirements by architecture, not by retrofitted
                filters<Cite n={6} />.
              </li>
              <li>
                <a
                  href="https://plc.pearson.com/en-GB/news-and-insights/assessment-evolved-redefining-formative-assessment-in-a-generative-ai-era"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pearson&rsquo;s Assessment Evolved report
                </a>{" "}
                recommends using AI as a force multiplier for formative
                assessment while educators keep control<Cite n={3} />, and
                the{" "}
                <a
                  href="https://www.hepi.ac.uk/reports/student-generative-ai-survey-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HEPI 2026 survey
                </a>{" "}
                concludes institutions must make sure AI enhances learning
                rather than diminishing it<Cite n={4} />.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Band: tint. Go deeper + references */}
      <section className="aia-band aia-band--tint" aria-label="Further reading and references">
        <div className="aia-inner">
          <div className="aia-deeper">
            <h2>Go Deeper: The Research Behind This Page</h2>
            <ul className="aia-deeper-list">
              <li>
                <a href={getLocalizedPath("/blog/ai-assessment-crisis-solution/", language)}>
                  AI Detection Doesn&rsquo;t Work. Process-Based Assessment Does.
                </a>{" "}
                Why detection tools fail, and what Pearson&rsquo;s 82% figure
                really tells us about assessment design.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/ai-text-grading-fails-process-assessment-works/", language)}>
                  When AI Misreads &ldquo;At Least One&rdquo;: Why Text-Based Grading Fails
                </a>{" "}
                How semantic ambiguity breaks AI essay grading, and why
                physical actions have no synonyms.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/process-based-lab-assessment-future/", language)}>
                  Grading the Process, Not the Answer: The Future of Lab Assessment
                </a>{" "}
                How Arizona State&rsquo;s Dreamscape Learn grades reasoning
                pathways, and what process data reveals about learning.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/oecd-process-oriented-assessment-validation/", language)}>
                  OECD Says Grade the Process, Not the Product
                </a>{" "}
                What the OECD Digital Education Outlook 2026 recommends, and
                what it means for science teachers.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/student-ai-use-assessment-crisis-solution/", language)}>
                  94% of Students Use AI for Assessed Work. Here&rsquo;s Why That&rsquo;s Not the Problem.
                </a>{" "}
                The HEPI 2026 survey findings, and why assessment, not
                students, must change.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/dfe-ai-safety-standards-tutor-checklist/", language)}>
                  How WhimsyCat Meets the DfE AI Safety Standards Without a Chat Box
                </a>{" "}
                Why an action-observing tutor with no student chat window
                designs out the risks the standards regulate.
              </li>
            </ul>
          </div>

          <div className="aia-references" id="aia-references">
            <h2>References</h2>
            <ol className="aia-reference-list">
              <li id="aia-ref-1">
                CT Mirror (2026).{" "}
                <a href="https://ctmirror.org/2026/03/05/my-school-is-grading-me-with-ai-it-got-my-grade-wrong/" target="_blank" rel="noopener noreferrer">
                  My school is grading me with AI. It got my grade wrong.
                </a>
              </li>
              <li id="aia-ref-2">
                The Hechinger Report.{" "}
                <a href="https://hechingerreport.org/proof-points-ai-essay-grading/" target="_blank" rel="noopener noreferrer">
                  Proof Points: AI essay grading
                </a>
              </li>
              <li id="aia-ref-3">
                Pearson (2025).{" "}
                <a href="https://plc.pearson.com/en-GB/news-and-insights/assessment-evolved-redefining-formative-assessment-in-a-generative-ai-era" target="_blank" rel="noopener noreferrer">
                  Assessment Evolved: Redefining Formative Assessment in a Generative AI Era
                </a>
              </li>
              <li id="aia-ref-4">
                Higher Education Policy Institute (2026).{" "}
                <a href="https://www.hepi.ac.uk/reports/student-generative-ai-survey-2026/" target="_blank" rel="noopener noreferrer">
                  Student Generative AI Survey 2026
                </a>
              </li>
              <li id="aia-ref-5">
                OECD (2026).{" "}
                <a href="https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html" target="_blank" rel="noopener noreferrer">
                  OECD Digital Education Outlook 2026
                </a>
              </li>
              <li id="aia-ref-6">
                Department for Education (2026).{" "}
                <a href="https://www.gov.uk/government/publications/generative-ai-product-safety-standards/generative-ai-product-safety-standards" target="_blank" rel="noopener noreferrer">
                  Generative AI Product Safety Standards
                </a>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Band: dark. Final CTA */}
      <section className="aia-cta">
        <h2>Make Your Practical Assessment AI-Proof</h2>
        <p>
          See how process-based grading works in your own lessons, from the
          student&rsquo;s lab bench to your grading queue.
        </p>
        <div className="aia-hero-ctas">
          <a href={getLocalizedPath("/contact/", language)} className="aia-btn aia-btn-light">
            Get in Touch
          </a>
          <a href={getLocalizedPath("/features/", language)} className="aia-btn aia-btn-outline">
            See All Features
          </a>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
};

export default AIAssessmentPage;
