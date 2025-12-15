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

### Testing & Deployment
- `npm test` - Run tests
- `npm run deploy` - Build and deploy to GitHub Pages

## Architecture Overview

### Hybrid Multi-Page Application (MPA)

This project uses a unique hybrid approach that combines React SPA with static HTML generation:

1. **Build Process**: `build.js` orchestrates the entire build
   - Builds React SPA using Create React App
   - Generates static HTML files for each route and language using server-side rendering
   - Creates language-specific directories (e.g., `/en/`, `/es/`, `/fr/`, `/de/`)
   - Injects metadata and schema markup into each HTML file
   - Copies assets to each route directory

2. **Rendering System**: Uses custom Node.js utilities for SSR
   - `ComponentRenderer` - Renders React components to static HTML
   - `AssetExtractor` - Extracts and copies assets to route directories
   - `MetadataInjector` - Injects SEO metadata, Open Graph tags, and schema markup

3. **Client-Side Routing**: `App.js` handles routing without React Router
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
   - Organization schema
   - Website schema
   - Blog post schema with author and publication date
   - FAQ schema

3. **Sitemap**: Generated via `generate-sitemap.js`

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

- Custom domain configured via `CNAME` file
- Deploy script runs `predeploy` hook which builds everything
- 404 handling redirects valid routes to appropriate static HTML

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
BUILD_LANGUAGES=en npm run build-static
npx serve -s build
```
Navigate to `http://localhost:3000/en/` to see the English version.

## Common Pitfalls

1. **Missing translations**: Always add translations for all 4 languages or the build will fail
2. **Blog data out of sync**: Run `generate-blog-data` after modifying blog translation files
3. **Asset paths**: Use public paths (`/images/`) not relative imports for static assets
4. **Language routing**: Remember to handle language prefix in all route checks
5. **Build caching**: Run `npm run clean-build` if you encounter stale build issues
