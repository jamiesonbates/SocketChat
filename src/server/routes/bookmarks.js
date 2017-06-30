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
              SELECT m.message, m.chat_id, m.id, m.created_at,
                (SELECT u.first_name FROM users as u WHERE u.id = m.user_id),
                (SELECT u.last_name FROM users as u WHERE u.id = m.user_id),
                (SELECT u.id as user_id FROM users as u WHERE u.id = m.user_id)
              FROM messages as m
              INNER JOIN starred_messages as sm ON m.id = sm.message_id
              WHERE sm.category_id = ucat.id
            ) msg) as messages
          FROM users_categories as ucat
          WHERE ucat.user_id = ${req.params.userId}) as bookmarks;
  `)
    .then((data) => {
      res.send(camelizeKeys(data.rows));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
