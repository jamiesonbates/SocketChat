import axios from 'axios';
import moment from 'moment';

import { getChatViews } from './chats/chatViews';

import {
  chatsSuccess,
  newSingleChat,
  addNewMessage,
  sendMessageType,
  showChatType,
  showChatsListType,
  updateChatSeenType,
  resetSingleChatType,
  updateChatViewHistoryType,
  updateNewMessageCountType,
  updateChatLastSeenType
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

export function fetchChats({ shouldSetChat=false, chatId=null, onLoad=false }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    axios.get(`/api/chats/${userId}`)
      .then((res) => {
        let allChats = res.data;

        dispatch({ type: chatsSuccess, payload: allChats });

        if (shouldSetChat) {
          dispatch(setChat(chatId));
        }

        if (onLoad) {
          dispatch(getChatViews());
        }
      })
  }
}

export function updateNewMessageCount(chatId, lastSeen, onLoad=false) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;
    const chatNewMessages = state.chats.chatNewMessages;
    // const chatLastSeen = state.chats.chatLastSeen;
    // console.log('new messages!');

    const nextChatNewMessages = chatNewMessages.map((history) => {
      if (history.chatId === chatId || onLoad) {
        const wholeChat = findChat(allChats, history.chatId);

        const count = wholeChat.messages.reduce((acc, msg) => {
          if (moment(lastSeen).valueOf() < moment(msg.createdAt).valueOf()) {
            acc += 1;
          }

          return acc;
        }, 0)

        history.count = count;
      }

      return history;
    });

    dispatch({ type: updateNewMessageCountType, payload: nextChatNewMessages });
  }
}

export function updateChatSeen({ chatId, silent=null, from=null, next=false,  leaving=false }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    const chatLastSeen = state.chats.chatLastSeen;
    const allChats = state.chats.allChats;

    axios.post(`/api/chats/view_history`, { userId, chatId })
      .then(({ data }) => {
        const nextChatLastSeen = chatLastSeen.map((history) => {
          if (next && history.chatId === data[0].chat_id) {
            history.nextSeen = data[0].last_seen;
            history.hadNewMessages = true;
          }
          else if (history.chatId === data[0].chat_id) {
            history.lastSeen = data[0].last_seen;
            history.hadNewMessages = false;

            delete history.nextSeen;
            console.log(history);
          }

          console.log('leaving', leaving);
          if (leaving && history.chatId === data[0].chat_id) {
            delete history.hadNewMessages;
          }

          return history;
        });


        dispatch({ type: updateChatLastSeenType, payload: nextChatLastSeen });
        dispatch(updateNewMessageCount(data[0].chat_id, data[0].last_seen));
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
    const chatLastSeen = state.chats.chatLastSeen;
    const lastSeen = findChat(chatLastSeen, msg.chatId);
    let inChat = false;

    if (singleChat) {
      inChat = singleChat === msg.chatId;
    }

    console.log(lastSeen);

    const nextChats = addMessageToChat(allChats, msg, inChat);

    dispatch({
      type: addNewMessage,
      payload: nextChats
    })

    if (inChat && lastSeen.hadNewMessages) {
      dispatch(updateChatSeen({ chatId: msg.chatId, from: 'receiveMessage', next: true }));
    }
    else if (inChat && !lastSeen.hadNewMessages) {
      console.log('here');
      dispatch(updateChatSeen({ chatId: msg.chatId, next: false }));
    }
    else {
      if (lastSeen.nextSeen) {
        dispatch(updateNewMessageCount(msg.chatId, lastSeen.nextSeen));
      }
      else {
        dispatch(updateNewMessageCount(msg.chatId, lastSeen.lastSeen));
      }
    }

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

// TODO: abstraced into utilities
function findChat(chats, id) {
  for (const chat of chats) {
    if (chat.id === id || chat.chatId === id) {
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
