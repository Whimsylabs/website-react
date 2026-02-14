# Build Tester Skill

When the user runs `/build-tester` or asks to test the build:

## Overview

This skill thoroughly tests that new additions don't break existing systems and verifies the HTML output from the MPA build-static process.

## Quick Test

```bash
npm run build-static
```

If build passes, the summary shows:
```
╔════════════════════════════════════════════════════════════╗
║                    BUILD SUMMARY                           ║
╠════════════════════════════════════════════════════════════╣
║ ✅ Sitemap              X URLs                             ║
║ ✅ HTML Pages           X pages                            ║
║ ✅ Meta Tags            All checked                        ║
║ ... etc                                                    ║
╚════════════════════════════════════════════════════════════╝
```

## Full Test Workflow

### 1. Pre-Build Checks
```bash
# Check for syntax errors
npx eslint src/ --quiet

# Verify all imports resolve
node -e "require('./src/App.js')" 2>&1 | head -5
```

### 2. Run Build
```bash
# Full build with all validations
npm run build-static

# Or quick build without validations
npm run build-static-no-validate
```

### 3. Verify New Pages

For each new page added, verify:

```bash
# Check page exists
ls build/{route}/index.html

# Verify title
grep -oP '<title>[^<]+</title>' build/{route}/index.html

# Verify meta description
grep -oP 'name="description" content="[^"]+"' build/{route}/index.html

# Verify H1
grep -oP '<h1[^>]*>.*?</h1>' build/{route}/index.html

# Check schemas present
grep -c '"@type"' build/{route}/index.html

# Check breadcrumb
grep -q 'BreadcrumbList' build/{route}/index.html && echo "✅ Breadcrumb" || echo "❌ No breadcrumb"
```

### 4. Multi-Language Verification

```bash
# Check all language versions exist
for lang in "" "es" "fr" "de" "jp"; do
  path="build/${lang:+$lang/}{route}/index.html"
  [ -f "$path" ] && echo "✅ $path" || echo "❌ Missing: $path"
done

# Verify hreflang tags
grep -c 'hreflang' build/{route}/index.html
```

### 5. Sitemap Check

```bash
# Verify new URLs in sitemap
grep '{new-route}' build/sitemap.xml

# Count total URLs
grep -c '<loc>' build/sitemap.xml
```

### 6. Regression Tests

```bash
# Serve locally and test
npx serve -s build -p 3001 &

# Test key pages respond
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/blog/
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/features/
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/faq/
```

## Validation Scripts

Individual validators can be run separately:

```bash
npm run validate-sitemap           # Sitemap URLs
npm run validate-meta-tags         # Meta tag presence
npm run validate-meta-descriptions # Description length
npm run validate-title-length      # Title length
npm run validate-faq-schema        # FAQ schema completeness
npm run validate-blog-schema       # Blog schema
npm run validate-all-schemas       # All schema types
npm run validate-hreflang          # Language alternates
npm run validate-opengraph         # Social sharing tags
npm run validate-breadcrumb-schema # Breadcrumb navigation
npm run validate-keyword-targeting # SEO keyword placement
npm run validate-404-redirects     # 404.html paths
```

## Common Build Errors

### Module Not Found
```
Module not found: Error: Can't resolve 'X'
```
**Fix**: Check import path, ensure file exists, run `npm install` if dependency.

### ENOTEMPTY
```
ENOTEMPTY: directory not empty
```
**Fix**: Clean build directory first:
```bash
rm -rf build && npm run build-static
```

### Missing Redirect Rule
```
Missing redirect rule for page: /route/
```
**Fix**: Add to `public/_redirects` and `public/404.html` validPaths.

### Missing Metadata
```
Missing metadata configuration for route: /route/
```
**Fix**: Add to `build.js` getPageMetadata and `scripts/metadata-injector.js`.

### Description Too Long/Short
```
Description too long (X chars, maximum 140)
Description too short (X chars, minimum 120)
```
**Fix**: Adjust description to 120-140 characters.

### Missing from Sitemap
```
Pages in build but missing from sitemap
```
**Fix**: Add to `staticPages` array in `build.js` generateSitemap function.

## New Page Checklist

When adding a new page, verify these files are updated:

| File | What to Add |
|------|-------------|
| `build.js` | routeComponentMap, getPageMetadata, require, sitemap |
| `App.js` | import, getComponentForPath |
| `scripts/metadata-injector.js` | getRouteMetadata |
| `src/i18n/translations.js` | Metadata for all languages |
| `public/_redirects` | Trailing slash redirect |
| `public/404.html` | validPaths array |

## Report Template

After testing, report results as:

```
## Build Test Report

### Status: ✅ PASSED / ❌ FAILED

### Build Output:
- Total pages: X
- Total URLs in sitemap: X
- All validations: ✅ Passed

### New Pages Verified:
- /new-page/: ✅ All checks pass
  - Title: ✅
  - Description: ✅ (X chars)
  - H1: ✅
  - Schemas: ✅ (X types)
  - Languages: ✅ (5)

### Regression:
- Homepage: ✅
- Blog: ✅
- Features: ✅
- All others: ✅

### Issues: None / [list issues]
```
