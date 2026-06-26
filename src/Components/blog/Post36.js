import React from "react";

export const title = "When AI Misreads 'At Least One': Why Text-Based Grading Fails";
export const date = "2026-04-02";
export const slug = "ai-text-grading-fails-process-assessment-works";
export const description =
  "A Connecticut student lost points because AI interpreted 'at least one' as 'only one.' Over 150 students signed a petition against AI grading. Here's why measuring physical actions eliminates this problem entirely.";
export const keywords = [
  "AI grading problems",
  "process-based assessment",
  "virtual lab grading",
  "AI assessment errors",
  "automated essay scoring",
  "virtual laboratory",
  "AI text interpretation",
  "educational technology"
];

export const content = (
  <div>
    <p>
      Liam Roselle, a senior at Amity Regional High School in Connecticut, received a one out of three on two questions for an AP Psychology assignment. The feedback told him he had failed to provide specific evidence. He had provided it. The problem, he eventually discovered, was that the question asked for "at least one piece of specific and relevant evidence," and he had cited multiple studies. The AI grading system interpreted "at least one" as "only one" and penalised him for doing more than the minimum.
    </p>

    <p>
      To recover a single point on a homework assignment, Roselle had to write a three-paragraph email appeal citing the exact wording of the question and explaining the semantics of the phrase "at least." His teacher agreed the explanation made sense and awarded the point. But as Roselle wrote in{" "}
      <a
        href="https://ctmirror.org/2026/03/05/my-school-is-grading-me-with-ai-it-got-my-grade-wrong/"
        target="_blank"
        rel="noopener noreferrer"
      >
        CT Mirror
      </a>
      , "The question worth asking is how many students, facing the same error, simply accepted the score and moved on."
    </p>

    <p>
      He is not alone in his concern. More than 150 Amity students have signed a petition against AI grading at their school. And their concerns are backed by research: a study presented at the 2024 American Educational Research Association conference found that{" "}
      <a
        href="https://hechingerreport.org/proof-points-ai-essay-grading/"
        target="_blank"
        rel="noopener noreferrer"
      >
        AI and human graders reach exact agreement only about 40 percent of the time
      </a>
      , with consistent bias against high-quality writing. When professional AP scorers disagree on essays, they bring in a mediator. AI grading systems offer no such safeguard by default.
    </p>

    <h2>Why Does AI Struggle with Written Assessment?</h2>

    <p>
      The "at least one" misinterpretation is not an edge case. It reveals a fundamental limitation of how AI systems process natural language. These systems work through pattern matching: they learn what "correct" answers typically look like and score submissions based on similarity to those patterns. When a student expresses correct understanding in an unexpected way, or provides more than the expected minimum, the system fails to recognise it.
    </p>

    <p>
      Language is inherently ambiguous. Consider how many ways a student might correctly describe the same scientific concept:
    </p>

    <ul>
      <li>"The solution turned pink" vs "The indicator changed colour" vs "A colour change was observed"</li>
      <li>"At least one example" could mean one, two, or five examples</li>
      <li>"The reaction requires heat" vs "thermal energy is needed" vs "elevated temperature"</li>
      <li>"Colour" vs "color" depending on whether you learned British or American English</li>
    </ul>

    <p>
      Each of these variations expresses the same scientific understanding. A human grader recognises them as equivalent. An AI system trained on particular phrasings may not.
    </p>

    <p>
      Research on automated essay scoring has documented these failures extensively. AI systems penalise unconventional sentence structures even when the scientific content is accurate. They reward verbose, confident-sounding prose over concise, accurate responses. They show consistent bias patterns that disadvantage certain writing styles regardless of the knowledge being demonstrated.
    </p>

    <h2>The Hidden Costs of AI Grading Errors</h2>

    <p>
      Roselle's case illustrates the hidden burden AI grading places on students. He successfully appealed his grade, but doing so required academic writing skills, confidence in challenging an automated system, and a teacher willing to review the appeal. How many students lack one or more of these?
    </p>

    <p>
      The students most likely to accept an incorrect AI score are often those who already struggle academically. They may lack the confidence to challenge authority, even algorithmic authority. They may not have the writing skills to construct a persuasive appeal. They may have learned from experience that their objections are dismissed. AI grading systems, presented as objective and efficient, may systematically disadvantage precisely the students who need the most support.
    </p>

    <p>
      Furthermore, Roselle's FOIA request revealed that Amity Regional had purchased five AI products totalling $19,216.51, over $8,000 more than the $11,000 figure the district had been publicly citing. The discrepancy raises questions about transparency and accountability in educational technology procurement. When districts cannot accurately report what AI tools they use and at what cost, meaningful oversight becomes impossible.
    </p>

    <h2>What If We Eliminated the Ambiguity Entirely?</h2>

    <p>
      There is an alternative to forcing AI systems to interpret ambiguous text: assess actions instead of words. When a student performs a titration in a virtual lab, there is no ambiguity about whether they added reagent dropwise near the endpoint. Either they did or they did not. The system does not need to parse their description; it observes their technique directly.
    </p>

    <p>
      This is the principle behind process-based assessment. Instead of asking students to describe what they would do and then parsing their language, you watch what they actually do and measure it. The difference is profound:
    </p>

    <ul>
      <li><strong>Text-based:</strong> "I pipetted 2.5 millilitres of the solution" must be interpreted. Did they mean exactly 2.5? Approximately 2.5? Did they describe the action they took or the action they intended?</li>
      <li><strong>Process-based:</strong> The virtual pipette recorded 2.47 mL transferred. No interpretation required.</li>
    </ul>

    <p>
      Arizona State University's{" "}
      <a
        href="https://www.dreamscapelearn.com/research"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dreamscape Learn programme
      </a>{" "}
      demonstrates this approach at scale. Students solve biological problems in immersive VR environments, and the system grades them on their reasoning pathway through the problem, not on written explanations of what they did. Early results show students in these process-based sections achieve higher grades and better retention than peers in conventional courses.
    </p>

    <h2>Physics Does Not Have Semantic Ambiguity</h2>

    <p>
      The fundamental advantage of process-based assessment is that physical actions are definite. When a student tilts a beaker, the angle of tilt is measurable. When they apply heat, the temperature change follows predictable physics. When they measure volume, the measurement has a specific value. There are no synonyms for physical actions.
    </p>

    <p>
      This is why we built WhimsyLabs around a proprietary physics engine rather than scripted animations. Our simulations track actual physical quantities: the volume of liquid in a container, the precise timing of additions, the steadiness of technique. When we assess student performance, we compare their actions against correct technique, not their descriptions against expected phrases.
    </p>

    <p>
      A student from Germany, Japan, or Spain performs the same pipetting motion. A student who speaks English as a second language demonstrates the same understanding by swirling a flask at the right moment. The universal language of scientific procedure transcends the ambiguities that plague text-based AI grading.
    </p>

    <h2>What About Written Communication Skills?</h2>

    <p>
      A legitimate question arises: should science education not also develop written communication skills? The ability to describe scientific procedures clearly is valuable.
    </p>

    <p>
      The answer is yes, but with an important distinction. Written communication is a skill worth developing, and it can be assessed when that is the explicit goal. The problem with AI-graded written assessments is that they conflate scientific understanding with writing ability. A student who understands titration deeply but writes awkwardly is penalised not for scientific misconceptions but for linguistic ones. A student who writes fluently but understands superficially may receive higher scores.
    </p>

    <p>
      Process-based assessment separates these concerns. When you want to assess scientific technique, assess technique directly. When you want to assess scientific communication, assess communication explicitly. Do not pretend to measure one while actually measuring the other.
    </p>

    <h2>The Real Promise of AI in Assessment</h2>

    <p>
      The failures of AI text grading do not mean AI has no role in educational assessment. They mean AI should be applied to tasks where it excels rather than tasks where it struggles.
    </p>

    <p>
      AI excels at pattern recognition in structured data, tracking procedural sequences, identifying specific technique errors, and analysing large datasets for patterns. These capabilities are perfectly suited to process-based assessment, where the data is unambiguous and the patterns are well-defined.
    </p>

    <p>
      In WhimsyLabs, our AI tutor WhimsyCat uses process data to provide real-time feedback. When a student rushes through a procedure, WhimsyCat notices and suggests slowing down. When a student repeats the same error multiple times, WhimsyCat explains why the approach is not working and offers alternatives. This feedback is possible because the data is precise. WhimsyCat is not trying to guess whether a student understood something from an ambiguous phrase; it observed exactly what the student did.
    </p>

    <h2>What Roselle's Appeal Reveals</h2>

    <p>
      Return to Liam Roselle's case. His successful appeal required him to explain, with citations to the question's exact wording, why the AI's interpretation was wrong. His teacher noted that "as both AI scoring tools and humans can interpret questions and answers differently, and are fallible," he was glad they had the chance to discuss it.
    </p>

    <p>
      This statement inadvertently reveals the core problem. When assessment requires interpretation of language, disagreement is inevitable. Humans disagree with each other. AI disagrees with humans. AI disagrees with itself when presented with rephrased versions of identical content. The system is unstable because language is unstable.
    </p>

    <p>
      But a pipetting technique requires no interpretation. A titration endpoint requires no interpretation. The angle of a beaker, the timing of an addition, the steadiness of a hand: these are facts, not interpretations. Assessment built on facts rather than interpretations produces consistent, defensible results that require no appeals.
    </p>

    <h2>The Path Forward</h2>

    <p>
      Amity Regional High School's board was scheduled to vote on next year's budget on March 9, 2026. Roselle had been sending them daily emails for over two weeks, asking them to reckon seriously with what 150 students were saying and with what one student had to do to recover a point he had already earned.
    </p>

    <p>
      His situation reflects a broader challenge facing education: the pressure to adopt AI for efficiency gains without adequately considering where AI actually performs well. Text interpretation is hard because text is ambiguous. This is not a temporary limitation awaiting a breakthrough. It is a fundamental property of natural language.
    </p>

    <p>
      The solution is not to abandon AI but to deploy it appropriately. Process-based assessment in virtual laboratories represents one such appropriate deployment. When students demonstrate their understanding through action rather than description, AI can assess them accurately, fairly, and at scale. The semantic ambiguity that trapped Roselle disappears entirely.
    </p>

    <p>
      AI cannot misread a pipetting technique because there is nothing to misread. The action either happened correctly or it did not. In that clarity lies a better future for educational assessment.
    </p>

    <>
      <h2>Related Articles</h2>
      <ul>
        <li>
          <a href="/blog/ai-assessment-crisis-solution">
            AI and the Assessment Crisis: How Process Data Changes Everything
          </a>
        </li>
        <li>
          <a href="/blog/edtech-critics-right-passive-learning-vs-active-labs">
            The Critics Are Right: Most EdTech Is Useless
          </a>
        </li>
        <li>
          <a href="/blog/vr-stem-education-research-pedagogical-scaffolding">
            New VR Research Confirms: Technology Without Pedagogy Falls Flat
          </a>
        </li>
        <li>
          <a href="/blog/whimsycat-ai-tutor-transforming-science-education">
            Meet WhimsyCat: Our AI Innovation in Science Education
          </a>
        </li>
      </ul>
    </>

    <div className="references-section">
      <h3>References</h3>
      <ul className="references-list">
        <li key="ref-1">
          Roselle, L. (2026, March 5). My school is grading me with AI. It got my grade wrong.{" "}
          <em>CT Mirror</em>.{" "}
          <a href="https://ctmirror.org/2026/03/05/my-school-is-grading-me-with-ai-it-got-my-grade-wrong/" target="_blank" rel="noopener noreferrer">
            https://ctmirror.org/2026/03/05/my-school-is-grading-me-with-ai-it-got-my-grade-wrong/
          </a>
        </li>
        <li key="ref-2">
          Barshay, J. (2024). AI essay grading: What the research shows.{" "}
          <em>The Hechinger Report</em>.{" "}
          <a href="https://hechingerreport.org/proof-points-ai-essay-grading/" target="_blank" rel="noopener noreferrer">
            https://hechingerreport.org/proof-points-ai-essay-grading/
          </a>
        </li>
        <li key="ref-3">
          Dreamscape Learn. (2024). Research and outcomes at Arizona State University.{" "}
          <a href="https://www.dreamscapelearn.com/research" target="_blank" rel="noopener noreferrer">
            https://www.dreamscapelearn.com/research
          </a>
        </li>
        <li key="ref-4">
          Keep Amity Human. (2026). FOIA documents on AI tools in Amity Regional School District.{" "}
          <a href="https://keepamityhuman.org/foia.html" target="_blank" rel="noopener noreferrer">
            https://keepamityhuman.org/foia.html
          </a>
        </li>
        <li key="ref-5">
          American Educational Research Association. (2024). Research on automated essay scoring reliability and bias.
        </li>
      </ul>
    </div>
  </div>
);
