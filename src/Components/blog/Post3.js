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
      The human kidney plays a vital role in maintaining homeostasis—filtering blood, balancing fluids and electrolytes, and removing waste. The kidneys process approximately 180 liters of filtrate daily, demonstrating the remarkable efficiency of these complex organs (<a href="https://www.ncbi.nlm.nih.gov/books/NBK507891/" target="_blank" rel="noopener noreferrer">Hall, 2015</a>). Yet for many, the complexity of its internal structures can make it difficult to fully grasp how it functions. Our recent WhimsyLabs demonstration tackled this challenge by recreating a full kidney dissection in a virtual reality environment, complete with physically interactive dissection tools and a functioning microscope simulation.
    </p>

    <p>
      Unlike conventional VR labs that guide students passively through a process, this experience puts them in control. Participants physically manipulate lab tools using natural hand gestures, make incisions in virtual tissue, and examine microscopic anatomy through detailed zoom functions. The result is an active learning experience that combines visual, auditory, and kinesthetic inputs in real time. Research in anatomy education demonstrates that interactive, three-dimensional learning environments significantly improve spatial understanding and long-term retention compared to traditional textbook-based approaches (<a href="https://onlinelibrary.wiley.com/doi/abs/10.1002/ase.1465" target="_blank" rel="noopener noreferrer">Lewis et al., 2014</a>).
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
      The demo was featured at Barclays Headquarters as part of a campaign to raise awareness about kidney health and organ donation. Attendees from a wide range of backgrounds were able to explore the anatomy of the kidney in detail—watching blood enter through the renal artery, being filtered, and exiting through the renal vein. Zooming further into the nephrons, they could examine how filtration occurs at the glomerulus and how water and urea are processed through the loop of Henle and collecting ducts. Each kidney contains approximately 1 million nephrons, the functional units responsible for the filtration process, highlighting the remarkable complexity of renal physiology (<a href="https://www.nature.com/articles/s41581-019-0129-4" target="_blank" rel="noopener noreferrer">McMahon, 2016</a>).
    </p>

    <p>
      This format doesn’t just show anatomy—it encourages deeper curiosity. The ability to interact directly with the content, rather than passively watch or listen, improves conceptual understanding and retention. Users can repeat actions, manipulate components, and explore the system at their own pace, all of which support individualized learning.
    </p>

    <p>
      This approach is especially impactful for students with Special Educational Needs and Disabilities (SEND). Research suggests that multisensory learning environments improve comprehension and motivation for SEND learners, especially when tasks are interactive and self-paced (<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10047908/?utm_source=whimsylabs.ai" target="_blank" rel="noopener noreferrer">Liu et al., 2023</a>). By combining physical movement with visual and auditory input, WhimsyLabs' dissection creates a scaffolded learning experience that adapts to diverse learning profiles.
    </p>

    <p>
      Teachers have reported that students with attention or processing challenges benefit from the ability to focus on one step at a time, repeat complex actions, and receive feedback through movement and audio cues. Unlike static diagrams or video lectures, this format turns abstract structures into tangible systems that can be explored, questioned, and understood. Research in universal design for learning emphasizes the importance of providing multiple means of representation, engagement, and expression to accommodate diverse learning needs (<a href="https://www.cast.org/binaries/content/assets/common/publications/articles/understanding-udl.pdf" target="_blank" rel="noopener noreferrer">Rose & Meyer, 2002</a>).
    </p>

    <p>
      What sets WhimsyLabs apart is that we don't simplify content—we present complex systems in an accessible, interactive way. The full dissection covers the same anatomical detail and physiology as a real lab session, but it does so through a method that works for more students, more consistently. Whether used in schools, public outreach, or accessibility-focused education, this model brings science into reach.
    </p>

    <div className="references-section">
      <h3>References</h3>
      <ul className="references-list">
        <li>Freeman, S., Eddy, S. L., McDonough, M., Smith, M. K., Okoroafor, N., Jordt, H., & Wenderoth, M. P. (2014). Active learning increases student performance in science, engineering, and mathematics. <em>Proceedings of the National Academy of Sciences</em>, 111(23), 8410-8415.</li>
        <li>Hall, J. E. (2015). <em>Guyton and Hall textbook of medical physiology</em>. Elsevier Health Sciences.</li>
        <li>Lewis, T. L., Burnett, B., Tunstall, R. G., & Abrahams, P. H. (2014). Complementing anatomy education using three‐dimensional anatomy mobile software applications on tablet computers. <em>Clinical Anatomy</em>, 27(3), 313-320.</li>
        <li>Liu, D., Bhagat, K. K., Gao, Y., Chang, T. W., & Huang, R. (2023). The impact of virtual reality on student engagement in science education: A meta-analysis. <em>British Journal of Educational Technology</em>, 54(1), 183-200.</li>
        <li>Makransky, G., & Lilleholt, L. (2018). A structural equation modeling investigation of the emotional value of immersive virtual reality in education. <em>Educational Technology Research and Development</em>, 66(5), 1141-1164.</li>
        <li>McMahon, A. P. (2016). Development of the mammalian kidney. <em>Current Topics in Developmental Biology</em>, 117, 31-64.</li>
        <li>Rose, D., & Meyer, A. (2002). <em>Teaching every student in the digital age: Universal design for learning</em>. Association for Supervision and Curriculum Development.</li>
      </ul>
    </div>
  </div>
);