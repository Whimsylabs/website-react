import React, { useState, useEffect, useMemo } from 'react';
// Removed React Router - using direct HTML links
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';
import BlogPreview from './BlogPreview';
import { getAllBlogPosts } from '../i18n/blogDataGenerator';

// Import posts statically for fallback
import * as Post1 from './blog/Post1';
import * as Post2 from './blog/Post2';
import * as Post3 from './blog/Post3';
import * as Post4 from "./blog/Post4";
import * as Post5 from "./blog/Post5";
import * as Post6 from "./blog/Post6";
import * as Post7 from './blog/Post7';
import * as Post8 from './blog/Post8';
import * as Post9 from './blog/Post9';
import * as Post10 from './blog/Post10';
import * as Post11 from './blog/Post11';
import * as Post12 from './blog/Post12';
import * as Post13 from './blog/Post13';
import * as Post14 from './blog/Post14';
import * as Post15 from './blog/Post15';
import * as Post16 from './blog/Post16';
import * as Post17 from './blog/Post17';
import * as Post18 from './blog/Post18';
import * as Post19 from './blog/Post19';
import * as Post20 from './blog/Post20';
import * as Post21 from './blog/Post21';
import * as Post22 from './blog/Post22';
import * as Post23 from './blog/Post23';
import * as Post24 from './blog/Post24';
import * as Post25 from './blog/Post25';
import * as Post26 from './blog/Post26';
import * as Post27 from './blog/Post27';
import * as Post28 from './blog/Post28';
import * as Post29 from './blog/Post29';
import * as Post30 from './blog/Post30';
import * as Post31 from './blog/Post31';

// Blog categories for filtering
const BLOG_CATEGORIES = {
  all: { label: 'All Posts', keywords: [] },
  'ai-education': { 
    label: 'AI Education', 
    keywords: ['AI tutor', 'artificial intelligence', 'WhimsyCat', 'machine learning', 'personalized learning', 'AI-powered']
  },
  'virtual-labs': { 
    label: 'Virtual Labs', 
    keywords: ['virtual lab', 'simulation', 'physics engine', 'sandbox', 'online lab', 'digital lab']
  },
  'teaching-resources': { 
    label: 'Teaching Resources', 
    keywords: ['teacher', 'classroom', 'curriculum', 'lesson', 'educator', 'teaching']
  },
  'stem-careers': { 
    label: 'STEM Careers', 
    keywords: ['career', 'workforce', 'industry', 'professional', 'job', 'employment']
  },
  'research': { 
    label: 'Research & Studies', 
    keywords: ['research', 'study', 'OECD', 'data', 'statistics', 'evidence']
  }
};

// Map posts to categories based on content/keywords
const categorizePost = (post) => {
  const searchText = `${post.title} ${post.description || ''}`.toLowerCase();
  const categories = [];
  
  Object.entries(BLOG_CATEGORIES).forEach(([key, { keywords }]) => {
    if (key === 'all') return;
    if (keywords.some(kw => searchText.includes(kw.toLowerCase()))) {
      categories.push(key);
    }
  });
  
  return categories.length > 0 ? categories : ['teaching-resources']; // Default category
};

