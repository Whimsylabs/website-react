import React from "react";
import oldLab from '../images/oldLab.png'; // Mockup lab image
import testLab from '../images/testLab.png'; // Tech test lab image
import finalLab from '../images/finalLab.png'; // Final lab design image

export const title = "A Brief History of Whimsylabs: From our Humble Start to a BETT 2025 Winner ";
export const date = "2025-01-28";
export const slug = "whimsylabs-education-revolution";
export const description =
  "How Whimsylabs, founded by Marisa French, is addressing STEM challenges with fully simulated labs, impactful partnerships, and award-winning innovation.";

export const content = (
  <div>
    <p>
      Recently the UK dropped to 15th in the global STEM education rankings, highlighting a growing concern about the nation’s ability to compete in an increasingly technological world. This drop wass compounded by the impact of COVID-19, which shuttered traditional lab environments, leaving many students without access to hands-on science education for years. This was the backdrop against which Whimsylabs was born. 
    </p>
    <p>
      Whimsylabs was founded in late 2020 by Marisa French at the end of her Physics PhD. Driven by a desire to create meaningful change, Marisa leveraged her simulation code to develop a fully simulated virtual laboratory. This groundbreaking approach provides students with immersive, safe, and accessible lab experiences, addressing the limitations of traditional labs while fostering critical STEM skills.
    </p>
    <img src={oldLab} alt="First mockup lab" className="rounded shadow center limited-size" />
    <p className="caption">The first lab mockup: A simple prototype to conceptualize the vision for Whimsylabs.</p>
    <p>
      The journey began modestly with a rudimentary lab mockup that served to test initial coding ideas. Right from the start the dream of a unified virtual lab was clear, but the path to realizing it was less so. With academic simuations as a foundation, the first lab iteration was a simple prototype that laid the groundwork to test ideas and refine the vision. However, as most academic simuations use supercomputers, and take months to run, the challenge was to make the simulations run in real-time on a bespoke VR platform.
    </p>
    <p>
        Most of the work was done to refine these equations down to run in real time, while still producing realistic results. The first lab was purely a proof of concept, showing that the simulations could be run in real time, and that they could be interacted with in a meaningful way.
    </p>
    <img src={testLab} alt="Second tech test lab" className="rounded shadow center limited-size" />
    <p className="caption">The second lab: A testing ground for advanced simulation technologies.</p>
    <p>
      Around this time Whimsylabs caught the attention of the University of Edinburgh from our breakthrough work in simuations, securing places in their prestigious incubator programs and winning the Summer Accelerator. From these vitories and recognitions, we were able to secure our first funding to build a bespoke VR/web combo platform, and bring on our second founder to help build the lab - a Chemist PhD with years of experience in education and training for the chemical industry. 
    </p>
    <p>
        It was rapidly becoming clear that the method and feeling of interaction was critical to developing lab skills and understanding. The second lab was built to test these ideas, and to see how we could make the lab feel more like a real lab, and less like a video game. This was a critical step in the development of the lab, as it was the first time we had to consider how the lab would be used in a real educational setting, and how we could make it as useful as possible. Special attention was directed to the phenomenology of the lab, with things like liquid physics, realistic physical interactions and a focus on the feeling of being in a lab set as a design priority. 
    </p>
    <p>
        The second lab was a success, and we were able to reach out to schools to test the lab in a real educational setting. The feedback was overwhelmingly positive, with students and teachers alike praising the lab for its realism and ease of use. This was a critical step in the development of the lab, as it showed that the lab could be used in a real educational setting, and that it could be a valuable tool for teaching and learning. There was just one issue - the lab was ugly.
    </p>
    <img src={finalLab} alt="Final lab design" className="rounded shadow center limited-size" />
    <p className="caption">The final lab: A blend of cutting-edge technology and an inviting design that stands out.</p>

        <p>
            With this in mind, we set out to completely redesign the lab from scratch. However, due to the limited power of VR headsets and the processing cost of the deep simulations, there was little room to target realism, with VR headsets failing to provide a realistic experience. Another consideration was the broad range of ages that would be using the lab, from 5 to 18+, and the need to make the lab accessible to all of them. The choice of direction was difficult, but in the end we were guided by one of our original desires - that the lab is a place of wonder and exploration, and that it should be a place that students want to come back to.
        </p>
    <p>
        The final lab design was a blend of cutting-edge technology and an inviting design that stands out in the crowded edtech space. The lab is now a fully realized virtual environment that offers a wide range of experiments and simulations, from basic chemistry to advanced physics. The lab is designed to be accessible to all students, regardless of their background or experience, and to provide a safe and engaging space for hands-on learning. From this lab we were able to enter the prestigious Converge Challenge, a competition for the best new businesses in Scotland, and secure a place in the final under the Create Change category, where we placed Second.
    </p>
    <p>
        Off the heels of this success, we were able to secure a place in the prestigious BETT UK 2025, where we won the Kids Judge Bett award for our impactful virtual lab. The feedback from students and educators alike was overwhelmingly positive, with many highlighting how the platform transforms STEM education. Through our victory at Converge, we secured the funds to attend BETT UK and take our innovations to a global stage.
    One of our greatest successes came at BETT UK 2025, where Whimsylabs received the Kids Judge Bett award for our impactful virtual lab. The feedback from students and educators alike was overwhelmingly positive, with many highlighting how the platform transforms STEM education. Through our victory at Converge, we secured the funds to attend BETT UK and take our innovations to a global stage.
    </p>
    <p>
      A fully simulated lab offers numerous benefits: it eliminates the risks and costs of traditional labs, allows for unlimited experimentation, and provides AI-driven feedback to guide learning. By combining safety, accessibility, and interactivity, Whimsylabs empowers educators and students to explore STEM concepts like never before.
    </p>
    <p>
        Whimsylabs' innovative approach had not gone unnoticed. The platform was recognized by the Epping Forest Schools Partnership Trust, where pupils nominated Whimsylabs for their use of virtual labs to teach students about laboratory environments. This acknowledgment underscores the impact Whimsylabs is making in the realm of science education.``
    </p>
    <p>
      While Whimsylabs has been quietly developing its technology for the past few years, we are now ready to make noise about our groundbreaking solutions. With a strong foundation, a growing team, and a proven track record of innovation, Whimsylabs is poised to transform science education and inspire the next generation of STEM leaders.
    </p>
  </div>
);
