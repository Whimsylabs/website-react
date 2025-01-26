import { useEffect, useRef } from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSection from './FeaturesSection';
import VideoPlayer from './VideoPlayer';
import sampleVideo from './videos/placeholder.webm'; // Path to your .webm file
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

                const driftLeft = Math.random() * 20 - 10;
                const driftRight = Math.random() * 20 - 10;
                bubble.style.setProperty('--drift-left', `${driftLeft}px`);
                bubble.style.setProperty('--drift-right', `${driftRight}px`);
                bubble.style.left = `${Math.random() * 97}%`;
                section.appendChild(bubble);

                bubble.addEventListener('animationend', () => {
                    bubble.remove();
                });
            });
        };

        const startBubbleGeneration = () => {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(createBubble, 200 + (Math.random() * 100));
            }
        };

        const stopBubbleGeneration = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        // Page Visibility API to detect tabbing out/in
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopBubbleGeneration(); // Stop bubbles when tabbed out
            } else {
                startBubbleGeneration(); // Resume bubbles when tabbed back in
            }
        };

        // Start generating bubbles when the component mounts
        startBubbleGeneration();

        // Add event listener for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup on component unmount
        return () => {
            stopBubbleGeneration();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className="container-fluid text-center p-0">
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
        </div>
    );
};

export default MainContent;
