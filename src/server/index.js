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
const http = Server(app);
const io = socketIO(http);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/token', require('./routes/token'));

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

app.use(STATIC_PATH, express.static('public'));
app.use(express.static(path.resolve(__dirname, '..', '..', 'dist')));

app.get('*', (req, res) => {
  res.send(renderApp(APP_NAME));
});


app.listen(WEB_PORT, () => {
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
