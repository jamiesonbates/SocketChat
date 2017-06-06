import io from 'socket.io-client';

import {
  receiveMessage,
  someoneStartedTyping,
  someoneStoppedTyping,
  updateOnlineUsers }
  from './state/actions/chatActions';
import {
  connectType,
  disconnectType,
  manageRoomType,
  sendMessageType,
  startedTypingType,
  stoppedTypingType,
  someoneStartedTypingType,
  someoneStoppedTypingType,
  notifyCommonUsersType
} from './state/actionTypes';

const socketMiddleware = (function() {
  let socket = null;
  const typingTimeouts = [];

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
    console.log(payload);
    store.dispatch(updateOnlineUsers(payload, true));
  }

  const onUserOffline = (store, payload) => {
    store.dispatch(updateOnlineUsers(payload, false));
  }

  const onUserLogin = (ws, payload) => {
    ws.emit('user online', payload);
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
      default:
        return next(action);
    }
  }
})();

export default socketMiddleware;
