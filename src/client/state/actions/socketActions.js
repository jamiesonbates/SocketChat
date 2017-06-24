import {
  connectType,
  disconnectType,
  userNowOnline,
  userNowOffline,
  manageRoomType,
  startedTypingType,
  stoppedTypingType,
  someoneStartedTypingType,
  someoneStoppedTypingType,
  notifyCommonUsersType
} from '../actionTypes';

export function connectSocket() {
  return { type: connectType };
}

export function disconnectSocket() {
  return { type: disconnectTypes };
}

export function notifyCommonUsers() {
  return function(dispatch, getState) {
    const state = getState();
    const userId = state.userInfo.id;

    return dispatch({
      type: notifyCommonUsersType,
      payload: userId
    })
  }
}

export function manageRoom({ chatId, event }) {
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

export function updateOnlineUsers(userId, isOnline) {
  return function(dispatch, getState) {
    const state = getState();
    let usersOnline = state.chats.usersOnline;

    if (isOnline) {
      const nextUsersOnline = [
        ...usersOnline,
        userId
      ];

      return dispatch({
        type: userNowOnline,
        payload: nextUsersOnline
      })
    }
    else {
      // TODO: what algo should I use here?
      const nextUsersOnline = usersOnline.filter(curUser => {
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
