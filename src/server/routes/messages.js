'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

router.get('/:chatId', (req, res, next) => {
  db('messages')
    .where('chat_id', req.params.chatId)
    .limit(100)
    .returning('*')
    .then((messages) => {
      res.send(camelizeKeys(messages));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
