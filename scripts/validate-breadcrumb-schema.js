/**
 * Validate Breadcrumb Schema in Build Output
 * Ensures all non-home pages have BreadcrumbList schema
 */

const fs = require('fs');
const path = require('path');
const { isRedirectStub } = require('./is-redirect-stub');
const glob = require('glob');

const BUILD_DIR = path.join(__dirname, '../build');
const SUPPORTED_LANGUAGES = ['en', 'de', 'es', 'fr', 'ja'];

// Pages that should NOT have breadcrumbs (home pages)
const HOME_PAGES = [
  '/index.html',
  '/es/index.html',
  '/fr/index.html',
  '/de/index.html',
  '/jp/index.html'
];

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

function hasBreadcrumbSchema(schemas) {
  return schemas.some(s => s['@type'] === 'BreadcrumbList');
}

function validateBreadcrumbs() {
  console.log('\n🥖 Validating Breadcrumb Schema...\n');

  const htmlFiles = glob.sync(`${BUILD_DIR}/**/index.html`);
  const errors = [];
  const passed = [];
  const skipped = [];

  for (const file of htmlFiles) {
    if (isRedirectStub(fs.readFileSync(file, 'utf8'))) continue; // skip generated redirect stubs
    const relativePath = '/' + path.relative(BUILD_DIR, file).replace(/\\/g, '/');

    // Skip home pages
    if (HOME_PAGES.includes(relativePath)) {
      skipped.push(relativePath);
      continue;
    }

    const html = fs.readFileSync(file, 'utf8');
    const schemas = extractSchemas(html);
    
    if (hasBreadcrumbSchema(schemas)) {
      passed.push(relativePath);
    } else {
      errors.push(relativePath);
    }
  }

  // Report results
  console.log(`📊 Breadcrumb Schema Validation Results:`);
  console.log(`   ✅ Passed: ${passed.length}`);
  console.log(`   ⏭️  Skipped (home pages): ${skipped.length}`);
  console.log(`   ❌ Missing: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n❌ Pages missing BreadcrumbList schema:');
    errors.slice(0, 10).forEach(e => console.log(`   ${e}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more`);
    }
    console.log('\n❌ Breadcrumb validation FAILED!\n');
    process.exit(1);
  }

  console.log('\n✅ Breadcrumb schema validation passed!\n');
}

validateBreadcrumbs();
