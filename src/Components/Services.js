import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BubbleContainer from './BubbleContainer';
import ContactUs from './ContactUs';
import SplashSection from './SplashSection';
import WelcomeSection from './WelcomeSection';

const Services = () => {
    return (
            <main className="container-fluid text-center p-0">
            <Header />
           
                <WelcomeSection titleText="Custom Simulation Development" bodyText="At Whimsylabs, we specialize in creating tailor-made simulations that bring concepts to life. Whether it's for educational institutions, corporate training, or interactive experiences, our AI-powered virtual laboratories provide immersive learning environments."/>
                <BubbleContainer>
                
                    <h2>Why Choose Our Simulations?</h2>
                    <ul style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto' }}>
                        <li><strong>Education & Training:</strong> Develop STEM-focused, interactive simulations for schools, universities, and corporate training.</li>
                        <li><strong>Custom Environments:</strong> Adapt to specific requirements, from realistic lab setups to imaginative sci-fi experiments.</li>
                        <li><strong>AI-Driven Interactivity:</strong> Enable smart feedback, scenario branching, and adaptive learning.</li>
                        <li><strong>VR & AR Ready:</strong> Seamlessly integrate with virtual and augmented reality for a fully immersive experience.</li>
                        <li><strong>Scalable & Accessible:</strong> Deploy across various platforms, ensuring accessibility for all users.</li>
                    </ul>
                    <h2>Let's Build Your Simulation</h2>
                        <p style={{ textAlign: 'left', maxWidth: '800px', margin: 'auto' }}>
                        Whether you're an educator looking to enhance science education or a business seeking interactive training modules, 
                        we’re here to help. Contact us today to discuss your custom simulation project!
                    </p>
                
            
                <ContactUs />
            </BubbleContainer>
            <Footer />
            </main>
    );
};

export default Services;