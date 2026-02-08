/**
 * Validate _redirects File
 * Ensures all redirects are properly configured and targets exist
 * 
 * Checks:
 * 1. Valid redirect syntax
 * 2. No duplicate redirects
 * 3. Local redirect targets exist in build
 * 4. No circular redirects
 * 5. Proper status codes (301, 302, 404)
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../build');
const REDIRECTS_PATH = path.join(BUILD_DIR, '_redirects');
const PUBLIC_REDIRECTS_PATH = path.join(__dirname, '../public/_redirects');

// Pages that exist but might not have index.html in build yet
const KNOWN_EXTERNAL_PATHS = [
  '/',
  '/404.html'
];

function parseRedirectsFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const redirects = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and comments
    if (!line || line.startsWith('#')) {
      continue;
    }
    
    // Parse redirect: from to [status][!]
    const parts = line.split(/\s+/);
    if (parts.length >= 2) {
      const from = parts[0];
      const to = parts[1];
      const statusPart = parts[2] || '301';
      const status = parseInt(statusPart.replace('!', ''), 10);
      const force = statusPart.includes('!');
      
      redirects.push({
        from,
        to,
        status,
        force,
        line: i + 1,
        raw: line
      });
    }
  }
  
  return redirects;
}

function checkPathExists(urlPath) {
  // External URLs always "exist"
  if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) {
    return true;
  }
  
  // Check for special paths
  if (KNOWN_EXTERNAL_PATHS.includes(urlPath)) {
    return true;
  }
  
  // Check if it's a splat redirect (contains :splat or *)
  if (urlPath.includes(':splat') || urlPath.includes('*')) {
    return true; // Can't validate dynamic paths
  }
  
  // Normalize path
  const normalizedPath = urlPath.endsWith('/') ? urlPath : urlPath + '/';
  
  // Check for index.html in build directory
  const buildPath = path.join(BUILD_DIR, normalizedPath, 'index.html');
  const altBuildPath = path.join(BUILD_DIR, urlPath);
  
  return fs.existsSync(buildPath) || fs.existsSync(altBuildPath) || fs.existsSync(path.join(BUILD_DIR, urlPath + '.html'));
}

function validateRedirects() {
  console.log('\n🔀 Validating _redirects file...\n');
  
  const errors = [];
  const warnings = [];
  
  // Check both public and build _redirects
  const publicRedirects = parseRedirectsFile(PUBLIC_REDIRECTS_PATH);
  const buildRedirects = parseRedirectsFile(REDIRECTS_PATH);
  
  const redirects = buildRedirects.length > 0 ? buildRedirects : publicRedirects;
  const source = buildRedirects.length > 0 ? 'build/_redirects' : 'public/_redirects';
  
  if (redirects.length === 0) {
    warnings.push('No _redirects file found or file is empty');
    console.log('⚠️  No _redirects file found\n');
    process.exit(0);
  }
  
  console.log(`📋 Validating ${redirects.length} redirects from ${source}...\n`);
  
  // Track seen redirects for duplicate detection
  const seenFrom = new Map();
  
  // Track redirect chains for circular detection
  const redirectMap = new Map();
  
  for (const redirect of redirects) {
    const { from, to, status, line, raw } = redirect;
    
    // 1. Check for valid status codes
    if (![200, 301, 302, 303, 307, 308, 404].includes(status)) {
      warnings.push(`Line ${line}: Unusual status code ${status} - "${raw}"`);
    }
    
    // 2. Check for duplicates
    if (seenFrom.has(from)) {
      const prevLine = seenFrom.get(from);
      warnings.push(`Line ${line}: Duplicate redirect from "${from}" (first defined on line ${prevLine})`);
    } else {
      seenFrom.set(from, line);
    }
    
    // 3. Check target exists (for local paths)
    if (!to.startsWith('http') && !to.includes(':splat') && status !== 404) {
      if (!checkPathExists(to)) {
        // This is a warning, not error - target might be created during build
        warnings.push(`Line ${line}: Target "${to}" may not exist in build`);
      }
    }
    
    // 4. Build redirect map for circular detection
    if (!from.includes('*') && !to.includes(':splat')) {
      redirectMap.set(from, to);
    }
    
    // 5. Check for self-redirects
    if (from === to) {
      errors.push(`Line ${line}: Self-redirect detected: "${from}" → "${to}"`);
    }
    
    // 6. Check for obvious typos in paths
    if (from.includes('//') && !from.startsWith('http')) {
      errors.push(`Line ${line}: Double slash in path: "${from}"`);
    }
    if (to.includes('//') && !to.startsWith('http')) {
      errors.push(`Line ${line}: Double slash in target: "${to}"`);
    }
  }
  
  // 7. Check for circular redirects (A→B→A)
  for (const [from, to] of redirectMap) {
    let current = to;
    const visited = new Set([from]);
    let depth = 0;
    
    while (redirectMap.has(current) && depth < 10) {
      if (visited.has(current)) {
        errors.push(`Circular redirect detected: ${from} → ... → ${current}`);
        break;
      }
      visited.add(current);
      current = redirectMap.get(current);
      depth++;
    }
  }
  
  // Summary
  console.log('═'.repeat(60));
  console.log('📊 REDIRECTS VALIDATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`   Total redirects: ${redirects.length}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}`);
  console.log('═'.repeat(60));
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:\n');
    for (const warn of warnings.slice(0, 15)) {
      console.log(`   ${warn}`);
    }
    if (warnings.length > 15) {
      console.log(`   ... and ${warnings.length - 15} more warnings`);
    }
  }
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:\n');
    for (const err of errors) {
      console.log(`   ${err}`);
    }
    console.log('\n❌ REDIRECTS VALIDATION FAILED!\n');
    process.exit(1);
  }
  
  console.log('\n✅ REDIRECTS VALIDATION PASSED!\n');
  process.exit(0);
}

validateRedirects();
