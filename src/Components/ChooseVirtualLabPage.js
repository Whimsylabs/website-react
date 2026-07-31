import React from "react";
import "./ChooseVirtualLabPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import { getLocalizedPath } from "../i18n";

const ChooseVirtualLabPage = ({ language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Header currentLang={language} />

      <section className="cvl-page" aria-label="Virtual lab software buyer's guide">
        {/* Hero */}
        <div className="cvl-hero">
          <h1>How to Choose Virtual Lab Software: A Buyer&rsquo;s Guide for Schools</h1>
          <p className="cvl-hero-lede">
            The right virtual lab depends on what you want students to learn. If the goal is
            genuine practical skill, the two questions that separate platforms are: does the
            software simulate real physics or play scripted animations, and does it assess the
            process students follow or just their final answers? This guide gives you a working
            checklist, the questions to put to vendors, and an honest look at where WhimsyLabs
            fits.
          </p>
        </div>

        {/* What to look for */}
        <div className="cvl-section">
          <h2>What Should Schools Look for in Virtual Lab Software?</h2>
          <p>
            <strong>Look first at simulation depth, assessment method, accessibility, data
            protection, and total cost</strong> &mdash; in that order. Curriculum coverage and
            polish matter, but they can&rsquo;t compensate for a platform where students click
            through predetermined steps without ever practising a technique.
          </p>
          <p>
            The pressure is real. The Royal Society&rsquo;s Science Education Tracker 2023 found
            that the share of GCSE pupils doing practical work at least fortnightly fell from 44%
            in 2016 to 26% in 2023, and EngineeringUK&rsquo;s 2024 research reports that 27% of UK
            science teachers say their schools cannot afford the equipment needed for practical
            lessons. Virtual labs can close that gap &mdash; but only if the one you pick builds
            skills rather than replaying content.
          </p>
        </div>

        {/* Simulation depth */}
        <div className="cvl-row">
          <div className="cvl-row-text">
            <h2>Simulation Depth: Animation or Physics?</h2>
            <p>
              <strong>Ask what happens when a student does the experiment wrong.</strong> That
              single question sorts the market into its main categories:
            </p>
            <ul>
              <li>
                <strong>Video-based tools</strong> show recordings of real experiments. Useful for
                introducing concepts, but watching a titration is not performing one.
              </li>
              <li>
                <strong>Guided step-by-step simulations</strong> walk students through
                predetermined sequences. Clicking the &ldquo;wrong&rdquo; option typically triggers
                an error message and returns them to the correct path, so the cause-and-effect
                link between action and outcome is lost.
              </li>
              <li>
                <strong>Physics-engine sandboxes</strong> calculate outcomes from physical laws.
                Add acid too fast and the pH overshoots; contaminate a sample and the analysis
                shows artefacts. Mistakes produce realistic consequences students must diagnose.
              </li>
            </ul>
            <p>
              Research supports the deeper approach: Finkelstein et&nbsp;al. (2010) found
              physics-based simulations significantly improve conceptual understanding compared
              with simplified animations, and Kapur (2015) reported that productive-failure
              approaches can roughly double the effect of direct instruction alone. If a vendor
              cannot explain their physics engine, assume there isn&rsquo;t one.
            </p>
          </div>
          <div className="cvl-row-image">
            <img
              src="/images/Sandbox.jpg"
              alt="Heating a beaker of liquid over a Bunsen burner in a physics-simulated virtual lab"
              loading="lazy"
            />
          </div>
        </div>

        {/* AI assessment */}
        <div className="cvl-row reverse">
          <div className="cvl-row-text">
            <h2>How Should the AI Assessment Work?</h2>
            <p>
              <strong>It should assess what students do, not parse what they write.</strong>{" "}
              AI systems that grade written answers must interpret ambiguous language, and they
              make mistakes doing it. Assessment built on physical actions has nothing to
              misinterpret: the student either pipetted 2.5&nbsp;mL or they didn&rsquo;t, either
              rinsed the burette or skipped it.
            </p>
            <p>
              Process-based assessment also resists AI-assisted shortcuts. When follow-up
              questions are tied to a student&rsquo;s own experimental data &mdash; &ldquo;why
              does <em>your</em> graph show an unexpected peak?&rdquo; &mdash; a chatbot
              can&rsquo;t answer, because it doesn&rsquo;t know that the student forgot to rinse
              the burette three steps earlier.
            </p>
            <p>
              Finally, check the AI safety design. Does the tutor expose a free-text chat window
              to pupils, or does it work purely from their actions in the lab? A tutor with no
              student chat surface can&rsquo;t deliver generated text to children or be
              prompt-injected by them &mdash; a much easier system to safeguard.
            </p>
          </div>
          <div className="cvl-row-image">
            <img
              src="/images/teachdash.jpg"
              alt="Teacher dashboard showing class overview, grading queue, and per-student technique breakdowns"
              loading="lazy"
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="cvl-checklist">
          <h2>The Virtual Lab Evaluation Checklist</h2>
          <p>
            Put every shortlisted platform through these twelve criteria. A trial with your own
            teachers and students will reveal more than any demo.
          </p>
          <ul>
            <li>
              <strong>Physics simulation, not canned animations</strong> &mdash; wrong technique
              should produce wrong (but realistic) results, not an error message.
            </li>
            <li>
              <strong>Emergent, noisy data</strong> &mdash; results generated from the
              student&rsquo;s actions, so they practise handling outliers and error, not perfect
              pre-canned graphs.
            </li>
            <li>
              <strong>Process-based assessment</strong> &mdash; grading of technique, sequence,
              and safety compliance, not just final answers or multiple-choice questions.
            </li>
            <li>
              <strong>AI safety by design</strong> &mdash; no open student chat window; guidance
              inferred from actions, with teachers able to review and override AI judgements.
            </li>
            <li>
              <strong>SEND accessibility</strong> &mdash; control remapping, text-to-speech,
              self-paced modes, and documented accessibility support.
            </li>
            <li>
              <strong>Low-bandwidth mode</strong> &mdash; keeps lessons running on unreliable
              school internet connections.
            </li>
            <li>
              <strong>Device coverage</strong> &mdash; works on the hardware you already own
              (Chromebooks, PCs, Macs), with VR as an option rather than a requirement.
            </li>
            <li>
              <strong>Clear data protection answers</strong> &mdash; where data is stored,
              whether it trains AI models, and what deletion rights you have. Vague assurances
              are a red flag.
            </li>
            <li>
              <strong>Pricing transparency</strong> &mdash; a stated pricing model, no long
              lock-in contracts, and a real trial with your own students before you commit.
            </li>
            <li>
              <strong>Curriculum fit</strong> &mdash; mapping to your exam board&rsquo;s required
              practicals, not a generic library built for a different education system.
            </li>
            <li>
              <strong>Teacher dashboards and LMS export</strong> &mdash; per-student technique
              data you can act on, exportable reports, and integration with your existing
              systems.
            </li>
            <li>
              <strong>Teacher customisation</strong> &mdash; the ability to adjust experiments,
              scaffolding, and assessment focus rather than being locked to fixed content.
            </li>
          </ul>
        </div>

        {/* Cost */}
        <div className="cvl-section">
          <h2>What Does Virtual Lab Software Cost?</h2>
          <p>
            <strong>Pricing models vary &mdash; per-student, per-seat, or site licences &mdash;
            so compare total cost of ownership, not headline price.</strong> Factor in training,
            integration, any required hardware, and what happens to your data if you don&rsquo;t
            renew.
          </p>
          <p>
            For context on the physical side: CLEAPSS (2024) puts a traditional school chemistry
            lab setup at &pound;25,000&ndash;&pound;70,000 initially, with
            &pound;5,000&ndash;&pound;15,000 a year in consumables, maintenance, and compliance.
            Virtual labs don&rsquo;t replace physical labs, but they let students repeat
            experiments without consuming materials &mdash; which is where the budget case
            usually lands.
          </p>
          <p>
            If cost is the blocker, funding routes exist. UK schools have used programmes such as
            Royal Society Partnership Grants to fund virtual lab subscriptions &mdash; see our{" "}
            <a href={getLocalizedPath("/grants/", language)}>guide to grants and funding</a> for
            what&rsquo;s available and how to apply.
          </p>
        </div>

        {/* Data protection */}
        <div className="cvl-row">
          <div className="cvl-row-text">
            <h2>What Should You Ask Vendors About Data Protection?</h2>
            <p>
              <strong>Ask where student data is stored, whether it is encrypted, whether it
              trains AI models, and how deletion works when you leave.</strong> EdTech platforms
              hold sensitive information about children, and high-profile breaches have made
              scrutiny here non-negotiable. Request the vendor&rsquo;s data processing agreement
              up front &mdash; if they don&rsquo;t have one ready, walk away.
            </p>
            <p>
              You can see how WhimsyLabs answers these questions on our{" "}
              <a href={getLocalizedPath("/data-security/", language)}>data security page</a>:
              student data is never used to train AI models, and the platform is built for GDPR
              compliance.
            </p>
          </div>
          <div className="cvl-row-image">
            <img
              src="/images/Ethanolsafety.jpg"
              alt="A fully simulated hazard label on a virtual bottle of ethyl alcohol, mirroring real COSHH labelling"
              loading="lazy"
            />
          </div>
        </div>

        {/* WhimsyLabs honestly */}
        <div className="cvl-whimsy">
          <h2>How Does WhimsyLabs Score Against This Checklist?</h2>
          <p>
            WhimsyLabs is one option in the physics-engine sandbox category, and we built it
            around the criteria above: a real-time physics engine with emergent, noisy data;
            process-based assessment of technique and safety; an AI tutor (WhimsyCat) with no
            student chat window; SEND accessibility features and a low-bandwidth mode; and
            delivery on Chromebooks, desktops, and VR headsets alike.
          </p>
          <p>
            We won&rsquo;t claim it&rsquo;s the right choice for every school. If you mainly need
            short concept demonstrations, a lighter guided-simulation tool may serve you fine. If
            you want students to build practical technique and to assess how they work, we think
            WhimsyLabs compares well &mdash; and the fair test is to run your own experiments on
            a trial and judge the results.
          </p>
          <p className="cvl-whimsy-links">
            <a href={getLocalizedPath("/features/", language)}>Explore the features</a>
            <a href={getLocalizedPath("/contact/", language)}>Arrange a trial or demo</a>
          </p>
        </div>

        {/* Go deeper */}
        <div className="cvl-deeper">
          <h2>Go Deeper: Buyer&rsquo;s Guides and Research</h2>
          <p>This page summarises our longer guides. For the full detail:</p>
          <ul>
            <li>
              <a href={getLocalizedPath("/blog/how-to-choose-virtual-lab-software-school/", language)}>
                Virtual Lab Software for Secondary Schools: A Buyer&rsquo;s Guide
              </a>{" "}
              &mdash; vendor questions and red flags for GCSE and A-Level.
            </li>
            <li>
              <a href={getLocalizedPath("/blog/virtual-lab-software-guide-2026/", language)}>
                Virtual Labs in Higher Education: A 2026 Buyer&rsquo;s Guide
              </a>{" "}
              &mdash; solution categories and making the case to leadership.
            </li>
            <li>
              <a href={getLocalizedPath("/blog/why-traditional-virtual-labs-fail-physics-engine/", language)}>
                Why Other Virtual Labs Fail: The Physics Engine Solution
              </a>{" "}
              &mdash; the animation fallacy and emergent data, in depth.
            </li>
            <li>
              <a href={getLocalizedPath("/blog/purpose-built-ai-education-difference/", language)}>
                Why AI Cannot Misgrade a Pipetting Technique
              </a>{" "}
              &mdash; process-based assessment versus text-parsing AI.
            </li>
            <li>
              <a href={getLocalizedPath("/blog/virtual-labs-vs-physical-labs-cost-benefit-analysis/", language)}>
                Virtual vs Physical Labs: A Cost-Benefit Analysis
              </a>{" "}
              &mdash; the full numbers behind the budget case.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <BubbleContainer>
        <div className="cvl-cta">
          <h2>Put WhimsyLabs Through the Checklist</h2>
          <p>
            Bring your science team, run the practicals you know best, and see how the results
            compare.
          </p>
          <a href={getLocalizedPath("/contact/", language)} className="cvl-cta-button">
            Book a Demo
          </a>
        </div>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default ChooseVirtualLabPage;
