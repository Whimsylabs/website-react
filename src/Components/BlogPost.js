import React, { useEffect, useState, useCallback, useRef } from 'react';
// Removed React Router - using direct HTML links
import { Helmet } from 'react-helmet-async';
import './Blog.css';
import BubbleContainer from './BubbleContainer';
import Header from './Header';
import Footer from './Footer';
import { getBlogPostTranslation, getAllBlogPosts } from '../i18n/blogDataGenerator';
import { getLocalizedPath } from '../i18n';
import blogPostSlugs from '../i18n/blogPostSlugs.json';
import SpeakerButton from './SpeakerButton';

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
import * as Post32 from './blog/Post32';
import * as Post33 from './blog/Post33';
import * as Post34 from './blog/Post34';
import * as Post35 from './blog/Post35';
import * as Post38 from './blog/Post38';

// Blog Article Speaker - Uses pre-generated audio with Web Speech API fallback
const ArticleSpeaker = ({ language = 'en', postNumber }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  const audioLang = language === 'ja' ? 'jp' : language;
  const audioSrc = postNumber ? `/audio/blog/${audioLang}/post${postNumber}.mp3` : null;

  const langMap = {
    'en': 'en-GB', 'de': 'de-DE', 'es': 'es-ES', 
    'fr': 'fr-FR', 'jp': 'ja-JP', 'ja': 'ja-JP'
  };

  const getTextContent = useCallback(() => {
    const container = document.querySelector('.post-content');
    if (!container) return '';
    const clone = container.cloneNode(true);
    clone.querySelectorAll('script, style, .no-read').forEach(el => el.remove());
    return clone.textContent?.replace(/\s+/g, ' ').trim() || '';
  }, []);

  // Play pre-generated audio
  const playAudio = useCallback(() => {
    if (!audioSrc) {
      setUseFallback(true);
      return;
    }

    if (audioRef.current && isPaused) {
      audioRef.current.play();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);
    const audio = new Audio();
    audioRef.current = audio;

    audio.oncanplaythrough = () => {
      setIsLoading(false);
      audio.play();
    };
    audio.onplay = () => { setIsPlaying(true); setIsPaused(false); };
    audio.onpause = () => { if (!audio.ended) { setIsPaused(true); setIsPlaying(false); } };
    audio.onended = () => { setIsPlaying(false); setIsPaused(false); audioRef.current = null; };
    audio.onerror = () => {
      setIsLoading(false);
      setUseFallback(true); // Fall back to Web Speech API
    };

    audio.src = audioSrc;
    audio.load();
  }, [audioSrc, isPaused]);

  // Fallback: Web Speech API
  const playWebSpeech = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    speechSynthesis.cancel();
    const text = getTextContent();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    const voices = speechSynthesis.getVoices();
    const targetLang = langMap[language] || 'en-GB';
    const voice = voices.find(v => v.lang === targetLang) || 
                  voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };
    
    speechSynthesis.speak(utterance);
  }, [language, isPaused, getTextContent]);

  const handlePlay = useCallback(() => {
    if (useFallback || !audioSrc) {
      playWebSpeech();
    } else {
      playAudio();
    }
  }, [useFallback, audioSrc, playAudio, playWebSpeech]);

  const handlePause = useCallback(() => {
    if (audioRef.current && !useFallback) {
      audioRef.current.pause();
    } else if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [useFallback]);

  const handleStop = useCallback(() => {
    if (audioRef.current) {
      // Clear event handlers before stopping to prevent state conflicts
      audioRef.current.onpause = null;
      audioRef.current.onended = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="article-speaker">
      {!isPlaying && !isPaused && (
        <button className="article-speaker-btn" onClick={handlePlay} disabled={isLoading}>
          <span className="speaker-icon">{isLoading ? '⏳' : '🔊'}</span> 
          {isLoading ? 'Loading...' : 'Listen to Article'}
        </button>
      )}
      {isPlaying && (
        <button className="article-speaker-btn playing" onClick={handlePause}>
          <span className="speaker-icon">⏸️</span> Pause
        </button>
      )}
      {isPaused && (
        <button className="article-speaker-btn paused" onClick={handlePlay}>
          <span className="speaker-icon">▶️</span> Resume
        </button>
      )}
      {(isPlaying || isPaused) && (
        <button className="article-speaker-btn stop" onClick={handleStop}>
          <span className="speaker-icon">⏹️</span> Stop
        </button>
      )}
    </div>
  );
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
  },
  {
    id: Post32.slug,
    title: Post32.title,
    content: Post32.content,
    date: Post32.date,
    description: Post32.description,
  },
  {
    id: Post33.slug,
    title: Post33.title,
    content: Post33.content,
    date: Post33.date,
    description: Post33.description,
  },
  {
    id: Post34.slug,
    title: Post34.title,
    content: Post34.content,
    date: Post34.date,
    description: Post34.description,
  },
  {
    id: Post35.slug,
    title: Post35.title,
    content: Post35.content,
    date: Post35.date,
    description: Post35.description,
  },
  {
    id: Post38.slug,
    title: Post38.title,
    content: Post38.content,
    date: Post38.date,
    description: Post38.description,
  }
].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort posts from newest to oldest

// Mapping from old slugs to new post IDs
// Slug -> post ID, derived from the shared source of truth so this can never
// drift from build.js / generate-blog-data.js.
const slugToPostId = Object.fromEntries(
  Object.entries(blogPostSlugs).map(([id, slug]) => [slug, id])
);

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
              date: postData.date || fallbackPost?.date || '2025-01-01', // Prefer authoritative date from translation data, then fallback
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
                <p className="loading-text" role="status">Loading...</p>
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
                <h1>Post Not Found</h1>
                <p>Sorry, the blog post you're looking for doesn't exist.</p>
                <a href={getLocalizedPath("/blog/", language)} className="btn-primary post-nav-button">Back to Blog</a>
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
// Contextual links from every post to the product pages (internal linking:
// high-ranking posts were previously dead ends with no route to features/contact)
const POST_CTA_TEXT = {
  en: { lead: 'Want to see what your students could do in a WhimsyLabs virtual lab?', features: 'Explore the features', demo: 'Book a free demo' },
  de: { lead: 'Möchten Sie sehen, was Ihre Schüler in einem virtuellen WhimsyLabs-Labor erreichen können?', features: 'Funktionen entdecken', demo: 'Kostenlose Demo buchen' },
  es: { lead: '¿Quiere ver lo que sus estudiantes podrían hacer en un laboratorio virtual de WhimsyLabs?', features: 'Descubra las funciones', demo: 'Reserve una demo gratuita' },
  fr: { lead: 'Envie de découvrir ce que vos élèves pourraient faire dans un laboratoire virtuel WhimsyLabs ?', features: 'Découvrir les fonctionnalités', demo: 'Réserver une démo gratuite' },
  ja: { lead: 'WhimsyLabsのバーチャルラボで生徒たちが何をできるか、ご覧になりませんか？', features: '機能を見る', demo: '無料デモを予約' },
};
POST_CTA_TEXT.jp = POST_CTA_TEXT.ja;

function renderBlogPost(post, nextPost, prevPost, formatDate, language) {
  const cta = POST_CTA_TEXT[language] || POST_CTA_TEXT.en;
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
                <div className="post-meta-left">
                  <span className="post-date">{formatDate(post.date)}</span>
                  <span className="post-author">
                    By <a href="https://www.linkedin.com/in/drmarisafrench/" target="_blank" rel="noopener noreferrer">Dr Marisa French</a>
                  </span>
                </div>
                <SpeakerButton 
                  audioSrc={`/audio/blog/${language === 'ja' ? 'jp' : language}/post${post.id?.replace('post', '') || ''}.mp3`}
                  label={language === 'ja' ? '記事を聴く' : language === 'de' ? 'Artikel anhören' : language === 'es' ? 'Escuchar artículo' : language === 'fr' ? 'Écouter l\'article' : 'Listen to article'}
                  size="small"
                  className="whimsy-theme blog-speaker"
                />
              </div>
              {typeof post.content === 'string'
                ? <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                : <div className="post-content">{post.content}</div>}

              <div className="post-cta">
                <p className="post-cta-lead">{cta.lead}</p>
                <div className="post-cta-links">
                  <a href={getLocalizedPath("/features/", language)} className="post-nav-button">{cta.features}</a>
                  <a href={getLocalizedPath("/contact/", language)} className="post-nav-button">{cta.demo}</a>
                </div>
              </div>

              <div className="post-navigation">
                <div className="post-nav-links">
                  {prevPost && (
                    <a href={getLocalizedPath(`/blog/${prevPost.id || prevPost.slug}/`, language)} className="post-nav-button prev-post">
                      &larr; Older Post
                    </a>
                  )}
                  
                  <a href={getLocalizedPath("/blog/", language)} className="post-nav-button back-to-blog">
                    All Posts
                  </a>
                  
                  {nextPost && (
                    <a href={getLocalizedPath(`/blog/${nextPost.id || nextPost.slug}/`, language)} className="post-nav-button next-post">
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