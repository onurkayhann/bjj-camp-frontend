import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Menu.css';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#f1c40f', border: ' 2px solid #f1c40f' };
  } else {
    return { color: '#fff' };
  }

};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-color'>
        <li className='nav-item'>
          <Link className='nav-link' style={isActive(history, '/')} to='/'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/signin')}
            to='/signin'
          >
            Signin
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            style={isActive(history, '/signup')}
            to='/signup'
          >
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
