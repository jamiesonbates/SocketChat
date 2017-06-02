'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

router.get('/:userId', (req, res, next) => {
  return db.raw(`
    SELECT *
    FROM (SELECT c1.id, c1.name,
           (SELECT json_agg(msg)
           FROM (
             SELECT id, message, user_id, created_at
             FROM messages
             WHERE chat_id = c1.id
             ORDER BY created_at ASC
           ) msg) as messages,
           (SELECT json_agg(usr)
           FROM (
             SELECT u.id, first_name, last_name, email, username
             FROM chats as c2
             INNER JOIN users_chats as uc1 ON c2.id = uc1.chat_id
             INNER JOIN users as u ON u.id = uc1.user_id
             WHERE c2.id = c1.id
           ) usr) as users
         FROM chats as c1
         INNER JOIN users_chats as uc2 ON c1.id = uc2.chat_id
         WHERE uc2.user_id = ${req.params.userId}) as chats;`
    )
    .then((query) => {
      res.send(camelizeKeys(query.rows));
    })
    .catch((err) => {
      next(err);
    });
  // db('chats')
  //   .innerJoin('users_chats', 'chats.id', 'users_chats.chat_id')
  //   .where('users_chats.user_id', req.params.userId)
  //   .select('chats.id', 'chats.name')
  //   .then((chats) => {
  //     const promises = [];
  //
  //     for (const chat of chats) {
  //       promises.push(getMessages(chat));
  //     }
  //
  //     return Promise.all(promises);
  //   })
  //   .then((chats) => {
  //     const promises = [];
  //
  //     for (const chat of chats) {
  //       promises.push(getPeople(chat));
  //     }
  //
  //     return Promise.all(promises);
  //   })
  //   .then((chats) => {
  //     res.send(chats);
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

// function getMessages(chat) {
//   const promise = new Promise((resolve, reject) => {
//     return db('messages')
//       .where('chat_id', chat.id)
//       .limit(100)
//       .returning('*')
//       .then((messages) => {
//         chat.messages = messages;
//
//         resolve(chat);
//       })
//   });
//
//   return promise;
// }
//
// function getPeople(chat) {
//   const promise = new Promise((resolve, reject) => {
//     return db('chats')
//       .innerJoin('users_chats', 'chats.id', 'users_chats.chat_id')
//       .innerJoin('users', 'users_chats.user_id', 'users.id')
//       .where('chat_id', chat.id)
//       .distinct('users.email')
//       .select(
//         'users.id as userId',
//         'users.first_name',
//         'users.last_name',
//         'users.username',
//         'users.email',
//       )
//       .then((users) => {
//         chat.users = users;
//
//         resolve(chat);
//       });
//   })
//
//   return promise;
// }

module.exports = router;
