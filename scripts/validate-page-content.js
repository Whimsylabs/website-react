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

// Load blog post content snippets for ALL languages
// Structure: blogPostsMetadata[slug][lang] = { title, contentSnippet }
let blogPostsMetadata = {};

// Map slugs to post IDs
const slugToPostId = {
  'whimsylabs-education-revolution': 'post1',
  'physicality-in-virtual-labs': 'post2',
  'virtual-kidney-dissection-send-engagement': 'post3',
  'ai-powered-virtual-labs-solving-education-crisis': 'post4',
  'whimsycat-ai-tutor-transforming-science-education': 'post5',
  'sandbox-learning-revolution-stem-education': 'post6',
  'green-labs-sustainability-virtual-stem-education': 'post7',
  'virtual-labs-solve-stem-teacher-shortage-crisis': 'post8',
  '24-7-ai-tutoring-personalized-daily-recommendations': 'post9',
  'emotional-intelligence-ai-tutors-whimsycat-frustration-detection': 'post10',
  'virtual-labs-vs-physical-labs-cost-benefit-analysis': 'post11',
  'virtual-reality-prepares-students-real-world-stem-careers': 'post12',
  'science-real-time-physics-simulations-virtual-labs': 'post13',
  'gamification-science-education-points-rewards-engagement': 'post14',
  'whimsylabs-bett-2026-exhibition-announcement': 'post15',
  'why-traditional-virtual-labs-fail-physics-engine': 'post16',
  'whimsylabs-wins-techlearning-best-of-bett-2026': 'post17',
  'vr-winter-web-first-virtual-labs': 'post18',
  'oecd-ai-learning-paradox-virtual-labs': 'post19',
  'ai-assessment-crisis-solution': 'post20',
  'royal-society-partnership-grants-vr-science-labs': 'post21',
};

// Languages to check (jp maps to ja in translation files)
const LANGUAGES = { 'en': 'en', 'de': 'de', 'es': 'es', 'fr': 'fr', 'jp': 'ja' };

/**
 * Extract content snippet from a blog post file
 */
function extractContentSnippet(fileContent) {
  // Look for text between <p> tags that's at least 20 chars
  const paragraphMatches = fileContent.match(/<p[^>]*>\s*([^<]{20,})/g) || [];
  
  for (const para of paragraphMatches) {
    const textMatch = para.match(/<p[^>]*>\s*([^<]+)/);
    if (textMatch && textMatch[1].trim().length > 20) {
      // Get first 40 chars of clean text as our verification snippet
      return textMatch[1].trim()
        .replace(/\s+/g, ' ')
        .substring(0, 40);
    }
  }
  return '';
}

