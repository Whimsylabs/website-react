import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import { getLocalizedPath } from "../i18n";
import "./SendSciencePage.css";

const SendSciencePage = ({ language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />

      <BubbleContainer>
        <section className="send-hero">
          <h1>Accessible Science Practicals for SEND Students</h1>
          <p className="send-hero-sub">
            Every pupil deserves a place at the bench. WhimsyLabs virtual labs
            let SEND students carry out real practical science themselves &mdash;
            self-paced, safe, and built accessible from the start.
          </p>
          <a href={getLocalizedPath("/contact/", language)} className="send-cta-button">
            Book a Demo for Your SEND Department
          </a>
        </section>
      </BubbleContainer>

      <section className="send-content" aria-label="Accessible science practicals for SEND students">
        {/* Barriers */}
        <div className="send-row">
          <div className="send-text">
            <h2>Why Do SEND Students Miss Out on Science Practicals?</h2>
            <p>
              Because the physical lab itself is the barrier. A standard school
              laboratory is built around fixed-height benches, open flames,
              glassware, scalpels, and reagents, all used under time pressure in
              a noisy, crowded room. A pupil who uses a wheelchair, has a hand
              tremor, feels anxious around fire, or is overwhelmed by sensory
              load can be excluded from the very activity that defines the
              subject. The most common &ldquo;adjustment&rdquo; is to let them
              watch while a partner or the teacher does the experiment &mdash;
              which quietly removes them from the learning.
            </p>
            <p>
              This sits on top of a wider decline in hands-on science. The Royal
              Society and EngineeringUK Science Education Tracker found that
              regular practical work for GCSE pupils fell from 44% in 2016 to
              26% in 2023, with video demonstrations increasingly standing in
              for experiments pupils once did themselves. When demonstrations
              replace doing, the pupils who lose the most are those already
              least able to take part. Read more in{" "}
              <a href={getLocalizedPath("/blog/send-white-paper-2026-science-practicals/", language)}>
                our analysis of the 2026 SEND White Paper and science practicals
              </a>.
            </p>
          </div>
          <div className="send-image">
            <img
              src="/images/microscope.webp"
              alt="Adjusting the focus of a simulated microscope in the WhimsyLabs virtual lab"
              loading="lazy"
            />
          </div>
        </div>

        {/* How virtual labs remove barriers */}
        <div className="send-row reverse">
          <div className="send-text">
            <h2>How Do Virtual Labs Remove Those Barriers?</h2>
            <p>
              By taking the physical hazards and the fixed pace out of the
              practical while keeping the science intact. In WhimsyLabs there is
              no flame to fear, no glassware to drop, and no single speed the
              whole class must keep. A pupil can repeat a titration as many
              times as they need, slow a dissection down to follow each step, or
              return to an experiment later without the sensory overload of a
              busy laboratory.
            </p>
            <p>
              Crucially, the content is not simplified. The full dissection or
              titration covers the same detail as a real lab session &mdash; it
              is the delivery that adapts, not the curriculum. Pupils choose the
              equipment, make the decisions, encounter unexpected results, and
              learn from their own mistakes, instead of watching someone else do
              it. Explore{" "}
              <a href={getLocalizedPath("/features/", language)}>
                the full WhimsyLabs feature set
              </a>{" "}
              to see how the simulation works.
            </p>
          </div>
          <div className="send-image">
            <img
              src="/images/kidney_barclays.jpg"
              alt="Participants carrying out the WhimsyLabs virtual kidney dissection at a public demonstration"
              loading="lazy"
            />
          </div>
        </div>

        {/* Accessibility features */}
        <div className="send-features">
          <h2>What Accessibility Features Does WhimsyLabs Include?</h2>
          <p>
            WhimsyLabs was designed for SEND learners from the start rather than
            retrofitted afterwards. The core accessibility features are:
          </p>
          <ul className="send-features-list">
            <li>
              <strong>Full control remapping</strong> &mdash; every input can be
              reassigned, so pupils using adapted keyboards, switches, or
              one-handed setups can run the same practicals as everyone else.
            </li>
            <li>
              <strong>Text-to-speech</strong> &mdash; instructions and feedback
              can be read aloud, supporting pupils with dyslexia, visual
              impairment, or reading difficulties.
            </li>
            <li>
              <strong>Self-paced modes</strong> &mdash; no timer and no class
              pace to keep up with; pupils can focus on one step at a time and
              take breaks when they need them.
            </li>
            <li>
              <strong>Unlimited repetition at no cost</strong> &mdash; repeating
              a practical consumes no reagents or specimens, so practising a
              technique five times costs the same as once.
            </li>
            <li>
              <strong>No physical safety barriers</strong> &mdash; no open
              flames, sharps, or hazardous chemicals, removing the risk
              assessments that so often end with a pupil observing instead of
              participating.
            </li>
            <li>
              <strong>Low-bandwidth mode</strong> &mdash; keeps lessons running
              smoothly on unstable school internet connections, so access does
              not depend on infrastructure.
            </li>
          </ul>
          <p>
            It runs in the browser on the Chromebooks schools already own, as
            well as on VR headsets, Macs, and PCs.
          </p>
        </div>

        {/* Kidney dissection example */}
        <div className="send-row">
          <div className="send-text">
            <h2>Does This Actually Work for SEND Learners? A Real Example</h2>
            <p>
              Our virtual kidney dissection has been demonstrated publicly,
              including at Barclays Headquarters as part of a kidney health and
              organ donation awareness campaign. Attendees from a wide range of
              backgrounds physically manipulated a virtual scalpel, made
              incisions in virtual tissue, followed blood through the renal
              artery and nephrons, and examined structures under a simulated
              microscope &mdash; the same anatomical detail as a real
              dissection, delivered through an interface anyone could use.
            </p>
            <p>
              Teachers have reported that students with attention or processing
              challenges benefit from being able to focus on one step at a
              time, repeat complex actions, and receive feedback through
              movement and audio cues. Combining physical movement with visual
              and auditory input creates a scaffolded experience that adapts to
              diverse learning profiles &mdash; read the full story in{" "}
              <a href={getLocalizedPath("/blog/virtual-kidney-dissection-send-engagement/", language)}>
                our virtual kidney dissection and SEND engagement case study
              </a>.
            </p>
          </div>
        </div>

        {/* White Paper */}
        <div className="send-whitepaper">
          <h2>What Does the 2026 SEND White Paper Change?</h2>
          <p>
            In February 2026 the government published its schools White Paper,{" "}
            <em>Every Child Achieving and Thriving</em>. According to the House
            of Commons Library&rsquo;s summary, Education, Health and Care Plans
            are to be reserved for children with the most complex needs, while
            every other pupil with identified SEND receives a statutory digital
            Individual Support Plan held by their mainstream school &mdash;
            backed by a &pound;1.6 billion Inclusive Mainstream Fund and a
            &pound;1.8 billion &ldquo;Experts at Hand&rdquo; service.
          </p>
          <p>
            For science departments this means evidencing, pupil by pupil, how
            each child took part in each practical, what adjustment made that
            possible, and what progress followed. From September 2026, Ofsted
            has confirmed that inclusion runs through every inspection rather
            than sitting in a separate box. WhimsyLabs&rsquo; process-based
            assessment logs every action a pupil takes &mdash; equipment
            chosen, steps performed, technique over time &mdash; giving SENCOs
            and science leads a documented evidence trail for Individual
            Support Plans as a by-product of the lesson itself.
          </p>
        </div>

        {/* Funding */}
        <div className="send-funding">
          <h2>How Can SEND Leads Fund Virtual Labs?</h2>
          <p>
            Through budgets most schools already hold. Accessible practical
            science is a legitimate use of Pupil Premium and SEN budgets, and
            the White Paper&rsquo;s &pound;1.6 billion Inclusive Mainstream Fund
            gives school leaders a further budget line that accessible,
            evidence-generating tools can draw on. See{" "}
            <a href={getLocalizedPath("/grants/uk-school-funding/", language)}>
              our guide to UK school funding routes
            </a>{" "}
            for how to put a pilot together.
          </p>
        </div>

        {/* CTA */}
        <div className="send-cta">
          <h2>Give Every Pupil a Place at the Bench</h2>
          <p>
            See how WhimsyLabs works for your SEND cohort &mdash; from control
            remapping to the evidence trail for Individual Support Plans.
          </p>
          <a href={getLocalizedPath("/contact/", language)} className="send-cta-button">
            Book a Demo
          </a>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
};

export default SendSciencePage;
