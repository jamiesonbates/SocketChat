import io from 'socket.io-client';

import { receiveMessage } from './state/actions/chatActions';

const socketMiddleware = (function() {
  let socket = null;

  const onReceive = (store, payload) => {
    console.log('recieved message', payload);
    const msg = payload;

    store.dispatch(receiveMessage(msg));
  }

  const onManageRoom = (ws, payload) => {
    const { event, chatId } = payload;
    ws.emit(event, chatId);
  }

  const onSendMessage = (ws, payload) => {
    ws.emit('msg', payload);
  }

  return store => next => action => {
    switch(action.type) {
      case 'CONNECT':
        if (socket != null) {
          socket.close();
        }

        socket = io();
        socket.on('new msg', (payload) => onReceive(store, payload));

        break;

      case 'DISCONNECT':
        if (socket != null) {
          socket.close();
        }

        socket = null;

        break;

      case 'SEND_MESSAGE':
        onSendMessage(socket, action.payload);

       break;

      case 'MANAGE_ROOM':
        onManageRoom(socket, action.payload);

      default:
        return next(action);
    }
  }
})();

export default socketMiddleware;
