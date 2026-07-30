import React, { useEffect, useRef } from "react";
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
  const containerRef = useRef(null);
  const frameIdRef = useRef(null);
  const progressRef = useRef([]);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    // Sample the path once into a lookup table; getPointAtLength per dot per
    // frame is expensive SVG geometry work
    const pathLen = path.getTotalLength();
    const SAMPLES = 600;
    const points = Array.from({ length: SAMPLES + 1 }, (_, i) =>
      path.getPointAtLength((i / SAMPLES) * pathLen)
    );

    // Initialize progress for each token, evenly spaced
    progressRef.current = Array.from({ length: numTokens }, (_, i) => i / numTokens);

    const animate = () => {
      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        progressRef.current[index] = (progressRef.current[index] + speed) % 1;
        const point = points[Math.round(progressRef.current[index] * SAMPLES)];

        dot.setAttribute("cx", point.x);
        dot.setAttribute("cy", point.y);
      });

      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Only animate while the map is actually on screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (frameIdRef.current === null) {
          frameIdRef.current = requestAnimationFrame(animate);
        }
      } else if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };
  }, [pathData, speed, numTokens]);

  return (
    <div className="scrolling-map-container" ref={containerRef}>
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
