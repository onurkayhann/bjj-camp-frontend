import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth/index';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    belt_color: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, belt_color, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, belt_color, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          belt_color: '',
          password: '',
          error: '',
          success: true,
        });
      }
    });
  };

  const signUpForm = () => {
    return (
      <form>
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
          <label className='text-muted'>Email</label>
          <input
            onChange={handleChange('email')}
            type='email'
            className='form-control'
            value={email}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Belt color</label>
          <input
            onChange={handleChange('belt_color')}
            type='text'
            className='form-control'
            value={belt_color}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className='alert alert-info'
        style={{ display: success ? '' : 'none' }}
      >
        New account is created. Please <Link to='/login'>Login</Link>
      </div>
    );
  };

  return (
    <Layout
      className='container col-md-8 offset-md-2'
      title='Sign up'
      description='Sign up to Brazilian Jiu-Jitsu camps'
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
