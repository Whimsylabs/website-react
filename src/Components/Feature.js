import React, { useEffect, useRef } from 'react';
import './Feature.css';

const Feature = ({ imgSrc, title, description, delay = 0 }) => {
  const bubbleRef = useRef(null);

  useEffect(() => {
    // Observe only this feature's bubble; querying all .home-bubble elements
    // gave every Feature instance an observer over every bubble on the page
    const element = bubbleRef.current;
    if (!element) return;

    const options = {
      threshold: 0.5, // Trigger when 50% of the element is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);  // Stops observing after adding class
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, options);

    observer.observe(element);

    // Cleanup the observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="col-4 vstack">
      <div
        ref={bubbleRef}
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
