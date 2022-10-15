import React from 'react';
import { Link } from 'react-router-dom';
import CampImage from './CampImage';

const CampCard = ({ camp }) => {
  return (
    <div className='col-4 mb-3'>
      <div className='card'>
        <div className='card-header'>{camp.name}</div>
        <div className='card-body'>
          <CampImage item={camp} url='camp' />
          <p>{camp.description.substring(0, 100)}</p>
          <p>${camp.price}</p>
          <p>Level: {camp.beltcolor}</p>
          <Link to={`/camp/${camp._id}`}>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
              View Camp
            </button>
          </Link>
          <button className='btn btn-outline-warning mt-2 mb-2'>Book</button>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
