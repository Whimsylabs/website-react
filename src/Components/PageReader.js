import React, { useState, useEffect, useCallback, useRef } from 'react';
import './PageReader.css';

/**
 * PageReader - Text-to-speech component using Web Speech API
 * 
 * Usage:
 *   <PageReader contentSelector=".page-content" language="en" />
 *   
 * Or with explicit text:
 *   <PageReader text="Text to read" language="de" />
 */

// Language code mapping for speech synthesis
const LANG_MAP = {
  'en': 'en-GB',
  'de': 'de-DE', 
  'es': 'es-ES',
  'fr': 'fr-FR',
  'jp': 'ja-JP',
  'ja': 'ja-JP'
};

const PageReader = ({ 
  contentSelector = '.page-content',
  text = null,
  language = 'en',
  buttonPosition = 'floating', // 'floating' | 'inline'
  showLabel = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [voices, setVoices] = useState([]);
  const utteranceRef = useRef(null);

  // Check for Web Speech API support
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      console.warn('PageReader: Web Speech API not supported in this browser');
      return;
    }

    // Load available voices
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    // Cleanup on unmount
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Get best voice for language
  const getVoiceForLanguage = useCallback((langCode) => {
    const targetLang = LANG_MAP[langCode] || langCode;
    const langPrefix = targetLang.split('-')[0];

    // Try to find exact match first
    let voice = voices.find(v => v.lang === targetLang);
    
    // Fall back to language prefix match
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith(langPrefix));
    }
    
    // Fall back to any English voice, then default
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    }

    return voice;
  }, [voices]);

  // Extract readable text from the page
  const getTextContent = useCallback(() => {
    if (text) return text;

    const container = document.querySelector(contentSelector);
    if (!container) {
      console.warn(`PageReader: No element found for selector "${contentSelector}"`);
      return '';
    }

    // Clone to avoid modifying the DOM
    const clone = container.cloneNode(true);

    // Remove elements that shouldn't be read
    const removeSelectors = [
      'script', 'style', 'nav', 'header', 'footer',
      '.page-reader', '.no-read', 'button', '.social-icons',
      '.language-switcher', '.cookie-consent', '.references-section'
    ];
    
    removeSelectors.forEach(selector => {
      clone.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Get text and clean it up
    let textContent = clone.textContent || clone.innerText || '';
    
    // Clean up whitespace
    textContent = textContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '. ')
      .trim();

    return textContent;
  }, [contentSelector, text]);

  // Start reading
  const handlePlay = useCallback(() => {
    if (!isSupported) return;

    // If paused, resume
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Cancel any existing speech
    speechSynthesis.cancel();

    const textToRead = getTextContent();
    if (!textToRead) {
      console.warn('PageReader: No text content to read');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    // Set voice for language
    const voice = getVoiceForLanguage(language);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    // Settings
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Event handlers
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
  }, [isSupported, isPaused, getTextContent, getVoiceForLanguage, language]);

  // Pause reading
  const handlePause = useCallback(() => {
    if (speechSynthesis.speaking && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [isPaused]);

  // Stop reading
  const handleStop = useCallback(() => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  // Don't render if not supported
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
          title="Read page aloud"
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

export default PageReader;
