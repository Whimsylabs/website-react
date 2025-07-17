import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeSection from './WelcomeSection';
import FeaturesSection from './FeaturesSection';
import VideoPlayer from './VideoPlayer';
// Video now served from public directory
// Video poster now served from public directory
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
      <BubbleContainer>
        <VideoPlayer
          videoSrc="/videos/placeholder.webm"
          poster="/images/logo.png"
        />
      </BubbleContainer>
      <SplashSection>
        <FeaturesSection />
      </SplashSection>
      <BubbleContainer>
        <Testimonial />
        <h1>Want To Trial A Free Demo At Your School?</h1>
        <ContactUs buttonText='Apply for a free trial here!' />
        <div className="faq-teaser">
          <h2>Have Questions?</h2>
          <p>Visit our <Link to="/faq" className="faq-link">FAQ page</Link> for answers to common questions, or check our our <Link to="https://storage.googleapis.com/phoenix-application-storage-fine-grained/Hyve/Bett/Bett2025/assets/USER_INPUT/d4ad42d1-e67a-44ff-9c8f-46d4b26622ea?ts=1734104814440" className="faq-link">Features PDF</Link> for more details about our virtual lab software!</p>
        </div>
      </BubbleContainer>
      <Partners />
      <Footer />
    </main>
  );
};

export default MainContent;