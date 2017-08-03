'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const db = require('../db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  let user;

  db('users')
    .where('email', email)
    .returning('*')
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad email or password.');
      }

      user = row[0];

      return bcrypt.compare(password, user.h_pw)
    })
    .then(() => {
      const claim = { userId: user.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '30 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 30),
        secure: router.get('env') === 'production'
      });

      delete user.h_pw;
      delete user.created_at;
      delete user.updated_at;

      res.send(camelizeKeys(user));
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad email or password');
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/', (req, res, next) => {
  res.clearCookie('token');
  res.end();
});

module.exports = router;
