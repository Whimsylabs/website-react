/**
 * Generate static blog post data for the build script
 * This script converts the ES6 blog translation modules to CommonJS format
 */

const fs = require('fs-extra');
const path = require('path');

const supportedLanguages = ['en', 'de', 'fr', 'es'];

/**
 * Dynamically discover all blog posts by scanning the blog components directory
 */
async function discoverBlogPosts() {
  const blogComponentsDir = path.join(__dirname, '..', 'src', 'Components', 'blog');
  const postData = {};
  
  try {
    const files = await fs.readdir(blogComponentsDir);
    
    // Filter for Post*.js files and extract metadata
    for (const file of files) {
      if (file.match(/^Post\d+\.js$/)) {
        const postNumber = file.match(/Post(\d+)\.js$/)[1];
        const postId = `post${postNumber}`;
        const filePath = path.join(blogComponentsDir, file);
        
        try {
          // Read file as text and extract metadata using regex
          const fileContent = await fs.readFile(filePath, 'utf8');
          
          const titleMatch = fileContent.match(/export const title\s*=\s*["'`](.*?)["'`];/s);
          const slugMatch = fileContent.match(/export const slug\s*=\s*["'`](.*?)["'`];/s);
          const descriptionMatch = fileContent.match(/export const description\s*=\s*["'`](.*?)["'`];/s);
          const dateMatch = fileContent.match(/export const date\s*=\s*["'`](.*?)["'`];/s);
          
          const title = titleMatch ? titleMatch[1] : `Blog Post ${postId}`;
          const slug = slugMatch ? slugMatch[1] : null;
          const description = descriptionMatch ? descriptionMatch[1] : 'Blog post description';
          const date = dateMatch ? dateMatch[1] : null;
          
          if (slug && date) {
            postData[postId] = {
              slug: slug,
              date: date,
              title: title,
              description: description
            };
            
            console.log(`📝 Discovered ${postId}: ${title?.substring(0, 50)}...`);
          } else {
            console.warn(`⚠️ ${file} missing required slug or date exports`);
          }
        } catch (error) {
          console.warn(`⚠️ Could not load ${file}:`, error.message);
        }
      }
    }
    
    // Sort posts by number for consistent ordering
    const sortedPosts = Object.keys(postData).sort((a, b) => {
      const numA = parseInt(a.replace('post', ''));
      const numB = parseInt(b.replace('post', ''));
      return numA - numB;
    });
    
    console.log(`✅ Discovered ${sortedPosts.length} blog posts: ${sortedPosts.join(', ')}`);
    
    return {
      blogPosts: sortedPosts,
      postIdToSlug: Object.fromEntries(sortedPosts.map(id => [id, postData[id].slug])),
      postDates: Object.fromEntries(sortedPosts.map(id => [id, postData[id].date])),
      postTitles: Object.fromEntries(sortedPosts.map(id => [id, postData[id].title])),
      postDescriptions: Object.fromEntries(sortedPosts.map(id => [id, postData[id].description]))
    };
  } catch (error) {
    console.error('❌ Error discovering blog posts:', error);
    throw error;
  }
}

async function generateBlogData() {
  console.log('🔄 Generating static blog data...');
  
  // Dynamically discover all blog posts
  const { blogPosts, postIdToSlug, postDates, postTitles, postDescriptions } = await discoverBlogPosts();
  
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
          
          // Extract title and description using regex (handle multi-line exports)
          const titleMatch = fileContent.match(/export const title\s*=\s*["'`](.*?)["'`];/s);
          const descriptionMatch = fileContent.match(/export const description\s*=\s*["'`](.*?)["'`];/s);
          const contentMatch = fileContent.match(/export const content\s*=\s*\(/);

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
              const titleMatch = englishContent.match(/export const title\s*=\s*["'`](.*?)["'`];/s);
              const descriptionMatch = englishContent.match(/export const description\s*=\s*["'`](.*?)["'`];/s);

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