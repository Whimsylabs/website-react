/**
 * Validate Blog Post SEO
 * Ensures blog posts are properly optimized for search engines
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BUILD_DIR = path.join(__dirname, '../build');

// SEO requirements
const REQUIREMENTS = {
  minWordCount: 500,
  maxTitleLength: 60,
  minDescriptionLength: 120,
  maxDescriptionLength: 160,
  requiredSchemas: ['BlogPosting', 'BreadcrumbList'],
  requiredMetaTags: ['description', 'og:title', 'og:description', 'twitter:title'],
};

function extractText(html) {
  // Remove scripts and styles
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].trim() : null;
}

function extractMetaDescription(html) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
                html.match(/<meta\s+content="([^"]+)"\s+name="description"/i);
  return match ? match[1].trim() : null;
}

function extractH1(html) {
  const match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return match ? match[1].trim() : null;
}

function countH2s(html) {
  const matches = html.match(/<h2[^>]*>/gi);
  return matches ? matches.length : 0;
}

function extractSchemas(html) {
  const schemas = [];
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const schema = JSON.parse(match[1]);
      schemas.push(schema['@type']);
    } catch (e) {}
  }
  return schemas;
}

function checkInternalLinks(html) {
  const internalLinks = html.match(/href="\/[^"]*"/g) || [];
  const blogLinks = internalLinks.filter(l => l.includes('/blog/'));
  return {
    total: internalLinks.length,
    toBlog: blogLinks.length
  };
}

function checkImages(html) {
  const images = html.match(/<img[^>]+>/gi) || [];
  const withAlt = images.filter(img => img.includes('alt="') && !img.includes('alt=""'));
  return {
    total: images.length,
    withAlt: withAlt.length
  };
}

function validateBlogPost(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(BUILD_DIR, filePath);
  
  const results = {
    path: relativePath,
    errors: [],
    warnings: [],
    metrics: {}
  };

  // Extract content
  const title = extractTitle(html);
  const description = extractMetaDescription(html);
  const h1 = extractH1(html);
  const h2Count = countH2s(html);
  const text = extractText(html);
  const wordCount = countWords(text);
  const schemas = extractSchemas(html);
  const links = checkInternalLinks(html);
  const images = checkImages(html);

  results.metrics = { title, wordCount, h2Count, schemas, links, images };

  // Check title
  if (!title) {
    results.errors.push('Missing <title> tag');
  } else if (title.length > REQUIREMENTS.maxTitleLength) {
    results.warnings.push(`Title too long (${title.length}/${REQUIREMENTS.maxTitleLength} chars)`);
  }

  // Check meta description
  if (!description) {
    results.errors.push('Missing meta description');
  } else {
    if (description.length < REQUIREMENTS.minDescriptionLength) {
      results.warnings.push(`Description too short (${description.length} chars, min ${REQUIREMENTS.minDescriptionLength})`);
    }
    if (description.length > REQUIREMENTS.maxDescriptionLength) {
      results.warnings.push(`Description too long (${description.length}/${REQUIREMENTS.maxDescriptionLength} chars)`);
    }
  }

  // Check H1
  if (!h1) {
    results.errors.push('Missing H1 heading');
  }

  // Check H2s (structure)
  if (h2Count < 2) {
    results.warnings.push(`Only ${h2Count} H2 headings (recommend 3+)`);
  }

  // Check word count
  if (wordCount < REQUIREMENTS.minWordCount) {
    results.warnings.push(`Low word count (${wordCount}, min ${REQUIREMENTS.minWordCount})`);
  }

  // Check schemas
  for (const required of REQUIREMENTS.requiredSchemas) {
    if (!schemas.includes(required)) {
      results.errors.push(`Missing ${required} schema`);
    }
  }

  // Check internal links
  if (links.toBlog === 0) {
    results.warnings.push('No internal links to other blog posts');
  }

  // Check images
  if (images.total > 0 && images.withAlt < images.total) {
    results.warnings.push(`${images.total - images.withAlt}/${images.total} images missing alt text`);
  }

  return results;
}

function validateAllBlogPosts() {
  console.log('\n📝 Blog SEO Validation\n');
  console.log('='.repeat(60));

  // Find all blog posts (excluding index)
  const blogPosts = glob.sync(`${BUILD_DIR}/**/blog/*/index.html`)
    .filter(p => !p.endsWith('/blog/index.html'));

  if (blogPosts.length === 0) {
    console.log('No blog posts found.');
    return;
  }

  console.log(`Found ${blogPosts.length} blog posts\n`);

  let totalErrors = 0;
  let totalWarnings = 0;
  const summaries = [];

  for (const post of blogPosts) {
    const result = validateBlogPost(post);
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;

    const status = result.errors.length > 0 ? '❌' : result.warnings.length > 0 ? '⚠️' : '✅';
    const shortPath = result.path.replace('/index.html', '').split('/').slice(-2).join('/');
    
    summaries.push({
      status,
      path: shortPath,
      words: result.metrics.wordCount,
      h2s: result.metrics.h2Count,
      errors: result.errors.length,
      warnings: result.warnings.length
    });

    if (result.errors.length > 0 || result.warnings.length > 0) {
      console.log(`${status} ${shortPath}`);
      result.errors.forEach(e => console.log(`   ❌ ${e}`));
      result.warnings.forEach(w => console.log(`   ⚠️  ${w}`));
    }
  }

  // Summary table
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   Posts: ${blogPosts.length}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}`);
  
  // Quick stats
  const avgWords = Math.round(summaries.reduce((a, b) => a + b.words, 0) / summaries.length);
  console.log(`   Avg word count: ${avgWords}`);

  if (totalErrors > 0) {
    console.log('\n❌ Blog SEO validation FAILED!\n');
    process.exit(1);
  }

  console.log('\n✅ Blog SEO validation passed!\n');
}

validateAllBlogPosts();
