import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './components/Root';
import store from './store';
import { APP_CONTAINER_SELECTOR } from '../shared/config';

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

ReactDOM.render(<Root store={store} />, rootEl);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default;

    ReactDOM.render(<NextRoot store={store} />, rootEl);
  });
};
