import React from "react";
import IndustrialHeader from "./IndustrialHeader";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import "./IndustrialPageV2.css";

/* IndustrialPageV2 - /industrial-v2
   ---------------------------------------------------------------------------
   v2 of the industrial page. v1 stays live and untouched at /industrial.

   The structure and most of the copy are v1's, because they were right. What
   changed is the visual register and one new section:

   - Type is named and actually loaded (Barlow / Barlow Condensed / IBM Plex
     Mono). v1's own CSS comment notes the site asks for Poppins and never
     loads it. Naming the face makes the marketing page and the product read
     as one company.
   - The ISO 7010 state vocabulary from the product is shown on the page
     rather than described: green square current, amber triangle due, red
     slashed circle lapsed. Shape carries state alongside colour.
   - A new inspection-readiness section, built on the question an H&S lead is
     actually worried about. This is the sharpest argument we have and v1 only
     gestured at it under "Evidence, not attendance".
   - The scenario library is presented as open-ended rather than as a fixed
     set, because the platform is not limited to the first four.
   --------------------------------------------------------------------------- */

/* ISO 7010 state glyphs. Each pairs a colour with a distinct SHAPE, so the
   state survives a colourblind reader and reads at a distance on a shop floor.
   Inline SVG rather than icon font: no network dependency, scales cleanly. */

const Current = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" role="img" aria-label="Current">
    <rect x="0.5" y="0.5" width="17" height="17" fill="#007A33" />
    <path
      d="M4.6 9.3 L7.6 12.3 L13.2 5.9"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Due = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" role="img" aria-label="Due">
    <path d="M9 0.8 L17.4 16.6 L0.6 16.6 Z" fill="#F5A800" />
    <rect x="8.1" y="6.2" width="1.8" height="5.2" fill="#131A1E" />
    <rect x="8.1" y="12.4" width="1.8" height="1.8" fill="#131A1E" />
  </svg>
);

const Lapsed = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" role="img" aria-label="Lapsed">
    <circle cx="9" cy="9" r="7.6" fill="none" stroke="#C8102E" strokeWidth="2.4" />
    <path d="M4.2 13.8 L13.8 4.2" stroke="#C8102E" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const Action = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" role="img" aria-label="Action required">
    <circle cx="9" cy="9" r="8.2" fill="#005EB8" />
    <rect x="8.1" y="4.1" width="1.8" height="1.8" fill="#FFFFFF" />
    <rect x="8.1" y="7.1" width="1.8" height="6.8" fill="#FFFFFF" />
  </svg>
);

const Stat = ({ value, label }) => (
  <div className="iv2-stat">
    <span className="iv2-stat-value">{value}</span>
    <span className="iv2-stat-label">{label}</span>
  </div>
);

const Module = ({ code, title, children, next }) => (
  <div className={next ? "iv2-module iv2-module--next" : "iv2-module"}>
    <span className="iv2-module-code">{code}</span>
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
);

const Row = ({ state, name, status }) => {
  const glyph =
    state === "ok" ? <Current /> : state === "due" ? <Due /> : <Lapsed />;
  return (
    <div className="iv2-row">
      {glyph}
      <span className="iv2-row-name">{name}</span>
      <span className={`iv2-row-state iv2-row-state--${state}`}>{status}</span>
    </div>
  );
};

