#!/usr/bin/env node
/**
 * FAQ Translation Sync Script
 * 
 * Checks for missing FAQ translations and optionally adds English placeholders.
 * 
 * Usage:
 *   node scripts/sync-faq-translations.js           # Check only
 *   node scripts/sync-faq-translations.js --fix     # Add missing entries
 */

const fs = require('fs');
const path = require('path');

const LANGUAGES = ['en', 'es', 'fr', 'de', 'ja'];
const FAQ_DATA_PATH = path.join(__dirname, '../src/data/faqData.js');
const I18N_FAQ_DIR = path.join(__dirname, '../src/i18n/faq');

// Load faqData.js
const { faqCategories } = require(FAQ_DATA_PATH);

// Convert question to slug (same logic as faqDataGenerator)
function questionToSlug(question) {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

// Get all FAQs with their slugs
function getAllFAQs() {
  const faqs = [];
  Object.entries(faqCategories).forEach(([category, items]) => {
    items.forEach(item => {
      faqs.push({
        category,
        question: item.question,
        answer: item.answer,
        slug: questionToSlug(item.question)
      });
    });
  });
  return faqs;
}

// Parse translation file to get existing slugs
function parseTranslationFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { slugs: new Set(), content: null };
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = new Set();
  
  // Match FAQ entry patterns: "slug-name": {
  const pattern = /"([a-z0-9-]+)":\s*\{[\s\S]*?"question":/g;
  let match;
  while ((match = pattern.exec(content)) !== null) {
    slugs.add(match[1]);
  }
  
  return { slugs, content };
}

// Generate a new FAQ entry for insertion
function generateFAQEntry(faq, indent = '    ') {
  const escapedQuestion = faq.question.replace(/"/g, '\\"');
  const escapedAnswer = faq.answer.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  
  return `${indent}"${faq.slug}": {
${indent}  "question": "${escapedQuestion}",
${indent}  "answer": "${escapedAnswer}"
${indent}}`;
}

// Main sync function
function syncTranslations(fix = false) {
  const allFAQs = getAllFAQs();
  console.log(`\n📋 FAQ Translation Sync Check`);
  console.log(`${'='.repeat(50)}`);
  console.log(`Source: faqData.js (${allFAQs.length} questions)\n`);
  
  const report = {};
  let totalMissing = 0;
  
  LANGUAGES.forEach(lang => {
    const filePath = path.join(I18N_FAQ_DIR, `${lang}.js`);
    const { slugs, content } = parseTranslationFile(filePath);
    
    const missing = allFAQs.filter(faq => !slugs.has(faq.slug));
    report[lang] = {
      total: slugs.size,
      missing: missing,
      filePath
    };
    
    totalMissing += missing.length;
    
    const status = missing.length === 0 ? '✓' : `⚠️  Missing ${missing.length}`;
    console.log(`${lang.toUpperCase()}: ${slugs.size}/${allFAQs.length} ${status}`);
    
    if (missing.length > 0) {
      missing.forEach(faq => {
        console.log(`     - "${faq.question.substring(0, 50)}..."`);
      });
    }
  });
  
  console.log(`\n${'='.repeat(50)}`);
  
  if (totalMissing === 0) {
    console.log('✅ All translations are in sync!\n');
    return;
  }
  
  console.log(`⚠️  Total missing entries: ${totalMissing}\n`);
  
  if (!fix) {
    console.log('Run with --fix to add missing entries (using English text as placeholder)\n');
    return;
  }
  
  // Fix mode: add missing entries
  console.log('🔧 Adding missing entries...\n');
  
  LANGUAGES.forEach(lang => {
    const { missing, filePath, total } = report[lang];
    
    if (missing.length === 0) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find the "faqs": { section and add entries before the closing }
    missing.forEach(faq => {
      const entry = generateFAQEntry(faq);
      
      // Find position to insert (before the last } of "faqs" object)
      // This is a simplified approach - may need adjustment based on file structure
      const faqsEndPattern = /("faqs":\s*\{[\s\S]*?)(\n\s*\}[\s\S]*?export)/;
      const match = content.match(faqsEndPattern);
      
      if (match) {
        // Add comma after last entry if needed, then add new entry
        let faqsContent = match[1];
        if (!faqsContent.trimEnd().endsWith(',')) {
          faqsContent = faqsContent.trimEnd() + ',';
        }
        content = content.replace(faqsEndPattern, `${faqsContent}\n${entry}$2`);
        console.log(`  ${lang.toUpperCase()}: Added "${faq.slug.substring(0, 30)}..."`);
      }
    });
    
    // Write updated file
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✓ Updated ${filePath}\n`);
  });
  
  console.log('✅ Sync complete! Please review and translate the added entries.\n');
}

// Run
const fix = process.argv.includes('--fix');
syncTranslations(fix);
