import React, { useState } from "react";
import "./FAQ.css";
import { faqCategories } from "../data/faqData";

const FAQ = () => {
  // Initialize with all indices active (expanded)
  const [activeIndices, setActiveIndices] = useState(
    Array.from({ length: 100 }, (_, i) => i)
  );

  const toggleFAQ = (index) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="faq-heading">
        Frequently Asked Questions
      </h2>
      <div className="faq-container">
        {Object.entries(faqCategories).map(
          ([category, items], categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="faq-category-heading">{category}</h3>
              {items.map((item, index) => {
                // Calculate a unique index for each FAQ item across all categories
                const globalIndex =
                  Object.entries(faqCategories)
                    .slice(0, categoryIndex)
                    .reduce(
                      (acc, [_, categoryItems]) => acc + categoryItems.length,
                      0
                    ) + index;

                return (
                  <div
                    key={globalIndex}
                    className={`faq-item ${
                      activeIndices.includes(globalIndex) ? "active" : ""
                    }`}
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
                      <span className="faq-icon">
                        {activeIndices.includes(globalIndex) ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${globalIndex}`}
                      className="faq-answer"
                      itemScope
                      itemType="https://schema.org/Answer"
                      itemProp="acceptedAnswer"
                      style={{
                        maxHeight: activeIndices.includes(globalIndex)
                          ? "1000px"
                          : "0",
                      }}
                    >
                      <p
                        itemProp="text"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      ></p>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      {/* Citations Section */}
      <div
        className="faq-citations"
        style={{
          marginTop: "3rem",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <h3
          style={{
            color: "#1f1968",
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
          }}
        >
          References & Citations
        </h3>
        <div style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "#333" }}>
          <p style={{ marginBottom: "1rem", fontStyle: "italic" }}>
            The statistics and research findings mentioned in our FAQ are based
            on peer-reviewed studies, institutional reports, and independent
            research. Below are key references supporting our claims:
          </p>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <strong>
                Educational Technology & Virtual Learning Research:
              </strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10047908/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NCBI - Virtual Reality in Special Education: Systematic
                    Review (2023)
                  </a>
                </li>
                <li>
                  <a
                    href="https://noredreviews.org/index.php/NJSRE/article/view/5766/9684"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Systematic Reviews in Education - Virtual Labs in STEM Education (2024)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.researchgate.net/publication/376560196_Effectiveness_of_Virtual_Reality_on_Learning_Engagement"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Web-Based Learning and Teaching - Effectiveness of Virtual
                    Reality on Learning Engagement (2024)
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.researchgate.net/publication/376341773_Leveraging_Generative_AI_Tools_for_Enhanced_Lesson_Planning_in_Initial_Teacher_Education_at_Post_Primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Irish Journal of Technology Enhanced Learning - AI Tools for
                    Enhanced Lesson Planning (2023)
                  </a>
                </li>
                <li>
                  <a
                    href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11607574/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    JMIR Formative Research - The Effect of Virtual Laboratories
                    on the Academic Achievement of Undergraduate Chemistry
                    Students (2024)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <strong>Educational Equity & Access:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  <a
                    href="https://unesdoc.unesco.org/ark:/48223/pf0000391118"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    UNESCO Youth report 2024: technology in education
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.oecd.org/en/publications/education-at-a-glance-2024_c00cad36-en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OECD Education at a Glance 2024 - Digital Learning Access
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.brookings.edu/articles/rewiring-the-classroom-how-the-covid-19-pandemic-transformed-k-12-education/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Brookings Institution - How the COVID-19 pandemic
                    transformed K-12 education (2024)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <strong>AI in Education & Assessment:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  <a
                    href="https://www.nature.com/articles/s41586-023-06291-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Nature - Artificial Intelligence in Educational Assessment
                    (2023)
                  </a>
                </li>
                <li>
                  <a
                    href="https://link.springer.com/article/10.1007/s40593-023-00340-7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    International Journal of Artificial Intelligence in
                    Education - AI Tutoring Systems (2024)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.sciencedirect.com/science/article/pii/S2666920X25000694"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Computers & Education - Artificial intelligence-enabled
                    adaptive learning platforms: A review (2025)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <strong>STEM Education & Laboratory Learning:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  <a
                    href="https://www.pnas.org/doi/10.1073/pnas.1319030111"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PNAS - Active Learning Increases Student Performance in
                    Science (2014)
                  </a>
                </li>
                <li>
                  <a
                    href="https://onlinelibrary.wiley.com/doi/10.1002/ase.1465"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Anatomical Sciences Education - 3D Learning Environments
                    (2014)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tandfonline.com/doi/full/10.1080/2331186X.2023.2277007"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Studies in Science Education - Laboratory Learning in the
                    Digital Age (2023)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <strong>Educational Standards & Curriculum:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  <a
                    href="https://www.aqa.org.uk/subjects/science/gcse/science-8464/specification/practical-assessment"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AQA GCSE Science Specifications - Required Practical Work
                  </a>
                </li>
                <li>
                  <a
                    href="https://qualifications.pearson.com/en/qualifications/edexcel-gcses/sciences-2016.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Edexcel GCSE Sciences Specification
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ocr.org.uk/images/234596-specification-accredited-gcse-gateway-science-suite-combined-science-a-j250.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OCR GCSE Gateway Science Specification
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cambridgeinternational.org/Images/573787-guide-to-planning-practical-science.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cambridge International IGCSE - Science Practical
                    Requirements
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <strong>Technology Performance & Accessibility:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>
                  <a
                    href="https://www.w3.org/WAI/WCAG21/quickref/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    W3C Web Content Accessibility Guidelines (WCAG) 2.1
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.google.com/web/fundamentals/performance"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Web Fundamentals - Performance Best Practices
                  </a>
                </li>
                <li>
                  <a
                    href="https://gdpr.eu/what-is-gdpr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GDPR Compliance Guidelines for Educational Technology
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              backgroundColor: "#e8f4f8",
              borderRadius: "4px",
              borderLeft: "4px solid #14b7ff",
            }}
          >
            <p style={{ margin: 0, fontSize: "0.85rem" }}>
              <strong>Note:</strong> Whimsylabs is committed to evidence-based
              education. All performance metrics, research findings, and
              educational outcomes mentioned are based on peer-reviewed studies,
              independent assessments, and real-world implementation data. We
              regularly update our research base to reflect the latest
              developments in educational technology and virtual learning
              effectiveness.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#666", margin: 0 }}>
              For additional research inquiries or to access our complete
              bibliography, please{" "}
              <a
                href="/contact/"
                style={{
                  color: "#14b7ff",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                contact our research team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;