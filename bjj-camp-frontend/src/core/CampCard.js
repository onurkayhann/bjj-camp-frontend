import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CampImage from './CampImage';
import moment from 'moment';
import { addCamp, updateCamp, removeCamp } from './cartCampHelpers';

const CampCard = ({
  camp,
  showViewCampButton = true,
  showBookCampButton = true,
  cartUpdate = false,
  showRemoveCampButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(camp.count);

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

  const addToCart = () => {
    addCamp(camp, () => {
      setRedirect(true);
    });
  };

  const userRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showBookCamp = (showBookCampButton) => {
    return (
      showBookCampButton && (
        <button
          onClick={addToCart}
          className='btn btn-outline-primary mt-2 mb-2'
        >
          Book Camp
        </button>
      )
    );
  };

  const showRemoveButton = (showRemoveCampButton) => {
    return (
      showRemoveCampButton && (
        <button
          onClick={() => removeCamp(camp._id)}
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Remove Camp
        </button>
      )
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

  const handleChange = (campId) => (e) => {
    setCount(e.target.value < 1 ? 1 : e.target.value);

    if (e.target.value >= 1) {
      updateCamp(campId, e.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Amount of spots</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(camp._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className='card'>
      <div className='card-header camp-name'>{camp.name}</div>
      <div className='card-body'>
        {userRedirect(redirect)}
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
        {showBookCamp(showBookCampButton)}
        {showRemoveButton(showRemoveCampButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default CampCard;
