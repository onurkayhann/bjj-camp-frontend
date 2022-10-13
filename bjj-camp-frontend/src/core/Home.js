import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCamps } from './apiCore';
import CampCard from './CampCard';
import SearchCamp from './SearchCamp';

const Home = () => {
  const [campsByBook, setCampsByBook] = useState([]);
  const [campsByArrival, setCampsByArrival] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCampsByArrival();
    loadCampsByBook();
  }, []);

  const loadCampsByBook = () => {
    getCamps('booked').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCampsByBook(data);
      }
    });
  };

  const loadCampsByArrival = () => {
    getCamps('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCampsByArrival(data);
      }
    });
  };

  return (
    <Layout
      title='Home page'
      description='Brazilian Jiu-Jitsu Training Camps'
      className='container-fluid'
    >
      <SearchCamp />
      <h2 className='mb-4'>New Camps</h2>
      <div className='row'>
        {campsByArrival.map((camp, index) => (
          <CampCard key={index} camp={camp} />
        ))}
      </div>
      <h2 className='mb-4'>Top Bookings</h2>
      <div className='row'>
        {campsByBook.map((camp, index) => (
          <CampCard key={index} camp={camp} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
