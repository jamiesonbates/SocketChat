import axios from 'axios';

import {
  userAuthSuccess,
  userLoginSuccess,
  userLoginFailure,
  userSignUpSuccess
} from '../../shared/actionTypes';

export function userAuth() {
  return function(dispatch) {
    axios.get('/api/users')
      .then((res) => {
        console.log(res.data);
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
