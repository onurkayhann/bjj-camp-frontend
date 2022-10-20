import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCamps, getBrainTreeClientToken, processPayment } from './apiCore';
import { emptyCart } from './cartCampHelpers';
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
        setData({ clientToken: data.clientToken });
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

  const payCamp = () => {
    // send nonce to server
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotalCost(camps),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            setData({ ...data, success: response.success });
            emptyCart(() => {
              console.log('payment success and empty cart');
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: '' })}>
        {data.clientToken !== null && camps.length > 0 ? (
          <div>
            <DropIn
              options={{
                authorization: data.clientToken,
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={payCamp} className='btn btn-success btn-block'>
              Pay
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const showError = (error) => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = (success) => {
    return (
      <div
        className='alert alert-info'
        style={{ display: success ? '' : 'none' }}
      >
        Thanks! Now you're ready for the camp! Good luck🥋
      </div>
    );
  };

  return (
    <div>
      <h2>Total: ${getTotalCost()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
