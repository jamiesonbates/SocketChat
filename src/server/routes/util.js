'use strict';

const boom = require('boom');
const db = require('../db/connection');
const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
  console.log(req);
  console.log(process.env.JWT_KEY);
 jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
   if (err) {
     return next(boom.create(401, 'Unauthorized'));
   }

   req.claim = payload;

   next();
 });
};

module.exports = {
  authorize
}
