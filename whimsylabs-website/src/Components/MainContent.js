import { useEffect, useRef } from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSection from './FeaturesSection';
import VideoPlayer from './VideoPlayer';
import sampleVideo from './videos/placeholder.webm'; // Path to your .webm file
import fallbackImage from './images/tiled.png'
import videoPoster from './images/logo.png'
import './MainContent.css';
import Testimonial from './Testimonial';
import Partners from './Partners';
import bubble1 from './images/bubble1.svg';
import bubble2 from './images/bubble2.svg';
import bubble3 from './images/bubble3.svg';
import bubble4 from './images/bubble4.svg';
import SplashSection from './SplashSection';

const MainContent = () => {
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
  
              const driftLeft = Math.random() * 20 - 10;
              const driftRight = Math.random() * 20 - 10;
              bubble.style.setProperty('--drift-left', `${driftLeft}px`);
              bubble.style.setProperty('--drift-right', `${driftRight}px`);
              bubble.style.left = `${Math.random() * 100}%`;
              section.appendChild(bubble);
  
              bubble.addEventListener('animationend', () => {
                  bubble.remove();
              });
          });
      };
  
      intervalRef.current = setInterval(createBubble, 150 + (Math.random() * 100));
  
      return () => clearInterval(intervalRef.current); // Cleanup on component unmount
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
