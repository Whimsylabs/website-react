/**
 * Comprehensive Schema Validation
 * Validates ALL structured data (JSON-LD) across the entire build
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BUILD_DIR = path.join(__dirname, '../build');

// Expected schemas by page type
const SCHEMA_REQUIREMENTS = {
  home: ['Organization', 'SoftwareApplication', 'Course', 'Review'],
  faq: ['Organization', 'FAQPage', 'BreadcrumbList'],
  features: ['Organization', 'BreadcrumbList'],
  services: ['Organization', 'BreadcrumbList'],
  contact: ['Organization', 'BreadcrumbList'],
  bett: ['Organization', 'Event', 'BreadcrumbList'],
  blog: ['Organization', 'BreadcrumbList'],  // Blog index
  blogPost: ['Organization', 'BlogPosting', 'LearningResource', 'BreadcrumbList'],
  demo: ['Organization', 'BreadcrumbList'],
  privacy: ['Organization', 'BreadcrumbList'],
  default: ['Organization']
};

function extractSchemas(html) {
  const schemas = [];
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (e) {
      schemas.push({ parseError: true, raw: match[1].substring(0, 100) });
    }
  }
  return schemas;
}

function getSchemaTypes(schemas) {
  return schemas.map(s => s['@type']).filter(Boolean);
}

function getPageType(relativePath) {
  // Normalize path
  const normalized = relativePath.replace(/^\//, '').replace(/\/index\.html$/, '').replace(/\\/g, '/');
  
  // Check for language prefix and remove it
  const withoutLang = normalized.replace(/^(es|fr|de|jp)\//, '');
  
  // Home pages
  if (normalized === '' || normalized === 'index.html' || normalized.match(/^(es|fr|de|jp)\/?$/)) {
    return 'home';
  }
  
  // FAQ
  if (withoutLang === 'faq' || withoutLang.startsWith('faq/')) {
    return 'faq';
  }
  
  // Blog post (not index)
  if (withoutLang.match(/^blog\/[^\/]+/) && withoutLang !== 'blog') {
    return 'blogPost';
  }
  
  // Blog index
  if (withoutLang === 'blog') {
    return 'blog';
  }
  
  // Other known pages
  const knownPages = ['features', 'services', 'contact', 'bett', 'demo', 'privacy'];
  for (const page of knownPages) {
    if (withoutLang === page || withoutLang.startsWith(page + '/')) {
      return page;
    }
  }
  
  return 'default';
}

function validateSchemas() {
  console.log('\n📋 Comprehensive Schema Validation\n');
  console.log('='.repeat(50) + '\n');

  const htmlFiles = glob.sync(`${BUILD_DIR}/**/index.html`);
  
  const results = {
    passed: 0,
    warnings: 0,
    failed: 0,
    parseErrors: 0,
    details: []
  };

  const pageTypeCounts = {};
  const missingByType = {};

  for (const file of htmlFiles) {
    const relativePath = '/' + path.relative(BUILD_DIR, file).replace(/\\/g, '/');
    const pageType = getPageType(relativePath);
    const requiredSchemas = SCHEMA_REQUIREMENTS[pageType] || SCHEMA_REQUIREMENTS.default;
    
    pageTypeCounts[pageType] = (pageTypeCounts[pageType] || 0) + 1;

    const html = fs.readFileSync(file, 'utf8');
    const schemas = extractSchemas(html);
    
    // Check for parse errors
    const parseErrors = schemas.filter(s => s.parseError);
    if (parseErrors.length > 0) {
      results.parseErrors++;
      results.details.push({
        path: relativePath,
        status: 'error',
        message: `${parseErrors.length} invalid JSON-LD block(s)`
      });
      continue;
    }

    const foundTypes = getSchemaTypes(schemas);
    const missing = requiredSchemas.filter(req => !foundTypes.includes(req));
    
    if (missing.length === 0) {
      results.passed++;
    } else if (missing.length === 1 && missing[0] === 'BreadcrumbList') {
      // Breadcrumb-only missing is a warning
      results.warnings++;
      results.details.push({
        path: relativePath,
        status: 'warn',
        message: `Missing: ${missing.join(', ')}`
      });
    } else {
      results.failed++;
      results.details.push({
        path: relativePath,
        status: 'fail',
        message: `Missing: ${missing.join(', ')}`,
        pageType
      });
      
      // Track missing schemas by type
      missing.forEach(m => {
        missingByType[m] = (missingByType[m] || 0) + 1;
      });
    }
  }

  // Report page type distribution
  console.log('📊 Page Types Detected:');
  Object.entries(pageTypeCounts).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`   ${type}: ${count} pages`);
  });

  // Report results
  console.log('\n📊 Schema Validation Results:');
  console.log('=' .repeat(40));
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ⚠️  Warnings: ${results.warnings}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   🔴 Parse errors: ${results.parseErrors}`);

  if (Object.keys(missingByType).length > 0) {
    console.log('\n📉 Most Common Missing Schemas:');
    Object.entries(missingByType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} pages`);
    });
  }

  // Show first few failures
  const failures = results.details.filter(d => d.status === 'fail');
  if (failures.length > 0) {
    console.log('\n❌ Sample Failures:');
    failures.slice(0, 5).forEach(f => {
      console.log(`   ${f.path} (${f.pageType})`);
      console.log(`      ${f.message}`);
    });
    if (failures.length > 5) {
      console.log(`   ... and ${failures.length - 5} more`);
    }
  }

  // Show warnings
  const warnings = results.details.filter(d => d.status === 'warn');
  if (warnings.length > 0 && warnings.length <= 5) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(w => {
      console.log(`   ${w.path}: ${w.message}`);
    });
  }

  // Final verdict
  if (results.failed > 0 || results.parseErrors > 0) {
    console.log('\n❌ Schema validation FAILED!\n');
    process.exit(1);
  }

  console.log('\n✅ Schema validation passed!\n');
}

validateSchemas();
