#!/usr/bin/env node

/**
 * Script to generate the complete blog translation file structure
 */

const fs = require('fs-extra');
const path = require('path');

const posts = [
  {
    id: 'post1',
    slug: 'whimsylabs-education-revolution',
    titles: {
      en: 'A Brief History of Whimsylabs: From our Humble Start to a BETT 2025 Winner',
      de: 'Eine kurze Geschichte von WhimsyLabs: Von unserem bescheidenen Anfang zu einem BETT 2025 Gewinner',
      fr: 'Une brève histoire de WhimsyLabs : De nos débuts modestes à un gagnant BETT 2025',
      es: 'Una breve historia de WhimsyLabs: Desde nuestros humildes comienzos hasta ser ganador de BETT 2025'
    },
    descriptions: {
      en: 'How Whimsylabs, founded by Marisa French, is addressing STEM challenges with fully simulated labs, impactful partnerships, and award-winning innovation.',
      de: 'Wie WhimsyLabs, gegründet von Marisa French, STEM-Herausforderungen mit vollständig simulierten Laboren, wirkungsvollen Partnerschaften und preisgekrönter Innovation angeht.',
      fr: 'Comment WhimsyLabs, fondé par Marisa French, aborde les défis STEM avec des laboratoires entièrement simulés, des partenariats impactants et une innovation primée.',
      es: 'Cómo WhimsyLabs, fundado por Marisa French, está abordando los desafíos STEM con laboratorios completamente simulados, asociaciones impactantes e innovación galardonada.'
    }
  },
  {
    id: 'post2',
    slug: 'physicality-in-virtual-labs',
    titles: {
      en: 'The Importance of Physicality in Virtual Labs: A Step Beyond Traditional Simulations',
      de: 'Die Bedeutung der Physikalität in virtuellen Laboren: Ein Schritt über traditionelle Simulationen hinaus',
      fr: 'L\'importance de la physicalité dans les laboratoires virtuels : Un pas au-delà des simulations traditionnelles',
      es: 'La importancia de la fisicalidad en laboratorios virtuales: Un paso más allá de las simulaciones tradicionales'
    },
    descriptions: {
      en: 'Exploring how Whimsylabs\' groundbreaking liquid physics and procedural training redefine science education.',
      de: 'Erforschung, wie WhimsyLabs\' bahnbrechende Flüssigkeitsphysik und Verfahrensschulung die wissenschaftliche Bildung neu definieren.',
      fr: 'Explorer comment la physique des liquides révolutionnaire de WhimsyLabs et la formation procédurale redéfinissent l\'éducation scientifique.',
      es: 'Explorando cómo la física de líquidos revolucionaria de WhimsyLabs y el entrenamiento procedimental redefinen la educación científica.'
    }
  },
  {
    id: 'post3',
    slug: 'virtual-kidney-dissection-send-engagement',
    titles: {
      en: 'Hands-On Learning: Virtual Kidney Dissection Enhances SEND Student Engagement',
      de: 'Praktisches Lernen: Virtuelle Nierendisskussion verbessert SEND-Studentenengagement',
      fr: 'Apprentissage pratique : La dissection virtuelle de rein améliore l\'engagement des étudiants SEND',
      es: 'Aprendizaje práctico: La disección virtual de riñón mejora el compromiso de estudiantes SEND'
    },
    descriptions: {
      en: 'Exploring how WhimsyLabs\' physical interaction in virtual environments significantly improves educational outcomes and engagement for SEND students.',
      de: 'Erforschung, wie WhimsyLabs\' physische Interaktion in virtuellen Umgebungen die Bildungsergebnisse und das Engagement für SEND-Studenten erheblich verbessert.',
      fr: 'Explorer comment l\'interaction physique de WhimsyLabs dans les environnements virtuels améliore significativement les résultats éducatifs et l\'engagement pour les étudiants SEND.',
      es: 'Explorando cómo la interacción física de WhimsyLabs en entornos virtuales mejora significativamente los resultados educativos y el compromiso para estudiantes SEND.'
    }
  },
  {
    id: 'post4',
    slug: 'ai-powered-virtual-labs-solving-education-crisis',
    titles: {
      en: 'Revolutionizing STEM Education: How WhimsyLabs\' AI-Powered Virtual Labs Are Solving the Global Science Education Crisis',
      de: 'Revolutionierung der STEM-Bildung: Wie WhimsyLabs\' KI-gestützte virtuelle Labore die globale wissenschaftliche Bildungskrise lösen',
      fr: 'Révolutionner l\'éducation STEM : Comment les laboratoires virtuels alimentés par IA de WhimsyLabs résolvent la crise mondiale de l\'éducation scientifique',
      es: 'Revolucionando la educación STEM: Cómo los laboratorios virtuales impulsados por IA de WhimsyLabs están resolviendo la crisis global de educación científica'
    },
    descriptions: {
      en: 'WhimsyLabs\' innovative virtual laboratory platform combines advanced AI assessment, realistic physics simulations, and sandbox learning to democratize high-quality science education globally.',
      de: 'WhimsyLabs\' innovative virtuelle Laborplattform kombiniert fortschrittliche KI-Bewertung, realistische Physiksimulationen und Sandbox-Lernen, um hochwertige wissenschaftliche Bildung global zu demokratisieren.',
      fr: 'La plateforme de laboratoire virtuel innovante de WhimsyLabs combine évaluation IA avancée, simulations physiques réalistes et apprentissage sandbox pour démocratiser l\'éducation scientifique de haute qualité globalement.',
      es: 'La plataforma de laboratorio virtual innovadora de WhimsyLabs combina evaluación de IA avanzada, simulaciones de física realistas y aprendizaje sandbox para democratizar la educación científica de alta calidad globalmente.'
    }
  },
  {
    id: 'post5',
    slug: 'whimsycat-ai-tutor-transforming-science-education',
    titles: {
      en: 'Meet WhimsyCat: The Revolutionary AI Tutor Transforming Science Education',
      de: 'Lernen Sie WhimsyCat kennen: Der revolutionäre KI-Tutor, der die wissenschaftliche Bildung transformiert',
      fr: 'Rencontrez WhimsyCat : Le tuteur IA révolutionnaire transformant l\'éducation scientifique',
      es: 'Conoce a WhimsyCat: El tutor de IA revolucionario transformando la educación científica'
    },
    descriptions: {
      en: 'How WhimsyLabs\' advanced AI tutor provides personalized guidance, real-time feedback, and adaptive learning pathways to revolutionize laboratory education.',
      de: 'Wie WhimsyLabs\' fortschrittlicher KI-Tutor personalisierte Anleitung, Echtzeit-Feedback und adaptive Lernwege bietet, um die Laborausbildung zu revolutionieren.',
      fr: 'Comment le tuteur IA avancé de WhimsyLabs fournit des conseils personnalisés, des commentaires en temps réel et des parcours d\'apprentissage adaptatifs pour révolutionner l\'éducation de laboratoire.',
      es: 'Cómo el tutor de IA avanzado de WhimsyLabs proporciona orientación personalizada, retroalimentación en tiempo real y caminos de aprendizaje adaptativos para revolucionar la educación de laboratorio.'
    }
  },
  {
    id: 'post6',
    slug: 'sandbox-learning-revolution-stem-education',
    titles: {
      en: 'The Sandbox Learning Revolution: Why Freedom to Fail is Essential for STEM Education',
      de: 'Die Sandbox-Lernrevolution: Warum die Freiheit zu scheitern für die STEM-Bildung wesentlich ist',
      fr: 'La révolution de l\'apprentissage sandbox : Pourquoi la liberté d\'échouer est essentielle pour l\'éducation STEM',
      es: 'La revolución del aprendizaje sandbox: Por qué la libertad de fallar es esencial para la educación STEM'
    },
    descriptions: {
      en: 'How WhimsyLabs\' open-ended exploration approach transforms science education by embracing failure as a powerful learning tool and fostering authentic scientific thinking.',
      de: 'Wie WhimsyLabs\' offener Erkundungsansatz die wissenschaftliche Bildung transformiert, indem er das Scheitern als mächtiges Lernwerkzeug umarmt und authentisches wissenschaftliches Denken fördert.',
      fr: 'Comment l\'approche d\'exploration ouverte de WhimsyLabs transforme l\'éducation scientifique en embrassant l\'échec comme un outil d\'apprentissage puissant et en favorisant la pensée scientifique authentique.',
      es: 'Cómo el enfoque de exploración abierta de WhimsyLabs transforma la educación científica abrazando el fracaso como una herramienta de aprendizaje poderosa y fomentando el pensamiento científico auténtico.'
    }
  }
];

