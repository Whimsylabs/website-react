import React, { useState, useEffect } from 'react';
import './Testimonial.css';

const testimonials = [
    {
        text: "Very fun and engaging, and will cater fun for all children!",
        person: "Kids Judge Bett",
    },
    {
        text: "The feeling of the lab was amazing. Being able to train students in pracicals remotely not only saves our glassware/equipment but gives students an extra space to learn lab skills effectively.",
        person: "Bett2025 Lab Manager",
    },
    {
        text: "The automated grading on a curve with a wide range of student outcomes is incredible. It saves me so much time and targets our learning objectives perfectly.",
        person: "Bett2025 Teacher",
    },
    {
        text: "I wish we had this at school.",
        person: "Bett2025 Chemistry Student",
    },
    {
        text: "That was so fun!!! (after taking the headset off and running over to their friends)",
        person: "Bett2025 primary school student",
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
        <div className="testimonial-carousel">
            <h2 className="testimonial-header">Testimonials</h2>
            <div className="testimonial-container">
                <button className="carousel-control prev-icon" onClick={handlePrev} aria-label="Previous testimonial"></button>
                <div class="testimonial-box">
                    <div className={`testimonial-content ${animationClass}`}>
                        <p className="testimonial-text">
                            "{testimonials[currentIndex].text}"
                        </p>
                        <p className="testimonial-person">
                            {testimonials[currentIndex].person}
                        </p>
                    </div>
                </div>
                <button className="carousel-control next-icon" onClick={handleNext} aria-label="Next testimonial"></button>
            </div>
        </div>
    );
};

export default Testimonial;
