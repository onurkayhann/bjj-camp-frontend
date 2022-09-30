import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Login from './user/Login';
import Home from './core/Home';
import Menu from './core/Menu';
import './Routes.css';

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
