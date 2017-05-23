import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './components/Root';
import store from './store';
import { APP_CONTAINER_SELECTOR } from '../shared/config';

const rootElement = document.querySelector(APP_CONTAINER_SELECTOR);

ReactDOM.render(<Root store={store} />, rootElement);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root');

    ReactDOM.render(<NextRoot store={store} />, NextRoot);
  });
};
