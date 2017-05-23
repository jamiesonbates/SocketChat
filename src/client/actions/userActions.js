import axios from 'axios';

import { userAuthSuccess } from '../../shared/actionTypes';

export function userAuth() {
  return function(dispatch) {
    axios.get('/api/users')
      .then((user) => {
        console.log(user);
      })
  }
}

export function userLogin(email, password) {
  return function(dispatch) {
    axios.post('/api/token', { email, password })
      .then((user) => {
        console.log(user);
      })
  }
}

export function userSignUp(user) {
  return function(dispatch) {
    axios.post('/api/users', user)
      .then((newUser) => {
        console.log(newUser);
      })
  }
}

// export function userSignOut() {
//   return function(dispatch) {
//     axios.delete('/token')
//   }
// }
