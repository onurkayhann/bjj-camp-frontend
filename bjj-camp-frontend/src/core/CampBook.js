import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CampCard from './CampCard';
import { getCategories } from './apiCore';

const CampBook = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title='Booking page'
      description='Find and book your Camp'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-4'>{JSON.stringify(categories)}</div>
        <div className='col-8'>right</div>
      </div>
    </Layout>
  );
};

export default CampBook;
