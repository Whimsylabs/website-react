import React, { useState } from 'react';
// Removed React Router - using direct HTML links
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';
import BlogPreview from './BlogPreview';

const Blog = (props = {}) => {
  const { language, posts: propsPosts } = props;
  const [activePostId] = useState(null);

  // Check for initial data from SSR (for hydration)
  const initialData = typeof window !== 'undefined' && window.__INITIAL_DATA__;

  // Use posts from props (SSR) or window data (hydration) or empty array
  const posts = propsPosts || (initialData && initialData.posts) || [];
  const currentLanguage = language || (initialData && initialData.language) || 'en';

  // Get language prefix for URLs
  let languagePrefix = '';
  if (currentLanguage && currentLanguage !== 'en') {
    languagePrefix = `/${currentLanguage}`;
  }

  const postsPerPage = 10; // Set pagination limit
  const currentPage = 1; // For future pagination implementation

  // Get posts for current page
  const totalPages = Math.ceil(posts.length / postsPerPage);
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
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <BlogPreview key={post.id} post={post} languagePrefix={languagePrefix} />
              ))
            ) : (
              <div className="post-box">
                <h2>No blog posts available</h2>
                <p>Check back soon for new content!</p>
              </div>
            )}

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
                  <a href={`${languagePrefix}/blog/${post.id}/`}>{post.title}</a>
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
