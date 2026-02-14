#!/usr/bin/env node
/**
 * Build Summary - Shows final validation results
 * Runs at the end of build-static to show pass/warn/fail status
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BUILD_DIR = path.join(__dirname, '../build');

// Quick validation checks
const checks = {
  'Sitemap': () => {
    const sitemap = path.join(BUILD_DIR, 'sitemap.xml');
    if (!fs.existsSync(sitemap)) return { status: 'fail', msg: 'Missing sitemap.xml' };
    const content = fs.readFileSync(sitemap, 'utf8');
    if (content.includes('[object Object]')) return { status: 'fail', msg: 'Contains [object Object]' };
    const urlCount = (content.match(/<loc>/g) || []).length;
    return { status: 'pass', msg: `${urlCount} URLs` };
  },

  'HTML Pages': () => {
    const pages = glob.sync(`${BUILD_DIR}/**/index.html`);
    return { status: 'pass', msg: `${pages.length} pages` };
  },

  'Meta Tags': () => {
    const pages = glob.sync(`${BUILD_DIR}/**/index.html`);
    let missing = 0;
    for (const page of pages.slice(0, 20)) {
      const html = fs.readFileSync(page, 'utf8');
      if (!html.includes('<meta name="description"')) missing++;
    }
    if (missing > 0) return { status: 'warn', msg: `${missing} pages missing descriptions` };
    return { status: 'pass', msg: 'All checked' };
  },

  'Organization Schema': () => {
    const home = path.join(BUILD_DIR, 'index.html');
    if (!fs.existsSync(home)) return { status: 'fail', msg: 'No homepage' };
    const html = fs.readFileSync(home, 'utf8');
    if (!html.includes('"@type":"Organization"')) return { status: 'fail', msg: 'Missing schema' };
    return { status: 'pass', msg: 'Present' };
  },

  'Breadcrumb Schema': () => {
    const features = path.join(BUILD_DIR, 'features/index.html');
    if (!fs.existsSync(features)) return { status: 'warn', msg: 'No features page' };
    const html = fs.readFileSync(features, 'utf8');
    if (!html.includes('BreadcrumbList')) return { status: 'fail', msg: 'Missing on /features/' };
    return { status: 'pass', msg: 'Present' };
  },

  'Review Schema': () => {
    const home = path.join(BUILD_DIR, 'index.html');
    if (!fs.existsSync(home)) return { status: 'fail', msg: 'No homepage' };
    const html = fs.readFileSync(home, 'utf8');
    const reviewCount = (html.match(/"@type":"Review"/g) || []).length;
    if (reviewCount === 0) return { status: 'fail', msg: 'No reviews' };
    if (reviewCount < 3) return { status: 'warn', msg: `Only ${reviewCount} reviews` };
    return { status: 'pass', msg: `${reviewCount} reviews` };
  },

  'FAQ Schema': () => {
    const faq = path.join(BUILD_DIR, 'faq/index.html');
    if (!fs.existsSync(faq)) return { status: 'fail', msg: 'No FAQ page' };
    const html = fs.readFileSync(faq, 'utf8');
    if (!html.includes('FAQPage')) return { status: 'fail', msg: 'Missing FAQPage schema' };
    const questionCount = (html.match(/"@type":"Question"/g) || []).length;
    return { status: 'pass', msg: `${questionCount} questions` };
  },

  'Blog Posts': () => {
    const posts = glob.sync(`${BUILD_DIR}/blog/*/index.html`).filter(p => !p.endsWith('/blog/index.html'));
    if (posts.length === 0) return { status: 'warn', msg: 'No blog posts' };
    let withSchema = 0;
    for (const post of posts) {
      const html = fs.readFileSync(post, 'utf8');
      if (html.includes('BlogPosting')) withSchema++;
    }
    if (withSchema < posts.length) return { status: 'warn', msg: `${withSchema}/${posts.length} have schema` };
    return { status: 'pass', msg: `${posts.length} posts` };
  },

  'Hreflang Tags': () => {
    const home = path.join(BUILD_DIR, 'index.html');
    if (!fs.existsSync(home)) return { status: 'fail', msg: 'No homepage' };
    const html = fs.readFileSync(home, 'utf8');
    const hreflangCount = (html.match(/hreflang="/g) || []).length;
    if (hreflangCount < 5) return { status: 'warn', msg: `Only ${hreflangCount} hreflang tags` };
    return { status: 'pass', msg: `${hreflangCount} languages` };
  },

  'Open Graph': () => {
    const home = path.join(BUILD_DIR, 'index.html');
    if (!fs.existsSync(home)) return { status: 'fail', msg: 'No homepage' };
    const html = fs.readFileSync(home, 'utf8');
    if (!html.includes('og:title')) return { status: 'fail', msg: 'Missing og:title' };
    if (!html.includes('og:image')) return { status: 'warn', msg: 'Missing og:image' };
    return { status: 'pass', msg: 'Present' };
  },

  'Assets': () => {
    const js = glob.sync(`${BUILD_DIR}/static/js/*.js`);
    const css = glob.sync(`${BUILD_DIR}/static/css/*.css`);
    if (js.length === 0) return { status: 'fail', msg: 'No JS bundles' };
    if (css.length === 0) return { status: 'warn', msg: 'No CSS bundles' };
    return { status: 'pass', msg: `${js.length} JS, ${css.length} CSS` };
  }
};

function printSummary() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                    BUILD SUMMARY                           ║');
  console.log('╠════════════════════════════════════════════════════════════╣');

  let passed = 0, warnings = 0, failed = 0;

  for (const [name, check] of Object.entries(checks)) {
    try {
      const result = check();
      const icon = result.status === 'pass' ? '✅' : result.status === 'warn' ? '⚠️ ' : '❌';
      const status = result.status.toUpperCase().padEnd(4);
      
      if (result.status === 'pass') passed++;
      else if (result.status === 'warn') warnings++;
      else failed++;

      console.log(`║ ${icon} ${name.padEnd(20)} ${result.msg.padEnd(34)} ║`);
    } catch (e) {
      console.log(`║ ❌ ${name.padEnd(20)} ${'Error: ' + e.message.substring(0, 27).padEnd(34)} ║`);
      failed++;
    }
  }

  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║  ✅ Passed: ${String(passed).padEnd(3)}  ⚠️  Warnings: ${String(warnings).padEnd(3)}  ❌ Failed: ${String(failed).padEnd(3)}     ║`);
  console.log('╚════════════════════════════════════════════════════════════╝');

  if (failed > 0) {
    console.log('\n❌ Build has failures - review above\n');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('\n⚠️  Build completed with warnings\n');
  } else {
    console.log('\n🎉 Build completed successfully!\n');
  }
}

printSummary();
