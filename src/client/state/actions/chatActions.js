import axios from 'axios';
import moment from 'moment';

import {
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  sendMessageType,
  showChatType,
  showChatsListType,
  updateChatSeenType,
  resetSingleChatType
} from '../actionTypes';

import {
  updateMain,
  updateSide,
} from './dashControlActions';

export function setChat(id) {
  return function(dispatch) {
    dispatch({ type: newSingleChat, payload: id });
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

export function updateChatSeen({ chatId, silent }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    const singleChat = state.chats.singleChat;

    axios.post(`/api/chats/viewedchat`, { userId, chatId })
      .then(({ data }) => {
        console.log(data);
        if (silent) {
          return;
        }

        if (singleChat) {
          dispatch(fetchChats({ shouldSetChat: true, chatId }));
        }
        else {
          dispatch(fetchChats({}));
        }
      });
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
    const singleChat = state.chats.singleChat;
    let inChat = false;

    if (singleChat) {
      inChat = singleChat.id === msg.chatId;
    }

    if (inChat) {
      dispatch(updateChatSeen({ chatId: msg.chatId, silent: true }));
    }

    const nextChats = addMessageToChat(allChats, msg, inChat);

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

export function resetSingleChat() {
  return {
    type: resetSingleChatType,
    payload: null
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

function addMessageToChat(chats, msg, inChat) {
  const nextChats = chats.map(chat => {
    if (!chat.messages) {
      chat.messages = [];
    }


    if (chat.id === msg.chatId) {
      chat.lastActivity = msg.last_activity;
      chat.messages.push(msg);
      let nextCount = 0;

      if (!inChat) {
        nextCount = chat.messages.reduce((acc, msg) => {
          if (moment(msg.createdAt).valueOf() > moment(chat.lastSeen).valueOf()) {
            acc += 1;
          }

          return acc;
        }, 0);
      }

      chat.count = nextCount;
    }


    return chat;
  })

  return nextChats;
}
