/**
 * Validate Meta Descriptions in Build Output
 * Ensures all pages have properly optimized meta descriptions
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// English/Western language requirements
const OPTIMAL_MIN_LENGTH = 155;
const OPTIMAL_MAX_LENGTH = 160;
const ABSOLUTE_MIN_LENGTH = 120;
const ABSOLUTE_MAX_LENGTH = 320; // Google truncates at ~320 chars

// Japanese language requirements (characters convey more meaning)
const JP_OPTIMAL_MIN_LENGTH = 80;
const JP_OPTIMAL_MAX_LENGTH = 120;
const JP_ABSOLUTE_MIN_LENGTH = 60;
const JP_ABSOLUTE_MAX_LENGTH = 140; // Google displays ~120 chars for Japanese

function extractMetaDescription(html) {
  // Try multiple patterns for meta description
  const patterns = [
    /<meta name="description" content="([^"]+)">/i,
    /<meta property="og:description" content="([^"]+)">/i,
    /<meta name="twitter:description" content="([^"]+)">/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function validateDescription(description, pageName) {
  const errors = [];
  const warnings = [];
  const info = [];

  if (!description) {
    errors.push('Missing meta description');
    return { success: false, errors, warnings, info, description: null, length: 0 };
  }

  const length = description.length;

  // Detect if this is a Japanese page
  const isJapanese = pageName.includes('jp\\') || pageName.includes('jp/');

  // Use appropriate length requirements based on language
  const optimalMin = isJapanese ? JP_OPTIMAL_MIN_LENGTH : OPTIMAL_MIN_LENGTH;
  const optimalMax = isJapanese ? JP_OPTIMAL_MAX_LENGTH : OPTIMAL_MAX_LENGTH;
  const absoluteMin = isJapanese ? JP_ABSOLUTE_MIN_LENGTH : ABSOLUTE_MIN_LENGTH;
  const absoluteMax = isJapanese ? JP_ABSOLUTE_MAX_LENGTH : ABSOLUTE_MAX_LENGTH;

  // Check length
  if (length < absoluteMin) {
    errors.push(`Description too short (${length} chars, minimum ${absoluteMin})`);
  } else if (length < optimalMin) {
    warnings.push(`Description shorter than optimal (${length} chars, recommend ${optimalMin}-${optimalMax})`);
  }

  if (length > absoluteMax) {
    errors.push(`Description too long (${length} chars, maximum ${absoluteMax}, Google truncates)`);
  } else if (length > optimalMax) {
    warnings.push(`Description longer than optimal (${length} chars, recommend ${optimalMin}-${optimalMax})`);
  }

  // Check for duplicate punctuation
  if (description.match(/\.\.+/)) {
    warnings.push('Contains multiple consecutive periods');
  }

  // Check for poor quality indicators
  if (description.toLowerCase().includes('lorem ipsum')) {
    errors.push('Contains placeholder text (Lorem Ipsum)');
  }

  // Check for call-to-action presence (good practice)
  const ctaWords = ['discover', 'learn', 'explore', 'get', 'try', 'see', 'find', 'join', 'book', 'visit', 'contact'];
  const hasCTA = ctaWords.some(word => description.toLowerCase().includes(word));
  if (!hasCTA) {
    info.push('Consider adding a call-to-action word (discover, learn, try, etc.)');
  }

  // Check for keyword stuffing (repeated words)
  const words = description.toLowerCase().split(/\s+/);
  const wordCounts = {};
  words.forEach(word => {
    if (word.length > 4) { // Only count meaningful words
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });

  const repeatedWords = Object.entries(wordCounts).filter(([word, count]) => count > 3);
  if (repeatedWords.length > 0) {
    warnings.push(`Possible keyword stuffing: "${repeatedWords.map(([w]) => w).join('", "')}" repeated 3+ times`);
  }

  // Check for optimal length (sweet spot)
  if (length >= optimalMin && length <= optimalMax) {
    info.push(isJapanese ? 'Optimal length for Japanese ✓' : 'Optimal length ✓');
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    info,
    description,
    length
  };
}

function validateMetaDescriptions() {
  console.log('🔍 Validating meta descriptions in build output...');

  const buildDir = path.join(__dirname, '..', 'build');

  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run npm run build-static first.');
    return false;
  }

  // Find all HTML files
  const htmlFiles = glob.sync(path.join(buildDir, '**/index.html').replace(/\\/g, '/'));

  if (htmlFiles.length === 0) {
    console.error('❌ No HTML files found in build directory');
    return false;
  }

  console.log(`📄 Found ${htmlFiles.length} HTML files to validate\n`);

  const results = [];
  const descriptionMap = new Map(); // Track duplicates
  let totalErrors = 0;
  let totalWarnings = 0;

  // Validate each HTML file
  htmlFiles.forEach(filePath => {
    const html = fs.readFileSync(filePath, 'utf8');

    // Extract page name from path
    const relativePath = path.relative(buildDir, path.dirname(filePath));
    const pagePath = '/' + relativePath.replace(/\\/g, '/') + '/';
    const normalizedPath = pagePath.replace(/\/+/g, '/');
    const pageName = normalizedPath === '/' ? 'Homepage' : normalizedPath;

    const description = extractMetaDescription(html);
    const result = validateDescription(description, pageName);

    // Track duplicates
    if (description) {
      if (descriptionMap.has(description)) {
        descriptionMap.get(description).push(pageName);
      } else {
        descriptionMap.set(description, [pageName]);
      }
    }

    results.push({
      page: pageName,
      ...result
    });

    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  });

  // Check for duplicate descriptions
  const duplicates = Array.from(descriptionMap.entries())
    .filter(([desc, pages]) => pages.length > 1)
    .sort((a, b) => b[1].length - a[1].length);

  // Print results
  console.log('📊 Meta Description Validation Results:');
  console.log('========================================\n');

  const passed = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const withWarnings = results.filter(r => r.warnings.length > 0);

  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`⚠️  With warnings: ${withWarnings.length}`);
  console.log(`🔄 Duplicate descriptions: ${duplicates.length}\n`);

  // Show failures (limit to first 15)
  if (failed.length > 0) {
    console.log('❌ ERRORS:\n');
    failed.slice(0, 15).forEach(result => {
      console.log(`  ${result.page} (${result.length} chars):`);
      result.errors.forEach(error => console.log(`    - ${error}`));
      if (result.description) {
        console.log(`    "${result.description.substring(0, 100)}${result.description.length > 100 ? '...' : ''}"`);
      }
      console.log('');
    });

    if (failed.length > 15) {
      console.log(`  ... and ${failed.length - 15} more pages with errors\n`);
    }
  }

  // Show warnings (limit to first 10)
  if (withWarnings.length > 0 && withWarnings.length <= 10) {
    console.log('⚠️  WARNINGS:\n');
    withWarnings.forEach(result => {
      console.log(`  ${result.page} (${result.length} chars):`);
      result.warnings.forEach(warning => console.log(`    - ${warning}`));
      console.log('');
    });
  } else if (withWarnings.length > 10) {
    console.log(`⚠️  ${withWarnings.length} pages have warnings\n`);
  }

  // Show duplicate descriptions
  if (duplicates.length > 0) {
    console.log('🔄 DUPLICATE DESCRIPTIONS:\n');
    duplicates.slice(0, 5).forEach(([description, pages]) => {
      console.log(`  Used on ${pages.length} pages (${description.length} chars):`);
      console.log(`    "${description.substring(0, 80)}${description.length > 80 ? '...' : ''}"`);
      pages.slice(0, 3).forEach(page => console.log(`    - ${page}`));
      if (pages.length > 3) {
        console.log(`    ... and ${pages.length - 3} more pages`);
      }
      console.log('');
    });

    if (duplicates.length > 5) {
      console.log(`  ... and ${duplicates.length - 5} more duplicate descriptions\n`);
    }
  }

  // Summary
  console.log('📈 Summary:');
  console.log(`   Total pages: ${results.length}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);
  console.log(`   Duplicate descriptions: ${duplicates.length}`);
  console.log(`   Optimal length (${OPTIMAL_MIN_LENGTH}-${OPTIMAL_MAX_LENGTH} chars): ${results.filter(r => r.length >= OPTIMAL_MIN_LENGTH && r.length <= OPTIMAL_MAX_LENGTH).length}\n`);

  if (failed.length === 0) {
    console.log('✅ All meta descriptions are valid!');
    if (totalWarnings > 0 || duplicates.length > 0) {
      console.log(`⚠️  Consider addressing ${totalWarnings} warnings and ${duplicates.length} duplicate descriptions`);
    }
    return true;
  } else {
    console.log('❌ Meta description validation failed');
    console.log('💡 Fix the errors in page metadata and rebuild');
    return false;
  }
}

// Run validation if called directly
if (require.main === module) {
  const success = validateMetaDescriptions();
  process.exit(success ? 0 : 1);
}

module.exports = validateMetaDescriptions;
