# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WhimsyLabs is a React-based multilingual website for a virtual laboratory software company. The project uses a hybrid architecture combining React SPA functionality with static HTML generation for SEO optimization and GitHub Pages deployment.

## Essential Commands

### Development
- `npm start` - Start React development server (port 3000)
- `npm run dev` - Build and start dev server with auto-rebuild (port 3001)
- `node dev-server.js` - Run the custom dev server after building
- `npx serve -s build` - Serve the built static site locally

### Building
- `npm run build-static` - **Primary build command**: Builds React app + generates static HTML for all languages
- `npm run build-english-only` - Build only English version (faster for testing)
- `npm run clean-build` - Clean build directory before building

### Translation & Content
- `npm run generate-blog-data` - Generate blog post data from translation files (required after adding/editing posts)
- `npm run validate-translations` - Validate all translation files
- `npm run validate-blog-translations` - Validate blog translation files
- `npm run validate-faq-translations` - Validate FAQ translation files
- `npm run generate-faq-translations` - Generate FAQ translation files

### Validation & Testing
- `npm run validate-translations` - Validate all translation files
- `npm run validate-meta-tags` - Validate meta tags in build output
- `npm run validate-title-length` - Validate SEO title lengths
- `npm run validate-redirects-metadata` - Validate redirect rules and metadata
- `npm run validate-404-redirects` - **Validate 404.html paths match build output**
- `npm run validate-faq-schema` - **Validate FAQ schema has all questions (min 30)**
- `npm test` - Run tests

### Deployment
- `npm run deploy` - Build and deploy to GitHub Pages

## Architecture Overview

### Hybrid Multi-Page Application (MPA)

**CRITICAL: This site MUST be a Multi-Page Application (MPA), NOT a Single-Page Application (SPA)**

**Why MPA is required:**
- GitHub Pages free tier requires separate HTML files for proper page tracking and SEO
- Each page needs its own static HTML file for search engines to index correctly
- MPA structure ensures each language version has its own crawlable pages
- Cannot use client-side routing exclusively - each route must be a real HTML file

**URL Structure Convention:**
- **English pages:** `/blog/`, `/services/`, `/features/` (NO `/en/` prefix)
- **Other languages:** `/es/blog/`, `/fr/services/`, `/de/features/` (WITH language prefix)
- English is the default language and does NOT use `/en/` prefix
- This is intentional and correct - do NOT add `/en/` prefix to English pages

This project uses a unique hybrid approach that combines React SPA with static HTML generation:

1. **Build Process**: `build.js` orchestrates the entire build
   - Builds React SPA using Create React App
   - Generates static HTML files for each route and language using server-side rendering
   - Creates language-specific directories: `/es/`, `/fr/`, `/de/` (English has no prefix)
   - Each language gets separate static HTML files (required for MPA structure)
   - Injects metadata and schema markup into each HTML file
   - Copies assets to each route directory

2. **Rendering System**: Uses custom Node.js utilities for SSR
   - `ComponentRenderer` - Renders React components to static HTML
   - `AssetExtractor` - Extracts and copies assets to route directories
   - `MetadataInjector` (`scripts/metadata-injector.js`) - Injects SEO metadata, Open Graph tags, and schema markup
     - **CRITICAL**: Schema markup (FAQPage, Organization, Product) is generated here during build, NOT by React components
     - FAQ schema dynamically loads ALL FAQ items from `src/data/faqData.js` and strips HTML
     - Adds canonical URLs, hreflang tags, and language-specific metadata
     - Each route can have custom schema markup injected during SSR

3. **Client-Side Routing**: `App.js` handles routing without React Router
   - Each page loads its own static HTML file first (MPA behavior)
   - React hydrates the page for interactivity after initial HTML load
   - Checks `window.__INITIAL_ROUTE__` set by static HTML
   - Path-based component rendering using `getComponentForPath()`
   - Supports both static routes and dynamic blog post routes

