'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

const { getContacts } = require('../dbActions');

router.get('/:userId', (req, res, next) => {
  getContacts(req.params.userId)
    .then((contacts) => {
      console.log(contacts);
    })
});

module.exports = router;
