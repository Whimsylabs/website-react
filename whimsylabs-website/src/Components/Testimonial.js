import React, { useState, useEffect } from 'react';
import './Testimonial.css';

const testimonials = [
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum imperdiet sapien, non mattis nisl laoreet non.",
        person: "Person X",
    },
    {
        text: "Item 2 text goes here for the second testimonial.",
        person: "Person Y",
    },
    {
        text: "This is a third testimonial. They really loved the service!",
        person: "Person Z",
    },
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
                <div className={`testimonial-content ${animationClass}`}>
                    <p className="testimonial-text">
                        "{testimonials[currentIndex].text}"
                    </p>
                    <p className="testimonial-person">
                        {testimonials[currentIndex].person}
                    </p>
                </div>
                <button className="carousel-control next-icon" onClick={handleNext} aria-label="Next testimonial"></button>
            </div>
        </div>
    );
};

export default Testimonial;