### Internationalization (i18n)

The site supports 4 languages: English (en), Spanish (es), French (fr), German (de)

1. **Translation System**:
   - Centralized translations in `src/i18n/translations.js`
   - Separate translation modules for major sections (homeDataGenerator, contactDataGenerator, faqDataGenerator, blogDataGenerator)
   - Blog posts stored in `src/i18n/blog/{postId}/{language}.js`

2. **Language Detection**:
   - URL-based language detection (e.g., `/es/blog`, `/fr/services`)
   - `getCurrentLanguage()` in `src/i18n/index.js` extracts language from URL
   - Falls back to English for default route (`/`)

3. **Build Configuration**:
   - Set `BUILD_LANGUAGES=en` environment variable to build single language
   - Default builds all 4 languages
   - Each language gets its own directory structure in the build

### Component Architecture

**Page Components** (full pages with Header/Footer):
- `MainContent.js` - Homepage
- `Blog.js` - Blog listing page
- `BlogPost.js` - Individual blog post viewer
- `Services.js` - Services page
- `FeaturesPage.js` - Features page
- `FAQPage.js` - FAQ page
- `ContactPage.js` - Contact page
- `PrivacyPage.js` - Privacy policy page

**Reusable Components**:
- `Header.js` - Navigation header with language switcher
- `Footer.js` - Site footer with links and social icons
- `BubbleContainer.js` - Animated bubble effect wrapper
- `WelcomeSection.js` - Hero section with animated text
- `FeaturesSection.js` - Feature showcase grid
- `Testimonial.js` - Testimonial carousel
- `VideoPlayer.js` - Video player with fallbacks

**HOCs and Utilities**:
- `withTranslation.js` - HOC for injecting translations into components
- `MetaTags.js` - Dynamic meta tag management
- `SchemaMarkup.js` - Structured data for SEO

### Blog System

The blog uses a translation-based system rather than markdown:

1. **Blog Post Structure**:
   - Posts defined in `src/i18n/blog/{postId}/{language}.js`
   - Each post exports: `title`, `description`, `content`, `keywords`
   - Content is JSX for rich formatting

2. **Blog Data Generation**:
   - `scripts/generate-blog-data.js` extracts blog metadata from translation files
   - Creates `src/i18n/blogData.generated.js` with post listings
   - Maps post IDs to slugs and dates

3. **Static Blog Post Generation**:
   - Build script generates individual HTML files for each blog post
   - URL structure: `/{language}/blog/{slug}/`
   - Each post gets its own metadata and schema markup

### SEO & Metadata

The site implements comprehensive SEO:

1. **Meta Tags**: Managed via `react-helmet-async`
   - Page-specific titles and descriptions
   - Open Graph tags for social sharing
   - Twitter Card metadata
   - Bluesky Card metadata

2. **Schema Markup**: Structured data for rich search results
   - **Generated during build by `scripts/metadata-injector.js`**, NOT React components
   - Organization schema (on all pages)
   - Website schema (on all pages)
   - Product/SoftwareApplication schema (homepage)
   - Blog post schema with author and publication date
   - **FAQPage schema** (on `/faq/` route):
     - Dynamically loads ALL FAQ items from `src/data/faqData.js`
     - Strips HTML tags from questions/answers for proper schema format
     - Currently includes 35+ FAQ questions
     - **IMPORTANT**: When adding/editing FAQs in `src/data/faqData.js`, the schema updates automatically on next build

3. **Sitemap**: Generated via `generate-sitemap.js`

## Debugging & Troubleshooting

### Diagnosing SEO and Indexing Errors

When troubleshooting SEO issues, indexing problems, or metadata errors, **always fetch the live website** to see what search engines actually see:

1. **Use WebFetch to retrieve live pages**: Don't assume the local build matches production
   ```
   WebFetch: https://whimsylabs.io/en/blog/post-slug/
   ```

