import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCamp } from './apiAdmin';
import { Link } from 'react-router-dom';

const AddCamp = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    beltcolor: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdCamp: '',
    redirectToProfile: false,
    formData: '',
  });

  // destructor the states
  const {
    name,
    description,
    price,
    categories,
    category,
    beltcolor,
    quantity,
    loading,
    error,
    createdCamp,
    redirectToProfile,
    formData,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    // code will be added here
  };

  const newPostForm = () => {
    return (
      <form className='mb-3' onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
        <div className='form-group'>
          <label className='btn btn-info'>
            <input
              onChange={handleChange('photo')}
              type='file'
              name='photo'
              accept='image/*'
            />
          </label>
        </div>

        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input
            onChange={handleChange('name')}
            type='text'
            className='form-control'
            value={name}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Description</label>
          <textarea
            onChange={handleChange('description')}
            className='form-control'
            value={description}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Price</label>
          <input
            onChange={handleChange('price')}
            type='number'
            className='form-control'
            value={price}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Category</label>
          <select onChange={handleChange('category')} className='form-control'>
            <option value='632f7ca61175796efa575a21'>All Belts</option>
            <option value='632f7cb81175796efa575a24'>Black Belt</option>
            <option value='632f7c951175796efa575a18'>Purple Belt</option>
            <option value='632f7c9b1175796efa575a1b'>Blue Belt</option>
            <option value='632f7ca01175796efa575a1e'>White Belt</option>
          </select>
        </div>

        <div className='form-group'>
          <label className='text-muted'>Quantity</label>
          <input
            onChange={handleChange('quantity')}
            type='number'
            className='form-control'
            value={quantity}
          />
        </div>

        <button className='btn btn-info'>Create Camp</button>
      </form>
    );
  };

  return (
    <Layout
      title='Add a new camp'
      description={`Welcome ${user.name}! Osss! 🤙🇧🇷🥋 Ready to add a new camp?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>{newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default AddCamp;
