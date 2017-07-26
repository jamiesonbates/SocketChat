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
    FROM (SELECT ucat.id as cat_id, ucat.name as cat_name, ucat.privacy,
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
          WHERE (ucat.user_id = ${userId} OR ucat.id = 11) ${privacyClause}) as bookmarks;
  `)
    .then((data) => {
      res.send(camelizeKeys(data.rows));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/recent/:userId', (req, res, next) => {
  db('starred_messages as sm')
    .select(
      'm.message',
      'm.created_at as messaged_at',
      'sm.created_at as starred_at',
      'u.first_name',
      'u.last_name',
      'u.id as sent_by_userId'
    )
    .innerJoin('messages as m', 'sm.message_id', 'm.id')
    .innerJoin('users as u', 'u.id', 'm.user_id')
    .where('sm.user_id', req.params.userId)
    .orderBy('sm.created_at', 'DESC')
    .limit(5)
    .then((bookmarks) => {
      res.send(bookmarks);
    })
});

router.put('/', (req, res, next) => {
  const { userId, catId, privacy } = req.body;

  db('users_categories')
    .update('privacy', !privacy)
    .where({
      user_id: userId,
      id: catId
    })
    .returning('*')
    .then((data) => {
      const { privacy } = data[0];

      res.send({ privacy });
    })
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

router.get('/categories/:userId', (req, res, next) => {
  db('users_categories')
    .select('*')
    .where('user_id', req.params.userId)
    .then((cats) => {
      res.send(cats);
    })
});

module.exports = router;
