#!/usr/bin/env node

/**
 * Blog Translation Validator
 * Checks both raw i18n files AND built HTML pages for proper translations
 */

const fs = require('fs-extra');
const path = require('path');
// Per-post language allowlist (keyed by slug, build codes en/es/fr/de/jp). Region-specific
// posts are only published in the listed languages, so missing translation files for the
// other languages are expected, not errors.
const blogPostLanguageRestrictions = require('../src/i18n/blogPostLanguageRestrictions.json');
let blogDataForSlugs = {};
try { blogDataForSlugs = require('../src/i18n/blogData.generated.js'); } catch (e) { /* not built yet */ }
const postIdToSlug = {};
for (const p of (blogDataForSlugs.en || [])) { postIdToSlug[p.id] = p.slug; }

// Language-specific indicators (characters/words that MUST appear if properly translated)
const LANGUAGE_INDICATORS = {
  de: {
    chars: /[äöüßÄÖÜ]/,
    words: /\b(und|der|die|das|ist|sind|für|mit|von|werden|nicht|wird|auch|sich|können|bei|nach)\b/gi,
    name: 'German'
  },
  es: {
    chars: /[áéíóúüñ¿¡]/i,
    words: /\b(que|de|en|el|la|los|las|para|con|por|como|más|pero|esta|este|son|una|uno)\b/gi,
    name: 'Spanish'
  },
  fr: {
    chars: /[àâçéèêëïîôùûüœæ]/i,
    words: /\b(que|qui|dans|pour|avec|sur|est|sont|nous|vous|cette|les|des|une|mais|par|pas)\b/gi,
    name: 'French'
  },
  ja: {
    chars: /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/,  // Hiragana, Katakana, Kanji
    words: null,  // Japanese doesn't use word boundaries the same way
    name: 'Japanese'
  }
};

// Words that are OK to appear in any language (proper nouns, technical terms)
const UNIVERSAL_TERMS = [
  'WhimsyLabs', 'WhimsyCat', 'STEM', 'AI', 'VR', 'GCSE', 'A-Level', 'COVID-19',
  'BETT', 'PhD', 'UK', 'GDPR', 'COPPA', 'FERPA', 'API', 'LTI', 'SSO', 'URL'
];

function isProperlyTranslated(content, lang) {
  if (lang === 'en') return { translated: true, confidence: 100 };
  
  const indicators = LANGUAGE_INDICATORS[lang];
  if (!indicators) return { translated: true, confidence: 50, note: 'Unknown language' };

  // Extract text content (remove HTML tags, JSX, exports)
  let textContent = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{[^}]+\}/g, ' ')
    .replace(/export const \w+ = .+?;/g, '')
    .replace(/import .+?;/g, '')
    .replace(/className="[^"]+"/g, '')
    .replace(/style=\{[^}]+\}/g, '');

  // Remove universal terms for analysis
  UNIVERSAL_TERMS.forEach(term => {
    textContent = textContent.replace(new RegExp(term, 'gi'), '');
  });

  const results = {
    hasLangChars: indicators.chars ? indicators.chars.test(textContent) : false,
    langWordCount: 0,
    englishWordCount: 0,
    totalWords: 0
  };

  // Count language-specific words
  if (indicators.words) {
    const langMatches = textContent.match(indicators.words);
    results.langWordCount = langMatches ? langMatches.length : 0;
  }

  // Count common English words (that shouldn't appear in translated content)
  const englishWords = /\b(the|and|with|this|that|which|have|been|will|from|their|they|your|there|what|when|where|who|how|because|through|should|would|could)\b/gi;
  const engMatches = textContent.match(englishWords);
  results.englishWordCount = engMatches ? engMatches.length : 0;

  // Total word count
  results.totalWords = textContent.split(/\s+/).filter(w => w.length > 2).length;

  // Determine if translated
  let confidence = 0;
  
  if (lang === 'ja') {
    // Japanese: just check for Japanese characters
    confidence = results.hasLangChars ? 95 : 5;
  } else {
    // European languages: check ratio of target lang words vs English
    if (results.langWordCount > 20 && results.hasLangChars) {
      confidence = 90;
    } else if (results.langWordCount > 10 && results.englishWordCount < 10) {
      confidence = 70;
    } else if (results.englishWordCount > 30 && results.langWordCount < 5) {
      confidence = 10;  // Likely English
    } else if (results.langWordCount > results.englishWordCount) {
      confidence = 60;
    } else {
      confidence = 30;
    }
  }

  return {
    translated: confidence >= 50,
    confidence,
    details: results
  };
}

