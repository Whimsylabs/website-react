const { loadBlogPostContent } = require('./scripts/blog-content-loader.js');
const path = require('path');

async function debugLoader() {
  console.log('🔍 Debugging loadBlogPostContent...');
  
  const lang = 'de';
  const postId = 'post14'; // One of the failing posts
  
  console.log(`Attempting to load ${postId} in ${lang}...`);
  
  try {
    const result = await loadBlogPostContent(lang, postId);
    console.log('Result:', JSON.stringify(result, null, 2));
    
    if (result.language !== lang) {
      console.error('❌ Language mismatch! Fell back to:', result.language);
    } else {
      console.log('✅ Loaded correct language.');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugLoader();
