import axios from 'axios';

import { updateContactsType } from '../actionTypes';

export function getContacts() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/contacts/${userId}`)
      .then((res) => {
        dispatch({
          type: updateContactsType,
          payload: res.data
        })
      })
  }
}
