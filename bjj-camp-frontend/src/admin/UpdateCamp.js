import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getCamp, getCategories, updateCamp } from './apiAdmin';
import { Link, Redirect } from 'react-router-dom';

const UpdateCamp = ({ match }) => {
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
    error: false,
    createdCamp: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();
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

  const init = (campId) => {
    getCamp(campId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          quantity: data.category,
          formData: new FormData(),
        });
        initCategories();
      }
    });
  };

  // get categories and set form data
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init(match.params.campId);
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true });

    updateCamp(match.params.campId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          beltcolor: '',
          loading: false,
          error: false,
          redirectToProfile: true,
          createdCamp: data.name,
        });
      }
    });
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
            <option>Please select</option>
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
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

        <div className='form-group'>
          <label className='text-muted'>Belt Color</label>
          <input
            onChange={handleChange('beltcolor')}
            type='text'
            className='form-control'
            value={beltcolor}
          />
        </div>

        <button className='btn btn-info'>Update Camp</button>
      </form>
    );
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdCamp ? '' : 'none' }}
    >
      <h2>{`${createdCamp}`} is successfully updated</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to='/' />;
      }
    }
  };

  return (
    <Layout
      title='Add a new camp'
      description={`Welcome ${user.name}! Osss! 🤙🇧🇷🥋 Ready to add a new camp?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCamp;
