#!/usr/bin/env node

/**
 * Validation script to ensure all FAQ translation files have the same number of questions
 */

const fs = require('fs-extra');
const path = require('path');

async function validateTranslations() {
  const faqDir = './src/i18n/faq';
  const languages = ['en', 'es', 'fr', 'de', 'ja'];
  
  console.log('🔍 Validating FAQ translations...\n');
  
  const results = {};
  
  for (const lang of languages) {
    const filePath = path.join(faqDir, `${lang}.js`);
    
    if (!await fs.pathExists(filePath)) {
      console.log(`❌ ${lang}.js: File not found`);
      continue;
    }
    
    const content = await fs.readFile(filePath, 'utf8');
    
    // Count categories
    const categoryMatches = content.match(/"[^"]+"\s*:\s*"[^"]+"/g) || [];
    const categoryCount = categoryMatches.length;
    
    // Count FAQs
    const faqMatches = content.match(/"[^"]+"\s*:\s*{\s*"question"/g) || [];
    const faqCount = faqMatches.length;
    
    // Count untranslated items
    const untranslatedMatches = content.match(/\[TRANSLATE\]/g) || [];
    const untranslatedCount = untranslatedMatches.length;
    
    results[lang] = {
      categories: categoryCount,
      faqs: faqCount,
      untranslated: untranslatedCount,
      translated: faqCount * 2 - untranslatedCount, // questions + answers
      completionPercent: Math.round(((faqCount * 2 - untranslatedCount) / (faqCount * 2)) * 100)
    };
    
    const status = untranslatedCount === 0 ? '✅' : '🔄';
    console.log(`${status} ${lang.toUpperCase()}: ${faqCount} questions, ${categoryCount} categories, ${untranslatedCount} untranslated (${results[lang].completionPercent}% complete)`);
  }
  
  // Check consistency
  console.log('\n📊 Consistency Check:');
  const englishFaqCount = results.en?.faqs || 0;
  let allConsistent = true;
  
  for (const lang of languages) {
    if (results[lang] && results[lang].faqs !== englishFaqCount) {
      console.log(`❌ ${lang.toUpperCase()}: Has ${results[lang].faqs} questions, expected ${englishFaqCount}`);
      allConsistent = false;
    }
  }
  
  if (allConsistent) {
    console.log('✅ All translation files have the same number of questions');
  }
  
  // Summary
  console.log('\n📋 Translation Progress:');
  for (const lang of languages) {
    if (results[lang]) {
      const progressBars = Math.max(0, Math.min(10, Math.floor(results[lang].completionPercent / 10)));
    const progress = '█'.repeat(progressBars) + '░'.repeat(10 - progressBars);
      console.log(`   ${lang.toUpperCase()}: [${progress}] ${results[lang].completionPercent}%`);
    }
  }
  
  console.log(`\n🎯 Total Questions: ${englishFaqCount}`);
  console.log(`📁 Translation files: src/i18n/faq/`);
  console.log(`🔍 Search for "[TRANSLATE]" to find items needing translation`);
}

validateTranslations().catch(error => {
  console.error('❌ Error validating translations:', error);
  process.exit(1);
});