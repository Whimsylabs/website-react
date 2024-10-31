import React, { useEffect, useState } from 'react';
import './Feature.css';

const Feature = ({ imgSrc, title, description, delay = 0 }) => {
  const [riseUpCompleted, setRiseUpCompleted] = useState(false);

  // Handler for when animations end
  const handleAnimationEnd = (e) => {
    if (e.animationName === 'riseUp') {
      setRiseUpCompleted(true);
    } else if (e.animationName === 'wiggle') {
      // Optional: Handle wiggle animation end if needed
    }
  };

  // Handle mouse enter
  const handleMouseEnter = (e) => {
    if (riseUpCompleted) {
      // Trigger wiggle animation
      e.currentTarget.classList.add('wiggle');
    }
  };

  // Handle mouse leave
  const handleMouseLeave = (e) => {
    e.currentTarget.classList.remove('wiggle');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const bubbles = document.querySelectorAll('.home-bubble');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('rise-up-complete')) {
          entry.target.classList.add('in-view');
          
          // Listen for when the riseUp animation ends
          entry.target.addEventListener('animationend', (event) => {
            if (event.animationName === 'riseUp') {
              entry.target.classList.add('rise-up-complete');
              entry.target.classList.remove('in-view'); // Optional: clean up if 'in-view' is no longer needed
            }
          }, { once: true });
        }
      });
    });
  
    bubbles.forEach(bubble => observer.observe(bubble));
  });

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll('.home-bubble');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="col-4 vstack">
      <div
        className="home-bubble animate"
        style={{ animationDelay: `${delay}s` }}
        onAnimationEnd={handleAnimationEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-3">
          <img src={imgSrc} className="img-fluid mb-2" alt={title} />
          <h4 className="unique-header">{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
