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
        <title>{t('privacy.title')}</title>
        <meta name="description" content={t('privacy.description')} />
        <meta name="keywords" content="WhimsyLabs privacy policy, data protection, GDPR compliance, COPPA compliance, student data privacy, educational software privacy, DPA" />
      </Helmet>
      <Header currentLang={language} />
      <div className="privacy-page">
        <div className="container py-5">
          <div className="privacy-header">
            <h1 className="privacy-title">{t('privacy.title')}</h1>
            <p className="privacy-subtitle">
              {t('privacy.subtitle')}
            </p>
            <p className="privacy-last-updated">
              <strong>{t('privacy.lastUpdated')}:</strong> July 2025
            </p>
          </div>

          {/* Trust Badges Section */}
          <div className="trust-badges-container">
            <div className="trust-badge">
              <span className="trust-icon">🛡️</span>
              <span>{t('privacy.badges.gdpr')}</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">🎓</span>
              <span>{t('privacy.badges.studentData')}</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">🇬🇧</span>
              <span>{t('privacy.badges.ukBased')}</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">🚫</span>
              <span>{t('privacy.badges.noSale')}</span>
            </div>
          </div>
          
          <div className="privacy-content page-content">
            {/* Company Information & DPO Section */}
            <section className="privacy-section company-info-section">
              <h2>{t('privacy.companyInfo.title')}</h2>
              
              <div className="company-details-grid">
                <div className="company-detail-card">
                  <h3>🏢 {t('privacy.companyInfo.companyName')}</h3>
                  <p><strong>WhimsyLabs Ltd</strong></p>
                  <p>Edinburgh, United Kingdom</p>
                </div>
                
                <div className="company-detail-card">
                  <h3>👤 {t('privacy.companyInfo.dpo')}</h3>
                  <p>{t('privacy.companyInfo.dpoDesc')}</p>
                  <p><a href="mailto:privacy@whimsylabs.ai">privacy@whimsylabs.ai</a></p>
                </div>
                
                <div className="company-detail-card">
                  <h3>📋 {t('privacy.companyInfo.ico')}</h3>
                  <p>{t('privacy.companyInfo.icoDesc')}</p>
                  <a href="https://ico.org.uk/ESDWebPages/Entry/ZB548128" target="_blank" rel="noopener noreferrer" className="ico-link">
                    View ICO Registration →
                  </a>
                </div>
                
                <div className="company-detail-card">
                  <h3>📄 {t('privacy.companyInfo.dpa')}</h3>
                  <p>{t('privacy.companyInfo.dpaDesc')}</p>
                  <a href="/documents/dpa.pdf" className="dpa-download-btn" target="_blank" rel="noopener noreferrer">
                    📄 {t('privacy.companyInfo.dpaDownload')}
                  </a>
                </div>
              </div>
            </section>

            {/* Student Data Privacy Commitment */}
            <section className="privacy-section student-privacy-section">
              <h2>🎓 {t('privacy.studentPrivacy.title')}</h2>
              
              <div className="commitment-highlight">
                <p className="commitment-statement">{t('privacy.studentPrivacy.commitment')}</p>
              </div>
              
              <div className="student-privacy-grid">
                <div className="student-privacy-card">
                  <h3>{t('privacy.studentPrivacy.principles.title')}</h3>
                  <ul>
                    <li><strong>{t('privacy.studentPrivacy.principles.minimal')}:</strong> {t('privacy.studentPrivacy.principles.minimalDesc')}</li>
                    <li><strong>{t('privacy.studentPrivacy.principles.purpose')}:</strong> {t('privacy.studentPrivacy.principles.purposeDesc')}</li>
                    <li><strong>{t('privacy.studentPrivacy.principles.noAds')}:</strong> {t('privacy.studentPrivacy.principles.noAdsDesc')}</li>
                    <li><strong>{t('privacy.studentPrivacy.principles.noSale')}:</strong> {t('privacy.studentPrivacy.principles.noSaleDesc')}</li>
                    <li><strong>{t('privacy.studentPrivacy.principles.schoolControl')}:</strong> {t('privacy.studentPrivacy.principles.schoolControlDesc')}</li>
                  </ul>
                </div>
                
                <div className="student-privacy-card coppa-card">
                  <h3>🛡️ {t('privacy.studentPrivacy.coppa.title')}</h3>
                  <p>{t('privacy.studentPrivacy.coppa.intro')}</p>
                  <ul>
                    <li>{t('privacy.studentPrivacy.coppa.consent')}</li>
                    <li>{t('privacy.studentPrivacy.coppa.minimal')}</li>
                    <li>{t('privacy.studentPrivacy.coppa.noMarketing')}</li>
                    <li>{t('privacy.studentPrivacy.coppa.parentRights')}</li>
                    <li>{t('privacy.studentPrivacy.coppa.deletion')}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* School Data Deletion Requests */}
            <section className="privacy-section deletion-section">
              <h2>🗑️ {t('privacy.schoolDeletion.title')}</h2>
              <p>{t('privacy.schoolDeletion.intro')}</p>
              
              <div className="deletion-process">
                <div className="deletion-step">
                  <span className="step-number">1</span>
                  <div>
                    <h3>{t('privacy.schoolDeletion.step1.title')}</h3>
                    <p>{t('privacy.schoolDeletion.step1.desc')}</p>
                  </div>
                </div>
                <div className="deletion-step">
                  <span className="step-number">2</span>
                  <div>
                    <h3>{t('privacy.schoolDeletion.step2.title')}</h3>
                    <p>{t('privacy.schoolDeletion.step2.desc')}</p>
                  </div>
                </div>
                <div className="deletion-step">
                  <span className="step-number">3</span>
                  <div>
                    <h3>{t('privacy.schoolDeletion.step3.title')}</h3>
                    <p>{t('privacy.schoolDeletion.step3.desc')}</p>
                  </div>
                </div>
                <div className="deletion-step">
                  <span className="step-number">4</span>
                  <div>
                    <h3>{t('privacy.schoolDeletion.step4.title')}</h3>
                    <p>{t('privacy.schoolDeletion.step4.desc')}</p>
                  </div>
                </div>
              </div>
              
              <div className="deletion-contact">
                <p><strong>{t('privacy.schoolDeletion.contact')}:</strong> <a href="mailto:privacy@whimsylabs.ai">privacy@whimsylabs.ai</a></p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>1. {t('privacy.sections.infoCollect.title')}</h2>
              
              <h3>1.1 {t('privacy.sections.infoCollect.provided.title')}</h3>
              <p>
                {t('privacy.sections.infoCollect.provided.intro')}
              </p>
              <ul>
                <li><strong>{t('privacy.sections.infoCollect.provided.account')}:</strong> {t('privacy.sections.infoCollect.provided.accountDesc')}</li>
                <li><strong>{t('privacy.sections.infoCollect.provided.educational')}:</strong> {t('privacy.sections.infoCollect.provided.educationalDesc')}</li>
                <li><strong>{t('privacy.sections.infoCollect.provided.communication')}:</strong> {t('privacy.sections.infoCollect.provided.communicationDesc')}</li>
                <li><strong>{t('privacy.sections.infoCollect.provided.feedback')}:</strong> {t('privacy.sections.infoCollect.provided.feedbackDesc')}</li>
              </ul>

              <h3>1.2 {t('privacy.sections.infoCollect.automatic.title')}</h3>
              <p>
                {t('privacy.sections.infoCollect.automatic.intro')}
              </p>
              <ul>
                <li><strong>{t('privacy.sections.infoCollect.automatic.usage')}:</strong> {t('privacy.sections.infoCollect.automatic.usageDesc')}</li>
                <li><strong>{t('privacy.sections.infoCollect.automatic.technical')}:</strong> {t('privacy.sections.infoCollect.automatic.technicalDesc')}</li>
                <li><strong>{t('privacy.sections.infoCollect.automatic.performance')}:</strong> {t('privacy.sections.infoCollect.automatic.performanceDesc')}</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>2. {t('privacy.sections.usage.title')}</h2>
              
              <p>{t('privacy.sections.usage.intro')}</p>
              
              <h3>2.1 {t('privacy.sections.usage.educational.title')}</h3>
              <ul>
                <li>{t('privacy.sections.usage.educational.item1')}</li>
                <li>{t('privacy.sections.usage.educational.item2')}</li>
                <li>{t('privacy.sections.usage.educational.item3')}</li>
                <li>{t('privacy.sections.usage.educational.item4')}</li>
              </ul>

              <h3>2.2 {t('privacy.sections.usage.improvement.title')}</h3>
              <ul>
                <li>{t('privacy.sections.usage.improvement.item1')}</li>
                <li>{t('privacy.sections.usage.improvement.item2')}</li>
                <li>{t('privacy.sections.usage.improvement.item3')}</li>
                <li>{t('privacy.sections.usage.improvement.item4')}</li>
              </ul>

              <h3>2.3 {t('privacy.sections.usage.communication.title')}</h3>
              <ul>
                <li>{t('privacy.sections.usage.communication.item1')}</li>
                <li>{t('privacy.sections.usage.communication.item2')}</li>
                <li>{t('privacy.sections.usage.communication.item3')}</li>
                <li>{t('privacy.sections.usage.communication.item4')}</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>3. {t('privacy.sections.sharing.title')}</h2>
              
              <p>
                {t('privacy.sections.sharing.intro')}
              </p>
              
              <h3>3.1 {t('privacy.sections.sharing.institution.title')}</h3>
              <p>
                {t('privacy.sections.sharing.institution.desc')}
              </p>

              <h3>3.2 {t('privacy.sections.sharing.providers.title')}</h3>
              <p>
                {t('privacy.sections.sharing.providers.desc')}
              </p>

              <h3>3.3 {t('privacy.sections.sharing.legal.title')}</h3>
              <p>
                {t('privacy.sections.sharing.legal.desc')}
              </p>
            </section>

            <section className="privacy-section">
              <h2>4. {t('privacy.sections.security.title')}</h2>
              
              <p>
                {t('privacy.sections.security.intro')}
              </p>
              
              <ul>
                <li><strong>{t('privacy.sections.security.encryption')}:</strong> {t('privacy.sections.security.encryptionDesc')}</li>
                <li><strong>{t('privacy.sections.security.access')}:</strong> {t('privacy.sections.security.accessDesc')}</li>
                <li><strong>{t('privacy.sections.security.audits')}:</strong> {t('privacy.sections.security.auditsDesc')}</li>
                <li><strong>{t('privacy.sections.security.backup')}:</strong> {t('privacy.sections.security.backupDesc')}</li>
                <li><strong>{t('privacy.sections.security.incident')}:</strong> {t('privacy.sections.security.incidentDesc')}</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>5. {t('privacy.sections.rights.title')}</h2>
              
              <p>
                {t('privacy.sections.rights.intro')}
              </p>
              
              <h3>5.1 {t('privacy.sections.rights.access.title')}</h3>
              <p>
                {t('privacy.sections.rights.access.desc')}
              </p>

              <h3>5.2 {t('privacy.sections.rights.correction.title')}</h3>
              <p>
                {t('privacy.sections.rights.correction.desc')}
              </p>

              <h3>5.3 {t('privacy.sections.rights.deletion.title')}</h3>
              <p>
                {t('privacy.sections.rights.deletion.desc')}
              </p>

              <h3>5.4 {t('privacy.sections.rights.optout.title')}</h3>
              <p>
                {t('privacy.sections.rights.optout.desc')}
              </p>
            </section>

            <section className="privacy-section">
              <h2>6. {t('privacy.sections.children.title')}</h2>
              
              <p>
                {t('privacy.sections.children.intro')}
              </p>
              
              <ul>
                <li>{t('privacy.sections.children.item1')}</li>
                <li>{t('privacy.sections.children.item2')}</li>
                <li>{t('privacy.sections.children.item3')}</li>
                <li>{t('privacy.sections.children.item4')}</li>
                <li>{t('privacy.sections.children.item5')}</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>7. {t('privacy.sections.international.title')}</h2>
              
              <p>
                {t('privacy.sections.international.intro')}
              </p>
              
              <ul>
                <li>{t('privacy.sections.international.item1')}</li>
                <li>{t('privacy.sections.international.item2')}</li>
                <li>{t('privacy.sections.international.item3')}</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>8. {t('privacy.sections.retention.title')}</h2>
              
              <p>
                {t('privacy.sections.retention.intro')}
              </p>
              
              <ul>
                <li><strong>{t('privacy.sections.retention.active')}:</strong> {t('privacy.sections.retention.activeDesc')}</li>
                <li><strong>{t('privacy.sections.retention.educational')}:</strong> {t('privacy.sections.retention.educationalDesc')}</li>
                <li><strong>{t('privacy.sections.retention.legal')}:</strong> {t('privacy.sections.retention.legalDesc')}</li>
                <li><strong>{t('privacy.sections.retention.deletion')}:</strong> {t('privacy.sections.retention.deletionDesc')}</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>9. {t('privacy.sections.cookies.title')}</h2>
              
              <p>
                {t('privacy.sections.cookies.intro')}
              </p>
              
              <ul>
                <li><strong>{t('privacy.sections.cookies.essential')}:</strong> {t('privacy.sections.cookies.essentialDesc')}</li>
                <li><strong>{t('privacy.sections.cookies.performance')}:</strong> {t('privacy.sections.cookies.performanceDesc')}</li>
                <li><strong>{t('privacy.sections.cookies.preference')}:</strong> {t('privacy.sections.cookies.preferenceDesc')}</li>
              </ul>
              
              <p>
                {t('privacy.sections.cookies.control')}
              </p>
            </section>

            <section className="privacy-section">
              <h2>10. {t('privacy.sections.updates.title')}</h2>
              
              <p>
                {t('privacy.sections.updates.intro')}
              </p>
              
              <ul>
                <li>{t('privacy.sections.updates.item1')}</li>
                <li>{t('privacy.sections.updates.item2')}</li>
                <li>{t('privacy.sections.updates.item3')}</li>
              </ul>
              
              <p>
                {t('privacy.sections.updates.continued')}
              </p>
            </section>

            <section className="privacy-section">
              <h2>11. {t('privacy.sections.contact.title')}</h2>
              
              <p>
                {t('privacy.sections.contact.intro')}
              </p>
              
              <div className="contact-info">
                <p><strong>{t('privacy.sections.contact.company')}:</strong> WhimsyLabs Ltd</p>
                <p><strong>{t('privacy.sections.contact.address')}:</strong> Edinburgh, United Kingdom</p>
                <p><strong>{t('privacy.sections.contact.general')}:</strong> <a href="mailto:inquiries@whimsylabs.ai">inquiries@whimsylabs.ai</a></p>
                <p><strong>{t('privacy.sections.contact.privacy')}:</strong> <a href="mailto:privacy@whimsylabs.ai">privacy@whimsylabs.ai</a></p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>12. {t('privacy.sections.compliance.title')}</h2>
              
              <p>
                {t('privacy.sections.compliance.intro')}
              </p>
              
              <ul>
                <li><strong>GDPR:</strong> {t('privacy.sections.compliance.gdpr')}</li>
                <li><strong>COPPA:</strong> {t('privacy.sections.compliance.coppa')}</li>
                <li><strong>FERPA:</strong> {t('privacy.sections.compliance.ferpa')}</li>
                <li><strong>UK GDPR:</strong> {t('privacy.sections.compliance.ukgdpr')}</li>
                <li><strong>PIPEDA:</strong> {t('privacy.sections.compliance.pipeda')}</li>
              </ul>
              
              <p>
                {t('privacy.sections.compliance.review')}
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
