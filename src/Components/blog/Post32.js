import React from "react";
import { getLocalizedPath, getCurrentLanguage } from '../../i18n';

export const title = "Assessment in the Age of AI: Join Our Pearson Webinar";
export const date = "2026-02-17";
export const slug = "pearson-webinar-vr-assessment-ai-age";
export const description = "Dr Marisa French speaks at Pearson's Immersive Practitioners' Community Webinar on 26 February 2026. Learn how VR enables process-driven assessment that makes AI cheating irrelevant.";
export const keywords = "Pearson webinar, VR assessment, immersive learning, AI-resistant assessment, process-driven assessment, science education, virtual labs";

const ContactCTA = () => {
  const language = getCurrentLanguage();
  return (
    <p>
      I hope to see you there. And if you can't make it but want to learn more about process-driven assessment in virtual labs, feel free to <a href={getLocalizedPath("/contact", language)}>get in touch</a> directly. We're always happy to discuss how WhimsyLabs can support authentic assessment in your school or institution.
    </p>
  );
};

const RelatedArticles = () => {
  const language = getCurrentLanguage();
  return (
    <>
      <h2>Further Reading</h2>
      <ul>
        <li><a href={getLocalizedPath("/blog/ai-assessment-crisis-solution", language)}>The AI Assessment Crisis: How Virtual Labs Offer a Solution</a></li>
        <li><a href={getLocalizedPath("/blog/teachers-are-experts-custom-experiment-designer", language)}>Teachers Are the Experts. We Just Build the Tools.</a></li>
        <li><a href={getLocalizedPath("/blog/whimsycat-ai-tutor-transforming-science-education", language)}>Meet WhimsyCat: The AI Tutor That Watches What You Do</a></li>
        <li><a href={getLocalizedPath("/blog/how-to-choose-virtual-lab-software-school", language)}>How to Choose Virtual Lab Software for Your School</a></li>
      </ul>
    </>
  );
};

