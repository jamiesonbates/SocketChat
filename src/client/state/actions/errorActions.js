import { userLoginFailure } from '../../../shared/actionTypes';

export function loginError(msg) {
  return function(dispatch) {
    dispatch({
      type: userLoginFailure,
      payload: msg
    })
  }
}
