import { useEffect, useRef } from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSection from './FeaturesSection';
import VideoPlayer from './VideoPlayer';
import sampleVideo from './videos/placeholder.webm';
import fallbackImage from './images/tiled.png';
import videoPoster from './images/logo.png';
import './MainContent.css';
import Testimonial from './Testimonial';
import Partners from './Partners';
import bubble1 from './images/bubble1.svg';
import bubble2 from './images/bubble2.svg';
import bubble3 from './images/bubble3.svg';
import bubble4 from './images/bubble4.svg';
import SplashSection from './SplashSection';
import ContactUs from './ContactUs';

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
        bubble.style.left = `${Math.random() * 97}%`;
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
  }, []);

  return (
    <main className="container-fluid text-center p-0">
      <WelcomeSection />
      <section className="gradient-section">
        <div className="bubble-container" />
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
        <div className="bubble-container" />
        <div className="content">
          <Testimonial />
          <h1 style={{ textAlign: "center" }}>Curious?</h1>
          <ContactUs />
        </div>
      </section>
      <Partners />
    </main>
    );
};

export default MainContent;