import React, { useEffect, useState } from 'react';
// Removed React Router - using direct HTML links
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';
import { getBlogPostTranslation, getAllBlogPosts } from '../i18n/blogDataGenerator';

// Import posts directly for fallback (keep for build compatibility)
import * as Post1 from './blog/Post1';
import * as Post2 from './blog/Post2';
import * as Post3 from './blog/Post3';
import * as Post4 from './blog/Post4';
import * as Post5 from './blog/Post5';
import * as Post6 from './blog/Post6';

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
  }
].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort posts from newest to oldest

// Mapping from old slugs to new post IDs
const slugToPostId = {
  'whimsylabs-education-revolution': 'post1',
  'physicality-in-virtual-labs': 'post2', 
  'virtual-kidney-dissection-send-engagement': 'post3',
  'ai-powered-virtual-labs-solving-education-crisis': 'post4',
  'whimsycat-ai-tutor-transforming-science-education': 'post5',
  'sandbox-learning-revolution-stem-education': 'post6'
};

const BlogPost = (props = {}) => {
  const { language } = props;
  // Get slug from props (passed by App component)
  const routeSlug = props.slug;
  
  // Check if we're in SSR mode (props passed) or client-side mode (use hooks)
  // During SSR, we'll have blog post data passed as props
  const isSSR = props && (props.title || props.content || props.description);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(!isSSR);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  // Format the date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Always call useEffect (React rules)
  useEffect(() => {
    const loadBlogPost = async () => {
      if (routeSlug) {
        console.log('Looking for post with slug:', routeSlug);
        
        try {
          // Convert slug to post ID
          const postId = slugToPostId[routeSlug] || routeSlug;
          console.log('Mapped to post ID:', postId);
          
          // Get current language from props (for SSR) or URL path (for client-side)
          let language = props.language || 'en'; // Use props.language if available (SSR)
          
          if (!props.language && typeof window !== 'undefined') {
            // Client-side: detect from URL path
            const currentPath = window.location.pathname;
            const pathParts = currentPath.split('/').filter(part => part);
            if (pathParts.length > 0 && ['en', 'de', 'fr', 'es'].includes(pathParts[0])) {
              language = pathParts[0];
            }
          }
          
          console.log('BlogPost: Using language:', language, props.language ? '(from props)' : '(detected)');
          
          // Load the specific post
          const postData = await getBlogPostTranslation(language, postId);
          
          if (postData && postData.content) {
            // Get the correct date from the fallback posts
            const fallbackPost = fallbackPosts.find(p => p.id === routeSlug);
            const currentPost = {
              id: postId,
              slug: routeSlug,
              title: postData.title,
              content: postData.content,
              date: fallbackPost?.date || '2025-01-01', // Use fallback date
              description: postData.description
            };
            
            console.log('Found post:', currentPost.title);
            setPost(currentPost);
            
            // Use fallback posts for navigation (with correct dates)
            setAllPosts(fallbackPosts);
            
            // Set next and previous posts for navigation
            const postIndex = fallbackPosts.findIndex((p) => p.id === routeSlug);
            if (postIndex !== -1) {
              if (postIndex > 0) {
                setNextPost(fallbackPosts[postIndex - 1]); // Newer post
              }
              
              if (postIndex < fallbackPosts.length - 1) {
                setPrevPost(fallbackPosts[postIndex + 1]); // Older post
              }
            }
          } else {
            console.log('Post not found, trying fallback');
            // Fallback to old system
            const postIndex = fallbackPosts.findIndex((p) => p.id === routeSlug);
            if (postIndex !== -1) {
              setPost(fallbackPosts[postIndex]);
              setAllPosts(fallbackPosts);
              
              if (postIndex > 0) {
                setNextPost(fallbackPosts[postIndex - 1]);
              }
              
              if (postIndex < fallbackPosts.length - 1) {
                setPrevPost(fallbackPosts[postIndex + 1]);
              }
            }
          }
        } catch (error) {
          console.error('Error loading blog post:', error);
          // Fallback to old system
          const postIndex = fallbackPosts.findIndex((p) => p.id === routeSlug);
          if (postIndex !== -1) {
            setPost(fallbackPosts[postIndex]);
            setAllPosts(fallbackPosts);
          }
        }
        
        setLoading(false);
        
        // Scroll to top when post changes
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    };

    loadBlogPost();
  }, [routeSlug]);

  // For SSR, use props directly
  if (isSSR) {
    const currentPost = {
      id: props.slug,
      slug: props.slug,
      title: props.title,
      content: props.content,
      date: props.date,
      description: props.description
    };
    
    // Find navigation posts
    const allPostsForSSR = props.posts || fallbackPosts;
    const postIndex = allPostsForSSR.findIndex((p) => p.slug === props.slug);
    const currentNextPost = postIndex > 0 ? allPostsForSSR[postIndex - 1] : null;
    const currentPrevPost = postIndex < allPostsForSSR.length - 1 ? allPostsForSSR[postIndex + 1] : null;
    
    return renderBlogPost(currentPost, currentNextPost, currentPrevPost, formatDate, language);
  }

  // Client-side loading and error states
  if (!isSSR && loading) {
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

  if (!isSSR && !post) {
    return (
      <main className="container-fluid text-center p-0">
        <Header />
        <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
          <div className="blog-container">
            <div className="posts-section">
              <div className="post-box not-found-box">
                <h2>Post Not Found</h2>
                <p>Sorry, the blog post you're looking for doesn't exist.</p>
                <a href="../index.html" className="btn-primary post-nav-button">Back to Blog</a>
              </div>
            </div>
          </div>
        </BubbleContainer>
        <Footer language={language} />
      </main>
    );
  }

  // Render the blog post (client-side)
  return renderBlogPost(post, nextPost, prevPost, formatDate, language);
};

// Separate render function for reusability
function renderBlogPost(post, nextPost, prevPost, formatDate, language) {
  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>{post.title} | WhimsyLabs Blog</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://whimsylabs.ai/blog/${post.id || post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
      </Helmet>
      <Header />
      <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
        <div className="blog-container">
          <div className="posts-section single-post">
            <div className="post-box" id={`post-${post.id || post.slug}`}>
              <h1 className="post-title">{post.title}</h1>
              <span className="post-date">{formatDate(post.date)}</span>
              <div className="post-content">{post.content}</div>
              
              <div className="post-navigation">
                <div className="post-nav-links">
                  {prevPost && (
                    <a href={language && language !== 'en' ? `/${language}/blog/${prevPost.id || prevPost.slug}/` : `/blog/${prevPost.id || prevPost.slug}/`} className="post-nav-button prev-post">
                      &larr; Older Post
                    </a>
                  )}
                  
                  <a href={language && language !== 'en' ? `/${language}/blog/` : `/blog/`} className="post-nav-button back-to-blog">
                    All Posts
                  </a>
                  
                  {nextPost && (
                    <a href={language && language !== 'en' ? `/${language}/blog/${nextPost.id || nextPost.slug}/` : `/blog/${nextPost.id || nextPost.slug}/`} className="post-nav-button next-post">
                      Newer Post &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BubbleContainer>
      <Footer language={language} />
    </main>
  );
}

export default BlogPost;