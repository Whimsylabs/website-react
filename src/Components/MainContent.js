import React from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSection from './FeaturesSection';
import VideoPlayer from './VideoPlayer';
import sampleVideo from './videos/placeholder.webm';
import fallbackImage from './images/tiled.png';
import videoPoster from './images/logo.png';
import './MainContent.css';
import Testimonial from './Testimonial';
import Partners from './Partners';
import BubbleContainer from './BubbleContainer';
import SplashSection from './SplashSection';
import ContactUs from './ContactUs';
import Header from './Header';
import Footer from './Footer';

const MainContent = () => {
  return (
    
    <main className="container-fluid text-center p-0">
      <Header/>
      <WelcomeSection />
      <BubbleContainer bubbleCount={0.6}>
        <VideoPlayer
          videoSrc={sampleVideo}
          poster={videoPoster}
          fallbackImage={fallbackImage}
        />
      </BubbleContainer>
      <SplashSection>
        <FeaturesSection />
      </SplashSection>
      <BubbleContainer bubbleCount={0.4}>
        <Testimonial />
        <h1>Curious?</h1>
        <ContactUs />
      </BubbleContainer>
      <Partners />
      <Footer />
    </main>
  );
};

export default MainContent;