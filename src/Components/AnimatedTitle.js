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
      // Split by words and animate whole words
      const words = text.split(' ');
      
      element.innerHTML = words
        .map((word, wordIndex) => {
          const animationDelay = (wordIndex * 0.3) + delay; // Staggered delay for each word
          const modeClass = darkMode ? 'dark-mode' : '';
          
          return `<span class="animated-word ${modeClass}" style="animation-delay: ${animationDelay}s; animation-duration: 3s; animation-iteration-count: infinite; animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);" data-word-index="${wordIndex}" data-delay="${animationDelay}">${word}</span>`;
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