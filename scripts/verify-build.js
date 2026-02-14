const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const colors = require('colors/safe');

// Register babel to handle ES modules in translations
require('@babel/register')({
  ignore: [/node_modules/],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const blogData = require('../src/i18n/blogData.generated.js');

const BUILD_DIR = path.join(__dirname, '../build');
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de'];

console.log('🔍 Starting Static Build Verification...');

if (!fs.existsSync(BUILD_DIR)) {
  console.error('❌ Build directory not found! Run "npm run build-static" first.');
  process.exit(1);
}

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
let errors = [];

function checkFile(filePath, lang, context) {
  totalChecks++;
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${filePath}`);
    failedChecks++;
    errors.push(`[${lang}] Missing file: ${filePath}`);
    return;
  }

  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    // 1. Check Language Attribute
    const htmlLang = $('html').attr('lang');
    if (htmlLang !== lang) {
      console.error(`❌ [${context}] Incorrect lang attribute. Expected: ${lang}, Found: ${htmlLang}`);
      failedChecks++;
      errors.push(`[${context}] Incorrect lang attribute. Expected: ${lang}, Found: ${htmlLang}`);
    } else {
      // console.log(`✅ [${context}] Lang attribute correct`);
    }

    // 2. Check Content Heuristics
    // We check if the title in the HTML matches the expected title from data
    if (context.type === 'blog-post' || context.type === 'static-page') {
      const pageTitle = $('title').text();
      const expectedTitle = context.data.title;
      
      // Simple containment check
      if (!pageTitle.includes(expectedTitle)) {
        console.error(`❌ [${context.slug}] Title mismatch in ${lang}.`);
        console.error(`   Expected to contain: "${expectedTitle}"`);
        console.error(`   Found: "${pageTitle}"`);
        failedChecks++;
        errors.push(`[${context.slug}] Title mismatch in ${lang}`);
      } else {
        passedChecks++;
      }
    } else {
        passedChecks++;
    }

  } catch (e) {
    console.error(`❌ Error processing ${filePath}:`, e.message);
    failedChecks++;
    errors.push(`Error processing ${filePath}: ${e.message}`);
  }
}

// Check Blog Posts
console.log('\nChecking Blog Posts...');
SUPPORTED_LANGUAGES.forEach(lang => {
  const posts = blogData[lang] || [];
  console.log(`\nChecking ${lang.toUpperCase()} Blog Posts (${posts.length} posts)...`);
  
  posts.forEach(post => {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    const filePath = path.join(BUILD_DIR, langPrefix, 'blog', post.slug, 'index.html');
    
    checkFile(filePath, lang, { type: 'blog-post', slug: post.slug, data: post });
  });
});

// Check Static Pages
const { translations } = require('../src/i18n/translations.js');

const STATIC_PAGES = [
  { path: 'faq', key: 'faq', titleKey: 'title' },
  { path: 'privacy', key: 'privacy', titleKey: 'title' }
];

console.log('\nChecking Static Pages...');
SUPPORTED_LANGUAGES.forEach(lang => {
  console.log(`\nChecking ${lang.toUpperCase()} Static Pages...`);
  
  // Check FAQ
  const faqTitle = translations[lang]?.faq?.title;
  if (faqTitle) {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    const filePath = path.join(BUILD_DIR, langPrefix, 'faq', 'index.html');
    checkFile(filePath, lang, { type: 'static-page', slug: 'faq', data: { title: faqTitle } });
  }

  // Check Privacy
  const privacyTitle = translations[lang]?.privacy?.title;
  if (privacyTitle) {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    const filePath = path.join(BUILD_DIR, langPrefix, 'privacy', 'index.html');
    checkFile(filePath, lang, { type: 'static-page', slug: 'privacy', data: { title: privacyTitle } });
  }
});

console.log('\n=============================================');
console.log(`Verification Complete.`);
console.log(`Total Checks: ${totalChecks}`);
console.log(`Passed: ${passedChecks}`);
console.log(`Failed: ${failedChecks}`);
console.log('=============================================');

if (failedChecks > 0) {
  console.error('\n❌ Verification FAILED with the following errors:');
  errors.forEach(e => console.error(` - ${e}`));
  process.exit(1);
} else {
  console.log('\n✅ Verification PASSED!');
  process.exit(0);
}
