// German - Post 20: AI Assessment
import React from "react";

export const title = "KI-Erkennung funktioniert nicht. Prozessbasierte Bewertung schon.";
export const description = "82% der Pädagogen befürchten KI-Betrug, doch Erkennungstools versagen. Prozessbasierte praktische Bewertung bietet einen besseren Weg.";
export const keywords = [
  "KI Bewertung",
  "formative Bewertung KI",
  "KI-Erkennung Bildung",
  "Pearson Bewertungsforschung",
  "virtuelles Labor Benotung",
  "prozessbasierte Bewertung",
  "KI-resistente Bewertung",
  "naturwissenschaftliche Bildung KI",
  "praktische Bewertung",
  "Lehrer KI Benotung"
];

export const content = (
  <div>
    <figure className="blog-image">
      <img
        src="/images/potato.jpg"
        alt="Schüler führt praktische Bewertung im virtuellen Labor durch, in diesem Beispiel schneidet der Schüler eine Kartoffel für mikrobiologische Experimente"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        Prozessbasierte Bewertung erfasst, was Schüler tatsächlich tun, nicht nur was sie abgeben
      </figcaption>
    </figure>

    <p>
      Im Dezember 2025 veröffentlichte Pearson eine Erkenntnis, die niemanden im Bildungswesen überraschte: <a href="https://plc.pearson.com/en-GB/news-and-insights/assessment-evolved-redefining-formative-assessment-in-a-generative-ai-era" target="_blank" rel="noopener noreferrer">82% der Pädagogen sind besorgt darüber, dass Schüler GenAI zur Erledigung von Aufgaben nutzen</a>. Die institutionelle Reaktion war vorhersehbar: Erkennungstools, Überwachungssoftware und Richtlinien, die KI als etwas behandeln, das man erwischen und bestrafen muss.
    </p>
    <p>
      Zwei Jahre nach der weitverbreiteten ChatGPT-Nutzung können wir sehen, wie gut das funktioniert. Erkennungstools produzieren falsch-positive Ergebnisse, die das Vertrauen zu Schülern zerstören. Richtlinien unterscheiden sich drastisch zwischen Abteilungen, geschweige denn zwischen Institutionen. Schüler, die KI weit häufiger nutzen als Pädagogen schätzen, sind einfach besser darin geworden, es zu verbergen.
    </p>
    <p>
      Pearsons Forschung weist jedoch auf etwas Grundlegenderes hin. Das Risiko ist nicht wirklich Betrug. Das Risiko besteht darin, dass Schüler die kognitive Arbeit überspringen, die das Lernen überhaupt erst ermöglicht. Wenn ein Schüler ChatGPT seinen Laborbericht schreiben lässt, hat er nicht nur bei einer Aufgabe betrogen. Er hat das Denken verpasst, das die Aufgabe hervorbringen sollte.
    </p>
    <p>
      Bei WhimsyLabs sind wir anders an dieses Problem herangegangen. Anstatt zu fragen, wie man KI-Nutzung erkennt, haben wir gefragt, wie man Bewertungen gestaltet, bei denen KI einfach nicht helfen kann.
    </p>

    <h2>Warum Erkennung scheitert</h2>
    <p>
      KI-Erkennungstools behaupten, maschinell generierten Text mit hoher Genauigkeit zu identifizieren. Die Realität ist chaotischer. Diese Tools haben Schwierigkeiten, KI-Schreiben von menschlichem Schreiben zu unterscheiden, besonders wenn Schüler beim Prompting versierter werden. Sie produzieren auch falsch-positive Ergebnisse und kennzeichnen manchmal Arbeiten, die Schüler tatsächlich selbst geschrieben haben. Für einen Schüler, der fälschlicherweise des KI-Betrugs beschuldigt wird, kann der Schaden an seiner Beziehung zur Institution dauerhaft sein.
    </p>
    <p>
      Kane Murdoch, der an der Macquarie University für Beschwerden und Fehlverhalten zuständig ist, formuliert es in Pearsons Bericht treffend: „Das Problem mit Detektoren ist, dass sie keine Beweise generieren... Sobald jemand diese Zahl sieht, die der Detektor liefert, wird er während jedes nachfolgenden Prozesses voreingenommen sein."
    </p>
    <p>
      Über die Genauigkeitsprobleme hinaus schafft Erkennung eine adversative Dynamik. Sie nimmt an, dass Schüler betrügen, bis das Gegenteil bewiesen ist. Sie verbraucht Zeit und Energie, die in tatsächlichen Unterricht fließen könnten. Und sie tut nichts, um das grundlegende Problem anzugehen, ob Schüler tatsächlich lernen.
    </p>

    <h2>Prozess statt Produkt bewerten</h2>
    <p>
      Erwägen Sie, zu bewerten, wie Schüler arbeiten, anstatt nur was sie produzieren.
    </p>
    <p>
      Dies ist der Ansatz, den wir in WhimsyLabs eingebaut haben. Unsere virtuellen Labore lassen Schüler nicht nur Experimente durchführen. Sie erfassen detaillierte Daten über jede Aktion: wie präzise Schüler pipettieren, ob sie Endpunkte korrekt erkennen, wie sie mit Geräten umgehen, ob sie Sicherheitsprotokolle befolgen.
    </p>
    <p>
      Diese Daten ermöglichen etwas, was traditionelle Bewertung nicht kann: prozedurale Kompetenz direkt zu evaluieren. Wir fragen Schüler nicht, zu beschreiben, wie sie eine Titration durchführen würden. Wir beobachten sie dabei. Wir messen ihre Präzision. Wir sehen, ob sie Luftblasen aus der Bürette entfernen. Wir wissen, ob sie den Endpunkt überschreiten.
    </p>
    <p>
      ChatGPT kann keine virtuelle Titration für einen Schüler durchführen. Es gibt nichts zu erkennen, weil es nichts zu fälschen gibt.
    </p>

    <h2>Was wir messen</h2>
    <p>
      Wenn ein Schüler ein virtuelles Experiment abschließt, erfassen wir nicht nur sein Endergebnis. Wir sammeln Beweise über mehrere Dimensionen:
    </p>
    <ul>
      <li><strong>Präzision:</strong> Waren Messungen über Versuche hinweg konsistent? (±0,02 mL oder ±0,5 mL?)</li>
      <li><strong>Technik:</strong> Sanfte Hahnkontrolle? Korrektes Schwenken des Kolbens?</li>
      <li><strong>Timing:</strong> Wie schnell haben sie den Endpunkt erkannt? Wie lange dauerte der Aufbau?</li>
      <li><strong>Sicherheit:</strong> Richtige PSA? Korrekter Umgang mit Chemikalien und Entsorgung?</li>
      <li><strong>Problemlösung:</strong> Wie haben sie reagiert, als Ergebnisse unerwartet waren?</li>
    </ul>
    <p>
      Pearson nennt dies „reichhaltigere Formen von Beweisen". Traditionelle Bewertungen können diese Art von Daten einfach nicht erfassen. Noch wichtiger für das KI-Problem: Diese Beweise erfordern, dass der Schüler die Arbeit tatsächlich durchgeführt hat.
    </p>

    <h2>KI, die Lehrern hilft, nicht Schülern beim Betrügen</h2>
    <p>
      Unsere Lösung für das KI-Bewertungsproblem beinhaltet tatsächlich KI, aber in einer anderen Rolle. Anstatt Schülern zu helfen, das Lernen zu überspringen, nutzen wir KI, um Lehrern bei der Bewertung des Lernens zu helfen.
    </p>
    <p>
      Wenn ein Schüler ein virtuelles Experiment abschließt, analysiert unser System sein Aktionsprotokoll und experimentelle Daten. Es schlägt Noten über fünf Dimensionen vor: experimentelles Verfahren, Datenerfassung, Berechnungen, Laborsicherheit und wissenschaftliche Kommunikation. Jeder Vorschlag enthält ein Konfidenzniveau (75-98%), das Lehrern zeigt, wo KI-Bewertung zuverlässig ist und wo menschliches Urteil wichtiger ist. Lehrer überprüfen, passen an und genehmigen Endnoten. Die KI übernimmt die zeitaufwändige Analyse. Der Mensch trifft die Ermessensentscheidungen.
    </p>
    <p>
      Dies entspricht dem, was Pearsons Expertengremium empfiehlt: KI als „Kraftverstärker für formative Bewertung" zu nutzen, während sichergestellt wird, dass Pädagogen die Kontrolle behalten.
    </p>

    <h2>Warum praktische Bewertung KI-Abkürzungen widersteht</h2>
    <p>
      Pearsons Forschung fragte Pädagogen, welche Bewertungstypen am anfälligsten für KI-Missbrauch waren. Die Ergebnisse waren nicht überraschend. Essays, Programmieraufgaben und Multiple-Choice-Fragen rangierten als am anfälligsten. Simulationen und spielbasierte Aktivitäten rangierten als am wenigsten anfällig.
    </p>
    <p>
      Das macht Sinn. Man kann ChatGPT auffordern, über Chemie zu schreiben. Man kann es nicht auffordern, Chemie zu machen. Die physische Natur praktischer Arbeit schafft eine Barriere, die textbasierte KI nicht überwinden kann.
    </p>
    <p>
      Für den naturwissenschaftlichen Unterricht sind das eigentlich gute Nachrichten. Die Fächer, die praktische Arbeit erfordern, sind genau die Fächer, bei denen KI-Abkürzungen versagen. Wir müssen nicht gegen die Technologie kämpfen. Wir müssen das betonen, was naturwissenschaftliche Bildung vom Aufsatzschreiben unterscheidet.
    </p>

    <div
      className="bluesky-embed-container"
      style={{ margin: "20px 0", textAlign: "center" }}
    >
      <bsky-embed
        search="Looking through the microscope in our VR science lab!"
        limit="1"
        link-target="_blank"
        custom-styles=".border-slate-300 { border-color: #e1e8ed; border-radius: 12px; max-width: 600px; margin: 0 auto; }"
      ></bsky-embed>
    </div>

    <h2>Das eigentliche Problem</h2>
    <p>
      Amanda Bickerstaff, CEO von AI for Education, identifiziert die Kernbedenken in Pearsons Bericht:
    </p>
    <blockquote style={{ borderLeft: '4px solid #dabeff', paddingLeft: '1rem', margin: '1.5rem 0', fontStyle: 'italic' }}>
      „Der tiefere Grund, warum akademische Integritätsverletzungen gerade so beängstigend sind, ist die Befürchtung, dass Kinder beginnen werden, die Rolle der Bildung, die Rolle des Lernens abzuwerten."
    </blockquote>
    <p>
      Erkennung und Bestrafung werden das nicht beheben. Zu demonstrieren, dass Bildung immer noch wichtig ist, schon. Und der Weg dahin führt über die Bewertung von Dingen, die tatsächlich Lernen erfordern, um sie zu demonstrieren.
    </p>
    <p>
      Wenn wir Schüler nach ihrer Fähigkeit bewerten, eine Titration physisch mit Präzision durchzuführen, gibt es keine Abkürzung. Wenn wir sie danach benoten, wie sie mit unerwarteten Ergebnissen während eines Experiments umgehen, kann KI nicht helfen. Wenn wir ihre Technik, ihr Timing und ihre Sicherheitseinhaltung in Echtzeit evaluieren, wird die Bewertung untrennbar vom Lernen.
    </p>

    <h2>Der Weg nach vorn</h2>
    <p>
      Wir glauben, dass die Lösung für das KI-Bewertungsproblem nicht mehr Überwachung oder strengere Richtlinien ist. Es ist besseres Bewertungsdesign. Bewertungen, die authentische Demonstration von Fähigkeiten erfordern, reichhaltige Beweise des Lernens erfassen und KI nutzen, um menschliches Urteil zu verstärken, anstatt es zu ersetzen.
    </p>
    <p>
      Das bedeutet nicht, schriftliche Bewertungen aufzugeben. Aber es bedeutet, ihre Grenzen anzuerkennen und sie mit Methoden zu ergänzen, die erfassen, was Schreiben nicht kann: prozedurales Wissen, Technik, die Fähigkeit, unter Druck zu arbeiten und sich anzupassen, wenn etwas schiefgeht.
    </p>
    <p>
      Bei WhimsyLabs bauen wir Werkzeuge, um das möglich zu machen. Denn die Zukunft der Bewertung geht nicht darum, Betrüger zu erwischen. Es geht darum, Lernerfahrungen zu gestalten, die es wert sind, ehrlich gemacht zu werden.
    </p>

    <p>
      Interessiert daran, dies in Aktion zu sehen? <a href="/contact">Kontaktieren Sie uns</a>, um zu erfahren, wie WhimsyLabs die praktische naturwissenschaftliche Bewertung an Ihrer Schule verbessern kann.
    </p>

    <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
    <p style={{ fontSize: '0.9rem', color: '#666' }}>
      <strong>Quellen:</strong>
    </p>
    <ul style={{ fontSize: '0.9rem', color: '#666' }}>
      <li>
        <a href="https://plc.pearson.com/en-GB/news-and-insights/assessment-evolved-redefining-formative-assessment-in-a-generative-ai-era" target="_blank" rel="noopener noreferrer">
          Pearson (2025). Assessment Evolved: Redefining Formative Assessment in a Generative AI Era.
        </a>
      </li>
      <li>
        <a href="https://arxiv.org/abs/2303.11156" target="_blank" rel="noopener noreferrer">
          Liang, W. et al. (2023). GPT detectors are biased against non-native English writers. arXiv.
        </a>
      </li>
    </ul>
  </div>
);
