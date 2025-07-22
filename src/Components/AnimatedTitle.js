import React, { useEffect, useRef } from 'react';
import './AnimatedTitle.css';

const AnimatedTitle = ({ 
  text, 
  className = '', 
  delay = 0,
  as = 'h1', // Allow different HTML elements (h1, h2, h3, etc.)
  darkMode = false, // New dark mode prop
  uppercase = true // Control text transformation
}) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const element = titleRef.current;
    if (element && text) {
      // Split by words to prevent mid-word wrapping
      const words = text.split(' ');
      element.innerHTML = words
        .map((word, wordIndex) => {
          const wordChars = word
            .split('')
            .map((char, charIndex) => {
              const totalIndex = words.slice(0, wordIndex).join('').length + wordIndex + charIndex;
              const animationDelay = (totalIndex * 0.25) + delay; // Increased from 0.15 to 0.25 for slower wave
              const modeClass = darkMode ? 'dark-mode' : '';
              return `<span class="animated-char ${modeClass}" style="animation-delay: ${animationDelay}s">${char}</span>`;
            })
            .join('');
          return `<span class="animated-word">${wordChars}</span>`;
        })
        .join(' ');
    }
  }, [text, delay, darkMode, uppercase]);

  const Component = as;

  return (
    <Component 
      ref={titleRef} 
      className={`animated-title ${className} ${darkMode ? 'dark-mode' : ''} ${!uppercase ? 'lowercase' : ''}`}
    >
      {text}
    </Component>
  );
};

export default AnimatedTitle;