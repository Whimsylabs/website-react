/**
 * International SEO Health Check
 * Validates hreflang and canonical setup for language versions
 */

const fs = require('fs');
const path = require('path');

function checkInternationalSEO() {
  console.log('🌍 Checking International SEO Setup...');
  
  const buildDir = path.join(__dirname, '..', 'build');
  const languages = ['en', 'es', 'de', 'fr', 'jp'];
  const mainPages = ['services', 'features', 'faq', 'contact', 'privacy'];
  
  let healthScore = 0;
  let totalChecks = 0;
  let issues = [];
  let successes = [];

  // Check each language and page combination
  languages.forEach(lang => {
    mainPages.forEach(page => {
      const filePath = lang === 'en' 
        ? path.join(buildDir, page, 'index.html')
        : path.join(buildDir, lang === 'jp' ? 'jp' : lang, page, 'index.html');
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const result = analyzePage(content, lang, page);
        
        totalChecks += result.checks;
        healthScore += result.score;
        
        if (result.issues.length > 0) {
          issues.push(`${lang}/${page}: ${result.issues.join(', ')}`);
        } else {
          successes.push(`${lang}/${page}: Perfect setup`);
        }
      }
    });
  });

  // Report results
  const healthPercentage = Math.round((healthScore / totalChecks) * 100);
  
  console.log(`\n📊 International SEO Health Score: ${healthScore}/${totalChecks} (${healthPercentage}%)`);
  
  if (healthPercentage >= 90) {
    console.log('🎉 EXCELLENT! Your international SEO setup is fantastic!');
    console.log('✅ Google showing "alternate pages" is NORMAL and GOOD behavior.');
    console.log('✅ Each language version will appear for users in that language.');
  } else if (healthPercentage >= 75) {
    console.log('✅ GOOD! Minor improvements possible but setup is solid.');
  } else {
    console.log('⚠️  NEEDS ATTENTION: Several issues found with international setup.');
  }
  
  if (issues.length > 0) {
    console.log('\n🚨 Issues to fix:');
    issues.forEach(issue => console.log(`  ❌ ${issue}`));
  }
  
  console.log(`\n✅ Working correctly: ${successes.length} pages`);
  
  console.log('\n💡 Remember: "Not indexed" for alternate language pages is EXPECTED!');
  console.log('   Each language version shows up for users in that specific language.');
  
  return healthPercentage;
}

function analyzePage(content, lang, page) {
  let score = 0;
  let checks = 0;
  let issues = [];
  
  // Check 1: Has canonical tag
  checks++;
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
  if (canonicalMatch) {
    score++;
    
    // Check 2: Canonical points to self (not English for non-English pages)
    checks++;
    const canonicalUrl = canonicalMatch[1];
    const expectedPath = lang === 'en' 
      ? `https://whimsylabs.ai/${page}/`
      : `https://whimsylabs.ai/${lang === 'jp' ? 'jp' : lang}/${page}/`;
    
    if (canonicalUrl === expectedPath) {
      score++;
    } else {
      issues.push(`Wrong canonical: ${canonicalUrl} should be ${expectedPath}`);
    }
  } else {
    issues.push('Missing canonical tag');
  }
  
  // Check 3: Has hreflang tags
  checks++;
  const hreflangMatches = content.match(/<link rel="alternate" hreflang="[^"]+"/g);
  if (hreflangMatches && hreflangMatches.length >= 5) {
    score++;
  } else {
    issues.push('Missing or incomplete hreflang tags');
  }
  
  // Check 4: Has x-default hreflang
  checks++;
  if (content.includes('hreflang="x-default"')) {
    score++;
  } else {
    issues.push('Missing x-default hreflang');
  }
  
  // Check 5: All hreflang URLs are consistent
  checks++;
  const allHreflangs = content.match(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g);
  if (allHreflangs && allHreflangs.every(tag => tag.includes('whimsylabs.ai'))) {
    score++;
  } else {
    issues.push('Inconsistent hreflang URLs');
  }
  
  return { score, checks, issues };
}

// Run if called directly
if (require.main === module) {
  const healthScore = checkInternationalSEO();
  process.exit(healthScore >= 90 ? 0 : 1);
}

module.exports = checkInternationalSEO;