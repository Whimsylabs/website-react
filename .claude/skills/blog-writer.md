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
cat src/Components/blog/Post1.js | head -50
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

Create `src/i18n/blog/post{N}/en.js`, `de.js`, `es.js`, `fr.js`, `ja.js`:
```javascript
export const title = "Translated Title";
export const description = "Translated description";
export const keywords = "translated, keywords";
export const content = (<>Translated content...</>);
```

### Step 4: Update Configuration Files

**⚠️ CRITICAL: You must update ALL of these files or the post won't render!**

See `docs/troubleshooting/BLOG_POST_CONTENT_MISSING.md` for details.

1. **scripts/generate-blog-data.js**:
   - Add to `postIds` array
   - Add to `postIdToSlug` mapping
   - Add to `postDates` mapping

2. **src/Components/BlogPost.js**:
   - Import Post{N}
   - Add to `fallbackPosts` array
   - Add to `slugToPostId` mapping

3. **src/Components/Blog.js**:
   - Import Post{N}
   - Add to `fallbackPosts` array
   - Add to `slugToPostId` mapping

4. **build.js** (THREE places!):
   - Add require for Post{N} (~line 440)
   - Add to `fallbackPosts` array (~line 442)
   - Add to `slugToPostId` mapping for SSR (~line 910)

### Step 5: Generate & Build
```bash
npm run generate-blog-data
npm run build-static
npm run validate-content  # Check for content rendering issues
```

---

## Writing Style Guide (IMPORTANT!)

**Reference Post1.js for the canonical WhimsyLabs voice.** The style is:

### Tone
- **Professional but warm** - Academic credibility without being dry
- **Research-backed** - Weave citations naturally into the text, not dumped at the end
- **Enthusiastic about science education** - Genuine passion, not corporate speak
- **Confident but not arrogant** - "We're trying to be part of the solution" not "We solved it"

### Structure
- **Question-based headers** - "Why Is Most EdTech Failing?" not "The Problem With EdTech"
- **Longer flowing paragraphs** - Not choppy bullet-point style
- **Clear narrative arc** - Problem → Context → Our approach → Evidence → Conclusion

### What TO Do
- Use inline citations with links: `Research shows that... (<a href="...">Freeman et al., 2014</a>)`
- Include proper academic references section at the end
- Use `<strong>` for key terms and emphasis
- Use `<em>` for titles and foreign phrases
- Ask rhetorical questions to guide the reader

### What NOT To Do
- ❌ **No em dashes** (—) - Use commas, periods, or restructure
- ❌ **No casual asides** - "Ouch", "Shocking, I know", "Sorry not sorry"
- ❌ **No AI tropes** - "Let that sink in", "Here's the thing", "Game-changer"
- ❌ **No exclamation marks** in body text (headers occasionally OK)
- ❌ **No first-person singular** - Use "we" not "I" (unless quoting Marisa directly)

### Example Good Opening (Post1 style):
```
In 2023, the UK plummeted to 15th place in global science rankings 
(OECD, 2023), while the pandemic left millions of students worldwide 
without hands-on lab access for years (Grewenig et al., 2021). This 
perfect storm of declining STEM performance and infrastructure loss 
catalyzed the creation of Whimsylabs in 2020...
```

### Example Bad Opening (AI style):
```
Is edtech broken? Here's the thing — it absolutely is, and we're 
about to tell you why. Buckle up! 🚀
```

---

## SEO/GEO Keywords by Language

Include these target keywords naturally in titles, H1s, and content:

| Language | Primary Keywords |
|----------|-----------------|
| **English** | "virtual lab", "virtual laboratory", "AI science tutor", "online lab simulation" |
| **German** | "virtuelles Labor", "Physiksimulation", "MINT-Bildung", "KI-Tutor" |
| **Spanish** | "laboratorio virtual", "educación STEM", "tutor IA", "simulación de laboratorio" |
| **French** | "laboratoire virtuel", "éducation STEM", "tuteur IA", "simulation de laboratoire" |
| **Japanese** | "仮想実験室", "バーチャルラボ", "STEM教育", "AIチューター" |

**GEO (Generative Engine Optimization) tips:**
- Structure content with clear question-based H2s (AI assistants extract these)
- Include specific statistics and citations (increases credibility for AI summaries)
- Answer the implicit question in each section clearly
- Use lists for actionable information

---

## Translation Guidelines

### Process
1. Translate the full content, not just metadata
2. **Include language-specific SEO keywords** in title and throughout content
3. Adapt idioms naturally (don't translate literally)
4. Keep brand names unchanged: WhimsyLabs, WhimsyCat, BETT
5. Use locale-appropriate academic citation style

### Quality Checklist
- [ ] Title includes primary keyword for that language
- [ ] Description includes keyword naturally
- [ ] Content flows naturally in target language
- [ ] Technical terms use accepted local terminology
- [ ] Links and references preserved

---

## Content Requirements

- **Length**: 1200-2000 words
- **Citations**: 3-6 academic/authoritative sources
- **Images**: Suggest 1-2 screenshots for the author to capture
- **Structure**: 5-8 H2 sections with clear progression

---

## Files Reference

| Purpose | Location |
|---------|----------|
| Post components | `src/Components/blog/Post*.js` |
| Translations | `src/i18n/blog/post*/` |
| Blog data generator | `scripts/generate-blog-data.js` |
| Blog listing component | `src/Components/Blog.js` |
| Blog post viewer | `src/Components/BlogPost.js` |
| Build configuration | `build.js` |
| **Troubleshooting** | `docs/troubleshooting/BLOG_POST_CONTENT_MISSING.md` |
| **SEO Strategy** | `docs/SEO_KEYWORD_STRATEGY.md` |

---

## Troubleshooting

**Content not rendering in build?** See `docs/troubleshooting/BLOG_POST_CONTENT_MISSING.md`

Common issues:
- Missing `slugToPostId` entry in build.js (the SSR mapping around line 910)
- Using dynamic components (like `getCurrentLanguage()`) inside content JSX
- Forgetting to add post to one of the three `slugToPostId` mappings
