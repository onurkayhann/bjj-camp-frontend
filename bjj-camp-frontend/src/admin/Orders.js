import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCamp, getCategories } from './apiAdmin';
import { Link } from 'react-router-dom';
import { listOrders } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    loadOrders();
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
                  <li className='list-group-item'>{o.status}</li>
                  <li className='list-group-item'>
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: ${o.amount}</li>
                  <li className='list-group-item'>Ordered by: {o.user.name}</li>
                  <li className='list-group-item'>
                    User's belt color: {o.user.belt_color}
                  </li>
                  <li className='list-group-item'>
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>Bill delivery address: {o.address}</li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total camps in the order: {o.camps.length}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
