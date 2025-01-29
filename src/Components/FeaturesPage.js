import React from 'react';
// import './Features.css';
// import featureImage from './images/feature-image.png'; // Example image

const Features = () => {
    const pdfPath = process.env.PUBLIC_URL + '/Two_pager_Website.pdf'; // Ensure the PDF is in public/

    return (
        <section className="features-section">
            <div className="features-container">
                {/* <img src={featureImage} alt="Feature Representation" className="feature-image" /> */}
                <div className="feature-text">
                    <h2>Explore Our Features</h2>
                    <p>
                        Whimsylabs offers advanced virtual laboratory simulations, providing an immersive and interactive way to explore STEM concepts.
                    </p>
                    <a href={pdfPath} download className="download-btn">
                        Download Features PDF
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Features;