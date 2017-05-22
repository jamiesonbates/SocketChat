import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

const Root = ({ store }) => (
  <Provider store={store}>
    <h1>Hello React!</h1>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;
