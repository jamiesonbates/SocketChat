import axios from 'axios';

import { chatsSuccess, newSingleChat } from '../actionTypes';

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

export function setChat(id) {
  return function(dispatch, getState) {
    const state = getState();
    const chats = state.chats.chats;

    const nextChat = findChat(chats, id);

    dispatch({
      type: newSingleChat,
      payload: nextChat
    })
  }
}

function findChat(chats, id) {
  for (const chat of chats) {
    if (chat.id === id) {
      return chat;
    }
  }

  return null;
}
