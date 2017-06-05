import axios from 'axios';

import {
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  userNowOnline,
  userNowOffline,
  manageRoomType,
  sendMessageType,
  startedTypingType,
  stoppedTypingType,
  someoneStartedTypingType,
  someoneStoppedTypingType
} from '../actionTypes';

export function manageRoom(chatId, event) {
  return {
    type: manageRoomType,
    payload: { chatId, event }
  }
}

export function startedTyping(chatId) {
  return {
    type: startedTypingType,
    payload: chatId
  }
}

export function stoppedTyping(chatId) {
  return {
    type: stoppedTypingType,
    payload: chatId
  }
}

export function someoneStartedTyping(chatId) {
  return function(dispatch, getState) {
    const state = getState();
    const chatsWithTyping = state.chats.chatsWithTyping;

    for (const chat of chatsWithTyping) {
      if (chat === chatId) {
        return;
      }
    }

    const nextChatsWithTyping = [
      ...chatsWithTyping,
      chatId
    ];

    return dispatch({
      type: someoneStartedTypingType,
      payload: nextChatsWithTyping
    });
  }
}

export function someoneStoppedTyping(chatId) {
  return function(dispatch, getState) {
    const state = getState();
    const chatsWithTyping = state.chats.chatsWithTyping

    const nextChatsWithTyping = chatsWithTyping.filter(id => {
      if (id !== chatId) {
        return id;
      }
    });

    return dispatch({
      type: someoneStoppedTypingType,
      payload: nextChatsWithTyping
    })
  }
}

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
  return function(dispatch) {
    return dispatch({
      type: newSingleChat,
      payload: id
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
