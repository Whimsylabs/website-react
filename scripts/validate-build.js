#!/usr/bin/env node

/**
 * Standalone build validation script
 * Usage: node scripts/validate-build.js
 */
const BuildValidator = require('./build-validator.js');

async function main() {
  const buildDir = process.argv[2] || './build';
  const siteUrl = process.argv[3] || 'https://whimsylabs.ai';
  
  console.log(`🔍 Validating build directory: ${buildDir}`);
  console.log(`🌐 Site URL: ${siteUrl}`);
  
  const validator = new BuildValidator(buildDir, siteUrl);
  const result = await validator.validate();
  
  if (result.success) {
    console.log('\\n✅ Build validation passed!');
    process.exit(0);
  } else {
    console.log('\\n❌ Build validation failed!');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Error running validation:', error);
    process.exit(1);
  });
}