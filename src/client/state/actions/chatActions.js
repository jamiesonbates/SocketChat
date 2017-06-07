import axios from 'axios';

import {
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  sendMessageType
} from '../actionTypes';

export function fetchChats() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/chats/${userId}`)
      .then((res) => {
        let allChats = res.data;

        return dispatch({
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
    const nextCurrentChat = findChat(allChats, id);

    return dispatch({
      type: newSingleChat,
      payload: nextCurrentChat
    })
  }
}

export function receiveMessage(msg) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;

    const nextChats = addMessageToChat(allChats, msg);

    return dispatch({
      type: addNewMessage,
      payload: nextChats
    })
  }
}

export function sendMessage(message, userId, chatId) {
  return {
    type: sendMessageType,
    payload: { message, userId, chatId }
  }
}

// utility
function findChat(chats, id) {
  for (const chat of chats) {
    if (chat.id === id) {
      return chat;
    }
  }

  return null;
}

function addMessageToChat(chats, msg) {
  const nextChats = chats.map(chat => {
    if (chat.id === msg.chatId) {
      chat.messages.push(msg);
    }

    return chat;
  })

  return nextChats;
}
