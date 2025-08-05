/**
 * Generate static blog post data for the build script
 * This script converts the ES6 blog translation modules to CommonJS format
 */

const fs = require('fs-extra');
const path = require('path');

const blogPosts = ['post1', 'post2', 'post3', 'post4', 'post5', 'post6'];
const supportedLanguages = ['en', 'de', 'fr', 'es'];

// Mapping from post IDs to slugs (from the original blog components)
const postIdToSlug = {
  'post1': 'whimsylabs-education-revolution',
  'post2': 'physicality-in-virtual-labs', 
  'post3': 'virtual-kidney-dissection-send-engagement',
  'post4': 'ai-powered-virtual-labs-solving-education-crisis',
  'post5': 'whimsycat-ai-tutor-transforming-science-education',
  'post6': 'sandbox-learning-revolution-stem-education'
};

// Dates from the original blog components
const postDates = {
  'post1': '2025-01-27',
  'post2': '2025-02-03', 
  'post3': '2025-03-19',
  'post4': '2025-04-15',
  'post5': '2025-05-10',
  'post6': '2025-06-05'
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
          
          // Extract title and description using regex
          const titleMatch = fileContent.match(/export const title = ["'`](.*?)["'`];/s);
          const descriptionMatch = fileContent.match(/export const description = ["'`](.*?)["'`];/s);
          const contentMatch = fileContent.match(/export const content = \(([\s\S]*?)\);$/);
          
          const title = titleMatch ? titleMatch[1] : `Blog Post ${postId}`;
          const description = descriptionMatch ? descriptionMatch[1] : 'Blog post description';
          const hasContent = !!contentMatch;
          
          // For now, we'll mark that content exists but won't try to render it here
          // The BlogPost component will handle the actual content rendering
          
          blogData[language].push({
            id: postId,
            slug: postIdToSlug[postId],
            title: title,
            description: description,
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
              const titleMatch = englishContent.match(/export const title = ["'`](.*?)["'`];/s);
              const descriptionMatch = englishContent.match(/export const description = ["'`](.*?)["'`];/s);
              
              const title = titleMatch ? titleMatch[1] : `Blog Post ${postId}`;
              const description = descriptionMatch ? descriptionMatch[1] : 'Blog post description';
              
              blogData[language].push({
                id: postId,
                slug: postIdToSlug[postId],
                title: title,
                description: description,
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