import React from 'react';
import './Partners.css';
// Image now served from public directory

const Partners = () => {
    return (
        <section className="partners-section" aria-labelledby="partners-heading">
            <h2 id="partners-heading" className="visually-hidden">Our Partners</h2>
            <div className="container">
                <div className="partners-row">
                    <div className="partner-logo">
                        <a href="https://edinburgh-innovations.ed.ac.uk/" target="_blank" rel="noopener noreferrer" aria-label="Visit Edinburgh Innovations">
                            <img src="https://edinburgh-innovations.ed.ac.uk/assets/img/logo/UOE.png" className="img-fluid" alt="University of Edinburgh logo" />
                        </a>
                    </div>
                    <div className="partner-logo">
                        <a href="https://www.ed.ac.uk/" target="_blank" rel="noopener noreferrer" aria-label="Visit University of Edinburgh">
                            <img src="https://edinburgh-innovations.ed.ac.uk/assets/img/logo/EI.png" className="img-fluid" alt="Edinburgh Innovations logo" />
                        </a>
                    </div>
                    <div className="partner-logo">
                        <a href="https://www.convergechallenge.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Converge Challenge">
                            <img src="https://www.convergechallenge.com/wp-content/themes/converge24/images/converge.png" className="img-fluid" alt="Converge Challenge logo" />
                        </a>
                    </div>
                    <div className="partner-logo">
                        <a href="https://uk.bettshow.com/exhibitors/whimsylabs" target="_blank" rel="noopener noreferrer" aria-label="Visit BETT UK 2025">
                            <img src="https://cdn.asp.events/CLIENT_Ascentia_4E961A52_5056_B739_54289B84DF34E888/sites/bett-show-uk-2024/media/logos/Bett-UK-2025-Logo-Navy.png" alt="BETT UK 2025 logo" />
                        </a>
                    </div>
                    <div className="partner-logo">
                        <a href="https://www.bettshow.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit BETT Show">
                            <img src="/images/kids_judge_bett.png" className="img-fluid" alt="Kids Judge BETT logo" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
