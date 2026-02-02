/**
 * Validate Review Schema in Build Output
 * Ensures all homepage variants have Review schemas
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../build');

// Pages that SHOULD have Review schemas (all home pages)
const HOME_PAGES = [
  { path: '/index.html', lang: 'en' },
  { path: '/es/index.html', lang: 'es' },
  { path: '/fr/index.html', lang: 'fr' },
  { path: '/de/index.html', lang: 'de' },
  { path: '/jp/index.html', lang: 'ja' }
];

const EXPECTED_REVIEW_COUNT = 3;

function extractSchemas(html) {
  const schemas = [];
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (e) {
      // Invalid JSON
    }
  }
  return schemas;
}

function getReviewSchemas(schemas) {
  return schemas.filter(s => s['@type'] === 'Review');
}

function validateReviewSchema(schema) {
  const errors = [];
  
  if (!schema.itemReviewed) {
    errors.push('Missing itemReviewed');
  }
  if (!schema.reviewRating) {
    errors.push('Missing reviewRating');
  } else {
    if (!schema.reviewRating.ratingValue) {
      errors.push('Missing ratingValue');
    }
  }
  if (!schema.author) {
    errors.push('Missing author');
  }
  if (!schema.reviewBody) {
    errors.push('Missing reviewBody');
  }
  
  return errors;
}

function validateReviews() {
  console.log('\n⭐ Validating Review Schema...\n');

  const results = [];
  let allPassed = true;

  for (const page of HOME_PAGES) {
    const filePath = path.join(BUILD_DIR, page.path);
    
    if (!fs.existsSync(filePath)) {
      results.push({ page: page.path, status: 'missing', error: 'File not found' });
      allPassed = false;
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');
    const schemas = extractSchemas(html);
    const reviews = getReviewSchemas(schemas);

    if (reviews.length === 0) {
      results.push({ page: page.path, status: 'fail', error: 'No Review schemas found' });
      allPassed = false;
      continue;
    }

    if (reviews.length !== EXPECTED_REVIEW_COUNT) {
      results.push({ 
        page: page.path, 
        status: 'warn', 
        error: `Expected ${EXPECTED_REVIEW_COUNT} reviews, found ${reviews.length}` 
      });
    }

    // Validate each review
    let reviewErrors = [];
    reviews.forEach((review, i) => {
      const errors = validateReviewSchema(review);
      if (errors.length > 0) {
        reviewErrors.push(`Review ${i + 1}: ${errors.join(', ')}`);
      }
    });

    if (reviewErrors.length > 0) {
      results.push({ page: page.path, status: 'fail', error: reviewErrors.join('; ') });
      allPassed = false;
    } else {
      results.push({ page: page.path, status: 'pass', count: reviews.length });
    }
  }

  // Report results
  console.log(`📊 Review Schema Validation Results:`);
  console.log(`========================================\n`);

  for (const result of results) {
    const emoji = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️' : '❌';
    console.log(`${emoji} ${result.page}`);
    if (result.error) {
      console.log(`   ${result.error}`);
    } else if (result.count) {
      console.log(`   ${result.count} valid reviews`);
    }
  }

  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail' || r.status === 'missing').length;

  console.log(`\n📊 Summary: ${passed}/${HOME_PAGES.length} passed`);

  if (failed > 0) {
    console.log('\n❌ Review schema validation FAILED!\n');
    process.exit(1);
  }

  console.log('\n✅ Review schema validation passed!\n');
}

validateReviews();
