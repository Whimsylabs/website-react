import React, { useEffect, useState } from 'react';
// Removed React Router - using direct HTML links
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';

// Import posts directly to avoid require.context issues
import * as Post1 from './blog/Post1';
import * as Post2 from './blog/Post2';
import * as Post3 from './blog/Post3';

const posts = [
  {
    id: Post3.slug,
    title: Post3.title,
    content: Post3.content,
    date: Post3.date,
    description: Post3.description,
  },
  {
    id: Post2.slug,
    title: Post2.title,
    content: Post2.content,
    date: Post2.date,
    description: Post2.description,
  },
  {
    id: Post1.slug,
    title: Post1.title,
    content: Post1.content,
    date: Post1.date,
    description: Post1.description,
  }
].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort posts from newest to oldest

const BlogPost = (props = {}) => {

  
  // Get slug from props (passed by App component)
  const routeSlug = props.slug;
  
  // Check if we're in SSR mode (props passed) or client-side mode (use hooks)
  // During SSR, we'll have blog post data passed as props
  const isSSR = props && (props.title || props.content || props.description);
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
    if (routeSlug) {
      console.log('Looking for post with slug:', routeSlug);
      console.log('Available posts:', posts.map(p => ({ id: p.id, title: p.title })));
      
      // Find the post that matches the slug
      const postIndex = posts.findIndex((p) => p.id === routeSlug);
      
      if (postIndex !== -1) {
        console.log('Found post:', posts[postIndex].title);
        setPost(posts[postIndex]);
        
        // Set next and previous posts for navigation
        if (postIndex > 0) {
          setNextPost(posts[postIndex - 1]); // Newer post
        }
        
        if (postIndex < posts.length - 1) {
          setPrevPost(posts[postIndex + 1]); // Older post
        }
      } else {
        console.log('Post not found for slug:', routeSlug);
      }
      
      setLoading(false);
      
      // Scroll to top when post changes
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }
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
                <a href="../index.html" className="btn-primary post-nav-button">Back to Blog</a>
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
                    <a href={`../${prevPost.id || prevPost.slug}/index.html`} className="post-nav-button prev-post">
                      &larr; Older Post
                    </a>
                  )}
                  
                  <a href="../index.html" className="post-nav-button back-to-blog">
                    All Posts
                  </a>
                  
                  {nextPost && (
                    <a href={`../${nextPost.id || nextPost.slug}/index.html`} className="post-nav-button next-post">
                      Newer Post &rarr;
                    </a>
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