import React, { useState, useEffect, useRef } from 'react';
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
}).sort((a, b) => new Date(b.date) - new Date(a.date)); // Ensure posts are displayed from oldest to newest with Post 1 at the bottom

// Function to convert titles into URL-friendly slugs
const generateSlug = (title) => title.replace(/\s+/g, '-').toLowerCase();

const Blog = () => {
  const [activePostId, setActivePostId] = useState(null);
  const postsSectionRef = useRef(null);

  const handlePostClick = (id, title) => {
    setActivePostId(id);
    const postElement = document.getElementById(`post-${id}`);
    if (postElement && postsSectionRef.current) {
      postsSectionRef.current.scrollTo({
        top: postElement.offsetTop - postsSectionRef.current.offsetTop,
        behavior: 'smooth'
      });
    }

    // Convert title to slug & update URL
    const postSlug = generateSlug(title);
    window.history.pushState(null, null, `#${postSlug}`);
  };

  // Handle page load with existing hash
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const targetPost = posts.find((post) => generateSlug(post.title) === hash);

      if (targetPost) {
        setActivePostId(targetPost.id);
        setTimeout(() => {
          const postElement = document.getElementById(`post-${targetPost.id}`);
          if (postElement && postsSectionRef.current) {
            postsSectionRef.current.scrollTo({
              top: postElement.offsetTop - postsSectionRef.current.offsetTop,
              behavior: 'instant'
            });
          }
        }, 100); // Ensure smooth behavior after page load
      }
    }
  }, []);

  return (
    <main className="container-fluid text-center p-0">
      <Header />
      <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
        <div className="blog-container">
          <div className="posts-section" ref={postsSectionRef}>
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
      <Footer />
    </main>
  );
};

export default Blog;
