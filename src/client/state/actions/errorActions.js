import { loginFailure, signupFailure } from '../actionTypes';

export function loginError(msg) {
  return function(dispatch) {
    return dispatch({
      type: loginFailure,
      payload: msg
    })
  }
}

export function signupError(msg) {
  return function(dispatch) {
    return dispatch({
      type: signupFailure,
      payload: msg
    })
  }
}
