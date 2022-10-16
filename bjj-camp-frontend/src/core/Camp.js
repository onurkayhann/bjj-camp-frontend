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
      title={camp && camp.name}
      description={
        camp && camp.description && camp.description.substring(0, 100)
      }
      className='container-fluid'
    >
      <div className='row'>
        {camp && camp.description && (
          <CampCard camp={camp} showViewCampButton={false} />
        )}
      </div>
    </Layout>
  );
};

export default Camp;
