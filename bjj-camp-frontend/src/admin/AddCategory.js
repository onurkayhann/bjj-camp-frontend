import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin';
import { Link } from 'react-router-dom';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructor user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category below:
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autofocus
          required
        />
      </div>
      <button className='btn btn-outline-primary'>Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>{name} is successfully created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className='text-danger'>Category should be unique</h3>;
    }
  };

  const goBackToAdminDash = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard'>Back to Admin Dashboard</Link>
    </div>
  );

  return (
    <Layout
      title='Add a new category'
      description={`Welcome ${user.name}! Osss! 🤙🇧🇷🥋 Ready to add a new category?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBackToAdminDash()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
