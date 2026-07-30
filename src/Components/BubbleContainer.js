import React, { useEffect, useRef } from 'react';
import './BubbleContainer.css';
// Bubble images now served from public directory

const BubbleContainer = ({ children, speed = 10, restrictOverflow = false, bubbleCount = 1 }) => {
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  const bubbleImages = useRef([
    '/images/bubble1.svg',
    '/images/bubble2.svg',
    '/images/bubble3.svg',
    '/images/bubble4.svg'
  ]);

  useEffect(() => {
    // Each instance only spawns bubbles into its own section; querying all
    // .gradient-section elements made every instance feed every section,
    // multiplying the spawn rate on pages with several containers.
    const section = sectionRef.current;
    if (!section) return;

    const createBubbles = () => {
      // Only create bubbles if the section is visible to reduce unnecessary requests
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isVisible) return;

      // Rise distance covers 150% of the section height (see riseAndWobble keyframes)
      const rise = Math.round(rect.height * 1.5);

      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        // Use a cached image URL to reduce HTTP requests
        const randomBubble = bubbleImages.current[Math.floor(Math.random() * bubbleImages.current.length)];
        bubble.style.backgroundImage = `url(${randomBubble})`;
        bubble.style.left = `${Math.random() * 97}%`;
        bubble.style.animationDuration = `${speed}s`;

        const drift = 10 + Math.random() * 20;
        bubble.style.setProperty('--rise', `${rise}px`);
        bubble.style.setProperty('--drift-left', `${-drift}px`);
        bubble.style.setProperty('--drift-right', `${drift}px`);

        section.appendChild(bubble);

        bubble.addEventListener('animationend', () => {
          bubble.remove();
        });
      }
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

    const handleVisibilityChange = () => {
      document.hidden ? stopBubbleGeneration() : startBubbleGeneration();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startBubbleGeneration();

    return () => {
      stopBubbleGeneration();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [speed, bubbleCount]);

  return (
    <section ref={sectionRef} className={`gradient-section ${restrictOverflow ? 'blog-context' : ''}`}>
      <div className="bubble-container" />
      <div className="content">
        {children}
      </div>
    </section>
  );
};

export default BubbleContainer;