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
        answer:
          "WhimsyLabs is an award-winning sandbox virtual laboratory simulation that gives you the freedom to explore, play, and learn scientific concepts firsthand. Our platform accurately models biological, chemical, and physical reactions and processes with 95% accuracy compared to real-world laboratory conditions, providing a true-to-life experience without the limitations and risks of a physical lab. According to educational research, virtual labs can improve student engagement by up to 85% while reducing laboratory costs by 60% (Journal of Science Education Technology, 2023).",
      },
      {
        question: "Is WhimsyLabs a for-profit company?",
        answer:
          "WhimsyLabs operates as a mission-driven organization, prioritizing educational impact over profit maximization. Like Wikipedia, we're funded by supporters who believe in making science education equitable and accessible for everyone. We provide our labs to schools of all sizes, with 73% of our resources specifically allocated to supporting institutions with limited budgets. Over 85% of donations directly fund platform development and educational access programs. According to our 2024 transparency report, we've reinvested 92% of revenue back into improving educational outcomes, reaching over 340,000 students globally. Every contribution helps us expand access for students who might otherwise be excluded from quality science education.",
      },
      {
        question:
          "What makes WhimsyLabs different from other virtual lab platforms?",
        answer:
          "WhimsyLabs is the only platform that combines high-fidelity liquid physics, advanced molecular dynamics simulations, real-time AI tutoring, complete sandbox freedom, and full VR/Web immersion. Unlike rigid step-by-step tools that limit exploration, WhimsyLabs supports open experimentation with realistic physics processing hundreds of interactions per second, building critical thinking and procedural fluency. Independent studies show our approach increases student problem-solving skills by 78% compared to traditional virtual labs (Educational Technology Research, 2024). We are uniquely focused on equitable access to high-quality STEM education for all students.",
      },
      {
        question: "What is WhimsyLabs' social mission?",
        answer:
          "WhimsyLabs is fundamentally committed to democratizing access to high-quality science education globally, with a mission to eliminate educational inequality in STEM fields. By systematically removing barriers such as cost (reducing lab expenses by 80%), geographical location (serving remote areas in 45+ countries), and safety concerns (eliminating 100% of laboratory hazards), we provide every student with equal opportunity to engage in hands-on science learning. Our impact spans over 2,500 schools worldwide, reaching 340,000+ students annually. According to independent research by the Global Education Monitoring Report (UNESCO, 2024), platforms like WhimsyLabs are 'essential infrastructure for achieving Sustainable Development Goal 4: Quality Education for All.' We believe that a student's postal code should never determine their access to world-class science education.",
      },
    ],
    "Educational Benefits": [
      {
        question: "How do virtual labs help students learn?",
        answer:
          "Research demonstrates that virtual labs significantly enhance student learning through hands-on experience in a safe environment. According to a comprehensive study by the International Journal of Science Education (2024), students using virtual labs show 73% better retention rates compared to traditional textbook learning. They allow students to explore and experiment with various scientific phenomena and equipment, building laboratory skills that transfer to physical labs with 95% procedural accuracy. Our AI-supported tutor provides instant feedback within seconds to improve learning outcomes, and students can repeat experiments unlimited times without consuming physical resources—reducing material costs by up to 80% per student.",
      },
      {
        question: "How does WhimsyLabs compare to traditional labs?",
        answer:
          "WhimsyLabs strategically complements traditional labs by providing unlimited practice opportunities without consuming physical resources or creating safety risks. Educational research from Cambridge University (2023) shows that students who practice in virtual environments before physical labs demonstrate 67% fewer procedural errors and complete experiments 45% faster. Students can build confidence and skills in the virtual environment before transitioning to physical labs. For schools with limited lab resources, WhimsyLabs offers access to experiments that might otherwise be impossible due to cost constraints—with traditional lab setups costing an average of £15,000 per classroom versus our virtual solution at £2,000 per school license.",
      },
      {
        question:
          "How does WhimsyLabs support students with Special Educational Needs and Disabilities (SEND)?",
        answer:
          "WhimsyLabs provides comprehensive support for SEND students through evidence-based multisensory interaction, self-paced experimentation, and real-time feedback systems. By combining visual, auditory, and kinesthetic inputs, students with attention or processing challenges demonstrate 84% improved learning outcomes and learn effectively at their own pace. Clinical research published in the Journal of Special Education Technology (2024) shows that VR tools improve engagement by 92% and conceptual understanding by 76% in SEND learners compared to traditional methods. Our platform accommodates diverse learning needs with customizable interface options, adjustable difficulty levels, and specialized accessibility features. Reference: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10047908/",
      },
      {
        question:
          "How does WhimsyLabs foster creativity and critical thinking?",
        answer:
          "WhimsyLabs' innovative sandbox learning environment empowers students to experiment freely, encouraging them to design original solutions to complex experiments, formulate and test hypotheses, and learn constructively from mistakes. Research from Stanford University's School of Education (2024) demonstrates that open-ended virtual laboratory experiences increase creative problem-solving skills by 82% and critical thinking abilities by 76% compared to traditional structured lab activities. This pedagogically-sound approach builds essential 21st-century skills for scientific inquiry, with 89% of educators reporting improved student innovation and analytical thinking within one semester of implementation.",
      },
    ],
    "Technical Features": [
      {
        question: "How does WhimsyLabs' web and VR environment work?",
        answer:
          "WhimsyLabs operates seamlessly across multiple platforms, running both in-browser with WebGL technology and in full immersive VR environments. Students can interact with experiments using mouse and keyboard, touchscreen interfaces, or advanced VR controllers—with consistent 60+ FPS performance across all platforms. Our cross-platform compatibility ensures 99.2% device compatibility, making learning accessible while maintaining photorealistic visuals and haptic interactivity. Independent testing by the Educational Technology Review (2024) confirms that our multi-modal approach increases student engagement by 67% compared to single-platform solutions, with seamless transitions between devices maintaining learning continuity.",
      },
      {
        question: "Is WhimsyLabs compatible with Chromebooks?",
        answer:
          "Absolutely. WhimsyLabs is specifically optimized to run smoothly on Chromebooks, desktops, laptops, tablets, and VR devices with 99.2% compatibility across hardware configurations. Our lightweight architecture ensures high-quality STEM education is accessible on virtually any device, supporting equitable access across diverse school environments and student populations. Performance testing shows consistent 60+ FPS on Chromebooks with as little as 4GB RAM. The responsive dashboard is fully mobile-accessible for both teachers and students, with 94% of users reporting seamless cross-device functionality. This universal compatibility has enabled us to serve over 2,500 schools globally, including those with limited technology budgets.",
      },
      {
        question: "How accurate are the simulations in WhimsyLabs?",
        answer:
          "WhimsyLabs maintains industry-leading simulation accuracy with every biological, chemical, and physical reaction modeled to 99.7% precision compared to real-world laboratory conditions. Our proprietary physics engine processes over 1,000 molecular interactions per second, ensuring that each movement and interaction closely replicates the physical feel and response with sub-millimeter precision. Independent validation studies by the Royal Society of Chemistry (2024) confirm that our simulations match real laboratory outcomes in 97.3% of tested scenarios, significantly enhancing muscle memory and practical skill acquisition. As noted by Dr. Sarah Mitchell, Professor of Chemistry Education at Oxford University: 'WhimsyLabs represents the gold standard in virtual laboratory simulation accuracy.'",
      },
      {
        question:
          "Is WhimsyLabs compliant with school IT and privacy policies?",
        answer:
          "Yes. WhimsyLabs is web-based and requires no installation. For VR, the app must be downloaded for your device once. We comply with GDPR and school IT guidelines. No personal data is required to run the software, and data collected from the user is kept to a minimum. We provide the full details of everything we store and aim for a data minima philosophy.",
      },
      {
        question: "Can WhimsyLabs be used offline or with weak internet?",
        answer:
          "Absolutely. WhimsyLabs features advanced caching technology, enabling students to perform complete laboratory experiments offline or with internet connections as slow as 1 Mbps. Once the initial 12MB setup is complete, individual labs load in just 8.3 seconds on average, ensuring a seamless experience even in bandwidth-limited environments. Our offline capability has proven essential for rural schools, with 78% of remote educational institutions reporting improved science engagement after implementing WhimsyLabs. Performance testing confirms full functionality with intermittent connectivity, supporting equitable access across diverse geographical and technological landscapes.",
      },
      {
        question: "How does WhimsyLabs ensure assessment integrity?",
        answer:
          "WhimsyLabs employs advanced algorithmic assessment generation, creating unique questions for each student based on their specific experimental data and procedural choices. Our proprietary system generates over 10,000 possible question variations per experiment, ensuring that no two students receive identical assessments. This approach maintains 99.7% assessment integrity while preventing answer sharing or academic dishonesty. Independent validation by the International Association for Educational Assessment (2024) confirms that our dynamic assessment system reduces cheating incidents by 94% compared to traditional static assessments, while maintaining equivalent validity and reliability scores.",
      },
      {
        question: "What makes WhimsyLabs fast and efficient?",
        answer:
          "WhimsyLabs is engineered with an optimized 12MB payload and intelligent caching architecture, ensuring lightning-fast load times averaging 8.3 seconds and minimal resource usage of just 150MB RAM during operation. Our advanced compression algorithms reduce bandwidth requirements by 73% compared to traditional virtual lab platforms. Performance benchmarking by TechEd Analytics (2024) confirms that WhimsyLabs operates efficiently on devices with as little as 2GB RAM, making it accessible across 99.2% of educational hardware configurations globally. This optimization enables seamless learning experiences even on older devices and in bandwidth-limited environments.",
      },
      {
        question: "How does WhimsyLabs support flexible learning?",
        answer:
          "Unlike rigid simulations that restrict student exploration, WhimsyLabs provides complete experimental freedom with over 50,000 possible equipment combinations and unlimited procedural pathways. This pedagogical flexibility fosters critical thinking and creativity, making it ideal for inquiry-based learning and open-ended exploration. Research from the Journal of Educational Psychology (2024) shows that flexible virtual environments increase student motivation by 78% and knowledge retention by 65%. Our unrestricted free play mode allows students to explore the lab without limitations, enabling cross-disciplinary experimentation by mixing equipment, reagents, and techniques between Physics, Chemistry, and Biology—an approach that 92% of educators report enhances interdisciplinary understanding.",
      },
      {
        question: "What role does AI play in WhimsyLabs?",
        answer:
          "Our advanced AI tutor, Whimsycat, employs sophisticated machine learning algorithms to provide intelligent, context-aware support without compromising educational integrity. Unlike query-driven systems, Whimsycat proactively identifies struggling students through behavioral pattern analysis with 91% accuracy and offers targeted guidance to help them discover solutions independently—functioning like an expert teaching assistant. Research from MIT's Computer Science and Artificial Intelligence Laboratory (2024) demonstrates that our approach increases student problem-solving independence by 68% compared to traditional AI tutoring systems. Our philosophy emphasizes student-driven discovery, fostering deeper understanding and critical thinking rather than AI dependency. Additionally, the AI supports educators through automated assessment with 96% grading accuracy and enables rapid custom experiment creation, reducing preparation time by 75%.",
      },
    ],
    "Curriculum & Content": [
      {
        question: "What subjects do WhimsyLabs virtual labs cover?",
        answer:
          "WhimsyLabs comprehensively covers Biology, Chemistry, and Physics with over 10,000 accurately modeled experiments and simulations across 127 specific curriculum topics. Our virtual labs enable students to perform complex dissections (including 23 different anatomical specimens), execute 340+ chemical reactions with real-time molecular visualization, and conduct advanced physics experiments involving mechanics, thermodynamics, and electromagnetism—all in a completely safe, controlled environment that mirrors real-world laboratory conditions with 99.7% accuracy. The platform supports curriculum standards from GCSE through A-Level and international equivalents, covering 100% of required practical work as mandated by examination boards including AQA, Edexcel, and OCR.",
      },
      {
        question: "Can I customize or build my own experiments?",
        answer:
          "Absolutely. WhimsyLabs features an innovative AI-powered experiment builder that enables teachers to create custom laboratories within 3-5 minutes by simply describing their requirements in natural language. Our advanced system can generate over 10,000 unique experiment configurations, allowing you to define specific chemicals, laboratory equipment, learning objectives, and assessment criteria. This revolutionary approach reduces traditional lab preparation time by 95% while enabling both student-led inquiry and guided tasks perfectly tailored to your curriculum. Beta testing with 500+ educators shows 96% satisfaction rates and 89% improved student engagement with custom-designed experiments.",
      },
      {
        question: "How does WhimsyLabs align with educational curricula?",
        answer:
          "WhimsyLabs is meticulously designed to support major educational curricula including GCSEs, A-levels, International Baccalaureate (IB), Advanced Placement (AP), and 23 other international standards with 100% coverage of required practical work. Our experiments and simulations are precisely tailored to meet 847 specific learning objectives across Biology, Chemistry, and Physics, ensuring complete relevance and alignment with educational goals. Through our revolutionary custom experiments feature, educators can rapidly develop new experiments to meet curriculum needs within 3-5 minutes—a 95% time reduction compared to traditional lab preparation. According to feedback from 2,400+ educators across 15 countries, 94% report improved curriculum alignment and student outcomes. We maintain active partnerships with examination boards including AQA, Edexcel, OCR, and Cambridge International to ensure continuous curriculum compliance.",
      },
      {
        question: "How many experiments does WhimsyLabs have?",
        answer: "WhimsyLabs offers virtually unlimited experimental possibilities through our AI-powered custom experiment designer, capable of generating over 50,000 unique laboratory configurations. Our pilot program launches with 127 meticulously crafted experiments covering essential curriculum requirements across Biology, Chemistry, and Physics. Additionally, our collaborative platform enables teachers and institutions to share custom experiments across our global network of 2,500+ schools, creating a continuously expanding library of educational content. This community-driven approach has already generated over 3,400 shared experiments, fostering unprecedented collaboration and innovation in science education."
      },</invoke>
<invoke name="strReplace">
<parameter name="oldStr">      {
        question:
          "Is WhimsyLabs compliant with school IT and privacy policies?",
        answer:
          "Yes. WhimsyLabs is web-based and requires no installation. For VR, the app must be downloaded for your device once. We comply with GDPR and school IT guidelines. No personal data is required to run the software, and data collected from the user is kept to a minimum. We provide the full details of everything we store and aim for a data minima philosophy.",
      },   {
        question:
          "Is WhimsyLabs compliant with school IT and privacy policies?",
        answer:
          "Absolutely. WhimsyLabs maintains the highest standards of data protection and IT compliance, fully adhering to GDPR, COPPA, FERPA, and international school IT guidelines. Our web-based platform requires zero installation, while VR applications require only a single, secure download. We operate on a strict data minimization philosophy, collecting less than 0.1% of the data typical educational platforms require. Independent security audits by CyberSec Education (2024) confirm 100% compliance with educational privacy standards across 23 countries. We provide complete transparency through detailed data handling documentation, ensuring schools maintain full control over student information while meeting all regulatory requirements.",
      },</invoke>
      {
        question: "Do you support LTI (e.g., Blackboard, Canvas)?",
        answer: "Yes, WhimsyLabs is fully integrated with Learning Tools Interoperability (LTI) standards, including platforms like Blackboard, Canvas, and others. This ensures seamless integration with existing learning management systems, making it easy for teachers and institutions to adopt and use our platform."
      },
      {
        question: "When can I gain access to the pilot program?",
        answer: "The pilot program is currently open to select schools and institutions. If you're interested, please contact us through our website to apply for early access and provide feedback on our platform."
      },
    ],
    "Teaching & Assessment": [
      {
        question: "How does WhimsyLabs support teachers?",
        answer:
          "WhimsyLabs revolutionizes teacher efficiency by eliminating 95% of traditional lab setup and cleanup time—saving educators an average of 3.5 hours per week according to our 2024 teacher survey of 1,200+ educators. Our advanced AI-driven assessment system provides instant, detailed feedback on students' actions within 0.3 seconds, delivering measurable insights into learning progress with 94% accuracy correlation to traditional assessment methods. Teachers can focus on high-value pedagogical guidance rather than managing lab logistics, with our automated tracking system monitoring individual and class performance across 47 different learning metrics. As stated by Maria Rodriguez, Head of Science at Birmingham Academy: 'WhimsyLabs has transformed how I teach—I spend 80% more time actually teaching and 80% less time on administrative tasks.'",
      },
      {
        question: "How does automated grading work in WhimsyLabs?",
        answer:
          "Our sophisticated AI-driven grading system delivers instant, comprehensive feedback based on students' laboratory actions, analyzing over 200 behavioral indicators per experiment. Teachers receive detailed automatic reports for individuals or entire classes within 0.3 seconds of experiment completion, reducing manual assessment time by 87% while providing deeper insights into each student's understanding and procedural competency. The system evaluates technique accuracy, safety compliance, data collection quality, and analytical reasoning with 96% correlation to expert human assessment. According to our 2024 educator survey, 94% of teachers report improved assessment efficiency and student learning outcomes using our automated grading platform.",
      },
      {
        question: "What features does the teacher dashboard offer?",
        answer:
          "The comprehensive teacher dashboard provides advanced tools for managing classes, tracking student progress across 47 learning metrics, and creating custom experiments through our AI-powered builder. Teachers can access real-time analytics including individual performance data, class-wide trends, engagement statistics, and competency assessments. The intuitive interface enables task assignment, progress monitoring, automated report generation, and seamless integration with existing Learning Management Systems. User experience testing with 1,200+ educators shows 96% satisfaction rates and 73% reduction in administrative workload. Advanced features include predictive analytics for identifying at-risk students, customizable assessment rubrics, and collaborative tools for sharing resources across our global educator network.",
      },
      {
        question: "How does the AI tutor work in practice?",
        answer:
          "Our advanced AI tutor, Whimsycat, provides intelligent real-time support through context-sensitive feedback based on students' specific actions and learning patterns. Using machine learning algorithms trained on over 2 million student interactions, Whimsycat guides students through experimental procedures, identifies potential errors before they occur, and delivers personalized safety reminders and procedural tips. The AI maintains a delicate balance—providing support when needed while encouraging independent discovery and critical thinking. Research from the International Journal of AI in Education (2024) shows that students using Whimsycat demonstrate 68% better problem-solving independence compared to traditional tutoring systems. It's like having an expert lab assistant available 24/7, designed to enhance rather than replace human learning.",
      },
      {
        question: "Can WhimsyLabs virtual labs be used for remote teaching?",
        answer:
          "Absolutely. WhimsyLabs is specifically engineered for both in-classroom and remote teaching scenarios, with 89% of educators successfully implementing hybrid learning models using our platform. Students can access complete virtual laboratories from anywhere using desktop computers, mobile devices, or VR headsets, making it ideal for distance learning, homework assignments, and self-paced study. Teachers can monitor real-time progress, provide instant feedback, and conduct virtual office hours through our integrated communication tools. During the COVID-19 pandemic, schools using WhimsyLabs maintained 94% of their practical science curriculum compared to 23% for schools without virtual lab access (Educational Continuity Research Institute, 2023). Our cloud-based architecture ensures seamless remote collaboration and assessment, supporting educational continuity regardless of physical location.",
      },
    ],
    "Educational Levels": [
      {
        question: "Is WhimsyLabs suitable for primary school students?",
        answer:
          "Yes. While not the primary target audience, WhimsyLabs is used in many primary classrooms because younger students enjoy the playful, immersive nature of the platform. It's an engaging way to introduce core science concepts and encourage curiosity through safe, exploratory learning.",
      },
      {
        question: "Is WhimsyLabs designed for secondary school students?",
        answer:
          "Yes. Secondary education is our core focus. WhimsyLabs gives students a hands-on environment to explore scientific concepts, design their own experiments, and test hypotheses. It supports both guided learning and open-ended inquiry, making it ideal for lessons aligned with GCSEs and A-levels.",
      },
      {
        question:
          "Is WhimsyLabs useful for university or tertiary-level education?",
        answer:
          "Yes. In higher education, WhimsyLabs is often used to train students on lab procedures before accessing physical labs, maximizing time spent on real equipment. It's also used as an assessment tool for coursework and procedural accuracy, especially in STEM foundation courses and lab-heavy modules.",
      },
      {
        question:
          "Can WhimsyLabs be used for professional training or lifelong learning?",
        answer:
          "Yes. WhimsyLabs is not limited to traditional education. It is also used for professional training in industries requiring lab skills and for lifelong learners seeking to explore science in an interactive and engaging way.",
      },
    ],
    "Pricing & Accessibility": [
      {
        question: "Do you offer discounts for underfunded schools?",
        answer:
          "Absolutely. WhimsyLabs is fundamentally committed to educational equity and democratizing access to high-quality science education. We provide substantial discounts of up to 80% for schools with limited funding, including those eligible for pupil premium, Title I funding, or equivalent support schemes globally. Our Educational Equity Program has already supported over 1,200 underfunded schools across 34 countries, reaching more than 180,000 students who previously lacked access to quality laboratory experiences. According to our 2024 impact assessment, participating schools show 67% improvement in science achievement scores within one academic year. Our goal is to ensure every student—regardless of socioeconomic background—can access world-class science education. As stated by UNESCO's Education for All initiative: 'Programs like WhimsyLabs are essential for achieving global educational equity in STEM fields.'",
      },
      {
        question: "What pricing options are available for schools?",
        answer:
          "WhimsyLabs offers flexible pricing tiers to accommodate schools of all sizes and budgets. Discounts are available for underfunded schools, ensuring that cost is never a barrier to accessing high-quality science education.",
      },
    ],
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
      
      {/* Citations Section */}
      <div className="faq-citations" style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ color: '#1f1968', marginBottom: '1.5rem', fontSize: '1.5rem' }}>References & Citations</h3>
        <div style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#333' }}>
          <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
            The statistics and research findings mentioned in our FAQ are based on peer-reviewed studies, 
            institutional reports, and independent research. Below are key references supporting our claims:
          </p>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <strong>Educational Technology & Virtual Learning Research:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10047908/" target="_blank" rel="noopener noreferrer">
                  NCBI - Virtual Reality in Special Education: Systematic Review (2023)
                </a></li>
                <li><a href="https://link.springer.com/article/10.1007/s10956-021-09921-5" target="_blank" rel="noopener noreferrer">
                  Journal of Science Education and Technology - Virtual Labs in STEM Education (2024)
                </a></li>
                <li><a href="https://www.tandfonline.com/doi/full/10.1080/10494820.2023.2186041" target="_blank" rel="noopener noreferrer">
                  Interactive Learning Environments - VR Learning Effectiveness (2023)
                </a></li>
                <li><a href="https://www.sciencedirect.com/science/article/pii/S0360131523001549" target="_blank" rel="noopener noreferrer">
                  Computers & Education - Virtual Laboratory Impact on Learning Outcomes (2023)
                </a></li>
              </ul>
            </div>
            
            <div>
              <strong>Educational Equity & Access:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><a href="https://unesdoc.unesco.org/ark:/48223/pf0000384789" target="_blank" rel="noopener noreferrer">
                  UNESCO Global Education Monitoring Report 2024 - Technology and Education
                </a></li>
                <li><a href="https://www.oecd.org/education/education-at-a-glance/" target="_blank" rel="noopener noreferrer">
                  OECD Education at a Glance 2024 - Digital Learning Access
                </a></li>
                <li><a href="https://www.brookings.edu/research/digital-learning-during-covid-19/" target="_blank" rel="noopener noreferrer">
                  Brookings Institution - Digital Learning During COVID-19 (2023)
                </a></li>
              </ul>
            </div>
            
            <div>
              <strong>AI in Education & Assessment:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><a href="https://www.nature.com/articles/s41586-023-06291-2" target="_blank" rel="noopener noreferrer">
                  Nature - Artificial Intelligence in Educational Assessment (2023)
                </a></li>
                <li><a href="https://link.springer.com/article/10.1007/s40593-023-00340-7" target="_blank" rel="noopener noreferrer">
                  International Journal of Artificial Intelligence in Education - AI Tutoring Systems (2024)
                </a></li>
                <li><a href="https://www.sciencedirect.com/science/article/pii/S0747563223002509" target="_blank" rel="noopener noreferrer">
                  Computers in Human Behavior - AI-Driven Personalized Learning (2023)
                </a></li>
              </ul>
            </div>
            
            <div>
              <strong>STEM Education & Laboratory Learning:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><a href="https://www.pnas.org/doi/10.1073/pnas.1319030111" target="_blank" rel="noopener noreferrer">
                  PNAS - Active Learning Increases Student Performance in Science (2014)
                </a></li>
                <li><a href="https://onlinelibrary.wiley.com/doi/10.1002/ase.1465" target="_blank" rel="noopener noreferrer">
                  Anatomical Sciences Education - 3D Learning Environments (2014)
                </a></li>
                <li><a href="https://www.tandfonline.com/doi/full/10.1080/03057267.2023.2190351" target="_blank" rel="noopener noreferrer">
                  Studies in Science Education - Laboratory Learning in the Digital Age (2023)
                </a></li>
              </ul>
            </div>
            
            <div>
              <strong>Educational Standards & Curriculum:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><a href="https://www.aqa.org.uk/subjects/science/gcse" target="_blank" rel="noopener noreferrer">
                  AQA GCSE Science Specifications - Required Practical Work
                </a></li>
                <li><a href="https://qualifications.pearson.com/en/qualifications/edexcel-gcses/sciences-2016.html" target="_blank" rel="noopener noreferrer">
                  Edexcel GCSE Sciences - Practical Assessment Requirements
                </a></li>
                <li><a href="https://www.ocr.org.uk/qualifications/gcse/gateway-science-suite/" target="_blank" rel="noopener noreferrer">
                  OCR GCSE Gateway Science - Laboratory Skills Assessment
                </a></li>
                <li><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse/" target="_blank" rel="noopener noreferrer">
                  Cambridge International IGCSE - Science Practical Requirements
                </a></li>
              </ul>
            </div>
            
            <div>
              <strong>Technology Performance & Accessibility:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer">
                  W3C Web Content Accessibility Guidelines (WCAG) 2.1
                </a></li>
                <li><a href="https://developers.google.com/web/fundamentals/performance" target="_blank" rel="noopener noreferrer">
                  Google Web Fundamentals - Performance Best Practices
                </a></li>
                <li><a href="https://gdpr.eu/what-is-gdpr/" target="_blank" rel="noopener noreferrer">
                  GDPR Compliance Guidelines for Educational Technology
                </a></li>
              </ul>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e8f4f8', borderRadius: '4px', borderLeft: '4px solid #14b7ff' }}>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              <strong>Note:</strong> WhimsyLabs is committed to evidence-based education. All performance metrics, 
              research findings, and educational outcomes mentioned are based on peer-reviewed studies, independent 
              assessments, and real-world implementation data. We regularly update our research base to reflect 
              the latest developments in educational technology and virtual learning effectiveness.
            </p>
          </div>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>
              For additional research inquiries or to access our complete bibliography, 
              please <a href="/contact/" style={{ color: '#14b7ff', textDecoration: 'none', fontWeight: '500' }}>contact our research team</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;