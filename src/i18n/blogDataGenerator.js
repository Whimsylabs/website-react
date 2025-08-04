/**
 * Blog Data Generator with Internationalization Support
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
export async function getBlogPostTranslation(language = 'en', postNumber) {
  try {
    // Try to import the specific language version
    const postModule = await import(`./blog/${postNumber}/${language}.js`);
    
    // If content is null, fall back to English
    if (!postModule.content && language !== 'en') {
      const englishModule = await import(`./blog/${postNumber}/en.js`);
      return {
        title: postModule.title || englishModule.title,
        description: postModule.description || englishModule.description,
        content: englishModule.content,
        hasFullTranslation: false,
        language: language,
        fallbackLanguage: 'en'
      };
    }
    
    return {
      title: postModule.title,
      description: postModule.description,
      content: postModule.content,
      hasFullTranslation: !!postModule.content,
      language: language
    };
    
  } catch (error) {
    console.warn(`Could not load blog post ${postNumber} for language ${language}:`, error.message);
    
    // Fallback to English
    try {
      const englishModule = await import(`./blog/${postNumber}/en.js`);
      return {
        title: englishModule.title,
        description: englishModule.description,
        content: englishModule.content,
        hasFullTranslation: true,
        language: 'en',
        fallbackLanguage: 'en'
      };
    } catch (englishError) {
      return {
        title: "Blog Post Not Found",
        description: "This blog post is not available.",
        content: null,
        hasFullTranslation: false,
        language: language
      };
    }
  }
}

/**
 * Get all available blog posts for a language
 * @param {string} language - Language code
 * @returns {Array} Array of blog post data
 */
export async function getAllBlogPosts(language = 'en') {
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
export function getAvailableBlogLanguages() {
  return supportedLanguages;
}

/**
 * Get available blog posts
 * @returns {Array} Array of blog post identifiers
 */
export function getAvailableBlogPosts() {
  return blogPosts;
}

/**
 * Check if a blog post translation exists for a specific language
 * @param {string} language - Language code
 * @param {string} postNumber - Post number
 * @returns {Promise<boolean>} True if translation exists
 */
export async function hasBlogTranslation(language, postNumber) {
  try {
    const post = await getBlogPostTranslation(language, postNumber);
    return post.hasFullTranslation;
  } catch (error) {
    return false;
  }
}

export default {
  getBlogPostTranslation,
  getAllBlogPosts,
  getAvailableBlogLanguages,
  getAvailableBlogPosts,
  hasBlogTranslation
};