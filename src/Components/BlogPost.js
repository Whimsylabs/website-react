import React, { useEffect, useState } from 'react';
// Removed React Router - using direct HTML links
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';
import { getBlogPostTranslation, getAllBlogPosts } from '../i18n/blogDataGenerator';

// Import posts directly for fallback (keep for build compatibility)
import * as Post1 from './blog/Post1';
import * as Post2 from './blog/Post2';
import * as Post3 from './blog/Post3';
import * as Post4 from './blog/Post4';
import * as Post5 from './blog/Post5';
import * as Post6 from './blog/Post6';
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

const BlogPost = (props = {}) => {
  const { language } = props;
  // Get slug from props (passed by App component)
  const routeSlug = props.slug;
  
  // Check if we're in SSR mode (props passed) or client-side mode (use hooks)
  // During SSR, we'll have blog post data passed as props
  const isSSR = props && (props.title || props.content || props.description);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(!isSSR);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  // Format the date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Always call useEffect (React rules)
  useEffect(() => {
    const loadBlogPost = async () => {
      if (routeSlug) {
        console.log('Looking for post with slug:', routeSlug);
        
        try {
          // Convert slug to post ID
          const postId = slugToPostId[routeSlug] || routeSlug;
          console.log('Mapped to post ID:', postId);
          
          // Get current language from props (for SSR) or URL path (for client-side)
          let language = props.language || 'en'; // Use props.language if available (SSR)
          
          if (!props.language && typeof window !== 'undefined') {
            // Client-side: detect from URL path
            const currentPath = window.location.pathname;
            const pathParts = currentPath.split('/').filter(part => part);
            if (pathParts.length > 0 && ['en', 'de', 'fr', 'es'].includes(pathParts[0])) {
              language = pathParts[0];
            }
          }
          
          console.log('BlogPost: Using language:', language, props.language ? '(from props)' : '(detected)');
          
          // Load the specific post
          const postData = await getBlogPostTranslation(language, postId);
          
          if (postData && postData.content) {
            // Get the correct date from the fallback posts
            const fallbackPost = fallbackPosts.find(p => p.id === routeSlug);
            const currentPost = {
              id: postId,
              slug: routeSlug,
              title: postData.title,
              content: postData.content,
              date: fallbackPost?.date || '2025-01-01', // Use fallback date
              description: postData.description
            };
            
            console.log('Found post:', currentPost.title);
            setPost(currentPost);
            
            // Use fallback posts for navigation (with correct dates)
            setAllPosts(fallbackPosts);
            
            // Set next and previous posts for navigation
            const postIndex = fallbackPosts.findIndex((p) => p.id === routeSlug);
            if (postIndex !== -1) {
              if (postIndex > 0) {
                setNextPost(fallbackPosts[postIndex - 1]); // Newer post
              }
              
              if (postIndex < fallbackPosts.length - 1) {
                setPrevPost(fallbackPosts[postIndex + 1]); // Older post
              }
            }
          } else {
            console.log('Post not found, trying fallback');
            // Fallback to old system
            const postIndex = fallbackPosts.findIndex((p) => p.id === routeSlug);
            if (postIndex !== -1) {
              setPost(fallbackPosts[postIndex]);
              setAllPosts(fallbackPosts);
              
              if (postIndex > 0) {
                setNextPost(fallbackPosts[postIndex - 1]);
              }
              
              if (postIndex < fallbackPosts.length - 1) {
                setPrevPost(fallbackPosts[postIndex + 1]);
              }
            }
          }
        } catch (error) {
          console.error('Error loading blog post:', error);
          // Fallback to old system
          const postIndex = fallbackPosts.findIndex((p) => p.id === routeSlug);
          if (postIndex !== -1) {
            setPost(fallbackPosts[postIndex]);
            setAllPosts(fallbackPosts);
          }
        }
        
        setLoading(false);
        
        // Scroll to top when post changes
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    };

    loadBlogPost();
  }, [routeSlug]);

  // For SSR, use props directly
  if (isSSR) {
    const currentPost = {
      id: props.slug,
      slug: props.slug,
      title: props.title,
      content: props.content,
      date: props.date,
      description: props.description
    };
    
    // Find navigation posts
    const allPostsForSSR = props.posts || fallbackPosts;
    const postIndex = allPostsForSSR.findIndex((p) => p.slug === props.slug);
    const currentNextPost = postIndex > 0 ? allPostsForSSR[postIndex - 1] : null;
    const currentPrevPost = postIndex < allPostsForSSR.length - 1 ? allPostsForSSR[postIndex + 1] : null;
    
    return renderBlogPost(currentPost, currentNextPost, currentPrevPost, formatDate, language);
  }

  // Client-side loading and error states
  if (!isSSR && loading) {
    return (
      <main className="container-fluid text-center p-0">
        <Header currentLang={language} />
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

  if (!isSSR && !post) {
    return (
      <main className="container-fluid text-center p-0">
        <Header currentLang={language} />
        <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
          <div className="blog-container">
            <div className="posts-section">
              <div className="post-box not-found-box">
                <h2>Post Not Found</h2>
                <p>Sorry, the blog post you're looking for doesn't exist.</p>
                <a href="/blog/" className="btn-primary post-nav-button">Back to Blog</a>
              </div>
            </div>
          </div>
        </BubbleContainer>
        <Footer language={language} />
      </main>
    );
  }

  // Render the blog post (client-side)
  return renderBlogPost(post, nextPost, prevPost, formatDate, language);
};

// Separate render function for reusability
function renderBlogPost(post, nextPost, prevPost, formatDate, language) {
  return (
    <main className="container-fluid text-center p-0">
      <Helmet>
        <title>{post.title} | WhimsyLabs Blog</title>
        <meta name="description" content={post.description} />
        {post.keywords && (
          <meta name="keywords" content={Array.isArray(post.keywords) ? post.keywords.join(', ') : post.keywords} />
        )}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://whimsylabs.ai/blog/${post.id || post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
      </Helmet>
      <Header currentLang={language} />
      <BubbleContainer speed={50} restrictOverflow={true} bubbleCount={3}>
        <div className="blog-container">
          <div className="posts-section single-post">
            <div className="post-box" id={`post-${post.id || post.slug}`}>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <span className="post-date">{formatDate(post.date)}</span>
                <span className="post-author">
                  By <a href="https://www.linkedin.com/in/drmarisafrench/" target="_blank" rel="noopener noreferrer">Dr Marisa French</a>
                </span>
              </div>
              {typeof post.content === 'string' 
                ? <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                : <div className="post-content">{post.content}</div>}
              
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
}

export default BlogPost;