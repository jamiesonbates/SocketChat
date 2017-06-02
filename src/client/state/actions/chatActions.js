import axios from 'axios';

import {
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  userNowOnline,
  userNowOffline
} from '../actionTypes';

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
  return function(dispatch) {
    dispatch({
      type: newSingleChat,
      payload: id
    })
  }
}

export function updateChat(msg) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;

    const nextChats = addMessageToChat(allChats, msg);

    dispatch({
      type: addNewMessage,
      payload: nextChats
    })
  }
}

export function updateOnlineUsers(userId, isOnline) {
  return function(dispatch, getState) {
    const state = getState();
    let nextUsersOnline = state.chats.usersOnline;

    if (isOnline) {
      nextUsersOnline.push(userId);

      return dispatch({
        type: userNowOnline,
        payload: nextUsersOnline
      })
    }
    else {
      // TODO: what algo should I use here?
      nextUsersOnline = nextUsersOnline.filter(curUser => {
        if (curUser !== userId) {
          return curUser;
        }
      });

      return dispatch({
        type: userNowOffline,
        payload: nextUsersOnline
      })
    }
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

function addMessageToChat(chats, msg) {
  const nextChats = chats.map(chat => {
    if (chat.id === msg.chatId) {
      chat.messages.push(msg);
    }

    return chat;
  })

  return nextChats;
}
