#!/usr/bin/env node
/**
 * WhimsyLabs Page Builder Tool
 *
 * Automates the creation of new pages for the WhimsyLabs MPA (Multi-Page Application).
 *
 * === ARCHITECTURE CONTEXT ===
 * This site is deployed on GitHub Pages (free tier) as a Multi-Page Application.
 * Each page MUST have its own static HTML file with fully-rendered content because:
 *   - Search engine bots (Google, Bing) crawl the raw HTML — they do NOT execute JS
 *   - GitHub Pages serves static files only — no server-side rendering at request time
 *   - The build process (build.js) pre-renders React components to static HTML via SSR
 *   - React then "hydrates" the page client-side for interactivity
 *
 * === WHAT THIS TOOL DOES ===
 * When you run `node scripts/page-builder.js`, it:
 *   1. Creates the React component file (src/Components/{Name}.js)
 *   2. Creates the CSS file (src/Components/{Name}.css)
 *   3. Adds translation keys for all 5 languages (en, es, fr, de, jp)
 *   4. Registers the route in build.js (routeComponentMap, getPageMetadata, loadReactComponents)
 *   5. Registers the route in App.js (getComponentForPath, import statement)
 *   6. Adds the route to 404.html validPaths (all languages)
 *   7. Adds the route to metadata-injector.js (getDefaultMetadata)
 *   8. Adds the route to sitemap generation in build.js (staticPages array)
 *
 * === CRITICAL REQUIREMENTS FOR NEW PAGES ===
 * Every new page must satisfy ALL of these for proper SEO and MPA functionality:
 *
 * 1. STATIC HTML: The build creates /route/index.html with full content baked in
 * 2. META TAGS: <title>, <meta description>, Open Graph, Twitter Card — all in the HTML
 * 3. SCHEMA MARKUP: JSON-LD structured data injected during build (not by React)
 * 4. CANONICAL URL: Self-referencing canonical + hreflang alternates for all languages
 * 5. TRANSLATIONS: Title/description in all 5 languages for metadata injection
 * 6. ROUTING: Both build.js (SSR) and App.js (client hydration) must know the route
 * 7. 404.HTML: validPaths array must include the route for trailing-slash redirects
 * 8. SITEMAP: Route must appear in sitemap.xml with proper priority/changefreq
 * 9. ROBOTS.TXT: Auto-generated from build — page will be included automatically
 *
 * === URL CONVENTIONS ===
 * - English pages: /route/ (NO /en/ prefix)
 * - Other languages: /es/route/, /fr/route/, /de/route/, /jp/route/
 * - All URLs use trailing slashes
 *
 * === VALIDATION ===
 * After building, 20+ validators run automatically to check:
 * - Meta tags present and correct length
 * - Schema markup valid
 * - Hreflang tags consistent
 * - Open Graph tags present
 * - Breadcrumb schema correct
 * - Sitemap matches build output
 * - 404.html validPaths matches build output
 * - Page content is SSR-rendered (not empty divs)
 * - Internal links valid
 * - Image alt text present
 *
 * Usage:
 *   node scripts/page-builder.js
 *   node scripts/page-builder.js --name "My Page" --route "/my-page" --priority 0.7
 */

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

// ============================================================
// Configuration — mirrors build.js config
// ============================================================
const SITE_URL = 'https://whimsylabs.ai';
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'jp'];
const DEFAULT_LANGUAGE = 'en';

// Language prefixes used in 404.html validPaths
const LANG_PREFIXES_404 = ['', '/de', '/es', '/fr', '/jp'];

// Valid priority values for sitemap
const VALID_PRIORITIES = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'];
const VALID_CHANGEFREQS = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];

// ============================================================
// File paths
// ============================================================
const ROOT = path.resolve(__dirname, '..');
const PATHS = {
  components: path.join(ROOT, 'src', 'Components'),
  translations: path.join(ROOT, 'src', 'i18n', 'translations.js'),
  buildJs: path.join(ROOT, 'build.js'),
  appJs: path.join(ROOT, 'src', 'App.js'),
  fourOhFour: path.join(ROOT, 'public', '404.html'),
  metadataInjector: path.join(ROOT, 'scripts', 'metadata-injector.js'),
  packageJson: path.join(ROOT, 'package.json'),
};

