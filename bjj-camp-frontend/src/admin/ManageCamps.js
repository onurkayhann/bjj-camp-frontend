import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getCamps, deleteCamp } from './apiAdmin';

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCamps = () => {
    getCamps().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCamps(data);
      }
    });
  };

  const destroy = (campId) => {
    deleteCamp(campId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCamps();
      }
    });
  };

  useEffect(() => {
    loadCamps();
  }, []);

  return (
    <Layout
      title='Manage camps'
      description='Admin page to do CRUD on camps'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>
            Total: <span style={{ color: 'red' }}>{camps.length}</span> camps
          </h2>
          <hr />
          <ul className='list-group'>
            {camps.map((c, index) => (
              <li
                key={index}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{c.name}</strong>
                <Link to={`/admin/camp/update/${c._id}`}>
                  <span className='badge badge-warning badge-pill'>Update</span>
                </Link>
                <span
                  onClick={() => destroy(c._id)}
                  className='badge badge-danger'
                  style={{ cursor: 'pointer' }}
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCamps;
