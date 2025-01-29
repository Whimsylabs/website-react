import React, { useState, useEffect } from 'react';
import './Blog.css';
import BubbleContainer from './BubbleContainer';

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

const Blog = () => {
  const [activePostId, setActivePostId] = useState(null);

  const handlePostClick = (id, title) => {
    setActivePostId(id);
    document.getElementById(`post-${id}`).scrollIntoView({ behavior: 'smooth' });

    // Convert title to a URL-friendly slug
    const postSlug = title.replace(/\s+/g, '-').toLowerCase();
    
    // Use window.history instead of history
    window.history.pushState(null, null, `#${postSlug}`);
};

  // Handle page load with existing hash
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const targetPost = posts.find(post => post.title.replace(/\s+/g, '-').toLowerCase() === hash);

      if (targetPost) {
        setActivePostId(targetPost.id);
        document.getElementById(`post-${targetPost.id}`).scrollIntoView({ behavior: 'instant' });
      }
    }
  }, []);

  return (
    <BubbleContainer speed={50}>
      <div className="blog-container">
        <div className="posts-section">
          {posts.map((post) => (
            <div className="post-box" id={`post-${post.id}`} key={post.id}>
              <h2>{post.title}</h2>
              <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              <div>{post.content}</div>
            </div>
          ))}
        </div>
        <div className="sidebar">
          <h2>Jump to Post</h2>
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className={activePostId === post.id ? 'active' : ''}
                onClick={() => handlePostClick(post.id, post.title)}
              >
                {post.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
        </BubbleContainer>
  );
};

export default Blog;
