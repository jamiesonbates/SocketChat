import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import promise from 'redux-promise-middleware';
import socketMiddleware from './socketMiddleware';

import reducers from './state/reducers';

export default function configureStore(initialState) {
  return createStore(reducers, initialState, applyMiddleware(thunk, createLogger(), socketMiddleware));
};
