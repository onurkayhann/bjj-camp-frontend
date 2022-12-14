import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Login from './user/Login';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddCamp from './admin/AddCamp';
import CampBook from './core/CampBook';
import Camp from './core/Camp';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageCamps from './admin/ManageCamps';
import UpdateCamp from './admin/UpdateCamp';
import './Routes.css';
import ManageUsers from './admin/ManageUsers';
import UpdateUser from './admin/UpdateUser';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/camp-book' exact component={CampBook} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute path='/create/category' exact component={AddCategory} />
        <AdminRoute path='/create/camp' exact component={AddCamp} />
        <Route path='/camp/:campId' exact component={Camp} />
        <Route path='/cart' exact component={Cart} />
        <AdminRoute path='/admin/orders' exact component={Orders} />
        <PrivateRoute path='/profile/:userId' exact component={Profile} />
        <AdminRoute path='/admin/camps' exact component={ManageCamps} />
        <AdminRoute
          path='/admin/camp/update/:campId'
          exact
          component={UpdateCamp}
        />
        <AdminRoute path='/admin/users' exact component={ManageUsers} />
        <AdminRoute
          path='/admin/user/update/:userId'
          exact
          component={UpdateUser}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
