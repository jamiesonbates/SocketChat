import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserHistory } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserHistory>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
    </BrowserHistory>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;
