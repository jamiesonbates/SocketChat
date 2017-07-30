'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

router.get('/:userId/:curUserId', (req, res, next) => {
  const { userId, curUserId } = req.params;
  let privacyClause = '';

  if (userId !== curUserId) {
    privacyClause = 'AND ucat.privacy = true';
  }

  db.raw(`
    SELECT *
    FROM (SELECT ucat.id as cat_id, ucat.name as cat_name, ucat.privacy, ucat.created_at as cat_created_date,
            (SELECT json_agg(msg)
            FROM (
              SELECT m.message, m.chat_id, m.id as message_id, m.created_at, sm.id as starred_message_id, sm.created_at as starred_at,
                (SELECT u.first_name FROM users as u WHERE u.id = m.user_id),
                (SELECT u.last_name FROM users as u WHERE u.id = m.user_id),
                (SELECT u.id as user_id FROM users as u WHERE u.id = m.user_id)
              FROM messages as m
              INNER JOIN starred_messages as sm ON m.id = sm.message_id
              WHERE sm.category_id = ucat.id
            ) msg) as messages,
            (SELECT sm2.created_at as last_activity
            FROM starred_messages as sm2
            WHERE sm2.user_id = ${userId} AND sm2.category_id = ucat.id
            ORDER BY sm2.created_at DESC
            LIMIT 1)
          FROM users_categories as ucat
          WHERE (ucat.user_id = ${userId} OR ucat.id = 11) ${privacyClause}) as bookmarks;
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
  let resRecord;

  if (!catId) {
    newRecord = { message_id: msgId, user_id: userId };
  }
  else {
    newRecord = { message_id: msgId, user_id: userId, category_id: catId };
  }

  db('starred_messages').insert(newRecord).returning('*')
    .then((starredMessage) => {
      const { message_id } = starredMessage[0];
      resRecord = starredMessage[0];

      return db('messages').where('id', message_id).select('chat_id')
    })
    .then((data) => {
      resRecord.chat_id = data[0].chat_id;

      res.send(resRecord);
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