try {
  // Load English posts from Components/blog/
  const blogDir = path.join(__dirname, '..', 'src', 'Components', 'blog');
  const postFiles = fs.readdirSync(blogDir).filter(f => f.match(/^Post\d+\.js$/));
  
  for (const file of postFiles) {
    try {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
      
      // Extract slug
      const slugMatch = content.match(/export const slug\s*=\s*["'`]([^"'`]+)["'`]/);
      if (!slugMatch) continue;
      const slug = slugMatch[1];
      
      // Initialize metadata for this slug
      blogPostsMetadata[slug] = {};
      
      // Extract English content
      const titleMatch = content.match(/export const title\s*=[\s\n]*["'`]([^"'`]+)["'`]/s);
      blogPostsMetadata[slug]['en'] = {
        title: titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '',
        contentSnippet: extractContentSnippet(content)
      };
      
    } catch (e) {
      // Skip posts that fail to load
    }
  }
  
  // Load translations for each language
  const i18nBlogDir = path.join(__dirname, '..', 'src', 'i18n', 'blog');
  
  for (const [lang, langCode] of Object.entries(LANGUAGES)) {
    if (lang === 'en') continue; // Already loaded
    
    for (const [slug, postId] of Object.entries(slugToPostId)) {
      try {
        const transPath = path.join(i18nBlogDir, postId, `${langCode}.js`);
        if (fs.existsSync(transPath)) {
          const content = fs.readFileSync(transPath, 'utf8');
          
          const titleMatch = content.match(/export const title\s*=[\s\n]*["'`]([^"'`]+)["'`]/s);
          const snippet = extractContentSnippet(content);
          
          if (!blogPostsMetadata[slug]) blogPostsMetadata[slug] = {};
          blogPostsMetadata[slug][lang] = {
            title: titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '',
            contentSnippet: snippet
          };
        }
      } catch (e) {
        // Skip translations that fail to load
      }
    }
  }
  
  const slugCount = Object.keys(blogPostsMetadata).length;
  let totalSnippets = 0;
  for (const slug of Object.keys(blogPostsMetadata)) {
    for (const lang of Object.keys(blogPostsMetadata[slug])) {
      if (blogPostsMetadata[slug][lang].contentSnippet) totalSnippets++;
    }
  }
  
  console.log(`📚 Loaded metadata for ${slugCount} blog posts`);
  console.log(`📝 Found content snippets for ${totalSnippets} post/language combinations`);
  
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
    forbiddenText: ['undefined', 'NaN', '[object Object]', 'Error:', 'Loading...'],
    minLength: 5000, // Homepage should have substantial content
  },
  '/blog': {
    requiredText: ['Blog', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer', 'post-preview'],
    forbiddenText: ['undefined', 'Loading posts...'],
    minLength: 3000,
  },
  '/blog/*': {
    requiredText: [],  // Don't require specific text - content loads client-side
    requiredElements: ['nav', 'footer', 'post-content', 'post-title'],
    forbiddenText: ['undefined', 'Post not found', 'Error loading'],  // Removed 'null' - it's a valid German word meaning "zero"
    forbiddenPatterns: [
      /&lt;(p|div|h[1-6]|a|img|ul|li)(&gt;|\s)/g, // Escaped HTML tags = render bug!
      />null</g,  // JS null rendered in HTML (but not German word "null" in sentences)
    ],
    minLength: 1500,  // Lower threshold - blog content loads client-side, just need shell
    verifyBlogContent: true, // Verify blog title appears in rendered HTML
  },
  '/features': {
    requiredText: ['feature', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined'],
    minLength: 2000,
  },
  '/services': {
    requiredText: ['service', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined'],
    minLength: 2000,
  },
  '/faq': {
    requiredText: ['FAQ', 'question'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined'],
    minLength: 2000,
  },
  '/contact': {
    requiredText: ['contact', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer', 'form'],
    forbiddenText: ['undefined'],
    minLength: 1500,
  },
  '/privacy': {
    requiredText: ['privacy', 'data'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined'],
    minLength: 1500,
  },
  '/bett': {
    requiredText: ['BETT', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined'],
    minLength: 1500,
  },
  '/grants': {
    requiredText: ['grant', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined'],
    minLength: 1500,
  },
  '/grants/royal-society': {
    requiredText: ['Royal Society', 'WhimsyLabs'],
    requiredElements: ['nav', 'footer'],
    forbiddenText: ['undefined'],
    minLength: 2000,
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

// Default language
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

  // 11. For blog posts, verify CONTENT from the source post appears in the HTML (ALL LANGUAGES)
  if (expectations.verifyBlogContent) {
    const slug = extractBlogSlug(relativePath);
    const lang = getExpectedLanguage(relativePath);
    
    // Check that post-title element exists
    const postTitleMatch = html.match(/<h1[^>]*class="post-title"[^>]*>([^<]+)</i);
    if (!postTitleMatch) {
      errors.push('Blog post missing <h1 class="post-title"> element');
    }
    
    // CRITICAL: Verify actual paragraph content from source appears in HTML
    if (slug && blogPostsMetadata[slug]) {
      // Get the content snippet for this language (fall back to English if no translation)
      const postMeta = blogPostsMetadata[slug][lang] || blogPostsMetadata[slug]['en'];
      
      if (postMeta && postMeta.contentSnippet && postMeta.contentSnippet.length > 15) {
        // Normalize the snippet and HTML for comparison
        const normalizeText = (t) => t
          .replace(/&#x27;/g, "'")
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/\s+/g, ' ')
          .toLowerCase();
        
        const snippetNorm = normalizeText(postMeta.contentSnippet);
        const htmlNorm = normalizeText(html);
        
        // Check if the content snippet appears in the HTML
        if (!htmlNorm.includes(snippetNorm.substring(0, 25))) {
          errors.push(`CONTENT MISSING (${lang}): Blog post content not found in static HTML! Expected: "${postMeta.contentSnippet.substring(0, 35)}..."`);
        }
      } else {
        // No content snippet found for this language
        warnings.push(`No content snippet found for ${lang} to verify`);
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
 * Handles both forward and back slashes (Windows vs Linux)
 */
function extractBlogSlug(relativePath) {
  // Normalize to forward slashes
  const normalized = relativePath.replace(/\\/g, '/');
  const match = normalized.match(/(?:^|\/)(blog\/([^/]+))\/index\.html$/);
  return match ? match[2] : null;
}

function extractRootContent(html) {
  // Extract content from <div id="root">...</div>
  const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*(?:<script|$)/);
  return rootMatch ? rootMatch[1] : '';
}

function getPageType(relativePath) {
  // Normalize path: convert backslashes, remove language prefix and index.html
  let normalized = relativePath
    .replace(/\\/g, '/')  // Windows -> Unix paths
    .replace(/^(es|fr|de|jp)\//, '/')
    .replace(/index\.html$/, '')
    .replace(/\/$/, '');

  if (normalized === '' || normalized === 'index.html') {
    return '/';
  }

  // Check for blog post pattern (not the blog listing itself)
  if (normalized.match(/^\/?(blog\/[^/]+)/) && normalized !== '/blog' && normalized !== 'blog') {
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
  // Handle both forward and back slashes (Windows vs Linux)
  const normalized = relativePath.replace(/\\/g, '/');
  if (normalized.startsWith('es/')) return 'es';
  if (normalized.startsWith('fr/')) return 'fr';
  if (normalized.startsWith('de/')) return 'de';
  if (normalized.startsWith('jp/')) return 'jp';
  return 'en';
}

// Run validation if called directly
if (require.main === module) {
  validatePageContent();
}

module.exports = { validatePageContent };
