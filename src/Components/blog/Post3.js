import React from "react";
import kidneyDissection from '../images/kidney_barclays.jpg';

export const title = "Hands-On Learning: Virtual Kidney Dissection Enhances SEND Student Engagement";
export const date = "2025-03-19";
export const slug = "virtual-kidney-dissection-send-engagement";
export const description =
  "Exploring how WhimsyLabs' physical interaction in virtual environments significantly improves educational outcomes and engagement for SEND students.";

export const content = (
  <div>
    <p>
      The human kidney plays a vital role in maintaining homeostasis—filtering blood, balancing fluids and electrolytes, and removing waste. Yet for many, the complexity of its internal structures can make it difficult to fully grasp how it functions. Our recent WhimsyLabs demonstration tackled this challenge by recreating a full kidney dissection in a virtual reality environment, complete with physically interactive dissection tools and a functioning microscope simulation.
    </p>

    <p>
      Unlike conventional VR labs that guide students passively through a process, this experience puts them in control. Participants physically manipulate lab tools using natural hand gestures, make incisions in virtual tissue, and examine microscopic anatomy through detailed zoom functions. The result is an active learning experience that combines visual, auditory, and kinesthetic inputs in real time.
    </p>

    <div className="video-container">
      <iframe 
        width="100%" 
        height="400" 
        src="https://www.youtube.com/embed/nhZN6WCWtAk" 
        title="WhimsyLabs Virtual Kidney Dissection" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
    <p className="caption">WhimsyLabs' virtual kidney dissection demonstration, showcasing physical interaction and educational narration.</p>

    <p>
      Immersive VR learning environments like this have been shown to improve engagement and comprehension by activating multiple neural pathways simultaneously, enhancing both memory retention and conceptual understanding (<a href="https://www.sciencedirect.com/science/article/pii/S0360131521003067" target="_blank" rel="noopener noreferrer">Makransky & Lilleholt, 2018</a>). In our simulation, participants use a virtual scalpel with natural grip mechanics, feel haptic feedback during dissection, and physically position the kidney under a microscope for further examination.
    </p>

    <img src={kidneyDissection} alt="Participants engaging with the WhimsyLabs kidney dissection at Barclays Headquarters" className="rounded shadow center limited-size" />
    <p className="caption">Our demonstration at Barclays Headquarters raised awareness about kidney function and organ donation through engaging, hands-on exploration.</p>

    <p>
      The demo was featured at Barclays Headquarters as part of a campaign to raise awareness about kidney health and organ donation. Attendees from a wide range of backgrounds were able to explore the anatomy of the kidney in detail—watching blood enter through the renal artery, being filtered, and exiting through the renal vein. Zooming further into the nephrons, they could examine how filtration occurs at the glomerulus and how water and urea are processed through the loop of Henle and collecting ducts.
    </p>

    <p>
      This format doesn’t just show anatomy—it encourages deeper curiosity. The ability to interact directly with the content, rather than passively watch or listen, improves conceptual understanding and retention. Users can repeat actions, manipulate components, and explore the system at their own pace, all of which support individualized learning.
    </p>

    <p>
      This approach is especially impactful for students with Special Educational Needs and Disabilities (SEND). Research suggests that multisensory learning environments improve comprehension and motivation for SEND learners, especially when tasks are interactive and self-paced (<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10047908/?utm_source=whimsylabs.ai" target="_blank" rel="noopener noreferrer">Liu et al., 2023</a>). By combining physical movement with visual and auditory input, WhimsyLabs' dissection creates a scaffolded learning experience that adapts to diverse learning profiles.
    </p>

    <p>
      Teachers have reported that students with attention or processing challenges benefit from the ability to focus on one step at a time, repeat complex actions, and receive feedback through movement and audio cues. Unlike static diagrams or video lectures, this format turns abstract structures into tangible systems that can be explored, questioned, and understood.
    </p>

    <p>
      What sets WhimsyLabs apart is that we don't simplify content—we present complex systems in an accessible, interactive way. The full dissection covers the same anatomical detail and physiology as a real lab session, but it does so through a method that works for more students, more consistently. Whether used in schools, public outreach, or accessibility-focused education, this model brings science into reach.
    </p>
  </div>
);