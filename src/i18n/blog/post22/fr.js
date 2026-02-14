import React from "react";

export const title = "10 Questions EdTech Après la Violation PowerSchool";
export const date = "2026-02-07";
export const slug = "edtech-vendor-security-questions-powerschool";
export const description = "Après la violation PowerSchool exposant des millions d'élèves, les écoles doivent vérifier les fournisseurs EdTech. 10 questions essentielles.";
export const keywords = "PowerSchool data breach, EdTech security, student data privacy, school vendor questionnaire, FERPA compliance, GDPR education, virtual lab security, EdTech vendor vetting";

export const content = (
  <>
    <figure className="blog-image">
      <img
        src="/images/seccenter.jpg"
        alt="Administrateur scolaire examinant la documentation de sécurité d'un fournisseur EdTech"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        Les écoles sont désormais légalement responsables de vérifier les pratiques de sécurité de leurs fournisseurs EdTech
      </figcaption>
    </figure>

    <p>
      En décembre 2024, PowerSchool a subi une violation de données massive qui a exposé les informations personnelles d'environ 62,4 millions d'élèves et 9,5 millions d'éducateurs en Amérique du Nord (<a href="https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/" target="_blank" rel="noopener noreferrer">BleepingComputer, 2025</a>). La violation s'est produite à cause d'un seul identifiant d'employé compromis et de l'absence d'authentification multifacteur sur un portail de support critique (<a href="https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened" target="_blank" rel="noopener noreferrer">TechTarget, 2025</a>). Les régulateurs de la vie privée ont depuis souligné que les écoles portent la responsabilité de vérifier les pratiques de sécurité de leurs fournisseurs.
    </p>
    <p>
      Cela change tout dans la façon dont les écoles devraient évaluer les fournisseurs EdTech. Que vous envisagiez un laboratoire de sciences virtuel, un système de gestion de l'apprentissage ou tout logiciel qui touche aux données des élèves, vous devez poser des questions plus difficiles. Voici dix questions que chaque école devrait poser avant de signer un contrat.
    </p>

    <h2>1. Où sont stockées nos données ?</h2>
    <p>
      Il ne s'agit pas seulement de connaître le pays. Vous avez besoin de détails précis :
    </p>
    <ul>
      <li><strong>Quel fournisseur cloud ?</strong> (AWS, Google Cloud, Azure ou auto-hébergé ?)</li>
      <li><strong>Quelle région ?</strong> (Les écoles de l'UE peuvent exiger des serveurs basés dans l'UE pour le RGPD)</li>
      <li><strong>Les données sont-elles transférées à l'international ?</strong></li>
      <li><strong>Les sauvegardes sont-elles stockées dans un emplacement différent ?</strong></li>
    </ul>
    <p>
      Un fournisseur qui ne peut pas répondre précisément à ces questions n'a probablement pas réfléchi soigneusement à son architecture de données. L'Information Commissioner's Office du Royaume-Uni exige spécifiquement que les organisations sachent où les données personnelles sont traitées (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>).
    </p>

    <h2>2. Avez-vous une certification SOC 2 ou ISO 27001 ?</h2>
    <p>
      SOC 2 (System and Organization Controls) est un audit de sécurité effectué par des comptables indépendants qui prouve que les contrôles de sécurité d'un fournisseur fonctionnent réellement, pas seulement qu'ils existent sur papier (<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer">AICPA, 2024</a>). Il existe deux types :
    </p>
    <ul>
      <li><strong>Type I :</strong> Confirme que les contrôles existent à un moment donné</li>
      <li><strong>Type II :</strong> Confirme que les contrôles ont fonctionné de manière cohérente pendant 6 à 12 mois (plus rigoureux)</li>
    </ul>
    <p>
      ISO 27001 est un équivalent international reconnu dans plus de 160 pays (<a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer">ISO, 2022</a>). Si un fournisseur n'a ni l'un ni l'autre, demandez quelle validation tierce il possède. "Nous prenons la sécurité au sérieux" n'est pas une certification.
    </p>

    <h2>3. Qui a accès aux données des élèves ?</h2>
    <p>
      La violation de PowerSchool s'est produite via un portail de support client qui manquait de contrôles d'accès appropriés. Demandez aux fournisseurs :
    </p>
    <ul>
      <li>Combien d'employés peuvent accéder aux données des élèves ?</li>
      <li>L'accès est-il enregistré et auditable ?</li>
      <li>Le personnel de support a-t-il besoin de votre permission avant d'accéder à vos données ?</li>
      <li>Les sous-traitants et les tiers sont-ils inclus dans les contrôles d'accès ?</li>
    </ul>
    <p>
      Le principe du moindre privilège, une exigence fondamentale dans des cadres comme le NIST Cybersecurity Framework (<a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST, 2024</a>), signifie que les employés ne devraient accéder qu'aux données minimales nécessaires à leur travail. Si "tout le monde au support" peut voir les dossiers des élèves, c'est un signal d'alarme.
    </p>

    <h2>4. Utilisez-vous l'authentification multifacteur ?</h2>
    <p>
      La violation de PowerSchool aurait pu être évitée avec la MFA. Selon Microsoft, la MFA bloque 99,9 % des attaques automatisées (<a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer">Microsoft, 2019</a>). Demandez spécifiquement :
    </p>
    <ul>
      <li>La MFA est-elle obligatoire pour tous les comptes employés ?</li>
      <li>La MFA est-elle obligatoire pour les portails administratifs ?</li>
      <li>La MFA est-elle disponible pour les comptes administrateurs scolaires ?</li>
      <li>Quelles méthodes MFA sont prises en charge ? (L'application est plus forte que le SMS)</li>
    </ul>
    <p>
      Si un fournisseur n'applique pas la MFA en interne, il ne respecte pas les pratiques de base en matière d'hygiène de sécurité en 2026.
    </p>

    <h2>5. Quels services tiers touchent nos données ?</h2>
    <p>
      De nombreuses plateformes EdTech utilisent des services externes pour l'analyse, le suivi des erreurs, les fonctionnalités d'IA ou l'hébergement. Chacun est un point de fuite potentiel. En vertu du RGPD, les fournisseurs doivent divulguer tous les sous-traitants qui traitent des données personnelles (<a href="https://www.edpb.europa.eu/" target="_blank" rel="noopener noreferrer">EDPB, 2024</a>). Demandez une liste complète et quelles données chacun reçoit.
    </p>
    <p>
      Attention à :
    </p>
    <ul>
      <li><strong>Les plateformes d'analyse</strong> (Google Analytics, Mixpanel) qui peuvent suivre le comportement des élèves</li>
      <li><strong>Les services d'IA</strong> qui traitent les travaux des élèves pour la notation ou le feedback</li>
      <li><strong>Les outils de support client</strong> qui peuvent stocker des journaux de conversation</li>
      <li><strong>Le suivi des erreurs</strong> qui pourrait capturer des données sensibles dans les rapports de plantage</li>
    </ul>
    <p>
      Un fournisseur avec "pas d'analyse tierce sur les applications destinées aux élèves" prend un engagement significatif.
    </p>

    <h2>6. Quelle est votre politique de données IA ?</h2>
    <p>
      Avec l'EdTech alimenté par l'IA devenant courant, comprendre comment les fournisseurs gèrent l'IA et les données des élèves est crucial. Les recherches du Future of Privacy Forum sur la gouvernance de l'IA fournissent des cadres utiles pour évaluer ces politiques (<a href="https://fpf.org/issue/ai-ml/" target="_blank" rel="noopener noreferrer">FPF, 2024</a>). Renseignez-vous sur :
    </p>
    <ul>
      <li><strong>Utilisez-vous les données des élèves pour entraîner des modèles d'IA ?</strong> Si oui, est-ce opt-in ou opt-out ?</li>
      <li><strong>Les écoles peuvent-elles choisir de participer ?</strong></li>
      <li><strong>Le traitement IA est-il effectué sur votre infrastructure ou envoyé à des tiers ?</strong></li>
      <li><strong>Qu'advient-il des travaux des élèves après leur traitement ?</strong></li>
    </ul>
    <p>
      La clé est la transparence. Un fournisseur devrait expliquer clairement son approche et donner aux écoles un contrôle significatif sur la façon dont les données des élèves sont utilisées à des fins d'IA.
    </p>

    <h2>7. Quelle est votre politique de conservation des données ?</h2>
    <p>
      Les données qui n'existent pas ne peuvent pas être volées. Le principe de minimisation des données du RGPD exige que les organisations ne conservent les données personnelles que le temps nécessaire (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>). Demandez :
    </p>
    <ul>
      <li>Combien de temps les données des élèves sont-elles conservées après qu'ils quittent la plateforme ?</li>
      <li>Les écoles peuvent-elles demander une suppression anticipée ?</li>
      <li>Qu'advient-il des données si nous résilions notre abonnement ?</li>
      <li>Les sauvegardes sont-elles également supprimées ou persistent-elles ?</li>
    </ul>
    <p>
      Un fournisseur qui conserve les données des élèves indéfiniment "au cas où" représente un risque.
    </p>

    <h2>8. Que se passe-t-il en cas de violation ?</h2>
    <p>
      Tout fournisseur devrait avoir un plan de réponse aux incidents. Le RGPD exige une notification dans les 72 heures (<a href="https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>). Demandez :
    </p>
    <ul>
      <li>Avec quelle rapidité nous informerez-vous d'une violation ?</li>
      <li>Quelles informations la notification inclura-t-elle ?</li>
      <li>Avez-vous une assurance cybersécurité ?</li>
      <li>Fournirez-vous une surveillance du crédit pour les élèves affectés ?</li>
    </ul>
    <p>
      PowerSchool a mis des semaines à divulguer pleinement l'ampleur de sa violation, et certaines écoles ont signalé avoir appris la nouvelle par les médias plutôt que par une notification officielle. Des engagements contractuels clairs sur les délais de notification sont importants.
    </p>

    <h2>9. Pouvons-nous obtenir un Accord de Traitement des Données ?</h2>
    <p>
      Un Accord de Traitement des Données (DPA) est un contrat légal requis en vertu de l'Article 28 du RGPD qui définit comment un fournisseur gère vos données (<a href="https://gdpr.eu/what-is-data-processing-agreement/" target="_blank" rel="noopener noreferrer">GDPR.eu, 2024</a>). Il devrait spécifier :
    </p>
    <ul>
      <li>Quelles données sont collectées et pourquoi</li>
      <li>Comment les données sont protégées</li>
      <li>Les listes de sous-traitants</li>
      <li>Les procédures de notification de violation</li>
      <li>La suppression des données à la fin du contrat</li>
    </ul>
    <p>
      Si un fournisseur ne peut pas fournir de DPA, il n'est probablement pas prêt à travailler avec des écoles qui prennent la conformité au sérieux.
    </p>

    <h2>10. Comment protégez-vous les données de notre école ?</h2>
    <p>
      Comprendre comment vos données sont protégées des autres écoles sur la même plateforme est important. Le NIST Cybersecurity Framework recommande des approches de défense en profondeur. Renseignez-vous sur :
    </p>
    <ul>
      <li><strong>Chiffrement :</strong> Les données de votre école sont-elles chiffrées avec des clés spécifiques à votre organisation ?</li>
      <li><strong>Contrôles d'accès :</strong> Qu'est-ce qui empêche les utilisateurs d'une école d'accéder aux données d'une autre école ?</li>
      <li><strong>Journalisation d'audit :</strong> Toutes les tentatives d'accès aux données sont-elles enregistrées et surveillées ?</li>
      <li><strong>Tests de pénétration :</strong> Une société de sécurité indépendante a-t-elle testé la plateforme ?</li>
    </ul>
    <p>
      Recherchez des fournisseurs qui peuvent expliquer spécifiquement comment ils isolent et protègent vos données, que ce soit par le chiffrement, les contrôles d'accès ou la conception architecturale.
    </p>

    <h2>La nouvelle réalité pour les écoles</h2>
    <p>
      La violation de PowerSchool a changé le paysage réglementaire. Les commissaires à la vie privée ont clairement indiqué que les écoles ne peuvent pas simplement faire confiance aux fournisseurs ; elles doivent vérifier. Cela signifie que ces dix questions ne sont pas seulement de bonnes pratiques. Elles deviennent une exigence légale.
    </p>
    <p>
      Documentez les réponses que vous recevez. Incluez les exigences de sécurité dans vos contrats. Et n'ayez pas peur de vous éloigner des fournisseurs qui ne peuvent pas fournir de réponses claires.
    </p>
    <p>
      Chez WhimsyLabs, nous croyons que la transparence crée la confiance. Nous sommes heureux de répondre à ces dix questions pour toute école qui envisage nos laboratoires de sciences virtuels. <a href="/contact">Contactez-nous</a> et nous vous enverrons notre documentation de sécurité complète.
    </p>

    <div className="references-section">
      <h3>Références</h3>
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

    <h2>Lectures complémentaires</h2>
    <ul>
      <li><a href="/blog/royal-society-partnership-grants-vr-science-labs">Écoles britanniques : Obtenez 3 000 £ pour des laboratoires de sciences en VR</a></li>
      <li><a href="/blog/teachers-are-experts-custom-experiment-designer">Les enseignants sont les experts. Nous construisons simplement les outils.</a></li>
      <li><a href="/blog/ai-assessment-crisis-solution">La détection de l'IA ne fonctionne pas. L'évaluation basée sur les processus, si.</a></li>
    </ul>
  </>
);

