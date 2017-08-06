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

  db.raw(`
    SELECT u.id, u.first_name, u.last_name, u.email, u.username, u.h_pw,
      (SELECT img.cloudinary_url
      FROM images as img
      WHERE img.user_id = u.id AND img.profile = true)
    FROM users as u
    WHERE (u.email = '${email}')
  `)
    .then((results) => {
      if (!results.rows.length) {
        throw boom.create(400, 'Bad email or password.');
      }

      user = results.rows[0];

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
