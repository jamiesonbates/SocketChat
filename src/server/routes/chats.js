'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

router.get('/:userId', (req, res, next) => {
  db('chats')
    .innerJoin('users_chats', 'chats.id', 'users_chats.chat_id')
    .where('users_chats.user_id', req.params.userId)
    .select('chats.id', 'chats.name')
    .then((chats) => {
      res.send(chats);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
