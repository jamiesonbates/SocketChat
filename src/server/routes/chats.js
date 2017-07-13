'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

router.get('/:userId', (req, res, next) => {
  return db.raw(`
    SELECT *
    FROM (SELECT c1.id, c1.name, c1.last_activity, uc2.last_seen,
           (SELECT json_agg(msg)
           FROM (
             SELECT m.id, m.message, m.user_id, m.created_at,
              (SELECT id as starred FROM starred_messages as sm WHERE sm.message_id = m.id AND sm.user_id = ${req.params.userId})
             FROM messages as m
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
           ) usr) as users,
           (SELECT COUNT(*)
           FROM messages as m2
           WHERE m2.chat_id = c1.id
           AND m2.created_at > uc2.last_seen)
         FROM chats as c1
         INNER JOIN users_chats as uc2 ON c1.id = uc2.chat_id
         WHERE uc2.user_id = ${req.params.userId}
         ORDER BY c1.last_activity DESC) as chats;`
    )
    .then((query) => {
      res.send(camelizeKeys(query.rows));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { chat } = req.body;
  const { users } = req.body;
  let chatId;

  db('chats')
    .insert(chat)
    .returning('*')
    .then((data) => {
      chatId = data[0].id;
      const promises = [];

      for (const userId of users) {
        promises.push(addUserChat(userId, chatId))
      }

      return Promise.all(promises);
    })
    .then(() => {
      res.send({ chatId });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/viewedchat', (req, res, next) => {
  const { chat_id, user_id } = decamelizeKeys(req.body);

  db('users_chats')
    .update('last_seen', db.fn.now())
    .where({ chat_id, user_id })
    .returning('*')
    .then((record) => {
      console.log(record);
      res.send(record);
    });
});

function addUserChat(user_id, chat_id) {
  const promise = new Promise((resolve, reject) => {
    db('users_chats')
      .insert({
        user_id,
        chat_id
      })
      .returning('*')
    .then((user_chat) => {
      resolve(user_chat);
    })
  });

  return promise;
}


module.exports = router;
