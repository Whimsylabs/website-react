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
  const [currentPage, setCurrentPage] = useState(1);

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

  // Get posts for current page
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Pagination handlers
  const scrollToBlogSection = () => {
    // Find the blog posts section and scroll to it
    const blogSection = document.querySelector('.posts-section');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback to top if section not found
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToBlogSection();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToBlogSection();
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToBlogSection();
  };

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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Previous
                </button>

                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageClick(index + 1)}
                      className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Next
                </button>
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
