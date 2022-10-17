import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCamps } from './apiCore';
import CampCard from './CampCard';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout = ({ camps }) => {
  const getTotalCost = () => {
    return camps.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className='btn btn-success'>Checkout</button>
    ) : (
      <Link to='/login'>
        <button className='btn btn-primary'>Sign in to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total: ${getTotalCost()}</h2>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
