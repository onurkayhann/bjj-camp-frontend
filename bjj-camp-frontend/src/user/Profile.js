import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    belt_color: '',
    password: '',
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();
  const { name, belt_color, password, error, success } = values;

  const initProfile = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          name: data.name,
          belt_color: data.belt_color,
        });
      }
    });
  };

  useEffect(() => {
    initProfile(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, belt_color, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              belt_color: data.belt_color,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to='/cart' />;
    }
  };

  const profileUpdate = (name, belt_color, password) => {
    return (
      <form>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input
            className='form-control'
            value={name}
            type='text'
            onChange={handleChange('name')}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Belt Color</label>
          <input
            className='form-control'
            value={belt_color}
            type='text'
            onChange={handleChange('belt_color')}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input
            className='form-control'
            value={password}
            type='password'
            onChange={handleChange('password')}
          />
        </div>
        <button className='btn btn-primary' onClick={clickSubmit}>
          Submit
        </button>
      </form>
    );
  };

  return (
    <Layout
      title='Profile'
      description='Update your profile'
      className='container-fluid'
    >
      <h2 className='mb-4'>Profile update</h2>
      {profileUpdate(name, belt_color, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
