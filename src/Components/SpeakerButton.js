import React, { useState, useRef, useCallback } from 'react';
import './SpeakerButton.css';

/**
 * SpeakerButton - Accessible audio playback button
 * 
 * Features:
 * - Lazy loads audio on first click (saves bandwidth)
 * - Proper button states (hover, pressed, playing)
 * - Speaker icon -> Stop icon when playing
 * - Accessible with ARIA labels
 * 
 * Usage:
 *   <SpeakerButton audioSrc="/audio/en/faq-1.mp3" label="Listen to answer" />
 */

const SpeakerButton = ({ 
  audioSrc, 
  label = "Listen",
  size = "medium", // "small" | "medium" | "large"
  className = "",
  onPlay,
  onStop,
  onError
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);

  const handleClick = useCallback(async () => {
    // If audio exists, toggle play/stop
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        // Currently playing - stop it completely
        const audio = audioRef.current;
        // Remove event handlers first to prevent error state
        audio.oncanplaythrough = null;
        audio.onplay = null;
        audio.onended = null;
        audio.onpause = null;
        audio.onerror = null;
        audio.pause();
        audio.currentTime = 0;
        audio.src = ''; // Clear source to force stop
        audioRef.current = null; // Clear ref so next click creates fresh audio
        setIsPlaying(false);
        setHasError(false); // Ensure no error state
        onStop?.();
      } else {
        // Currently paused/stopped - play from start
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => {
          console.error('SpeakerButton: Play failed', err);
        });
      }
      return;
    }

    // No audio loaded yet - lazy load it
    setIsLoading(true);
    setHasError(false);
    
    try {
      const audio = new Audio();
      
      audio.oncanplaythrough = () => {
        setIsLoading(false);
        audio.play().catch(err => {
          console.error('SpeakerButton: Initial play failed', err);
        });
      };
      
      audio.onplay = () => {
        setIsPlaying(true);
        onPlay?.();
      };
      
      audio.onended = () => {
        setIsPlaying(false);
        onStop?.();
      };
      
      audio.onpause = () => {
        setIsPlaying(false);
      };
      
      audio.onerror = (e) => {
        console.error('SpeakerButton: Audio load error', e);
        setIsLoading(false);
        setHasError(true);
        setIsPlaying(false);
        onError?.(e);
      };
      
      audioRef.current = audio;
      audio.src = audioSrc;
      audio.load();
      
    } catch (err) {
      console.error('SpeakerButton: Failed to create audio', err);
      setIsLoading(false);
      setHasError(true);
      onError?.(err);
    }
  }, [audioSrc, onPlay, onStop, onError]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Reset if audioSrc changes
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(false);
    }
  }, [audioSrc]);

  const sizeClass = `speaker-btn-${size}`;
  const stateClass = isPlaying ? 'speaker-btn-playing' : '';
  const loadingClass = isLoading ? 'speaker-btn-loading' : '';
  const errorClass = hasError ? 'speaker-btn-error' : '';

  return (
    <button
      className={`speaker-btn ${sizeClass} ${stateClass} ${loadingClass} ${errorClass} ${className}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isPlaying ? "Stop audio" : (hasError ? "Audio unavailable" : label)}
      title={isPlaying ? "Stop" : (hasError ? "Audio unavailable" : label)}
    >
      <span className="speaker-btn-icon">
        {isLoading ? (
          // Loading spinner
          <svg viewBox="0 0 24 24" className="speaker-icon-spinner">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" />
          </svg>
        ) : isPlaying ? (
          // Stop icon (square)
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        ) : hasError ? (
          // Error icon
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        ) : (
          // Speaker icon
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </span>
    </button>
  );
};

export default SpeakerButton;
