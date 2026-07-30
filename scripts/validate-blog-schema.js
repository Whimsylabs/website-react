/**
 * Validate Blog Post Schema in Build Output
 * Ensures all blog posts have proper BlogPosting schema with required fields
 */

const fs = require('fs');
const path = require('path');
const { isRedirectStub } = require('./is-redirect-stub');
const glob = require('glob');

function validateBlogPostSchema(postPath, postName) {
  const html = fs.readFileSync(postPath, 'utf8');
  if (isRedirectStub(html)) {
    return { success: true, post: postName, errors: [] };
  }

  // Extract BlogPosting schema
  const schemaMatch = html.match(/<script type="application\/ld\+json">({.*?"@type":"BlogPosting".*?})<\/script>/);

  if (!schemaMatch) {
    return {
      success: false,
      post: postName,
      errors: ['No BlogPosting schema found']
    };
  }

  let schema;
  try {
    schema = JSON.parse(schemaMatch[1]);
  } catch (error) {
    return {
      success: false,
      post: postName,
      errors: [`Failed to parse schema JSON: ${error.message}`]
    };
  }

  const errors = [];
  const warnings = [];

  // Required fields
  if (!schema['@type'] || schema['@type'] !== 'BlogPosting') {
    errors.push('Invalid @type (should be BlogPosting)');
  }

  if (!schema.headline || typeof schema.headline !== 'string') {
    errors.push('Missing or invalid headline');
  }

  if (!schema.author) {
    errors.push('Missing author');
  } else if (typeof schema.author === 'string') {
    warnings.push('Author is string, should be Person object with @type');
  } else if (schema.author['@type'] !== 'Person') {
    warnings.push('Author missing @type: Person');
  }

  if (!schema.datePublished) {
    errors.push('Missing datePublished');
  } else {
    // Validate ISO 8601 date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}/;
    if (!dateRegex.test(schema.datePublished)) {
      errors.push('datePublished not in ISO 8601 format');
    }
  }

  if (!schema.dateModified) {
    warnings.push('Missing dateModified (recommended)');
  }

  if (!schema.image) {
    errors.push('Missing image');
  } else if (typeof schema.image === 'string') {
    warnings.push('Image is URL string, should be ImageObject with width/height');
  } else if (schema.image['@type'] !== 'ImageObject') {
    warnings.push('Image missing @type: ImageObject');
  } else {
    if (!schema.image.width || !schema.image.height) {
      warnings.push('ImageObject missing width/height');
    }
  }

  if (!schema.publisher) {
    errors.push('Missing publisher');
  } else if (!schema.publisher.logo) {
    warnings.push('Publisher missing logo');
  }

  if (!schema.description) {
    warnings.push('Missing description (recommended)');
  }

  // Check for HTML in text fields
  const htmlRegex = /<[^>]+>/;
  if (schema.headline && htmlRegex.test(schema.headline)) {
    errors.push('Headline contains HTML tags');
  }
  if (schema.description && htmlRegex.test(schema.description)) {
    errors.push('Description contains HTML tags');
  }

  // Check for keywords
  if (!schema.keywords || (Array.isArray(schema.keywords) && schema.keywords.length === 0)) {
    warnings.push('Missing keywords (recommended for SEO)');
  }

  return {
    success: errors.length === 0,
    post: postName,
    errors,
    warnings,
    schema
  };
}

function validateBlogSchema() {
  console.log('🔍 Validating blog post schemas in build output...');

  const buildDir = path.join(__dirname, '..', 'build');

  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run npm run build-static first.');
    return false;
  }

  // Find all blog post HTML files (English and other languages)
  const blogPosts = glob.sync(path.join(buildDir, '**/blog/*/index.html').replace(/\\/g, '/'), {
    ignore: ['**/blog/index.html'] // Exclude blog listing page
  });

  if (blogPosts.length === 0) {
    console.error('❌ No blog posts found in build directory');
    return false;
  }

  console.log(`📄 Found ${blogPosts.length} blog posts to validate\n`);

  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  // Validate each blog post
  blogPosts.forEach(postPath => {
    // Extract post name from path
    const pathParts = postPath.split(path.sep);
    const blogIndex = pathParts.indexOf('blog');
    const postSlug = pathParts[blogIndex + 1];
    const language = pathParts[blogIndex - 1] !== 'build' ? pathParts[blogIndex - 1] : 'en';
    const postName = `${language}/${postSlug}`;

    const result = validateBlogPostSchema(postPath, postName);
    results.push(result);

    if (result.errors.length > 0) {
      totalErrors += result.errors.length;
    }
    if (result.warnings && result.warnings.length > 0) {
      totalWarnings += result.warnings.length;
    }
  });

  // Print results
  console.log('📊 Blog Schema Validation Results:');
  console.log('===================================\n');

  // Group results by success/failure
  const passed = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const withWarnings = results.filter(r => r.warnings && r.warnings.length > 0);

  console.log(`✅ Passed: ${passed.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`⚠️  With warnings: ${withWarnings.length}\n`);

  // Show failures
  if (failed.length > 0) {
    console.log('❌ ERRORS:\n');
    failed.forEach(result => {
      console.log(`  ${result.post}:`);
      result.errors.forEach(error => console.log(`    - ${error}`));
      console.log('');
    });
  }

  // Show warnings (limit to first 10)
  if (withWarnings.length > 0) {
    console.log('⚠️  WARNINGS:\n');
    withWarnings.slice(0, 10).forEach(result => {
      console.log(`  ${result.post}:`);
      result.warnings.forEach(warning => console.log(`    - ${warning}`));
      console.log('');
    });

    if (withWarnings.length > 10) {
      console.log(`  ... and ${withWarnings.length - 10} more posts with warnings\n`);
    }
  }

  // Summary
  console.log('📈 Summary:');
  console.log(`   Total posts: ${results.length}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}\n`);

  if (failed.length === 0) {
    console.log('✅ All blog post schemas are valid!');
    if (totalWarnings > 0) {
      console.log(`⚠️  Consider addressing ${totalWarnings} warnings for better SEO`);
    }
    return true;
  } else {
    console.log('❌ Blog schema validation failed');
    console.log('💡 Fix the errors above and rebuild');
    return false;
  }
}

// Run validation if called directly
if (require.main === module) {
  const success = validateBlogSchema();
  process.exit(success ? 0 : 1);
}

module.exports = validateBlogSchema;
