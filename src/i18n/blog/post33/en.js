// English - Post 33: EdTech Critics Response
import React from "react";

export const title = "The Critics Are Right: Most EdTech Is Useless";
export const description = "US schools spent $30 billion on edtech in 2024. Critics say it's wasted. They're right about passive screen time. But virtual labs that make students actually DO science? That's a different story.";
export const keywords = [
  "edtech effectiveness",
  "virtual labs learning outcomes",
  "active learning technology",
  "education technology criticism",
  "passive vs active learning",
  "OECD digital education",
  "AI in education"
];

export const content = (
  <>
    <p>
      <em>"Is education technology mostly useless?"</em> asks{" "}
      <a
        href="https://www.economist.com/letters/2026/02/12/is-education-technology-mostly-useless"
        target="_blank"
        rel="noopener noreferrer"
      >
        The Economist
      </a>
      . <em>"Kids Spend Hours in School on Screens. And for What?"</em> echoes{" "}
      <a
        href="https://www.bloomberg.com/opinion/articles/2026-02-11/education-technology-isn-t-teaching-us-children-more-effectively"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bloomberg
      </a>
      . These are damning headlines. And as an edtech company ourselves, we find ourselves agreeing with much of the criticism.
    </p>

    <p>
      The Bloomberg piece highlights a staggering figure: US schools spent <strong>$30 billion on education technology in 2024</strong>, ten times what they spent on textbooks. Where did that investment go? Mostly into tablets, laptops, learning management systems, and apps that promised engagement but often delivered little more than screen time. The return on investment, according to these critics, has been questionable at best.
    </p>

    <h2>Why Is Most EdTech Failing?</h2>

    <p>
      The critics aren't wrong. They're just not specific enough about the problem. The issue isn't technology in education. The issue is <strong>passive technology</strong> in education.
    </p>

    <p>
      Consider what most "edtech" actually looks like in practice: students watching videos, clicking through multiple-choice quizzes, scrolling through digital textbooks. This is the same passive consumption that happens with television, just dressed up in educational language. The screen does the work while the student sits passively. Research consistently shows that passive learning has limited effectiveness compared to active engagement (
      <a
        href="https://www.pnas.org/doi/10.1073/pnas.1319030111"
        target="_blank"
        rel="noopener noreferrer"
      >
        Freeman et al., 2014
      </a>
      ).
    </p>

    <p>
      The{" "}
      <a
        href="https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        OECD's Digital Education Outlook 2026
      </a>{" "}
      makes this distinction clear. When general-purpose AI tools are simply handed to students without structure, learning often <em>decreases</em> because students outsource their thinking to the machine. However, AI designed with <strong>"intentional pedagogical purpose"</strong> shows sustained improvements. The difference isn't whether technology is present. It's whether the technology requires the learner to actively engage.
    </p>

    <p>
      CoSN's{" "}
      <a
        href="https://www.eschoolnews.com/innovative-teaching/2026/02/16/new-cosn-report-underscores-importance-of-intentional-reliable-edtech-use/"
        target="_blank"
        rel="noopener noreferrer"
      >
        2026 Driving K-12 Innovation Report
      </a>{" "}
      reinforces this point: <em>"without a human-centered strategy, even the best technology will fail."</em> Many schools purchased the technology without purchasing the strategy to implement it effectively.
    </p>

    <h2>What Makes Active Learning Different?</h2>

    <p>
      There is a substantial body of research on <strong>active learning</strong>, demonstrating that students learn more effectively when they do things rather than watch things. A landmark meta-analysis of 225 studies found that active learning improved examination performance by half a letter grade and reduced failure rates by 55% compared to traditional lecturing (
      <a
        href="https://www.pnas.org/doi/10.1073/pnas.1319030111"
        target="_blank"
        rel="noopener noreferrer"
      >
        Freeman et al., 2014
      </a>
      ). The question for educators has always been: how do you create active learning experiences at scale?
    </p>

    <p>
      Physical science labs have always exemplified active learning. Students don't watch a titration; they perform one. They don't read about pendulum motion; they measure it. The learning happens through action, through trial and error, through the physical engagement of manipulating equipment and observing results firsthand.
    </p>

    <p>
      The challenge is that physical labs are expensive, require careful safety management, are constrained by timetabling, and increasingly difficult to staff given the ongoing STEM teacher shortage. When COVID-19 closed schools worldwide, millions of students lost access to practical science education entirely (
      <a
        href="https://www.iza.org/publications/dp/13820/covid-19-and-educational-inequality-how-school-closures-affect-low-and-high-achieving-students"
        target="_blank"
        rel="noopener noreferrer"
      >
        Grewenig et al., 2021
      </a>
      ).
    </p>

    <p>
      This is where most edtech solutions have failed. They replaced active physical labs with passive digital alternatives: animations of experiments, videos of scientists at work, clickable diagrams with labels. Students watch someone else do science instead of doing it themselves. These alternatives are cheaper and safer, but according to research on embodied cognition and motor learning, they miss the fundamental mechanism through which practical skills are acquired (
      <a
        href="https://www.frontiersin.org/articles/10.3389/fpsyg.2019.00625/full"
        target="_blank"
        rel="noopener noreferrer"
      >
        Macedonia, 2019
      </a>
      ).
    </p>

    <h2>How Can Virtual Labs Preserve Active Learning?</h2>

    <p>
      At WhimsyLabs, we built our platform around one principle: preserve the <em>active</em> part of laboratory learning. In our virtual labs, students don't click a button labelled "add chemical." They physically pour liquids using natural hand movements. They don't select "heat beaker" from a menu. They position equipment over a Bunsen burner and control the flame themselves. They don't read about pipette technique. They develop muscle memory by actually pipetting, with their movements tracked and coached in real time.
    </p>

    <p>
      This approach is grounded in motor learning research. When you perform a physical action, your brain encodes it differently than when you watch someone else perform the same action. The neural pathways activated are different, the retention is different, and critically, the transfer to real-world skills is different (
      <a
        href="https://www.nature.com/articles/nphys293"
        target="_blank"
        rel="noopener noreferrer"
      >
        Wieman & Perkins, 2006
      </a>
      ).
    </p>

    <p>
      Our sandbox approach extends this further. Rather than following predetermined recipes, students design their own experiments. Given a problem such as "determine the concentration of this unknown acid," they must select appropriate equipment, plan their procedure, execute the techniques, analyse their results, and iterate when things don't work as expected. This is what scientists actually do. It requires active engagement at every step.
    </p>

    <h2>Can AI Assessment Be Meaningful Rather Than Threatening?</h2>

    <p>
      The current concern about students using ChatGPT and similar tools to complete assignments is legitimate. Students can use AI to write essays, solve mathematics problems, and generate laboratory reports. Traditional assessment methods that focus on written outputs are increasingly vulnerable to this kind of circumvention.
    </p>

    <p>
      However, there is something that text-generating AI fundamentally cannot do: <strong>physically perform a procedure</strong>.
    </p>

    <p>
      Our AI tutor, WhimsyCat, observes <em>how</em> students work, not just what written answers they produce. Did they hold the pipette at the correct angle? Did they approach the endpoint of a titration slowly enough? Did they remember to rinse the burette before filling it? Did they read the meniscus at eye level? These are physical actions captured in real time. They cannot be outsourced to a text generator because they are not text. They are motion, timing, spatial reasoning, and procedural knowledge demonstrated through action.
    </p>

    <p>
      Pearson's recent research on assessment has identified practical skills as inherently <strong>AI-resistant</strong>, not because anyone is deliberately blocking AI, but because the skills themselves require physical demonstration that language models cannot provide. You cannot fake titration technique by prompting ChatGPT. You have to actually do it.
    </p>

    <p>
      WhimsyCat assesses students on their process: experimental design choices, technique quality, troubleshooting approaches, and safety awareness. Every assessment generates an audit trail that teachers can review. This is not AI replacing teacher judgement. It is AI providing detailed evidence that teachers can use to make better-informed judgements about student competence.
    </p>

    <h2>What Does Human-Centered EdTech Actually Look Like?</h2>

    <p>
      The CoSN report emphasises that successful educational technology requires a <em>"human-centered strategy."</em> We take this principle seriously. WhimsyLabs is not designed to replace science teachers. It is designed to support them in managing an increasingly impossible workload.
    </p>

    <p>
      Consider the practical reality: a single science teacher supervising 30 students during a laboratory session cannot possibly observe each student's technique with the attention it deserves. There are not enough eyes, not enough time, not enough bandwidth. Consequently, practical assessment often becomes a checkbox exercise focused on whether students produced the expected final answer rather than whether they demonstrated competent technique.
    </p>

    <p>
      WhimsyCat provides continuous formative feedback while students work, coaching technique, identifying errors, and asking probing questions. This does not replace the teacher. It multiplies them. The teacher can focus attention on students who need human support while WhimsyCat handles routine guidance for others.
    </p>

    <p>
      Importantly, teachers remain in control. They can create custom experiments aligned with their curriculum. They can adjust difficulty levels. They can review AI assessments and override them when they disagree. The human remains at the centre of the educational process. The AI supports from the periphery.
    </p>

    <h2>What Questions Should We Be Asking About EdTech?</h2>

    <p>
      We would welcome more precise criticism of educational technology. Rather than asking broadly whether edtech is useless, consider these more specific questions:
    </p>

    <ul>
      <li><strong>Does this technology require active engagement?</strong> If students can use it while half-attending, it is likely passive.</li>
      <li><strong>Does it assess process or only outcomes?</strong> Multiple-choice quizzes capture only final answers. They miss the reasoning and technique that matters most.</li>
      <li><strong>Does it support teachers or attempt to replace them?</strong> Teacher replacement has failed repeatedly. Teacher augmentation shows genuine promise.</li>
      <li><strong>Is there evidence of learning transfer?</strong> Do students who use this technology perform better in real-world contexts?</li>
      <li><strong>Was it designed with pedagogical intent?</strong> Or was it designed by engineers who assumed learning would happen automatically once the technology was deployed?</li>
    </ul>

    <p>
      Much of the $30 billion spent on educational technology fails these tests. Tablets distributed without implementation plans fail these tests. Learning management systems that become repositories for PDF worksheets fail these tests. AI chatbots deployed without pedagogical frameworks fail these tests.
    </p>

    <p>
      Virtual laboratories where students physically perform experiments, receive real-time coaching on their technique, and demonstrate skills that AI cannot replicate? That represents a fundamentally different category of educational technology.
    </p>

    <h2>What Evidence Supports This Approach?</h2>

    <p>
      We do not ask anyone to accept these claims on faith. At BETT 2025, students themselves voted for WhimsyLabs in the <strong>Kids' Choice Awards</strong>, recognising the platform for making science engaging and accessible. At BETT 2026, <strong>Tech & Learning named us Best of BETT</strong>. These are not marketing awards. They represent recognition from educators and students who actually used the product and found it valuable.
    </p>

    <p>
      We are conducting ongoing research with partner schools measuring practical skill transfer. Early results indicate that students who practice procedures in WhimsyLabs demonstrate improved technique when they subsequently work in physical laboratories. The virtual practice transfers to real-world performance. The sandbox approach develops experimental design thinking that traditional cookbook-style labs struggle to cultivate.
    </p>

    <p>
      The critics are right: most edtech is failing to deliver meaningful educational value. We are working to be part of the solution rather than part of the problem.
    </p>

    <h2>Where Does This Leave Us?</h2>

    <p>
      The debate about educational technology should not be framed as "technology versus no technology." That choice is no longer available. Technology is embedded in education and will remain so. The productive debate concerns <em>what kind</em> of technology, designed according to <em>what principles</em>, implemented with <em>what strategies</em>.
    </p>

    <p>
      Passive screen time dressed up as learning? The critics are right to call it out. AI tools that do students' thinking for them? Counterproductive. Promises that technology will replace teachers? Repeatedly failed.
    </p>

    <p>
      Active learning environments that require genuine engagement. Assessment that tracks process and technique rather than just final answers. Technology that supports teachers rather than attempting to replace them. Platforms that make practical science accessible to schools that cannot afford or staff traditional laboratories. Tools that develop skills AI cannot fake.
    </p>

    <p>
      That is the educational technology worth investing in. We are trying to be a small part of building it.
    </p>

    <h2>Related Articles</h2>
    <ul>
      <li>
        <a href="/blog/oecd-ai-learning-paradox-virtual-labs">
          The OECD AI Learning Paradox: Why GenAI Fails Students (And How Virtual Labs Succeed)
        </a>
      </li>
      <li>
        <a href="/blog/ai-assessment-crisis-solution">
          The AI Assessment Crisis Has a Solution
        </a>
      </li>
      <li>
        <a href="/blog/pearson-webinar-vr-assessment-ai-age">
          Assessment in the Age of AI: Join Our Pearson Webinar
        </a>
      </li>
    </ul>

    <div className="references-section">
      <h3>References</h3>
      <ul className="references-list">
        <li>
          Freeman, S., Eddy, S. L., McDonough, M., Smith, M. K., Okoroafor, N., Jordt, H., & Wenderoth, M. P. (2014). Active learning increases student performance in science, engineering, and mathematics. <em>Proceedings of the National Academy of Sciences, 111</em>(23), 8410-8415.
        </li>
        <li>
          Grewenig, E., Lergetporer, P., Werner, K., Woessmann, L., & Zierow, L. (2021). COVID-19 and educational inequality: How school closures affect low- and high-achieving students. <em>European Economic Review, 140</em>, 103920.
        </li>
        <li>
          Macedonia, M. (2019). Embodied learning: Why at school the mind needs the body. <em>Frontiers in Psychology, 10</em>, 2098.
        </li>
        <li>
          OECD. (2026). <em>OECD Digital Education Outlook 2026</em>. OECD Publishing.{" "}
          <a href="https://www.oecd.org/en/publications/oecd-digital-education-outlook-2026_062a7394-en.html" target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </li>
        <li>
          CoSN. (2026). <em>2026 Driving K-12 Innovation Report</em>. Consortium for School Networking.{" "}
          <a href="https://www.cosn.org/tools-and-resources/resource/2026-driving-k-12-innovation-report-hurdles-accelerators-tech-enablers/" target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </li>
        <li>
          The Economist. (2026, February 12). Is education technology mostly useless? <em>The Economist</em>.{" "}
          <a href="https://www.economist.com/letters/2026/02/12/is-education-technology-mostly-useless" target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </li>
        <li>
          Bloomberg. (2026, February 11). Kids Spend Hours in School on Screens. And for What? <em>Bloomberg Opinion</em>.{" "}
          <a href="https://www.bloomberg.com/opinion/articles/2026-02-11/education-technology-isn-t-teaching-us-children-more-effectively" target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </li>
        <li>
          Wieman, C. E., & Perkins, K. K. (2006). A powerful tool for teaching science. <em>Nature Physics, 2</em>(5), 290-292.
        </li>
      </ul>
    </div>
  </>
);
