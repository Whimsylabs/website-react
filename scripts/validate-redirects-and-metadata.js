/**
 * Validation script to prevent redirect and metadata issues
 * Checks for missing redirect rules and metadata configurations
 */

const fs = require('fs');
const path = require('path');

function validateRedirectsAndMetadata() {
  console.log('🔍 Validating redirects and metadata configuration...');
  
  const buildDir = path.join(__dirname, '..', 'build');
  const redirectsFile = path.join(__dirname, '..', 'public', '_redirects');
  const metadataInjectorFile = path.join(__dirname, 'metadata-injector.js');
  
  let errors = [];
  let warnings = [];

  // 1. Scan build directory for all HTML pages
  const htmlPages = scanForHtmlPages(buildDir);
  console.log(`📄 Found ${htmlPages.length} HTML pages in build output`);
  
  // 2. Load redirect rules
  const redirectRules = loadRedirectRules(redirectsFile);
  console.log(`🔄 Found ${redirectRules.length} redirect rules`);
  
  // 3. Load metadata routes from metadata-injector.js
  const metadataRoutes = loadMetadataRoutes(metadataInjectorFile);
  console.log(`📋 Found ${metadataRoutes.length} metadata routes`);
  
  // 4. Validate each HTML page
  htmlPages.forEach(pagePath => {
    const route = convertToRoute(pagePath);
    
    // Skip root page and blog posts (they have different rules)
    if (route === '/' || route.startsWith('/blog/') || route.includes('/de/') || route.includes('/es/') || route.includes('/fr/') || route.includes('/jp/')) {
      return;
    }
    
    // Check for missing redirect rule
    const hasRedirectRule = redirectRules.some(rule => 
      rule.from === route || rule.from === route.replace(/\/$/, '')
    );
    
    if (!hasRedirectRule) {
      errors.push(`❌ Missing redirect rule for page: ${route}`);
    }
    
    // Check for missing metadata
    const hasMetadata = metadataRoutes.includes(route) || metadataRoutes.includes(route.replace(/\/$/, ''));
    
    if (!hasMetadata) {
      errors.push(`❌ Missing metadata configuration for route: ${route}`);
    }
    
    // Check URL consistency in the HTML file
    const urlConsistencyIssue = checkUrlConsistency(pagePath);
    if (urlConsistencyIssue) {
      errors.push(`❌ URL inconsistency in ${route}: ${urlConsistencyIssue}`);
    }
  });
  
  // 5. Check for orphaned redirect rules
  redirectRules.forEach(rule => {
    const expectedPagePath = path.join(buildDir, rule.to.replace(/\/$/, ''), 'index.html');
    if (!fs.existsSync(expectedPagePath) && !rule.to.includes('404.html')) {
      warnings.push(`⚠️  Redirect rule points to non-existent page: ${rule.from} → ${rule.to}`);
    }
  });
  
  // 6. Report results
  console.log('\n📊 Validation Results:');
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All redirects and metadata are properly configured!');
    return true;
  }
  
  if (errors.length > 0) {
    console.log('\n🚨 ERRORS (must be fixed):');
    errors.forEach(error => console.log(error));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(warning => console.log(warning));
  }
  
  if (errors.length > 0) {
    console.log('\n💡 To fix these issues:');
    console.log('1. Add missing redirect rules to public/_redirects');
    console.log('2. Add missing metadata to scripts/metadata-injector.js getDefaultMetadata()');
    console.log('3. Run npm run build-static and redeploy');
    
    return false;
  }
  
  return true;
}

function scanForHtmlPages(buildDir) {
  const htmlPages = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'index.html') {
        htmlPages.push(fullPath);
      }
    });
  }
  
  scanDirectory(buildDir);
  return htmlPages;
}

function convertToRoute(htmlPath) {
  const buildDir = path.join(__dirname, '..', 'build');
  const relativePath = path.relative(buildDir, htmlPath);
  
  if (relativePath === 'index.html') {
    return '/';
  }
  
  // Convert path/to/index.html → /path/to/
  const route = '/' + path.dirname(relativePath).replace(/\\/g, '/') + '/';
  return route.replace('//', '/');
}

function loadRedirectRules(redirectsFile) {
  if (!fs.existsSync(redirectsFile)) {
    return [];
  }
  
  const content = fs.readFileSync(redirectsFile, 'utf8');
  const rules = [];
  
  content.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#') && line.includes(' ')) {
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        rules.push({ from: parts[0], to: parts[1] });
      }
    }
  });
  
  return rules;
}

function loadMetadataRoutes(metadataFile) {
  if (!fs.existsSync(metadataFile)) {
    return [];
  }
  
  const content = fs.readFileSync(metadataFile, 'utf8');
  const routes = [];
  
  // Extract routes from the metaInfo object - find the complete object
  const metaInfoStart = content.indexOf('const metaInfo = {');
  if (metaInfoStart === -1) {
    return routes;
  }
  
  // Find the matching closing brace
  let braceCount = 0;
  let metaInfoEnd = -1;
  for (let i = metaInfoStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        metaInfoEnd = i;
        break;
      }
    }
  }
  
  if (metaInfoEnd === -1) {
    return routes;
  }
  
  const metaInfoContent = content.substring(metaInfoStart, metaInfoEnd + 1);
  
  // Extract all route keys (including quoted paths)
  const routeMatches = metaInfoContent.matchAll(/['"](\/[^'"]*)['"]\s*:/g);
  
  for (const match of routeMatches) {
    routes.push(match[1]);
  }
  
  return routes;
}

function checkUrlConsistency(htmlPath) {
  const content = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract canonical URL
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
  const canonicalUrl = canonicalMatch ? canonicalMatch[1] : null;
  
  // Extract og:url
  const ogUrlMatch = content.match(/<meta property="og:url" content="([^"]+)"/);
  const ogUrl = ogUrlMatch ? ogUrlMatch[1] : null;
  
  if (canonicalUrl && ogUrl && canonicalUrl !== ogUrl) {
    return `Canonical URL (${canonicalUrl}) doesn't match og:url (${ogUrl})`;
  }
  
  return null;
}

// Run validation if called directly
if (require.main === module) {
  const success = validateRedirectsAndMetadata();
  process.exit(success ? 0 : 1);
}

module.exports = validateRedirectsAndMetadata;