import React, { useEffect } from 'react';
import './Feature.css';

const Feature = ({ imgSrc, title, description, delay = 1 }) => {
  useEffect(() => {
    const options = {
      threshold: 0.5, // Trigger when 50% of the element is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, options);

    const elements = document.querySelectorAll('.home-bubble');
    elements.forEach((el) => observer.observe(el));

    // Cleanup the observer on unmount
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="col-4 vstack">
      <div
        className="home-bubble animate"
        style={{ animationDelay: `${delay}s` }} // Apply the delay here
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
