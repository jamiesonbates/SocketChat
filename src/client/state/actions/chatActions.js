import axios from 'axios';

import { chatsSuccess, newSingleChat } from '../actionTypes';

export function fetchChats() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/chats/${userId}`)
      .then((res) => {
        let allChats = res.data;

        dispatch({
          type: chatsSuccess,
          payload: allChats
        })
      })
  }
}

export function setChat(id) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;

    const nextChat = findChat(allChats, id);

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
