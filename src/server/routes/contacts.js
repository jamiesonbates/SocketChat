'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

const { getContacts, createContact } = require('../dbActions');

router.get('/find/:searchTerm/:userId', (req, res, next) => {
  const { searchTerm, userId } = req.params;
  let clause = '';

  // TODO: need to sterilize this
  if (searchTerm !== 'null') {
    clause = `AND (u.first_name LIKE '%${searchTerm}' OR u.last_name LIKE '%${searchTerm}%' OR u.username LIKE '%${searchTerm}%' OR u.email LIKE '%${searchTerm}%')`
  }

  db.raw(`
    SELECT u.id, u.first_name, u.last_name, u.email, u.username, u.online,
      (SELECT img.cloudinary_url
      FROM images as img
      WHERE img.user_id = uc.user_id2 AND img.profile = true)
    FROM users as u
    WHERE u.id != ${userId}
    AND u.id NOT IN (
      SELECT uc.user_id2
      FROM user_contacts as uc
      WHERE uc.user_id1 = ${userId}
    )
    ${clause}
    ORDER BY u.first_name DESC;
    `)
    .then((data) => {
      res.send(camelizeKeys(data.rows));
    });
});

router.get('/known/:userId', (req, res, next) => {
  getContacts(req.params.userId)
    .then((data) => {
      const contacts = data.rows;

      console.log(contacts);

      res.send(camelizeKeys(contacts));
    })
    .catch((err) => {
      next(err);
    });
});


router.post('/', (req, res, next) => {
  const { userId1, userId2 } = req.body;

  createContact(userId1, userId2)
    .then((contacts) => {
      console.log(contacts);
    })
})

module.exports = router;
