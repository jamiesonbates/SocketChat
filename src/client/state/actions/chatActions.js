import axios from 'axios';

import { chatsSuccess } from '../actionTypes';

export function fetchChats() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/chats/${userId}`)
      .then((res) => {
        let chats = res.data;

        dispatch({
          type: chatsSuccess,
          payload: chats
        })
      })
  }
}
