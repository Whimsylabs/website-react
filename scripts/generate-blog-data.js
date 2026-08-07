/**
 * Generate static blog post data for the build script
 * This script converts the ES6 blog translation modules to CommonJS format
 */

const fs = require('fs-extra');
const path = require('path');
// Per-post language allowlist (keyed by slug). Posts listed here are region-specific
// and only published in the given languages; posts not listed are published in all.
const blogPostLanguageRestrictions = require('../src/i18n/blogPostLanguageRestrictions.json');

const blogPosts = [
  'post1', 'post2', 'post3', 'post4', 'post5', 'post6',
  'post7', 'post8', 'post9', 'post10', 'post11', 'post12',
  'post13', 'post14', 'post15', 'post16', 'post17', 'post18', 'post19', 'post20',
  'post21', 'post22', 'post23', 'post24', 'post25', 'post26', 'post27', 'post28', 'post29', 'post30',
  'post31', 'post32', 'post33', 'post34', 'post35', 'post36', 'post37', 'post38', 'post39', 'post40',
  'post41', 'post42', 'post43', 'post44', 'post45', 'post46', 'post47', 'post48', 'post49', 'post50',
  'post51', 'post52', 'post53', 'post54', 'post55'
];
const supportedLanguages = ['en', 'de', 'fr', 'es', 'ja'];

// Mapping from post IDs to slugs, single source of truth shared with build.js,
// src/Components/Blog.js and src/Components/BlogPost.js. Add new posts HERE only.
const postIdToSlug = require('../src/i18n/blogPostSlugs.json');

// Dates from the original blog components
const postDates = {
  post1: "2025-01-27",
  post2: "2025-02-03",
  post3: "2025-03-19",
  post4: "2025-04-15",
  post5: "2025-05-10",
  post6: "2025-06-05",
  post7: "2025-07-01",
  post8: "2025-07-15",
  post9: "2025-08-01",
  post10: "2025-08-15",
  post11: "2025-09-01",
  post12: "2025-09-15",
  post13: "2025-10-01",
  post14: "2025-10-15",
  post15: "2025-12-05",
  post16: "2026-01-12",
  post17: "2026-01-22",
  post18: "2026-01-24",
  post19: "2026-01-26",
  post20: "2026-01-28",
  post21: "2026-01-30",
  post22: "2026-02-01",
  post23: "2026-02-03",
  post24: "2026-02-05",
  post25: "2026-02-07",
  post26: "2026-02-09",
  post27: "2026-02-11",
  post28: "2026-02-12",
  post29: "2026-02-13",
  post30: "2026-02-14",
  post31: "2026-02-15",
  post32: "2026-02-17",
  post33: "2026-02-18",
  post34: "2026-02-25",
  post35: "2026-03-11",
  post36: "2026-03-11",
  post37: "2026-03-11",
  post38: "2026-03-11",
  post39: "2026-03-19",
  post40: "2026-03-19",
  post41: "2026-06-15",
  post42: "2026-06-25",
  post43: "2026-06-27",
  post44: "2026-07-15",
  post45: "2026-07-16",
  post46: "2026-07-16",
  post47: "2026-07-16",
  post48: "2026-07-16",
  post49: "2026-07-16",
  post50: "2026-07-17",
  post51: "2026-07-29",
  post52: "2026-07-30",
  post53: "2026-07-31",
  post54: "2026-08-03",
  post55: "2026-08-04",
};

