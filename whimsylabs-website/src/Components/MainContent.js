import React, { useEffect } from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSection from './FeaturesSection';
import VideoPlayer from './VideoPlayer';
import sampleVideo from './videos/placeholder.webm'; // Path to your .webm file
import fallbackImage from './images/tiled.png'
import videoPoster from './images/logo.png'
import './MainContent.css';
import Testimonial from './Testimonial';
import Partners from './Partners';
import './MainContent.css';
import bubble1 from './images/bubble1.svg';
import bubble2 from './images/bubble2.svg';
import bubble3 from './images/bubble3.svg';
import bubble4 from './images/bubble4.svg';
import SplashSection from './SplashSection';

const MainContent = () => {
  useEffect(() => {
      const bubbles = [bubble1, bubble2, bubble3, bubble4];

      const createBubble = () => {
          const bubble = document.createElement('div');
          bubble.className = 'bubble';

          // Randomly select a bubble image
          const randomBubble = bubbles[Math.floor(Math.random() * bubbles.length)];
          bubble.style.backgroundImage = `url(${randomBubble})`;

          // Set random horizontal drift values using CSS variables
          const driftLeft = Math.random() * 20 - 10; // Random drift between -10px and 10px
          const driftRight = Math.random() * 20 - 10;
          bubble.style.setProperty('--drift-left', `${driftLeft}px`);
          bubble.style.setProperty('--drift-right', `${driftRight}px`);

          bubble.style.left = `${Math.random() * 100}%`; // Random horizontal position
          document.querySelector('.gradient-section').appendChild(bubble);

          // Remove the bubble after animation ends
          bubble.addEventListener('animationend', () => {
              bubble.remove();
          });
      };

      // Generate bubbles at intervals
      const interval = setInterval(createBubble, 250 + (Math.random() * 100));

      return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

    return (
      <div className="container-fluid text-center p-0">
        <WelcomeSection />
        <section className="gradient-section">
          <div className="bubble-container"/>
          <div className="content">
            <VideoPlayer
              videoSrc={sampleVideo}
              poster={videoPoster}
              fallbackImage={fallbackImage}
            />
          </div>
        </section>
        <SplashSection>
          <FeaturesSection />
        </SplashSection>
        <section className="gradient-section">
          <div className="bubble-container"/>
          <div className="content">
            <Testimonial />
          </div>
        </section>
        <Partners />
      </div>
    );
};

export default MainContent;
