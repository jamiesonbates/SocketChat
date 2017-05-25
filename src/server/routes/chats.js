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
      const promises = [];

      for (const chat of chats) {
        promises.push(getMessages(chat));
      }

      return Promise.all(promises);
    })
    .then((chats) => {
      const promises = [];

      for (const chat of chats) {
        promises.push(getPeople(chat));
      }

      return Promise.all(promises);
    })
    .then((chats) => {
      res.send(chats);
    })
    .catch((err) => {
      next(err);
    });
});

function getMessages(chat) {
  const promise = new Promise((resolve, reject) => {
    return db('messages')
      .where('chat_id', chat.id)
      .limit(100)
      .returning('*')
      .then((messages) => {
        chat.messages = messages;

        resolve(chat);
      })
      .catch((err) => {
        next(err);
      });
  });

  return promise;
}

function getPeople(chat) {
  const promise = new Promise((resolve, reject) => {
    return db('chats')
      .innerJoin('users_chats', 'chats.id', 'users_chats.chat_id')
      .innerJoin('users', 'users_chats.user_id', 'users.id')
      .where('chat_id', chat.id)
      .distinct('users.email')
      .select(
        'users.id as userId',
        'users.first_name',
        'users.last_name',
        'users.username',
        'users.email',
      )
      .then((users) => {
        chat.users = users;

        resolve(chat);
      });
  })

  return promise;
}

module.exports = router;
