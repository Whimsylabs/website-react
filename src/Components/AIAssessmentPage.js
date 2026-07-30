import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import { getLocalizedPath } from "../i18n";
import "./AIAssessmentPage.css";

// Pillar page consolidating the AI-assessment blog cluster
// (Posts 20, 36, 37, 39, 40, 43) into a single landing page.
const AIAssessmentPage = ({ language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Header currentLang={language} />

      {/* Hero */}
      <section className="aia-hero">
        <div className="container py-4">
          <h1 className="aia-title">
            AI-Proof Assessment: Grade the Process, Not the Product
          </h1>
          <p className="aia-subtitle">
            Generative AI can write any lab report, but it cannot perform a
            titration. WhimsyLabs assesses what students actually do in the
            lab &mdash; their technique, decisions, and safety &mdash; so there is
            nothing for AI to fake and nothing for teachers to police.
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

      <BubbleContainer>
        <section className="aia-content" aria-label="AI-proof assessment explained">
          {/* Q1 */}
          <div className="aia-section">
            <h2>Why Doesn&rsquo;t AI Detection Work?</h2>
            <p className="aia-answer">
              <strong>Direct answer:</strong> AI detectors cannot reliably tell
              human writing from machine writing, and their false accusations
              harm real students. Independent analyses cited by Nesenoff &amp;
              Miltenberg put detector false-positive rates between 5% and 20%,
              and a study presented at the 2024 American Educational Research
              Association conference found AI and human graders reach exact
              agreement only about 40% of the time.
            </p>
            <p>
              Detection also creates an adversarial classroom: students are
              treated as cheating until proven innocent, and non-native English
              speakers and neurodivergent students are flagged most often.
              Pearson&rsquo;s 2025 formative-assessment research found 82% of
              educators are concerned about students using generative AI on
              assignments &mdash; yet two years of detection tools have not
              resolved that concern, because catching AI text does nothing to
              restore the learning the assignment was meant to produce. The
              fix is not better policing; it is assessing work AI cannot do.
            </p>
          </div>

          {/* Q2 */}
          <div className="aia-section">
            <h2>What Is Process-Based Assessment?</h2>
            <p className="aia-answer">
              <strong>Direct answer:</strong> Process-based assessment grades
              <em> how</em> a student works &mdash; their hypotheses, technique,
              decisions, and responses to unexpected results &mdash; rather than
              only the final answer they submit. Because the reasoning and the
              physical actions must be the student&rsquo;s own, there is nothing
              a chatbot can generate on their behalf.
            </p>
            <p>
              A correct molarity at the end of a titration tells you almost
              nothing: the student may have reasoned carefully, copied a
              neighbour, or guessed. Process data tells you everything the
              number hides &mdash; whether they removed air bubbles from the
              burette, added reagent dropwise near the endpoint, and repeated
              anomalous measurements. Pearson&rsquo;s research found educators
              rank essays and multiple-choice questions as most vulnerable to
              AI misuse, and simulations as least vulnerable. Practical,
              simulated work is where assessment can still be trusted.
            </p>
          </div>

          {/* Q3 */}
          <div className="aia-row">
            <div className="aia-row-text">
              <h2>How Does WhimsyLabs Grade the Process?</h2>
              <p className="aia-answer">
                <strong>Direct answer:</strong> WhimsyLabs logs every action a
                student takes in the virtual lab &mdash; equipment handling,
                measurement precision, timing, and safety compliance &mdash; and
                its AI suggests grades across five dimensions (experimental
                procedure, data collection, calculations, lab safety, and
                scientific communication) for the teacher to review and approve.
              </p>
              <p>
                Each AI suggestion carries a confidence level, so teachers can
                see where automated assessment is reliable and where human
                judgement matters more. Student behaviour is compared against
                expert pathways for each experiment, revealing gaps that written
                reports never show &mdash; like the student who can explain why
                swirling matters but never swirls the flask. Follow-up questions
                are tied to each student&rsquo;s own experimental data, so a
                generic AI answer is no help.
              </p>
              <p>
                Physical actions also remove the ambiguity that breaks
                text-based AI grading. A virtual pipette that recorded 2.47 mL
                transferred needs no interpretation &mdash; there are no synonyms
                for a physical action, and no semantics to misread.
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

          {/* Q4 */}
          <div className="aia-row reverse">
            <div className="aia-row-text">
              <h2>Is the AI Safe for Students?</h2>
              <p className="aia-answer">
                <strong>Direct answer:</strong> Yes &mdash; because WhimsyCat,
                our AI tutor and assessor, has no student chat window. It infers
                everything from students&rsquo; actions in the lab: pupils never
                type prompts and never receive generated text.
              </p>
              <p>
                The risks the Department for Education&rsquo;s 2026 generative AI
                product safety standards target &mdash; manipulation, dependence,
                harmful generated content, jailbreaking &mdash; all flow from an
                open chat channel pointed at a child. WhimsyCat removes that
                channel by design: there is nothing to jailbreak, no
                conversation to grow dependent on, and no free text generation
                to filter. Signs of struggle or frustration are inferred from
                behaviour (repeated failed attempts, long hesitation) and
                surfaced to the teacher, who stays the human in the loop.
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
                src="/images/teachdash.jpg"
                alt="WhimsyLabs teacher dashboard showing class overview, grading queue, and per-student performance data"
                loading="lazy"
              />
            </div>
          </div>

          {/* Q5 */}
          <div className="aia-section">
            <h2>Do Students Really Use AI That Much?</h2>
            <p className="aia-answer">
              <strong>Direct answer:</strong> Yes. The Higher Education Policy
              Institute&rsquo;s 2026 Student Generative AI Survey found 94% of UK
              undergraduates use generative AI to help with assessed work, and
              12% directly include AI-generated text in submissions.
            </p>
            <p>
              That figure is not evidence of mass cheating &mdash; it is evidence
              that grading outputs AI can produce effortlessly no longer
              measures learning. As long as assessment rewards the final
              document, using AI to produce it is a rational response to the
              incentives. Assessing the process realigns those incentives:
              students can still use AI to study, but the skills being graded
              &mdash; technique, observation, adapting when an experiment goes
              wrong &mdash; must be demonstrated first-hand.
            </p>
          </div>

          {/* Authorities */}
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
                concludes that assessment models focused solely on final
                outputs are becoming inadequate, urging educators to evaluate
                how students engage with learning &mdash; and warns of
                &ldquo;cognitive offloading,&rdquo; citing studies where
                AI-assisted students completed tasks 48% more successfully but
                performed 17% worse once the AI was removed.
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
                training on pupils&rsquo; work without consent &mdash;
                requirements WhimsyCat meets by architecture, not retrofitted
                filters.
              </li>
              <li>
                <a
                  href="https://plc.pearson.com/en-GB/news-and-insights/assessment-evolved-redefining-formative-assessment-in-a-generative-ai-era"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pearson&rsquo;s Assessment Evolved report
                </a>{" "}
                recommends using AI as a &ldquo;force multiplier for formative
                assessment&rdquo; while educators remain in control, and the{" "}
                <a
                  href="https://www.hepi.ac.uk/reports/student-generative-ai-survey-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HEPI 2026 survey
                </a>{" "}
                concludes institutions must ensure AI enhances learning rather
                than diminishing it.
              </li>
            </ul>
          </div>

          {/* Go deeper */}
          <div className="aia-deeper">
            <h2>Go Deeper: The Research Behind This Page</h2>
            <ul className="aia-deeper-list">
              <li>
                <a href={getLocalizedPath("/blog/ai-assessment-crisis-solution/", language)}>
                  AI Detection Doesn&rsquo;t Work. Process-Based Assessment Does.
                </a>{" "}
                &mdash; why detection tools fail and what Pearson&rsquo;s 82%
                figure really tells us about assessment design.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/ai-text-grading-fails-process-assessment-works/", language)}>
                  When AI Misreads &ldquo;At Least One&rdquo;: Why Text-Based Grading Fails
                </a>{" "}
                &mdash; how semantic ambiguity breaks AI essay grading, and why
                physical actions have no synonyms.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/process-based-lab-assessment-future/", language)}>
                  Grading the Process, Not the Answer: The Future of Lab Assessment
                </a>{" "}
                &mdash; how Arizona State&rsquo;s Dreamscape Learn grades
                reasoning pathways, and what process data reveals about learning.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/oecd-process-oriented-assessment-validation/", language)}>
                  OECD Says Grade the Process, Not the Product
                </a>{" "}
                &mdash; what the OECD Digital Education Outlook 2026 recommends
                and what it means for science teachers.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/student-ai-use-assessment-crisis-solution/", language)}>
                  94% of Students Use AI for Assessed Work. Here&rsquo;s Why That&rsquo;s Not the Problem.
                </a>{" "}
                &mdash; the HEPI 2026 survey findings and why assessment, not
                students, must change.
              </li>
              <li>
                <a href={getLocalizedPath("/blog/dfe-ai-safety-standards-tutor-checklist/", language)}>
                  How WhimsyCat Meets the DfE AI Safety Standards Without a Chat Box
                </a>{" "}
                &mdash; why an action-observing tutor with no student chat window
                designs out the risks the standards regulate.
              </li>
            </ul>
          </div>

          {/* Final CTA */}
          <div className="aia-cta">
            <h2>Make Your Practical Assessment AI-Proof</h2>
            <p>
              See how process-based grading works in your own lessons &mdash;
              from the student&rsquo;s lab bench to the teacher&rsquo;s grading
              queue.
            </p>
            <div className="aia-hero-ctas">
              <a href={getLocalizedPath("/contact/", language)} className="aia-btn aia-btn-light">
                Get in Touch
              </a>
              <a href={getLocalizedPath("/features/", language)} className="aia-btn aia-btn-outline">
                See All Features
              </a>
            </div>
          </div>
        </section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default AIAssessmentPage;
