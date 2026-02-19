# Troubleshooting: Blog Post Content Missing from Static HTML

## Symptom

After adding a new blog post, the content validation fails with:

```
CONTENT MISSING (en): Blog post content not found in static HTML!
```

The blog post page exists but the `<div class="post-content">` is empty in the built HTML.

## Root Cause

New blog posts must be registered in **4 separate files** that each have a `slugToPostId` mapping. If any mapping is missing, SSR will fail to render the content.

## Solution Checklist

When adding a new blog post (e.g., `Post34`), update ALL of these files:

### 1. Create the blog post file
```
src/Components/blog/Post34.js
```

### 2. Update `build.js` (2 locations)

**Location A: Import and fallbackPosts array (~line 440)**
```javascript
const Post34 = require("./src/Components/blog/Post34.js");

const fallbackPosts = [..., Post32, Post33, Post34];
```

**Location B: slugToPostId mapping for SSR (~line 910)**
```javascript
const slugToPostId = {
  // ... existing posts ...
  'your-new-post-slug': 'post34',
};
```

### 3. Update `src/Components/BlogPost.js`

**slugToPostId mapping (~line 280)**
```javascript
const slugToPostId = {
  // ... existing posts ...
  'your-new-post-slug': 'post34'
};
```

**fallbackPosts array (~line 46)**
```javascript
import * as Post34 from './blog/Post34';

// In the fallbackPosts array:
{
  id: Post34.slug,
  title: Post34.title,
  content: Post34.content,
  date: Post34.date,
  description: Post34.description,
},
```

### 4. Update `src/Components/Blog.js`

**slugToPostId mapping (~line 322)**
```javascript
const slugToPostId = {
  // ... existing posts ...
  'your-new-post-slug': 'post34'
};
```

**Import and fallbackPosts array**
```javascript
import * as Post34 from './blog/Post34';

// Add to fallbackPosts array
```

### 5. Update `scripts/generate-blog-data.js`

**postIds array (~line 14)**
```javascript
const postIds = [
  'post1', 'post2', /* ... */ 'post33', 'post34'
];
```

**postIdToSlug mapping (~line 50)**
```javascript
'post34': 'your-new-post-slug'
```

**postDates (~line 90)**
```javascript
post34: "2026-MM-DD",
```

## Quick Verification

After making changes, run:

```bash
npm run build-static
npm run validate-content
```

All 5 language versions should pass validation.

## Common Mistakes

1. **Forgetting build.js SSR mapping** - This is the most common issue. The SSR mapping around line 910 is separate from the import/fallbackPosts section.

2. **Using dynamic components in content** - Don't use components that call `getCurrentLanguage()` or other runtime functions inside the `export const content = (...)` JSX. Keep content static.

3. **Mismatched slugs** - Ensure the slug in the Post file matches exactly what's in all the mappings.

## Files Summary

| File | What to update |
|------|----------------|
| `src/Components/blog/PostXX.js` | Create the post |
| `build.js` | Import, fallbackPosts, AND slugToPostId |
| `src/Components/BlogPost.js` | Import, fallbackPosts, slugToPostId |
| `src/Components/Blog.js` | Import, fallbackPosts, slugToPostId |
| `scripts/generate-blog-data.js` | postIds, postIdToSlug, postDates |

---

*Last updated: 2026-02-18 after Post33 content missing issue*
