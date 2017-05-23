import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import authCheck from './Auth/Auth';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={authCheck(Dashboard)} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </div>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
