import React from 'react';
import './Partners.css';

const Partners = () => {
    return (
        <section className="partners-section">
            <div className="container">
                <div className="partners-row">
                    <div className="partner-logo">
                        <a href="https://edinburgh-innovations.ed.ac.uk/" target="_blank" rel="noopener noreferrer">
                            <img src="https://edinburgh-innovations.ed.ac.uk/assets/img/logo/UOE.png" className="img-fluid" alt="University of Edinburgh" />
                        </a>
                    </div>
                    <div className="partner-logo">
                        <a href="https://www.ed.ac.uk/" target="_blank" rel="noopener noreferrer">
                            <img src="https://edinburgh-innovations.ed.ac.uk/assets/img/logo/EI.png" className="img-fluid" alt="Edinburgh Innovations" />
                        </a>
                    </div>
                    <div className="partner-logo">
                        <a href="https://www.convergechallenge.com/" target="_blank" rel="noopener noreferrer">
                            <img src="https://www.convergechallenge.com/wp-content/themes/converge24/images/converge.png" className="img-fluid" alt="Converge Challenge" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
