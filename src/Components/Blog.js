import React, { useState, useEffect } from 'react';
// Removed React Router - using direct HTML links
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';
import BlogPreview from './BlogPreview';
import { getAllBlogPosts } from '../i18n/blogDataGenerator';

// Import posts statically for fallback
import * as Post1 from './blog/Post1';
import * as Post2 from './blog/Post2';
import * as Post3 from './blog/Post3';
import * as Post4 from "./blog/Post4";
import * as Post5 from "./blog/Post5";
import * as Post6 from "./blog/Post6";
import * as Post7 from './blog/Post7';
import * as Post8 from './blog/Post8';
import * as Post9 from './blog/Post9';
import * as Post10 from './blog/Post10';
import * as Post11 from './blog/Post11';
import * as Post12 from './blog/Post12';
import * as Post13 from './blog/Post13';
import * as Post14 from './blog/Post14';
import * as Post15 from './blog/Post15';

// Fallback posts for build system compatibility
const fallbackPosts = [
  {
    id: Post1.slug,
    title: Post1.title,
    content: Post1.content,
    date: Post1.date,
    description: Post1.description,
  },
  {
    id: Post2.slug,
    title: Post2.title,
    content: Post2.content,
    date: Post2.date,
    description: Post2.description,
  },
  {
    id: Post3.slug,
    title: Post3.title,
    content: Post3.content,
    date: Post3.date,
    description: Post3.description,
  },
  {
    id: Post4.slug,
    title: Post4.title,
    content: Post4.content,
    date: Post4.date,
    description: Post4.description,
  },
  {
    id: Post5.slug,
    title: Post5.title,
    content: Post5.content,
    date: Post5.date,
    description: Post5.description,
  },
  {
    id: Post6.slug,
    title: Post6.title,
    content: Post6.content,
    date: Post6.date,
    description: Post6.description,
  },
  {
    id: Post7.slug,
    title: Post7.title,
    content: Post7.content,
    date: Post7.date,
    description: Post7.description,
  },
  {
    id: Post8.slug,
    title: Post8.title,
    content: Post8.content,
    date: Post8.date,
    description: Post8.description,
  },
  {
    id: Post9.slug,
    title: Post9.title,
    content: Post9.content,
    date: Post9.date,
    description: Post9.description,
  },
  {
    id: Post10.slug,
    title: Post10.title,
    content: Post10.content,
    date: Post10.date,
    description: Post10.description,
  },
  {
    id: Post11.slug,
    title: Post11.title,
    content: Post11.content,
    date: Post11.date,
    description: Post11.description,
  },
  {
    id: Post12.slug,
    title: Post12.title,
    content: Post12.content,
    date: Post12.date,
    description: Post12.description,
  },
  {
    id: Post13.slug,
    title: Post13.title,
    content: Post13.content,
    date: Post13.date,
    description: Post13.description,
  },
  {
    id: Post14.slug,
    title: Post14.title,
    content: Post14.content,
    date: Post14.date,
    description: Post14.description,
  },
  {
    id: Post15.slug,
    title: Post15.title,
    content: Post15.content,
    date: Post15.date,
    description: Post15.description,
  }
].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort posts from newest to oldest

// Mapping from old slugs to new post IDs
const slugToPostId = {
  'whimsylabs-education-revolution': 'post1',
  'physicality-in-virtual-labs': 'post2',
  'virtual-kidney-dissection-send-engagement': 'post3',
  'ai-powered-virtual-labs-solving-education-crisis': 'post4',
  'whimsycat-ai-tutor-transforming-science-education': 'post5',
  'sandbox-learning-revolution-stem-education': 'post6',
  'green-labs-sustainability-virtual-stem-education': 'post7',
  'virtual-labs-solve-stem-teacher-shortage-crisis': 'post8',
  '24-7-ai-tutoring-personalized-daily-recommendations': 'post9',
  'emotional-intelligence-ai-tutors-whimsycat-frustration-detection': 'post10',
  'virtual-labs-vs-physical-labs-cost-benefit-analysis': 'post11',
  'virtual-reality-prepares-students-real-world-stem-careers': 'post12',
  'science-real-time-physics-simulations-virtual-labs': 'post13',
  'gamification-science-education-points-rewards-engagement': 'post14',
  'whimsylabs-bett-2026-exhibition-announcement': 'post15'
};

