/**
 * Generate static blog post data for the build script
 * This script converts the ES6 blog translation modules to CommonJS format
 */

const fs = require('fs-extra');
const path = require('path');

const blogPosts = [
  'post1', 'post2', 'post3', 'post4', 'post5', 'post6',
  'post7', 'post8', 'post9', 'post10', 'post11', 'post12',
  'post13', 'post14', 'post15', 'post16'
];
const supportedLanguages = ['en', 'de', 'fr', 'es', 'ja'];

// Mapping from post IDs to slugs (from the original blog components)
const postIdToSlug = {
  'post1': 'whimsylabs-education-revolution',
  'post2': 'physicality-in-virtual-labs',
  'post3': 'virtual-kidney-dissection-send-engagement',
  'post4': 'ai-powered-virtual-labs-solving-education-crisis',
  'post5': 'whimsycat-ai-tutor-transforming-science-education',
  'post6': 'sandbox-learning-revolution-stem-education',
  'post7': 'green-labs-sustainability-virtual-stem-education',
  'post8': 'virtual-labs-solve-stem-teacher-shortage-crisis',
  'post9': '24-7-ai-tutoring-personalized-daily-recommendations',
  'post10': 'emotional-intelligence-ai-tutors-whimsycat-frustration-detection',
  'post11': 'virtual-labs-vs-physical-labs-cost-benefit-analysis',
  'post12': 'virtual-reality-prepares-students-real-world-stem-careers',
  'post13': 'science-real-time-physics-simulations-virtual-labs',
  'post14': 'gamification-science-education-points-rewards-engagement',
  'post15': 'whimsylabs-bett-2026-exhibition-announcement',
  'post16': 'why-traditional-virtual-labs-fail-physics-engine'
};

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
};

async function generateBlogData() {
  console.log('🔄 Generating static blog data...');
  
  const blogData = {};
  
  for (const language of supportedLanguages) {
    blogData[language] = [];
    
    for (const postId of blogPosts) {
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