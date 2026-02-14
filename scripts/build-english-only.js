#!/usr/bin/env node

/**
 * Build script for English-only version (faster for development)
 */

// Set environment variable for English-only build
process.env.BUILD_LANGUAGES = 'en';

// Import and run the main build
const { build } = require('../build.js');

async function buildEnglishOnly() {
  console.log('🇬🇧 Building English-only version...');
  
  try {
    await build();
    console.log('✅ English-only build complete!');
  } catch (error) {
    console.error('❌ English-only build failed:', error);
    process.exit(1);
  }
}

// Run the build if this script is executed directly
if (require.main === module) {
  buildEnglishOnly();
}

module.exports = { buildEnglishOnly };