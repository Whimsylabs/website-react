import React from "react";

export const title = "PowerSchool侵害後にEdTechベンダーに尋ねるべき10の質問";
export const date = "2026-02-07";
export const slug = "edtech-vendor-security-questions-powerschool";
export const description = "PowerSchoolデータ侵害事件で6,240万人の生徒と950万人の教育者の情報が流出。学校がEdTechベンダー選定時に確認すべき10の重要なセキュリティ質問を解説。SOC 2認証、MFA、データ保持ポリシーなど、契約前に必ず確認を。";
export const keywords = "PowerSchool data breach, EdTech security, student data privacy, school vendor questionnaire, FERPA compliance, GDPR education, virtual lab security, EdTech vendor vetting";

export const content = (
  <>
    <figure className="blog-image">
      <img
        src="/images/seccenter.jpg"
        alt="School administrator reviewing EdTech vendor security documentation"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        Schools are now legally responsible for vetting their EdTech vendors' security practices
      </figcaption>
    </figure>

    <p>
      In December 2024, PowerSchool suffered a massive data breach that exposed the personal information of approximately 62.4 million students and 9.5 million educators across North America (<a href="https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/" target="_blank" rel="noopener noreferrer">BleepingComputer, 2025</a>). The breach happened because of a single compromised employee credential and a lack of multi-factor authentication on a critical support portal (<a href="https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened" target="_blank" rel="noopener noreferrer">TechTarget, 2025</a>). Privacy regulators have since emphasised that schools bear responsibility for vetting their vendors' security practices.
    </p>
    <p>
      This changes everything for how schools should evaluate EdTech providers. Whether you're considering a virtual science lab, a learning management system, or any software that touches student data, you need to ask harder questions. Here are ten questions every school should ask before signing a contract.
    </p>

    <h2>1. Where Is Our Data Stored?</h2>
    <p>
      This isn't just about knowing the country. You need specifics:
    </p>
    <ul>
      <li><strong>Which cloud provider?</strong> (AWS, Google Cloud, Azure, or self-hosted?)</li>
      <li><strong>Which region?</strong> (EU schools may require EU-based servers for GDPR)</li>
      <li><strong>Is data ever transferred internationally?</strong></li>
      <li><strong>Are backups stored in a different location?</strong></li>
    </ul>
    <p>
      A vendor who can't answer these questions precisely probably hasn't thought carefully about their data architecture. The UK Information Commissioner's Office specifically requires organisations to know where personal data is processed (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>).
    </p>

    <h2>2. Do You Have SOC 2 or ISO 27001 Certification?</h2>
    <p>
      SOC 2 (System and Organization Controls) is a security audit performed by independent accountants that proves a vendor's security controls actually work, not just that they exist on paper (<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer">AICPA, 2024</a>). There are two types:
    </p>
    <ul>
      <li><strong>Type I:</strong> Confirms controls exist at a point in time</li>
      <li><strong>Type II:</strong> Confirms controls worked consistently over 6-12 months (more rigorous)</li>
    </ul>
    <p>
      ISO 27001 is an international equivalent recognised in over 160 countries (<a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer">ISO, 2022</a>). If a vendor has neither, ask what third-party validation they do have. "We take security seriously" is not a certification.
    </p>

    <h2>3. Who Has Access to Student Data?</h2>
    <p>
      The PowerSchool breach happened through a customer support portal that lacked proper access controls. Ask vendors:
    </p>
    <ul>
      <li>How many employees can access student data?</li>
      <li>Is access logged and auditable?</li>
      <li>Do support staff need your permission before accessing your data?</li>
      <li>Are contractors and third parties included in access controls?</li>
    </ul>
    <p>
      The principle of least privilege, a core requirement in frameworks like NIST Cybersecurity Framework (<a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST, 2024</a>), means employees should only access the minimum data needed for their job. If "everyone in support" can see student records, that's a red flag.
    </p>

    <h2>4. Do You Use Multi-Factor Authentication?</h2>
    <p>
      PowerSchool's breach could have been prevented with MFA. According to Microsoft, MFA blocks 99.9% of automated attacks (<a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer">Microsoft, 2019</a>). Ask specifically:
    </p>
    <ul>
      <li>Is MFA required for all employee accounts?</li>
      <li>Is MFA required for administrative portals?</li>
      <li>Is MFA available for school admin accounts?</li>
      <li>What MFA methods are supported? (App-based is stronger than SMS)</li>
    </ul>
    <p>
      If a vendor doesn't enforce MFA internally, they're not following basic security hygiene in 2026.
    </p>

    <h2>5. What Third-Party Services Touch Our Data?</h2>
    <p>
      Many EdTech platforms use external services for analytics, error tracking, AI features, or hosting. Each one is a potential leak point. Under GDPR, vendors must disclose all sub-processors who handle personal data (<a href="https://www.edpb.europa.eu/" target="_blank" rel="noopener noreferrer">EDPB, 2024</a>). Ask for a complete list and what data each one receives.
    </p>
    <p>
      Watch out for:
    </p>
    <ul>
      <li><strong>Analytics platforms</strong> (Google Analytics, Mixpanel) that may track student behaviour</li>
      <li><strong>AI services</strong> that process student work for grading or feedback</li>
      <li><strong>Customer support tools</strong> that may store conversation logs</li>
      <li><strong>Error tracking</strong> that might capture sensitive data in crash reports</li>
    </ul>
    <p>
      A vendor with "no third-party analytics on student-facing applications" is making a meaningful commitment.
    </p>

    <h2>6. What Is Your AI Data Policy?</h2>
    <p>
      With AI-powered EdTech becoming common, understanding how vendors handle AI and student data is crucial. The Future of Privacy Forum's research on AI governance provides useful frameworks for evaluating these policies (<a href="https://fpf.org/issue/ai-ml/" target="_blank" rel="noopener noreferrer">FPF, 2024</a>). Ask about:
    </p>
    <ul>
      <li><strong>Do you use student data to train AI models?</strong> If so, is this opt-in or opt-out?</li>
      <li><strong>Can schools choose whether to participate?</strong></li>
      <li><strong>Is the AI processing done on your infrastructure or sent to third parties?</strong></li>
      <li><strong>What happens to student work after it's processed?</strong></li>
    </ul>
    <p>
      The key is transparency. A vendor should clearly explain their approach and give schools meaningful control over how student data is used for AI purposes.
    </p>

    <h2>7. What's Your Data Retention Policy?</h2>
    <p>
      Data that doesn't exist can't be breached. GDPR's data minimisation principle requires organisations to keep personal data only as long as necessary (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>). Ask:
    </p>
    <ul>
      <li>How long is student data kept after they leave the platform?</li>
      <li>Can schools request early deletion?</li>
      <li>What happens to data if we cancel our subscription?</li>
      <li>Are backups also deleted, or do they persist?</li>
    </ul>
    <p>
      A vendor keeping student data indefinitely "just in case" is a liability.
    </p>

    <h2>8. What Happens If There's a Breach?</h2>
    <p>
      Every vendor should have an incident response plan. GDPR requires notification within 72 hours (<a href="https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>). Ask:
    </p>
    <ul>
      <li>How quickly will you notify us of a breach?</li>
      <li>What information will the notification include?</li>
      <li>Do you have cybersecurity insurance?</li>
      <li>Will you provide credit monitoring for affected students?</li>
    </ul>
    <p>
      PowerSchool took weeks to fully disclose the scope of their breach, and some schools reported learning about it from media reports rather than official notification. Clear contractual commitments on notification timelines matter.
    </p>

    <h2>9. Can We Get a Data Processing Agreement?</h2>
    <p>
      A Data Processing Agreement (DPA) is a legal contract required under GDPR Article 28 that defines how a vendor handles your data (<a href="https://gdpr.eu/what-is-data-processing-agreement/" target="_blank" rel="noopener noreferrer">GDPR.eu, 2024</a>). It should specify:
    </p>
    <ul>
      <li>What data is collected and why</li>
      <li>How data is protected</li>
      <li>Sub-processor lists</li>
      <li>Breach notification procedures</li>
      <li>Data deletion upon termination</li>
    </ul>
    <p>
      If a vendor can't provide a DPA, they're probably not ready to work with schools that take compliance seriously.
    </p>

    <h2>10. How Do You Protect Our School's Data?</h2>
    <p>
      Understanding how your data is protected from other schools on the same platform is important. The NIST Cybersecurity Framework recommends defence-in-depth approaches. Ask about:
    </p>
    <ul>
      <li><strong>Encryption:</strong> Is your school's data encrypted with keys specific to your organisation?</li>
      <li><strong>Access controls:</strong> What prevents users from one school accessing another school's data?</li>
      <li><strong>Audit logging:</strong> Are all data access attempts logged and monitored?</li>
      <li><strong>Penetration testing:</strong> Has an independent security firm tested the platform?</li>
    </ul>
    <p>
      Look for vendors who can explain specifically how they isolate and protect your data, whether through encryption, access controls, or architectural design.
    </p>

    <h2>The New Reality for Schools</h2>
    <p>
      The PowerSchool breach has changed the regulatory landscape. Privacy commissioners have made clear that schools can't simply trust vendors; they must verify. This means these ten questions aren't just good practice. They're becoming a legal requirement.
    </p>
    <p>
      Document the answers you receive. Include security requirements in your contracts. And don't be afraid to walk away from vendors who can't provide clear answers.
    </p>
    <p>
      At WhimsyLabs, we believe transparency builds trust. We're happy to answer all ten of these questions for any school considering our virtual science labs. <a href="/contact">Get in touch</a> and we'll send you our complete security documentation.
    </p>

    <div className="references-section">
      <h3>References</h3>
      <ul className="references-list">
        <li key="ref-1">
          AICPA. (2024). SOC 2 - SOC for Service Organizations: Trust Services Criteria.
          <em> American Institute of Certified Public Accountants</em>.
          <a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer"> https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2</a>
        </li>
        <li key="ref-2">
          BleepingComputer. (2025, January 22). PowerSchool hacker claims they stole data of 62 million students.
          <em> BleepingComputer</em>.
          <a href="https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/" target="_blank" rel="noopener noreferrer"> https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/</a>
        </li>
        <li key="ref-3">
          European Data Protection Board. (2024). Guidelines on the concepts of controller and processor.
          <em> EDPB</em>.
          <a href="https://www.edpb.europa.eu/" target="_blank" rel="noopener noreferrer"> https://www.edpb.europa.eu/</a>
        </li>
        <li key="ref-4">
          Future of Privacy Forum. (2024). Center for Artificial Intelligence.
          <em> FPF</em>.
          <a href="https://fpf.org/issue/ai-ml/" target="_blank" rel="noopener noreferrer"> https://fpf.org/issue/ai-ml/</a>
        </li>
        <li key="ref-5">
          GDPR.eu. (2024). What is a Data Processing Agreement?
          <em> GDPR.eu</em>.
          <a href="https://gdpr.eu/what-is-data-processing-agreement/" target="_blank" rel="noopener noreferrer"> https://gdpr.eu/what-is-data-processing-agreement/</a>
        </li>
        <li key="ref-6">
          Information Commissioner's Office. (2024). International transfers of personal data.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/</a>
        </li>
        <li key="ref-7">
          Information Commissioner's Office. (2024). Personal data breaches.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/</a>
        </li>
        <li key="ref-8">
          Information Commissioner's Office. (2024). Guide to the UK GDPR.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/</a>
        </li>
        <li key="ref-9">
          ISO. (2022). ISO/IEC 27001:2022 Information Security Management.
          <em> International Organization for Standardization</em>.
          <a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer"> https://www.iso.org/standard/27001</a>
        </li>
        <li key="ref-10">
          Microsoft. (2019). One simple action you can take to prevent 99.9% of attacks on your accounts.
          <em> Microsoft Security Blog</em>.
          <a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer"> https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/</a>
        </li>
        <li key="ref-11">
          NIST. (2024). Cybersecurity Framework 2.0.
          <em> National Institute of Standards and Technology</em>.
          <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer"> https://www.nist.gov/cyberframework</a>
        </li>
        <li key="ref-12">
          TechTarget. (2025). PowerSchool data breach: Explaining how it happened.
          <em> TechTarget</em>.
          <a href="https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened" target="_blank" rel="noopener noreferrer"> https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened</a>
        </li>
        <li key="ref-13">
          US Department of Education. (2024). Student Privacy Policy Office.
          <em> Protecting Student Privacy</em>.
          <a href="https://studentprivacy.ed.gov/" target="_blank" rel="noopener noreferrer"> https://studentprivacy.ed.gov/</a>
        </li>
        <li key="ref-14">
          Information Commissioner's Office. (2024). Children and the UK GDPR.
          <em> ICO</em>.
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/" target="_blank" rel="noopener noreferrer"> https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/</a>
        </li>
      </ul>
    </div>

    <h2>Further Reading</h2>
    <ul>
      <li><a href="/blog/royal-society-partnership-grants-vr-science-labs">UK Schools: Get £3,000 for VR Science Labs</a></li>
      <li><a href="/blog/teachers-are-experts-custom-experiment-designer">Teachers Are the Experts. We Just Build the Tools.</a></li>
      <li><a href="/blog/ai-assessment-crisis-solution">AI Detection Doesn't Work. Process-Based Assessment Does.</a></li>
    </ul>
  </>
);

