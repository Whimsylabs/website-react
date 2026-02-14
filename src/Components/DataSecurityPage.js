import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './DataSecurityPage.css';
import { Helmet } from 'react-helmet-async';
import withTranslation from './withTranslation';

const DataSecurityPage = ({ t, currentLang, language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>{t('dataSecurity.title')}</title>
        <meta name="description" content={t('dataSecurity.description')} />
        <meta name="keywords" content="student data privacy, EdTech security, FERPA compliance, GDPR education, virtual lab data protection, school data security" />
      </Helmet>
      <Header currentLang={language} />
      
      <div id="security-tiled-background">
        <div className="container py-5">
          {/* Hero Header */}
          <div className="security-header-container">
            <div className="security-badge">🛡️ {t('dataSecurity.badge')}</div>
            <h1 className="security-main-heading">{t('dataSecurity.heroTitle')}</h1>
            <p className="security-subheading">{t('dataSecurity.heroSubtitle')}</p>
          </div>

          {/* Key Commitments */}
          <div className="security-content-container">
            <h2 className="security-section-heading">{t('dataSecurity.commitmentsTitle')}</h2>
            <div className="commitments-grid">
              <div className="commitment-card">
                <div className="commitment-icon">🔐</div>
                <h3>{t('dataSecurity.mfaTitle')}</h3>
                <p>{t('dataSecurity.mfaDesc')}</p>
              </div>
              
              <div className="commitment-card">
                <div className="commitment-icon">🔒</div>
                <h3>{t('dataSecurity.encryptionTitle')}</h3>
                <p>{t('dataSecurity.encryptionDesc')}</p>
              </div>
              
              <div className="commitment-card">
                <div className="commitment-icon">🛡️</div>
                <h3>{t('dataSecurity.sessionTitle')}</h3>
                <p>{t('dataSecurity.sessionDesc')}</p>
              </div>
              
              <div className="commitment-card">
                <div className="commitment-icon">🚫</div>
                <h3>{t('dataSecurity.noSalesTitle')}</h3>
                <p>{t('dataSecurity.noSalesDesc')}</p>
              </div>
              
              <div className="commitment-card">
                <div className="commitment-icon">🤖</div>
                <h3>{t('dataSecurity.aiTitle')}</h3>
                <p>{t('dataSecurity.aiDesc')}</p>
              </div>
              
              <div className="commitment-card">
                <div className="commitment-icon">📋</div>
                <h3>{t('dataSecurity.auditTitle')}</h3>
                <p>{t('dataSecurity.auditDesc')}</p>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div className="security-content-container">
            <h2 className="security-section-heading">{t('dataSecurity.complianceTitle')}</h2>
            <div className="compliance-grid">
              <div className="compliance-card">
                <div className="compliance-flag">🇬🇧🇪🇺</div>
                <h3>GDPR</h3>
                <p>{t('dataSecurity.gdprDesc')}</p>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-flag">🇺🇸</div>
                <h3>FERPA</h3>
                <p>{t('dataSecurity.ferpaDesc')}</p>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-flag">🎓</div>
                <h3>COPPA</h3>
                <p>{t('dataSecurity.coppaDesc')}</p>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-flag">🇨🇦</div>
                <h3>PIPEDA</h3>
                <p>{t('dataSecurity.pipedaDesc')}</p>
              </div>
            </div>
          </div>

          {/* What We Collect */}
          <div className="security-content-container">
            <h2 className="security-section-heading">{t('dataSecurity.collectTitle')}</h2>
            <p className="section-intro">{t('dataSecurity.collectIntro')}</p>
            
            <div className="data-table-container">
              <div className="data-category">
                <h3>📚 {t('dataSecurity.learningData')}</h3>
                <ul>
                  <li><strong>{t('dataSecurity.experimentActions')}</strong> - {t('dataSecurity.experimentActionsDesc')}</li>
                  <li><strong>{t('dataSecurity.progressMarkers')}</strong> - {t('dataSecurity.progressMarkersDesc')}</li>
                  <li><strong>{t('dataSecurity.assessmentResponses')}</strong> - {t('dataSecurity.assessmentResponsesDesc')}</li>
                  <li><strong>{t('dataSecurity.safetyCompliance')}</strong> - {t('dataSecurity.safetyComplianceDesc')}</li>
                </ul>
              </div>
              
              <div className="data-category">
                <h3>👤 {t('dataSecurity.accountData')}</h3>
                <ul>
                  <li><strong>{t('dataSecurity.username')}</strong> - {t('dataSecurity.usernameDesc')}</li>
                  <li><strong>{t('dataSecurity.schoolAssociation')}</strong> - {t('dataSecurity.schoolAssociationDesc')}</li>
                  <li><strong>{t('dataSecurity.role')}</strong> - {t('dataSecurity.roleDesc')}</li>
                </ul>
              </div>
              
              <div className="data-category data-not-collected">
                <h3>🚫 {t('dataSecurity.notCollected')}</h3>
                <p className="not-collected-list">{t('dataSecurity.notCollectedItems')}</p>
              </div>
            </div>
          </div>

          {/* Security Architecture */}
          <div className="security-content-container">
            <h2 className="security-section-heading">{t('dataSecurity.architectureTitle')}</h2>
            <div className="architecture-grid">
              <div className="arch-item">
                <span className="arch-icon">🔐</span>
                <div>
                  <h3>{t('dataSecurity.archEncryption')}</h3>
                  <p>{t('dataSecurity.archEncryptionDesc')}</p>
                </div>
              </div>
              
              <div className="arch-item">
                <span className="arch-icon">🔑</span>
                <div>
                  <h3>{t('dataSecurity.archRoleAccess')}</h3>
                  <p>{t('dataSecurity.archRoleAccessDesc')}</p>
                </div>
              </div>
              
              <div className="arch-item">
                <span className="arch-icon">📝</span>
                <div>
                  <h3>{t('dataSecurity.archAudit')}</h3>
                  <p>{t('dataSecurity.archAuditDesc')}</p>
                </div>
              </div>
              
              <div className="arch-item">
                <span className="arch-icon">💾</span>
                <div>
                  <h3>{t('dataSecurity.archBackups')}</h3>
                  <p>{t('dataSecurity.archBackupsDesc')}</p>
                </div>
              </div>
              
              <div className="arch-item">
                <span className="arch-icon">🌐</span>
                <div>
                  <h3>{t('dataSecurity.archOffline')}</h3>
                  <p>{t('dataSecurity.archOfflineDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Built Differently */}
          <div className="security-content-container">
            <h2 className="security-section-heading">{t('dataSecurity.builtTitle')}</h2>
            <p className="section-intro">{t('dataSecurity.builtIntro')}</p>
            
            <div className="checklist-container">
              <div className="checklist-item">
                <span className="check-icon">✓</span>
                <span>{t('dataSecurity.checkMfa')}</span>
              </div>
              <div className="checklist-item">
                <span className="check-icon">✓</span>
                <span>{t('dataSecurity.checkEncryption')}</span>
              </div>
              <div className="checklist-item">
                <span className="check-icon">✓</span>
                <span>{t('dataSecurity.checkNocentral')}</span>
              </div>
              <div className="checklist-item">
                <span className="check-icon">✓</span>
                <span>{t('dataSecurity.checkNosale')}</span>
              </div>
              <div className="checklist-item">
                <span className="check-icon">✓</span>
                <span>{t('dataSecurity.checkAudit')}</span>
              </div>
              <div className="checklist-item">
                <span className="check-icon">✓</span>
                <span>{t('dataSecurity.checkController')}</span>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="security-content-container">
            <h2 className="security-section-heading">{t('dataSecurity.rightsTitle')}</h2>
            <div className="rights-grid">
              <div className="right-card">
                <h3>📤 {t('dataSecurity.exportTitle')}</h3>
                <p>{t('dataSecurity.exportDesc')}</p>
              </div>
              
              <div className="right-card">
                <h3>🗑️ {t('dataSecurity.deleteTitle')}</h3>
                <p>{t('dataSecurity.deleteDesc')}</p>
              </div>
              
              <div className="right-card">
                <h3>🔍 {t('dataSecurity.accessTitle')}</h3>
                <p>{t('dataSecurity.accessDesc')}</p>
              </div>
              
              <div className="right-card">
                <h3>✏️ {t('dataSecurity.correctTitle')}</h3>
                <p>{t('dataSecurity.correctDesc')}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="security-cta-container">
            <h2>{t('dataSecurity.ctaTitle')}</h2>
            <p>{t('dataSecurity.ctaDesc')}</p>
            <div className="cta-buttons">
              <a href={language && language !== 'en' ? `/${language}/contact/` : '/contact/'} className="cta-button primary">{t('dataSecurity.contactBtn')}</a>
              <a href={language && language !== 'en' ? `/${language}/privacy/` : '/privacy/'} className="cta-button secondary">{t('dataSecurity.privacyBtn')}</a>
            </div>
          </div>
        </div>
      </div>
      <Footer language={language || currentLang} />
    </main>
  );
};

export default withTranslation(DataSecurityPage);
