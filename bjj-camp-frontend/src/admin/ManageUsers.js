import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getCamps, deleteCamp, getUsers } from './apiAdmin';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const loadUsers = () => {
    getUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title='Manage users'
      description='Admin page to do CRUD on users'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>
            Total: <span style={{ color: 'red' }}>{users.length}</span> users
          </h2>
          <hr />
          <ul className='list-group'>
            {users.map((u, index) => (
              <li
                key={index}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{u.name}</strong>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )};

export default ManageUsers;