import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCamps } from './apiCore';

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
    <Layout title='Home page' description='Brazilian Jiu-Jitsu Training Camps'>
      {JSON.stringify(campsByBook)}
      <hr />
      {JSON.stringify(campsByArrival)}
    </Layout>
  );
};

export default Home;
