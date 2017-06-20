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
      console.log(camelizeKeys(query.rows));
      res.send(camelizeKeys(query.rows));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { chat } = req.body;
  const { users } = req.body;

  db('chats')
    .insert(chat)
    .returning('*')
    .then((data) => {
      const newChatId = data[0].id;
      const promises = [];

      for (const userId of users) {
        promises.push(addUserChat(userId, newChatId))
      }

      return Promise.all(promises);
    })
    .then(() => { 
      res.send(true);
    });
});

function addUserChat(user_id, chat_id) {
  return db('users_chats')
    .insert({
      user_id,
      chat_id
    })
}


module.exports = router;
