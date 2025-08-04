#!/usr/bin/env node

/**
 * Comprehensive validation script for all WhimsyLabs translations
 * Checks FAQ, Blog, UI Components, and Page translations
 */

const fs = require('fs-extra');
const path = require('path');

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

const languages = ['en', 'de', 'fr', 'es'];

async function validateTranslations() {
  console.log(`${colors.cyan}${colors.bright}🌍 WhimsyLabs Translation Validation Report${colors.reset}\n`);
  
  const results = {
    faq: {},
    blog: {},
    ui: {},
    pages: {}
  };

  // Validate FAQ translations
  await validateFAQTranslations(results.faq);
  
  // Validate Blog translations
  await validateBlogTranslations(results.blog);
  
  // Validate UI translations
  await validateUITranslations(results.ui);
  
  // Validate Page translations
  await validatePageTranslations(results.pages);
  
  // Generate summary table
  generateSummaryTable(results);
  
  // Generate detailed report
  generateDetailedReport(results);
}

async function validateFAQTranslations(results) {
  console.log(`${colors.blue}📋 Validating FAQ Translations...${colors.reset}`);
  
  for (const lang of languages) {
    const filePath = `./src/i18n/faq/${lang}.js`;
    
    if (!await fs.pathExists(filePath)) {
      results[lang] = { exists: false, questions: 0, categories: 0, completion: 0 };
      continue;
    }
    
    const content = await fs.readFile(filePath, 'utf8');
    
    // Count categories
    const categoryMatches = content.match(/"[^"]+"\s*:\s*"[^"]+"/g) || [];
    const categoryCount = categoryMatches.filter(match => 
      !match.includes('"question"') && !match.includes('"answer"')
    ).length;
    
    // Count FAQs
    const faqMatches = content.match(/"[^"]+"\s*:\s*{\s*"question"/g) || [];
    const faqCount = faqMatches.length;
    
    // Count untranslated items
    const untranslatedMatches = content.match(/\[TRANSLATE\]/g) || [];
    const untranslatedCount = untranslatedMatches.length;
    
    const totalItems = faqCount * 2 + categoryCount; // questions + answers + categories
    const translatedItems = totalItems - untranslatedCount;
    const completion = totalItems > 0 ? Math.round((translatedItems / totalItems) * 100) : 0;
    
    results[lang] = {
      exists: true,
      questions: faqCount,
      categories: categoryCount,
      untranslated: untranslatedCount,
      completion: completion
    };
  }
}

