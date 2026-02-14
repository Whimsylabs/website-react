import React from "react";

export const title = "10 Fragen an EdTech-Anbieter nach PowerSchool-Leck";
export const date = "2026-02-07";
export const slug = "edtech-vendor-security-questions-powerschool";
export const description = "Nach dem PowerSchool-Datenleck, das Millionen von Schülern betraf, müssen Schulen EdTech-Anbieter prüfen. 10 wichtige Sicherheitsfragen.";
export const keywords = "PowerSchool data breach, EdTech security, student data privacy, school vendor questionnaire, FERPA compliance, GDPR education, virtual lab security, EdTech vendor vetting";

export const content = (
  <>
    <figure className="blog-image">
      <img
        src="/images/seccenter.jpg"
        alt="Schulverwalter überprüft Sicherheitsdokumentation eines EdTech-Anbieters"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        Schulen sind jetzt rechtlich dafür verantwortlich, die Sicherheitspraktiken ihrer EdTech-Anbieter zu überprüfen
      </figcaption>
    </figure>

    <p>
      Im Dezember 2024 erlitt PowerSchool einen massiven Datenbruch, bei dem die persönlichen Daten von etwa 62,4 Millionen Schülern und 9,5 Millionen Pädagogen in Nordamerika offengelegt wurden (<a href="https://www.bleepingcomputer.com/news/security/powerschool-hacker-claims-they-stole-data-of-62-million-students/" target="_blank" rel="noopener noreferrer">BleepingComputer, 2025</a>). Der Vorfall geschah aufgrund eines einzigen kompromittierten Mitarbeiter-Logins und fehlender Multi-Faktor-Authentifizierung bei einem kritischen Support-Portal (<a href="https://www.techtarget.com/whatis/feature/PowerSchool-data-breach-Explaining-how-it-happened" target="_blank" rel="noopener noreferrer">TechTarget, 2025</a>). Datenschutzbehörden haben seitdem betont, dass Schulen die Verantwortung tragen, die Sicherheitspraktiken ihrer Anbieter zu überprüfen.
    </p>
    <p>
      Dies ändert alles daran, wie Schulen EdTech-Anbieter bewerten sollten. Ob Sie ein virtuelles Naturwissenschaftslabor, ein Lernmanagementsystem oder jede Software in Betracht ziehen, die mit Schülerdaten arbeitet – Sie müssen härtere Fragen stellen. Hier sind zehn Fragen, die jede Schule vor Vertragsabschluss stellen sollte.
    </p>

    <h2>1. Wo werden unsere Daten gespeichert?</h2>
    <p>
      Es geht nicht nur darum, das Land zu kennen. Sie brauchen konkrete Angaben:
    </p>
    <ul>
      <li><strong>Welcher Cloud-Anbieter?</strong> (AWS, Google Cloud, Azure oder selbst gehostet?)</li>
      <li><strong>Welche Region?</strong> (EU-Schulen benötigen möglicherweise EU-basierte Server für die DSGVO)</li>
      <li><strong>Werden Daten jemals international übertragen?</strong></li>
      <li><strong>Werden Backups an einem anderen Ort gespeichert?</strong></li>
    </ul>
    <p>
      Ein Anbieter, der diese Fragen nicht präzise beantworten kann, hat wahrscheinlich nicht sorgfältig über seine Datenarchitektur nachgedacht. Das britische Information Commissioner's Office verlangt ausdrücklich, dass Organisationen wissen, wo personenbezogene Daten verarbeitet werden (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>).
    </p>

    <h2>2. Haben Sie eine SOC 2- oder ISO 27001-Zertifizierung?</h2>
    <p>
      SOC 2 (System and Organization Controls) ist ein Sicherheitsaudit, das von unabhängigen Wirtschaftsprüfern durchgeführt wird und beweist, dass die Sicherheitskontrollen eines Anbieters tatsächlich funktionieren, nicht nur auf dem Papier existieren (<a href="https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" target="_blank" rel="noopener noreferrer">AICPA, 2024</a>). Es gibt zwei Typen:
    </p>
    <ul>
      <li><strong>Typ I:</strong> Bestätigt, dass Kontrollen zu einem bestimmten Zeitpunkt existieren</li>
      <li><strong>Typ II:</strong> Bestätigt, dass Kontrollen über 6-12 Monate hinweg konsistent funktioniert haben (strenger)</li>
    </ul>
    <p>
      ISO 27001 ist ein internationales Äquivalent, das in über 160 Ländern anerkannt ist (<a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer">ISO, 2022</a>). Wenn ein Anbieter beides nicht hat, fragen Sie, welche Drittanbieter-Validierung er hat. "Wir nehmen Sicherheit ernst" ist keine Zertifizierung.
    </p>

    <h2>3. Wer hat Zugang zu Schülerdaten?</h2>
    <p>
      Der PowerSchool-Vorfall geschah über ein Kundensupport-Portal, das keine ordnungsgemäßen Zugriffskontrollen hatte. Fragen Sie Anbieter:
    </p>
    <ul>
      <li>Wie viele Mitarbeiter können auf Schülerdaten zugreifen?</li>
      <li>Wird der Zugriff protokolliert und ist er überprüfbar?</li>
      <li>Benötigt der Support Ihre Erlaubnis, bevor er auf Ihre Daten zugreift?</li>
      <li>Sind Auftragnehmer und Dritte in den Zugriffskontrollen enthalten?</li>
    </ul>
    <p>
      Das Prinzip der minimalen Rechte, eine Kernanforderung in Frameworks wie dem NIST Cybersecurity Framework (<a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST, 2024</a>), bedeutet, dass Mitarbeiter nur auf die minimal notwendigen Daten für ihre Arbeit zugreifen sollten. Wenn "jeder im Support" Schülerakten einsehen kann, ist das ein Warnsignal.
    </p>

    <h2>4. Nutzen Sie Multi-Faktor-Authentifizierung?</h2>
    <p>
      Der PowerSchool-Vorfall hätte mit MFA verhindert werden können. Laut Microsoft blockiert MFA 99,9% der automatisierten Angriffe (<a href="https://www.microsoft.com/en-us/security/blog/2019/08/20/one-simple-action-you-can-take-to-prevent-99-9-percent-of-account-attacks/" target="_blank" rel="noopener noreferrer">Microsoft, 2019</a>). Fragen Sie konkret:
    </p>
    <ul>
      <li>Ist MFA für alle Mitarbeiterkonten erforderlich?</li>
      <li>Ist MFA für Administrative Portale erforderlich?</li>
      <li>Ist MFA für Schuladministratorkonten verfügbar?</li>
      <li>Welche MFA-Methoden werden unterstützt? (App-basiert ist stärker als SMS)</li>
    </ul>
    <p>
      Wenn ein Anbieter MFA intern nicht durchsetzt, befolgt er 2026 keine grundlegende Sicherheitshygiene.
    </p>

    <h2>5. Welche Drittanbieterdienste berühren unsere Daten?</h2>
    <p>
      Viele EdTech-Plattformen nutzen externe Dienste für Analysen, Fehlerverfolgung, KI-Funktionen oder Hosting. Jeder einzelne ist ein potenzielles Datenleck. Unter der DSGVO müssen Anbieter alle Unterauftragsverarbeiter offenlegen, die personenbezogene Daten verarbeiten (<a href="https://www.edpb.europa.eu/" target="_blank" rel="noopener noreferrer">EDPB, 2024</a>). Fordern Sie eine vollständige Liste an und erfahren Sie, welche Daten jeder erhält.
    </p>
    <p>
      Achten Sie auf:
    </p>
    <ul>
      <li><strong>Analyseplattformen</strong> (Google Analytics, Mixpanel), die das Schülerverhalten verfolgen können</li>
      <li><strong>KI-Dienste</strong>, die Schülerarbeiten zur Bewertung oder Rückmeldung verarbeiten</li>
      <li><strong>Kundensupport-Tools</strong>, die Gesprächsprotokolle speichern können</li>
      <li><strong>Fehlerverfolgung</strong>, die möglicherweise sensible Daten in Absturzberichten erfasst</li>
    </ul>
    <p>
      Ein Anbieter mit "keiner Drittanbieter-Analyse bei schülerorientierten Anwendungen" macht eine bedeutsame Zusage.
    </p>

    <h2>6. Was ist Ihre KI-Datenrichtlinie?</h2>
    <p>
      Da KI-gestützte EdTech immer häufiger wird, ist es entscheidend zu verstehen, wie Anbieter mit KI und Schülerdaten umgehen. Die Forschung des Future of Privacy Forum zur KI-Governance bietet nützliche Rahmenwerke zur Bewertung dieser Richtlinien (<a href="https://fpf.org/issue/ai-ml/" target="_blank" rel="noopener noreferrer">FPF, 2024</a>). Fragen Sie nach:
    </p>
    <ul>
      <li><strong>Verwenden Sie Schülerdaten zum Training von KI-Modellen?</strong> Wenn ja, ist dies Opt-in oder Opt-out?</li>
      <li><strong>Können Schulen wählen, ob sie teilnehmen?</strong></li>
      <li><strong>Erfolgt die KI-Verarbeitung auf Ihrer Infrastruktur oder wird sie an Dritte gesendet?</strong></li>
      <li><strong>Was passiert mit Schülerarbeiten, nachdem sie verarbeitet wurden?</strong></li>
    </ul>
    <p>
      Der Schlüssel ist Transparenz. Ein Anbieter sollte seinen Ansatz klar erläutern und Schulen eine sinnvolle Kontrolle darüber geben, wie Schülerdaten für KI-Zwecke verwendet werden.
    </p>

    <h2>7. Was ist Ihre Datenaufbewahrungsrichtlinie?</h2>
    <p>
      Daten, die nicht existieren, können nicht gestohlen werden. Das Datenminimierungsprinzip der DSGVO verlangt, dass Organisationen personenbezogene Daten nur so lange aufbewahren, wie es notwendig ist (<a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>). Fragen Sie:
    </p>
    <ul>
      <li>Wie lange werden Schülerdaten aufbewahrt, nachdem sie die Plattform verlassen haben?</li>
      <li>Können Schulen eine vorzeitige Löschung beantragen?</li>
      <li>Was passiert mit Daten, wenn wir unser Abonnement kündigen?</li>
      <li>Werden Backups ebenfalls gelöscht oder bleiben sie bestehen?</li>
    </ul>
    <p>
      Ein Anbieter, der Schülerdaten unbegrenzt "für alle Fälle" aufbewahrt, ist ein Risiko.
    </p>

    <h2>8. Was passiert bei einem Datenleck?</h2>
    <p>
      Jeder Anbieter sollte einen Notfallplan haben. Die DSGVO verlangt eine Benachrichtigung innerhalb von 72 Stunden (<a href="https://ico.org.uk/for-organisations/report-a-breach/personal-data-breach/" target="_blank" rel="noopener noreferrer">ICO, 2024</a>). Fragen Sie:
    </p>
    <ul>
      <li>Wie schnell werden Sie uns über einen Vorfall informieren?</li>
      <li>Welche Informationen wird die Benachrichtigung enthalten?</li>
      <li>Haben Sie eine Cyberversicherung?</li>
      <li>Werden Sie Kreditüberwachung für betroffene Schüler anbieten?</li>
    </ul>
    <p>
      PowerSchool brauchte Wochen, um das volle Ausmaß seines Vorfalls offenzulegen, und einige Schulen berichteten, dass sie davon aus Medienberichten erfuhren statt aus offiziellen Benachrichtigungen. Klare vertragliche Zusagen zu Benachrichtigungsfristen sind wichtig.
    </p>

    <h2>9. Können wir einen Auftragsverarbeitungsvertrag bekommen?</h2>
    <p>
      Ein Auftragsverarbeitungsvertrag (AVV) ist ein rechtlich erforderlicher Vertrag gemäß DSGVO Artikel 28, der definiert, wie ein Anbieter Ihre Daten handhabt (<a href="https://gdpr.eu/what-is-data-processing-agreement/" target="_blank" rel="noopener noreferrer">GDPR.eu, 2024</a>). Er sollte spezifizieren:
    </p>
    <ul>
      <li>Welche Daten gesammelt werden und warum</li>
      <li>Wie Daten geschützt werden</li>
      <li>Listen von Unterauftragsverarbeitern</li>
      <li>Verfahren zur Benachrichtigung bei Datenschutzverletzungen</li>
      <li>Datenlöschung bei Vertragsbeendigung</li>
    </ul>
    <p>
      Wenn ein Anbieter keinen AVV bereitstellen kann, ist er wahrscheinlich nicht bereit, mit Schulen zusammenzuarbeiten, die Compliance ernst nehmen.
    </p>

    <h2>10. Wie schützen Sie die Daten unserer Schule?</h2>
    <p>
      Es ist wichtig zu verstehen, wie Ihre Daten vor anderen Schulen auf derselben Plattform geschützt werden. Das NIST Cybersecurity Framework empfiehlt mehrstufige Verteidigungsansätze. Fragen Sie nach:
    </p>
    <ul>
      <li><strong>Verschlüsselung:</strong> Werden die Daten Ihrer Schule mit Schlüsseln verschlüsselt, die spezifisch für Ihre Organisation sind?</li>
      <li><strong>Zugriffskontrollen:</strong> Was verhindert, dass Nutzer einer Schule auf Daten einer anderen Schule zugreifen?</li>
      <li><strong>Audit-Protokollierung:</strong> Werden alle Datenzugriffsversuche protokolliert und überwacht?</li>
      <li><strong>Penetrationstests:</strong> Hat eine unabhängige Sicherheitsfirma die Plattform getestet?</li>
    </ul>
    <p>
      Suchen Sie nach Anbietern, die konkret erklären können, wie sie Ihre Daten isolieren und schützen, sei es durch Verschlüsselung, Zugriffskontrollen oder Architekturdesign.
    </p>

    <h2>Die neue Realität für Schulen</h2>
    <p>
      Der PowerSchool-Vorfall hat die regulatorische Landschaft verändert. Datenschutzbeauftragte haben klargestellt, dass Schulen Anbietern nicht einfach vertrauen können; sie müssen überprüfen. Das bedeutet, dass diese zehn Fragen nicht nur gute Praxis sind. Sie werden zu einer rechtlichen Anforderung.
    </p>
    <p>
      Dokumentieren Sie die Antworten, die Sie erhalten. Nehmen Sie Sicherheitsanforderungen in Ihre Verträge auf. Und scheuen Sie sich nicht, von Anbietern abzusehen, die keine klaren Antworten geben können.
    </p>
    <p>
      Bei WhimsyLabs glauben wir, dass Transparenz Vertrauen schafft. Wir beantworten gerne alle zehn dieser Fragen für jede Schule, die unsere virtuellen Naturwissenschaftslabore in Betracht zieht. <a href="/contact">Kontaktieren Sie uns</a> und wir senden Ihnen unsere vollständige Sicherheitsdokumentation.
    </p>

    <div className="references-section">
      <h3>Referenzen</h3>
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

    <h2>Weiterführende Lektüre</h2>
    <ul>
      <li><a href="/blog/royal-society-partnership-grants-vr-science-labs">UK-Schulen: 3.000 £ für VR-Naturwissenschaftslabore erhalten</a></li>
      <li><a href="/blog/teachers-are-experts-custom-experiment-designer">Lehrkräfte sind die Experten. Wir bauen nur die Werkzeuge.</a></li>
      <li><a href="/blog/ai-assessment-crisis-solution">KI-Erkennung funktioniert nicht. Prozessbasierte Bewertung schon.</a></li>
    </ul>
  </>
);

