'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

const { getContacts, createContact } = require('../dbActions');

router.get('/find/:searchTerm/:userId', (req, res, next) => {
  const { searchTerm, userId } = req.params;
  let clause = '';

  if (searchTerm !== 'null') {
    clause = `AND (u.first_name LIKE '%${searchTerm}' OR u.last_name LIKE '%${searchTerm}%' OR u.username LIKE '%${searchTerm}%' OR u.email LIKE '%${searchTerm}%')`
  }

  db.raw(`
    SELECT u.id, u.first_name, u.last_name, u.email, u.username, u.online
    FROM users as u
    WHERE u.id != ${userId}
    ${clause}
    ORDER BY u.first_name DESC
    LIMIT 100;
    `)
    .then((result) => {
      res.send(camelizeKeys(result.rows));
    });
});

router.get('/known/:userId', (req, res, next) => {
  getContacts(req.params.userId)
    .then((data) => {
      const contacts = data.rows;

      res.send(camelizeKeys(contacts));
    })
    .catch((err) => {
      next(err);
    })
});


router.post('/', (req, res, next) => {
  const { userId1, userId2 } = req.body;

  createContact(userId1, userId2)
    .then((contacts) => {
      console.log(contacts);
    })
})

module.exports = router;
