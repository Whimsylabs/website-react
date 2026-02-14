/**
 * Validate that all blog post images actually exist
 * Run: node scripts/validate-blog-images.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BUILD_DIR = path.join(__dirname, '../build');
const PUBLIC_DIR = path.join(__dirname, '../public');

console.log('🖼️  Validating blog post images...\n');

let errors = 0;
let warnings = 0;
let checked = 0;

// Find all blog post HTML files
const blogFiles = glob.sync('blog/**/index.html', { cwd: BUILD_DIR, absolute: true });

blogFiles.forEach(htmlFile => {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const relativePath = path.relative(BUILD_DIR, htmlFile);
  
  // Find all image src attributes
  const imgMatches = content.matchAll(/src="(\/images\/[^"]+)"/g);
  
  for (const match of imgMatches) {
    const imgPath = match[1];
    checked++;
    
    // Check if image exists in build folder
    const buildImgPath = path.join(BUILD_DIR, imgPath);
    const publicImgPath = path.join(PUBLIC_DIR, imgPath);
    
    if (!fs.existsSync(buildImgPath)) {
      if (fs.existsSync(publicImgPath)) {
        console.log(`⚠️  ${relativePath}`);
        console.log(`   Image exists in public/ but not in build/: ${imgPath}`);
        warnings++;
      } else {
        console.log(`❌ ${relativePath}`);
        console.log(`   MISSING IMAGE: ${imgPath}`);
        errors++;
      }
    }
  }
});

// Also check the source i18n files for mismatched paths
console.log('\n📂 Checking i18n source files for image references...\n');

const i18nFiles = glob.sync('src/i18n/blog/**/*.js', { cwd: path.join(__dirname, '..'), absolute: true });

i18nFiles.forEach(jsFile => {
  const content = fs.readFileSync(jsFile, 'utf8');
  const relativePath = path.relative(path.join(__dirname, '..'), jsFile);
  
  const imgMatches = content.matchAll(/src="(\/images\/[^"]+)"/g);
  
  for (const match of imgMatches) {
    const imgPath = match[1];
    checked++;
    
    const publicImgPath = path.join(PUBLIC_DIR, imgPath);
    
    if (!fs.existsSync(publicImgPath)) {
      console.log(`❌ ${relativePath}`);
      console.log(`   MISSING IMAGE: ${imgPath}`);
      errors++;
    }
  }
});

// Check Post component files too
const postFiles = glob.sync('src/Components/blog/Post*.js', { cwd: path.join(__dirname, '..'), absolute: true });

postFiles.forEach(jsFile => {
  const content = fs.readFileSync(jsFile, 'utf8');
  const relativePath = path.relative(path.join(__dirname, '..'), jsFile);
  
  const imgMatches = content.matchAll(/src="(\/images\/[^"]+)"/g);
  
  for (const match of imgMatches) {
    const imgPath = match[1];
    checked++;
    
    const publicImgPath = path.join(PUBLIC_DIR, imgPath);
    
    if (!fs.existsSync(publicImgPath)) {
      console.log(`❌ ${relativePath}`);
      console.log(`   MISSING IMAGE: ${imgPath}`);
      errors++;
    }
  }
});

console.log('\n' + '═'.repeat(60));
console.log('📊 BLOG IMAGE VALIDATION SUMMARY');
console.log('═'.repeat(60));
console.log(`   Images checked: ${checked}`);
console.log(`   Errors: ${errors}`);
console.log(`   Warnings: ${warnings}`);
console.log('═'.repeat(60));

if (errors > 0) {
  console.log('❌ BLOG IMAGE VALIDATION FAILED!');
  console.log('   Fix missing images before deploying.');
  process.exit(1);
} else if (warnings > 0) {
  console.log('⚠️  BLOG IMAGE VALIDATION PASSED WITH WARNINGS');
  process.exit(0);
} else {
  console.log('✅ All blog images validated successfully!');
  process.exit(0);
}
