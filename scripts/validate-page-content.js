/**
 * Validate that all pages have correct content rendered
 * 
 * Critical checks:
 * - Every page actually rendered (not empty/error pages)
 * - Expected content sections are present
 * - No placeholder/debug text leaked through
 * - Translations loaded (no raw i18n keys visible)
 * - Navigation and footer present
 * - No JavaScript errors in SSR output
 * - Blog posts contain actual content from the source (title verification)
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

// Load blog post metadata from blogData.generated.js (the source of truth for rendered content)
let blogPostsMetadata = {};
try {
  const blogDataPath = path.join(__dirname, '..', 'src', 'i18n', 'blogData.generated.js');
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
  
  // Parse the English posts from the generated data
  // Format: { "id": "postN", "slug": "...", "title": "...", "description": "..." }
  const postRegex = /"id":\s*"post\d+",\s*"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"description":\s*"([^"]*)"/g;
  let match;
  while ((match = postRegex.exec(blogDataContent)) !== null) {
    const slug = match[1];
    const title = match[2];
    const description = match[3];
    
    // Only add if not already present (first occurrence is English)
    if (!blogPostsMetadata[slug]) {
      blogPostsMetadata[slug] = {
        title: title,
        description: description,
        keyPhrases: extractKeyPhrases(title)
      };
    }
  }
  console.log(`📚 Loaded metadata for ${Object.keys(blogPostsMetadata).length} blog posts`);
} catch (e) {
  console.warn('⚠️ Could not load blog post metadata:', e.message);
}

/**
 * Extract key phrases from a title for content verification
 * Returns words/phrases that should appear in the rendered content
 */
function extractKeyPhrases(title) {
  if (!title) return [];
  
  // Remove common words and extract significant terms
  const stopWords = ['a', 'an', 'the', 'of', 'to', 'and', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'how', 'why', 'what', 'our', 'is', 'are', 'was', 'were'];
  const words = title.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.includes(w));
  
  // Return first few significant words as key phrases
  return words.slice(0, 4);
}

