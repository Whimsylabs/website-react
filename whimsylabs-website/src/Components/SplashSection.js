import React from 'react';
import './SplashSection.css';

const SplashSection = ({ children }) => {
    return (
        <section className="splash-container">
            <div className="splash-content">
                {children}
            </div>
        </section>
    );
};

export default SplashSection;
