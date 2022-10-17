import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, removeCamp } from './cartCampHelpers';
import CampCard from './CampCard';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

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
          />
        ))}
      </div>
    );
  };

  const noCampsMessage = () => {
    return (
      <h2>
        No camps booked yet. <br />{' '}
        <Link to='/camp-book'>Continue booking</Link>
      </h2>
    );
  };

  return (
    <Layout
      title='Booking Cart'
      description='Manage your camps here. Add, remove, checkout or continue booking camps'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showCamps(items) : noCampsMessage()}
        </div>

        <div className='col-6'>
          <h2 className='mb-4'>Your cart summary</h2>
          <hr />
          <Checkout camps={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
