import axios from 'axios';

import { updateChatViewHistoryType } from '../../actionTypes';

export function getChatViews() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/chats/lastseen/${userId}`)
      .then(({ data }) => {
        dispatch({ type: updateChatViewHistoryType, payload: data })
      })
  }
}
