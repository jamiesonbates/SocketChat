import axios from 'axios';
import moment from 'moment';

import { getChatViews } from './chats/chatViews';
import { createContact } from './contactsActions';

import { manageRoom } from './socketActions';

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
  updateChatLastSeenType,
  setChatViewHistoryType,
  updateChatNameType,
  newChatType,
  updateCurrentChatType
} from '../actionTypes';

import {
  updateMain,
  updateSide,
} from './dashControlActions';

import Utilities from '../../utilities/Utilities';

export function changeChatName({ name, chatId }) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;
    const currentChat = state.chats.currentChat;

    axios.put('/api/chats/name', { chatId, name })
      .then((res) => {
        if (res.data !== 'Success') {
          return;
        }

        const nextAllChats = allChats.map(chat => {
          if (chat.id === chatId) {
            chat.name = name;
          }

          return chat;
        });

        const nextCurrentChat = {
          ...currentChat,
          name
        }

        dispatch({
          type: updateChatNameType,
          payload: {
            nextAllChats,
            nextCurrentChat
          }
        });
      })
  }
}

export function setChat(id) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;
    const nextCurrentChat = { ...Utilities.findChat(allChats, id) };

    dispatch({
      type: newSingleChat,
      payload: {
        nextCurrentChat,
        id,
        nextCurrentChatMessages: nextCurrentChat.messages,
        nextCurrentChatUsers: nextCurrentChat.users
      }
    });
    dispatch(updateMain(showChatType));
    dispatch(updateSide(showChatsListType));
  }
}

export function fetchChats({ shouldSetChat=false, chatId=null, onLoad=false }) {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;
    const chatLastSeen = state.chats.chatLastSeen;
    const chatNewMessages = state.chats.chatNewMessages;

    axios.get(`/api/chats/${userId}`)
      .then((res) => {
        let nextAllChats = res.data;

        if (!nextAllChats.length) {
          return;
        }

        const nextChatLastSeen = nextAllChats.map(chat => {
          return { chatId: chat.id, lastSeen: chat.lastSeen };
        });

        const nextChatNewMessages = nextAllChats.map(chat => {
          return { chatId: chat.id, count: chat.originalCount };
        });

        dispatch({ type: chatsSuccess, payload: nextAllChats });
        dispatch({
          type: setChatViewHistoryType,
          payload: {
            nextChatLastSeen,
            nextChatNewMessages
          }
        });

        if (shouldSetChat) {
          dispatch(setChat(chatId));

        }

        if (onLoad) {
          dispatch(getChatViews());

          for (const chat of nextAllChats) {
            dispatch(manageRoom({ chatId: chat.id, event: 'join room' }));
          }
        }
      })
  }
}

export function updateNewMessageCount(chatId, lastSeen, onLoad=false) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;
    const chatNewMessages = state.chats.chatNewMessages;

    const nextChatNewMessages = chatNewMessages.map((history) => {
      if (history.chatId === chatId || onLoad) {
        const wholeChat = Utilities.findChat(allChats, history.chatId);

        const count = wholeChat.messages ?
          wholeChat.messages.reduce((acc, msg) => {
            if (moment(lastSeen).valueOf() < moment(msg.createdAt).valueOf()) {
              acc += 1;
            }

              return acc;
            }, 0)
          : 0;

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
          }

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
    const currentUserId = state.userInfo.id;
    const name = state.forms.groupName || null;
    const body = {
      chat: {
        name
      },
      users
    }

    for (const userId of users) {
      dispatch(createContact(currentUserId, userId));
    }

    body.users.push(currentUserId);

    axios.post('/api/chats', body)
      .then((res) => {
        const { chatId } = res.data;

        dispatch(fetchChats({ shouldSetChat: true, chatId }));
        dispatch({ type: newChatType, payload: { currentUserId, chatId, users }});
      })
  }
}

export function receiveMessage(msg) {
  return function(dispatch, getState) {
    const state = getState();
    const allChats = state.chats.allChats;
    const singleChat = state.chats.singleChat;
    const chatLastSeen = state.chats.chatLastSeen;
    const lastSeen = Utilities.findChat(chatLastSeen, msg.chatId);
    let inChat = false;

    if (singleChat) {
      inChat = singleChat === msg.chatId;
      console.log(inChat);
    }

    const nextChats = addMessageToChat(allChats, msg, inChat);
    const nextCurrentChat = { ...Utilities.findChat(nextChats, msg.chatId) };

    if (inChat) {
      dispatch({ type: addNewMessage, payload: nextChats });
      dispatch({
        type: updateCurrentChatType,
        payload: {
          nextCurrentChat,
          nextCurrentChatMessages: nextCurrentChat.messages,
          nextCurrentChatUsers: nextCurrentChat.users
        }
      })
    }
    else {
      dispatch({ type: addNewMessage, payload: nextChats });
    }

    if (inChat && lastSeen.hadNewMessages) {
      dispatch(updateChatSeen({ chatId: msg.chatId, from: 'receiveMessage', next: true }));
    }
    else if (inChat && !lastSeen.hadNewMessages) {
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
    payload: {
      id: null,
      nextCurrentChat: null,
      nextCurrentChatMessages: [],
      nextCurrentChatUsers: []
    }
  }
}

// utility

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