2. **Check what you're looking for**:
   - Meta tags (title, description, Open Graph, Twitter Card)
   - Schema markup (JSON-LD structured data)
   - Canonical URLs and language alternates
   - HTTP status codes and redirects
   - Content rendering and JavaScript execution

3. **Compare with expectations**:
   - Cross-reference with local build output
   - Verify against Google Search Console error messages
   - Check if content matches translation files

4. **Common issues to look for**:
   - Missing or incorrect meta tags
   - Broken schema markup (invalid JSON-LD)
   - 404 errors or redirect chains
   - Missing language alternates (hreflang)
   - Duplicate or missing content

### Google Search Console Indexing Error Mode

**Important Context:**
- This site is an MPA (Multi-Page Application) deployed on GitHub Pages
- English pages intentionally have NO `/en/` prefix (e.g., `/blog/`, `/services/`)
- Other languages have prefixes (e.g., `/es/blog/`, `/fr/services/`)
- Typo URLs and truncated paths in Search Console can be ignored - they correctly return 404s
- GitHub Pages does NOT support `_redirects` files - redirects are handled via `404.html`

When working on Google Search Console indexing errors, follow this systematic approach:

**Step 1: Gather Error Information**
- Ask user for specific URLs or error types from Search Console
- Common error types: "Crawled - currently not indexed", "Duplicate without canonical", "Soft 404", "Page with redirect"

**Step 2: Fetch and Analyze Live Pages**
- Use WebFetch to retrieve each problematic URL
- Extract and examine:
  - HTTP status code
  - Meta tags (especially canonical, robots)
  - Schema markup
  - Content quality and uniqueness
  - Internal linking structure

**Step 3: Identify Root Cause**
- Compare live output with build script expectations
- Check if issue is in:
  - `build.js` metadata generation
  - Component-level meta tags
  - Translation content
  - Sitemap generation
  - Redirect configuration

**Step 4: Fix and Verify**
- Make necessary code changes
- Build locally and verify fix
- Deploy and re-fetch live URL to confirm
- Document changes for user to submit to Search Console

**Example Workflow**:
```
User: "Google Search Console shows 'Duplicate without canonical' for /en/blog/ai-safety/"

1. WebFetch: https://whimsylabs.io/en/blog/ai-safety/
2. Check for canonical tag in response
3. If missing/incorrect, check build.js getPageMetadata()
4. Fix canonical URL generation
5. Rebuild and verify locally
6. Provide fix explanation to user
```

## Key Development Patterns

### File Size Guideline
Keep all files under 500 lines of code. Split large components into smaller, focused modules.

### Adding a New Page

1. Create page component in `src/Components/NewPage.js`
2. Add translations to `src/i18n/translations.js`
3. Add route mapping in `build.js` `routeComponentMap` object
4. Add metadata in `build.js` `getPageMetadata()` function
5. Add route in `App.js` `getComponentForPath()` function
6. Update sitemap generation if needed

### Adding a New Blog Post

**For detailed step-by-step instructions, see [docs/ADDING_BLOG_POSTS.md](docs/ADDING_BLOG_POSTS.md)**

Quick steps:
1. Create `src/Components/blog/Post{N}.js` with title, date, slug, description, content exports
2. Create translation files in `src/i18n/blog/post{N}/` for each language (en, es, fr, de)
3. Edit these configuration files:
   - `scripts/generate-blog-data.js` - Add to blogPosts array, postIdToSlug, postDates
   - `src/i18n/blogDataGenerator.js` - Add to blogPosts array
   - `src/Components/BlogPost.js` - Import Post{N}, add to fallbackPosts, add to slugToPostId
   - `src/Components/Blog.js` - Import Post{N}, add to fallbackPosts, add to slugToPostId
   - `build.js` - Require Post{N} in TWO places, add to both fallbackPosts arrays
4. Run `npm run generate-blog-data` to update generated files
5. Build with `npm run build-static` to generate static HTML