export const content = (
  <>
    <figure className="blog-image">
      <img
        src="/images/vr_whimsycat.png"
        alt="Student in VR headset conducting virtual lab experiment"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        Virtual labs track what students DO, not just what they submit.
      </figcaption>
    </figure>

    <p>
      AI cheating has become the defining headache of modern education. Students use ChatGPT to write essays. They use Wolfram Alpha to solve maths problems. They use any number of tools to generate work that looks like theirs but isn't. And teachers are exhausted.
    </p>
    <p>
      The standard response has been detection: plagiarism checkers, AI writing detectors, proctoring software. But detection is a losing battle. Every new detection tool spawns new evasion techniques. It's an arms race with no end in sight.
    </p>
    <p>
      What if there's a better approach? What if, instead of trying to catch AI-generated work, we designed assessment in ways that make AI irrelevant?
    </p>
    <p>
      That's exactly what I'll be discussing at <strong>Pearson's Immersive Practitioners' Community Webinar</strong> on <strong>Thursday, 26th February 2026</strong>. If you're a UK educator interested in how immersive technology can transform assessment, I'd love for you to join us.
    </p>

    <h2>Event Details</h2>
    <ul>
      <li><strong>Date:</strong> Thursday, 26th February 2026</li>
      <li><strong>Time:</strong> 3:30pm to 5:00pm (UK)</li>
      <li><strong>Format:</strong> Online webinar with Q&A</li>
      <li><strong>Audience:</strong> UK educators across schools, colleges, and higher education</li>
      <li><strong>Cost:</strong> Free</li>
    </ul>
    <p>
      <strong><a href="https://pearson.cventevents.com/YaQgOy" target="_blank" rel="noopener noreferrer">Register here →</a></strong>
    </p>

    <h2>What We'll Cover</h2>
    <p>
      The webinar brings together Pearson's latest research on GenAI and assessment with practical insights from WhimsyLabs on implementing VR-based assessment in real classrooms. The session includes:
    </p>
    <ul>
      <li><strong>Pearson's GenAI research:</strong> What the data tells us about AI's impact on assessment validity</li>
      <li><strong>Best practice for VR assessment:</strong> How to design and implement assessment in immersive environments</li>
      <li><strong>Open discussion:</strong> Share experiences and challenges with fellow educators</li>
    </ul>

    <h2>Why Process-Driven Assessment Changes Everything</h2>
    <p>
      Traditional assessment asks: "What did the student produce?" This creates a fundamental problem in the AI age. If you're only looking at the final output, you can't distinguish between a student who understands the material and one who prompted ChatGPT effectively.
    </p>
    <p>
      Process-driven assessment asks a different question: "What did the student actually do?"
    </p>
    <p>
      In a virtual laboratory environment, we can answer that question with precision. When a student performs a titration in WhimsyLabs, we capture everything: Did they rinse the burette before filling it? Did they add the indicator to the conical flask? Did they approach the endpoint slowly, adding drops one at a time? Did they record their readings accurately?
    </p>
    <p>
      This isn't about surveillance. It's about capturing the skills that actually matter in science education. A student who can recite the steps of a titration hasn't demonstrated competence. A student who can perform a titration properly, with appropriate technique and attention to precision, has demonstrated real practical ability.
    </p>

    <h2>The Research Behind Process-Driven Assessment</h2>
    <p>
      This isn't just theory. A recent paper in Frontiers in Education (<a href="https://doi.org/10.3389/feduc.2024.1499495" target="_blank" rel="noopener noreferrer">French & Sherwin, 2024</a>) explored how virtual labs enable process-driven assessment. The key insight: when you track student actions rather than just final outputs, you create assessment that is naturally robust against AI assistance.
    </p>
    <p>
      Why? Because AI can write about titrations. AI can describe the steps. AI can even generate realistic-looking data tables. But AI cannot perform a titration. It cannot demonstrate proper technique. It cannot show the procedural knowledge that comes from practice.
    </p>
    <p>
      When assessment focuses on process, the question of "did they use AI?" becomes less relevant. What matters is: can they do the thing?
    </p>

    <h2>Making AI Irrelevant, Not Invisible</h2>
    <p>
      Let me be clear: the goal isn't to ban AI from education. AI tools are here to stay, and students should learn to use them effectively. The goal is to design assessment that evaluates what we actually care about.
    </p>
    <p>
      In science education, we care about practical competence. We want students who can handle equipment safely. We want students who understand why each step of a procedure matters. We want students who can troubleshoot when things go wrong.
    </p>
    <p>
      Virtual labs, with their complete process visibility, let us assess exactly these skills. Not instead of traditional assessment, but as a complement to it. Written work still has its place. But practical skills deserve assessment that actually captures practical ability.
    </p>

    <h2>What This Looks Like in Practice</h2>
    <p>
      At the webinar, I'll share concrete examples of process-driven assessment in action:
    </p>
    <ul>
      <li><strong>Technique scoring:</strong> How WhimsyLabs' AI evaluates practical technique in real-time</li>
      <li><strong>Competency tracking:</strong> Measuring improvement over multiple attempts, not just final performance</li>
      <li><strong>Error analysis:</strong> Understanding where students struggle and why</li>
      <li><strong>Teacher dashboards:</strong> Giving educators visibility into practical skill development</li>
    </ul>
    <p>
      I'll also discuss the challenges we've encountered and how we've addressed them. Process-driven assessment isn't a magic solution. It requires thoughtful implementation and clear communication with students about what's being assessed and why.
    </p>

    <h2>Who Should Attend</h2>
    <p>
      This webinar is designed for UK educators who are:
    </p>
    <ul>
      <li>Concerned about AI's impact on assessment validity</li>
      <li>Curious about immersive technology in education</li>
      <li>Looking for practical approaches to authentic assessment</li>
      <li>Teaching science subjects at any level</li>
      <li>Involved in curriculum design or assessment policy</li>
    </ul>
    <p>
      You don't need any prior experience with VR or immersive technology. The session is designed to be accessible to educators at all levels of technical familiarity.
    </p>

    <h2>Join the Conversation</h2>
    <p>
      The best part of these webinars is the discussion. Pearson's Immersive Practitioners' Community brings together educators from across the UK who are thinking seriously about how technology can serve learning. The Q&A section is always rich with insights and practical questions.
    </p>
    <p>
      I'm looking forward to hearing what challenges you're facing and what solutions you've found. Assessment in the AI age is a problem we're all navigating together, and the best ideas often come from practitioners in the field.
    </p>

    <h2>Register Now</h2>
    <p>
      The webinar is free to attend, but registration is required. Spaces may be limited, so I'd encourage you to sign up early if you're interested.
    </p>
    <p style={{ textAlign: 'center', margin: '2rem 0' }}>
      <a 
        href="https://pearson.cventevents.com/YaQgOy" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          backgroundColor: '#6B46C1',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}
      >
        Register for the Webinar →
      </a>
    </p>
    <ContactCTA />

    <div className="references-section">
      <h3>References</h3>
      <ul className="references-list">
        <li key="ref-1">
          French, M., & Sherwin, G. (2024). WhimsyLabs: A browser-based virtual laboratory platform for accessible and authentic science education.
          <em> Frontiers in Education</em>, 9, 1499495.
          <a href="https://doi.org/10.3389/feduc.2024.1499495" target="_blank" rel="noopener noreferrer"> https://doi.org/10.3389/feduc.2024.1499495</a>
        </li>
      </ul>
    </div>

    <RelatedArticles />
  </>
);

export default { title, date, slug, description, keywords, content };
