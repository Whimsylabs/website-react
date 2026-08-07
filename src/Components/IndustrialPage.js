import React from "react";
import IndustrialHeader from "./IndustrialHeader";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import "./IndustrialPage.css";

// Industrial / vocational landing page.
// English-only by design (see src/i18n/englishOnlyRoutes.json): the SafeLab
// pilot is UK-based and Ufi-funded, so this route is not built per-language.
// Copy is intentionally hardcoded rather than translated.

const Stat = ({ value, label }) => (
  <div className="ind-stat">
    <span className="ind-stat-value">{value}</span>
    <span className="ind-stat-label">{label}</span>
  </div>
);

const Module = ({ code, title, children }) => (
  <div className="ind-module">
    <span className="ind-module-code">{code}</span>
    <h3>{title}</h3>
    <p>{children}</p>
  </div>
);

const IndustrialPage = () => {
  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>Virtual Process &amp; Safety Training for Industry | WhimsyLabs</title>
        <meta
          name="description"
          content="SafeLab by WhimsyLabs: simulation training where process and lab staff practise COSHH handling, spill response and quality procedures repeatedly, on standard PCs or VR. Ufi VocTech funded. Free pilot places open."
        />
        <meta
          name="keywords"
          content="industrial safety training simulation, COSHH training, spill response training, VR safety training, process operator training, lab technician training, competency assessment, ISO 9001 training records"
        />
      </Helmet>

      <IndustrialHeader />

      {/* Hero */}
      <section className="ind-hero" id="main-content">
        <div className="ind-wrap">
          <span className="ind-eyebrow">Virtual process &amp; safety training</span>
          <h1 className="ind-hero-title">
            Practise the procedure.<br />Not the paperwork.
          </h1>
          <p className="ind-hero-sub">
            Your team has done the training. The question is whether they could
            do it under pressure, twelve months later, on a Tuesday afternoon.
            SafeLab lets process and laboratory staff rehearse COSHH handling,
            spill response and quality procedures as often as they need, on the
            computers you already own.
          </p>
          <div className="ind-hero-actions">
            <a className="ind-btn ind-btn-primary" href="/contact/">
              Book a 20 minute call
            </a>
            <a className="ind-btn ind-btn-ghost" href="#pilot">
              About the pilot programme
            </a>
          </div>
          <p className="ind-funder">
            Funded by the{" "}
            <a href="https://ufi.co.uk/" target="_blank" rel="noopener noreferrer">
              Ufi VocTech Trust
            </a>
            &nbsp;·&nbsp; Built on the platform ranked{" "}
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

      {/* Problem */}
      <section className="ind-band ind-band--paper">
        <div className="ind-wrap">
          <span className="ind-eyebrow ind-eyebrow--dark">The problem</span>
          <h2>Training that happens once is not training</h2>
          <div className="ind-two-col">
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
                weak points are across your team, or whether the person you hired
                last month is ready to work unsupervised.
              </p>
              <p>
                Auditors increasingly want evidence of competence rather than
                attendance. Most training systems cannot provide it, because they
                never measured anything beyond a signature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="ind-band ind-band--ground">
        <div className="ind-wrap">
          <span className="ind-eyebrow ind-eyebrow--dark">What SafeLab is</span>
          <h2>A simulation your team can get things wrong in</h2>
          <p className="ind-lede">
            SafeLab is built on a real physics and chemistry engine, not a
            branching slideshow. Liquids pour and spill. Vessels break. Reactions
            respond to temperature, concentration and contamination. If someone
            skips a step, they see what actually happens, and they can try again
            immediately at no cost.
          </p>
          <div className="ind-modules">
            <Module code="01" title="COSHH &amp; chemical handling">
              Substance identification, PPE selection, safe transfer and storage,
              decanting and labelling, and the consequences of getting any of it
              wrong.
            </Module>
            <Module code="02" title="Spill &amp; emergency response">
              The scenario staff rarely get to rehearse: containment, escalation,
              evacuation decisions and clean-up, run as many times as it takes to
              become automatic.
            </Module>
            <Module code="03" title="Quality control procedures">
              Sampling, measurement technique, recording and the discipline of
              repeating an anomalous result rather than writing it down and
              moving on.
            </Module>
            <Module code="04" title="Site &amp; pedestrian safety">
              Movement around live plant, exclusion zones, and the situational
              awareness that is difficult to teach from a slide deck.
            </Module>
          </div>
          <p className="ind-note">
            Scenarios are configured to your site: your procedures, your
            substances, your layout. We build them with your health and safety
            lead, not from a generic template.
          </p>
        </div>
      </section>

      {/* Assessment */}
      <section className="ind-band ind-band--ink">
        <div className="ind-wrap">
          <span className="ind-eyebrow">Evidence, not attendance</span>
          <h2>It records what people actually did</h2>
          <p className="ind-lede">
            SafeLab logs every meaningful action: whether the goggles went on
            before the container was opened, how steadily a transfer was made,
            whether the spill was contained or spread, and what the trainee did
            when the scenario stopped behaving. That record becomes a competency
            profile you can defend in an audit.
          </p>
          <div className="ind-stats">
            <Stat value="40+" label="categories of action logged per session" />
            <Stat value="5&times;/sec" label="movement sampling during a task" />
            <Stat value="0" label="materials consumed per rehearsal" />
          </div>
          <ul className="ind-checklist">
            <li>
              <strong>Competency scoring by procedure</strong>, so you can see
              which steps your team is weakest on rather than a single pass or
              fail.
            </li>
            <li>
              <strong>Session replay</strong>, letting a supervisor watch exactly
              where a procedure went wrong and use it as a coaching moment.
            </li>
            <li>
              <strong>Exportable records</strong> for your quality management
              system, including ISO 9001 training evidence and near-miss driven
              scenario updates.
            </li>
            <li>
              <strong>Improvement over time</strong>, because the same person can
              repeat a scenario next quarter and you can see whether it stuck.
            </li>
          </ul>
          <p className="ind-note ind-note--light">
            Competency data belongs to you and is there to support learning. We
            see it only in aggregated, anonymised form for evaluation, and it is
            not designed as a performance management tool.
          </p>
        </div>
      </section>

      {/* Pilot */}
      <section className="ind-band ind-band--paper" id="pilot">
        <div className="ind-wrap">
          <span className="ind-eyebrow ind-eyebrow--dark">Pilot programme 2026 / 27</span>
          <h2>We are looking for pilot partners</h2>
          <p className="ind-lede">
            WhimsyLabs has been awarded a grant by the Ufi VocTech Trust, a UK
            charity supporting vocational skills, to develop SafeLab with real
            employers. Pilot places are free, and we are deliberately looking for
            a mix of settings: SME chemical manufacture, laboratories, larger
            process environments and training providers.
          </p>
          <div className="ind-deal">
            <div className="ind-deal-col">
              <h3>What you get</h3>
              <ul>
                <li>Free access for your nominated staff throughout the pilot</li>
                <li>Scenarios built around your own procedures and site</li>
                <li>Onboarding, supervisor training and a named contact</li>
                <li>A competency report you keep for your own records</li>
                <li>Loan VR headsets where useful, though desktop needs no special hardware</li>
                <li>Preferential early adopter pricing if you continue afterwards</li>
              </ul>
            </div>
            <div className="ind-deal-col">
              <h3>What we ask</h3>
              <ul>
                <li>A named contact, usually a health and safety or training lead</li>
                <li>Roughly two hours per participant in total, worked around shifts</li>
                <li>A short baseline and follow-up competency check</li>
                <li>A 45 minute conversation at the end about what worked</li>
                <li>Agreement in principle to a case study, which you approve and may keep anonymous</li>
              </ul>
            </div>
          </div>
          <div className="ind-terms">
            <p>
              <strong>No cost. No obligation to buy anything, during or after.</strong>{" "}
              The paperwork is a single page memorandum of understanding, it is
              not a contract, and you can withdraw at any time by email.
            </p>
          </div>
          <div className="ind-hero-actions ind-hero-actions--center">
            <a className="ind-btn ind-btn-primary" href="/contact/">
              Talk to us about a pilot place
            </a>
          </div>
        </div>
      </section>

      {/* Practical questions */}
      <section className="ind-band ind-band--ground">
        <div className="ind-wrap">
          <span className="ind-eyebrow ind-eyebrow--dark">Practical questions</span>
          <h2>The things people ask first</h2>
          <dl className="ind-faq">
            <dt>Do we need VR headsets?</dt>
            <dd>
              No. SafeLab runs on standard Windows PCs and Macs through the
              browser, with no installation. VR is supported and headset
              agnostic if you want it, and we can lend headsets during the pilot,
              but nothing depends on it.
            </dd>

            <dt>How much of our people&rsquo;s time does this take?</dt>
            <dd>
              Around two hours per participant across the whole pilot, taken in
              short self-paced sessions that fit around shift patterns rather
              than one long block off the line.
            </dd>

            <dt>Who sees the results?</dt>
            <dd>
              Your nominated contact sees individual results. WhimsyLabs sees
              aggregated, anonymised data for evaluation and for reporting to our
              funder. Personal data is processed under UK GDPR and a data
              processing agreement is available.
            </dd>

            <dt>Will it match our procedures, or is it generic?</dt>
            <dd>
              Yours. We build scenarios from your actual COSHH assessments and
              site procedures, and every scenario is reviewed against them with
              your health and safety lead before a trainee sees it. A scenario
              that marked an unsafe action as correct would be worse than no
              training at all.
            </dd>

            <dt>Is this really a schools product in disguise?</dt>
            <dd>
              The simulation engine comes from our education platform, which is
              why it is mature enough to trust, and it won the BETT 2025
              Kids&rsquo; Judge Award and was ranked first in Tech&amp;Learning&rsquo;s Best
              of BETT 2026. The industrial scenarios, assessment criteria and
              reporting are being built specifically for workplace training, with
              employers, under the Ufi grant.
            </dd>
          </dl>
        </div>
      </section>

      {/* Who we are */}
      <section className="ind-band ind-band--paper">
        <div className="ind-wrap">
          <span className="ind-eyebrow ind-eyebrow--dark">Who is building it</span>
          <h2>People who have worked in the environments we simulate</h2>
          <div className="ind-two-col">
            <div>
              <p>
                <strong>Dr Marisa French, Chief Executive.</strong> PhD physics
                and simulation development. Leads the platform and the learning
                design behind how competence is measured.
              </p>
              <p>
                <strong>Dr Alex Papiez, Chief Operating Officer.</strong> PhD
                chemistry, with close to a decade of technical leadership in the
                chemical industry, including a three year KTP partnership. He
                defines the industrial content, which is why the scenarios read
                like a real site rather than a textbook.
              </p>
            </div>
            <div>
              <p>
                <strong>WhimsyLabs Limited</strong> is an Edinburgh company
                building virtual laboratory software used in schools and, through
                this programme, in industry. The platform represents several
                years of engineering in physics simulation, action logging and
                automated competency assessment.
              </p>
              <p>
                This work is supported by the Ufi VocTech Trust, whose funding
                exists specifically to improve vocational skills through
                technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ind-cta">
        <div className="ind-wrap">
          <h2>Worth twenty minutes of your time?</h2>
          <p>
            The quickest way to judge this is to see it running and tell us where
            it would fall over on your site. We would genuinely rather hear that
            now than later.
          </p>
          <div className="ind-hero-actions ind-hero-actions--center">
            <a className="ind-btn ind-btn-primary" href="/contact/">
              Get in touch
            </a>
            <a className="ind-btn ind-btn-ghost" href="/features/">
              See the platform
            </a>
          </div>
        </div>
      </section>

      <Footer language="en" />
    </main>
  );
};

export default IndustrialPage;
