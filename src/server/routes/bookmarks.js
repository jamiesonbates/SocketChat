'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

router.get('/:userId', (req, res, next) => {
  db.raw(`
    SELECT *
    FROM (SELECT ucat.id as cat_id, ucat.name as cat_name,
            (SELECT json_agg(msg)
            FROM (
              SELECT m.message, m.chat_id, m.id as message_id, m.created_at, sm.id as starred_message_id,
                (SELECT u.first_name FROM users as u WHERE u.id = m.user_id),
                (SELECT u.last_name FROM users as u WHERE u.id = m.user_id),
                (SELECT u.id as user_id FROM users as u WHERE u.id = m.user_id)
              FROM messages as m
              INNER JOIN starred_messages as sm ON m.id = sm.message_id
              WHERE sm.category_id = ucat.id
            ) msg) as messages
          FROM users_categories as ucat
          WHERE ucat.user_id = ${req.params.userId} OR ucat.id = 11) as bookmarks;
  `)
    .then((data) => {
      res.send(camelizeKeys(data.rows));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { catId, msgId, userId } = req.body;
  let newRecord;

  if (!catId) {
    newRecord = { message_id: msgId, user_id: userId };
  }
  else {
    newRecord = { message_id: msgId, user_id: userId, category_id: catId };
  }

  db('starred_messages').insert(newRecord).returning('*')
    .then((starredMessage) => {
      res.send(starredMessage[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:starredMessageId', (req, res, next) => {
  db('starred_messages')
    .del()
    .where('id', req.params.starredMessageId)
    .returning('*')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
