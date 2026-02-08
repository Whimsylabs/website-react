/**
 * Validate Keyword Targeting
 * Ensures pages include target keywords in key locations
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BUILD_DIR = path.join(__dirname, '../build');

// Target keywords for key pages (expanded 2026)
const PAGE_KEYWORDS = {
  // Homepage - broad coverage
  '/index.html': [
    'virtual lab', 'virtual laboratory', 'virtual science lab', 'stem education', 
    'whimsylabs', 'online lab simulation', 'science simulation software',
    'virtual lab for schools', 'AI science tutor', 'VR science lab'
  ],
  // Features - product-specific
  '/features/index.html': [
    'virtual lab', 'physics simulation', 'ai tutor', 'AI science tutor',
    'hands-on virtual learning', 'interactive lab simulation', 'VR science lab',
    'real-time physics', 'automated assessment'
  ],
  // Services - audience-focused
  '/services/index.html': [
    'virtual lab', 'virtual lab for schools', 'classroom lab software', 
    'K-12 virtual lab', 'virtual lab for teachers', 'school science software',
    'STEM teacher shortage solution', 'lab equipment cost reduction'
  ],
  // FAQ - problem/solution keywords
  '/faq/index.html': [
    'virtual lab', 'virtual science lab', 'online lab simulation',
    'safe lab experiments', 'virtual dissection', 'VR lab'
  ],
  // Blog - content/educational
  '/blog/index.html': [
    'virtual lab', 'stem education', 'science education',
    'AI in science education', 'VR STEM learning', 'gamified science learning'
  ],
  // Subject-specific pages (if they exist)
  '/chemistry/index.html': ['virtual chemistry lab', 'chemistry simulation', 'online chemistry lab'],
  '/biology/index.html': ['virtual biology lab', 'virtual dissection', 'online biology lab'],
  '/physics/index.html': ['virtual physics lab', 'physics simulation', 'online physics lab'],
};

// Check for keyword presence in important locations
function checkKeywordPresence(html, keyword) {
  const lowerHtml = html.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();
  
  const locations = {
    title: false,
    h1: false,
    metaDescription: false,
    firstParagraph: false,
    body: false
  };

  // Check title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch && titleMatch[1].toLowerCase().includes(lowerKeyword)) {
    locations.title = true;
  }

  // Check H1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match && h1Match[1].toLowerCase().includes(lowerKeyword)) {
    locations.h1 = true;
  }

  // Check meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
                    html.match(/<meta\s+content="([^"]+)"\s+name="description"/i);
  if (descMatch && descMatch[1].toLowerCase().includes(lowerKeyword)) {
    locations.metaDescription = true;
  }

  // Check first paragraph
  const firstPMatch = html.match(/<p[^>]*>([^<]{50,})<\/p>/i);
  if (firstPMatch && firstPMatch[1].toLowerCase().includes(lowerKeyword)) {
    locations.firstParagraph = true;
  }

  // Check body at all
  if (lowerHtml.includes(lowerKeyword)) {
    locations.body = true;
  }

  return locations;
}

function calculateKeywordScore(locations) {
  let score = 0;
  if (locations.title) score += 30;
  if (locations.h1) score += 25;
  if (locations.metaDescription) score += 20;
  if (locations.firstParagraph) score += 15;
  if (locations.body) score += 10;
  return score;
}

function validateKeywordTargeting() {
  console.log('\n🎯 Keyword Targeting Validation\n');
  console.log('='.repeat(60));

  let totalWarnings = 0;
  const results = [];

  for (const [pagePath, keywords] of Object.entries(PAGE_KEYWORDS)) {
    const fullPath = path.join(BUILD_DIR, pagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  ${pagePath} - File not found`);
      continue;
    }

    const html = fs.readFileSync(fullPath, 'utf8');
    const shortPath = pagePath.replace('/index.html', '') || '/';
    
    let pageScore = 0;
    let pageIssues = [];

    for (const keyword of keywords) {
      const locations = checkKeywordPresence(html, keyword);
      const score = calculateKeywordScore(locations);
      pageScore += score;

      if (score < 50) {
        pageIssues.push(`"${keyword}" weak (score: ${score}/100)`);
        if (!locations.title && !locations.h1) {
          pageIssues.push(`  → Missing from title and H1`);
        }
      }
    }

    const avgScore = Math.round(pageScore / keywords.length);
    const status = avgScore >= 60 ? '✅' : avgScore >= 40 ? '⚠️' : '❌';
    
    if (avgScore < 60) {
      totalWarnings++;
    }

    results.push({ path: shortPath, score: avgScore, issues: pageIssues });
    
    console.log(`${status} ${shortPath.padEnd(20)} Score: ${avgScore}/100`);
    if (pageIssues.length > 0 && avgScore < 60) {
      pageIssues.slice(0, 3).forEach(issue => console.log(`   ${issue}`));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Keyword Targeting Summary:');
  
  const avgTotal = Math.round(results.reduce((a, b) => a + b.score, 0) / results.length);
  console.log(`   Average score: ${avgTotal}/100`);
  console.log(`   Pages needing work: ${totalWarnings}`);

  // This is a warning-only validator - doesn't fail build
  if (totalWarnings > 0) {
    console.log('\n⚠️  Some pages could improve keyword targeting\n');
  } else {
    console.log('\n✅ Keyword targeting looks good!\n');
  }
}

validateKeywordTargeting();