// ============================================================
// Interactive CLI
// ============================================================
function createReadline() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function ask(rl, question, defaultValue = '') {
  const suffix = defaultValue ? ` [${defaultValue}]` : '';
  return new Promise((resolve) => {
    rl.question(`${question}${suffix}: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

// ============================================================
// Parse CLI arguments for non-interactive mode
// ============================================================
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    if (value) parsed[key] = value;
  }
  return parsed;
}

// ============================================================
// Derive names from user input
// ============================================================
function deriveNames(pageName, routePath) {
  // ComponentName: "My Cool Page" -> "MyCoolPage"
  const componentName = pageName
    .split(/[\s-]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');

  // CSS class prefix: "MyCoolPage" -> "my-cool-page"
  const cssPrefix = pageName
    .split(/[\s-]+/)
    .map(w => w.toLowerCase())
    .join('-');

  // Route: ensure leading slash, no trailing slash for internal use
  let route = routePath.startsWith('/') ? routePath : `/${routePath}`;
  route = route.replace(/\/+$/, '');

  // Translation key: "/data-security" -> "dataSecurity"
  const translationKey = route
    .replace(/^\//, '')
    .split(/[-/]/)
    .map((part, i) => i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  return { componentName, cssPrefix, route, translationKey };
}

// ============================================================
// File generators
// ============================================================

function generateComponentFile(componentName, cssPrefix, title, description) {
  return `import React from "react";
import "./${componentName}.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import withTranslation from "./withTranslation";

const ${componentName} = ({ t, language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />

      {/* Hero Section */}
      <section className="${cssPrefix}-hero-section">
        <div
          className="${cssPrefix}-hero-bg"
          style={{ backgroundImage: "url(/images/tiled.png)" }}
        ></div>
        <div className="container">
          <div className="${cssPrefix}-hero-content">
            <h1 className="${cssPrefix}-hero-title">${title}</h1>
            <p className="${cssPrefix}-hero-subtitle">
              ${description}
            </p>
          </div>
        </div>
        <div className="${cssPrefix}-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z"
              fill="#201853"
            />
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <BubbleContainer>
        <section className="${cssPrefix}-content-section">
          <h2>Content Heading</h2>
          <p className="${cssPrefix}-content-text">
            Add your page content here. This section is wrapped in BubbleContainer
            for the animated bubble background effect.
          </p>
        </section>
      </BubbleContainer>

      {/* CTA Section */}
      <section className="${cssPrefix}-cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Get in touch to learn more.</p>
          <a href="/contact/" className="${cssPrefix}-cta-button">
            Contact Us
          </a>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation(${componentName});
`;
}

function generateCSSFile(cssPrefix) {
  return `/* ${cssPrefix} page styles */

/* Hero Section */
.${cssPrefix}-hero-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 120px 0 80px;
}

.${cssPrefix}-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.${cssPrefix}-hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.${cssPrefix}-hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.${cssPrefix}-hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.${cssPrefix}-wave-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.${cssPrefix}-wave-divider svg {
  display: block;
  width: 100%;
  height: 60px;
}

/* Content Section */
.${cssPrefix}-content-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
}

.${cssPrefix}-content-section h2 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
}

.${cssPrefix}-content-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
}

/* CTA Section */
.${cssPrefix}-cta-section {
  background: #201853;
  padding: 60px 20px;
  text-align: center;
}

.${cssPrefix}-cta-section h2 {
  color: #ffffff;
  font-size: 2rem;
  margin-bottom: 15px;
}

.${cssPrefix}-cta-section p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.${cssPrefix}-cta-button {
  display: inline-block;
  background: #dabeff;
  color: #1f1968;
  padding: 14px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.${cssPrefix}-cta-button:hover {
  background: #c5a3f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(218, 190, 255, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .${cssPrefix}-hero-title {
    font-size: 2rem;
  }

  .${cssPrefix}-hero-subtitle {
    font-size: 1rem;
  }

  .${cssPrefix}-content-section {
    padding: 40px 15px;
  }
}
`;
}

// ============================================================
// File modification functions
// ============================================================

/**
 * Add translation keys to src/i18n/translations.js
 */
async function addTranslationKeys(translationKey, title, description, translations) {
  let content = await fs.readFile(PATHS.translations, 'utf8');

  // For each language, find the closing of the language block and add before it
  const languageOrder = ['en', 'es', 'fr', 'de', 'jp'];

  for (const lang of languageOrder) {
    const t = translations[lang];

    // Find the landingDemo block for this language as an anchor point
    // We'll add the new key just before the landingDemo block
    const landingDemoPattern = new RegExp(
      `(\\s*// Landing Demo \\(Homepage\\)\\s*\\n\\s*landingDemo:)`,
      'g'
    );

    // We need to find the Nth occurrence for each language
    // Better approach: find the language block boundaries
    // Look for the pattern of the translation key already existing
    const existingPattern = new RegExp(`${translationKey}:\\s*\\{`);
    if (existingPattern.test(content)) {
      console.log(`  ⚠️  Translation key '${translationKey}' already exists in translations.js — skipping`);
      return;
    }

    // Find each language section and add the new key before landingDemo
    const langSectionStart = content.indexOf(`  ${lang}: {`);
    if (langSectionStart === -1) continue;

    // Find the landingDemo section within this language block
    const landingDemoIndex = content.indexOf('landingDemo:', langSectionStart);
    if (landingDemoIndex === -1) continue;

    // Find the comment line before landingDemo
    const commentLineStart = content.lastIndexOf('// Landing Demo', landingDemoIndex);
    if (commentLineStart === -1) continue;

    // Find the start of that line (including whitespace)
    let lineStart = commentLineStart;
    while (lineStart > 0 && content[lineStart - 1] !== '\n') {
      lineStart--;
    }

    // Insert the new translation block before the Landing Demo comment
    const newBlock = `    // ${t.title.split('|')[0].trim()}
    ${translationKey}: {
      title: "${t.title.replace(/"/g, '\\"')}",
      description: "${t.description.replace(/"/g, '\\"')}",
    },

`;

    content = content.slice(0, lineStart) + newBlock + content.slice(lineStart);
  }

  await fs.writeFile(PATHS.translations, content, 'utf8');
  console.log('  ✅ Added translation keys to translations.js');
}

