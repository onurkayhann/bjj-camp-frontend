import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Menu.css';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#fffa65', border: ' 2px solid #fffa65' };
  } else {
    return { color: '#fff' };
  }
};

const Menu = ({ history }) => {
  return (
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
      </ul>
    </div>
  );
};

export default withRouter(Menu);
