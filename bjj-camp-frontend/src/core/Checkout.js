import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {
  getCamps,
  getBrainTreeClientToken,
  processPayment,
  createOrder,
} from './apiCore';
import { emptyCart } from './cartCampHelpers';
import CampCard from './CampCard';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ camps }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
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

  const handleAdress = (e) => {
    setData({ ...data, address: e.target.value });
  };

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
    setData({ loading: true });
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
            const createOrderData = {
              camps: camps,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: data.address,
            };

            createOrder(userId, token, createOrderData);

            setData({ ...data, success: response.success });
            emptyCart(() => {
              console.log('payment success and empty cart');
              setData({ loading: false, success: true });
            });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
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
            <div className='gorm-group mb-3'>
              <label className='name-muted'>Delivery adress:</label>
              <textarea
                onChange={handleAdress}
                className='form-control'
                value={data.address}
                placeholder='Type your delivery address here...'
              />
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: 'vault',
                },
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

  const showLoading = (loading) => {
    return loading && <h2>Loading...</h2>;
  };

  return (
    <div>
      <h2>Total: ${getTotalCost()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
