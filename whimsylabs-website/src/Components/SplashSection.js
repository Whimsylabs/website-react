import React from 'react';
import './SplashSection.css';

const SplashSection = ({ children }) => {
    return (
        <div className="splash-container">
            {/* Inverted top wave */}
            <div className="splash-top-mask">
                <svg viewBox="0 0 2000 320" preserveAspectRatio="none" className="wave-animation">
                    <path fill="#95CEF6" d="M0,320L80,290C160,260,320,200,480,230C640,260,800,320,960,290C1120,260,1280,160,1440,120C1600,80,1760,90,1920,130L2000,160L2000,0L0,0Z"></path>
                </svg>
            </div>
            
            <div className="splash-content">
                {children}
            </div>
            
            {/* Bottom wave remains as is */}
            <div className="splash-bottom-mask">
                <svg viewBox="0 0 2000 320" preserveAspectRatio="none" className="wave-animation flipped-wave">
                    <path fill="#dabeff" d="M0,160C266,230,533,290,800,160C1067,30,1333,80,1600,200C1867,320,2133,320,2400,200L2400,320L0,320Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default SplashSection;