// Expected content patterns per page type
const PAGE_EXPECTATIONS = {
  // Homepage / Landing
  '/': {
    requiredText: ['WhimsyLabs', 'virtual lab'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined', 'null', 'NaN', '[object Object]', 'Error:', 'Loading...'],
    minLength: 5000, // Homepage should have substantial content
  },
  '/blog': {
    requiredText: ['Blog', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer', 'post-preview'],
    forbiddenText: ['undefined', 'null', 'Loading posts...'],
    minLength: 3000,
  },
  '/blog/*': {
    requiredText: [],  // Don't require specific text - content loads client-side
    requiredElements: ['nav', 'footer', 'post-content', 'post-title'],
    forbiddenText: ['undefined', 'null', 'Post not found', 'Error loading'],
    forbiddenPatterns: [/&lt;(p|div|h[1-6]|a|img|ul|li)(&gt;|\s)/g], // Escaped HTML tags = render bug!
    minLength: 1500,  // Lower threshold - blog content loads client-side, just need shell
    verifyBlogContent: true, // Verify blog title appears in rendered HTML
  },
  '/features': {
    requiredText: ['feature', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined', 'null'],
    minLength: 2000,
  },
  '/services': {
    requiredText: ['service', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined', 'null'],
    minLength: 2000,
  },
  '/faq': {
    requiredText: ['FAQ', 'question'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined', 'null'],
    minLength: 2000,
  },
  '/contact': {
    requiredText: ['contact', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer', 'form'],
    forbiddenText: ['undefined', 'null'],
    minLength: 1500,
  },
  '/privacy': {
    requiredText: ['privacy', 'data'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined', 'null'],
    minLength: 1500,
  },
  '/bett': {
    requiredText: ['BETT', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined', 'null'],
    minLength: 1500,
  },
};

// Common forbidden patterns (appear on ANY page = failure)
const GLOBAL_FORBIDDEN_PATTERNS = [
  /\{\{.*?\}\}/g,                    // Mustache-style placeholders
  /\{\s*t\(['"]/g,                   // Untranslated t() calls
  /translation\..*?\.missing/gi,     // i18next missing key markers
  /<script>.*?error.*?<\/script>/gi, // Script errors
  /class="error-boundary"/gi,        // React error boundary triggered
  /Something went wrong/gi,          // Generic error message
  /Cannot read propert/gi,           // JS errors
  /is not defined/gi,                // Undefined variable errors
  /Uncaught.*Error/gi,               // Uncaught exceptions
];

// Languages to check
const LANGUAGES = ['en', 'es', 'fr', 'de', 'jp'];
const DEFAULT_LANG = 'en';

function validatePageContent() {
  console.log('🔍 Validating page content...\n');

  if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Run npm run build-static first.');
    process.exit(1);
  }

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: [],
    warnings_list: [],
  };

  // Get all HTML files
  const htmlFiles = findHtmlFiles(BUILD_DIR);
  console.log(`📄 Found ${htmlFiles.length} HTML files to validate\n`);

  for (const file of htmlFiles) {
    const relativePath = path.relative(BUILD_DIR, file);
    const result = validateFile(file, relativePath);

    if (result.passed) {
      results.passed++;
      console.log(`✅ ${relativePath}`);
    } else {
      results.failed++;
      console.log(`❌ ${relativePath}`);
      result.errors.forEach(e => {
        console.log(`   - ${e}`);
        results.errors.push(`${relativePath}: ${e}`);
      });
    }

    if (result.warnings.length > 0) {
      results.warnings += result.warnings.length;
      result.warnings.forEach(w => {
        console.log(`   ⚠️ ${w}`);
        results.warnings_list.push(`${relativePath}: ${w}`);
      });
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Content Validation Summary:');
  console.log(`   Total pages: ${htmlFiles.length}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   ⚠️ Warnings: ${results.warnings}`);

  if (results.failed > 0) {
    console.log('\n❌ VALIDATION FAILED');
    console.log('The following pages have content issues:\n');
    results.errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  }

  console.log('\n✅ All pages passed content validation!');
  return true;
}

// Directories to skip (legacy/special purpose)
const SKIP_DIRECTORIES = ['static', 'images', 'videos', 'demo', 'spa', 'js'];

function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip static assets and legacy directories
      if (!SKIP_DIRECTORIES.includes(item)) {
        findHtmlFiles(fullPath, files);
      }
    } else if (item.endsWith('.html') && item !== '404.html') {
      files.push(fullPath);
    }
  }

  return files;
}

function validateFile(filePath, relativePath) {
  const errors = [];
  const warnings = [];

  const html = fs.readFileSync(filePath, 'utf8');

  // Determine page type from path
  const pageType = getPageType(relativePath);
  const expectations = PAGE_EXPECTATIONS[pageType] || PAGE_EXPECTATIONS['/'];

  // Extract root content (what React rendered)
  const rootContent = extractRootContent(html);

  // 1. Check page has minimum content length
  if (rootContent.length < expectations.minLength) {
    errors.push(`Content too short: ${rootContent.length} chars (expected >= ${expectations.minLength})`);
  }

  // 2. Check for completely empty pages
  if (rootContent.trim().length < 100) {
    errors.push('Page appears empty or failed to render');
  }

  // 3. Check required text (case-insensitive)
  for (const text of expectations.requiredText) {
    if (!rootContent.toLowerCase().includes(text.toLowerCase())) {
      errors.push(`Missing required text: "${text}"`);
    }
  }

  // 4. Check required elements
  for (const element of expectations.requiredElements) {
    // Check for element as tag or class
    const tagPattern = new RegExp(`<${element}[\\s>]`, 'i');
    const classPattern = new RegExp(`class="[^"]*${element}[^"]*"`, 'i');

    if (!tagPattern.test(html) && !classPattern.test(html)) {
      errors.push(`Missing required element: <${element}> or class="${element}"`);
    }
  }

  // 5. Check forbidden text patterns
  for (const text of expectations.forbiddenText) {
    if (rootContent.includes(text)) {
      errors.push(`Found forbidden text: "${text}"`);
    }
  }

  // 5b. Check page-specific forbidden patterns (e.g., escaped HTML in blog posts)
  if (expectations.forbiddenPatterns) {
    for (const pattern of expectations.forbiddenPatterns) {
      const matches = rootContent.match(pattern);
      if (matches && matches.length > 0) {
        errors.push(`CRITICAL: Found escaped HTML in content - blog post content is not rendering properly! (${matches.length} instances of ${matches[0]})`);
        break; // One error is enough to flag this issue
      }
    }
  }

  // 6. Check global forbidden patterns
  for (const pattern of GLOBAL_FORBIDDEN_PATTERNS) {
    const matches = html.match(pattern);
    if (matches && matches.length > 0) {
      errors.push(`Found forbidden pattern: ${matches[0].substring(0, 50)}...`);
    }
  }

  // 7. Check for untranslated i18n keys (patterns like "homepage.hero.title")
  const i18nKeyPattern = /[a-z]+\.[a-z]+\.[a-z]+/gi;
  const suspiciousKeys = rootContent.match(i18nKeyPattern) || [];
  const filteredKeys = suspiciousKeys.filter(key => {
    const lower = key.toLowerCase();
    // Filter out legitimate dotted names (URLs, domains, file extensions, etc.)
    return !lower.includes('www') &&
      !lower.includes('com') &&
      !lower.includes('net') &&
      !lower.includes('org') &&
      !lower.includes('html') &&
      !lower.includes('cloudfront') &&
      !lower.includes('ncbi') &&
      !lower.includes('nlm') &&
      !lower.includes('nih') &&
      !lower.includes('asp') &&
      !lower.includes('cdn') &&
      key.split('.').every(part => part.length > 2 && part.length < 15);
  });
  if (filteredKeys.length > 5) {
    warnings.push(`Possible untranslated keys found: ${filteredKeys.slice(0, 3).join(', ')}...`);
  }

  // 8. Check for HTML in text content (escaped HTML that shouldn't be there)
  if (rootContent.includes('&lt;') && rootContent.includes('&gt;')) {
    const escapedCount = (rootContent.match(/&lt;/g) || []).length;
    if (escapedCount > 10) {
      warnings.push(`Found ${escapedCount} instances of escaped HTML - might indicate render issue`);
    }
  }

  // 9. Check meta tags exist
  if (!html.includes('<title>') || html.includes('<title></title>')) {
    errors.push('Missing or empty <title> tag');
  }
  if (!html.includes('meta name="description"')) {
    errors.push('Missing meta description');
  }

  // 10. Check for proper language attribute
  const htmlLangMatch = html.match(/<html[^>]*lang="([^"]+)"/);
  if (!htmlLangMatch) {
    errors.push('Missing lang attribute on <html> tag');
  } else {
    const expectedLang = getExpectedLanguage(relativePath);
    if (htmlLangMatch[1] !== expectedLang) {
      warnings.push(`Language mismatch: expected "${expectedLang}", found "${htmlLangMatch[1]}"`);
    }
  }

  // 11. For blog posts, verify actual content from the source post appears
  if (expectations.verifyBlogContent) {
    const slug = extractBlogSlug(relativePath);
    if (slug && blogPostsMetadata[slug]) {
      const postMeta = blogPostsMetadata[slug];
      
      // Check that the post title appears in the rendered content
      // Note: For non-English pages, the title might be translated, so we check key phrases
      const titleInContent = rootContent.toLowerCase().includes(postMeta.title.toLowerCase());
      const titleInHtml = html.toLowerCase().includes(postMeta.title.toLowerCase());
      
      if (!titleInContent && !titleInHtml) {
        // For non-English, check if at least some key phrases appear
        const lang = getExpectedLanguage(relativePath);
        if (lang === 'en') {
          errors.push(`Blog post title not found in rendered content: "${postMeta.title.substring(0, 50)}..."`);
        } else {
          // For translated pages, check key phrases as a softer check
          const foundPhrases = postMeta.keyPhrases.filter(phrase => 
            rootContent.toLowerCase().includes(phrase) || html.toLowerCase().includes(phrase)
          );
          if (foundPhrases.length === 0) {
            warnings.push(`No key phrases from title found in ${lang} content (may need translation check)`);
          }
        }
      }
      
      // Check that the post-title element contains the title (or a translation)
      const postTitleMatch = rootContent.match(/<h1[^>]*class="post-title"[^>]*>([^<]+)</i);
      if (postTitleMatch) {
        const renderedTitle = postTitleMatch[1].trim();
        if (renderedTitle.length < 10) {
          errors.push(`Post title element appears empty or too short: "${renderedTitle}"`);
        }
      } else {
        errors.push('Could not find post-title element in blog post');
      }
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Extract blog slug from file path
 * e.g., "blog/my-post/index.html" -> "my-post"
 * e.g., "es/blog/my-post/index.html" -> "my-post"
 */
function extractBlogSlug(relativePath) {
  const match = relativePath.match(/(?:^|\/)(blog\/([^/]+))\/index\.html$/);
  return match ? match[2] : null;
}

function extractRootContent(html) {
  // Extract content from <div id="root">...</div>
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<script|$)/);
  return rootMatch ? rootMatch[1] : '';
}

function getPageType(relativePath) {
  // Normalize path: remove language prefix and index.html
  let normalized = relativePath
    .replace(/^(es|fr|de|jp)\//, '/')
    .replace(/index\.html$/, '')
    .replace(/\/$/, '');

  if (normalized === '' || normalized === 'index.html') {
    return '/';
  }

  // Check for blog post pattern
  if (normalized.match(/^\/?(blog\/[^/]+)/)) {
    return '/blog/*';
  }

  // Add leading slash if missing
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }

  // Check if we have specific expectations for this page
  if (PAGE_EXPECTATIONS[normalized]) {
    return normalized;
  }

  // Default to homepage expectations
  return '/';
}

function getExpectedLanguage(relativePath) {
  if (relativePath.startsWith('es/')) return 'es';
  if (relativePath.startsWith('fr/')) return 'fr';
  if (relativePath.startsWith('de/')) return 'de';
  if (relativePath.startsWith('jp/')) return 'jp';
  return 'en';
}

// Run validation if called directly
if (require.main === module) {
  validatePageContent();
}

module.exports = { validatePageContent };
