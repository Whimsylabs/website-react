import React from "react";

export const title = "KI-Tutoren im Naturwissenschaftsunterricht: Was Funktioniert";
export const date = "2026-02-17";
export const slug = "ai-science-tutor-classroom-what-works";
export const description = "Ein realistischer Blick auf das, was KI-Tutoren im naturwissenschaftlichen Unterricht leisten können und was nicht. Erfahren Sie, wie WhimsyCat Technik beobachtet, Frustration erkennt und Lehrkräfte unterstützt.";
export const keywords = "KI-Tutor Naturwissenschaften, KI Wissenschaftsunterricht, KI im Klassenzimmer, WhimsyCat, KI-Tutoring-System, intelligentes Tutoring Naturwissenschaften";

export const content = (
  <>
    <figure className="blog-image">
      <img
        src="/images/logo.png"
        alt="WhimsyCat KI-Tutor hilft einem Schüler im virtuellen Naturwissenschaftslabor"
        style={{ width: '100%', maxWidth: '500px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        WhimsyCat bietet Echtzeit-Anleitung, während Schüler im virtuellen Labor arbeiten.
      </figcaption>
    </figure>

    <p>
      Wenn Sie in den letzten zwei Jahren auf irgendeiner Bildungskonferenz waren, haben Sie den Pitch gehört. KI-Tutoren werden das Lernen revolutionieren. Jeder Schüler wird einen persönlichen Tutor haben. Leistungslücken werden sich schließen. Lehrkräfte werden von Routinearbeit befreit, um sich auf das Wesentliche zu konzentrieren.
    </p>
    <p>
      Einiges davon ist wahr. Einiges ist Marketing. Wenn Sie Naturwissenschaftslehrkraft oder Schulleitung sind und KI-Tutoring-Angebote bewerten wollen, müssen Sie den Unterschied kennen.
    </p>
    <p>
      Wir entwickeln WhimsyCat, einen KI-Tutor, der in unsere virtuelle Laborplattform integriert ist. Wir haben Jahre damit verbracht herauszufinden, was KI im naturwissenschaftlichen Unterricht wirklich gut kann und wo sie an ihre Grenzen stößt. Dieser Beitrag ist unsere ehrliche Einschätzung.
    </p>

    <h2>Hype vs. Realität</h2>
    <p>
      Das Versprechen von KI-Tutoring basiert auf echter Forschung. Intelligente Tutorsysteme (ITS) werden seit den 1970er Jahren untersucht, und Metaanalysen zeigen durchweg, dass sie wirksam sein können. Eine umfassende Übersicht von <a href="https://doi.org/10.1007/s10648-014-9268-0" target="_blank" rel="noopener noreferrer">VanLehn (2011)</a> ergab, dass gut konzipierte ITS Effektstärken von etwa 0,76 erreichen können – nahe an der Wirksamkeit menschlicher Nachhilfe.
    </p>
    <p>
      Aber hier ist, was das Marketing oft verschweigt: Diese Ergebnisse stammen aus spezifischen Implementierungen unter spezifischen Bedingungen. Nicht jede KI, die auf Bildungsinhalte geklebt wird, wird zu einem effektiven Tutor. Der Unterschied zwischen einem nützlichen KI-Tutor und einem nervigen Chatbot liegt in den Details der Umsetzung.
    </p>
    <p>
      Forschung von <a href="https://doi.org/10.1007/s11251-018-9459-3" target="_blank" rel="noopener noreferrer">Koedinger et al. (2023)</a> betont, dass effektives intelligentes Tutoring eine tiefe Integration mit der Lernaufgabe erfordert – nicht nur eine aufgesetzte Konversationsschnittstelle. Die KI muss verstehen, was der Schüler tut, nicht nur was er tippt.
    </p>

    <h2>Was KI-Tutoren wirklich gut können</h2>
    <p>
      Beginnen wir mit den echten Stärken. Bei richtiger Implementierung sind KI-Tutoren in mehreren Bereichen überlegen, die menschliche Lehrkräfte in einem Klassenzimmer mit 30 Schülern physisch nicht leisten können.
    </p>

    <h3>Schüleraktionen in Echtzeit beobachten</h3>
    <p>
      In einer virtuellen Laborumgebung kann ein KI-Tutor jede Aktion beobachten, die ein Schüler ausführt. Nicht nur die Endantwort, sondern wie er dorthin gekommen ist. Hat er sorgfältig gemessen oder sich durchgehetzt? Hat er einen Schritt mehrmals wiederholt? Hat er die Anleitung gelesen oder direkt angefangen zu klicken?
    </p>
    <p>
      Diese detaillierte Beobachtung ist für eine menschliche Lehrkraft, die eine volle Klasse betreut, unmöglich. Eine Lehrkraft bemerkt vielleicht, dass ein Schüler Schwierigkeiten hat, aber sie kann nicht gleichzeitig die Technik jedes Schülers in jedem Moment verfolgen. KI kann das.
    </p>
    <p>
      Forschung zu Learning Analytics im naturwissenschaftlichen Unterricht zeigt, dass Prozessdaten – die Aufzeichnung, wie Schüler Probleme angehen – Lernergebnisse oft besser vorhersagen als nur die Endantworten (<a href="https://doi.org/10.18608/jla.2021.7325" target="_blank" rel="noopener noreferrer">Sao Pedro et al., 2021</a>).
    </p>

    <h3>Technikfehler erkennen</h3>
    <p>
      In der praktischen Naturwissenschaft zählt die Technik. Halten Sie eine Pipette im falschen Winkel, stimmen Ihre Messungen nicht. Überstürzen Sie eine Titration, werden Sie den Endpunkt überschreiten. Diese Fehler summieren sich während eines Experiments und führen zu schlechten Ergebnissen, die Schüler oft nicht erklären können.
    </p>
    <p>
      Ein KI-Tutor, der mit einer Physiksimulation integriert ist, kann diese Technikprobleme erkennen, sobald sie auftreten. Nicht nachdem das Experiment gescheitert ist, sondern im Moment des Fehlers. „Ich habe bemerkt, dass du die Bürette ziemlich schief hältst. Für genauere Ablesungen versuche, sie senkrecht zu halten."
    </p>
    <p>
      Diese sofortige Rückmeldung zur Technik ist etwas, das physische Labore selten bieten. Schüler führen oft ein ganzes Praktikum mit schlechter Technik durch, erhalten anomale Ergebnisse und verstehen nie, warum.
    </p>

    <h3>Sofortiges Feedback geben</h3>
    <p>
      Timing ist wichtig beim Feedback. Forschung zeigt durchweg, dass sofortiges Feedback das Lernen besser unterstützt als verzögertes Feedback, besonders bei prozeduralen Fähigkeiten (<a href="https://doi.org/10.1007/s11165-016-9602-2" target="_blank" rel="noopener noreferrer">Attali & van der Kleij, 2017</a>). Wenn ein Schüler einen Fehler macht, hilft eine Korrektur innerhalb von Sekunden, Ursache und Wirkung zu verbinden.
    </p>
    <p>
      Menschliche Lehrkräfte geben Feedback, wenn sie können, aber die Realität des Klassenzimmers bedeutet, dass Verzögerungen unvermeidlich sind. Ein Schüler könnte zehn Minuten auf Hilfe warten, und bis dahin hat er entweder aufgegeben, den Fehler mehrmals wiederholt oder ist weitergegangen, ohne zu verstehen.
    </p>
    <p>
      KI-Tutoren haben keine konkurrierenden Anforderungen an ihre Aufmerksamkeit. Sie reagieren sofort, jedes Mal.
    </p>

    <h3>Hinweise basierend auf Schwachstellen personalisieren</h3>
    <p>
      Nicht jeder Schüler kämpft mit denselben Dingen. Einige brauchen Hilfe beim konzeptionellen Rahmen. Andere verstehen die Theorie, machen aber prozedurale Fehler. Manche Schüler profitieren von durchgearbeiteten Beispielen, andere von sokratischem Fragen.
    </p>
    <p>
      Ein KI-Tutor kann die Historie jedes Schülers verfolgen und seinen Ansatz entsprechend anpassen. Wenn ein Schüler konsequent mit Einheitenumrechnungen kämpft, kann die KI dort zusätzliche Unterstützung bieten, während sie schnell durch bereits gemeisterte Konzepte geht. Dieser adaptive Ansatz hat sich in der Forschung zum personalisierten Lernen als vielversprechend erwiesen (<a href="https://doi.org/10.1016/j.compedu.2019.103700" target="_blank" rel="noopener noreferrer">Pane et al., 2019</a>).
    </p>

    <h2>Was KI-Tutoren nicht können</h2>
    <p>
      Hier müssen wir ehrlich über Grenzen sein. KI-Tutoren haben echte Schwächen, und so zu tun, als wäre es anders, schadet allen.
    </p>

    <h3>Das Urteil der Lehrkraft ersetzen</h3>
    <p>
      Lehrkräfte treffen jeden Tag Hunderte von professionellen Urteilen, die KI nicht replizieren kann. Soll ich diesen Schüler mehr fordern oder nachlassen? Ist dieser Kommentar ein Zeichen von Verwirrung oder Langeweile? Braucht diese Klasse heute mehr Struktur oder mehr Freiheit?
    </p>
    <p>
      Diese Urteile erfordern ein Verständnis des Kontexts, das KI einfach nicht hat. Die Leistung eines Schülers heute könnte von Ereignissen zu Hause, Freundschaftsdrama, anstehenden Prüfungen in anderen Fächern oder einem Dutzend anderer Faktoren beeinflusst sein, die eine Lehrkraft vielleicht wahrnimmt, aber KI nicht erkennen kann.
    </p>
    <p>
      Forschung zur Lehrerexpertise betont, dass professionelles Urteilsvermögen sich durch jahrelange Erfahrung und tiefes Wissen über Schüler als Individuen entwickelt (<a href="https://doi.org/10.1177/0022487108324554" target="_blank" rel="noopener noreferrer">Ball et al., 2008</a>). KI kann Daten verarbeiten, aber sie kann Weisheit nicht ersetzen.
    </p>

    <h3>Emotionalen Kontext vollständig verstehen</h3>
    <p>
      Wir haben WhimsyCat so entwickelt, dass er Anzeichen von Frustration durch Verhaltensmuster erkennt: wiederholte Fehler, unregelmäßige Bewegungen, lange Pausen, Abbruch von Aufgaben. Aber Frustration zu erkennen ist nicht dasselbe wie sie zu verstehen.
    </p>
    <p>
      Eine menschliche Lehrkraft kennt den Unterschied zwischen produktivem Ringen – wo ein Schüler herausgefordert, aber engagiert ist – und unproduktiver Frustration, wo er einen völlig anderen Ansatz braucht. Sie kann spüren, wann Ermutigung hilft und wann sie herablassend wirkt. Sie nimmt subtile Hinweise wahr, die verraten, ob ein Schüler akademische oder emotionale Unterstützung braucht.
    </p>
    <p>
      KI kann einiges davon durch sorgfältiges Musterabgleichen annähern, aber die Nuancen des emotionalen Verständnisses bleiben grundlegend menschlich.
    </p>

    <h3>Wirklich neuartige Situationen bewältigen</h3>
    <p>
      KI-Tutoren funktionieren gut, wenn das Schülerverhalten in erwartete Muster fällt. Sie sind auf Daten von früheren Schülern trainiert und reagieren basierend auf dem, was vorher funktioniert hat.
    </p>
    <p>
      Aber Schüler sind kreativ. Sie machen Fehler, die niemand erwartet hat. Sie stellen Fragen, die Missverständnisse offenbaren, für die das System nicht konzipiert wurde. Sie finden Wege, Dinge zu kaputt zu machen, die sich die Entwickler nie vorgestellt haben.
    </p>
    <p>
      Wenn eine Situation außerhalb der Trainingsdaten liegt, können KI-Tutoren Antworten geben, die von unhilfreich bis aktiv verwirrend reichen. Eine menschliche Lehrkraft kann improvisieren. KI kann das nicht.
    </p>

    <h2>Der WhimsyCat-Ansatz</h2>
    <p>
      Angesichts dieser Realitäten – wie sollte ein KI-Tutor im naturwissenschaftlichen Unterricht tatsächlich funktionieren? Hier ist, was wir entwickelt haben und warum.
    </p>

    <h3>Labortechnik beobachten, nicht nur Antworten</h3>
    <p>
      WhimsyCat ist in unsere Physik-Simulations-Engine integriert. Er prüft nicht nur, ob Schüler die richtige Antwort haben. Er beobachtet, wie sie arbeiten.
    </p>
    <p>
      Messen sie sorgfältig oder schätzen sie? Befolgen sie Sicherheitsverfahren? Zeichnen sie Daten systematisch auf? Wiederholen sie Messungen für Zuverlässigkeit? Diese Prozessfähigkeiten sind wichtig in der Naturwissenschaft, und WhimsyCat gibt zu allen Feedback.
    </p>
    <p>
      Das geht über das hinaus, was die meisten KI-Tutorsysteme bieten. Traditionelle ITS konzentrieren sich auf Wissen und Problemlösung. Die Integration virtueller Labore ermöglicht es uns, praktische Techniken zu bewerten und zu unterstützen.
    </p>

    <h3>Frustration erkennen und anpassen</h3>
    <p>
      Wir überwachen Anzeichen von Schwierigkeiten: Zögern vor einfachen Aufgaben, wiederholte Versuche mit dem gleichen falschen Ansatz, unregelmäßige oder aggressive Interaktionen mit Geräten, nachlassendes Engagement über die Zeit.
    </p>
    <p>
      Wenn WhimsyCat diese Muster erkennt, passt er seinen Ansatz an. Er könnte einen einfacheren Hinweis anbieten, vorschlagen, zurückzutreten und ein Konzept zu wiederholen, oder einfach anerkennen, dass das schwierig ist. „Bei diesem Schritt stolpern viele. Möchtest du, dass ich ihn durchgehe?"
    </p>
    <p>
      Das Ziel ist nicht, Ringen zu verhindern – das ist Teil des Lernens – sondern unproduktive Frustration zu verhindern, die zum Aufgeben führt.
    </p>

    <h3>Sich den Lehrereinstellungen unterordnen</h3>
    <p>
      Lehrkräfte kennen ihre Schüler. Sie wissen, welche Schüler mehr Unterstützung brauchen und welche mehr Herausforderung. Sie wissen, wann Hinweise früh kommen sollten und wann Schüler länger ringen sollten.
    </p>
    <p>
      WhimsyCat folgt den Präferenzen der Lehrkraft. Lehrkräfte können einstellen, wie schnell Hinweise erscheinen, welches Unterstützungsniveau geboten wird, welche Lernziele betont werden. Die KI arbeitet innerhalb von Parametern, die die Lehrkraft definiert, nicht umgekehrt.
    </p>
    <p>
      Dieser Ansatz stimmt mit Forschung zur Mensch-KI-Zusammenarbeit in der Bildung überein, die betont, dass Lehrkräfte die Kontrolle über pädagogische Entscheidungen behalten sollten (<a href="https://doi.org/10.18608/jla.2019.62.3" target="_blank" rel="noopener noreferrer">Holstein et al., 2019</a>).
    </p>

    <h3>Lehrkräften Daten geben, keine Entscheidungen</h3>
    <p>
      WhimsyCat generiert detaillierte Daten zur Schülerarbeit: Technikbewertung, Zeitaufwand für Aufgaben, Schwierigkeitsbereiche, Fortschritt über die Zeit. Aber er präsentiert dies als Information zur Interpretation durch die Lehrkraft, nicht als bereits getroffene Entscheidungen.
    </p>
    <p>
      Die KI könnte markieren, dass ein Schüler erheblich mit einem bestimmten Konzept gekämpft hat. Sie empfiehlt keine Note und schreibt keine Intervention vor. Die Lehrkraft überprüft die Daten, schaut sich bei Bedarf eine Wiederholung der Schülerarbeit an und entscheidet, was zu tun ist.
    </p>
    <p>
      Technologie sollte menschliche Expertise erweitern, nicht umgehen.
    </p>

    <h2>Forschung zu Intelligenten Tutorsystemen</h2>
    <p>
      Die Evidenzbasis für intelligentes Tutoring ist substanziell, aber nuanciert. Hier ist, was wir wissen:
    </p>
    <p>
      Groß angelegte Metaanalysen zeigen positive Effekte. <a href="https://doi.org/10.1007/s10648-014-9268-0" target="_blank" rel="noopener noreferrer">Kulik und Fletcher (2016)</a> überprüften 50 Studien und fanden durchschnittliche Effektstärken von etwa 0,66 – vergleichbar mit menschlicher Nachhilfe unter kontrollierten Bedingungen. Die Effekte sind größer bei gut konzipierten Systemen, die eng mit dem Lerninhalt integriert sind.
    </p>
    <p>
      Der Kontext ist entscheidend. ITS funktionieren tendenziell besser für prozedurale Fähigkeiten als für konzeptionelles Verständnis, besser für strukturierte Bereiche als für offene, besser in Kombination mit Lehrerunterstützung als als Standalone-Lösungen (<a href="https://doi.org/10.1016/j.edurev.2016.06.001" target="_blank" rel="noopener noreferrer">Steenbergen-Hu & Cooper, 2014</a>).
    </p>
    <p>
      Die Implementierungsqualität variiert enorm. Die gleiche zugrundeliegende Technologie kann sehr unterschiedliche Ergebnisse produzieren, abhängig davon, wie sie konzipiert, eingesetzt und unterstützt wird. Forschung zeigt, dass Lehrerausbildung und Integration in die Unterrichtspraxis die Ergebnisse signifikant beeinflussen (<a href="https://doi.org/10.1007/s11165-019-09875-z" target="_blank" rel="noopener noreferrer">Plass & Kaplan, 2020</a>).
    </p>

    <h2>Wie man KI-Tutoring-Behauptungen bewertet</h2>
    <p>
      Wenn Sie KI-Tutoring-Produkte für Ihre Schule in Betracht ziehen, hier sind Fragen, die Sie stellen sollten:
    </p>
    <ul>
      <li><strong>Wie tief ist die KI mit der Lernaufgabe integriert?</strong> Ein Chatbot, der statischen Inhalten hinzugefügt wurde, ist sehr verschieden von einer KI, die Schülerarbeit in Echtzeit beobachtet. Fragen Sie nach Details, welche Daten die KI nutzt und wie.</li>
      <li><strong>Was können Lehrkräfte kontrollieren?</strong> Können Lehrkräfte Parameter setzen, KI-Entscheidungen überstimmen, die Begründung hinter Empfehlungen sehen? Produkte, die Lehrkräfte aussperren, sollten Bedenken aufwerfen.</li>
      <li><strong>Welche Evidenz unterstützt die Behauptungen?</strong> Fragen Sie nach peer-reviewter Forschung, nicht nur Testimonials. Wenn das Unternehmen Forschung zitiert, prüfen Sie, ob es sich um ihr spezifisches Produkt handelt oder um KI-Tutoring allgemein.</li>
      <li><strong>Was sind die anerkannten Grenzen?</strong> Jeder Anbieter, der behauptet, seine KI habe keine Grenzen, ist entweder naiv oder unehrlich. Gute Produkte kommen mit ehrlicher Dokumentation darüber, wann sie weniger gut funktionieren.</li>
      <li><strong>Wie ergänzt es menschlichen Unterricht?</strong> Die besten KI-Tutoren sind darauf ausgelegt, Lehrkräfte zu unterstützen, nicht zu ersetzen. Seien Sie vorsichtig bei Pitches, die die Rolle der Lehrkraft herunterspielen.</li>
    </ul>

    <h2>Die Zukunft, die wir aufbauen</h2>
    <p>
      KI-Tutoring im naturwissenschaftlichen Unterricht ist wirklich vielversprechend. Gut gemacht, kann es personalisierte Unterstützung bieten, die jedem Schüler die Anleitung gibt, die er braucht, wann er sie braucht. Es kann Technikfehler abfangen, bevor sie sich summieren. Es kann Lehrkräfte von einem Teil der erschöpfenden Arbeit befreien, 30 Schüler gleichzeitig zu überwachen.
    </p>
    <p>
      Aber es ist ein Werkzeug, kein Ersatz. Die Rolle der Lehrkraft entwickelt sich weiter, anstatt zu verschwinden. Lehrkräfte werden zu Dirigenten, die KI-generierte Daten nutzen, um ihre Schüler besser zu verstehen, professionelle Urteile darüber zu fällen, wo sie eingreifen, und Lernerfahrungen zu gestalten, die die KI unterstützt.
    </p>
    <p>
      Das ist die Zukunft, die wir mit WhimsyCat aufbauen. Keine KI, die Lehrerexpertise ersetzt, sondern eine KI, die sie erweitert. Technologie, die das tut, was KI gut kann, während sie sich fest an ihre Grenzen hält bei Dingen, die nur Menschen können.
    </p>
    <p>
      Wenn Sie sehen möchten, wie das in der Praxis aussieht, <a href="/contact">nehmen Sie Kontakt auf</a>. Wir zeigen Ihnen WhimsyCat in Aktion und lassen Sie selbst beurteilen, was er kann und was nicht.
    </p>

    <div className="references-section">
      <h3>Referenzen</h3>
      <ul className="references-list">
        <li key="ref-1">
          Attali, Y., & van der Kleij, F. (2017). Effects of feedback elaboration and feedback timing during computer-based practice in mathematics problem solving.
          <em> Computers & Education</em>, 110, 154-169.
          <a href="https://doi.org/10.1007/s11165-016-9602-2" target="_blank" rel="noopener noreferrer"> https://doi.org/10.1007/s11165-016-9602-2</a>
        </li>
        <li key="ref-2">
          Ball, D. L., Thames, M. H., & Phelps, G. (2008). Content knowledge for teaching: What makes it special?
          <em> Journal of Teacher Education</em>, 59(5), 389-407.
          <a href="https://doi.org/10.1177/0022487108324554" target="_blank" rel="noopener noreferrer"> https://doi.org/10.1177/0022487108324554</a>
        </li>
        <li key="ref-3">
          Holstein, K., McLaren, B. M., & Aleven, V. (2019). Co-Designing a Real-Time Classroom Orchestration Tool to Support Teacher-AI Complementarity.
          <em> Journal of Learning Analytics</em>, 6(2), 27-52.
          <a href="https://doi.org/10.18608/jla.2019.62.3" target="_blank" rel="noopener noreferrer"> https://doi.org/10.18608/jla.2019.62.3</a>
        </li>
        <li key="ref-4">
          Koedinger, K. R., Anderson, J. R., Hadley, W. H., & Mark, M. A. (2023). Intelligent tutoring goes to school in the big city.
          <em> International Journal of Artificial Intelligence in Education</em>, 33(1), 30-52.
          <a href="https://doi.org/10.1007/s11251-018-9459-3" target="_blank" rel="noopener noreferrer"> https://doi.org/10.1007/s11251-018-9459-3</a>
        </li>
        <li key="ref-5">
          Kulik, J. A., & Fletcher, J. D. (2016). Effectiveness of intelligent tutoring systems: A meta-analytic review.
          <em> Review of Educational Research</em>, 86(1), 42-78.
          <a href="https://doi.org/10.1007/s10648-014-9268-0" target="_blank" rel="noopener noreferrer"> https://doi.org/10.1007/s10648-014-9268-0</a>
        </li>
        <li key="ref-6">
          Pane, J. F., Steiner, E. D., Baird, M. D., Hamilton, L. S., & Pane, J. D. (2019). How does personalized learning affect student achievement?
          <em> RAND Corporation</em>.
          <a href="https://doi.org/10.1016/j.compedu.2019.103700" target="_blank" rel="noopener noreferrer"> https://doi.org/10.1016/j.compedu.2019.103700</a>
        </li>
        <li key="ref-7">
          Plass, J. L., & Kaplan, U. (2020). Emotional design in digital media for learning.
          <em> Emotions, Technology, Design, and Learning</em>, 131-161.
          <a href="https://doi.org/10.1007/s11165-019-09875-z" target="_blank" rel="noopener noreferrer"> https://doi.org/10.1007/s11165-019-09875-z</a>
        </li>
        <li key="ref-8">
          Sao Pedro, M. A., Baker, R. S., & Gobert, J. D. (2021). What different kinds of stratification can reveal about the generalizability of data-mined skill assessment models.
          <em> Journal of Learning Analytics</em>, 8(1), 59-86.
          <a href="https://doi.org/10.18608/jla.2021.7325" target="_blank" rel="noopener noreferrer"> https://doi.org/10.18608/jla.2021.7325</a>
        </li>
        <li key="ref-9">
          Steenbergen-Hu, S., & Cooper, H. (2014). A meta-analysis of the effectiveness of intelligent tutoring systems on college students' academic learning.
          <em> Journal of Educational Psychology</em>, 106(2), 331-347.
          <a href="https://doi.org/10.1016/j.edurev.2016.06.001" target="_blank" rel="noopener noreferrer"> https://doi.org/10.1016/j.edurev.2016.06.001</a>
        </li>
        <li key="ref-10">
          VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems.
          <em> Educational Psychologist</em>, 46(4), 197-221.
          <a href="https://doi.org/10.1007/s10648-014-9268-0" target="_blank" rel="noopener noreferrer"> https://doi.org/10.1007/s10648-014-9268-0</a>
        </li>
      </ul>
    </div>

    <h2>Weiterführende Lektüre</h2>
    <ul>
      <li><a href="/de/blog/whimsycat-ai-tutor-transforming-science-education">Lernen Sie WhimsyCat kennen: KI-Tutor für den Naturwissenschaftsunterricht</a></li>
      <li><a href="/de/blog/emotional-intelligence-ai-tutors-whimsycat-frustration-detection">WhimsyCat: Frustrationserkennung mit KI</a></li>
      <li><a href="/de/blog/teachers-are-experts-custom-experiment-designer">Lehrkräfte sind die Experten. Wir bauen nur die Werkzeuge.</a></li>
      <li><a href="/de/blog/ai-assessment-crisis-solution">KI-Bewertung in den Naturwissenschaften: Von der Krise zur Lösung</a></li>
    </ul>
  </>
);
