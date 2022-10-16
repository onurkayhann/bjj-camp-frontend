import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import CampCard from './CampCard';

const Camp = (props) => {
  const [camp, setCamp] = useState({});
  const [relatedCamp, setRelatedCamp] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleCamp = (campId) => {
    read(campId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCamp(data);
        // fetch related camps
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedCamp(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const campId = props.match.params.campId;
    loadSingleCamp(campId);
  }, [props]);

  return (
    <Layout
      title={camp && camp.name}
      description={
        camp && camp.description && camp.description.substring(0, 100)
      }
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-8'>
          {camp && camp.description && (
            <CampCard camp={camp} showViewCampButton={false} />
          )}
        </div>
        <div className='col-4'>
          <h4>Related Camps</h4>
          {relatedCamp.map((camp, index) => (
            <div className='mb-3'>
              <CampCard key={index} camp={camp} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Camp;
