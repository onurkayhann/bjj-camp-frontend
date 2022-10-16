import React from 'react';
import { Link } from 'react-router-dom';
import CampImage from './CampImage';
import moment from 'moment';

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

  const showBookCampButton = () => {
    return (
      <button className='btn btn-outline-primary mt-2 mb-2'>Book Camp</button>
    );
  };

  const showQuantity = (quantity, booked) => {
    return quantity > 0 ? (
      <span className='badge badge-success badge-pill mb-1'>
        {camp.quantity - camp.booked} spots left
      </span>
    ) : (
      <span className='badge badge-danger badge-pill mb-1'>Fully booked</span>
    );
  };

  return (
    <div className='card'>
      <div className='card-header camp-name'>{camp.name}</div>
      <div className='card-body'>
        <CampImage item={camp} url='camp' />
        <p className='lead mt-2'>{camp.description.substring(0, 100)}</p>
        <p className='black-10'>${camp.price}</p>
        <p className='black-9'>Level: {camp.beltcolor}</p>
        <p className='black-8'>
          Category: {camp.category && camp.category.name}
        </p>
        <p className='black-8'>Added on {moment(camp.createdAt).fromNow()}</p>
        {showQuantity(camp.quantity)}
        <br />
        {showViewButton(showViewCampButton)}
        {showBookCampButton()}
      </div>
    </div>
  );
};

export default CampCard;