// Fallback posts for build system compatibility
const fallbackPosts = [
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
  },
  {
    id: Post4.slug,
    title: Post4.title,
    content: Post4.content,
    date: Post4.date,
    description: Post4.description,
  },
  {
    id: Post5.slug,
    title: Post5.title,
    content: Post5.content,
    date: Post5.date,
    description: Post5.description,
  },
  {
    id: Post6.slug,
    title: Post6.title,
    content: Post6.content,
    date: Post6.date,
    description: Post6.description,
  },
  {
    id: Post7.slug,
    title: Post7.title,
    content: Post7.content,
    date: Post7.date,
    description: Post7.description,
  },
  {
    id: Post8.slug,
    title: Post8.title,
    content: Post8.content,
    date: Post8.date,
    description: Post8.description,
  },
  {
    id: Post9.slug,
    title: Post9.title,
    content: Post9.content,
    date: Post9.date,
    description: Post9.description,
  },
  {
    id: Post10.slug,
    title: Post10.title,
    content: Post10.content,
    date: Post10.date,
    description: Post10.description,
  },
  {
    id: Post11.slug,
    title: Post11.title,
    content: Post11.content,
    date: Post11.date,
    description: Post11.description,
  },
  {
    id: Post12.slug,
    title: Post12.title,
    content: Post12.content,
    date: Post12.date,
    description: Post12.description,
  },
  {
    id: Post13.slug,
    title: Post13.title,
    content: Post13.content,
    date: Post13.date,
    description: Post13.description,
  },
  {
    id: Post14.slug,
    title: Post14.title,
    content: Post14.content,
    date: Post14.date,
    description: Post14.description,
  },
  {
    id: Post15.slug,
    title: Post15.title,
    content: Post15.content,
    date: Post15.date,
    description: Post15.description,
  },
  {
    id: Post16.slug,
    title: Post16.title,
    content: Post16.content,
    date: Post16.date,
    description: Post16.description,
  },
  {
    id: Post17.slug,
    title: Post17.title,
    content: Post17.content,
    date: Post17.date,
    description: Post17.description,
  },
  {
    id: Post18.slug,
    title: Post18.title,
    content: Post18.content,
    date: Post18.date,
    description: Post18.description,
  },
  {
    id: Post19.slug,
    title: Post19.title,
    content: Post19.content,
    date: Post19.date,
    description: Post19.description,
  },
  {
    id: Post20.slug,
    title: Post20.title,
    content: Post20.content,
    date: Post20.date,
    description: Post20.description,
  },
  {
    id: Post21.slug,
    title: Post21.title,
    content: Post21.content,
    date: Post21.date,
    description: Post21.description,
  },
  {
    id: Post22.slug,
    title: Post22.title,
    content: Post22.content,
    date: Post22.date,
    description: Post22.description,
  },
  {
    id: Post23.slug,
    title: Post23.title,
    content: Post23.content,
    date: Post23.date,
    description: Post23.description,
  },
  {
    id: Post24.slug,
    title: Post24.title,
    content: Post24.content,
    date: Post24.date,
    description: Post24.description,
  },
  {
    id: Post25.slug,
    title: Post25.title,
    content: Post25.content,
    date: Post25.date,
    description: Post25.description,
  },
  {
    id: Post26.slug,
    title: Post26.title,
    content: Post26.content,
    date: Post26.date,
    description: Post26.description,
  },
  {
    id: Post27.slug,
    title: Post27.title,
    content: Post27.content,
    date: Post27.date,
    description: Post27.description,
  },
  {
    id: Post28.slug,
    title: Post28.title,
    content: Post28.content,
    date: Post28.date,
    description: Post28.description,
  },
  {
    id: Post29.slug,
    title: Post29.title,
    content: Post29.content,
    date: Post29.date,
    description: Post29.description,
  },
  {
    id: Post30.slug,
    title: Post30.title,
    content: Post30.content,
    date: Post30.date,
    description: Post30.description,
  },
  {
    id: Post31.slug,
    title: Post31.title,
    content: Post31.content,
    date: Post31.date,
    description: Post31.description,
  }
].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort posts from newest to oldest

// Mapping from old slugs to new post IDs
const slugToPostId = {
  'whimsylabs-education-revolution': 'post1',
  'physicality-in-virtual-labs': 'post2',
  'virtual-kidney-dissection-send-engagement': 'post3',
  'ai-powered-virtual-labs-solving-education-crisis': 'post4',
  'whimsycat-ai-tutor-transforming-science-education': 'post5',
  'sandbox-learning-revolution-stem-education': 'post6',
  'green-labs-sustainability-virtual-stem-education': 'post7',
  'virtual-labs-solve-stem-teacher-shortage-crisis': 'post8',
  '24-7-ai-tutoring-personalized-daily-recommendations': 'post9',
  'emotional-intelligence-ai-tutors-whimsycat-frustration-detection': 'post10',
  'virtual-labs-vs-physical-labs-cost-benefit-analysis': 'post11',
  'virtual-reality-prepares-students-real-world-stem-careers': 'post12',
  'science-real-time-physics-simulations-virtual-labs': 'post13',
  'gamification-science-education-points-rewards-engagement': 'post14',
  'whimsylabs-bett-2026-exhibition-announcement': 'post15',
  'why-traditional-virtual-labs-fail-physics-engine': 'post16',
  'whimsylabs-wins-techlearning-best-of-bett-2026': 'post17',
  'vr-winter-web-first-virtual-labs': 'post18',
  'oecd-ai-learning-paradox-virtual-labs': 'post19',
  'ai-assessment-crisis-solution': 'post20',
  'royal-society-partnership-grants-vr-science-labs': 'post21',
  'edtech-vendor-security-questions-powerschool': 'post22',
  'teachers-are-experts-custom-experiment-designer': 'post23',
  'how-to-choose-virtual-lab-software-school': 'post24',
  'virtual-chemistry-lab-teachers-guide': 'post25',
  'virtual-lab-software-guide-2026': 'post26',
  'ai-science-tutor-classroom-what-works': 'post27',
  'virtual-biology-lab-dissections-microscopy': 'post28',
  'virtual-physics-lab-simulations-teach': 'post29',
  'premium-science-education-accessible-grants': 'post30',
  'uk-government-ai-education-funding-2026': 'post31'
};

