import React, { useState, useEffect } from 'react';
import './Testimonial.css';

const testimonials = [
    {
        text: "Very fun and engaging, and will cater fun for all children! The virtual lab software made science exciting and accessible for students of all abilities.",
        person: "Kids Judge Bett Panel",
        title: "BETT2025",
        organization: "Epping Forest Schools Partnership Trust"
    },
    {
        text: "The feeling of the lab was amazing. Being able to train students in practicals remotely not only saves our glassware/equipment but gives students an extra space to learn lab skills effectively. These online lab simulations are revolutionizing how we teach practical science.",
        person: "Laboratory Manager",
        title: "Live Demo",
        organization: ""
    },
    {
        text: "The automated grading on a curve with a wide range of student outcomes is incredible. It saves me so much time and targets our learning objectives perfectly. WhimsyLabs' virtual laboratory software has transformed my assessment workflow.",
        person: "Secondary School Teacher",
        title: "Live Demo",
        organization: ""
    },
    {
        text: "I wish we had this at school. The virtual lab simulations make complex chemistry concepts so much easier to understand through hands-on experimentation without the safety concerns.",
        person: "Chemistry Student",
        title: "BETT2025",
        organization: ""
    },
    {
        text: "That was so fun!!! The STEM virtual labs for schools are incredibly engaging. Students are learning complex scientific concepts while genuinely enjoying the experience.",
        person: "Primary School Student",
        title: "BETT2025",
        organization: ""
    }    
];

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('fade-in-right');

    const handleNext = () => {
        setAnimationClass('fade-out-left'); // Start the fade-out-left animation
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
            setAnimationClass('fade-in-right'); // Set the fade-in-right animation for the next item
        }, 500); // Match this timeout to the animation duration
    };

    const handlePrev = () => {
        setAnimationClass('fade-out-left'); // Start the fade-out-left animation
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
            setAnimationClass('fade-in-right'); // Set the fade-in-right animation for the next item
        }, 500); // Match this timeout to the animation duration
    };

    // Auto-cycle every 10 seconds
    useEffect(() => {
        const interval = setInterval(handleNext, 10000); // Change testimonial every 10 seconds
        return () => clearInterval(interval); // Clear interval on component unmount
    }, [currentIndex]); // Reset interval whenever currentIndex changes

    return (
        <section className="testimonial-carousel" aria-labelledby="testimonial-heading">
            <h2 id="testimonial-heading" className="testimonial-header">What Educators Say About Our Virtual Lab Software</h2>
            <div className="testimonial-container">
                <button className="carousel-control prev-icon" onClick={handlePrev} aria-label="Previous testimonial"></button>
                <div className="testimonial-box" itemScope itemType="https://schema.org/Review">
                    <div className={`testimonial-content ${animationClass}`}>
                        <meta itemProp="reviewRating" content="5" />
                        <blockquote className="testimonial-text" itemProp="reviewBody">
                            "{testimonials[currentIndex].text}"
                        </blockquote>
                        <div className="testimonial-author" itemProp="author" itemScope itemType="https://schema.org/Person">
                            <p className="testimonial-person">
                                <span itemProp="name">{testimonials[currentIndex].person}</span>
                            </p>
                            <p className="testimonial-title">
                                <span itemProp="jobTitle">{testimonials[currentIndex].title}</span>
                            </p>
                            <p className="testimonial-organization" itemProp="affiliation" itemScope itemType="https://schema.org/Organization">
                                <span itemProp="name">{testimonials[currentIndex].organization}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control next-icon" onClick={handleNext} aria-label="Next testimonial"></button>
            </div>
        </section>
    );
};

export default Testimonial;