const IndustrialPageV2 = () => {
  return (
    <main className="container-fluid p-0 iv2">
      <Helmet>
        <title>Virtual Process &amp; Safety Training for Industry | WhimsyLabs</title>
        <meta
          name="description"
          content="SafeLab by WhimsyLabs: simulation training where process and lab staff practise COSHH handling, spill response and quality procedures repeatedly, on standard PCs or VR. Evidence of competence, not attendance. Ufi VocTech funded. Free pilot places open."
        />
        <meta
          name="keywords"
          content="industrial safety training simulation, COSHH training, spill response training, VR safety training, process operator training, competency evidence, HSE inspection records, ISO 9001 training records"
        />
        {/* Concept page living alongside v1 for comparison. Keep it out of
            search until a decision is made, otherwise two near-identical pages
            compete for the same terms. Remove this when v2 replaces v1. */}
        <meta name="robots" content="noindex, nofollow" />
        {/* Fonts are imported at the top of IndustrialPageV2.css, not here.
            build.js does not collect Helmet output (metadata is injected by
            scripts/metadata-injector.js instead), so a stylesheet link in this
            block would load under `npm start` and silently vanish from the
            static build. That is the same failure v1 has with Poppins. */}
      </Helmet>

      <IndustrialHeader />

      {/* Hero */}
      <section className="iv2-hero" id="main-content">
        <div className="iv2-wrap">
          <span className="iv2-eyebrow iv2-eyebrow--light">
            Virtual process &amp; safety training
          </span>
          <h1>
            Practise the procedure.
            <br />
            Not the paperwork.
          </h1>
          <p className="iv2-hero-sub">
            Your team has done the training. The question is whether they could
            do it under pressure, twelve months later, on a Tuesday afternoon.
            SafeLab lets process and laboratory staff rehearse COSHH handling,
            spill response and quality procedures as often as they need, on the
            computers you already own.
          </p>
          <div className="iv2-actions">
            <a className="iv2-btn iv2-btn-primary" href="/contact/">
              Book a 20 minute call
            </a>
            <a className="iv2-btn iv2-btn-ghost" href="#pilot">
              About the pilot programme
            </a>
          </div>
          <p className="iv2-funder">
            Funded by the{" "}
            <a href="https://ufi.co.uk/" target="_blank" rel="noopener noreferrer">
              Ufi VocTech Trust
            </a>
            &nbsp;&middot;&nbsp; Built on the platform ranked{" "}
            <a
              href="https://www.techlearning.com/learning/classroom-tools/best-of-bett-2026-the-floor-of-bett-uk-reveals-the-future-of-education-tech"
              target="_blank"
              rel="noopener noreferrer"
            >
              #1 Best of BETT 2026
            </a>{" "}
            by Tech&amp;Learning
          </p>
        </div>
      </section>

      {/* Inspection readiness. The sharpest argument, so it goes first. */}
      <section className="iv2-band iv2-band--paper">
        <div className="iv2-wrap">
          <span className="iv2-eyebrow">The question behind the question</span>
          <h2>Could you evidence competence to an inspector today?</h2>
          <div className="iv2-inspector">
            <div>
              <p className="iv2-lede">
                Not whether the training happened. Whether you can show, for a
                named person on a named date, what they were able to do and how
                you know.
              </p>
              <p>
                A signature on an attendance sheet answers the first question
                and none of the second. The gap between them is where a
                conversation with an inspector gets uncomfortable, and it is
                also where most safety training quietly stops being useful.
              </p>
              <p>
                SafeLab closes it by recording what people actually did, action
                by action, and turning that into a register you can hand over.
              </p>
            </div>

            <div className="iv2-card">
              <h3>Inspection readiness</h3>
              <ul className="iv2-check">
                <li>
                  <Current />
                  <span>Named, dated records for every assessed person</span>
                </li>
                <li>
                  <Current />
                  <span>Per-procedure competency, not a single pass or fail</span>
                </li>
                <li>
                  <Lapsed />
                  <span>
                    Lapses shown, with retraining booked against each one
                  </span>
                </li>
                <li>
                  <Action />
                  <span>Traceable from your own SOP to the assessed behaviour</span>
                </li>
              </ul>
              <p className="iv2-card-foot">
                An honest register is more use than a clean one. Showing a gap
                with a date against it is the answer an inspector wants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="iv2-band iv2-band--wash">
        <div className="iv2-wrap">
          <span className="iv2-eyebrow">The problem</span>
          <h2>Training that happens once is not training</h2>
          <div className="iv2-two">
            <div>
              <p>
                Most industrial safety training is delivered once, signed off,
                and filed. Emergency response is the clearest example: staff are
                trained on what to do, then almost never get to practise it. The
                first real rehearsal is the real incident.
              </p>
              <p>
                Practising properly means taking people off the line, consuming
                materials, and tying up a supervisor. For a small manufacturer
                running lean, that is a genuine cost, so it does not happen as
                often as anyone would like.
              </p>
            </div>
            <div>
              <p>
                Meanwhile a completion record only tells you who attended. It
                does not tell you who can actually do the procedure, where the
                weak points are across your team, or whether the person you
                hired last month is ready to work unsupervised.
              </p>
              <p>
                And when something does go wrong, the record of the quiet word
                someone had on the shop floor six weeks earlier does not exist.
                Verbal warnings evaporate. Evidence does not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="iv2-band iv2-band--paper">
        <div className="iv2-wrap">
          <span className="iv2-eyebrow">What SafeLab is</span>
          <h2>A simulation your team can get things wrong in</h2>
          <p className="iv2-lede">
            SafeLab is built on a real physics and chemistry engine, not a
            branching slideshow. Liquids pour and spill. Vessels break.
            Reactions respond to temperature, concentration and contamination.
            If someone skips a step, they see what actually happens, and they
            can try again immediately at no cost.
          </p>
          <div className="iv2-modules">
            <Module code="01" title="COSHH &amp; chemical handling">
              Substance identification, PPE selection, safe transfer and
              storage, decanting and labelling, and the consequences of getting
              any of it wrong.
            </Module>
            <Module code="02" title="Spill &amp; emergency response">
              The scenario staff rarely get to rehearse: containment,
              escalation, evacuation decisions and clean-up, run as many times
              as it takes to become automatic.
            </Module>
            <Module code="03" title="Quality control procedures">
              Sampling, measurement technique, recording, and the discipline of
              repeating an anomalous result rather than writing it down and
              moving on.
            </Module>
            <Module code="04" title="Site &amp; pedestrian safety">
              Movement around live plant, exclusion zones, and the situational
              awareness that is difficult to teach from a slide deck.
            </Module>
            <Module code="05 +" title="Your procedures next" next>
              The scenario library is open-ended. New environments are built on
              the same engine and the same competency framework, so a scenario
              added next year still rolls up into the same record.
            </Module>
          </div>
          <p className="iv2-note">
            Scenarios are configured to your site: your procedures, your
            substances, your layout. We build them with your health and safety
            lead, not from a generic template.
          </p>
        </div>
      </section>

      {/* Evidence, with the state vocabulary shown */}
      <section className="iv2-band iv2-band--ink">
        <div className="iv2-wrap">
          <span className="iv2-eyebrow iv2-eyebrow--light">
            Evidence, not attendance
          </span>
          <h2>It records what people actually did</h2>
          <p className="iv2-lede">
            SafeLab logs every meaningful action: whether the respirator went on
            before the sack was opened, whether the spill was contained before
            it was absorbed, whether the balance was tared, and what the trainee
            did when the scenario stopped behaving.
          </p>
          <div className="iv2-stats">
            <Stat value="40+" label="categories of action logged per session" />
            <Stat value="5&times;/sec" label="movement sampling during a task" />
            <Stat value="0" label="materials consumed per rehearsal" />
          </div>
          <ul className="iv2-list">
            <li>
              <strong>Competency by procedure</strong>
              See which steps your team is weakest on, rather than one score
              that hides the answer.
            </li>
            <li>
              <strong>Session replay</strong>
              A supervisor can watch exactly where it went wrong and use it as a
              coaching moment.
            </li>
            <li>
              <strong>Exportable records</strong>
              For your quality management system, including ISO 9001 training
              evidence and near-miss driven scenario updates.
            </li>
            <li>
              <strong>Improvement over time</strong>
              The same person repeats a scenario next quarter, and you can see
              whether it stuck.
            </li>
          </ul>
          <p className="iv2-note" style={{ borderLeftColor: "#3c4a51", color: "#8c979d" }}>
            Competency data belongs to you and is there to support learning. We
            see it only in aggregated, anonymised form for evaluation, and it is
            not designed as a performance management tool.
          </p>
        </div>
      </section>

      {/* Status at a glance */}
      <section className="iv2-band iv2-band--wash">
        <div className="iv2-wrap">
          <span className="iv2-eyebrow">Status at a glance</span>
          <h2>Readable across a room, not just on a screen</h2>
          <p className="iv2-lede">
            Every state in SafeLab uses the signage vocabulary already on your
            walls and your drums. Colour carries the meaning, and so does the
            shape, so it still works for a colourblind supervisor and still
            works from the other side of the floor.
          </p>

          <div className="iv2-strip">
            <div className="iv2-strip-head">
              <span className="iv2-strip-title">Production floor, powder handling</span>
              <span className="iv2-strip-meta">9 people</span>
            </div>
            <Row state="ok" name="Respirator worn during powder handling" status="8 of 9 current" />
            <Row state="ok" name="Correct material charged" status="9 of 9 current" />
            <Row state="due" name="Guard interlock respected" status="2 due within 30 days" />
            <Row state="lapsed" name="Batch record completed" status="1 lapsed" />
            <div className="iv2-legend">
              <span>
                <Current /> Current
              </span>
              <span>
                <Due /> Due
              </span>
              <span>
                <Lapsed /> Lapsed
              </span>
              <span>
                <Action /> Action required
              </span>
            </div>
          </div>

          <p className="iv2-note">
            The same four states appear on the overview, on an individual record
            and in the exported register, so nobody has to learn a second
            vocabulary to read the second screen.
          </p>
        </div>
      </section>

      {/* Pilot */}
      <section className="iv2-band iv2-band--brand" id="pilot">
        <div className="iv2-wrap">
          <span className="iv2-eyebrow iv2-eyebrow--light">
            Pilot programme 2026 / 27
          </span>
          <h2>We are looking for pilot partners</h2>
          <p className="iv2-lede" style={{ color: "#e4e2f1" }}>
            WhimsyLabs has been awarded a grant by the Ufi VocTech Trust, a UK
            charity supporting vocational skills, to develop SafeLab with real
            employers. Pilot places are free, and we are deliberately looking
            for a mix of settings: SME chemical manufacture, laboratories,
            larger process environments and training providers.
          </p>
          <div className="iv2-deal">
            <div className="iv2-deal-col">
              <h3>What you get</h3>
              <ul>
                <li>Free access for your nominated staff throughout the pilot</li>
                <li>Scenarios built around your own procedures and site</li>
                <li>Onboarding, supervisor training and a named contact</li>
                <li>A competency report you keep for your own records</li>
              </ul>
            </div>
            <div className="iv2-deal-col">
              <h3>What we ask</h3>
              <ul>
                <li>Access to a handful of staff for a few sessions each</li>
                <li>A conversation with your health and safety lead</li>
                <li>Honest feedback, including when something does not work</li>
                <li>Permission to reference the work, if you are comfortable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="iv2-cta">
        <div className="iv2-wrap">
          <h2>Worth twenty minutes of your time?</h2>
          <p>
            No demo environment to install and nothing to prepare. We will ask
            what your team already trains on, and show you what the record looks
            like at the other end.
          </p>
          <div className="iv2-actions">
            <a className="iv2-btn iv2-btn-primary" href="/contact/">
              Book a 20 minute call
            </a>
            <a className="iv2-btn iv2-btn-ghost" href="/features/">
              See the platform
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IndustrialPageV2;
