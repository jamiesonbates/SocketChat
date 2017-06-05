import io from 'socket.io-client';

import { receiveMessage, someoneStartedTyping, someoneStoppedTyping } from './state/actions/chatActions';
import {
  connectType,
  disconnectType,
  manageRoomType,
  sendMessageType,
  startedTypingType,
  stoppedTypingType,
  someoneStartedTypingType,
  someoneStoppedTypingType
} from './state/actionTypes';

const socketMiddleware = (function() {
  let socket = null;
  const timeouts = [];

  const onReceive = (store, payload) => {
    store.dispatch(receiveMessage(payload));
  }

  const onManageRoom = (ws, payload) => {
    const { event, chatId } = payload;
    ws.emit(event, chatId);
  }

  const onSendMessage = (ws, payload) => {
    ws.emit('msg', payload);
  }

  const onStartTyping = (ws, payload) => {
    ws.emit('started typing', payload);
  }

  const onStopTyping = (ws, payload) => {
    ws.emit('stopped typing', payload);
  }

  const onSomeoneStartedTyping = (store, payload) => {
    for (const timeout of timeouts) {
      clearTimeout(timeout);
    }

    store.dispatch(someoneStartedTyping(payload));

    const timeout = setTimeout(() => store.dispatch(someoneStoppedTyping(payload)), 2000);

    timeouts.push(timeout);
  }

  const onSomeoneStoppedTyping = (store, payload) => {
    store.dispatch(someoneStoppedTyping(payload));
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

        break;
      case disconnectType:
        if (socket != null) {
          socket.close();
        }

        socket = null;

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
