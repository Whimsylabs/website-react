#!/usr/bin/env node

/**
 * Script to generate FAQ translation templates from the original faqData.js
 * This ensures we have ALL questions translated, not just a subset
 */

const fs = require('fs-extra');
const path = require('path');

// Read the original FAQ data
const faqDataPath = './src/data/faqData.js';
const faqDataContent = fs.readFileSync(faqDataPath, 'utf8');

// Extract the faqCategories object using regex (since we can't import ES modules in Node directly)
const faqCategoriesMatch = faqDataContent.match(/export const faqCategories = ({[\s\S]*?});/);
if (!faqCategoriesMatch) {
  console.error('❌ Could not extract faqCategories from faqData.js');
  process.exit(1);
}

// Parse the faqCategories object
const faqCategoriesCode = faqCategoriesMatch[1];
const faqCategories = eval(`(${faqCategoriesCode})`);

console.log('📊 FAQ Data Analysis:');
let totalQuestions = 0;
Object.keys(faqCategories).forEach(category => {
  const count = faqCategories[category].length;
  console.log(`   ${category}: ${count} questions`);
  totalQuestions += count;
});
console.log(`   TOTAL: ${totalQuestions} questions`);

// Generate unique keys for each FAQ
const generateFAQKey = (question) => {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
};

// Create the English template (base)
const createEnglishTemplate = () => {
  const template = {
    categories: {},
    faqs: {}
  };

  Object.keys(faqCategories).forEach(categoryName => {
    template.categories[categoryName] = categoryName;
    
    faqCategories[categoryName].forEach(faq => {
      const key = generateFAQKey(faq.question);
      template.faqs[key] = {
        question: faq.question,
        answer: faq.answer
      };
    });
  });

  return template;
};

// Create translation template for other languages
const createTranslationTemplate = (languageCode, languageName) => {
  const englishTemplate = createEnglishTemplate();
  const template = {
    categories: {},
    faqs: {}
  };

  // Copy category structure with placeholder translations
  Object.keys(englishTemplate.categories).forEach(categoryName => {
    template.categories[categoryName] = `[TRANSLATE] ${categoryName}`;
  });

  // Copy FAQ structure with placeholder translations
  Object.keys(englishTemplate.faqs).forEach(key => {
    const englishFaq = englishTemplate.faqs[key];
    template.faqs[key] = {
      question: `[TRANSLATE] ${englishFaq.question}`,
      answer: `[TRANSLATE] ${englishFaq.answer}`
    };
  });

  return template;
};

// Generate files
async function generateTranslationFiles() {
  const outputDir = './src/i18n/faq';
  await fs.ensureDir(outputDir);

  // Generate English (base) file
  const englishTemplate = createEnglishTemplate();
  await fs.writeFile(
    path.join(outputDir, 'en.js'),
    `// English FAQ translations (base)\nexport default ${JSON.stringify(englishTemplate, null, 2)};`
  );
  console.log('✅ Generated src/i18n/faq/en.js');

  // Generate template files for other languages
  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' }
  ];

  for (const lang of languages) {
    const template = createTranslationTemplate(lang.code, lang.name);
    await fs.writeFile(
      path.join(outputDir, `${lang.code}.js`),
      `// ${lang.name} FAQ translations\n// TODO: Translate all [TRANSLATE] markers\nexport default ${JSON.stringify(template, null, 2)};`
    );
    console.log(`✅ Generated src/i18n/faq/${lang.code}.js (${Object.keys(template.faqs).length} questions to translate)`);
  }

  // Generate index file
  const indexContent = `// FAQ translations index
import en from './en.js';
import es from './es.js';
import fr from './fr.js';
import de from './de.js';

const faqTranslations = {
  en,
  es,
  fr,
  de
};

export default faqTranslations;

// Helper function to get FAQ data for a specific language
export const getFAQTranslations = (language = 'en') => {
  return faqTranslations[language] || faqTranslations.en;
};
`;

  await fs.writeFile(path.join(outputDir, 'index.js'), indexContent);
  console.log('✅ Generated src/i18n/faq/index.js');

  console.log(`\n🎯 Summary:`);
  console.log(`   - Generated translation files for ${languages.length + 1} languages`);
  console.log(`   - Each file contains ${totalQuestions} questions`);
  console.log(`   - Translation files are in src/i18n/faq/`);
  console.log(`   - Search for "[TRANSLATE]" to find items that need translation`);
}

// Run the generator
generateTranslationFiles().catch(error => {
  console.error('❌ Error generating translation files:', error);
  process.exit(1);
});