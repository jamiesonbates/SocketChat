'use strict';

const db = require('./db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');

function createMessage(message) {
  return db('messages').insert(decamelizeKeys(message));
}

function updateUserStatus(userId, socketId, isOnline) {
  if (isOnline) {
    return db('users')
      .update({ online: socketId })
      .where('id', userId);
  }
  else {
    return db('users')
      .update({ online: null })
      .where('id', userId);
  }
}

function getCommonUsers(userId) {
  return db.raw(`
    SELECT DISTINCT(u1.id), u.online
    FROM users as u1
    INNER JOIN users_chats as uc1 ON u1.id = uc1.user_id
    WHERE EXISTS (
      SELECT uc.chat_id
      FROM users as u2
      INNER JOIN users_chats as uc ON u2.id = uc.user_id
      WHERE uc.user_id = 1
    )
    AND NOT u1.id = 1
  `);
}

module.exports = {
  createMessage,
  updateUserStatus,
  getCommonUsers
}
