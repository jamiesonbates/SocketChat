import axios from 'axios';

import {
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  sendMessageType,
  showChatType,
  showChatsListType
} from '../actionTypes';

import {
  updateMain,
  updateSide,
} from './dashControlActions';

export function setChat(id) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;
    const nextCurrentChat = findChat(allChats, id);

    dispatch({
      type: newSingleChat,
      payload: nextCurrentChat
    });
    dispatch(updateMain(showChatType));
    dispatch(updateSide(showChatsListType));
  }
}

export function fetchChats({ shouldSetChat=false, chatId=null }) {
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

        if (shouldSetChat) {
          dispatch(setChat(chatId));
        }
      })
  }
}

export function createChat(users) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    const name = state.forms.groupName || null;
    const body = {
      chat: {
        name
      },
      users
    }

    body.users.push(userId);

    axios.post('/api/chats', body)
      .then((res) => {
        const { chatId } = res.data;

        dispatch(fetchChats({ shouldSetChat: true, chatId }));
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

export function sendMessage(data) {
  const { message, userId, chatId } = data;
  return function(dispatch) {
    return dispatch({
      type: sendMessageType,
      payload: { message, userId, chatId }
    });
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
    if (!chat.messages) {
      chat.messages = [];
    }

    if (chat.id === msg.chatId) {
      chat.messages.push(msg);
    }

    return chat;
  })

  return nextChats;
}
