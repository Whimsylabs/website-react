import React, { useEffect, useRef } from 'react';
import './BubbleContainer.css';
// Bubble images now served from public directory

const BubbleContainer = ({ children, speed = 10, restrictOverflow = false, bubbleCount = 1 }) => {
  const intervalRef = useRef(null);
  const bubbleImages = useRef([
    '/images/bubble1.svg',
    '/images/bubble2.svg', 
    '/images/bubble3.svg',
    '/images/bubble4.svg'
  ]);

  useEffect(() => {
    const gradientSections = document.querySelectorAll('.gradient-section');

    const createBubbles = () => {
      gradientSections.forEach(section => {
        // Only create bubbles if the section is visible to reduce unnecessary requests
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isVisible) return;

        for (let i = 0; i < bubbleCount; i++) {
          const bubble = document.createElement('div');
          bubble.className = 'bubble';
          
          // Use a cached image URL to reduce HTTP requests
          const randomBubble = bubbleImages.current[Math.floor(Math.random() * bubbleImages.current.length)];
          bubble.style.backgroundImage = `url(${randomBubble})`;
          bubble.style.left = `${Math.random() * 97}%`;
          bubble.style.animationDuration = `${speed}s`;
          
          section.appendChild(bubble);

          bubble.addEventListener('animationend', () => {
            bubble.remove();
          });
        }
      });
    };

    const startBubbleGeneration = () => {
      if (!intervalRef.current) {
        // Reduced spawn rate to 800ms to minimize HTTP requests
        intervalRef.current = setInterval(createBubbles, 800);
      }
    };

    const stopBubbleGeneration = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    document.addEventListener('visibilitychange', () => {
      document.hidden ? stopBubbleGeneration() : startBubbleGeneration();
    });

    startBubbleGeneration();

    return () => {
      stopBubbleGeneration();
    };
  }, [speed, bubbleCount]);

  return (
    <section className={`gradient-section ${restrictOverflow ? 'blog-context' : ''}`}>
      <div className="bubble-container" />
      <div className="content">
        {children}
      </div>
    </section>
  );
};

export default BubbleContainer;