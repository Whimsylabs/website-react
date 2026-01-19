/**
 * Validate that blog listing pages are properly server-side rendered
 * Ensures search engines can see blog posts without JavaScript execution
 */

const fs = require('fs');
const path = require('path');

// Minimum number of blog posts expected (all posts should be rendered for SSR/bots)
const MIN_BLOG_POSTS = 16;

function validateBlogSSR() {
  console.log('🔍 Validating blog SSR rendering...');

  const buildDir = path.join(__dirname, '..', 'build');
  const errors = [];
  const warnings = [];

  // Check if build directory exists
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run npm run build-static first.');
    process.exit(1);
  }

  // Check all language versions of the blog listing page
  const blogPages = [
    { path: 'blog/index.html', lang: 'en' },
    { path: 'de/blog/index.html', lang: 'de' },
    { path: 'es/blog/index.html', lang: 'es' },
    { path: 'fr/blog/index.html', lang: 'fr' },
    { path: 'jp/blog/index.html', lang: 'ja' }
  ];

  let totalPassed = 0;
  let totalFailed = 0;

  for (const page of blogPages) {
    const filePath = path.join(buildDir, page.path);

    if (!fs.existsSync(filePath)) {
      // Only error for English, warn for other languages (they may not be built)
      if (page.lang === 'en') {
        errors.push(`Missing blog index: ${page.path}`);
        totalFailed++;
      } else {
        warnings.push(`Optional: Missing ${page.lang} blog index: ${page.path}`);
      }
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');
    const result = validateBlogPage(html, page.lang, page.path);

    if (result.passed) {
      console.log(`✅ ${page.lang.toUpperCase()} blog page: ${result.postCount} posts rendered, __INITIAL_POSTS__ present`);
      totalPassed++;
    } else {
      errors.push(...result.errors);
      totalFailed++;
    }
  }

  // Print summary
  console.log('\n📊 Blog SSR Validation Summary:');
  console.log(`   Language versions validated: ${totalPassed + totalFailed}`);
  console.log(`   Passed: ${totalPassed}`);
  console.log(`   Failed: ${totalFailed}`);

  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(w => console.log(`   - ${w}`));
  }

  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(e => console.log(`   - ${e}`));
    process.exit(1);
  }

  console.log('\n✅ Blog SSR validation passed!');
  return true;
}

function validateBlogPage(html, lang, pagePath) {
  const errors = [];

  // 1. Extract the main content (inside <div id="root">)
  const rootContent = extractRootContent(html);

  // Check that "Loading..." is NOT the main content
  if (rootContent.includes('class="loading-spinner"') ||
      (rootContent.includes('>Loading...</') && !rootContent.includes('post-preview'))) {
    errors.push(`${pagePath}: Main content shows Loading state instead of posts`);
  }

  // 2. Count blog post previews in the root content only (not noscript)
  // Match "post-box post-preview" specifically (not "post-preview-content")
  const postPreviews = (rootContent.match(/class="post-box post-preview"/g) || []).length;
  if (postPreviews < MIN_BLOG_POSTS) {
    errors.push(`${pagePath}: Only ${postPreviews} posts rendered, expected at least ${MIN_BLOG_POSTS}`);
  }

  // 3. Check for pagination (should exist if more than 10 posts)
  const hasPagination = html.includes('pagination-container');
  if (!hasPagination && postPreviews > 0) {
    // Warning only - might be less than 10 posts total
    console.log(`   ℹ️  ${lang.toUpperCase()}: No pagination found (${postPreviews} posts visible)`);
  }

  // 4. Check that window.__INITIAL_POSTS__ is present for hydration
  const hasInitialPosts = html.includes('window.__INITIAL_POSTS__');
  if (!hasInitialPosts) {
    errors.push(`${pagePath}: Missing window.__INITIAL_POSTS__ for client hydration`);
  }

  // 5. Validate __INITIAL_POSTS__ contains posts array
  if (hasInitialPosts) {
    const postsMatch = html.match(/window\.__INITIAL_POSTS__\s*=\s*(\[[\s\S]*?\]);/);
    if (postsMatch) {
      try {
        const posts = JSON.parse(postsMatch[1]);
        if (!Array.isArray(posts) || posts.length < MIN_BLOG_POSTS) {
          errors.push(`${pagePath}: __INITIAL_POSTS__ has only ${posts?.length || 0} posts, expected at least ${MIN_BLOG_POSTS}`);
        }
      } catch (e) {
        errors.push(`${pagePath}: __INITIAL_POSTS__ contains invalid JSON`);
      }
    }
  }

  // 6. Check sidebar contains full list of posts
  const sidebarPosts = (html.match(/<div class="sidebar">[\s\S]*?<\/ul>/g) || [''])[0];
  const sidebarLinks = (sidebarPosts.match(/<li/g) || []).length;
  if (sidebarLinks < MIN_BLOG_POSTS) {
    errors.push(`${pagePath}: Sidebar shows only ${sidebarLinks} posts, expected at least ${MIN_BLOG_POSTS}`);
  }

  return {
    passed: errors.length === 0,
    errors,
    postCount: postPreviews
  };
}

function extractRootContent(html) {
  // Extract content from <div id="root">...</div>
  // Use greedy match and look for </div> followed by script tags
  const rootMatch = html.match(/<div id="root">([\s\S]*)<\/div>\s*<script/);
  return rootMatch ? rootMatch[1] : '';
}

// Run validation if called directly
if (require.main === module) {
  validateBlogSSR();
}

module.exports = { validateBlogSSR };
