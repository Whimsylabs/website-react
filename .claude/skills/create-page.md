# Create Page Skill

When the user runs `/create-page` or asks to create/add a new page to the website:

## Overview

This skill creates a fully SEO-compliant, multilingual page for the WhimsyLabs MPA (Multi-Page Application). It handles ALL required file modifications so the page works with the static build system, is crawlable by search engine bots, and passes all 20+ validators.

## Why This Matters — Architecture Context

**This site is NOT a normal React SPA.** It's a Multi-Page Application deployed on GitHub Pages free tier.

Key constraints you MUST understand:
1. **Search engine bots cannot execute JavaScript.** They only see the raw HTML served by GitHub Pages.
2. **`build.js` pre-renders every page** via React SSR into separate `index.html` files (e.g., `/features/index.html`, `/es/features/index.html`).
3. **The HTML must contain the FULL page content, meta tags, schema markup, canonical URLs, and hreflang** — all baked in at build time.
4. **React hydrates the page client-side** for interactivity after the static HTML loads, but bots never see this.
5. **English pages have NO `/en/` prefix** — they live at root (`/blog/`, `/features/`). Other languages use prefixes (`/es/blog/`, `/fr/blog/`, `/de/blog/`, `/jp/blog/`).
6. **Every page needs entries in 7+ files** or it will either fail to build, fail validation, or be invisible to search engines.

## Information Needed

Ask the user for:
1. **Page name** (e.g., "About Us", "Pricing", "Research")
2. **Route** (e.g., `/about`, `/pricing`, `/research`)
3. **SEO title** for English (50-60 chars ideal, must include "WhimsyLabs")
4. **Meta description** for English (120-160 chars)
5. **Keywords** (comma-separated)
6. **Sitemap priority** (0.1-1.0, suggest based on importance)
7. **Sitemap change frequency** (daily/weekly/monthly/yearly)
8. **Translations** — titles and descriptions for Spanish, French, German, Japanese (or English fallback)
9. **Brief content description** — what the page is about so you can generate meaningful starter content

## Files to Create (2 files)

### 1. React Component: `src/Components/{ComponentName}.js`

Follow this exact pattern from existing pages:

```javascript
import React from "react";
import "./{ComponentName}.css";
import Header from "./Header";
import Footer from "./Footer";
import BubbleContainer from "./BubbleContainer";
import withTranslation from "./withTranslation";

const {ComponentName} = ({ t, language }) => {
  return (
    <main className="container-fluid text-center p-0">
      <Header language={language} />

      {/* Hero Section */}
      <section className="{css-prefix}-hero-section">
        ...hero content with h1, subtitle...
        <div className="{css-prefix}-wave-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z" fill="#201853" />
          </svg>
        </div>
      </section>

      {/* Content Sections - wrapped in BubbleContainer for animated background */}
      <BubbleContainer>
        <section>...content...</section>
      </BubbleContainer>

      <Footer language={language} />
    </main>
  );
};

export default withTranslation({ComponentName});
```

**Critical details:**
- MUST wrap with `withTranslation()` HOC — provides `t` (translation function) and `language`
- MUST include `<Header language={language} />` and `<Footer language={language} />`
- Use `BubbleContainer` for sections that need the animated bubble background
- Use `{t('translationKey.subKey')}` for any translatable text
- The component receives `{ t, language, currentLang }` as props

### 2. CSS File: `src/Components/{ComponentName}.css`

Follow existing patterns:
- Color palette: Primary `#dabeff` (lavender), Secondary `#95CEF6` (light blue), Dark `#1f1968` (deep purple)
- Use `{css-prefix}-` class naming convention
- Include hero, content, and CTA sections
- Include responsive breakpoints at 768px

## Files to Modify (5 files)

### 3. Translations: `src/i18n/translations.js`

Add a new key block in EACH language section (en, es, fr, de, jp). Insert BEFORE the `landingDemo:` block.

```javascript
// {Page Name}
{translationKey}: {
  title: "SEO Title Here",
  description: "Meta description here.",
},
```

**The translation key** is derived from the route: `/data-security` -> `dataSecurity`, `/about-us` -> `aboutUs`

You MUST add this in all 5 language blocks: `en:`, `es:`, `fr:`, `de:`, `jp:`

### 4. Build System: `build.js`

**Four separate locations** must be updated:

**a) `routeComponentMap` (~line 104):**
```javascript
"/{route}": "{ComponentName}",
```
Add before the `// "/landing-demo"` comment.

**b) `getPageMetadata` (~line 44):**
```javascript
"/{route}": {
  title: translations[lang]?.{translationKey}?.title || "Fallback Title",
  description: translations[lang]?.{translationKey}?.description || "Fallback description.",
  keywords: "keyword1, keyword2, keyword3",
},
```
Add before the `// "/landing-demo" is now the homepage` comment.

**c) `loadReactComponents` (~line 208):**
```javascript
ReactComponents.{ComponentName} = require("./src/Components/{ComponentName}.js").default;
console.log("✅ Loaded {ComponentName}");
```
Add before the `LandingDemo` loading line.