**Important**: The blog system uses TWO parallel structures:
- `src/Components/blog/Post{N}.js` - JSX components for build/fallback
- `src/i18n/blog/post{N}/{lang}.js` - Translation files for multilingual content

### Working with Translations

1. Add/update translations in `src/i18n/translations.js`
2. Use `withTranslation()` HOC or pass `language` prop to components
3. Run `npm run validate-translations` to check for missing keys
4. Test all languages by building with `npm run build-static`

## Important Notes

### Build System Quirks

- **Do NOT use `npm run build`** - it doesn't work correctly
- Always use `npm run build-static` for production builds
- The build script requires Babel configuration (`.babelrc`) for SSR
- Dev server (`dev-server.js`) watches files and auto-rebuilds

### Asset Management

- Static assets (images, videos) are in `public/` directory
- Assets are copied to each route directory during build
- Reference assets from React with public paths: `/images/file.png`

### GitHub Pages Deployment

**Critical Deployment Constraints:**
- Deployed to GitHub Pages using `gh-pages` package
- Custom domain configured via `CNAME` file: `whimsylabs.ai`
- Deploy script runs `predeploy` hook which builds everything
- **GitHub Pages does NOT support `_redirects` files** - that's Netlify-only
- Redirects handled via `404.html` JavaScript (www→non-www, http→https, trailing slashes)

**404.html Redirect Handler:**
- `public/404.html` provides redirect functionality since `_redirects` doesn't work
- Handles: `www.whimsylabs.ai` → `whimsylabs.ai`
- Handles: `http://` → `https://`
- Handles: Missing trailing slashes (e.g., `/es/blog` → `/es/blog/`)
- Shows proper 404 page for truly invalid URLs (preserves MPA structure)
- Does NOT aggressively redirect to home page (this is MPA, not SPA)

### Styling

- Component-scoped CSS files (e.g., `Header.css` for `Header.js`)
- Global styles in `App.css` and `index.css`
- Color palette:
  - Primary: `#dabeff` (lavender)
  - Secondary: `#95CEF6` (light blue)
  - Dark: `#1f1968` (deep purple)
- CSS animations using keyframes for bubbles, waves, text effects

## Testing Languages Locally

To test a specific language without building all languages:
```bash
# Test English only (no language prefix)
BUILD_LANGUAGES=en npm run build-static
npx serve -s build
# Navigate to http://localhost:3000/ (English is at root, no /en/ prefix)

# Test Spanish only
BUILD_LANGUAGES=es npm run build-static
npx serve -s build
# Navigate to http://localhost:3000/es/

# Test all languages
npm run build-static
npx serve -s build
# Navigate to:
# - http://localhost:3000/ (English)
# - http://localhost:3000/es/ (Spanish)
# - http://localhost:3000/fr/ (French)
# - http://localhost:3000/de/ (German)
```

## Common Pitfalls

1. **Missing translations**: Always add translations for all 4 languages or the build will fail
2. **Blog data out of sync**: Run `generate-blog-data` after modifying blog translation files
3. **Asset paths**: Use public paths (`/images/`) not relative imports for static assets
4. **Language routing**: Remember to handle language prefix in all route checks
5. **Build caching**: Run `npm run clean-build` if you encounter stale build issues
6. **MPA vs SPA confusion**: This is an MPA, NOT an SPA - do NOT implement SPA-style client-side routing or aggressive 404 redirects
7. **English URL prefix**: English pages do NOT use `/en/` prefix - this is intentional, do NOT add it
8. **GitHub Pages redirects**: The `_redirects` file doesn't work on GitHub Pages - use `404.html` for redirects instead
9. **Google Search Console typo URLs**: Invalid URLs (typos, truncated paths) in Search Console are expected and can be ignored - they correctly return 404s
10. **404.html out of sync**: When adding new pages/routes, update the `validPaths` array in `public/404.html` - the build will validate this automatically
