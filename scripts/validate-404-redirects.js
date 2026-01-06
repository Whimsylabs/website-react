/**
 * Validate that 404.html redirect rules match actual build output
 * Ensures all valid paths in the build are included in the 404.html validPaths array
 */

const fs = require('fs');
const path = require('path');

function validate404Redirects() {
  console.log('🔍 Validating 404.html redirect rules...');

  const buildDir = path.join(__dirname, '..', 'build');
  const notFoundFile = path.join(__dirname, '..', 'public', '404.html');

  // Check if files exist
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run npm run build-static first.');
    return false;
  }

  if (!fs.existsSync(notFoundFile)) {
    console.error('❌ 404.html not found in public directory');
    return false;
  }

  // 1. Scan build directory for all routes
  const builtRoutes = scanBuildRoutes(buildDir);
  console.log(`📄 Found ${builtRoutes.length} routes in build directory`);

  // 2. Extract validPaths from 404.html
  const validPaths = extractValidPathsFrom404(notFoundFile);
  console.log(`📋 Found ${validPaths.length} paths in 404.html validPaths array`);

  // 3. Compare and find missing paths
  const missingInvalidPaths = [];
  const extraIn404 = [];

  // Check if all built routes are in 404.html
  for (const route of builtRoutes) {
    // Skip root and blog posts (they have different handling)
    if (route === '/' || route.match(/\/blog\/[^/]+\/$/)) {
      continue;
    }

    // Remove trailing slash for comparison
    const routeWithoutSlash = route.replace(/\/$/, '');

    if (!validPaths.includes(routeWithoutSlash)) {
      missingInvalidPaths.push(routeWithoutSlash);
    }
  }

  // Check if 404.html has paths that don't exist in build
  for (const validPath of validPaths) {
    const routeWithSlash = validPath + '/';
    const exists = builtRoutes.includes(routeWithSlash) || routeWithSlash === '/';

    if (!exists) {
      extraIn404.push(validPath);
    }
  }

  // 4. Report results
  console.log('\n📊 Validation Results:');

  if (missingInvalidPaths.length === 0 && extraIn404.length === 0) {
    console.log('✅ All 404.html redirect rules match the build output!');
    return true;
  }

  let hasErrors = false;

  if (missingInvalidPaths.length > 0) {
    console.log('\n❌ ERRORS: Routes missing from 404.html validPaths array:');
    missingInvalidPaths.forEach(path => {
      console.log(`   - '${path}'`);
    });
    hasErrors = true;
  }

  if (extraIn404.length > 0) {
    console.log('\n⚠️  WARNINGS: Paths in 404.html that don\'t exist in build:');
    extraIn404.forEach(path => {
      console.log(`   - '${path}'`);
    });
    console.log('   (These paths may be intentional or from other languages)');
  }

  if (hasErrors) {
    console.log('\n💡 To fix:');
    console.log('1. Add the missing paths to the validPaths array in public/404.html');
    console.log('2. Find the validPaths array around line 22-35 in public/404.html');
    console.log('3. Add the missing paths to the array');
    console.log('\nExample:');
    console.log('var validPaths = [');
    missingInvalidPaths.slice(0, 3).forEach(p => console.log(`  '${p}',`));
    console.log('  // ... etc');
    console.log('];');

    return false;
  }

  return true;
}

/**
 * Scan build directory for all routes (directories with index.html)
 */
function scanBuildRoutes(buildDir) {
  const routes = [];

  function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);

    // Check if this directory has an index.html
    if (items.includes('index.html')) {
      const route = basePath || '/';
      routes.push(route);
    }

    // Recursively scan subdirectories
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'static') {
        const newBasePath = basePath ? `${basePath}${item}/` : `/${item}/`;
        scanDirectory(fullPath, newBasePath);
      }
    });
  }

  scanDirectory(buildDir);
  return routes.sort();
}

/**
 * Extract validPaths array from 404.html
 */
function extractValidPathsFrom404(notFoundFile) {
  const content = fs.readFileSync(notFoundFile, 'utf8');

  // Find the validPaths array in the JavaScript
  const validPathsMatch = content.match(/var validPaths = \[([\s\S]*?)\];/);

  if (!validPathsMatch) {
    console.error('❌ Could not find validPaths array in 404.html');
    return [];
  }

  // Extract all paths from the array
  const pathsString = validPathsMatch[1];
  const pathMatches = pathsString.matchAll(/'([^']+)'/g);

  const paths = [];
  for (const match of pathMatches) {
    paths.push(match[1]);
  }

  return paths;
}

// Run validation if called directly
if (require.main === module) {
  const success = validate404Redirects();
  process.exit(success ? 0 : 1);
}

module.exports = validate404Redirects;