// Reverse mapping from post IDs to slugs
const postIdToSlug = Object.fromEntries(
  Object.entries(slugToPostId).map(([slug, postId]) => [postId, slug])
);

const Blog = (props = {}) => {
  const { language } = props;
  const [activePostId] = useState(null);

  // Always use fallbackPosts for blog listing since they have actual content
  // The server-rendered HTML uses fallbackPosts, so client should too for consistency
  const getInitialPosts = () => {
    return fallbackPosts;
  };

  const initialPosts = getInitialPosts();
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);
  const [currentLanguage, setCurrentLanguage] = useState(props.language || 'en');
  const [languagePrefix, setLanguagePrefix] = useState(
    props.language && props.language !== 'en' ? `/${props.language}` : ''
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');

  const postsPerPage = 10; // Set pagination limit
  
  // Featured posts for internal linking (manually curated key articles)
  const featuredPostIds = [
    'virtual-lab-software-guide-2026',           // Comprehensive guide
    'ai-science-tutor-classroom-what-works',     // AI education
    'how-to-choose-virtual-lab-software-school', // Buying guide
    'whimsylabs-wins-techlearning-best-of-bett-2026' // Award/credibility
  ];

  useEffect(() => {
    // Set language prefix based on props or URL
    let language = props.language || 'en';
    let langPrefix = '';

    if (!props.language && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split('/').filter(part => part);
      if (pathParts.length > 0 && ['en', 'de', 'fr', 'es', 'jp'].includes(pathParts[0])) {
        language = pathParts[0];
      }
    }

    if (language !== 'en') {
      langPrefix = `/${language}`;
    }

    setCurrentLanguage(language);
    setLanguagePrefix(langPrefix);

    // Client-side loading - always load translated posts for non-English languages
    const loadBlogPosts = async () => {
      console.log('Blog: Loading posts client-side for language:', language);

      try {
        const blogPosts = await getAllBlogPosts(language);

        if (blogPosts && blogPosts.length > 0) {
          const formattedPosts = blogPosts.map(post => {
            const fallbackPost = fallbackPosts.find(p => p.id === (postIdToSlug[post.id] || post.id));
            return {
              id: postIdToSlug[post.id] || post.id,
              postId: post.id,
              title: post.title,
              content: post.content,
              date: fallbackPost?.date || post.date,
              description: post.description
            };
          }).sort((a, b) => new Date(b.date) - new Date(a.date));

          setPosts(formattedPosts);
        } else {
          console.log('Blog: No translated posts found, using fallback');
          setPosts(fallbackPosts);
        }
      } catch (error) {
        console.error('Blog: Error loading posts:', error);
        setPosts(fallbackPosts);
      }

      setLoading(false);
    };

    loadBlogPosts();
  }, [props.posts, props.language]);

  // For SSR (bots), show all posts; for client-side, use pagination
  const isSSR = typeof window === 'undefined';
  
  // Merge translated metadata (title, description) with fallback content for preview cards
  // This ensures translated titles show while content extraction still works
  const postsWithCategories = useMemo(() => {
    const displayPosts = posts.length > 0 ? posts.map(post => {
      const fallbackPost = fallbackPosts.find(fp => fp.id === post.id);
      return {
        ...post,
        content: post.content || (fallbackPost ? fallbackPost.content : null),
        categories: categorizePost(post)
      };
    }) : fallbackPosts.map(post => ({
      ...post,
      categories: categorizePost(post)
    }));
    return displayPosts;
  }, [posts]);
  
  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return postsWithCategories;
    return postsWithCategories.filter(post => 
      post.categories.includes(activeCategory)
    );
  }, [postsWithCategories, activeCategory]);
  
  // Get featured posts for internal linking
  const featuredPosts = useMemo(() => {
    return postsWithCategories.filter(post => 
      featuredPostIds.includes(post.id)
    ).slice(0, 4);
  }, [postsWithCategories]);
  
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Show all posts for SSR/bots, paginated for client
  const currentPosts = isSSR ? filteredPosts : filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);
  
  // Generate Blog schema markup
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "WhimsyLabs Blog",
    "description": "Virtual laboratory innovations, AI-powered STEM education resources, and teaching guides for science educators",
    "url": `https://whimsylabs.ai${languagePrefix}/blog/`,
    "inLanguage": currentLanguage === 'jp' ? 'ja' : currentLanguage,
    "publisher": {
      "@type": "Organization",
      "name": "WhimsyLabs",
      "url": "https://whimsylabs.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://whimsylabs.ai/whimsylabs-logo.png"
      }
    },
    "blogPost": postsWithCategories.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "@id": `https://whimsylabs.ai${languagePrefix}/blog/${post.id}/`,
      "headline": post.title,
      "description": post.description || post.title,
      "datePublished": post.date,
      "url": `https://whimsylabs.ai${languagePrefix}/blog/${post.id}/`,
      "author": {
        "@type": "Organization",
        "name": "WhimsyLabs"
      }
    }))
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <main className="container-fluid text-center p-0">
        <Header currentLang={currentLanguage} />
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
        <Footer language={language} />
      </main>
    );
  }

  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>WhimsyLabs Blog | Virtual Lab & AI-Powered STEM Education Resources</title>
        <meta name="description" content="Explore expert insights on virtual science labs, AI tutoring, and STEM education innovation. Guides for teachers on virtual chemistry, physics, and biology labs. Award-winning EdTech resources." />
        <meta name="keywords" content="virtual lab software, AI science tutor, STEM education blog, virtual chemistry lab, virtual physics lab, science education resources, EdTech blog" />
        <link rel="canonical" href={`https://whimsylabs.ai${languagePrefix}/blog/`} />
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>
      <Header currentLang={currentLanguage} />
      <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
        <div className="blog-container">
          {/* Full-width header */}
          <header className="blog-header">
            <h1 className="blog-page-title">STEM Education Blog | WhimsyLabs</h1>
            <p className="blog-intro">
              Expert insights on virtual laboratories, AI-powered learning, and innovative STEM education. 
              Discover research-backed strategies and practical guides for science educators.
            </p>
          </header>
          
          {/* Full-width Featured Posts Section */}
          {featuredPosts.length > 0 && activeCategory === 'all' && (
            <section className="featured-posts-section" aria-label="Featured articles">
              <h2 className="featured-posts-heading">Featured Articles</h2>
              <div className="featured-posts-grid">
                {featuredPosts.map((post) => (
                  <a 
                    key={post.id} 
                    href={`${languagePrefix}/blog/${post.id}/`}
                    className="featured-post-card"
                  >
                    <h3 className="featured-post-title">{post.title}</h3>
                    <p className="featured-post-desc">{post.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
          
          {/* Main content area: filters + posts + sidebar */}
          <div className="blog-main-content">
            <div className="blog-posts-wrapper">
              {/* Category Filters */}
              <nav className="blog-categories" aria-label="Blog categories">
                <h2 className="visually-hidden">Filter by Topic</h2>
                <ul className="category-filter-list">
                  {Object.entries(BLOG_CATEGORIES).map(([key, { label }]) => (
                    <li key={key}>
                      <button
                        className={`category-filter-btn ${activeCategory === key ? 'active' : ''}`}
                        onClick={() => setActiveCategory(key)}
                        aria-pressed={activeCategory === key}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <section className="posts-section blog-index" aria-label="Blog posts">
            <h2 className="visually-hidden">
              {activeCategory === 'all' ? 'All Blog Posts' : `${BLOG_CATEGORIES[activeCategory]?.label} Articles`}
            </h2>
            {currentPosts.length === 0 ? (
              <div className="no-posts-message">
                <p>No posts found in this category. <button onClick={() => setActiveCategory('all')} className="link-button">View all posts</button></p>
              </div>
            ) : currentPosts.map((post) => (
              <BlogPreview key={post.id} post={post} languagePrefix={languagePrefix} />
            ))}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageClick(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-button"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
              </section>
            </div>
            {/* End blog-posts-wrapper */}
          
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
          {/* End blog-main-content */}
        </div>
      </BubbleContainer>
      <Footer />
    </main>
  );
};

export default Blog;
