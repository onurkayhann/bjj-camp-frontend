import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { login } from '../auth/index';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          redirectToReferrer: true,
        });
      }
    });
  };

  const signUpForm = () => {
    return (
      <form>
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
          <label className='text-muted'>Password</label>
          <input
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className='btn btn-primary'>
          Login
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

  const showLoading = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>Loading...</h2> {/* put a spinner here later */}
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to='/' />;
    }
  };

  return (
    <Layout
      className='container col-md-8 offset-md-2'
      title='Login'
      description='Login to Brazilian Jiu-Jitsu camps'
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Login;
