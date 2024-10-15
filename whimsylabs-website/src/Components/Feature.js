import React from 'react';
import './Feature.css';

const Feature = ({ imgSrc, title, description }) => {
  return (
    <div className="col-4 vstack">
      <div className="m-1 home-bubble animate">
        <div className="m-5">
          <img src={imgSrc} className="img-fluid m-1" alt={title} />
          <h5 className="unique-header">{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
