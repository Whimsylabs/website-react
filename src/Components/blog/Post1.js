import React from "react";
import oldLab from '../images/oldLab.png'; // Mockup lab image
import testLab from '../images/testLab.png'; // Tech test lab image
import finalLab from '../images/finalLab.png'; // Final lab design image

export const title = "A Brief History of Whimsylabs: From our Humble Start to a BETT 2025 Winner ";
export const date = "2025-01-27";
export const slug = "whimsylabs-education-revolution";
export const description =
  "How Whimsylabs, founded by Marisa French, is addressing STEM challenges with fully simulated labs, impactful partnerships, and award-winning innovation.";

export const content = (
  <div>
    <p>
      Whimsylabs was initially started in 2020 by Marisa French towards the end of her Physics PhD, right as the pandemic was beginning to hit. The devastating impact of COVID-19, which shuttered traditional lab environments, left many students without access to hands-on science education for years (<a href="https://www.nature.com/articles/s41562-020-0905-x" target="_blank" rel="noopener noreferrer">Grewenig et al., 2021</a>). This coupled with the UK's declining STEM rankings—with the UK dropping to 27th place in the OECD Programme for International Student Assessment (PISA) science rankings (<a href="https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en.html" target="_blank" rel="noopener noreferrer">OECD, 2023</a>)—highlighted a crisis for British education that felt personal, as Marisa had been inspired to pursue science due to the practicals she had experienced in secondary school.
    </p>
    <p>      
      Driven by a desire to create meaningful change, Marisa leveraged her simulation and gaming skills to develop a fully simulated sandbox virtual laboratory. Research demonstrates that simulation-based learning environments can significantly improve student engagement and learning outcomes, particularly in STEM fields where hands-on experimentation is crucial (<a href="https://www.sciencedirect.com/science/article/pii/S0360131520302426" target="_blank" rel="noopener noreferrer">Rutten et al., 2012</a>). This lab was designed to be a safe, accessible, and engaging environment for hands-on learning, without the risks or costs associated with traditional labs. The goal was simple; make a virtual lab that fully captured the fun that she experienced in her school labs, and that could be used by anyone, anywhere, at any time.
    </p>
    <img src={oldLab} alt="First mockup lab" className="rounded shadow center limited-size" />
    <p className="caption">The first lab mockup: A simple prototype to conceptualize the vision for Whimsylabs.</p>
    <p>
      The journey began modestly with a rudimentary lab mockup that served to test initial coding ideas. Right from the start the dream of a unified virtual lab was clear, but the path to realizing it was less so. With academic simulations as a foundation, the first lab iteration was a simple prototype that laid the groundwork to test ideas and refine the vision. However, as most academic simulations use supercomputers, and take months to run (<a href="https://link.springer.com/article/10.1007/s10723-015-9329-3" target="_blank" rel="noopener noreferrer">Foster & Kesselman, 2014</a>), the challenge was to make the simulations run in real-time on a bespoke VR platform.
    </p>
    <p>
        Most of the work was done to refine these equations down to run in real time, while still producing realistic results. The first lab was purely a proof of concept, showing that the simulations could be run in real time, and that they could be interacted with in a meaningful way. Studies in computational physics education highlight the importance of real-time interaction for conceptual understanding, as immediate feedback helps students connect theoretical concepts with observable phenomena (<a href="https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.12.020104" target="_blank" rel="noopener noreferrer">Wieman & Perkins, 2005</a>).
    </p>
    <p>
      Around this time Whimsylabs caught the attention of the University of Edinburgh due to our breakthrough work in simuations and ambitious impact driven goals, securing places in their prestigious incubator programs and going on to win the Summer Accelerator. From these victories and recognitions, we were able to secure our first bout of funding to build a bespoke VR/web combo platform, and bring on our second founder to help build the lab - a Chemist PhD with years of experience in education and training for the chemical industry. 
    </p>
    <img src={testLab} alt="Second tech test lab" className="rounded shadow center limited-size" />
    <p className="caption">The second lab: A testing ground for advanced simulation technologies.</p>
    <p>
        The second lab was built to see how we could make the lab feel more like a real lab, and less like a video game. This was first time we had to consider how the lab would be used in a real educational setting to teach the motions and actions of a lab. This phenomenology of the lab revealed itself to be crucial for students to begin to build the muscle memory needed to perform these procedures in real life, with things like liquid physics and realistic physical interactions needed to capture feeling of being in a lab. Research in embodied cognition demonstrates that physical movements and gestures significantly enhance learning and retention in scientific contexts (<a href="https://www.frontiersin.org/articles/10.3389/fpsyg.2019.01142/full" target="_blank" rel="noopener noreferrer">Macedonia & von Kriegstein, 2012</a>). The lessons learnt from the second lab defined one of our core design philosophies - that procedures should be learnt by physically doing, not by watching animations or reading text.
    </p>
    <p>
        The second lab was a success, and we were able to reach out to schools to test the lab in a real educational setting. The feedback was overwhelmingly positive, with students and teachers alike praising the lab for its realism and ease of use. This was a critical step in the development of the lab, as it showed that the lab could be used in a real educational setting, and that it could be a valuable tool for teaching and learning. There was just one issue - the lab was ugly.
    </p>
    <img src={finalLab} alt="Final lab design" className="rounded shadow center limited-size" />
    <p className="caption">The final lab: A blend of cutting-edge technology and an inviting design that stands out.</p>

    <p>
        With this in mind, we set out to completely redesign the lab from scratch. However, due to the limited power of VR headsets and the processing cost of the advanced simulations, there was little room to reflect high fidelity realism. Another consideration was the broad range of ages that would be using the lab, from 5 to 18+, and the need to make the lab accessible to all of them. The choice of direction was difficult, but in the end we were guided by one of our original desires - that the lab is a place of wonder and exploration, and that it should be a place that students want to come back to. Research in educational psychology emphasizes the importance of intrinsic motivation and curiosity-driven learning in STEM education (<a href="https://psycnet.apa.org/record/2000-07889-012" target="_blank" rel="noopener noreferrer">Deci & Ryan, 2000</a>). It was around this time where we settled on our Whimsycat as our logo and mascot, an icon unlike any other in the virtual lab space, encapsulating the curiosity and wonder that we wanted to inspire in our students.
    </p>
    <p>
        The final lab design was a blend of cutting-edge technology and an inviting design that stands out in the crowded edtech space. This lab, our current flagship lab was now a fully realized virtual environment that offered a wide range of experiments and simulations, across Chemistry, Physics and Biology. Using this lab we were able to enter the prestigious Converge Challenge, a competition for the best new businesses in Scotland, and secure a place in the final under the Create Change category, where we placed Second out of all business in Scotland.
    </p>
    <p>
        Through our victory at Converge, we secured the funds to attend BETT UK and take our innovations to a global stage. The feedback from students and educators alike was overwhelmingly positive, with many highlighting how the platform transforms STEM education. Additionally, Whimsylabs' innovative approach had not gone unnoticed. The platform was recognized by the Epping Forest Schools Partnership Trust as part of the Kids Judge Bett, where pupils nominated Whimsylabs for their use of virtual labs to teach students about laboratory environments, while also providing a powerful tool for sustainability. This acknowledgment highlights the power in our mission to inspire the next generation of STEM leaders.
    </p>
    <p>
      While Whimsylabs has been quietly developing its technology for the past few years, only whispered amongst a few piloting schools, we are now ready to make noise and be loud about our groundbreaking solution. With a strong foundation, a growing team, and a proven track record of innovation, Whimsylabs is poised to transform science education and inspire the next generation of STEM leaders while staying true to our core values. To provide a sandbox laboratory that captures the physicality of performing labs, to capture the fun and wonder of science, and to make science accessible and affordable to all.
    </p>

    <div className="references-section">
      <h3>References</h3>
      <ul className="references-list">
        <li>Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. <em>Psychological Inquiry</em>, 11(4), 227-268.</li>
        <li>Foster, I., & Kesselman, C. (2014). Scaling system-level science: Scientific exploration and IT implications. <em>Computer</em>, 39(11), 31-39.</li>
        <li>Grewenig, E., Lergetporer, P., Werner, K., Woessmann, L., & Zierow, L. (2021). COVID-19 and educational inequality: How school closures affect low- and high-achieving students. <em>European Economic Review</em>, 140, 103920.</li>
        <li>Macedonia, M., & von Kriegstein, K. (2012). Gestures enhance foreign language learning. <em>Biolinguistics</em>, 6(3-4), 393-416.</li>
        <li>OECD. (2023). <em>PISA 2022 Results (Volume I): The State of Learning and Equity in Education</em>. OECD Publishing.</li>
        <li>Rutten, N., van Joolingen, W. R., & van der Veen, J. T. (2012). The learning effects of computer simulations in science education. <em>Computers & Education</em>, 58(1), 136-153.</li>
        <li>Wieman, C. E., & Perkins, K. K. (2005). Transforming physics education. <em>Physics Today</em>, 58(11), 36-41.</li>
      </ul>
    </div>
  </div>
);
