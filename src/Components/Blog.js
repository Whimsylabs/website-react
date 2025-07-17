import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';
import BlogPreview from './BlogPreview';

// Import posts statically to avoid hydration issues
import * as Post1 from './blog/Post1';
import * as Post2 from './blog/Post2';
import * as Post3 from './blog/Post3';

const posts = [
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
  }
].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort posts from newest to oldest

const Blog = () => {
  const [activePostId] = useState(null);
  const postsPerPage = 10; // Set pagination limit
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPage = 1; // For future pagination implementation

  // Get posts for current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
              <BlogPreview key={post.id} post={post} />
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
