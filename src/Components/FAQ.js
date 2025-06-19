import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  // Initialize with all indices active (expanded)
  const [activeIndices, setActiveIndices] = useState(Array.from({ length: 100 }, (_, i) => i));

  const toggleFAQ = (index) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter(i => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  // Organize FAQ items into categories
  const faqCategories = {
    "About WhimsyLabs": [
      {
        question: "What is WhimsyLabs virtual lab software?",
        answer: "WhimsyLabs is a sandbox virtual laboratory simulation that gives you the freedom to explore, play, and learn scientific concepts firsthand. It accurately models biological, chemical, and physical reactions and processes, providing a true-to-life experience without the limitations and risks of a real lab."
      },
      {
        question: "Is WhimsyLabs a for-profit company?",
        answer: "We're not here to chase profits. WhimsyLabs is built like Wikipedia—funded by supporters who believe in making science education fair and fun for everyone. We offer our labs to schools of all sizes, especially those with limited resources. Every donation helps us improve access for students who might otherwise be left out."
      },
      {
        question: "What makes WhimsyLabs different from other virtual lab platforms?",
        answer: "WhimsyLabs is the only platform that combines high-fidelity liquid physics, real-time AI tutoring, sandbox freedom, and full VR/Web immersion. Unlike rigid step-by-step tools, WhimsyLabs supports open experimentation with realistic physics, building critical thinking and procedural fluency. We also are a non-profit, focused on equitable access to high-quality STEM education for all students."
      }
    ],
    "Educational Benefits": [
      {
        question: "How do virtual labs help students learn?",
        answer: "Virtual labs help students learn by providing hands-on experience in a safe environment. They allow students to explore and experiment with various scientific phenomena and equipment, building laboratory skills that transfer to physical labs. Our AI-supported tutor provides instant feedback to improve learning outcomes, and students can repeat experiments as many times as needed without consuming physical resources."
      },
      {
        question: "How does WhimsyLabs compare to traditional labs?",
        answer: "WhimsyLabs complements traditional labs by providing unlimited practice opportunities without consuming physical resources or creating safety risks. Students can build confidence and skills in the virtual environment before transitioning to physical labs. For schools with limited lab resources, WhimsyLabs offers access to experiments that might otherwise be impossible due to cost or safety concerns."
      },
      {
        question: "How does WhimsyLabs support students with Special Educational Needs and Disabilities (SEND)?",
        answer: "WhimsyLabs supports SEND students through multisensory interaction, self-paced experimentation, and real-time feedback. By combining visual, auditory, and kinesthetic inputs, students with attention or processing challenges can learn effectively and independently. VR tools have been shown to improve engagement and conceptual understanding in SEND learners. See: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10047908/"
      }
    ],
    "Technical Features": [
      {
        question: "How does WhimsyLabs' web and VR environment work?",
        answer: "WhimsyLabs runs both in-browser and in full immersive VR. Students can interact with experiments using a mouse and keyboard, touchscreen, or VR controllers—depending on the platform. The experience is consistent across devices, making learning accessible while maintaining realism and interactivity."
      },
      {
        question: "Is WhimsyLabs compatible with Chromebooks?",
        answer: "Yes. WhimsyLabs is optimized to run smoothly on Chromebooks, desktops, laptops, and VR devices. This ensures high-quality STEM education is accessible on almost any device, supporting equitable access across various schools and students."
      },
      {
        question: "How accurate are the simulations in WhimsyLabs?",
        answer: "Every biological, chemical, and physical reaction and process in WhimsyLabs is accurately modeled, providing users with a true-to-life sandbox experience. Our realistic physics engine ensures that each movement and interaction closely replicates the physical feel and response, enhancing muscle memory and practical skill acquisition."
      },
      {
        question: "Is WhimsyLabs compliant with school IT and privacy policies?",
        answer: "Yes. WhimsyLabs is web-based and requires no installation. For VR, the app must be downloaded for your device once. We comply with GDPR and school IT guidelines. No personal data is required to run the software, and data collected from the user is kept to a minimum. We provide the full details of everything we store and aim for a data minima philosophy."
      }
    ],
    "Curriculum & Content": [
      {
        question: "What subjects do WhimsyLabs virtual labs cover?",
        answer: "WhimsyLabs covers Biology, Chemistry, and Physics with accurately modeled experiments and simulations. Our virtual labs allow students to perform dissections, chemical reactions, and physics experiments in a safe, controlled environment that mirrors real-world laboratory conditions."
      },
      {
        question: "Can I customize or build my own experiments?",
        answer: "Yes, though this is in development. WhimsyLabs includes a powerful sandbox mode for teachers to build their own experiments by typing in your requrements into a chat box, which will then take your request and build a lab for you. You can define available chemicals, tools, and objectives, enabling student-led inquiry or guided tasks tailored to your curriculum."
      }
    ],
    "Teaching & Assessment": [
      {
        question: "How does WhimsyLabs support teachers?",
        answer: "WhimsyLabs supports teachers by saving time on lab setup, cleanup, and assessment. Our AI-driven assessment provides instant, detailed feedback on students' actions, giving measurable insights into learning progress. Teachers can focus on guiding students rather than managing lab logistics, and can easily track individual and class performance."
      },
      {
        question: "How does automated grading work in WhimsyLabs?",
        answer: "Our AI-driven grading system delivers instant, detailed feedback based on students' lab actions. Teachers receive automatic reports for individuals or the whole class, saving time on manual assessment while still providing insight into each student's understanding and procedural skill."
      },
      {
        question: "How does the AI tutor work in practice?",
        answer: "Our AI tutor supports students in real-time with context-sensitive feedback from the user's actions. Whimsycat will help guide students through experimental steps, warn about procedural errors, and provide summaries and safety tips, all while encouraging the student to make their own connections. It's like having a lab assistant in the form of a cat inside the headset or on screen."
      },
      {
        question: "Can WhimsyLabs virtual labs be used for remote teaching?",
        answer: "Yes, WhimsyLabs is specifically designed for both in-classroom and remote teaching scenarios. Students can access the virtual labs from anywhere, on desktop, mobile, or VR devices, making it perfect for distance learning, homework assignments, and self-paced study. Teachers can monitor progress and provide guidance remotely."
      }
    ],
    "Educational Levels": [
      {
        question: "Is WhimsyLabs suitable for primary school students?",
        answer: "Yes. While not the primary target audience, WhimsyLabs is used in many primary classrooms because younger students enjoy the playful, immersive nature of the platform. It's an engaging way to introduce core science concepts and encourage curiosity through safe, exploratory learning."
      },
      {
        question: "Is WhimsyLabs designed for secondary school students?",
        answer: "Yes. Secondary education is our core focus. WhimsyLabs gives students a hands-on environment to explore scientific concepts, design their own experiments, and test hypotheses. It supports both guided learning and open-ended inquiry, making it ideal for lessons aligned with GCSEs and A-levels."
      },
      {
        question: "Is WhimsyLabs useful for university or tertiary-level education?",
        answer: "Yes. In higher education, WhimsyLabs is often used to train students on lab procedures before accessing physical labs, maximizing time spent on real equipment. It's also used as an assessment tool for coursework and procedural accuracy, especially in STEM foundation courses and lab-heavy modules."
      }
    ],
    "Pricing & Accessibility": [
      {
        question: "Do you offer discounts for underfunded schools?",
        answer: "Absolutely. WhimsyLabs is committed to educational equity. We offer significant discounts for schools with limited funding, including those eligible for pupil premium or equivalent support schemes. Our goal is to ensure every student—regardless of background—can access high-quality science education. If your school qualifies, reach out and we'll work with you to make it happen."
      }
    ]
  };

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-container">
        {Object.entries(faqCategories).map(([category, items], categoryIndex) => (
          <div key={categoryIndex} className="faq-category">
            <h3 className="faq-category-heading">{category}</h3>
            {items.map((item, index) => {
              // Calculate a unique index for each FAQ item across all categories
              const globalIndex = Object.entries(faqCategories)
                .slice(0, categoryIndex)
                .reduce((acc, [_, categoryItems]) => acc + categoryItems.length, 0) + index;
              
              return (
                <div 
                  key={globalIndex} 
                  className={`faq-item ${activeIndices.includes(globalIndex) ? 'active' : ''}`}
                  itemScope 
                  itemType="https://schema.org/Question"
                >
                  <button 
                    className="faq-question" 
                    onClick={() => toggleFAQ(globalIndex)}
                    aria-expanded={activeIndices.includes(globalIndex)}
                    aria-controls={`faq-answer-${globalIndex}`}
                  >
                    <span itemProp="name">{item.question}</span>
                    <span className="faq-icon">{activeIndices.includes(globalIndex) ? '−' : '+'}</span>
                  </button>
                  <div 
                    id={`faq-answer-${globalIndex}`}
                    className="faq-answer" 
                    itemScope 
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                    style={{ maxHeight: activeIndices.includes(globalIndex) ? '1000px' : '0' }}
                  >
                    <p itemProp="text">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;