**d) `generateSitemap` → `staticPages` array (~line 965):**
```javascript
{ path: '/{route}/', priority: '{priority}', changefreq: '{changefreq}' },
```

### 5. Client Routing: `src/App.js`

**Two locations:**

**a) Import statement** (at top of file):
```javascript
import {ComponentName} from "./Components/{ComponentName}";
```
Add after the last page import, before `BlogPost`.

**b) `getComponentForPath` function:**
```javascript
if (basePath === "/{route}/" || basePath === "/{route}")
  return <{ComponentName} language={language} />;
```
Add before the `// Handle blog posts` comment.

### 6. 404 Redirect Paths: `public/404.html`

Add the route to the `validPaths` array for ALL language variants. The array has 5 lines (one per language group):

- English line: add `'/{route}'`
- German line: add `'/de/{route}'`
- Spanish line: add `'/es/{route}'`
- French line: add `'/fr/{route}'`
- Japanese line: add `'/jp/{route}'`

### 7. Metadata Injector: `scripts/metadata-injector.js`

Add to the `metaInfo` object inside `getDefaultMetadata()`:

```javascript
'/{route}': {
  title: t.{translationKey}?.title || 'Fallback Title',
  description: t.{translationKey}?.description || 'Fallback description.',
  keywords: 'keyword1, keyword2, keyword3',
},
```
Add before the `'/spa':` entry.

## Optional: Schema Markup

If the page needs special structured data (Event, FAQ, Product, etc.), add to `generateStructuredData()` in `scripts/metadata-injector.js`. Common schemas:

- **Event**: For event/conference pages (see `/bett` example)
- **FAQPage**: For FAQ-style pages (auto-loads from faqData.js)
- **Product**: For product showcase pages
- **HowTo**: For tutorial/guide pages

The Organization schema and BreadcrumbList schema are added automatically for all pages.

## Post-Creation Checklist

After creating all files, run:

```bash
npm run build-static
```

This runs the build + ALL 20+ validators. Key validators that check new pages:
- `validate-meta-tags` — title + description present in HTML
- `validate-title-length` — SEO title 30-60 chars
- `validate-meta-descriptions` — description 80-160 chars
- `validate-hreflang` — language alternate links correct
- `validate-opengraph` — OG tags present
- `validate-breadcrumb-schema` — breadcrumb JSON-LD valid
- `validate-all-schemas` — all structured data valid
- `validate-404-redirects` — 404.html paths match build output
- `validate-page-content` — SSR content not empty (critical!)
- `validate-sitemap` — sitemap URLs match build files
- `validate-seo-uniqueness` — unique titles/descriptions across pages

## Verification Commands

After build completes, verify the new page:

```bash
# Check the generated HTML exists for all languages
ls build/{route}/index.html
ls build/es/{route}/index.html
ls build/fr/{route}/index.html
ls build/de/{route}/index.html
ls build/jp/{route}/index.html

# Verify title is in the static HTML (this is what bots see!)
grep -oP '<title>[^<]+</title>' build/{route}/index.html

# Verify meta description is baked in
grep 'name="description"' build/{route}/index.html

# Verify schema markup present
grep -c '"@type"' build/{route}/index.html

# Verify canonical URL
grep 'rel="canonical"' build/{route}/index.html

# Verify hreflang tags (should be 6: en, de, es, fr, ja, x-default)
grep -c 'hreflang' build/{route}/index.html

# Verify SSR content is not empty (must have real content in <div id="root">)
grep -oP '<div id="root">.{0,100}' build/{route}/index.html
```

## Example Workflow

User: `/create-page`

1. Ask for page name, route, SEO info, translations
2. Create `src/Components/{Name}.js` with full component
3. Create `src/Components/{Name}.css` with styled template
4. Edit `src/i18n/translations.js` — add keys in all 5 language blocks
5. Edit `build.js` — 4 locations (routeComponentMap, getPageMetadata, loadReactComponents, sitemap staticPages)
6. Edit `src/App.js` — 2 locations (import, getComponentForPath)
7. Edit `public/404.html` — validPaths for all 5 language groups
8. Edit `scripts/metadata-injector.js` — getDefaultMetadata metaInfo object
9. Run `npm run build-static` to build and validate
10. Report results with verification output

## Common Mistakes to Avoid

1. **Forgetting a language in translations.js** — Build will succeed but that language will show English fallback for metadata
2. **Missing from 404.html** — URLs without trailing slash won't redirect properly, causing 404s
3. **Missing from metadata-injector.js** — Page will get generic homepage metadata instead of its own
4. **Wrong translation key format** — Must be camelCase: `/data-security` -> `dataSecurity`, NOT `data-security`
5. **Adding `/en/` prefix for English** — English pages have NO language prefix, this is intentional
6. **Forgetting sitemap entry** — Page won't be submitted to search engines
7. **Empty SSR content** — If the component crashes during SSR, the HTML will have an empty `<div id="root"></div>` and bots see nothing
