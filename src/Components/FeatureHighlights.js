import React from "react";
import "./FeatureHighlights.css";
import { getLocalizedPath } from "../i18n";

// Content sourced from the WhimsyLabs 2026 features flyer (WhimsyFlyer_2026.pdf)
const FeatureHighlights = ({ language }) => {
  return (
    <section className="feature-highlights" aria-label="WhimsyLabs features in depth">
      {/* Physicality-first engine */}
      <div className="highlight-row">
        <div className="highlight-text">
          <h2>Muscle Memory Forged in Simulations, Not Mouse-Driven Animations</h2>
          <p>
            Unlike &ldquo;slide-show&rdquo; simulators, our engine replicates the chaos and
            weight of the real world &mdash; down to temperature perturbations, impurities,
            and deviation between samples. Whether pouring titration fluids in VR or
            adjusting microscope focus on a Chromebook, students must use fine motor
            skills and procedural accuracy.
          </p>
          <p>
            If they drop a beaker, it breaks. If they overheat a compound, it reacts.
            This freedom to fail builds resilience and a genuine understanding of
            laboratory risks &mdash; read more about{" "}
            <a href={getLocalizedPath("/blog/physicality-in-virtual-labs/", language)}>
              why physicality matters in virtual labs
            </a>.
          </p>
        </div>
        <div className="highlight-image">
          <img
            src="/images/Sandbox.jpg"
            alt="Heating a beaker of liquid over a Bunsen burner in the WhimsyLabs virtual lab"
            loading="lazy"
          />
        </div>
      </div>

      {/* AI-proof assessment */}
      <div className="highlight-row reverse">
        <div className="highlight-text">
          <h2>How Does WhimsyLabs Make Assessment AI-Proof?</h2>
          <p>
            WhimsyLabs grades the process, not just the result. We track physical
            inputs inside the lab &mdash; equipment handling, technique, and reaction
            times &mdash; which generative AI cannot simulate. Follow-up questions are
            tied to each student&rsquo;s unique experimental data (&ldquo;At what pH did{" "}
            <em>your</em> indicator change colour?&rdquo;), so generic AI answers are no
            help.
          </p>
          <p>
            WhimsyCat, our AI tutor and assessor, has no student chat window. It
            infers everything from a student&rsquo;s actions in the lab &mdash; pupils never
            type prompts and never receive generated text. That is how WhimsyLabs
            meets{" "}
            <a href={getLocalizedPath("/blog/dfe-ai-safety-standards-tutor-checklist/", language)}>
              the DfE&rsquo;s AI safety expectations by design
            </a>. For the full story, see{" "}
            <a href={getLocalizedPath("/ai-assessment/", language)}>
              how our AI-proof assessment works
            </a>.
          </p>
        </div>
        <div className="highlight-image">
          <img
            src="/images/grading dashboard.jpg"
            alt="AI grading breakdown scoring experimental procedure, lab safety, data collection, and scientific communication"
            loading="lazy"
          />
        </div>
      </div>

      {/* Marking time + intervention */}
      <div className="highlight-row">
        <div className="highlight-text">
          <h2>Save 3.5 Hours of Marking Per Week</h2>
          <p>
            Stop ticking boxes and start teaching. WhimsyLabs assesses skill mastery
            and safety in real time, providing automatic grading of students&rsquo;
            practical capabilities for you to review &mdash; with a quick or detailed
            breakdown per student.
          </p>
          <h2>Data That Drives Intervention</h2>
          <p>
            The teacher dashboard offers a real-time view of student performance, not
            just grades. Instantly identify struggling students for timely
            intervention before they fall behind, then export reports or integrate
            with your LMS to track progress from individual students to entire
            regions.
          </p>
        </div>
        <div className="highlight-image">
          <img
            src="/images/teachdash.jpg"
            alt="WhimsyLabs teacher dashboard showing class overview, grading queue, and quick actions"
            loading="lazy"
          />
        </div>
      </div>

      {/* Three-up cards */}
      <div className="highlight-cards">
        <div className="highlight-card">
          <img
            src="/images/custom.jpg"
            alt="The AI Experiment Builder listing equipment and reagents for a titration practical"
            loading="lazy"
          />
          <h3>Your Lab, Your Rules</h3>
          <p>
            Don&rsquo;t be limited by pre-set scenarios. Students can mix any reagent with
            any equipment to test their own hypotheses, and the AI Experiment Builder
            lets teachers generate bespoke lab scenarios in minutes to fit any lesson
            plan.
          </p>
        </div>
        <div className="highlight-card">
          <img
            src="/images/Ethanolsafety.jpg"
            alt="A fully simulated hazard label for pure ethyl alcohol inside the virtual lab"
            loading="lazy"
          />
          <h3>Science for Everyone</h3>
          <p>
            Inclusive by default: full control remapping, text-to-speech, and
            self-paced modes support SEND learners, while low-bandwidth mode keeps
            lessons running smoothly on unstable school internet connections.
          </p>
        </div>
        <div className="highlight-card">
          <img
            src="/images/basicskins.jpg"
            alt="Two collectable WhimsyCat skins earned with Lab Points"
            loading="lazy"
          />
          <h3>Rewarding Mastery</h3>
          <p>
            Gamification that drives understanding, not screen time. Students earn
            free Lab Points for safety and accuracy to customise their virtual
            workspace &mdash; intrinsic motivation without predatory engagement tactics.
          </p>
        </div>
      </div>

      {/* Subjects band */}
      <div className="highlight-subjects">
        <h2>One Fully-Simulated STEM Lab</h2>
        <p className="highlight-subjects-list">
          Biology &bull; Chemistry &bull; Physics &bull; Electronics
        </p>
        <p>
          All disciplines live in the same simulation, with real interactions between
          them &mdash; available on VR headsets and desktop (Chromebook, Mac, PC).
        </p>
      </div>

      {/* Pioneer Program */}
      <div className="highlight-pioneer">
        <h2>WhimsyLabs Pioneer Program</h2>
        <p>
          WhimsyLabs launches globally in September 2026 &mdash; and Pioneer Schools get
          early access now. Sign up to receive:
        </p>
        <ul>
          <li>Full access to the Beta AI Grading and Early Modules for the Summer Term</li>
          <li>The 2026/27 Academic Year licence at our introductory BETT rate</li>
          <li>Direct access to our dev team to request specific apparatus for the September launch</li>
        </ul>
        <a href={getLocalizedPath("/contact/", language)} className="highlight-pioneer-cta">
          Become a Pioneer School
        </a>
      </div>
    </section>
  );
};

export default FeatureHighlights;
