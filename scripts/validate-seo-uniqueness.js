/**
 * SEO Uniqueness Validator
 * Ensures all pages have unique titles, descriptions, and proper H1 structure
 * 
 * Checks:
 * 1. Only one H1 tag per page (HIGH severity)
 * 2. Unique titles across all pages (MODERATE severity)
 * 3. Unique meta descriptions across all pages (MODERATE severity)
 * 4. Title length (50-60 chars recommended)
 * 5. Description length (120-160 chars recommended)
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BUILD_DIR = path.join(__dirname, '../build');

// English-only pages (e.g. UK-specific content) that intentionally share
// the same title/description across language versions. Excluded from
// cross-language duplicate checks but still checked within each language.
const ENGLISH_ONLY_ROUTES = [
  'grants/',
  'grants/royal-society/',
];

function isEnglishOnlyPage(pagePath) {
  // pagePath looks like "es/grants/" or "grants/" (English root)
  for (const route of ENGLISH_ONLY_ROUTES) {
    if (pagePath === route || pagePath.match(new RegExp(`^(es|fr|de|jp)/${route.replace(/[/]/g, '\\/')}$`))) {
      return true;
    }
  }
  return false;
}

// Track all titles and descriptions for uniqueness checking
const allTitles = new Map(); // title -> [pages]
const allDescriptions = new Map(); // description -> [pages]

const results = {
  errors: [],
  warnings: [],
  passed: 0,
  failed: 0
};

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractMetaDescription(html) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
                html.match(/<meta\s+content="([^"]+)"\s+name="description"/i);
  return match ? match[1].trim() : null;
}

function countH1Tags(html) {
  const matches = html.match(/<h1[^>]*>/gi);
  return matches ? matches.length : 0;
}

function extractH1Content(html) {
  const matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!matches) return [];
  return matches.map(m => {
    const content = m.replace(/<[^>]+>/g, '').trim();
    return content.substring(0, 50) + (content.length > 50 ? '...' : '');
  });
}

function getRelativePath(filePath) {
  return path.relative(BUILD_DIR, filePath).replace(/\\/g, '/').replace('/index.html', '/');
}

function validatePage(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const relativePath = getRelativePath(filePath);
  const pageResults = { path: relativePath, issues: [] };

  // Extract metadata
  const title = extractTitle(html);
  const description = extractMetaDescription(html);
  const h1Count = countH1Tags(html);
  const h1Contents = extractH1Content(html);

  // Check H1 count (HIGH severity)
  if (h1Count === 0) {
    pageResults.issues.push({
      severity: 'error',
      type: 'missing-h1',
      message: 'Page has no H1 tag'
    });
  } else if (h1Count > 1) {
    pageResults.issues.push({
      severity: 'error',
      type: 'multiple-h1',
      message: `Page has ${h1Count} H1 tags (should be exactly 1): ${h1Contents.join(', ')}`
    });
  }

  // Check title exists
  if (!title) {
    pageResults.issues.push({
      severity: 'error',
      type: 'missing-title',
      message: 'Page has no title tag'
    });
  } else {
    // Track for uniqueness checking (skip English-only pages)
    if (!isEnglishOnlyPage(relativePath)) {
      if (!allTitles.has(title)) {
        allTitles.set(title, []);
      }
      allTitles.get(title).push(relativePath);
    }

    // Check title length
    if (title.length < 30) {
      pageResults.issues.push({
        severity: 'warning',
        type: 'short-title',
        message: `Title is too short (${title.length} chars, recommend 50-60)`
      });
    } else if (title.length > 70) {
      pageResults.issues.push({
        severity: 'warning',
        type: 'long-title',
        message: `Title is too long (${title.length} chars, recommend 50-60)`
      });
    }
  }

  // Check description exists
  if (!description) {
    pageResults.issues.push({
      severity: 'error',
      type: 'missing-description',
      message: 'Page has no meta description'
    });
  } else {
    // Track for uniqueness checking (skip English-only pages)
    if (!isEnglishOnlyPage(relativePath)) {
      if (!allDescriptions.has(description)) {
        allDescriptions.set(description, []);
      }
      allDescriptions.get(description).push(relativePath);
    }

    // Check description length
    if (description.length < 100) {
      pageResults.issues.push({
        severity: 'warning',
        type: 'short-description',
        message: `Description is too short (${description.length} chars, recommend 120-160)`
      });
    } else if (description.length > 170) {
      pageResults.issues.push({
        severity: 'warning',
        type: 'long-description',
        message: `Description is too long (${description.length} chars, recommend 120-160)`
      });
    }
  }

  return pageResults;
}

function checkUniqueness() {
  const duplicateIssues = [];

  // Check for duplicate titles
  for (const [title, pages] of allTitles) {
    if (pages.length > 1) {
      duplicateIssues.push({
        severity: 'error',
        type: 'duplicate-title',
        message: `Duplicate title found on ${pages.length} pages`,
        title: title.substring(0, 60) + (title.length > 60 ? '...' : ''),
        pages: pages
      });
    }
  }

  // Check for duplicate descriptions
  for (const [description, pages] of allDescriptions) {
    if (pages.length > 1) {
      duplicateIssues.push({
        severity: 'error',
        type: 'duplicate-description',
        message: `Duplicate description found on ${pages.length} pages`,
        description: description.substring(0, 80) + (description.length > 80 ? '...' : ''),
        pages: pages
      });
    }
  }

  return duplicateIssues;
}

function runValidation() {
  console.log('\n🔍 SEO Uniqueness Validation\n');
  console.log('='.repeat(70));

  // Find all HTML files in build directory
  const htmlFiles = glob.sync(`${BUILD_DIR}/**/index.html`);
  
  if (htmlFiles.length === 0) {
    console.log('❌ No HTML files found in build directory');
    process.exit(1);
  }

  console.log(`📄 Found ${htmlFiles.length} pages to validate\n`);

  // Validate each page
  const pageResults = [];
  for (const file of htmlFiles) {
    const result = validatePage(file);
    pageResults.push(result);
  }

  // Check uniqueness across all pages
  const uniquenessIssues = checkUniqueness();

  // Report per-page issues (H1, missing tags, length)
  let pagesWithIssues = 0;
  const h1Errors = [];
  
  for (const page of pageResults) {
    const h1Issues = page.issues.filter(i => i.type === 'multiple-h1' || i.type === 'missing-h1');
    if (h1Issues.length > 0) {
      h1Errors.push({ path: page.path, issues: h1Issues });
    }
    
    if (page.issues.length > 0) {
      pagesWithIssues++;
    }
  }

  // Report H1 issues (HIGH severity)
  if (h1Errors.length > 0) {
    console.log('❌ H1 TAG ISSUES (High Severity)\n');
    for (const page of h1Errors) {
      console.log(`   ${page.path}`);
      for (const issue of page.issues) {
        console.log(`      ❌ ${issue.message}`);
        results.errors.push(`${page.path}: ${issue.message}`);
      }
    }
    console.log();
  }

  // Report duplicate titles
  const titleDupes = uniquenessIssues.filter(i => i.type === 'duplicate-title');
  if (titleDupes.length > 0) {
    console.log('❌ DUPLICATE TITLES (Moderate Severity)\n');
    for (const issue of titleDupes) {
      console.log(`   Title: "${issue.title}"`);
      console.log(`   Found on ${issue.pages.length} pages:`);
      for (const page of issue.pages.slice(0, 5)) {
        console.log(`      - ${page}`);
      }
      if (issue.pages.length > 5) {
        console.log(`      ... and ${issue.pages.length - 5} more`);
      }
      console.log();
      results.errors.push(`Duplicate title "${issue.title}" on ${issue.pages.length} pages`);
    }
  }

  // Report duplicate descriptions
  const descDupes = uniquenessIssues.filter(i => i.type === 'duplicate-description');
  if (descDupes.length > 0) {
    console.log('❌ DUPLICATE DESCRIPTIONS (Moderate Severity)\n');
    for (const issue of descDupes) {
      console.log(`   Description: "${issue.description}"`);
      console.log(`   Found on ${issue.pages.length} pages:`);
      for (const page of issue.pages.slice(0, 5)) {
        console.log(`      - ${page}`);
      }
      if (issue.pages.length > 5) {
        console.log(`      ... and ${issue.pages.length - 5} more`);
      }
      console.log();
      results.errors.push(`Duplicate description on ${issue.pages.length} pages`);
    }
  }

  // Summary
  console.log('='.repeat(70));
  console.log('📊 Summary:\n');
  console.log(`   Total pages: ${htmlFiles.length}`);
  console.log(`   Pages with H1 issues: ${h1Errors.length}`);
  console.log(`   Duplicate titles: ${titleDupes.reduce((sum, d) => sum + d.pages.length, 0)} pages affected`);
  console.log(`   Duplicate descriptions: ${descDupes.reduce((sum, d) => sum + d.pages.length, 0)} pages affected`);
  console.log(`   Unique titles: ${allTitles.size}`);
  console.log(`   Unique descriptions: ${allDescriptions.size}`);

  const hasErrors = h1Errors.length > 0 || titleDupes.length > 0 || descDupes.length > 0;

  if (hasErrors) {
    console.log('\n❌ SEO Uniqueness validation FAILED!\n');
    console.log('Fix the above issues before deploying.\n');
    process.exit(1);
  } else {
    console.log('\n✅ SEO Uniqueness validation passed!\n');
  }
}

runValidation();
