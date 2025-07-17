import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';

// Import all posts dynamically
const postsContext = require.context('./blog', false, /Post\d+\.js$/);
const posts = postsContext.keys().map((key) => {
  const postModule = postsContext(key);
  return {
    id: postModule.slug,
    title: postModule.title,
    content: postModule.content,
    date: postModule.date,
    description: postModule.description,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort posts from newest to oldest

const BlogPost = (props = {}) => {

  
  // Check if we're in SSR mode (props passed) or client-side mode (use hooks)
  // During SSR, we'll have blog post data passed as props
  const isSSR = props && (props.slug || props.title || props.content || props.description);
  
  // Always call hooks at the top level (React rules)
  const { slug: routeSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(!isSSR);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);

  // Format the date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Always call useEffect (React rules)
  useEffect(() => {
    if (!isSSR) {
      // Find the post that matches the slug
      const postIndex = posts.findIndex((p) => p.id === routeSlug);
      
      if (postIndex !== -1) {
        setPost(posts[postIndex]);
        
        // Set next and previous posts for navigation
        if (postIndex > 0) {
          setNextPost(posts[postIndex - 1]); // Newer post
        }
        
        if (postIndex < posts.length - 1) {
          setPrevPost(posts[postIndex + 1]); // Older post
        }
      }
      
      setLoading(false);
      
      // Scroll to top when post changes
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }
  }, [routeSlug, isSSR]);

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
    const allPosts = props.posts || posts;
    const postIndex = allPosts.findIndex((p) => p.slug === props.slug);
    const currentNextPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
    const currentPrevPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;
    
    return renderBlogPost(currentPost, currentNextPost, currentPrevPost, formatDate);
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
        <Footer />
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
                <Link to="/blog" className="btn-primary post-nav-button">Back to Blog</Link>
              </div>
            </div>
          </div>
        </BubbleContainer>
        <Footer />
      </main>
    );
  }

  // Render the blog post (client-side)
  return renderBlogPost(post, nextPost, prevPost, formatDate);
};

// Separate render function for reusability
function renderBlogPost(post, nextPost, prevPost, formatDate) {
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
                    <Link to={`/blog/${prevPost.id || prevPost.slug}`} className="post-nav-button prev-post">
                      &larr; Older Post
                    </Link>
                  )}
                  
                  <Link to="/blog" className="post-nav-button back-to-blog">
                    All Posts
                  </Link>
                  
                  {nextPost && (
                    <Link to={`/blog/${nextPost.id || nextPost.slug}`} className="post-nav-button next-post">
                      Newer Post &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BubbleContainer>
      <Footer />
    </main>
  );
}

export default BlogPost;