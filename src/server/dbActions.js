'use strict';

const db = require('./db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');

function createMessage(message) {
  return db('messages').insert(decamelizeKeys(message)).returning('*');
}

module.exports = {
  createMessage
}