/**
 * Register route in build.js
 * Updates: routeComponentMap, getPageMetadata, loadReactComponents, staticPages in sitemap
 */
async function updateBuildJs(componentName, route, translationKey, title, description, keywords, priority, changefreq) {
  let content = await fs.readFile(PATHS.buildJs, 'utf8');

  // 1. Add to routeComponentMap
  const routeMapMarker = '// "/landing-demo": "LandingDemo", // Now the homepage';
  if (!content.includes(`"${route}": "${componentName}"`)) {
    content = content.replace(
      routeMapMarker,
      `"${route}": "${componentName}",\n  ${routeMapMarker}`
    );
    console.log('  ✅ Added to routeComponentMap in build.js');
  } else {
    console.log('  ⚠️  Route already in routeComponentMap — skipping');
  }

  // 2. Add to getPageMetadata
  const metadataMarker = '// "/landing-demo" is now the homepage at "/"';
  if (!content.includes(`"${route}": {`)) {
    const metadataBlock = `  "${route}": {
    title: translations[lang]?.${translationKey}?.title || "${title}",
    description: translations[lang]?.${translationKey}?.description || "${description}",
    keywords: "${keywords}",
  },
  ${metadataMarker}`;
    content = content.replace(metadataMarker, metadataBlock);
    console.log('  ✅ Added to getPageMetadata in build.js');
  } else {
    console.log('  ⚠️  Route already in getPageMetadata — skipping');
  }

  // 3. Add to loadReactComponents
  const loadMarker = 'ReactComponents.LandingDemo = require("./src/Components/LandingDemo.js").default;';
  if (!content.includes(`ReactComponents.${componentName}`)) {
    const loadLine = `ReactComponents.${componentName} = require("./src/Components/${componentName}.js").default;\n    console.log("✅ Loaded ${componentName}");\n\n    ${loadMarker}`;
    content = content.replace(loadMarker, loadLine);
    console.log('  ✅ Added to loadReactComponents in build.js');
  } else {
    console.log('  ⚠️  Component already in loadReactComponents — skipping');
  }

  // 4. Add to staticPages for sitemap generation
  const sitemapMarker = "{ path: '/privacy/', priority:";
  if (!content.includes(`path: '${route}/'`)) {
    // Find the privacy line and add after it
    const privacyLineEnd = content.indexOf('\n', content.indexOf(sitemapMarker));
    if (privacyLineEnd !== -1) {
      const newSitemapEntry = `\n      { path: '${route}/', priority: '${priority}', changefreq: '${changefreq}' },`;
      content = content.slice(0, privacyLineEnd) + newSitemapEntry + content.slice(privacyLineEnd);
      console.log('  ✅ Added to sitemap staticPages in build.js');
    }
  } else {
    console.log('  ⚠️  Route already in sitemap staticPages — skipping');
  }

  await fs.writeFile(PATHS.buildJs, content, 'utf8');
}

