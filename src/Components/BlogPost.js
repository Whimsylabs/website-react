import React, { useRef } from 'react';
// Removed React Router - using direct HTML links
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';

const BlogPost = (props = {}) => {
  // Check for initial data from SSR (for hydration)
  const initialData = typeof window !== 'undefined' && window.__INITIAL_DATA__;
  const contentRef = useRef(null);

  // Use props from SSR or window data (hydration)
  const {
    language = (initialData && initialData.language),
    slug = (initialData && initialData.slug),
    title = (initialData && initialData.title),
    content = props.content, // Content can't be serialized, keep from props
    date = (initialData && initialData.date),
    description = (initialData && initialData.description),
    posts = (initialData && initialData.posts) || props.posts
  } = props;

  // Get serialized HTML content from initial data (for hydration)
  const contentHTML = initialData && initialData.contentHTML;

  // Format the date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Current post data
  const currentPost = {
    id: slug,
    slug: slug,
    title: title,
    content: content,
    date: date,
    description: description
  };

  // Find navigation posts from the posts array passed via props
  const allPosts = posts || [];
  const postIndex = allPosts.findIndex((p) => p.slug === slug || p.id === slug);
  const nextPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const prevPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  // Check if we have the minimum required data
  // During hydration, content may be undefined but the HTML is already rendered
  const isHydrating = typeof window !== 'undefined' && initialData && !content;

  if (!title && !isHydrating) {
    return (
      <main className="container-fluid text-center p-0">
        <Header />
        <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
          <div className="blog-container">
            <div className="posts-section">
              <div className="post-box not-found-box">
                <h2>Post Not Found</h2>
                <p>Sorry, the blog post you're looking for doesn't exist.</p>
                <a href={language && language !== 'en' ? `/${language}/blog/` : `/blog/`} className="btn-primary post-nav-button">
                  Back to Blog
                </a>
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
        <title>{currentPost.title} | WhimsyLabs Blog</title>
        <meta name="description" content={currentPost.description} />
        <meta property="og:title" content={currentPost.title} />
        <meta property="og:description" content={currentPost.description} />
        <meta property="og:url" content={`https://whimsylabs.ai/blog/${currentPost.id || currentPost.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={currentPost.date} />
      </Helmet>
      <Header />
      <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
        <div className="blog-container">
          <div className="posts-section single-post">
            <div className="post-box" id={`post-${currentPost.id || currentPost.slug}`}>
              <h1 className="post-title">{currentPost.title}</h1>
              <span className="post-date">{formatDate(currentPost.date)}</span>

              {/* Render content - handle both SSR and client hydration */}
              {(content || contentHTML) ? (
                // Both SSR and client - content is HTML string, use dangerouslySetInnerHTML
                <div className="post-content" dangerouslySetInnerHTML={{ __html: content || contentHTML }} />
              ) : (
                // Fallback - empty content
                <div className="post-content" ref={contentRef} />
              )}

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
};

export default BlogPost;
