import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className='text-danger display-2'>
          Total Bookings: {orders.length}
        </h1>
      );
    } else {
      return <h1 className='text-danger'>No orders</h1>;
    }
  };

  const showInput = (key, value) => {
    return (
      <div className='input-group mb-2 mr-sm-2'>
        <div className='input-group-prepend'>
          <div className='input-group-text'>{key}</div>
        </div>
        <input type='text' value={value} className='form-control' readOnly />
      </div>
    );
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => {
    return (
      <div className='form-group'>
        <h3 className='mark mb-4'>Status: {o.status}</h3>
        <select
          className='form-control'
          onChange={(e) => handleStatusChange(e, o._id)}
        >
          <option>Update Status</option>
          {statusValues.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <Layout
      title='Orders'
      description={`Welcome ${user.name}! Osss! 🤙🇧🇷🥋 Ready to manage the orders?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showOrdersLength()}
          {orders.map((o, i) => {
            return (
              <div
                key={i}
                className='mt-5'
                style={{ borderBottom: '5px solid navy' }}
              >
                <h2 className='mb-5'>
                  <span className='bg-primary'>Order ID: {o._id}</span>
                </h2>
                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(o)}</li>
                  <li className='list-group-item'>
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className='list-group-item'>
                    Amount:{' '}
                    <span style={{ fontWeight: '800' }}>${o.amount}</span>
                  </li>
                  <li className='list-group-item'>Ordered by: {o.user.name}</li>
                  <li className='list-group-item'>
                    User's belt color: {o.user.belt_color}
                  </li>
                  <li className='list-group-item'>
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Bill delivery address: {o.address}
                  </li>
                </ul>

                <h3 className='mt-4 mb-4 font-italic'>
                  Total camps in the order: {o.camps.length}
                </h3>

                {o.camps.map((c, cIndex) => (
                  <div
                    className='mb-4'
                    key={cIndex}
                    style={{ padding: '20px', border: '1px solid navy' }}
                  >
                    {showInput('Camp name', c.name)}
                    {showInput('Camp price', c.price)}
                    {showInput('Camp total', c.count)}
                    {showInput('Camp ID', c._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
