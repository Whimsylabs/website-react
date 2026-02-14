/**
 * Validate FAQ Schema in Build Output
 * Ensures the FAQ page has proper schema markup with all questions
 */

const fs = require('fs');
const path = require('path');

function validateFAQPage(pagePath, language) {
  // Read FAQ page HTML
  const html = fs.readFileSync(pagePath, 'utf8');

  // Extract FAQ schema
  const schemaMatch = html.match(/<script type="application\/ld\+json">({.*?"@type":"FAQPage".*?})<\/script>/);

  if (!schemaMatch) {
    console.error(`❌ No FAQPage schema found in ${language} FAQ page`);
    return { success: false, language, questionCount: 0 };
  }

  let schema;
  try {
    schema = JSON.parse(schemaMatch[1]);
  } catch (error) {
    console.error(`❌ Failed to parse ${language} FAQ schema JSON:`, error.message);
    return { success: false, language, questionCount: 0 };
  }

  // Validate schema structure
  if (!schema['@type'] || schema['@type'] !== 'FAQPage') {
    console.error(`❌ Invalid ${language} schema type:`, schema['@type']);
    return { success: false, language, questionCount: 0 };
  }

  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    console.error(`❌ ${language} FAQ schema missing mainEntity array`);
    return { success: false, language, questionCount: 0 };
  }

  const questionCount = schema.mainEntity.length;

  // Minimum expected count (should have at least 30 FAQs)
  const minimumExpectedCount = 30;

  // Validate each question has required fields
  let hasErrors = false;
  let questionsWithIssues = [];

  schema.mainEntity.forEach((item, index) => {
    if (!item['@type'] || item['@type'] !== 'Question') {
      questionsWithIssues.push(`Question ${index + 1}: Invalid @type`);
      hasErrors = true;
    }

    if (!item.name || typeof item.name !== 'string' || item.name.trim() === '') {
      questionsWithIssues.push(`Question ${index + 1}: Missing or invalid name`);
      hasErrors = true;
    }

    if (!item.acceptedAnswer || item.acceptedAnswer['@type'] !== 'Answer') {
      questionsWithIssues.push(`Question ${index + 1}: Missing or invalid acceptedAnswer`);
      hasErrors = true;
    }

    if (!item.acceptedAnswer?.text || typeof item.acceptedAnswer.text !== 'string' || item.acceptedAnswer.text.trim() === '') {
      questionsWithIssues.push(`Question ${index + 1}: Missing or invalid answer text`);
      hasErrors = true;
    }

    // Check for HTML tags (should be stripped)
    if (item.name.match(/<[^>]*>/)) {
      questionsWithIssues.push(`Question ${index + 1}: Question contains HTML tags`);
      hasErrors = true;
    }

    if (item.acceptedAnswer?.text?.match(/<[^>]*>/)) {
      questionsWithIssues.push(`Question ${index + 1}: Answer contains HTML tags`);
      hasErrors = true;
    }
  });

  // Check if count meets minimum
  if (questionCount < minimumExpectedCount) {
    hasErrors = true;
  }

  // Warn if only 1 question (common bug)
  if (questionCount === 1) {
    hasErrors = true;
  }

  return {
    success: !hasErrors && questionCount >= minimumExpectedCount,
    language,
    questionCount,
    minimumExpectedCount,
    questionsWithIssues,
    firstQuestion: questionCount > 0 ? schema.mainEntity[0].name : null,
    lastQuestion: questionCount > 1 ? schema.mainEntity[questionCount - 1].name : null
  };
}

function validateFAQSchema() {
  console.log('🔍 Validating FAQ schema in build output...');

  const buildDir = path.join(__dirname, '..', 'build');

  // Check if build exists
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run npm run build-static first.');
    return false;
  }

  // Languages to check (English at root, others with prefix)
  const languages = [
    { code: 'en', path: path.join(buildDir, 'faq', 'index.html') },
    { code: 'de', path: path.join(buildDir, 'de', 'faq', 'index.html') },
    { code: 'es', path: path.join(buildDir, 'es', 'faq', 'index.html') },
    { code: 'fr', path: path.join(buildDir, 'fr', 'faq', 'index.html') },
    { code: 'jp', path: path.join(buildDir, 'jp', 'faq', 'index.html') }
  ];

  const results = [];
  let allPassed = true;

  // Validate each language
  for (const { code, path: faqPath } of languages) {
    if (!fs.existsSync(faqPath)) {
      console.log(`⚠️  ${code.toUpperCase()} FAQ page not found (${faqPath})`);
      continue;
    }

    const result = validateFAQPage(faqPath, code.toUpperCase());
    results.push(result);

    if (!result.success) {
      allPassed = false;
    }
  }

  // Print summary
  console.log(`\n📊 FAQ Schema Validation Results:`);
  console.log(`================================`);

  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${result.language}: ${result.questionCount} questions`);

    if (result.questionCount < result.minimumExpectedCount) {
      console.log(`   ⚠️  Expected at least ${result.minimumExpectedCount} questions`);
    }

    if (result.questionCount === 1) {
      console.log(`   ⚠️  Only 1 question - metadata-injector.js may not be loading FAQs correctly`);
    }

    if (result.questionsWithIssues && result.questionsWithIssues.length > 0) {
      console.log(`   ⚠️  ${result.questionsWithIssues.length} questions have formatting issues`);
    }
  });

  if (allPassed && results.length > 0) {
    console.log(`\n✅ All FAQ schemas passed validation!`);
    console.log(`   Total pages validated: ${results.length}`);
    return true;
  } else if (results.length === 0) {
    console.error(`\n❌ No FAQ pages found to validate`);
    return false;
  } else {
    console.error(`\n❌ Some FAQ schemas failed validation`);
    return false;
  }
}

// Run validation if called directly
if (require.main === module) {
  const success = validateFAQSchema();
  process.exit(success ? 0 : 1);
}

module.exports = validateFAQSchema;
