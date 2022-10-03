import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout } from '../auth';
import './Menu.css';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#fffa65', border: ' 2px solid #fffa65' };
  } else {
    return { color: '#fff' };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className='nav nav-tabs'>
      <li className='nav-item'>
        <Link className='nav-link' style={isActive(history, '/')} to='/'>
          Home
        </Link>
      </li>

      <li className='nav-item'>
        <Link
          className='nav-link'
          style={isActive(history, '/login')}
          to='/login'
        >
          Login
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

      <li className='nav-item'>
        <span
          className='nav-link'
          style={{ cursor: 'pointer', color: '#fff' }}
          onClick={() =>
            signout(() => {
              history.push('/');
            })
          }
        >
          Logout
        </span>
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
