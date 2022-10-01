import React, { useState } from 'react';
import Layout from '../core/Layout';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    belt_color: '',
    password: '',
    error: '',
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
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
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input
            onChange={handleChange('email')}
            type='email'
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Belt color</label>
          <input
            onChange={handleChange('belt_color')}
            type='text'
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input
            onChange={handleChange('password')}
            type='password'
            className='form-control'
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    );
  };

  return (
    <Layout
      className='container col-md-8 offset-md-2'
      title='Sign up'
      description='Sign up to Brazilian Jiu-Jitsu camps'
    >
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
