import React from 'react';
import './Partners.css';
import DJB from './images/kids_judge_bett.png';

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
                    <div className="partner-logo">
                        <a href="https://uk.bettshow.com/exhibitors/whimsylabs" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.asp.events/CLIENT_Ascentia_4E961A52_5056_B739_54289B84DF34E888/sites/bett-show-uk-2024/media/logos/Bett-UK-2025-Logo-Navy.png" alt="BETT UK 2025" />
                        </a>
                    </div>
                    
                    <div className="partner-logo">
                        <a href="https://www.bettshow.com/" target="_blank" rel="noopener noreferrer">
                            <img src={DJB}
                                className="img-fluid"
                                alt="Kids Judge Bett"
                            />
                        </a>
                    </div>
                    {/* Todo:
                    <div className="partner-logo">
                        <a href="https://www.scottish-enterprise.com/" target="_blank" rel="noopener noreferrer">
                            <img src="https://www.scottish-enterprise.com/assets/branding/logo.svg" className="img-fluid" alt="Scottish Enterprise" />
                        </a>
                    </div>
                    <div className="partner-logo">
                        <a href="https://www.innovateuk.ukri.org/" target="_blank" rel="noopener noreferrer">
                            <img src="https://www.innovateuk.ukri.org/assets/images/innovate-uk-logo.svg" className="img-fluid" alt="Innovate UK" />
                        </a>
                    </div>
                    <div className="partner-logo">
                        <a href="https://www.scotlandis.com/" target="_blank" rel="noopener noreferrer">
                            <img src="https://www.scotlandis.com/wp-content/uploads/2019/04/scotlandis-logo.png" className="img-fluid" alt="ScotlandIS" />
                        </a>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default Partners;