const languages = ['en', 'de', 'fr', 'es'];

async function generateBlogStructure() {
  console.log('🏗️  Generating blog translation structure...\n');
  
  for (const post of posts) {
    for (const lang of languages) {
      const postDir = `./src/i18n/blog/${post.id}`;
      const filePath = path.join(postDir, `${lang}.js`);
      
      // Create directory if it doesn't exist
      await fs.ensureDir(postDir);
      
      // Skip if file already exists
      if (await fs.pathExists(filePath)) {
        console.log(`⏭️  Skipping ${post.id}/${lang}.js (already exists)`);
        continue;
      }
      
      const langName = {
        en: 'English',
        de: 'German', 
        fr: 'French',
        es: 'Spanish'
      }[lang];
      
      const fileContent = `// ${langName} - ${post.id}: ${post.titles[lang]}
import React from "react";

export const title = "${post.titles[lang]}";
export const description = "${post.descriptions[lang]}";

// TODO: ${lang === 'en' ? 'Extract full content from src/Components/blog/Post*.js' : 'Translate full content'}
export const content = null;`;
      
      await fs.writeFile(filePath, fileContent);
      console.log(`✅ Created ${post.id}/${lang}.js`);
    }
  }
  
  console.log('\n🎉 Blog translation structure generated!');
  console.log('📁 Files created in: src/i18n/blog/post*/');
  console.log('🔍 Run "npm run validate-blog-translations" to check status');
}

generateBlogStructure().catch(error => {
  console.error('❌ Error generating blog structure:', error);
  process.exit(1);
});