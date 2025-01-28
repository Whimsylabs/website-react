import React, { useEffect, useRef } from 'react';
import './BubbleContainer.css';
import bubble1 from './images/bubble1.svg';
import bubble2 from './images/bubble2.svg';
import bubble3 from './images/bubble3.svg';
import bubble4 from './images/bubble4.svg';

const BubbleContainer = ({ children, speed = 10 }) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    const bubbles = [bubble1, bubble2, bubble3, bubble4];
    const gradientSections = document.querySelectorAll('.gradient-section');

    const createBubble = () => {
      gradientSections.forEach(section => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
        bubble.style.backgroundImage = `url(${randomBubble})`;
        bubble.style.left = `${Math.random() * 97}%`;
        bubble.style.animationDuration = `${speed}s`; // Set animation speed dynamically
        section.appendChild(bubble);

        bubble.addEventListener('animationend', () => {
          bubble.remove();
        });
      });
    };

    const startBubbleGeneration = () => {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(createBubble, 300);
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
  }, [speed]); // Re-run effect if speed changes

  return (
    <section className="gradient-section">
      <div className="bubble-container" />
      <div className="content">
        {children}
      </div>
    </section>
  );
};

export default BubbleContainer;
