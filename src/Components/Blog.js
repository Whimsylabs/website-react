import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Blog = () => {
  const [activePostId, setActivePostId] = useState(null);

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
            {posts.map((post) => (
              <div className="post-box post-preview" id={`post-${post.id}`} key={post.id}>
                <h2>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                <p className="post-description">{post.description}</p>
                <Link to={`/blog/${post.id}`} className="read-more-link">Read More</Link>
              </div>
            ))}
          </div>
          <div className="sidebar">
            <h2>Blog Posts</h2>
            <ul>
              {posts.map((post) => (
                <li
                  key={post.id}
                  className={activePostId === post.id ? 'active' : ''}
                >
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
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
