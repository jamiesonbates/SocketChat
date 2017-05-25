'use strict';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { Server } from 'http';
import socketIO from 'socket.io';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/token', require('./routes/token'));
app.use('/api/chats', require('./routes/chats'));

app.use(STATIC_PATH, express.static('public'));
app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));

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
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('room', (data) => {
    console.log(`user entered room: ${data.room}`);
    socket.join(data.room);
  })

  socket.on('leave room', (data) => {
    socket.leave(data.room);
  })
});
