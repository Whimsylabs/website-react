import React, { useState } from 'react';
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

  const handlePostClick = (id) => {
    setActivePostId(id);
    document.getElementById(`post-${id}`).scrollIntoView({ behavior: 'smooth' });
  };

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
              onClick={() => handlePostClick(post.id)}
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