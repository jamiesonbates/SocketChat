'use strict';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { camelizeKeys, decamelizeKeys } from 'humps';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { Server } from 'http';
import socketIO from 'socket.io';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';
import dbActions from './dbActions';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));

app.use('/api/users', require('./routes/users'));
app.use('/api/token', require('./routes/token'));
app.use('/api/chats', require('./routes/chats'));
app.use('/api/online', require('./routes/online'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/bookmarks', require('./routes/bookmarks'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/images', require('./routes/images'));

app.use(STATIC_PATH, express.static('public'));
app.use(STATIC_PATH, express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.get('*', (req, res) => {
  res.send(renderApp(APP_NAME));
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
    .status(err.output.statusCode)
    .set('Content-Type', 'text/plain')
    .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

const server = app.listen(WEB_PORT, () => {
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});

const io = socketIO().listen(server);

io.on('connection', (socket) => {
  socket.on('disconnect', (data) => {
    // db.getUser(socket.id)
    //   .then((user) => {
    //   });
    console.log('user disconnected: ', socket.id);
  });

  socket.on('join room', (data) => {
    socket.join(data);
  });

  socket.on('leave room', (data) => {
    socket.leave(data.room);
  });

  socket.on('user online', (userId) => {
    dbActions.updateUserStatus(userId, socket.id, true)
      .then(() => {
        return dbActions.getContacts(userId);
      })
      .then((data) => {
        const users = data.rows;

        for (const user of users) {
          if (user.online) {
            socket.to(user.online).emit('common user now online', userId);
          }
        }
      })
  });

  socket.on('user offline', (userId) => {
    dbActions.updateUserStatus(userId, null, false)
      .then(() => {
        return dbActions.getContacts(userId);
      })
      .then((data) => {
        const users = data.rows;

        for (const user of users) {
          if (user.online) {
            socket.to(user.online).emit('common user now offline', userId);
          }
        }
      })
  });

  socket.on('msg', (data) => {
    let msg;

    dbActions.createMessage(data)
      .then((newMsg) => {
        msg = camelizeKeys(newMsg[0]);

        return dbActions.updateChatActivity(msg.chatId);
      })
      .then((chat) => {
        msg.last_activity = chat[0].last_activity;

        socket.broadcast.to(msg.chatId).emit('new msg', msg);
        socket.emit('new msg', msg);
      })
  });

  socket.on('started typing', (chatId) => {
    socket.broadcast.to(chatId).emit('someone started typing', chatId);
  });

  socket.on('stopped typing', (chatId) => {
    socket.broadcast.to(chatId).emit('someone stopped typing', chatId);
  });

  socket.on('new chat created', (payload) => {
    // dbActions.getUsers(payload.users)
    //   .then((users) => {
    //     for (const user of users) {
    //       if (!user.id !== payload.currentUserId && user.online) {
    //         socket.to(user.online).emit('new chat', payload.chatId);
    //       }
    //     }
    //   })
  });
});
