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
          <p>{camp.description}</p>
          <p>${camp.price}</p>
          <Link to='/'></Link>
          <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
            View Camp
          </button>
          <button className='btn btn-outline-warning mt-2 mb-2'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampCard;
