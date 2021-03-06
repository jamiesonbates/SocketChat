import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import authCheck from '../containers/AuthCheck';
import wrapAuth from '../containers/WrapAuth';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={authCheck(Dashboard)} />
      <Route path="/signup" component={wrapAuth(SignUp)} />
      <Route path="/login" component={wrapAuth(Login)} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
