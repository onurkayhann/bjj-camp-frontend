import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CampCard from './CampCard';

const CampBook = () => {
  return (
    <Layout
      title='Booking page'
      description='Find and book your Camp'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-4'>left sidebar</div>
        <div className='col-8'>right</div>
      </div>
    </Layout>
  );
};

export default CampBook;
