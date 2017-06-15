'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

const { getContacts, createContact } = require('../dbActions');

router.get('/:userId', (req, res, next) => {
  getContacts(req.params.userId)
    .then((contacts) => {
      console.log(contacts);
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