async function validateBlogTranslations(results) {
  console.log(`${colors.blue}📝 Validating Blog Translations...${colors.reset}`);
  
  for (const lang of languages) {
    const filePath = `./src/i18n/blog/${lang}.js`;
    
    if (!await fs.pathExists(filePath)) {
      results[lang] = { exists: false, posts: 0, fullContent: 0, completion: 0 };
      continue;
    }
    
    const content = await fs.readFile(filePath, 'utf8');
    
    // Count blog posts
    const blogMatches = content.match(/"[^"]+"\s*:\s*{\s*"title"/g) || [];
    const blogCount = blogMatches.length;
    
    // Count posts with full content (containing JSX)
    const fullContentMatches = content.match(/"content"\s*:\s*\(/g) || [];
    const fullContentCount = fullContentMatches.length;
    
    // Count untranslated items
    const untranslatedMatches = content.match(/\[TRANSLATE\]/g) || [];
    const untranslatedCount = untranslatedMatches.length;
    
    const totalItems = blogCount * 2; // titles + descriptions (content is optional)
    const translatedItems = totalItems - untranslatedCount;
    const completion = totalItems > 0 ? Math.round((translatedItems / totalItems) * 100) : 0;
    
    results[lang] = {
      exists: true,
      posts: blogCount,
      fullContent: fullContentCount,
      untranslated: untranslatedCount,
      completion: completion
    };
  }
}

async function validateUITranslations(results) {
  console.log(`${colors.blue}🎨 Validating UI Translations...${colors.reset}`);
  
  const translationsPath = './src/i18n/translations.js';
  
  if (!await fs.pathExists(translationsPath)) {
    for (const lang of languages) {
      results[lang] = { exists: false, keys: 0, completion: 0 };
    }
    return;
  }
  
  const content = await fs.readFile(translationsPath, 'utf8');
  
  for (const lang of languages) {
    // Look for language-specific sections - more flexible regex
    const langRegex = new RegExp(`${lang}:\\s*{`, 'g');
    const langMatch = content.match(langRegex);
    
    if (!langMatch) {
      results[lang] = { exists: false, keys: 0, completion: 0 };
      continue;
    }
    
    // Extract the language section - try different formats
    let langStartIndex = content.indexOf(`${lang}: {`);
    if (langStartIndex === -1) {
      langStartIndex = content.indexOf(`  ${lang}: {`);
    }
    if (langStartIndex === -1) {
      results[lang] = { exists: false, keys: 0, completion: 0 };
      continue;
    }
    
    // Find the matching closing brace for this language section
    let braceCount = 0;
    let langEndIndex = langStartIndex;
    let inString = false;
    let escapeNext = false;
    
    for (let i = langStartIndex; i < content.length; i++) {
      const char = content[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"' && !escapeNext) {
        inString = !inString;
        continue;
      }
      
      if (!inString) {
        if (char === '{') braceCount++;
        if (char === '}') {
          braceCount--;
          if (braceCount === 0) {
            langEndIndex = i;
            break;
          }
        }
      }
    }
    
    const langSection = content.substring(langStartIndex, langEndIndex + 1);
    
    // Count translation keys (more accurate)
    const keyMatches = langSection.match(/\s+"[^"]+"\s*:/g) || [];
    const keyCount = keyMatches.length;
    
    // Count untranslated items
    const untranslatedMatches = langSection.match(/\[TRANSLATE\]/g) || [];
    const untranslatedCount = untranslatedMatches.length;
    
    const completion = keyCount > 0 ? Math.round(((keyCount - untranslatedCount) / keyCount) * 100) : 0;
    
    results[lang] = {
      exists: true,
      keys: keyCount,
      untranslated: untranslatedCount,
      completion: completion
    };
  }
}

async function validatePageTranslations(results) {
  console.log(`${colors.blue}📄 Validating Page Translations...${colors.reset}`);
  
  // For now, we'll check if the main pages have translation support
  // This could be expanded to check specific page translation files
  
  const mainPages = ['home', 'contact', 'features', 'pricing'];
  
  for (const lang of languages) {
    // This is a placeholder - in a real implementation, you'd check
    // for page-specific translation files or sections
    results[lang] = {
      exists: lang === 'en', // Only English exists for now
      pages: lang === 'en' ? mainPages.length : 0,
      completion: lang === 'en' ? 100 : 0
    };
  }
}

function generateSummaryTable(results) {
  console.log(`\n${colors.cyan}${colors.bright}📊 Translation Summary Table${colors.reset}\n`);
  
  // Table header
  const header = '┌─────────┬─────────────┬─────────────┬─────────────┬─────────────┐';
  const separator = '├─────────┼─────────────┼─────────────┼─────────────┼─────────────┤';
  const footer = '└─────────┴─────────────┴─────────────┴─────────────┴─────────────┘';
  
  console.log(header);
  console.log('│ Lang    │ FAQ         │ Blog        │ UI          │ Pages       │');
  console.log(separator);
  
  for (const lang of languages) {
    const langDisplay = lang.toUpperCase().padEnd(7);
    
    // FAQ status
    const faqResult = results.faq[lang];
    const faqStatus = faqResult?.exists ? 
      `${faqResult.completion}% (${faqResult.questions}Q)`.padEnd(11) : 
      '❌ Missing'.padEnd(11);
    
    // Blog status  
    const blogResult = results.blog[lang];
    const blogStatus = blogResult?.exists ? 
      `${blogResult.completion}% (${blogResult.fullContent}/${blogResult.posts})`.padEnd(11) : 
      '❌ Missing'.padEnd(11);
    
    // UI status
    const uiResult = results.ui[lang];
    const uiStatus = uiResult?.exists ? 
      `${uiResult.completion}% (${uiResult.keys}K)`.padEnd(11) : 
      '❌ Missing'.padEnd(11);
    
    // Pages status
    const pageResult = results.pages[lang];
    const pageStatus = pageResult?.exists ? 
      `${pageResult.completion}% (${pageResult.pages}P)`.padEnd(11) : 
      '❌ Missing'.padEnd(11);
    
    // Color coding
    const faqColor = faqResult?.completion === 100 ? colors.green : 
                     faqResult?.completion >= 50 ? colors.yellow : colors.red;
    const blogColor = blogResult?.completion === 100 ? colors.green : 
                      blogResult?.completion >= 50 ? colors.yellow : colors.red;
    const uiColor = uiResult?.completion === 100 ? colors.green : 
                    uiResult?.completion >= 50 ? colors.yellow : colors.red;
    const pageColor = pageResult?.completion === 100 ? colors.green : colors.red;
    
    console.log(`│ ${langDisplay} │ ${faqColor}${faqStatus}${colors.reset} │ ${blogColor}${blogStatus}${colors.reset} │ ${uiColor}${uiStatus}${colors.reset} │ ${pageColor}${pageStatus}${colors.reset} │`);
  }
  
  console.log(footer);
  console.log(`\n${colors.white}Legend: Q=Questions, K=Keys, P=Pages, (X/Y)=Full Content/Total${colors.reset}`);
}

function generateDetailedReport(results) {
  console.log(`\n${colors.cyan}${colors.bright}📋 Detailed Translation Report${colors.reset}\n`);
  
  for (const lang of languages) {
    const langFlag = { en: '🇬🇧', de: '🇩🇪', fr: '🇫🇷', es: '🇪🇸' }[lang];
    console.log(`${colors.bright}${langFlag} ${lang.toUpperCase()} - ${getLanguageName(lang)}${colors.reset}`);
    
    // FAQ Details
    const faq = results.faq[lang];
    if (faq?.exists) {
      const status = faq.completion === 100 ? '✅' : faq.completion >= 50 ? '🔄' : '❌';
      console.log(`  FAQ: ${status} ${faq.questions} questions, ${faq.categories} categories (${faq.completion}% complete)`);
      if (faq.untranslated > 0) {
        console.log(`       ${colors.yellow}⚠️  ${faq.untranslated} items need translation${colors.reset}`);
      }
    } else {
      console.log(`  FAQ: ❌ Translation file missing`);
    }
    
    // Blog Details
    const blog = results.blog[lang];
    if (blog?.exists) {
      const status = blog.completion === 100 ? '✅' : blog.completion >= 50 ? '🔄' : '❌';
      console.log(`  Blog: ${status} ${blog.posts} posts, ${blog.fullContent} with full content (${blog.completion}% complete)`);
      if (blog.untranslated > 0) {
        console.log(`        ${colors.yellow}⚠️  ${blog.untranslated} items need translation${colors.reset}`);
      }
    } else {
      console.log(`  Blog: ❌ Translation file missing`);
    }
    
    // UI Details
    const ui = results.ui[lang];
    if (ui?.exists) {
      const status = ui.completion === 100 ? '✅' : ui.completion >= 50 ? '🔄' : '❌';
      console.log(`  UI: ${status} ${ui.keys} translation keys (${ui.completion}% complete)`);
      if (ui.untranslated > 0) {
        console.log(`      ${colors.yellow}⚠️  ${ui.untranslated} keys need translation${colors.reset}`);
      }
    } else {
      console.log(`  UI: ❌ Translation keys missing`);
    }
    
    // Pages Details
    const pages = results.pages[lang];
    if (pages?.exists) {
      console.log(`  Pages: ✅ ${pages.pages} pages available`);
    } else {
      console.log(`  Pages: ❌ Page translations not implemented`);
    }
    
    console.log('');
  }
  
  // Overall Statistics
  console.log(`${colors.cyan}${colors.bright}📈 Overall Statistics${colors.reset}`);
  
  const totalLanguages = languages.length;
  const faqComplete = Object.values(results.faq).filter(r => r.completion === 100).length;
  const blogComplete = Object.values(results.blog).filter(r => r.completion === 100).length;
  const uiComplete = Object.values(results.ui).filter(r => r.completion === 100).length;
  
  console.log(`  FAQ Translations: ${faqComplete}/${totalLanguages} languages complete`);
  console.log(`  Blog Translations: ${blogComplete}/${totalLanguages} languages complete`);
  console.log(`  UI Translations: ${uiComplete}/${totalLanguages} languages complete`);
  
  const overallProgress = Math.round(((faqComplete + blogComplete + uiComplete) / (totalLanguages * 3)) * 100);
  console.log(`  Overall Progress: ${overallProgress}% complete`);
  
  console.log(`\n${colors.green}🎯 Translation files location: src/i18n/${colors.reset}`);
  console.log(`${colors.green}🔍 Run individual validators: npm run validate-faq-translations, npm run validate-blog-translations${colors.reset}`);
}

function getLanguageName(code) {
  const names = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français', 
    es: 'Español'
  };
  return names[code] || code;
}

validateTranslations().catch(error => {
  console.error(`${colors.red}❌ Error validating translations:${colors.reset}`, error);
  process.exit(1);
});