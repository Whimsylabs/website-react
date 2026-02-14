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
      // Split by characters and animate each letter independently
      const chars = text.split('');
      let charIndex = 0;
      
      element.innerHTML = chars
        .map((char) => {
          if (char === ' ') {
            return '<span class="word-space"> </span>'; // Proper space element that allows wrapping
          }
          
          const animationDelay = (charIndex * 0.1) + delay; // Staggered delay for each character
          const modeClass = darkMode ? 'dark-mode' : '';
          charIndex++; // Only increment for non-space characters
          
          return `<span class="animated-char ${modeClass}" style="animation-delay: ${animationDelay}s; animation-duration: 3s; animation-iteration-count: infinite; animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);" data-char-index="${charIndex}" data-delay="${animationDelay}">${char}</span>`;
        })
        .join('');
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