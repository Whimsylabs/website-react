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
});

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the post that matches the slug
    const foundPost = posts.find((p) => p.id === slug);
    setPost(foundPost);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <main className="container-fluid text-center p-0">
        <Header />
        <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
          <div className="blog-container">
            <div className="posts-section">
              <div className="post-box">
                <h2>Loading...</h2>
              </div>
            </div>
          </div>
        </BubbleContainer>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="container-fluid text-center p-0">
        <Header />
        <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
          <div className="blog-container">
            <div className="posts-section">
              <div className="post-box">
                <h2>Post Not Found</h2>
                <p>Sorry, the blog post you're looking for doesn't exist.</p>
                <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
              </div>
            </div>
          </div>
        </BubbleContainer>
        <Footer />
      </main>
    );
  }

  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>{post.title} | WhimsyLabs Blog</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://whimsylabs.ai/blog/${post.id}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
      </Helmet>
      <Header />
      <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
        <div className="blog-container">
          <div className="posts-section single-post">
            <div className="post-box" id={`post-${post.id}`}>
              <h2>{post.title}</h2>
              <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              <div>{post.content}</div>
              <div className="post-navigation">
                <Link to="/blog" className="btn btn-primary">Back to All Posts</Link>
              </div>
            </div>
          </div>
        </div>
      </BubbleContainer>
      <Footer />
    </main>
  );
};

export default BlogPost;