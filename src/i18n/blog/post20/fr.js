// French - Post 20: AI Assessment
import React from "react";

export const title = "Détection IA inefficace : L'évaluation par processus fonctionne";
export const description = "82% des éducateurs craignent la triche par IA, mais les outils de détection échouent. L'évaluation pratique basée sur les processus offre une meilleure voie.";
export const keywords = [
  "évaluation IA",
  "évaluation formative IA",
  "détection IA éducation",
  "recherche évaluation Pearson",
  "notation laboratoire virtuel",
  "évaluation basée processus",
  "évaluation résistante IA",
  "éducation scientifique IA",
  "évaluation pratique",
  "notation IA enseignants"
];

export const content = (
  <div>
    <figure className="blog-image">
      <img
        src="/images/potato.jpg"
        alt="Étudiant effectuant une évaluation pratique dans un laboratoire virtuel, dans cet exemple l'étudiant coupe une pomme de terre pour des expériences de microbiologie"
        style={{ width: '100%', maxWidth: '700px', margin: '0 auto 1.5rem', display: 'block', borderRadius: '8px' }}
      />
      <figcaption style={{ textAlign: 'center', fontStyle: 'italic', color: '#666', marginBottom: '1.5rem' }}>
        L'évaluation basée sur les processus capture ce que les étudiants font réellement, pas seulement ce qu'ils soumettent
      </figcaption>
    </figure>

    <p>
      En décembre 2025, Pearson a publié une découverte qui n'a surpris personne dans l'éducation : <a href="https://plc.pearson.com/en-GB/news-and-insights/assessment-evolved-redefining-formative-assessment-in-a-generative-ai-era" target="_blank" rel="noopener noreferrer">82% des éducateurs s'inquiètent que les étudiants utilisent la GenAI pour compléter leurs devoirs</a>. La réponse institutionnelle a été prévisible : outils de détection, logiciels de surveillance et politiques traitant l'IA comme quelque chose à attraper et punir.
    </p>
    <p>
      Deux ans après l'utilisation généralisée de ChatGPT, nous pouvons voir à quel point cela fonctionne. Les outils de détection produisent des faux positifs qui détruisent la confiance avec les étudiants. Les politiques diffèrent énormément entre les départements, sans parler des institutions. Les étudiants, qui utilisent l'IA à des taux bien supérieurs à ce que les éducateurs estiment, sont simplement devenus meilleurs pour le cacher.
    </p>
    <p>
      Cependant, la recherche de Pearson pointe vers quelque chose de plus fondamental. Le risque n'est pas vraiment la triche. Le risque est que les étudiants sautent le travail cognitif qui fait que l'apprentissage se produit. Quand un étudiant fait écrire son rapport de laboratoire par ChatGPT, il n'a pas seulement triché sur un devoir. Il a manqué la réflexion que le devoir devait produire.
    </p>
    <p>
      Chez WhimsyLabs, nous avons abordé cela différemment. Plutôt que de demander comment détecter l'utilisation de l'IA, nous avons demandé comment concevoir des évaluations où l'IA ne peut tout simplement pas aider.
    </p>

    <h2>Pourquoi la détection échoue</h2>
    <p>
      Les outils de détection d'IA prétendent identifier le texte généré par machine avec une grande précision. La réalité est plus compliquée. Ces outils peinent à distinguer l'écriture IA de l'écriture humaine, surtout à mesure que les étudiants deviennent plus sophistiqués avec les prompts. Ils produisent aussi des faux positifs, signalant parfois des travaux que les étudiants ont vraiment écrits eux-mêmes. Pour un étudiant faussement accusé de triche par IA, les dommages à sa relation avec l'institution peuvent être permanents.
    </p>
    <p>
      Kane Murdoch, qui gère les plaintes et les fautes à l'Université Macquarie, le dit bien dans le rapport de Pearson : « Le problème avec les détecteurs est qu'ils ne génèrent aucune preuve... Une fois que quelqu'un voit ce nombre fourni par le détecteur, il sera biaisé tout au long du processus suivant. »
    </p>
    <p>
      Au-delà des problèmes de précision, la détection crée une dynamique adversaire. Elle suppose que les étudiants trichent jusqu'à preuve du contraire. Elle consomme du temps et de l'énergie qui pourraient être consacrés à l'enseignement réel. Et elle ne fait rien pour résoudre le problème sous-jacent de savoir si les étudiants apprennent réellement.
    </p>

    <h2>Évaluer le processus plutôt que le produit</h2>
    <p>
      Envisagez d'évaluer comment les étudiants travaillent plutôt que seulement ce qu'ils produisent.
    </p>
    <p>
      C'est l'approche que nous avons intégrée dans WhimsyLabs. Nos laboratoires virtuels ne permettent pas seulement aux étudiants de réaliser des expériences. Ils capturent des données détaillées sur chaque action : avec quelle précision les étudiants pipettent, s'ils détectent correctement les points d'équivalence, comment ils manipulent l'équipement, s'ils suivent les protocoles de sécurité.
    </p>
    <p>
      Ces données permettent quelque chose que l'évaluation traditionnelle ne peut pas faire : évaluer directement la compétence procédurale. Nous ne demandons pas aux étudiants de décrire comment ils effectueraient un titrage. Nous les regardons le faire. Nous mesurons leur précision. Nous voyons s'ils retirent les bulles d'air de la burette. Nous savons s'ils dépassent le point d'équivalence.
    </p>
    <p>
      ChatGPT ne peut pas effectuer un titrage virtuel pour un étudiant. Il n'y a rien à détecter parce qu'il n'y a rien à falsifier.
    </p>

    <h2>Ce que nous mesurons</h2>
    <p>
      Quand un étudiant termine une expérience virtuelle, nous n'enregistrons pas seulement sa réponse finale. Nous capturons des preuves sur plusieurs dimensions :
    </p>
    <ul>
      <li><strong>Précision :</strong> Les mesures étaient-elles cohérentes entre les essais ? (±0,02 mL ou ±0,5 mL ?)</li>
      <li><strong>Technique :</strong> Contrôle fluide du robinet ? Agitation correcte du ballon ?</li>
      <li><strong>Timing :</strong> À quelle vitesse ont-ils reconnu le point d'équivalence ? Combien de temps a pris la préparation ?</li>
      <li><strong>Sécurité :</strong> EPI approprié ? Manipulation et élimination correctes des produits chimiques ?</li>
      <li><strong>Résolution de problèmes :</strong> Quand les résultats étaient inattendus, comment ont-ils réagi ?</li>
    </ul>
    <p>
      Pearson appelle cela « des formes plus riches de preuves ». Les évaluations traditionnelles ne peuvent tout simplement pas capturer ce type de données. Plus important encore pour le problème de l'IA, ces preuves exigent que l'étudiant ait réellement effectué le travail.
    </p>

    <h2>L'IA qui aide les enseignants, pas les étudiants à tricher</h2>
    <p>
      Notre solution au problème d'évaluation par IA implique effectivement l'IA, mais dans un rôle différent. Au lieu d'aider les étudiants à sauter l'apprentissage, nous utilisons l'IA pour aider les enseignants à évaluer l'apprentissage.
    </p>
    <p>
      Quand un étudiant termine une expérience virtuelle, notre système analyse son journal d'actions et ses données expérimentales. Il suggère des notes sur cinq dimensions : procédure expérimentale, collecte de données, calculs, sécurité au laboratoire et communication scientifique. Chaque suggestion inclut un niveau de confiance (75-98%), montrant aux enseignants où l'évaluation par IA est fiable et où le jugement humain compte davantage. Les enseignants examinent, ajustent et approuvent les notes finales. L'IA gère l'analyse chronophage. L'humain prend les décisions de jugement.
    </p>
    <p>
      Cela s'aligne avec ce que le panel d'experts de Pearson recommande : utiliser l'IA comme un « multiplicateur de force pour l'évaluation formative » tout en s'assurant que les éducateurs restent aux commandes.
    </p>

    <h2>Pourquoi l'évaluation pratique résiste aux raccourcis de l'IA</h2>
    <p>
      La recherche de Pearson a demandé aux éducateurs quels types d'évaluation étaient les plus vulnérables à l'utilisation abusive de l'IA. Les résultats n'étaient pas surprenants. Les dissertations, les devoirs de programmation et les questions à choix multiples ont été classés comme les plus vulnérables. Les simulations et les activités basées sur le jeu ont été classées comme les moins vulnérables.
    </p>
    <p>
      Cela a du sens. Vous pouvez demander à ChatGPT d'écrire sur la chimie. Vous ne pouvez pas lui demander de faire de la chimie. La nature physique du travail pratique crée une barrière que l'IA textuelle ne peut pas franchir.
    </p>
    <p>
      Pour l'enseignement des sciences, c'est en fait une bonne nouvelle. Les matières qui nécessitent un travail pratique sont exactement celles où les raccourcis de l'IA échouent. Nous n'avons pas besoin de combattre la technologie. Nous devons nous appuyer sur ce qui différencie l'enseignement des sciences de la rédaction de dissertations.
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

    <h2>Le vrai problème</h2>
    <p>
      Amanda Bickerstaff, PDG d'AI for Education, identifie la préoccupation centrale dans le rapport de Pearson :
    </p>
    <blockquote style={{ borderLeft: '4px solid #dabeff', paddingLeft: '1rem', margin: '1.5rem 0', fontStyle: 'italic' }}>
      « La raison plus profonde pour laquelle les violations de l'intégrité académique sont si effrayantes en ce moment est la peur que les enfants commencent à dévaloriser le rôle de l'éducation, le rôle de l'apprentissage. »
    </blockquote>
    <p>
      La détection et la punition ne résoudront pas cela. Démontrer que l'éducation compte toujours le fera. Et la façon de le faire est d'évaluer les choses qui nécessitent réellement un apprentissage pour être démontrées.
    </p>
    <p>
      Quand nous évaluons les étudiants sur leur capacité à effectuer physiquement un titrage avec précision, il n'y a pas de raccourci. Quand nous les notons sur la façon dont ils gèrent des résultats inattendus pendant une expérience, l'IA ne peut pas aider. Quand nous évaluons leur technique, leur timing et leur conformité à la sécurité en temps réel, l'évaluation devient inséparable de l'apprentissage.
    </p>

    <h2>Aller de l'avant</h2>
    <p>
      Nous pensons que la solution au problème d'évaluation par IA n'est pas plus de surveillance ni des politiques plus strictes. C'est une meilleure conception de l'évaluation. Des évaluations qui exigent une démonstration authentique des compétences, capturent des preuves riches de l'apprentissage et utilisent l'IA pour améliorer le jugement humain plutôt que le remplacer.
    </p>
    <p>
      Cela ne signifie pas abandonner les évaluations écrites. Mais cela signifie reconnaître leurs limites et les compléter par des méthodes qui capturent ce que l'écriture ne peut pas : la connaissance procédurale, la technique, la capacité à performer sous pression et à s'adapter quand les choses tournent mal.
    </p>
    <p>
      Chez WhimsyLabs, nous construisons des outils pour rendre cela possible. Parce que l'avenir de l'évaluation n'est pas d'attraper les tricheurs. C'est de concevoir des expériences d'apprentissage qui valent la peine d'être faites honnêtement.
    </p>

    <p>
      Intéressé à voir cela en action ? <a href="/contact">Contactez-nous</a> pour découvrir comment WhimsyLabs peut améliorer l'évaluation pratique des sciences dans votre école.
    </p>

    <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #ddd' }} />
    <p style={{ fontSize: '0.9rem', color: '#666' }}>
      <strong>Sources :</strong>
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
