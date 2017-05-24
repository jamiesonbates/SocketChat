import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  userAuthSuccess,
  userAuthFailure,
  userLoginSuccess,
  userLoginFailure,
  userSignUpFailure
} from '../../../shared/actionTypes';

export function userAuth() {
  return function(dispatch) {
    axios.get('/api/users')
      .then((res) => {
        dispatch({
          type: userAuthSuccess,
          payload: res.data
        })
      })
      .catch((err) => {
        dispatch({
          type: userAuthFailure,
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
          type: userLoginSuccess,
          payload: res.data
        });
        browserHistory.push('/');
      })
      .catch((err) => {
        dispatch({
          type: userLoginFailure,
          payload: 'Bad email or password'
        })
      })
  }
}

export function userSignUp(user) {
  return function(dispatch) {
    axios.post('/api/users', user)
      .then((res) => {
        console.log(res.data);
      })
  }
}

// export function userSignOut() {
//   return function(dispatch) {
//     axios.delete('/token')
//   }
// }
