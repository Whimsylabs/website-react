import React from "react";
import { getLocalizedPath, getCurrentLanguage } from '../../i18n';

export const title =
  "AI Detection Doesn't Work. Process-Based Assessment Does.";
export const date = "2026-01-28";
export const slug = "ai-assessment-crisis-solution";
export const description =
  "82% of educators fear AI cheating, but detection tools fail. Process-based practical assessment offers a better path forward.";
export const keywords = [
  "AI assessment",
  "formative assessment AI",
  "AI detection education",
  "Pearson assessment research",
  "virtual lab grading",
  "process-based assessment",
  "AI-resistant assessment",
  "science education AI",
  "practical assessment",
  "teacher AI grading"
];

const ContactCTA = () => {
  const language = getCurrentLanguage();
  return (
    <p>
      Interested in seeing this in action? <a href={getLocalizedPath("/contact", language)}>Get in touch</a> to learn how WhimsyLabs can improve practical science assessment at your school.
    </p>
  );
};

export const content = (
  <div>
    <figure className="blog-image">
      <img
        src="/images/potato.jpg"
        alt="Student performing practical assessment in virtual lab, in this example the student is cutting a potato for use with microbiology experiments"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        Process-based assessment captures what students actually do, not just what they submit
      </figcaption>
    </figure>

    <p>
      In December 2025, Pearson published a finding that surprised nobody who works in education: <a href="https://plc.pearson.com/en-GB/news-and-insights/assessment-evolved-redefining-formative-assessment-in-a-generative-ai-era" target="_blank" rel="noopener noreferrer">82% of educators are concerned about students using GenAI to complete assignments</a>. The institutional response has been predictable. Detection tools, surveillance software, and policies treating AI as something to catch and punish.
    </p>
    <p>
      Two years into widespread ChatGPT use, we can see how well that's working. Detection tools produce false positives that destroy trust with students. Policies differ wildly between departments, let alone institutions. Students, who use AI at rates far higher than educators estimate, have simply gotten better at hiding it.
    </p>
    <p>
      Pearson's research points to something more fundamental though. The risk isn't really cheating. The risk is that students skip the cognitive work that makes learning happen in the first place. When a student gets ChatGPT to write their lab report, they haven't just cheated on an assignment. They've missed the thinking that the assignment was supposed to produce.
    </p>
    <p>
      At WhimsyLabs, we've been approaching this differently. Rather than asking how to catch AI use, we asked how to design assessments where AI simply can't help.
    </p>

    <h2>Why Detection Fails</h2>
    <p>
      AI detection tools claim to identify machine-generated text with high accuracy. The reality is messier. These tools struggle to distinguish AI writing from human writing, especially as students get more sophisticated with prompting. They also produce false positives, sometimes flagging work that students genuinely wrote themselves. For a student wrongly accused of AI cheating, the damage to their relationship with the institution can be permanent.
    </p>
    <p>
      Kane Murdoch, who handles complaints and misconduct at Macquarie University, puts it well in Pearson's report: "The problem with detectors is that they do not generate any evidence... Once someone sees that number provided by the detector, they will be biased throughout any subsequent process."
    </p>
    <p>
      Beyond the accuracy problems, detection creates an adversarial dynamic. It assumes students are cheating until proven innocent. It consumes time and energy that could go toward actual teaching. And it does nothing to address the underlying issue of whether students are actually learning.
    </p>

    <h2>Assessing Process Instead of Product</h2>
    <p>
      Consider assessing how students work rather than just what they produce. Researchers call this approach <a href="https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1499495/full" target="_blank" rel="noopener noreferrer">process-driven assessment</a>, evaluating not just the final product but a student's interaction throughout the learning journey.
    </p>
    <p>
      This is the approach we've built into WhimsyLabs. Our virtual laboratories don't just let students perform experiments. They capture detailed data about every action: how precisely students pipette, whether they detect endpoints correctly, how they handle equipment, whether they follow safety protocols.
    </p>
    <p>
      This data enables something traditional assessment can't do: evaluating procedural competence directly. We don't ask students to describe how they would perform a titration. We watch them do it. We measure their precision. We see if they remove air bubbles from the burette. We know if they overshoot the endpoint.
    </p>
    <p>
      ChatGPT cannot perform a virtual titration for a student. There's nothing to detect because there's nothing to fake.
    </p>

    <h2>What We Measure</h2>
    <p>
      When a student completes a virtual experiment, we don't just record their final answer. We capture evidence across multiple dimensions:
    </p>
    <ul>
      <li><strong>Precision:</strong> Were measurements consistent across trials? (±0.02 mL or ±0.5 mL?)</li>
      <li><strong>Technique:</strong> Smooth stopcock control? Correct swirling of the flask?</li>
      <li><strong>Timing:</strong> How quickly did they recognize the endpoint? How long did setup take?</li>
      <li><strong>Safety:</strong> Proper PPE? Correct chemical handling and disposal?</li>
      <li><strong>Problem-solving:</strong> When results were unexpected, how did they respond?</li>
    </ul>
    <p>
      Pearson calls this "richer forms of evidence." Traditional assessments simply cannot capture this kind of data. More importantly for the AI problem, this evidence requires the student to have actually performed the work.
    </p>

    <h2>AI That Helps Teachers, Not Students Cheat</h2>
    <p>
      Our solution to the AI assessment problem does involve AI, but in a different role. Instead of helping students skip learning, we use AI to help teachers assess learning.
    </p>
    <p>
      When a student completes a virtual experiment, our system analyzes their action log and experimental data. It suggests grades across five dimensions: experimental procedure, data collection, calculations, lab safety, and scientific communication. Each suggestion includes a confidence level (75-98%), showing teachers where AI assessment is reliable and where human judgment matters more. Teachers review, adjust, and approve final grades. The AI handles the time-consuming analysis. The human makes the judgment calls.
    </p>
    <p>
      This aligns with what Pearson's expert panel recommends: using AI as a "force multiplier for formative assessment" while ensuring educators remain in control.
    </p>

    <h2>Why Practical Assessment Resists AI Shortcuts</h2>
    <p>
      Pearson's research asked educators which assessment types were most vulnerable to AI misuse. The results were unsurprising. Essays, coding assignments, and multiple-choice questions ranked as most vulnerable. Simulations and game-based activities ranked as least vulnerable.
    </p>
    <p>
      This makes sense. You can prompt ChatGPT to write about chemistry. You cannot prompt it to do chemistry. The physical nature of practical work creates a barrier that text-based AI cannot cross. Engineering educators have described this as <a href="https://arxiv.org/html/2509.25258" target="_blank" rel="noopener noreferrer">"plagiarism resistance"</a> through hands-on skill assessment.
    </p>
    <p>
      For science education, this is actually good news. The subjects that require hands-on practical work are exactly the subjects where AI shortcuts fail. We don't need to fight the technology. We need to lean into what makes science education different from essay writing.
    </p>

    <div
      className="bluesky-embed-container"
      style={{ margin: "20px 0", textAlign: "center" }}
    >
      <bsky-embed
        search="Looking through the microscope in our VR science lab!"
        limit="1"
        link-target="_blank"
        custom-styles=".border-slate-300 { border-color: #e1e8ed; border-radius: 12px; max-width: 600px; margin: 0 auto; }"
      ></bsky-embed>
    </div>

    <h2>The Real Problem</h2>
    <p>
      Amanda Bickerstaff, CEO of AI for Education, identifies the core concern in Pearson's report:
    </p>
    <blockquote style={{ borderLeft: '4px solid #dabeff', paddingLeft: '1rem', margin: '1.5rem 0', fontStyle: 'italic' }}>
      "The deeper reason why academic integrity breaches are so scary right now is the fear that kids will start devaluing the role of education, the role of learning."
    </blockquote>
    <p>
      Detection and punishment won't fix that. Demonstrating that education still matters will. And the way to do that is by assessing the things that actually require learning to demonstrate.
    </p>
    <p>
      When we assess students on their ability to physically perform a titration with precision, there's no shortcut. When we grade them on how they handle unexpected results during an experiment, AI can't help. When we evaluate their technique, timing, and safety compliance in real-time, the assessment becomes inseparable from the learning.
    </p>

    <h2>Moving Forward</h2>
    <p>
      We think the solution to the AI assessment problem isn't more surveillance or stricter policies. It's better assessment design. Assessments that require authentic demonstration of skills, capture rich evidence of learning, and use AI to enhance human judgment rather than replace it.
    </p>
    <p>
      This doesn't mean abandoning written assessments. But it does mean recognizing their limitations and supplementing them with methods that capture what writing cannot: procedural knowledge, technique, the ability to perform under pressure and adapt when things go wrong.
    </p>
    <p>
      At WhimsyLabs, we're building tools to make that possible. Because the future of assessment isn't about catching cheaters. It's about designing learning experiences worth doing honestly.
    </p>

    <ContactCTA />

    <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
    <p style={{ fontSize: '0.9rem', color: '#666' }}>
      <strong>Sources:</strong>
    </p>
    <ul style={{ fontSize: '0.9rem', color: '#666' }}>
      <li>
        <a href="https://plc.pearson.com/en-GB/news-and-insights/assessment-evolved-redefining-formative-assessment-in-a-generative-ai-era" target="_blank" rel="noopener noreferrer">
          Pearson (2025). Assessment Evolved: Redefining Formative Assessment in a Generative AI Era.
        </a>
      </li>
      <li>
        <a href="https://arxiv.org/abs/2303.11156" target="_blank" rel="noopener noreferrer">
          Liang, W. et al. (2023). GPT detectors are biased against non-native English writers. arXiv.
        </a>
      </li>
      <li>
        <a href="https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1499495/full" target="_blank" rel="noopener noreferrer">
          Frontiers in Education (2024). AI-resistant assessments in higher education: practical insights from faculty training workshops.
        </a>
      </li>
      <li>
        <a href="https://arxiv.org/html/2509.25258" target="_blank" rel="noopener noreferrer">
          arXiv (2025). AI-Powered Assessment Framework for Skill-Oriented Engineering Lab Education.
        </a>
      </li>
    </ul>
  </div>
);
