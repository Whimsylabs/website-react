/**
 * Validate Image Alt Text in Build Output
 * Ensures all images have proper alt text for accessibility and SEO
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function extractImages(html) {
  const images = [];

  // Match <img> tags with various attribute orders
  const imgRegex = /<img([^>]+)>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const imgTag = match[1];

    // Extract src attribute
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
    const src = srcMatch ? srcMatch[1] : null;

    // Extract alt attribute
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : null;
    const hasAlt = altMatch !== null; // Has alt attribute (even if empty)

    // Extract other useful attributes
    const titleMatch = imgTag.match(/title=["']([^"']*)["']/i);
    const ariaLabelMatch = imgTag.match(/aria-label=["']([^"']*)["']/i);
    const roleMatch = imgTag.match(/role=["']([^"']*)["']/i);

    images.push({
      src,
      alt,
      hasAlt,
      title: titleMatch ? titleMatch[1] : null,
      ariaLabel: ariaLabelMatch ? ariaLabelMatch[1] : null,
      role: roleMatch ? roleMatch[1] : null,
      fullTag: match[0]
    });
  }

  return images;
}

function validateImage(image, pageName) {
  const errors = [];
  const warnings = [];
  const info = [];

  // Skip decorative images (role="presentation" or role="none")
  if (image.role === 'presentation' || image.role === 'none') {
    info.push('Decorative image (role="presentation")');
    return { success: true, errors, warnings, info, image };
  }

  // Check if alt attribute exists
  if (!image.hasAlt) {
    errors.push(`Missing alt attribute: ${image.src || 'unknown source'}`);
    return { success: false, errors, warnings, info, image };
  }

  // Check for empty alt on non-decorative images
  if (image.alt === '' && !image.ariaLabel) {
    warnings.push(`Empty alt text (consider role="presentation" if decorative): ${image.src}`);
  }

  // Check alt text quality
  if (image.alt && image.alt.length > 0) {
    const altLower = image.alt.toLowerCase();

    // Check for redundant phrases
    const redundantPhrases = [
      'image of',
      'picture of',
      'photo of',
      'graphic of',
      'icon of',
      'logo of'
    ];

    redundantPhrases.forEach(phrase => {
      if (altLower.startsWith(phrase)) {
        warnings.push(`Alt text starts with redundant phrase "${phrase}": "${image.alt}"`);
      }
    });

    // Check for file extensions in alt text
    if (altLower.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp)$/)) {
      warnings.push(`Alt text contains file extension: "${image.alt}"`);
    }

    // Check for very long alt text (screen readers may truncate)
    if (image.alt.length > 125) {
      warnings.push(`Alt text very long (${image.alt.length} chars, recommend <125): "${image.alt.substring(0, 50)}..."`);
    }

    // Check for suspiciously short alt text (except for logos/icons)
    if (image.alt.length < 3 && !altLower.match(/^(logo|icon|x|ok|\+|-)$/)) {
      warnings.push(`Alt text very short (${image.alt.length} chars): "${image.alt}"`);
    }

    // Check for placeholder text
    const placeholderTexts = ['alt text', 'image', 'picture', 'photo', 'placeholder', 'temp', 'todo'];
    placeholderTexts.forEach(placeholder => {
      if (altLower === placeholder || altLower === `${placeholder}...`) {
        errors.push(`Alt text appears to be placeholder: "${image.alt}"`);
      }
    });

    // Good alt text indicators
    if (image.alt.length >= 10 && image.alt.length <= 125) {
      info.push('Good alt text length');
    }
  }

  // Check for alt vs title redundancy
  if (image.alt && image.title && image.alt === image.title) {
    info.push('Alt and title are identical (consider making title more descriptive)');
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    info,
    image
  };
}

function validateImageAltText() {
  console.log('🔍 Validating image alt text in build output...');

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
  let totalImages = 0;
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

    const images = extractImages(html);
    totalImages += images.length;

    const pageErrors = [];
    const pageWarnings = [];

    images.forEach(image => {
      const result = validateImage(image, pageName);

      if (result.errors.length > 0) {
        pageErrors.push(...result.errors);
      }
      if (result.warnings.length > 0) {
        pageWarnings.push(...result.warnings);
      }
    });

    if (pageErrors.length > 0 || pageWarnings.length > 0 || images.length > 0) {
      results.push({
        page: pageName,
        imageCount: images.length,
        errors: pageErrors,
        warnings: pageWarnings,
        success: pageErrors.length === 0
      });
    }

    totalErrors += pageErrors.length;
    totalWarnings += pageWarnings.length;
  });

  // Print results
  console.log('📊 Image Alt Text Validation Results:');
  console.log('======================================\n');

  const passed = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const withWarnings = results.filter(r => r.warnings.length > 0);

  console.log(`✅ Passed: ${passed.length} pages`);
  console.log(`❌ Failed: ${failed.length} pages`);
  console.log(`⚠️  With warnings: ${withWarnings.length} pages`);
  console.log(`🖼️  Total images checked: ${totalImages}\n`);

  // Show failures (limit to first 15)
  if (failed.length > 0) {
    console.log('❌ ERRORS:\n');
    failed.slice(0, 15).forEach(result => {
      console.log(`  ${result.page} (${result.imageCount} images):`);
      result.errors.slice(0, 5).forEach(error => console.log(`    - ${error}`));
      if (result.errors.length > 5) {
        console.log(`    ... and ${result.errors.length - 5} more errors`);
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
      console.log(`  ${result.page} (${result.imageCount} images):`);
      result.warnings.slice(0, 3).forEach(warning => console.log(`    - ${warning}`));
      if (result.warnings.length > 3) {
        console.log(`    ... and ${result.warnings.length - 3} more warnings`);
      }
      console.log('');
    });
  } else if (withWarnings.length > 10) {
    console.log(`⚠️  ${withWarnings.length} pages have warnings\n`);
  }

  // Summary
  console.log('📈 Summary:');
  console.log(`   Total pages: ${results.length}`);
  console.log(`   Total images: ${totalImages}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);
  console.log(`   Pages with images: ${results.filter(r => r.imageCount > 0).length}\n`);

  if (failed.length === 0) {
    console.log('✅ All images have valid alt text!');
    if (totalWarnings > 0) {
      console.log(`⚠️  Consider addressing ${totalWarnings} warnings for better accessibility`);
    }
    return true;
  } else {
    console.log('❌ Image alt text validation failed');
    console.log('💡 Add alt attributes to images and rebuild');
    console.log('💡 Tip: Use alt="" with role="presentation" for decorative images');
    return false;
  }
}

// Run validation if called directly
if (require.main === module) {
  const success = validateImageAltText();
  process.exit(success ? 0 : 1);
}

module.exports = validateImageAltText;
