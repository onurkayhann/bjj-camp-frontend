import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read } from './apiCore';
import CampCard from './CampCard';

const Camp = (props) => {
  const [camp, setCamp] = useState({});
  const [error, setError] = useState(false);

  const loadSingleCamp = (campId) => {
    read(campId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCamp(data);
      }
    });
  };

  useEffect(() => {
    const campId = props.match.params.campId;
    loadSingleCamp(campId);
  }, []);

  return (
    <Layout
      title='Home page'
      description='Brazilian Jiu-Jitsu Training Camps'
      className='container-fluid'
    >
      <h2 className='mb-4'>Single Camp</h2>
      <div className='row'>{JSON.stringify(camp)}</div>
    </Layout>
  );
};

export default Camp;
