import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  authSuccess,
  authFailure,
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure
} from '../actionTypes';

export function userAuth() {
  return function(dispatch) {
    axios.get('/api/users')
      .then((res) => {
        return dispatch({
          type: authSuccess,
          payload: res.data
        })
      })
      .catch((err) => {
        dispatch({
          type: authFailure,
          payload: false
        })

        browserHistory.push('/login');
      })
  }
}

export function userLogin(email, password) {
  return function(dispatch) {
    axios.post('/api/token', { email, password })
      .then((res) => {
        dispatch({
          type: loginSuccess,
          payload: res.data
        });

        browserHistory.push('/');
      })
      .catch((err) => {
        return dispatch({
          type: loginFailure,
          payload: 'Bad email or password'
        })
      })
  }
}

export function userSignUp(user) {
  return function(dispatch) {
    axios.post('/api/users', user)
      .then((res) => {
        dispatch({
          type: signupSuccess,
          payload: res.data
        });

        browserHistory.push('/');
      })
  }
}

export function userSignOut() {
  return function(dispatch, getState) {
    axios.delete('/api/token')
      .then(() => {
        location.reload();
      });
  }
}