// Reverse mapping from post IDs to slugs
const postIdToSlug = Object.fromEntries(
  Object.entries(slugToPostId).map(([slug, postId]) => [postId, slug])
);

const Blog = (props = {}) => {
  const { language } = props;
  const [activePostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [languagePrefix, setLanguagePrefix] = useState('');
  
  const postsPerPage = 10; // Set pagination limit
  const currentPage = 1; // For future pagination implementation

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        // Get current language from props (for SSR) or URL path (for client-side)
        let language = props.language || 'en'; // Use props.language if available (SSR)
        let langPrefix = '';
        
        if (!props.language && typeof window !== 'undefined') {
          // Client-side: detect from URL path
          const currentPath = window.location.pathname;
          const pathParts = currentPath.split('/').filter(part => part);
          if (pathParts.length > 0 && ['en', 'de', 'fr', 'es'].includes(pathParts[0])) {
            language = pathParts[0];
          }
        }
        
        if (language !== 'en') {
          langPrefix = `/${language}`;
        }
        
        setCurrentLanguage(language);
        setLanguagePrefix(langPrefix);
        
        console.log('Blog: Using language:', language, props.language ? '(from props)' : '(detected)');
        
        // Try to load translated blog posts
        try {
          const blogPosts = await getAllBlogPosts(language);
          
          if (blogPosts && blogPosts.length > 0) {
            // Convert to the format expected by the component and use correct dates
            const formattedPosts = blogPosts.map(post => {
              // Get the correct date from fallback posts
              const fallbackPost = fallbackPosts.find(p => p.id === (postIdToSlug[post.id] || post.id));
              return {
                id: postIdToSlug[post.id] || post.id, // Convert back to slug for URLs
                postId: post.id, // Keep the post ID for reference
                title: post.title,
                content: post.content,
                date: fallbackPost?.date || post.date, // Use fallback date if available
                description: post.description
              };
            }).sort((a, b) => new Date(b.date) - new Date(a.date));
            
            setPosts(formattedPosts);
          } else {
            console.log('Blog: No translated posts found, using fallback');
            setPosts(fallbackPosts);
          }
        } catch (translationError) {
          console.warn('Blog: Error loading translated posts:', translationError);
          setPosts(fallbackPosts);
        }
      } catch (error) {
        console.error('Blog: Error loading posts:', error);
        setPosts(fallbackPosts);
      }
      
      setLoading(false);
    };

    loadBlogPosts();
  }, []);

  // Get posts for current page
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <main className="container-fluid text-center p-0">
        <Header />
        <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
          <div className="blog-container">
            <div className="posts-section">
              <div className="post-box loading-box">
                <div className="loading-spinner"></div>
                <h2>Loading...</h2>
              </div>
            </div>
          </div>
        </BubbleContainer>
        <Footer language={language} />
      </main>
    );
  }

  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>Whimsylabs Blog - Latest Virtual Lab Innovations</title>
        <meta name="description" content="Stay updated with Whimsylabs' latest news on virtual laboratory technology and STEM education." />
      </Helmet>
      <Header />
      <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
        <div className="blog-container">
          <div className="posts-section blog-index">
            {currentPosts.map((post) => (
              <BlogPreview key={post.id} post={post} languagePrefix={languagePrefix} />
            ))}
            
            {/* Pagination placeholder - will be implemented when more posts are added */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <p>Page {currentPage} of {totalPages}</p>
                {/* Future pagination controls will go here */}
              </div>
            )}
          </div>
          <div className="sidebar">
            <h2>Blog Posts</h2>
            <ul>
              {posts.map((post) => (
                <li
                  key={post.id}
                  className={activePostId === post.id ? 'active' : ''}
                >
                  <a href={`${languagePrefix}/blog/${post.id}/`}>{post.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BubbleContainer>
      <Footer />
    </main>
  );
};

export default Blog;
