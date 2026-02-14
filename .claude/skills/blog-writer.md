# Blog Writer Skill

When the user runs `/blog-writer` or asks to write a new blog post:

## Overview

This skill helps create SEO-optimized, multi-language blog posts that follow the WhimsyLabs established style.

## Quick Start

To write a new blog post, I need:
1. **Topic** - What should the post be about?
2. **Target keywords** - What search terms should we target?
3. **Post number** - Check the highest existing post number and use the next one

## Workflow

### Step 1: Research & Planning
```bash
# Find the next post number
ls src/Components/blog/ | grep Post | sort -V | tail -1

# Check existing post structure for reference
cat src/Components/blog/Post1.js | head -20
```

### Step 2: Create Component File

Create `src/Components/blog/Post{N}.js`:
```javascript
export const title = "Your Title (50-60 chars)";
export const date = "YYYY-MM-DD";
export const slug = "url-friendly-slug";
export const description = "Meta description (120-160 chars)";
export const keywords = "keyword1, keyword2, keyword3";

export const content = (
  <>
    <p>Introduction...</p>
    <h2>Section 1</h2>
    <p>Content with <a href="https://source.com">citations</a>...</p>
    <h2>Conclusion</h2>
    <p>Summary...</p>
  </>
);
```

### Step 3: Create Translation Files

Create `src/i18n/blog/post{N}/en.js`, `es.js`, `fr.js`, `de.js`:
```javascript
export const title = "Translated Title";
export const description = "Translated description";
export const keywords = "translated, keywords";
export const content = (<>Translated content...</>);
```

### Step 4: Update Configuration Files

1. **scripts/generate-blog-data.js**:
   - Add to `blogPosts` array
   - Add to `postIdToSlug` mapping
   - Add to `postDates` mapping

2. **src/i18n/blogDataGenerator.js**:
   - Add to `blogPosts` array

3. **src/Components/BlogPost.js**:
   - Import Post{N}
   - Add to `fallbackPosts`
   - Add to `slugToPostId`

4. **src/Components/Blog.js**:
   - Import Post{N}
   - Add to `fallbackPosts`
   - Add to `slugToPostId`

5. **build.js** (TWO places):
   - Add require for Post{N}
   - Add to both `fallbackPosts` arrays

### Step 5: Generate & Build
```bash
npm run generate-blog-data
npm run build-static
```

## Style Guidelines

### Content Requirements
- **Length**: 1200-1800 words
- **Citations**: Inline links `[Source](URL)`
- **Structure**: H2 for sections, H3 for subsections
- **Tone**: Professional, educational, accessible

### SEO Requirements
- **Title**: 50-60 chars, include primary keyword
- **Description**: 120-160 chars, include keyword
- **Slug**: Lowercase, hyphens, under 60 chars
- **Keywords**: 5-8 relevant terms

### Translation Notes
- Keep brand names unchanged (WhimsyLabs, WhimsyCat)
- Adapt idioms naturally
- Maintain same structure and citations
- Use locale-appropriate expressions

## Example Topics

Recent successful posts covered:
- AI tutoring and emotional intelligence
- Physics simulations in education
- Cost-benefit analysis of virtual vs physical labs
- Gamification in science education
- STEM teacher shortage solutions

## Files Reference

| Purpose | Location |
|---------|----------|
| Post components | `src/Components/blog/Post*.js` |
| Translations | `src/i18n/blog/post*/` |
| Blog data generator | `scripts/generate-blog-data.js` |
| Blog listing component | `src/Components/Blog.js` |
| Blog post viewer | `src/Components/BlogPost.js` |
| Build configuration | `build.js` |
