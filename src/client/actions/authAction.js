import axios from 'axios';

import { userAuthSuccess } from '../../shared/actionTypes';

export function userAuth() {
  return function(dispatch) {
    axios.get('/users')
      .then((res) => {
        dispatch({
          type: userAuthSuccess,
          payload: res.data
        })
      })
  }
}
