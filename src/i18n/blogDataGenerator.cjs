/**
 * Blog Data Generator with Internationalization Support (CommonJS version)
 * Generates blog post data with translations for different languages
 */

const blogPosts = [
  'post1',
  'post2', 
  'post3',
  'post4',
  'post5',
  'post6'
];

const supportedLanguages = ['en', 'de', 'fr', 'es'];

/**
 * Get translated blog post data for a specific language and post
 * @param {string} language - Language code (en, de, fr, es)
 * @param {string} postNumber - Post number (post1, post2, etc.)
 * @returns {Object} Translated blog post data
 */
async function getBlogPostTranslation(language = 'en', postNumber) {
  // For the build process, we'll use the generated static data
  // since dynamic imports don't work well in CommonJS context
  try {
    const blogData = require('./blogData.generated.js');
    const postsForLanguage = blogData[language] || blogData['en'];
    const post = postsForLanguage.find(p => p.id === postNumber);
    
    if (post) {
      return {
        title: post.title,
        description: post.description,
        content: null, // Content will be loaded by React component
        hasFullTranslation: post.hasFullTranslation,
        language: post.language,
        fallbackLanguage: post.fallbackLanguage
      };
    }
    
    // Fallback to English if not found
    if (language !== 'en') {
      const englishPosts = blogData['en'];
      const englishPost = englishPosts.find(p => p.id === postNumber);
      if (englishPost) {
        return {
          title: englishPost.title,
          description: englishPost.description,
          content: null,
          hasFullTranslation: true,
          language: 'en',
          fallbackLanguage: 'en'
        };
      }
    }
    
    return {
      title: "Blog Post Not Found",
      description: "This blog post is not available.",
      content: null,
      hasFullTranslation: false,
      language: language
    };
    
  } catch (error) {
    console.warn(`Could not load blog post ${postNumber} for language ${language}:`, error.message);
    return {
      title: "Blog Post Not Found",
      description: "This blog post is not available.",
      content: null,
      hasFullTranslation: false,
      language: language
    };
  }
}

/**
 * Get all available blog posts for a language
 * @param {string} language - Language code
 * @returns {Array} Array of blog post data
 */
async function getAllBlogPosts(language = 'en') {
  const posts = [];
  
  for (const postNumber of blogPosts) {
    try {
      const post = await getBlogPostTranslation(language, postNumber);
      posts.push({
        id: postNumber,
        ...post
      });
    } catch (error) {
      console.warn(`Could not load ${postNumber} for ${language}:`, error.message);
    }
  }
  
  return posts;
}

/**
 * Get available languages for blog translations
 * @returns {Array} Array of available language codes
 */
function getAvailableBlogLanguages() {
  return supportedLanguages;
}

/**
 * Get available blog posts
 * @returns {Array} Array of blog post identifiers
 */
function getAvailableBlogPosts() {
  return blogPosts;
}

/**
 * Check if a blog post translation exists for a specific language
 * @param {string} language - Language code
 * @param {string} postNumber - Post number
 * @returns {Promise<boolean>} True if translation exists
 */
async function hasBlogTranslation(language, postNumber) {
  try {
    const post = await getBlogPostTranslation(language, postNumber);
    return post.hasFullTranslation;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getBlogPostTranslation,
  getAllBlogPosts,
  getAvailableBlogLanguages,
  getAvailableBlogPosts,
  hasBlogTranslation
};