import React, { useEffect, useRef, useState } from "react";
import "./ScrollingMap.css";

const ScrollingMap = ({
  imagePath = "/images/bett map.jpg",
  pathData = "M 0 0",
  viewBox = "0 0 1200 900",
  speed = 0.0005,
  numTokens = 3
}) => {
  const pathRef = useRef(null);
  const dotsRef = useRef([]);
  const animationRef = useRef(null);
  const progressRef = useRef([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLen = path.getTotalLength();

    // Initialize progress for each token, evenly spaced
    progressRef.current = Array.from({ length: numTokens }, (_, i) => i / numTokens);

    const animate = (timestamp) => {
      if (!animationRef.current) {
        animationRef.current = timestamp;
      }

      const elapsed = timestamp - animationRef.current;

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        // Update progress
        progressRef.current[index] = (progressRef.current[index] + speed) % 1;

        // Get point on path
        const point = path.getPointAtLength(progressRef.current[index] * pathLen);

        // Update dot position
        dot.setAttribute("cx", point.x);
        dot.setAttribute("cy", point.y);
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [pathData, speed, numTokens]);

  return (
    <div className="scrolling-map-container">
      <div className="scrolling-map-wrapper">
        <img src={imagePath} className="scrolling-map-image" alt="Map to WhimsyLabs booth" />
        <svg className="scrolling-map-overlay" viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
          <path ref={pathRef} id="motion-path" d={pathData} fill="none" stroke="transparent" />
          {Array.from({ length: numTokens }, (_, i) => (
            <circle
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              className="animated-dot"
              cx="0"
              cy="0"
              r="10"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ScrollingMap;
