import React from "react";

export const title = "Quand l'IA lit mal 'au moins un' : la notation textuelle échoue";
export const description =
  "Un étudiant du Connecticut a perdu des points parce que l'IA a interprété 'au moins un' comme 'seulement un'. Plus de 150 étudiants ont signé une pétition contre la notation par IA. Voici pourquoi mesurer les actions physiques élimine complètement ce problème.";
export const keywords = [
  "problèmes de notation IA",
  "évaluation basée sur les processus",
  "notation laboratoire virtuel",
  "erreurs d'évaluation IA",
  "notation automatisée des dissertations",
  "laboratoire virtuel",
  "interprétation de texte IA",
  "technologie éducative"
];

export const content = (
  <div>
    <p>
      Liam Roselle, un élève de terminale à Amity Regional High School dans le Connecticut, a reçu un sur trois à deux questions pour un devoir de psychologie AP. Le feedback lui disait qu'il n'avait pas fourni de preuves spécifiques. Il l'avait fait. Le problème, comme il l'a finalement découvert, était que la question demandait "au moins une preuve spécifique et pertinente," et il avait cité plusieurs études. Le système de notation IA a interprété "au moins un" comme "seulement un" et l'a pénalisé pour avoir fait plus que le minimum.
    </p>

    <p>
      Pour récupérer un seul point sur un devoir, Roselle a dû écrire un email d'appel de trois paragraphes citant la formulation exacte de la question et expliquant la sémantique de l'expression "au moins." Son professeur a convenu que l'explication avait du sens et a accordé le point. Mais comme Roselle l'a écrit dans{" "}
      <a
        href="https://ctmirror.org/2026/03/05/my-school-is-grading-me-with-ai-it-got-my-grade-wrong/"
        target="_blank"
        rel="noopener noreferrer"
      >
        CT Mirror
      </a>
      , "La question qui mérite d'être posée est de savoir combien d'étudiants, face à la même erreur, ont simplement accepté la note et sont passés à autre chose."
    </p>

    <p>
      Il n'est pas seul dans son inquiétude. Plus de 150 étudiants d'Amity ont signé une pétition contre la notation par IA dans leur école. Et leurs préoccupations sont étayées par la recherche : une étude présentée à la conférence de l'American Educational Research Association en 2024 a révélé que{" "}
      <a
        href="https://hechingerreport.org/proof-points-ai-essay-grading/"
        target="_blank"
        rel="noopener noreferrer"
      >
        l'IA et les correcteurs humains ne s'accordent exactement que dans environ 40 pour cent des cas
      </a>
      , avec un biais constant contre les écrits de haute qualité. Quand les correcteurs professionnels AP ne sont pas d'accord sur des dissertations, ils font appel à un médiateur. Les systèmes de notation par IA n'offrent pas cette protection par défaut.
    </p>

    <h2>Pourquoi l'IA a-t-elle du mal avec l'évaluation écrite ?</h2>

    <p>
      La mauvaise interprétation de "au moins un" n'est pas un cas limite. Elle révèle une limitation fondamentale de la façon dont les systèmes d'IA traitent le langage naturel. Ces systèmes fonctionnent par correspondance de motifs : ils apprennent à quoi ressemblent typiquement les réponses "correctes" et notent les soumissions en fonction de leur similarité avec ces motifs. Quand un étudiant exprime une compréhension correcte d'une manière inattendue, ou fournit plus que le minimum attendu, le système ne le reconnaît pas.
    </p>

    <p>
      Le langage est intrinsèquement ambigu. Considérez combien de façons un étudiant pourrait correctement décrire le même concept scientifique :
    </p>

    <ul>
      <li>"La solution est devenue rose" vs "L'indicateur a changé de couleur" vs "Un changement de couleur a été observé"</li>
      <li>"Au moins un exemple" pourrait signifier un, deux ou cinq exemples</li>
      <li>"La réaction nécessite de la chaleur" vs "de l'énergie thermique est nécessaire" vs "température élevée"</li>
      <li>Différentes orthographes selon que vous avez appris l'anglais britannique ou américain</li>
    </ul>

    <p>
      Chacune de ces variations exprime la même compréhension scientifique. Un correcteur humain les reconnaît comme équivalentes. Un système d'IA entraîné sur des formulations particulières peut ne pas le faire.
    </p>

    <p>
      La recherche sur la notation automatisée des dissertations a documenté ces échecs de manière extensive. Les systèmes d'IA pénalisent les structures de phrases non conventionnelles même quand le contenu scientifique est exact. Ils récompensent la prose verbeuse et confiante plutôt que les réponses concises et précises. Ils montrent des schémas de biais constants qui désavantagent certains styles d'écriture indépendamment des connaissances démontrées.
    </p>

    <h2>Les coûts cachés des erreurs de notation par IA</h2>

    <p>
      Le cas de Roselle illustre le fardeau caché que la notation par IA impose aux étudiants. Il a réussi à faire appel de sa note, mais cela a nécessité des compétences rédactionnelles académiques, la confiance pour défier un système automatisé, et un professeur prêt à examiner l'appel. Combien d'étudiants manquent d'un ou plusieurs de ces éléments ?
    </p>

    <p>
      Les étudiants les plus susceptibles d'accepter une note IA incorrecte sont souvent ceux qui ont déjà des difficultés académiques. Ils peuvent manquer de confiance pour défier l'autorité, même l'autorité algorithmique. Ils peuvent ne pas avoir les compétences rédactionnelles pour construire un appel persuasif. Ils peuvent avoir appris par expérience que leurs objections sont rejetées. Les systèmes de notation par IA, présentés comme objectifs et efficaces, peuvent systématiquement désavantager précisément les étudiants qui ont le plus besoin de soutien.
    </p>

    <p>
      De plus, la demande FOIA de Roselle a révélé qu'Amity Regional avait acheté cinq produits d'IA pour un total de 19 216,51 dollars, soit plus de 8 000 dollars de plus que le chiffre de 11 000 dollars que le district avait cité publiquement. L'écart soulève des questions sur la transparence et la responsabilité dans l'acquisition de technologie éducative. Quand les districts ne peuvent pas rapporter avec précision quels outils d'IA ils utilisent et à quel coût, une surveillance significative devient impossible.
    </p>

    <h2>Et si nous éliminions complètement l'ambiguïté ?</h2>

    <p>
      Il existe une alternative à forcer les systèmes d'IA à interpréter un texte ambigu : évaluer les actions au lieu des mots. Quand un étudiant effectue un titrage dans un laboratoire virtuel, il n'y a pas d'ambiguïté sur le fait qu'il ait ajouté le réactif goutte à goutte près du point final. Soit il l'a fait, soit il ne l'a pas fait. Le système n'a pas besoin d'analyser sa description ; il observe directement sa technique.
    </p>

    <p>
      C'est le principe derrière l'évaluation basée sur les processus. Au lieu de demander aux étudiants de décrire ce qu'ils feraient et ensuite d'analyser leur langage, vous observez ce qu'ils font réellement et vous le mesurez. La différence est profonde :
    </p>

    <ul>
      <li><strong>Basé sur le texte :</strong> "J'ai pipetté 2,5 millilitres de la solution" doit être interprété. Voulaient-ils dire exactement 2,5 ? Approximativement 2,5 ? Ont-ils décrit l'action qu'ils ont prise ou l'action qu'ils avaient l'intention de prendre ?</li>
      <li><strong>Basé sur les processus :</strong> La pipette virtuelle a enregistré 2,47 mL transférés. Aucune interprétation requise.</li>
    </ul>

    <p>
      Le programme{" "}
      <a
        href="https://www.dreamscapelearn.com/research"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dreamscape Learn
      </a>{" "}
      de l'Université d'État de l'Arizona démontre cette approche à grande échelle. Les étudiants résolvent des problèmes biologiques dans des environnements VR immersifs, et le système les note sur leur cheminement de raisonnement à travers le problème, pas sur des explications écrites de ce qu'ils ont fait. Les premiers résultats montrent que les étudiants dans ces sections basées sur les processus obtiennent de meilleures notes et une meilleure rétention que leurs pairs dans les cours conventionnels.
    </p>

    <h2>La physique n'a pas d'ambiguïté sémantique</h2>

    <p>
      L'avantage fondamental de l'évaluation basée sur les processus est que les actions physiques sont définies. Quand un étudiant incline un bécher, l'angle d'inclinaison est mesurable. Quand il applique de la chaleur, le changement de température suit une physique prévisible. Quand il mesure un volume, la mesure a une valeur spécifique. Il n'y a pas de synonymes pour les actions physiques.
    </p>

    <p>
      C'est pourquoi nous avons construit WhimsyLabs autour d'un moteur physique propriétaire plutôt que d'animations scriptées. Nos simulations suivent les quantités physiques réelles : le volume de liquide dans un conteneur, le timing précis des ajouts, la régularité de la technique. Quand nous évaluons la performance des étudiants, nous comparons leurs actions à la technique correcte, pas leurs descriptions aux phrases attendues.
    </p>

    <p>
      Un étudiant d'Allemagne, du Japon ou d'Espagne effectue le même mouvement de pipetage. Un étudiant qui parle anglais comme langue seconde démontre la même compréhension en agitant un ballon au bon moment. Le langage universel de la procédure scientifique transcende les ambiguïtés qui affectent la notation textuelle par IA.
    </p>

    <h2>Qu'en est-il des compétences de communication écrite ?</h2>

    <p>
      Une question légitime se pose : l'éducation scientifique ne devrait-elle pas également développer des compétences de communication écrite ? La capacité de décrire clairement les procédures scientifiques est précieuse.
    </p>

    <p>
      La réponse est oui, mais avec une distinction importante. La communication écrite est une compétence qui mérite d'être développée, et elle peut être évaluée quand c'est l'objectif explicite. Le problème avec les évaluations écrites notées par IA est qu'elles confondent la compréhension scientifique avec la capacité d'écriture. Un étudiant qui comprend profondément le titrage mais écrit maladroitement est pénalisé non pas pour des conceptions erronées scientifiques mais pour des erreurs linguistiques. Un étudiant qui écrit couramment mais comprend superficiellement peut recevoir des notes plus élevées.
    </p>

    <p>
      L'évaluation basée sur les processus sépare ces préoccupations. Quand vous voulez évaluer la technique scientifique, évaluez la technique directement. Quand vous voulez évaluer la communication scientifique, évaluez la communication explicitement. Ne prétendez pas mesurer l'un tout en mesurant réellement l'autre.
    </p>

    <h2>La vraie promesse de l'IA dans l'évaluation</h2>

    <p>
      Les échecs de la notation textuelle par IA ne signifient pas que l'IA n'a pas de rôle dans l'évaluation éducative. Ils signifient que l'IA devrait être appliquée aux tâches où elle excelle plutôt qu'aux tâches où elle a du mal.
    </p>

    <p>
      L'IA excelle dans la reconnaissance de motifs dans les données structurées, le suivi des séquences procédurales, l'identification d'erreurs techniques spécifiques et l'analyse de grands ensembles de données pour trouver des patterns. Ces capacités sont parfaitement adaptées à l'évaluation basée sur les processus, où les données sont sans ambiguïté et les patterns sont bien définis.
    </p>

    <p>
      Dans WhimsyLabs, notre tuteur IA WhimsyCat utilise les données de processus pour fournir un feedback en temps réel. Quand un étudiant se précipite dans une procédure, WhimsyCat le remarque et suggère de ralentir. Quand un étudiant répète la même erreur plusieurs fois, WhimsyCat explique pourquoi l'approche ne fonctionne pas et offre des alternatives. Ce feedback est possible parce que les données sont précises. WhimsyCat n'essaie pas de deviner si un étudiant a compris quelque chose à partir d'une phrase ambiguë ; il a observé exactement ce que l'étudiant a fait.
    </p>

    <h2>Ce que révèle l'appel de Roselle</h2>

    <p>
      Revenons au cas de Liam Roselle. Son appel réussi lui a demandé d'expliquer, avec des citations de la formulation exacte de la question, pourquoi l'interprétation de l'IA était erronée. Son professeur a noté que "comme les outils de notation IA et les humains peuvent interpréter différemment les questions et les réponses, et sont faillibles," il était content qu'ils aient eu l'occasion d'en discuter.
    </p>

    <p>
      Cette déclaration révèle involontairement le problème central. Quand l'évaluation nécessite l'interprétation du langage, le désaccord est inévitable. Les humains sont en désaccord entre eux. L'IA est en désaccord avec les humains. L'IA est en désaccord avec elle-même quand on lui présente des versions reformulées d'un contenu identique. Le système est instable parce que le langage est instable.
    </p>

    <p>
      Mais une technique de pipetage ne nécessite pas d'interprétation. Un point final de titrage ne nécessite pas d'interprétation. L'angle d'un bécher, le timing d'un ajout, la régularité d'une main : ce sont des faits, pas des interprétations. L'évaluation construite sur des faits plutôt que sur des interprétations produit des résultats cohérents et défendables qui ne nécessitent pas d'appels.
    </p>

    <h2>La voie à suivre</h2>

    <p>
      Le conseil d'administration d'Amity Regional High School devait voter sur le budget de l'année prochaine le 9 mars 2026. Roselle leur avait envoyé des emails quotidiens pendant plus de deux semaines, leur demandant de prendre au sérieux ce que 150 étudiants disaient et ce qu'un étudiant avait dû faire pour récupérer un point qu'il avait déjà gagné.
    </p>

    <p>
      Sa situation reflète un défi plus large auquel l'éducation est confrontée : la pression d'adopter l'IA pour des gains d'efficacité sans considérer adéquatement où l'IA fonctionne réellement bien. L'interprétation de texte est difficile parce que le texte est ambigu. Ce n'est pas une limitation temporaire en attente d'une percée. C'est une propriété fondamentale du langage naturel.
    </p>

    <p>
      La solution n'est pas d'abandonner l'IA mais de la déployer de manière appropriée. L'évaluation basée sur les processus dans les laboratoires virtuels représente un tel déploiement approprié. Quand les étudiants démontrent leur compréhension par l'action plutôt que par la description, l'IA peut les évaluer avec précision, équité et à grande échelle. L'ambiguïté sémantique qui a piégé Roselle disparaît entièrement.
    </p>

    <p>
      L'IA ne peut pas mal lire une technique de pipetage parce qu'il n'y a rien à mal lire. L'action s'est produite correctement ou non. Dans cette clarté réside un meilleur avenir pour l'évaluation éducative.
    </p>

    <>
      <h2>Articles connexes</h2>
      <ul>
        <li>
          <a href="/fr/blog/ai-assessment-crisis-solution">
            L'IA et la crise de l'évaluation : Comment les données de processus changent tout
          </a>
        </li>
        <li>
          <a href="/fr/blog/edtech-critics-right-passive-learning-vs-active-labs">
            Les critiques ont raison : La plupart des EdTech sont inutiles
          </a>
        </li>
        <li>
          <a href="/fr/blog/vr-stem-education-research-pedagogical-scaffolding">
            Une nouvelle recherche VR confirme : La technologie sans pédagogie échoue
          </a>
        </li>
        <li>
          <a href="/fr/blog/whimsycat-ai-tutor-transforming-science-education">
            Découvrez WhimsyCat : Notre innovation IA dans l'éducation scientifique
          </a>
        </li>
      </ul>
    </>

    <div className="references-section">
      <h3>Références</h3>
      <ul className="references-list">
        <li key="ref-1">
          Roselle, L. (2026, 5 mars). My school is grading me with AI. It got my grade wrong.{" "}
          <em>CT Mirror</em>.{" "}
          <a href="https://ctmirror.org/2026/03/05/my-school-is-grading-me-with-ai-it-got-my-grade-wrong/" target="_blank" rel="noopener noreferrer">
            https://ctmirror.org/2026/03/05/my-school-is-grading-me-with-ai-it-got-my-grade-wrong/
          </a>
        </li>
        <li key="ref-2">
          Barshay, J. (2024). AI essay grading: What the research shows.{" "}
          <em>The Hechinger Report</em>.{" "}
          <a href="https://hechingerreport.org/proof-points-ai-essay-grading/" target="_blank" rel="noopener noreferrer">
            https://hechingerreport.org/proof-points-ai-essay-grading/
          </a>
        </li>
        <li key="ref-3">
          Dreamscape Learn. (2024). Research and outcomes at Arizona State University.{" "}
          <a href="https://www.dreamscapelearn.com/research" target="_blank" rel="noopener noreferrer">
            https://www.dreamscapelearn.com/research
          </a>
        </li>
        <li key="ref-4">
          Keep Amity Human. (2026). FOIA documents on AI tools in Amity Regional School District.{" "}
          <a href="https://keepamityhuman.org/foia.html" target="_blank" rel="noopener noreferrer">
            https://keepamityhuman.org/foia.html
          </a>
        </li>
        <li key="ref-5">
          American Educational Research Association. (2024). Research on automated essay scoring reliability and bias.
        </li>
      </ul>
    </div>
  </div>
);
