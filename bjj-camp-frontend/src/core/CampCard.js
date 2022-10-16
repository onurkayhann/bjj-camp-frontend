import React from 'react';
import { Link } from 'react-router-dom';
import CampImage from './CampImage';

const CampCard = ({ camp, showViewCampButton = true }) => {
  const showViewButton = (showViewCampButton) => {
    return (
      showViewCampButton && (
        <Link to={`/camp/${camp._id}`} className='mr-2'>
          <button className='btn btn-outline-warning mt-2 mb-2'>
            View Camp
          </button>
        </Link>
      )
    );
  };

  return (
    <div className='card'>
      <div className='card-header'>{camp.name}</div>
      <div className='card-body'>
        <CampImage item={camp} url='camp' />
        <p>{camp.description.substring(0, 100)}</p>
        <p>${camp.price}</p>
        <p>Level: {camp.beltcolor}</p>

        {showViewButton(showViewCampButton)}
        <button className='btn btn-outline-primary mt-2 mb-2'>Book Camp</button>
      </div>
    </div>
  );
};

export default CampCard;
