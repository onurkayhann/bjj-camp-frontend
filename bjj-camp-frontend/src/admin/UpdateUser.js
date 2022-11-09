import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { adminUpdateUser } from './apiAdmin';
import { Link, Redirect } from 'react-router-dom';

const UpdateUser = ({ match }) => {
  const [name, setName] = useState();
  const [belt_color, setBeltcolor] = useState();
  const [email, setEmail] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [redirect, setRedirect] = useState(false);

  const { user, token } = isAuthenticated();

  function handleUpdateName(e) {
    setName(e.target.value);
  }

  function handleUpdateEmail(e) {
    setEmail(e.target.value);
  }

  function handleUpdateBeltcolor(e) {
    setBeltcolor(e.target.value);
  }

  var url = window.location.pathname;
  var userId = url.substring(url.lastIndexOf('/') + 1);
  const updateAccount = async (e) => {
    e.preventDefault();
    const userInfo = {
      name: name,
      email: email,
      belt_color: belt_color,
    };
    try {
      let response = await adminUpdateUser(userId, userInfo, token);
      setUserInfo(response);
      setRedirect(true);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [userInfo]);

  const redirectAdmin = () => {
    if (redirect) {
      return <Redirect to='/admin/dashboard' />;
    }
  };

  const newPostForm = () => {
    return (
      <>
        <form onSubmit={updateAccount}>
          <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input
              onChange={handleUpdateName}
              type='text'
              className='form-control'
              value={name}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Email</label>
            <textarea
              onChange={handleUpdateEmail}
              className='form-control'
              value={email}
            />
          </div>
          <div className='form-group'>
            <label className='text-muted'>Belt color</label>
            <input
              onChange={handleUpdateBeltcolor}
              type='text'
              className='form-control'
              value={belt_color}
            />
          </div>
          <button className='btn btn-primary'>Update User</button>
        </form>
      </>
    );
  };
  return (
    <Layout title='Update your User here' description={`User: ${userId}`}>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <h3>Update User</h3>
          {newPostForm()}
          {redirectAdmin()}
        </div>
      </div>
    </Layout>
  );
};
export default UpdateUser;
