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
import * as Post15 from '../Components/blog/Post15';
import * as Post16 from '../Components/blog/Post16';
import * as Post17 from '../Components/blog/Post17';
import * as Post18 from '../Components/blog/Post18';
import * as Post19 from '../Components/blog/Post19';
import * as Post20 from '../Components/blog/Post20';
import * as Post21 from '../Components/blog/Post21';
import * as Post22 from '../Components/blog/Post22';
import * as Post23 from '../Components/blog/Post23';
import * as Post24 from '../Components/blog/Post24';
import * as Post25 from '../Components/blog/Post25';
import * as Post26 from '../Components/blog/Post26';
import * as Post27 from '../Components/blog/Post27';
import * as Post28 from '../Components/blog/Post28';
import * as Post29 from '../Components/blog/Post29';
import * as Post30 from '../Components/blog/Post30';
import * as Post31 from '../Components/blog/Post31';
import * as Post32 from '../Components/blog/Post32';
import * as Post33 from '../Components/blog/Post33';

// Create dynamic mapping of all posts
const ALL_POSTS = [
  Post1, Post2, Post3, Post4, Post5, Post6, Post7,
  Post8, Post9, Post10, Post11, Post12, Post13, Post14, Post15, Post16,
  Post17, Post18, Post19, Post20, Post21, Post22, Post23, Post24, Post25, Post26, Post27, Post28, Post29, Post30,
  Post31, Post32, Post33
];

// Generate blog post IDs dynamically
const blogPosts = ALL_POSTS.map((_, index) => `post${index + 1}`).filter((postId, index) => {
  // Only include posts that have valid slug and date
  const post = ALL_POSTS[index];
  return post && post.slug && post.date;
});

const supportedLanguages = ['en', 'de', 'fr', 'es', 'jp'];

// Map language codes to file names (jp -> ja for file imports)
const languageFileMap = {
  'en': 'en',
  'de': 'de',
  'fr': 'fr',
  'es': 'es',
  'jp': 'ja'
};

/**
 * Get translated blog post data for a specific language and post
 * @param {string} language - Language code (en, de, fr, es, jp)
 * @param {string} postNumber - Post number (post1, post2, etc.)
 * @returns {Object} Translated blog post data
 */
export async function getBlogPostTranslation(language = 'en', postNumber) {
  try {
    // Get the original post for slug and date
    const postIndex = parseInt(postNumber.replace('post', '')) - 1;
    const originalPost = ALL_POSTS[postIndex];

    // Map language code to file name
    const languageFile = languageFileMap[language] || language;

    // Try to import the specific language version
    const postModule = await import(`./blog/${postNumber}/${languageFile}.js`);

    // If content is null, fall back to original Component file (for English) or English translation (for other languages)
    if (!postModule.content) {
      if (language === 'en') {
        // For English, use the original Component file content
        return {
          title: postModule.title || originalPost.title,
          description: postModule.description || originalPost.description,
          content: originalPost.content, // Use the Component file content
          keywords: postModule.keywords || originalPost.keywords,
          slug: originalPost?.slug,
          date: originalPost?.date,
          hasFullTranslation: true,
          language: language
        };
      } else {
        // For other languages, fall back to English
        const englishModule = await import(`./blog/${postNumber}/en.js`);
        return {
          title: postModule.title || englishModule.title,
          description: postModule.description || englishModule.description,
          content: englishModule.content || originalPost.content, // Fall back to Component if English also null
          keywords: postModule.keywords || englishModule.keywords || originalPost.keywords,
          slug: originalPost?.slug,
          date: originalPost?.date,
          hasFullTranslation: false,
          language: language,
          fallbackLanguage: 'en'
        };
      }
    }

    return {
      title: postModule.title,
      description: postModule.description,
      content: postModule.content,
      keywords: postModule.keywords,
      slug: originalPost?.slug,
      date: originalPost?.date,
      hasFullTranslation: !!postModule.content,
      language: language
    };

  } catch (error) {
    console.warn(`Could not load blog post ${postNumber} for language ${language}:`, error.message);

    // Fallback to original Component file
    try {
      const postIndex = parseInt(postNumber.replace('post', '')) - 1;
      const originalPost = ALL_POSTS[postIndex];

      return {
        title: originalPost.title,
        description: originalPost.description,
        content: originalPost.content,
        slug: originalPost?.slug,
        date: originalPost?.date,
        hasFullTranslation: true,
        language: 'en',
        fallbackLanguage: 'en'
      };
    } catch (fallbackError) {
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