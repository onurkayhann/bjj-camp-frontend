import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCamps, getBrainTreeClientToken } from './apiCore';
import CampCard from './CampCard';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ camps }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBrainTreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotalCost = () => {
    return camps.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/login'>
        <button className='btn btn-primary'>Sign in to checkout</button>
      </Link>
    );
  };

  const showDropIn = () => {
    return (
      <div>
        {data.clientToken !== null && camps.length > 0 ? (
          <div>
            <DropIn
              options={{
                authorization: data.clientToken,
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button className='btn btn-success'>Checkout</button>
          </div>
        ) : null}
      </div>
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