async function generateBlogData() {
  console.log('🔄 Generating static blog data...');
  
  const blogData = {};
  
  for (const language of supportedLanguages) {
    blogData[language] = [];
    
    for (const postId of blogPosts) {
      // Skip region-specific posts in languages they are not published in
      const allowedLanguages = blogPostLanguageRestrictions[postIdToSlug[postId]];
      if (allowedLanguages && !allowedLanguages.includes(language)) {
        continue;
      }
      try {
        // Try to load the translation file
        const translationPath = path.join(__dirname, '..', 'src', 'i18n', 'blog', postId, `${language}.js`);
        
        if (await fs.pathExists(translationPath)) {
          // Read the file content
          const fileContent = await fs.readFile(translationPath, 'utf8');
          
          // Extract title, description, and keywords using regex (handle multi-line exports)
          const titleMatch = fileContent.match(/export const title\s*=\s*["'`](.*?)["'`];/s);
          const descriptionMatch = fileContent.match(/export const description\s*=\s*["'`](.*?)["'`];/s);
          const keywordsMatch = fileContent.match(/export const keywords = \[([\s\S]*?)\];/);
          const contentMatch = fileContent.match(/export const content = \(([\s\S]*?)\);$/);

          const title = titleMatch ? titleMatch[1] : `Blog Post ${postId}`;
          const description = descriptionMatch ? descriptionMatch[1] : 'Blog post description';
          const hasContent = !!contentMatch;

          // Parse keywords array if it exists
          let keywords = null;
          if (keywordsMatch) {
            try {
              const keywordsString = keywordsMatch[1]
                .split('\n')
                .map(line => line.trim())
                .filter(line => line && !line.startsWith('//'))
                .map(line => line.replace(/^["']|["'],?$/g, ''))
                .filter(k => k);
              keywords = keywordsString;
            } catch (e) {
              console.warn(`Could not parse keywords for ${postId} in ${language}`);
            }
          }
          
          // For now, we'll mark that content exists but won't try to render it here
          // The BlogPost component will handle the actual content rendering
          
          blogData[language].push({
            id: postId,
            slug: postIdToSlug[postId],
            title: title,
            description: description,
            keywords: keywords,
            date: postDates[postId],
            hasFullTranslation: hasContent,
            language: language
          });
          
          console.log(`✅ Loaded ${postId} for ${language}: ${title.substring(0, 50)}...`);
        } else {
          // Fallback to English if translation doesn't exist
          console.log(`⚠️ Translation not found for ${postId} in ${language}, using English fallback`);
          
          if (language !== 'en') {
            const englishPath = path.join(__dirname, '..', 'src', 'i18n', 'blog', postId, 'en.js');
            if (await fs.pathExists(englishPath)) {
              const englishContent = await fs.readFile(englishPath, 'utf8');
              const titleMatch = englishContent.match(/export const title\s*=\s*["'`](.*?)["'`];/s);
              const descriptionMatch = englishContent.match(/export const description\s*=\s*["'`](.*?)["'`];/s);
              const keywordsMatch = englishContent.match(/export const keywords = \[([\s\S]*?)\];/);

              const title = titleMatch ? titleMatch[1] : `Blog Post ${postId}`;
              const description = descriptionMatch ? descriptionMatch[1] : 'Blog post description';

              // Parse keywords array if it exists
              let keywords = null;
              if (keywordsMatch) {
                try {
                  const keywordsString = keywordsMatch[1]
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line && !line.startsWith('//'))
                    .map(line => line.replace(/^["']|["'],?$/g, ''))
                    .filter(k => k);
                  keywords = keywordsString;
                } catch (e) {
                  console.warn(`Could not parse keywords for ${postId} in English fallback`);
                }
              }

              blogData[language].push({
                id: postId,
                slug: postIdToSlug[postId],
                title: title,
                description: description,
                keywords: keywords,
                date: postDates[postId],
                hasFullTranslation: false,
                language: language,
                fallbackLanguage: 'en'
              });
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️ Error loading ${postId} for ${language}:`, error.message);
      }
    }
    
    // Sort posts by date (newest first)
    blogData[language].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  // Write the generated data to a CommonJS file
  const outputPath = path.join(__dirname, '..', 'src', 'i18n', 'blogData.generated.js');
  const outputContent = `// Auto-generated blog data for build script
// Generated on ${new Date().toISOString()}

module.exports = ${JSON.stringify(blogData, null, 2)};
`;
  
  await fs.writeFile(outputPath, outputContent);
  console.log(`✅ Generated blog data at ${outputPath}`);
  
  // Log summary
  console.log('\n📊 Blog Data Summary:');
  for (const language of supportedLanguages) {
    const posts = blogData[language];
    const fullTranslations = posts.filter(p => p.hasFullTranslation).length;
    console.log(`   ${language.toUpperCase()}: ${posts.length} posts (${fullTranslations} full translations)`);
  }
}

if (require.main === module) {
  generateBlogData().catch(console.error);
}

module.exports = { generateBlogData };