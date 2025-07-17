import React, { useEffect, useRef } from 'react';
import './BubbleContainer.css';
// Bubble images now served from public directory

const BubbleContainer = ({ children, speed = 10, restrictOverflow = false, bubbleCount = 1 }) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    const bubbles = ['/images/bubble1.svg', '/images/bubble2.svg', '/images/bubble3.svg', '/images/bubble4.svg'];
    const gradientSections = document.querySelectorAll('.gradient-section');

    const createBubbles = () => {
      gradientSections.forEach(section => {
        for (let i = 0; i < bubbleCount; i++) { // Generate multiple bubbles
          const bubble = document.createElement('div');
          bubble.className = 'bubble';
          const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
          bubble.style.backgroundImage = `url(${randomBubble})`;
          bubble.style.left = `${Math.random() * 97}%`;
          bubble.style.animationDuration = `${speed}s`;
          
          // Increase bubble size by 25%
          bubble.style.width = '31px';  // 25px * 1.25 = ~31px
          bubble.style.height = '25px'; // 20px * 1.25 = 25px
          
          section.appendChild(bubble);

          bubble.addEventListener('animationend', () => {
            bubble.remove();
          });
        }
      });
    };

    const startBubbleGeneration = () => {
      if (!intervalRef.current) {
        // Decreased spawn rate by 20% (300ms to 360ms)
        intervalRef.current = setInterval(createBubbles, 450);
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