import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const ManageCamps = () => {
  return (
    <Layout
      title='Manage camps'
      description='Admin page to do CRUD on camps'
      className='container-fluid'
    >
      <div className='row'>
        <div>Soon...</div>
      </div>
    </Layout>
  );
};

export default ManageCamps;
