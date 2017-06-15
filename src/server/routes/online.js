'use strict';

const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = require('express').Router();

const dbActions = require('../dbActions');

router.get('/:userId', (req, res, next) => {
  dbActions.getContacts(req.params.userId)
    .then((data) => {
      const usersOnline = [];

      for (const user of data.rows) {
        if (user.online) {
          usersOnline.push(user.id);
        }
      }

      res.send(camelizeKeys(usersOnline));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
