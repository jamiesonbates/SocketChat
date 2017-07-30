'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

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
    .catch((err) => {
      console.error(err);
    });
});

router.get('/:userId', (req, res, next) => {
  console.log('/categories/:userId');
  db('users_categories')
    .select('*')
    .where('user_id', req.params.userId)
    .then((cats) => {
      res.send(cats);
    })
});



router.post('/', (req, res, next) => {
  const { user_id, name } = decamelizeKeys(req.body);

  db('users_categories')
    .insert({ user_id, name })
    .returning('*')
    .then((data) => {
      res.send(data);
    })
});

router.put('/', (req, res, next) => {
  const { userId, catId, privacy } = req.body;

  if (catId === 11) {
    res.send('The general category cannot be public.');
  }

  db('users_categories')
    .update('privacy', !privacy)
    .where({
      user_id: userId,
      id: catId
    })
    .returning('*')
    .then((data) => {
      console.log(data);
      const { privacy } = data[0];

      res.send({ privacy });
    })
});

router.delete('/:catId', (req, res, next) => {
  db('users_categories')
    .del()
    .where('id', req.params.catId)
    .returning('*')
    .then((data) => {
      res.send(data.rows);
    });
});

module.exports = router;
