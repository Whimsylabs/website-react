/**
 * Blog Data Generator with Internationalization Support
 * Generates blog post data with translations for different languages
 */

// Dynamic blog post discovery - import all available posts
import * as Post1 from '../Components/blog/Post1';
import * as Post2 from '../Components/blog/Post2';
import * as Post3 from '../Components/blog/Post3';
import * as Post4 from '../Components/blog/Post4';
import * as Post5 from '../Components/blog/Post5';
import * as Post6 from '../Components/blog/Post6';
import * as Post7 from '../Components/blog/Post7';
import * as Post8 from '../Components/blog/Post8';
import * as Post9 from '../Components/blog/Post9';
import * as Post10 from '../Components/blog/Post10';
import * as Post11 from '../Components/blog/Post11';
import * as Post12 from '../Components/blog/Post12';
import * as Post13 from '../Components/blog/Post13';
import * as Post14 from '../Components/blog/Post14';

// Create dynamic mapping of all posts
const ALL_POSTS = [
  Post1, Post2, Post3, Post4, Post5, Post6, Post7, 
  Post8, Post9, Post10, Post11, Post12, Post13, Post14
];

// Generate blog post IDs dynamically
const blogPosts = ALL_POSTS.map((_, index) => `post${index + 1}`).filter((postId, index) => {
  // Only include posts that have valid slug and date
  const post = ALL_POSTS[index];
  return post && post.slug && post.date;
});

const supportedLanguages = ['en', 'de', 'fr', 'es', 'ja'];

/**
 * Get translated blog post data for a specific language and post
 * @param {string} language - Language code (en, de, fr, es, ja)
 * @param {string} postNumber - Post number (post1, post2, etc.)
 * @returns {Object} Translated blog post data
 */
export async function getBlogPostTranslation(language = 'en', postNumber) {
  try {
    // Get the original post for slug and date
    const postIndex = parseInt(postNumber.replace('post', '')) - 1;
    const originalPost = ALL_POSTS[postIndex];

    // Try to import the specific language version
    const postModule = await import(`./blog/${postNumber}/${language}.js`);

    // If content is null, fall back to English
    if (!postModule.content && language !== 'en') {
      const englishModule = await import(`./blog/${postNumber}/en.js`);
      return {
        title: postModule.title || englishModule.title,
        description: postModule.description || englishModule.description,
        content: englishModule.content,
        slug: originalPost?.slug,
        date: originalPost?.date,
        hasFullTranslation: false,
        language: language,
        fallbackLanguage: 'en'
      };
    }

    return {
      title: postModule.title,
      description: postModule.description,
      content: postModule.content,
      slug: originalPost?.slug,
      date: originalPost?.date,
      hasFullTranslation: !!postModule.content,
      language: language
    };

  } catch (error) {
    console.warn(`Could not load blog post ${postNumber} for language ${language}:`, error.message);

    // Fallback to English
    try {
      const postIndex = parseInt(postNumber.replace('post', '')) - 1;
      const originalPost = ALL_POSTS[postIndex];
      const englishModule = await import(`./blog/${postNumber}/en.js`);
      return {
        title: englishModule.title,
        description: englishModule.description,
        content: englishModule.content,
        slug: originalPost?.slug,
        date: originalPost?.date,
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

  for (let i = 0; i < blogPosts.length; i++) {
    const postNumber = blogPosts[i];
    try {
      const post = await getBlogPostTranslation(language, postNumber);
      const originalPost = ALL_POSTS[i];

      posts.push({
        id: originalPost.slug, // Use slug as id for URLs
        postId: postNumber, // Keep the post number for reference
        slug: originalPost.slug,
        date: originalPost.date,
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