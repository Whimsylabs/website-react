# Adding New Blog Posts to WhimsyLabs Website

This guide explains how to add new blog posts to the WhimsyLabs MPA (Multi-Page Application) build-static system.

## Overview

The blog system uses a translation-based architecture where:
- Blog posts are stored as JavaScript modules (not Markdown)
- Each post has translations for 4 languages: English (en), Spanish (es), French (fr), German (de)
- Content is written in JSX for rich formatting
- The build script generates static HTML files for each post in each language

## Step-by-Step Guide

### Step 1: Create Blog Post Directory

Create a new directory for your post in `src/i18n/blog/`:

```bash
mkdir src/i18n/blog/post15
```

Use sequential numbering (post15, post16, etc.).

### Step 2: Create Translation Files

Create four translation files, one for each supported language:

#### English Version: `src/i18n/blog/post15/en.js`

```javascript
// English - Post 15: Your Descriptive Title
import React from "react";

export const title = "Your Blog Post Title Here";

export const description =
  "A compelling description of your blog post for SEO and previews. Keep it under 160 characters for optimal search engine display.";

export const keywords =
  "keyword1, keyword2, keyword3, virtual labs, STEM education";

export const content = (
  <div>
    <p>
      Your first paragraph of content goes here. Write engaging,
      educational content that provides value to readers.
    </p>

    <h2>Section Heading</h2>
    <p>
      Continue with more content. You can use standard HTML/JSX elements.
    </p>

    <img
      src="/images/your-image.png"
      alt="Descriptive alt text for accessibility"
      className="rounded shadow center limited-size"
    />
    <p className="caption">
      Caption explaining the image above.
    </p>

    <p>
      More content paragraphs...
    </p>

    <ul>
      <li>Bullet points work too</li>
      <li>Great for listing key points</li>
    </ul>

    <blockquote>
      You can include quotes or callouts like this.
    </blockquote>

    <h2>Further Reading</h2>
    <p>
      Check out our other posts on{" "}
      <a href="/blog/related-post-slug">Related Topic</a>.
    </p>
  </div>
);
```

#### Other Languages

Create the same structure for other languages:

- **Spanish**: `src/i18n/blog/post15/es.js`
- **French**: `src/i18n/blog/post15/fr.js`
- **German**: `src/i18n/blog/post15/de.js`

Each file should have the same structure but with translated content.

### Step 3: Register the Post

Edit `scripts/generate-blog-data.js` and update three arrays:

#### 1. Add to blogPosts array (around line 9):

```javascript
const blogPosts = [
  'post1', 'post2', 'post3', 'post4', 'post5', 'post6',
  'post7', 'post8', 'post9', 'post10', 'post11', 'post12',
  'post13', 'post14', 'post15'  // Add your new post here
];
```

#### 2. Add slug mapping (around line 13):

```javascript
const postIdToSlug = {
  'post1': 'whimsylabs-education-revolution',
  // ... existing posts ...
  'post15': 'your-blog-post-slug-here'  // Create a URL-friendly slug
};
```

**Slug Guidelines:**
- Use lowercase letters only
- Separate words with hyphens (-)
- Keep it short but descriptive
- Include main keywords
- Examples: `ai-tutoring-guide`, `virtual-lab-benefits`, `stem-education-future`

#### 3. Add publication date (around line 23):

```javascript
const postDates = {
  'post1': '2025-01-27',
  // ... existing posts ...
  'post15': '2025-12-15'  // Format: YYYY-MM-DD
};
```

### Step 4: Add Images (if needed)

If your post includes images:

1. Place images in `public/images/`
2. Use descriptive filenames: `virtual-lab-interface.png`
3. Optimize images before adding (compress, resize appropriately)
4. Reference in your post with: `src="/images/your-image.png"`

### Step 5: Generate Blog Data

Run the generator script to compile all blog post metadata:

```bash
npm run generate-blog-data
```

(Alternatively, you can run `node scripts/generate-blog-data.js` directly)

**Expected Output:**
```
🔄 Generating static blog data...
✅ Loaded post15 for en: Your Blog Post Title Here...
✅ Loaded post15 for de: Your Blog Post Title Here...
✅ Loaded post15 for fr: Your Blog Post Title Here...
✅ Loaded post15 for es: Your Blog Post Title Here...
✅ Generated blog data at src/i18n/blogData.generated.js

📊 Blog Data Summary:
   EN: 15 posts (15 full translations)
   DE: 15 posts (15 full translations)
   FR: 15 posts (15 full translations)
   ES: 15 posts (15 full translations)
```

### Step 6: Build the Static Site

Build the complete static site with all languages:

```bash
npm run build-static
```

**For faster testing (English only):**

```bash
BUILD_LANGUAGES=en npm run build-static
```

The build process will:
- Generate static HTML for your new post at `/en/blog/your-slug/index.html`
- Add it to the blog listing page
- Create proper SEO metadata and schema markup
- Generate versions for all languages

### Step 7: Test Locally

Serve the built site:

```bash
npx serve -s build
```

Then test:
- **Blog listing**: http://localhost:3000/en/blog/
- **Your new post**: http://localhost:3000/en/blog/your-blog-post-slug-here/
- **Other languages**: http://localhost:3000/es/blog/your-blog-post-slug-here/

### Step 8: Validate and Deploy

1. **Validate translations:**
   ```bash
   npm run validate-blog-translations
   ```

2. **Check for broken links and images**