async function validateRawFiles() {
  const blogDir = './src/i18n/blog';
  const languages = ['en', 'de', 'es', 'fr', 'ja'];
  
  const postDirs = await fs.readdir(blogDir);
  const posts = postDirs
    .filter(d => d.startsWith('post'))
    .sort((a, b) => parseInt(a.replace('post', '')) - parseInt(b.replace('post', '')));

  console.log('📁 VALIDATING RAW TRANSLATION FILES\n');
  console.log(`Found ${posts.length} blog posts\n`);

  const results = { issues: [], summary: {} };

  for (const lang of languages) {
    results.summary[lang] = { total: posts.length, translated: 0, english: 0, missing: 0 };
  }

  for (const post of posts) {
    const allowedLangs = blogPostLanguageRestrictions[postIdToSlug[post]];
    for (const lang of languages) {
      // Region-specific posts: a missing translation in a language they are not
      // published in is expected, so don't count it as an issue.
      const buildCode = lang === 'ja' ? 'jp' : lang;
      if (allowedLangs && !allowedLangs.includes(buildCode)) {
        continue;
      }
      const filePath = path.join(blogDir, post, `${lang}.js`);

      if (!await fs.pathExists(filePath)) {
        results.summary[lang].missing++;
        results.issues.push({ post, lang, issue: 'FILE_MISSING' });
        continue;
      }

      const content = await fs.readFile(filePath, 'utf8');
      
      // Check for null content
      if (content.includes('content = null') || content.includes('content: null')) {
        results.summary[lang].missing++;
        results.issues.push({ post, lang, issue: 'CONTENT_NULL' });
        continue;
      }

      const check = isProperlyTranslated(content, lang);
      
      if (check.translated) {
        results.summary[lang].translated++;
      } else {
        results.summary[lang].english++;
        results.issues.push({ 
          post, 
          lang, 
          issue: 'ENGLISH_BODY',
          confidence: check.confidence,
          details: check.details
        });
      }
    }
  }

  return results;
}

async function validateBuiltPages() {
  const buildDir = './build';
  const languages = ['en', 'de', 'es', 'fr', 'jp'];  // Note: jp not ja for paths
  
  console.log('\n📄 VALIDATING BUILT HTML PAGES\n');

  if (!await fs.pathExists(buildDir)) {
    console.log('⚠️  Build directory not found. Run `npm run build-static` first.\n');
    return null;
  }

  const results = { issues: [], checked: 0 };
  
  // Check a sample of blog posts in each language
  const samplePosts = ['ai-assessment-crisis-solution', 'virtual-lab-software-guide-2026', 'teachers-are-experts-custom-experiment-designer'];
  
  for (const lang of languages.filter(l => l !== 'en')) {
    for (const slug of samplePosts) {
      const langPrefix = lang === 'en' ? '' : `${lang}/`;
      const pagePath = path.join(buildDir, langPrefix, 'blog', slug, 'index.html');
      
      if (await fs.pathExists(pagePath)) {
        results.checked++;
        const html = await fs.readFile(pagePath, 'utf8');
        
        // Extract visible text from HTML
        const textContent = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .substring(0, 5000);  // First 5000 chars

        const actualLang = lang === 'jp' ? 'ja' : lang;
        const check = isProperlyTranslated(textContent, actualLang);
        
        if (!check.translated) {
          results.issues.push({
            path: `/${langPrefix}blog/${slug}/`,
            lang: actualLang,
            confidence: check.confidence
          });
        }
      }
    }
  }

  return results;
}

async function main() {
  console.log('🔍 BLOG TRANSLATION VALIDATOR\n');
  console.log('='.repeat(60) + '\n');

  // Validate raw files
  const rawResults = await validateRawFiles();

  // Print summary table
  console.log('📊 RAW FILE SUMMARY:\n');
  console.log('Language | Translated | English Body | Missing | Total');
  console.log('---------|------------|--------------|---------|------');
  
  for (const [lang, stats] of Object.entries(rawResults.summary)) {
    const pct = Math.round((stats.translated / stats.total) * 100);
    const status = pct === 100 ? '✅' : pct >= 80 ? '🔶' : '❌';
    console.log(
      `${status} ${lang.toUpperCase().padEnd(5)} | ${String(stats.translated).padEnd(10)} | ${String(stats.english).padEnd(12)} | ${String(stats.missing).padEnd(7)} | ${stats.total}`
    );
  }

  // List issues
  const englishBodyIssues = rawResults.issues.filter(i => i.issue === 'ENGLISH_BODY');
  
  if (englishBodyIssues.length > 0) {
    console.log(`\n⚠️  POSTS WITH ENGLISH BODY IN NON-ENGLISH FILES (${englishBodyIssues.length}):\n`);
    
    // Group by post
    const byPost = {};
    englishBodyIssues.forEach(i => {
      if (!byPost[i.post]) byPost[i.post] = [];
      byPost[i.post].push(i.lang);
    });
    
    Object.entries(byPost).forEach(([post, langs]) => {
      console.log(`   ${post}: ${langs.join(', ')}`);
    });
  }

  // Validate built pages
  const builtResults = await validateBuiltPages();
  
  if (builtResults) {
    console.log(`\nChecked ${builtResults.checked} built pages.`);
    if (builtResults.issues.length > 0) {
      console.log(`\n⚠️  BUILT PAGES WITH TRANSLATION ISSUES:\n`);
      builtResults.issues.forEach(i => {
        console.log(`   ${i.path} (${i.lang}) - ${i.confidence}% confidence`);
      });
    } else {
      console.log('✅ All checked built pages appear properly translated.');
    }
  }

  // Final summary
  const totalIssues = rawResults.issues.length;
  console.log('\n' + '='.repeat(60));
  console.log(`\n📋 TOTAL ISSUES: ${totalIssues}`);
  
  if (totalIssues > 0) {
    console.log('\n💡 To fix: Run translation for posts listed above.');
    process.exit(1);
  } else {
    console.log('\n✅ All translations look good!');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
