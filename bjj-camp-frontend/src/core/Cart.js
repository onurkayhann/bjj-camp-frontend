import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, removeCamp } from './cartCampHelpers';
import CampCard from './CampCard';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showCamps = (items) => {
    return (
      <div>
        <h2>Your cart contains {`${items.length} camps`}</h2>
        <hr />
        {items.map((camp, index) => (
          <CampCard
            key={index}
            camp={camp}
            showBookCampButton={false}
            cartUpdate={true}
            showRemoveCampButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noCampsMessage = () => (
    <h2>
      No camps booked yet. <br /> <Link to='/camp-book'>Continue booking</Link>
    </h2>
  );

  return (
    <Layout
      title='Booking Cart'
      description='Checkout now!'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showCamps(items) : noCampsMessage()}
        </div>

        <div className='col-6'>
          <h2 className='mb-4'>Your cart summary</h2>
          <hr />
          <Checkout camps={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
