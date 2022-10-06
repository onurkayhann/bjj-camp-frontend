import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCamp } from './apiAdmin';
import { Link } from 'react-router-dom';

const AddCamp = () => {
  const { user, token } = isAuthenticated();

  return (
    <Layout
      title='Add a new camp'
      description={`Welcome ${user.name}! Osss! 🤙🇧🇷🥋 Ready to add a new camp?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>To be continued...</div>
      </div>
    </Layout>
  );
};

export default AddCamp;
