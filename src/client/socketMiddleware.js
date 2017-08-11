import io from 'socket.io-client';

import { receiveMessage, fetchChats } from './state/actions/chatActions';
import {
  someoneStartedTyping,
  someoneStoppedTyping,
  updateOnlineUsers
} from './state/actions/socketActions';
import {
  connectType,
  disconnectType,
  manageRoomType,
  sendMessageType,
  startedTypingType,
  stoppedTypingType,
  someoneStartedTypingType,
  someoneStoppedTypingType,
  notifyCommonUsersType,
  newChatType
} from './state/actionTypes';

const socketMiddleware = (function() {
  let socket = null;
  const typingTimeouts = [];

  const onNewChat = (ws, store, payload) => {
    ws.emit('join room', payload);
    store.dispatch(fetchChats({}));
  }

  const onCreateNewChat = (ws, payload) => {
    ws.emit('new chat created', payload);
  }

  // good
  const onReceive = (store, payload) => {
    store.dispatch(receiveMessage(payload));
  }

  // good
  const onManageRoom = (ws, payload) => {
    const { event, chatId } = payload;
    ws.emit(event, chatId);
  }

  // good
  const onSendMessage = (ws, payload) => {
    ws.emit('msg', payload);
  }

  // good
  const onStartTyping = (ws, payload) => {
    ws.emit('started typing', payload);
  }

  // good
  const onStopTyping = (ws, payload) => {
    ws.emit('stopped typing', payload);
  }

  // good
  const onSomeoneStartedTyping = (store, payload) => {
    for (const timeout of typingTimeouts) {
      clearTimeout(timeout);
    }

    store.dispatch(someoneStartedTyping(payload));

    const timeout = setTimeout(() =>    store.dispatch(someoneStoppedTyping(payload)), 2000);

    typingTimeouts.push(timeout);
  }

  const onSomeoneStoppedTyping = (store, payload) => {
    store.dispatch(someoneStoppedTyping(payload));
  }

  const onUserOnline = (store, payload) => {
    store.dispatch(updateOnlineUsers(payload, true));
  }

  const onUserOffline = (store, payload) => {
    store.dispatch(updateOnlineUsers(payload, false));
  }

  const onUserLogin = (ws, payload) => {
    ws.emit('user online', payload);
  }

  const onLostInternet = (ws, payload) => {

  }

  return store => next => action => {
    switch(action.type) {
      case connectType:
        if (socket != null) {
          socket.close();
        }

        socket = io();
        socket.on('new msg', (payload) => onReceive(store, payload));
        socket.on('someone started typing', (payload) => onSomeoneStartedTyping(store, payload));
        socket.on('someone stopped typing', (payload) => onSomeoneStoppedTyping(store, payload));
        socket.on('common user now online', (payload) => onUserOnline(store, payload));
        socket.on('common user now offline', (payload) => onUserOffline(store, payload));
        socket.on('new chat', (payload) => onNewChat(socket, store, payload));

        const state = store.getState();
        const userId = state.userInfo.id;

        function onUserLogout() {
          socket.emit('user offline', userId);
        }

        window.addEventListener('unload', onUserLogout);
        window.addEventListener('offline', onUserLogout);

        break;
      case disconnectType:
        if (socket != null) {
          socket.close();
        }

        socket = null;

        break;
      case notifyCommonUsersType:
        onUserLogin(socket, action.payload);

        break;
      case manageRoomType:
        onManageRoom(socket, action.payload);

        break;
      case sendMessageType:
        onSendMessage(socket, action.payload);

        break;
      case startedTypingType:
        onStartTyping(socket, action.payload);

        break;
      case stoppedTypingType:
        onStopTyping(socket, action.payload);

        break;
      case newChatType:
        onCreateNewChat(socket, action.payload);
      default:
        return next(action);
    }
  }
})();

export default socketMiddleware;
