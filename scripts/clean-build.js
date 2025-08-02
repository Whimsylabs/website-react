#!/usr/bin/env node

/**
 * Clean build script that handles Windows file locking issues
 */

const fs = require('fs-extra');
const path = require('path');

async function cleanBuild() {
  const buildDir = './build';
  
  console.log('🧹 Cleaning build directory...');
  
  try {
    if (await fs.pathExists(buildDir)) {
      // Try to remove the directory
      await fs.remove(buildDir);
      console.log('✅ Build directory cleaned successfully');
    } else {
      console.log('ℹ️ Build directory does not exist');
    }
    
    // Create fresh build directory
    await fs.ensureDir(buildDir);
    console.log('✅ Fresh build directory created');
    
  } catch (error) {
    if (error.code === 'EPERM' || error.code === 'EBUSY') {
      console.error('❌ File permission error - some files are locked');
      console.log('💡 Try these solutions:');
      console.log('   1. Close all browsers and file explorers');
      console.log('   2. Close any editors with build files open');
      console.log('   3. Wait a moment and try again');
      console.log('   4. Manually delete the build folder in Windows Explorer');
    } else {
      console.error('❌ Error cleaning build:', error.message);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  cleanBuild();
}

module.exports = { cleanBuild };