3. **Test all language versions**

4. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## Content Guidelines

### Writing Style
- Write clear, educational content
- Use short paragraphs (2-4 sentences)
- Include practical examples
- Add relevant images and diagrams
- Link to related blog posts

### SEO Optimization
- **Title**: 50-60 characters, include main keyword
- **Description**: 120-160 characters, compelling summary
- **Keywords**: 5-10 relevant keywords
- **Headings**: Use H2 for main sections, H3 for subsections
- **Images**: Always include descriptive alt text

### Formatting Classes

Use these CSS classes for consistent styling:

```javascript
// Images
<img src="/images/photo.png" className="rounded shadow center limited-size" />

// Captions
<p className="caption">Image caption text</p>

// Links to other posts
<a href="/blog/other-post-slug">Related Article</a>

// External links (open in new tab)
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Resource
</a>
```

## Troubleshooting

### Post not appearing in blog list

1. Check that post is in `blogPosts` array in `generate-blog-data.js`
2. Run `npm run generate-blog-data` again
3. Rebuild with `npm run build-static`

### Translation fallback warnings

If you see warnings like "Translation not found for post15 in es":
- The system will use English as fallback
- Complete the translation when possible
- The post will still appear but show English content

### Images not loading

1. Verify image is in `public/images/`
2. Check path starts with `/images/` (not relative path)
3. Verify image filename matches exactly (case-sensitive)
4. Rebuild the site after adding images

### Build errors

Common issues:
- **Syntax error in JSX**: Check all tags are properly closed
- **Missing export**: Ensure `title`, `description`, and `content` are exported
- **Invalid date format**: Use YYYY-MM-DD format
- **Duplicate slug**: Each post must have unique slug

## Advanced Topics

### Cross-Linking Posts

Add links to related posts in your "Further Reading" section:

```javascript
<h2>Further Reading</h2>
<p>
  Learn more about related topics:
</p>
<ul>
  <li>
    <a href="/blog/ai-tutoring-guide">AI Tutoring in Virtual Labs</a>
  </li>
  <li>
    <a href="/blog/virtual-lab-benefits">Benefits of Virtual Laboratories</a>
  </li>
</ul>
```

### Rich Media

You can embed videos, code snippets, and interactive elements:

```javascript
// Video
<video controls className="rounded shadow center limited-size">
  <source src="/videos/demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

// Code snippet
<pre><code>
  const example = "code here";
</code></pre>
```

### Schema Markup

The build system automatically adds schema markup for:
- Article type
- Author information
- Publication date
- Organization details

No manual schema markup needed.

## Quick Reference

```bash
# Create new post directory
mkdir src/i18n/blog/post15

# Edit blog configuration
# Edit: scripts/generate-blog-data.js

# Generate blog data
npm run generate-blog-data

# Build (all languages)
npm run build-static

# Build (English only - faster)
BUILD_LANGUAGES=en npm run build-static

# Test locally
npx serve -s build

# Validate translations
npm run validate-blog-translations

# Deploy
npm run deploy
```

## Files to Edit

For each new post, you'll need to create/edit these files:

### 1. Create Blog Post Translation Files
- `src/i18n/blog/post{N}/en.js` (English - required)
- `src/i18n/blog/post{N}/es.js` (Spanish - required)
- `src/i18n/blog/post{N}/fr.js` (French - required)
- `src/i18n/blog/post{N}/de.js` (German - required)

### 2. Create Blog Post Component File
- `src/Components/blog/Post{N}.js` (fallback component for build system)

**Template for Post{N}.js:**
```javascript
import React from "react";

export const title = "Your Blog Post Title";
export const date = "2025-12-15"; // Format: YYYY-MM-DD
export const slug = "your-blog-post-slug-here";
export const description = "Description of your blog post.";
export const keywords = [
  "keyword1",
  "keyword2",
  "virtual labs",
  "STEM education"
];

export const content = (
  <div>
    <p>Your content here...</p>
  </div>
);
```

### 3. Update Configuration Files

Edit `scripts/generate-blog-data.js`:
- Add `'post{N}'` to the `blogPosts` array (line ~9)
- Add slug mapping to `postIdToSlug` object (line ~17)
- Add date to `postDates` object (line ~34)

Edit `src/i18n/blogDataGenerator.js`:
- Add `'post{N}'` to the `blogPosts` array (line ~6)

Edit `src/Components/BlogPost.js`:
- Add `import * as Post{N} from './blog/Post{N}';` (line ~10)
- Add post to `fallbackPosts` array (line ~27)
- Add slug mapping to `slugToPostId` object (line ~128)

Edit `src/Components/Blog.js`:
- Add `import * as Post{N} from './blog/Post{N}';` (line ~11)
- Add post to `fallbackPosts` array (line ~27)
- Add slug mapping to `slugToPostId` object (line ~130)

Edit `build.js`:
- Add `const Post{N} = require("./src/Components/blog/Post{N}.js");` in TWO places:
  - Line ~324 (main blog post loading)
  - Line ~361 (fallback blog post loading)
- Add `Post{N}` to the `fallbackPosts` array in the first section (line ~339)
- Add full post object to `fallbackPosts` array in the fallback section (line ~376)

### 4. Add Images (if needed)
- `public/images/` (add any images your post uses)

### 5. Generate and Build
```bash
npm run generate-blog-data  # Generate metadata
npm run build-static        # Build the site
```

That's it! The build system handles everything else automatically.
