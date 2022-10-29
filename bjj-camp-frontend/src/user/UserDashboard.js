import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getBookingHistory } from './apiUser';
import moment from 'moment';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, belt_color, role },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  const initHistory = (userId, token) => {
    getBookingHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    initHistory(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <ul className='list-group'>
          <li className='list-group-item'>
            <Link className='nav-link' to='/booking'>
              My Booking
            </Link>
          </li>
          <li className='list-group-item'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              Update profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>{name}</li>
          <li className='list-group-item'>{email}</li>
          <li className='list-group-item'>{belt_color}</li>
          <li className='list-group-item'>{role === 1 ? 'Admin' : 'User'}</li>
        </ul>
      </div>
    );
  };

  const campHistory = (history) => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Camp History</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.camps.map((c, i) => {
                    return (
                      <div key={i}>
                        <h6>Camp name: {c.name}</h6>
                        <h6>Camp price: ${c.price}</h6>
                        <h6>Booked date: {moment(c.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`Welcome ${name}! Osss! 🤙🇧🇷🥋`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {campHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
