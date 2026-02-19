import React, { useState, useEffect, useCallback, useRef } from 'react';
import './PageReader.css';

/**
 * PageReaderV2 - Text-to-speech with prebaked audio + Web Speech API fallback
 * 
 * Usage:
 *   <PageReaderV2 pageId="faq" language="en" />
 *   
 * Falls back to Web Speech API if no prebaked audio exists.
 */

// Language code mapping for speech synthesis fallback
const LANG_MAP = {
  'en': 'en-GB',
  'de': 'de-DE', 
  'es': 'es-ES',
  'fr': 'fr-FR',
  'jp': 'ja-JP',
  'ja': 'ja-JP'
};

// Cache for manifest
let manifestCache = null;
let manifestLoading = false;
let manifestCallbacks = [];

const loadManifest = async () => {
  if (manifestCache) return manifestCache;
  
  if (manifestLoading) {
    return new Promise((resolve) => {
      manifestCallbacks.push(resolve);
    });
  }
  
  manifestLoading = true;
  
  try {
    const response = await fetch('/audio/manifest.json');
    if (response.ok) {
      manifestCache = await response.json();
    } else {
      manifestCache = { pages: {} };
    }
  } catch (e) {
    console.warn('PageReader: Could not load audio manifest, using Web Speech API');
    manifestCache = { pages: {} };
  }
  
  manifestLoading = false;
  manifestCallbacks.forEach(cb => cb(manifestCache));
  manifestCallbacks = [];
  
  return manifestCache;
};

const PageReaderV2 = ({ 
  pageId = null,
  contentSelector = '.page-content',
  text = null,
  language = 'en',
  buttonPosition = 'floating',
  showLabel = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [usePrebaked, setUsePrebaked] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [voices, setVoices] = useState([]);
  
  const audioRef = useRef(null);
  const utteranceRef = useRef(null);

  // Load manifest and check for prebaked audio
  useEffect(() => {
    const checkPrebaked = async () => {
      if (!pageId) {
        setUsePrebaked(false);
        return;
      }
      
      const manifest = await loadManifest();
      const pageLang = language === 'ja' ? 'jp' : language;
      
      if (manifest.pages?.[pageId]?.[pageLang]) {
        setAudioUrl(manifest.pages[pageId][pageLang]);
        setUsePrebaked(true);
      } else {
        setUsePrebaked(false);
      }
    };
    
    checkPrebaked();
  }, [pageId, language]);

  // Check for Web Speech API support (for fallback)
  useEffect(() => {
    if (!('speechSynthesis' in window) && !usePrebaked) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    if (!usePrebaked) {
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof speechSynthesis !== 'undefined' && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [usePrebaked]);

  // Get best voice for language (Web Speech API fallback)
  const getVoiceForLanguage = useCallback((langCode) => {
    const targetLang = LANG_MAP[langCode] || langCode;
    const langPrefix = targetLang.split('-')[0];

    let voice = voices.find(v => v.lang === targetLang);
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith(langPrefix));
    }
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    }

    return voice;
  }, [voices]);

  // Extract readable text from the page (Web Speech API fallback)
  const getTextContent = useCallback(() => {
    if (text) return text;

    const container = document.querySelector(contentSelector);
    if (!container) {
      console.warn(`PageReader: No element found for selector "${contentSelector}"`);
      return '';
    }

    const clone = container.cloneNode(true);

    const removeSelectors = [
      'script', 'style', 'nav', 'header', 'footer',
      '.page-reader', '.no-read', 'button', '.social-icons',
      '.language-switcher', '.cookie-consent', '.references-section'
    ];
    
    removeSelectors.forEach(selector => {
      clone.querySelectorAll(selector).forEach(el => el.remove());
    });

    let textContent = clone.textContent || clone.innerText || '';
    textContent = textContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '. ')
      .trim();

    return textContent;
  }, [contentSelector, text]);

  // Play prebaked audio
  const playPrebaked = useCallback(() => {
    if (!audioUrl) return;

    if (audioRef.current && isPaused) {
      audioRef.current.play();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Create new audio element
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    audio.onpause = () => {
      if (!audio.ended) {
        setIsPaused(true);
        setIsPlaying(false);
      }
    };

    audio.onended = () => {
      setIsPlaying(false);
      setIsPaused(false);
      audioRef.current = null;
    };

    audio.onerror = (e) => {
      console.error('PageReader audio error:', e);
      setIsPlaying(false);
      setIsPaused(false);
      // Fall back to Web Speech API
      setUsePrebaked(false);
    };

    audio.play();
  }, [audioUrl, isPaused]);

  // Play using Web Speech API (fallback)
  const playWebSpeech = useCallback(() => {
    if (!('speechSynthesis' in window)) return;

    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    speechSynthesis.cancel();

    const textToRead = getTextContent();
    if (!textToRead) {
      console.warn('PageReader: No text content to read');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    const voice = getVoiceForLanguage(language);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('PageReader error:', event.error);
      setIsPlaying(false);
      setIsPaused(false);
    };

    speechSynthesis.speak(utterance);
  }, [isPaused, getTextContent, getVoiceForLanguage, language]);

  // Main play handler
  const handlePlay = useCallback(() => {
    if (usePrebaked && audioUrl) {
      playPrebaked();
    } else {
      playWebSpeech();
    }
  }, [usePrebaked, audioUrl, playPrebaked, playWebSpeech]);

  // Pause handler
  const handlePause = useCallback(() => {
    if (usePrebaked && audioRef.current) {
      audioRef.current.pause();
    } else if (speechSynthesis.speaking && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [usePrebaked, isPaused]);

  // Stop handler
  const handleStop = useCallback(() => {
    if (usePrebaked && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    } else {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  }, [usePrebaked]);

  if (!isSupported) {
    return null;
  }

  const containerClass = buttonPosition === 'floating' 
    ? 'page-reader page-reader-floating' 
    : 'page-reader page-reader-inline';

  return (
    <div className={containerClass}>
      {!isPlaying && !isPaused && (
        <button 
          className="page-reader-btn page-reader-play"
          onClick={handlePlay}
          aria-label="Read page aloud"
          title={usePrebaked ? "Listen (high quality audio)" : "Read page aloud"}
        >
          <span className="page-reader-icon">🔊</span>
          {showLabel && <span className="page-reader-label">Listen</span>}
        </button>
      )}
      
      {isPlaying && (
        <button 
          className="page-reader-btn page-reader-pause"
          onClick={handlePause}
          aria-label="Pause reading"
          title="Pause reading"
        >
          <span className="page-reader-icon">⏸️</span>
          {showLabel && <span className="page-reader-label">Pause</span>}
        </button>
      )}
      
      {isPaused && (
        <button 
          className="page-reader-btn page-reader-resume"
          onClick={handlePlay}
          aria-label="Resume reading"
          title="Resume reading"
        >
          <span className="page-reader-icon">▶️</span>
          {showLabel && <span className="page-reader-label">Resume</span>}
        </button>
      )}
      
      {(isPlaying || isPaused) && (
        <button 
          className="page-reader-btn page-reader-stop"
          onClick={handleStop}
          aria-label="Stop reading"
          title="Stop reading"
        >
          <span className="page-reader-icon">⏹️</span>
          {showLabel && <span className="page-reader-label">Stop</span>}
        </button>
      )}
    </div>
  );
};

export default PageReaderV2;
