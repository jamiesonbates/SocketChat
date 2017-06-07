import axios from 'axios';

import { setUsersOnlineType } from '../actionTypes';
import { updateOnlineUsers } from './socketActions';

export function getCommonUsers() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    const usersOnline = state.chats.usersOnline;

    axios.get(`/api/online/${userId}`)
      .then((res) => {
        const users = res.data;

        const nextUsersOnline = [
          ...usersOnline,
          ...users
        ];

        return dispatch({
          type: setUsersOnlineType,
          payload: nextUsersOnline
        });
      });
  }
}