/**
 * Register route in App.js
 * Updates: import statement and getComponentForPath
 */
async function updateAppJs(componentName, route) {
  let content = await fs.readFile(PATHS.appJs, 'utf8');

  // 1. Add import statement
  const lastImportMarker = 'import BlogPost from "./Components/BlogPost";';
  if (!content.includes(`import ${componentName} from`)) {
    content = content.replace(
      lastImportMarker,
      `${lastImportMarker}\nimport ${componentName} from "./Components/${componentName}";`
    );
    console.log('  ✅ Added import to App.js');
  } else {
    console.log('  ⚠️  Import already exists in App.js — skipping');
  }

  // 2. Add route to getComponentForPath
  // Find the section before blog post handling
  const blogHandlerMarker = '// Handle blog posts';
  if (!content.includes(`basePath === "${route}/"`)) {
    const routeLine = `    if (basePath === "${route}/" || basePath === "${route}")\n      return <${componentName} language={language} />;\n    ${blogHandlerMarker}`;
    content = content.replace(blogHandlerMarker, routeLine);
    console.log('  ✅ Added route to getComponentForPath in App.js');
  } else {
    console.log('  ⚠️  Route already in getComponentForPath — skipping');
  }

  await fs.writeFile(PATHS.appJs, content, 'utf8');
}

/**
 * Add route to 404.html validPaths
 * Must add for all language prefixes
 */
async function updateFourOhFour(route) {
  let content = await fs.readFile(PATHS.fourOhFour, 'utf8');

  // Check if route already exists
  if (content.includes(`'${route}'`)) {
    console.log('  ⚠️  Route already in 404.html validPaths — skipping');
    return;
  }

  // Find the validPaths array and add new entries for each language
  // We need to add to each language section line
  // The format is: '/route', and for other languages: '/de/route', '/es/route', etc.

  // Find the last entry in the English line to append after
  // Pattern: lines with '/privacy', ... ending entries for each language
  const validPathsStart = content.indexOf('var validPaths = [');
  if (validPathsStart === -1) {
    console.log('  ❌ Could not find validPaths array in 404.html');
    return;
  }

  // Parse the array to find the line structure
  // English line starts with no prefix
  // Each subsequent line starts with /de, /es, /fr, /jp

  // Find the end of the English line (line starting with spaces and containing '/blog',)
  // and add our route before the end of that line
  const lines = content.split('\n');
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // English line (no prefix)
    if (line.includes("'/blog'") && line.includes("'/services'") && !line.includes("'/de")) {
      // Add the route before the end of this array section
      const routeName = route.replace(/^\//, '');
      if (!line.includes(`'${route}'`)) {
        lines[i] = line.replace(
          "'/data-security'",
          `'/data-security', '${route}'`
        );
        modified = true;
      }
    }
    // German line
    else if (line.includes("'/de/blog'") && line.includes("'/de/services'")) {
      if (!line.includes(`'/de${route}'`)) {
        lines[i] = line.replace(
          "'/de/data-security'",
          `'/de/data-security', '/de${route}'`
        );
      }
    }
    // Spanish line
    else if (line.includes("'/es/blog'") && line.includes("'/es/services'")) {
      if (!line.includes(`'/es${route}'`)) {
        lines[i] = line.replace(
          "'/es/data-security'",
          `'/es/data-security', '/es${route}'`
        );
      }
    }
    // French line
    else if (line.includes("'/fr/blog'") && line.includes("'/fr/services'")) {
      if (!line.includes(`'/fr${route}'`)) {
        lines[i] = line.replace(
          "'/fr/data-security'",
          `'/fr/data-security', '/fr${route}'`
        );
      }
    }
    // Japanese line
    else if (line.includes("'/jp/blog'") && line.includes("'/jp/services'")) {
      if (!line.includes(`'/jp${route}'`)) {
        lines[i] = line.replace(
          "'/jp/data-security'",
          `'/jp/data-security', '/jp${route}'`
        );
      }
    }
  }

  if (modified) {
    await fs.writeFile(PATHS.fourOhFour, lines.join('\n'), 'utf8');
    console.log('  ✅ Added route to 404.html validPaths (all languages)');
  } else {
    console.log('  ⚠️  Could not modify 404.html — please add manually');
  }
}

