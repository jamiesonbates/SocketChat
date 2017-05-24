'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const util = require('./util');

router.get('/', util.authorize, (req, res, next) => {
  console.log(req.claim);
  knex('users')
    .where('id', req.claim.userId)
    .returning('*')
    .then((user) => {
      if (!user) {
        boom.create(404, 'User not found.');
      }

      delete user.h_pw;

      res.send(camelizeKeys(user));
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const user = decamelizeKeys(req.body);

  bcrypt.hash(user.password, 12)
    .then((h_pw) => {
      return db('users').insert(user);
    }, '*')
    .then((users) => {
      const newUser = users[0];
      const claim = { userId: newUser.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '30 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 30),
        secure: router.get('env') === 'production'
      });

      delete newUser.h_pw;

      res.send(camelizeKeys(newUser));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
