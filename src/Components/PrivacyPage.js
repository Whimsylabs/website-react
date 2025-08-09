import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './PrivacyPage.css';
import { Helmet } from 'react-helmet-async';
import withTranslation from './withTranslation';

const PrivacyPage = ({ t, currentLang, language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>Privacy Policy | WhimsyLabs Virtual Lab Software</title>
        <meta name="description" content="WhimsyLabs Privacy Policy - Learn how we collect, use, and protect your personal information when using our virtual laboratory software." />
        <meta name="keywords" content="WhimsyLabs privacy policy, data protection, GDPR compliance, virtual lab privacy, educational software privacy" />
      </Helmet>
      <Header />
      <div className="privacy-page">
        <div className="container py-5">
          <div className="privacy-header">
            <h1 className="privacy-title">{t('privacy.title')}</h1>
            <p className="privacy-subtitle">
              {t('privacy.subtitle')}
            </p>
            <p className="privacy-last-updated">
              <strong>Last Updated:</strong> January 8, 2025
            </p>
          </div>
          
          <div className="privacy-content">
            <section className="privacy-section">
              <h2>1. Information We Collect</h2>
              
              <h3>1.1 Information You Provide</h3>
              <p>
                When you use WhimsyLabs virtual laboratory software, we may collect information that you voluntarily provide, including:
              </p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, school/institution affiliation</li>
                <li><strong>Educational Data:</strong> Lab experiment results, assessment scores, learning progress</li>
                <li><strong>Communication Data:</strong> Messages sent through our support system or contact forms</li>
                <li><strong>Feedback Data:</strong> Survey responses, feature requests, and user feedback</li>
              </ul>

              <h3>1.2 Automatically Collected Information</h3>
              <p>
                We automatically collect certain technical information to improve our service:
              </p>
              <ul>
                <li><strong>Usage Data:</strong> Time spent in virtual labs, experiments completed, interaction patterns</li>
                <li><strong>Technical Data:</strong> Device type, browser information, IP address, operating system</li>
                <li><strong>Performance Data:</strong> Load times, error logs, system performance metrics</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>2. How We Use Your Information</h2>
              
              <p>We use the collected information for the following purposes:</p>
              
              <h3>2.1 Educational Services</h3>
              <ul>
                <li>Provide access to virtual laboratory experiments and simulations</li>
                <li>Generate AI-powered feedback and assessments</li>
                <li>Track learning progress and provide personalized recommendations</li>
                <li>Enable teachers to monitor student performance and provide support</li>
              </ul>

              <h3>2.2 Service Improvement</h3>
              <ul>
                <li>Analyze usage patterns to improve our virtual lab platform</li>
                <li>Develop new features and experiments based on user needs</li>
                <li>Optimize performance and fix technical issues</li>
                <li>Conduct educational research to enhance learning outcomes</li>
              </ul>

              <h3>2.3 Communication</h3>
              <ul>
                <li>Respond to support requests and technical issues</li>
                <li>Send important updates about our service</li>
                <li>Provide educational resources and best practices</li>
                <li>Notify users of new features and improvements</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>3. Data Sharing and Disclosure</h2>
              
              <p>
                WhimsyLabs follows a strict data minimization policy. We do not sell, rent, or trade your personal information. 
                We may share information only in the following limited circumstances:
              </p>
              
              <h3>3.1 Educational Institution Access</h3>
              <p>
                If you access WhimsyLabs through your school or educational institution, authorized educators and administrators 
                may have access to your educational data and progress reports as part of the normal educational process.
              </p>

              <h3>3.2 Service Providers</h3>
              <p>
                We may share information with trusted third-party service providers who assist us in operating our platform, 
                such as cloud hosting services, analytics providers, and customer support tools. These providers are 
                contractually bound to protect your information and use it only for specified purposes.
              </p>

              <h3>3.3 Legal Requirements</h3>
              <p>
                We may disclose information if required by law, court order, or government regulation, or if we believe 
                disclosure is necessary to protect our rights, your safety, or the safety of others.
              </p>
            </section>

            <section className="privacy-section">
              <h2>4. Data Security and Protection</h2>
              
              <p>
                We implement comprehensive security measures to protect your information:
              </p>
              
              <ul>
                <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
                <li><strong>Access Controls:</strong> Strict access controls ensure only authorized personnel can access user data</li>
                <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
                <li><strong>Data Backup:</strong> Secure backup systems protect against data loss</li>
                <li><strong>Incident Response:</strong> We have procedures in place to respond quickly to any security incidents</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>5. Your Rights and Choices</h2>
              
              <p>
                You have several rights regarding your personal information:
              </p>
              
              <h3>5.1 Access and Portability</h3>
              <p>
                You can request access to your personal data and receive a copy in a portable format.
              </p>

              <h3>5.2 Correction and Updates</h3>
              <p>
                You can update or correct your personal information through your account settings or by contacting us.
              </p>

              <h3>5.3 Deletion</h3>
              <p>
                You can request deletion of your personal data, subject to legal and educational record-keeping requirements.
              </p>

              <h3>5.4 Opt-Out</h3>
              <p>
                You can opt out of non-essential communications and certain data collection practices.
              </p>
            </section>

            <section className="privacy-section">
              <h2>6. Children's Privacy (COPPA/GDPR Compliance)</h2>
              
              <p>
                WhimsyLabs is designed for educational use and may be used by students under 18. We comply with applicable 
                children's privacy laws, including COPPA (Children's Online Privacy Protection Act) and GDPR requirements:
              </p>
              
              <ul>
                <li>We collect minimal information necessary for educational purposes</li>
                <li>We require parental or school consent for users under 13</li>
                <li>We do not use children's data for advertising or marketing</li>
                <li>We provide enhanced privacy protections for student data</li>
                <li>We allow parents and schools to review and delete children's data</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>7. International Data Transfers</h2>
              
              <p>
                WhimsyLabs operates globally and may transfer data across international borders. We ensure appropriate 
                safeguards are in place for international transfers, including:
              </p>
              
              <ul>
                <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                <li>Adequacy decisions where applicable</li>
                <li>Additional security measures for sensitive educational data</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>8. Data Retention</h2>
              
              <p>
                We retain your information only as long as necessary for educational and legal purposes:
              </p>
              
              <ul>
                <li><strong>Active Accounts:</strong> Data is retained while your account is active</li>
                <li><strong>Educational Records:</strong> Student progress data may be retained for educational continuity</li>
                <li><strong>Legal Requirements:</strong> Some data may be retained to comply with legal obligations</li>
                <li><strong>Deletion Requests:</strong> We honor deletion requests while respecting educational and legal requirements</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>9. Cookies and Tracking Technologies</h2>
              
              <p>
                We use cookies and similar technologies to enhance your experience:
              </p>
              
              <ul>
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how users interact with our platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              
              <p>
                You can control cookie settings through your browser, though disabling certain cookies may affect platform functionality.
              </p>
            </section>

            <section className="privacy-section">
              <h2>10. Updates to This Privacy Policy</h2>
              
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
                We will notify users of significant changes through:
              </p>
              
              <ul>
                <li>Email notifications to registered users</li>
                <li>Prominent notices on our website</li>
                <li>In-platform notifications</li>
              </ul>
              
              <p>
                Continued use of WhimsyLabs after policy updates constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="privacy-section">
              <h2>11. Contact Information</h2>
              
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="contact-info">
                <p><strong>General Inquiries:</strong> inquiries@whimsylabs.ai</p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>12. Regulatory Compliance</h2>
              
              <p>
                WhimsyLabs complies with applicable privacy regulations, including:
              </p>
              
              <ul>
                <li><strong>GDPR:</strong> General Data Protection Regulation (EU)</li>
                <li><strong>COPPA:</strong> Children's Online Privacy Protection Act (US)</li>
                <li><strong>FERPA:</strong> Family Educational Rights and Privacy Act (US)</li>
                <li><strong>UK GDPR:</strong> UK Data Protection Act 2018</li>
                <li><strong>PIPEDA:</strong> Personal Information Protection and Electronic Documents Act (Canada)</li>
              </ul>
              
              <p>
                We regularly review our practices to ensure ongoing compliance with evolving privacy regulations.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer language={language || currentLang} />
    </main>
  );
};

export default withTranslation(PrivacyPage);