/**
 * Add route metadata to metadata-injector.js
 */
async function updateMetadataInjector(route, translationKey, title, description, keywords) {
  let content = await fs.readFile(PATHS.metadataInjector, 'utf8');

  // Check if route already exists
  if (content.includes(`'${route}':`)) {
    console.log('  ⚠️  Route already in metadata-injector.js — skipping');
    return;
  }

  // Add before the /spa entry
  const spaMarker = "      '/spa':";
  const newEntry = `      '${route}': {
        title: t.${translationKey}?.title || '${title.replace(/'/g, "\\'")}',
        description: t.${translationKey}?.description || '${description.replace(/'/g, "\\'")}',
        keywords: '${keywords.replace(/'/g, "\\'")}',
      },
${spaMarker}`;

  content = content.replace(spaMarker, newEntry);
  await fs.writeFile(PATHS.metadataInjector, content, 'utf8');
  console.log('  ✅ Added route to metadata-injector.js');
}

// ============================================================
// Main execution
// ============================================================

async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║       WhimsyLabs Page Builder Tool               ║');
  console.log('║                                                  ║');
  console.log('║  Creates a new page with full MPA/SEO support:   ║');
  console.log('║  • React component + CSS                         ║');
  console.log('║  • Translations (5 languages)                    ║');
  console.log('║  • Build system registration (SSR)               ║');
  console.log('║  • Client routing (App.js)                       ║');
  console.log('║  • 404.html redirect paths                       ║');
  console.log('║  • Metadata injection (SEO)                      ║');
  console.log('║  • Sitemap entry                                 ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');

  const cliArgs = parseArgs();
  const rl = createReadline();

  try {
    // Gather inputs
    const pageName = cliArgs.name || await ask(rl, 'Page name (e.g., "About Us")', '');
    if (!pageName) {
      console.log('❌ Page name is required');
      process.exit(1);
    }

    const defaultRoute = '/' + pageName.toLowerCase().replace(/\s+/g, '-');
    const routePath = cliArgs.route || await ask(rl, 'Route path', defaultRoute);

    const defaultTitle = `${pageName} | WhimsyLabs Virtual Lab Software`;
    const title = cliArgs.title || await ask(rl, 'Page title (for SEO <title> tag)', defaultTitle);

    const defaultDescription = `Learn more about ${pageName.toLowerCase()} at WhimsyLabs. Our virtual laboratory software transforms STEM education.`;
    const description = cliArgs.description || await ask(rl, 'Meta description (150-160 chars ideal)', defaultDescription);

    const defaultKeywords = `WhimsyLabs, ${pageName.toLowerCase()}, virtual lab, STEM education`;
    const keywords = cliArgs.keywords || await ask(rl, 'Keywords (comma-separated)', defaultKeywords);

    const priority = cliArgs.priority || await ask(rl, 'Sitemap priority (0.1-1.0)', '0.6');
    const changefreq = cliArgs.changefreq || await ask(rl, 'Sitemap change frequency (daily/weekly/monthly/yearly)', 'monthly');

    // Gather translations
    console.log('\n📝 Translation titles and descriptions for each language:');
    console.log('   (Press Enter to use English as fallback)\n');

    const translationInputs = {
      en: { title, description },
    };

    const langNames = { es: 'Spanish', fr: 'French', de: 'German', jp: 'Japanese' };
    for (const lang of ['es', 'fr', 'de', 'jp']) {
      const langTitle = await ask(rl, `  ${langNames[lang]} title`, title);
      const langDesc = await ask(rl, `  ${langNames[lang]} description`, description);
      translationInputs[lang] = { title: langTitle, description: langDesc };
    }

    rl.close();

    // Derive names
    const { componentName, cssPrefix, route, translationKey } = deriveNames(pageName, routePath);

    // Validate
    if (!VALID_PRIORITIES.includes(priority)) {
      console.log(`❌ Invalid priority '${priority}'. Must be one of: ${VALID_PRIORITIES.join(', ')}`);
      process.exit(1);
    }
    if (!VALID_CHANGEFREQS.includes(changefreq)) {
      console.log(`❌ Invalid changefreq '${changefreq}'. Must be one of: ${VALID_CHANGEFREQS.join(', ')}`);
      process.exit(1);
    }

    // Display summary
    console.log('\n📋 Summary:');
    console.log('═══════════════════════════════════════════════');
    console.log(`  Component:      ${componentName}`);
    console.log(`  Route:          ${route}`);
    console.log(`  Translation key: ${translationKey}`);
    console.log(`  CSS prefix:     ${cssPrefix}`);
    console.log(`  Title:          ${title}`);
    console.log(`  Description:    ${description.substring(0, 80)}...`);
    console.log(`  Sitemap:        priority=${priority}, changefreq=${changefreq}`);
    console.log('');
    console.log('  Files to create:');
    console.log(`    src/Components/${componentName}.js`);
    console.log(`    src/Components/${componentName}.css`);
    console.log('');
    console.log('  Files to modify:');
    console.log('    src/i18n/translations.js      (translation keys)');
    console.log('    build.js                       (route map, metadata, component loading, sitemap)');
    console.log('    src/App.js                     (import + route)');
    console.log('    public/404.html                (validPaths for all languages)');
    console.log('    scripts/metadata-injector.js   (SEO metadata defaults)');
    console.log('═══════════════════════════════════════════════');

    // Check for existing files
    const componentPath = path.join(PATHS.components, `${componentName}.js`);
    const cssPath = path.join(PATHS.components, `${componentName}.css`);

    if (await fs.pathExists(componentPath)) {
      console.log(`\n❌ Component file already exists: ${componentPath}`);
      console.log('   Delete it first or choose a different name.');
      process.exit(1);
    }

    // Execute
    console.log('\n🚀 Creating page...\n');

    // 1. Create component file
    const componentContent = generateComponentFile(componentName, cssPrefix, title.split('|')[0].trim(), description);
    await fs.writeFile(componentPath, componentContent, 'utf8');
    console.log(`  ✅ Created ${componentName}.js`);

    // 2. Create CSS file
    const cssContent = generateCSSFile(cssPrefix);
    await fs.writeFile(cssPath, cssContent, 'utf8');
    console.log(`  ✅ Created ${componentName}.css`);

    // 3. Add translations
    console.log('\n📝 Updating translations...');
    await addTranslationKeys(translationKey, title, description, translationInputs);

    // 4. Update build.js
    console.log('\n🔧 Updating build.js...');
    await updateBuildJs(componentName, route, translationKey, title, description, keywords, priority, changefreq);

    // 5. Update App.js
    console.log('\n🔧 Updating App.js...');
    await updateAppJs(componentName, route);

    // 6. Update 404.html
    console.log('\n🔧 Updating 404.html...');
    await updateFourOhFour(route);

    // 7. Update metadata-injector.js
    console.log('\n🔧 Updating metadata-injector.js...');
    await updateMetadataInjector(route, translationKey, title, description, keywords);

    // Done!
    console.log('\n' + '═'.repeat(60));
    console.log('✅ Page created successfully!');
    console.log('═'.repeat(60));
    console.log('');
    console.log('📋 Next steps:');
    console.log('');
    console.log(`  1. Edit the component: src/Components/${componentName}.js`);
    console.log(`     - Add your actual page content`);
    console.log(`     - Use {t.${translationKey}.yourKey} for translated strings`);
    console.log('');
    console.log(`  2. Style the page: src/Components/${componentName}.css`);
    console.log(`     - CSS prefix: .${cssPrefix}-*`);
    console.log('');
    console.log('  3. Add any additional translation keys to src/i18n/translations.js');
    console.log('');
    console.log('  4. Build and test:');
    console.log('     npm run build-static');
    console.log('');
    console.log('  5. The following validators will automatically verify your page:');
    console.log('     • validate-meta-tags         — title + description present');
    console.log('     • validate-title-length       — SEO title length check');
    console.log('     • validate-meta-descriptions  — description length check');
    console.log('     • validate-hreflang           — language alternates correct');
    console.log('     • validate-opengraph          — OG tags present');
    console.log('     • validate-breadcrumb-schema  — breadcrumb JSON-LD');
    console.log('     • validate-all-schemas        — all structured data valid');
    console.log('     • validate-404-redirects      — 404.html paths match build');
    console.log('     • validate-page-content       — SSR content not empty');
    console.log('     • validate-sitemap            — sitemap matches build');
    console.log('     • validate-seo-uniqueness     — unique titles/descriptions');
    console.log('     • build-summary               — overall build report');
    console.log('');
    console.log('  6. If adding schema markup (FAQ, Event, etc.), update:');
    console.log('     scripts/metadata-injector.js → generateStructuredData()');
    console.log('');
    console.log('  📖 For full documentation, see CLAUDE.md → "Adding a New Page"');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
