'use strict';

const db = require('./db/connection');
const { camelizeKeys, decamelizeKeys } = require('humps');

function createMessage(message) {
  return db('messages').insert(decamelizeKeys(message)).returning('*');
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

function getContacts(userId) {
  return db.raw(`
    SELECT u.id, u.first_name, u.last_name, u.email, u.username, u.online,
      (SELECT img.cloudinary_url
      FROM images as img
      WHERE img.user_id = u.id)
    FROM users as u
    WHERE u.id IN (
      SELECT uc.user_id2
      FROM user_contacts as uc
      WHERE uc.user_id1 = ${userId}
    )
    AND NOT u.id = ${userId}
  `)
}

function createContact(userId1, userId2) {
  return db('user_contacts').insert([
    {
      user_id1: userId1,
      user_id2: userId2
    },
    {
      user_id1: userId2,
      user_id2: userId1
    }
  ])
  .returning('*');
}

function updateChatActivity(chatId) {
  return db('chats')
    .update('last_activity', db.fn.now())
    .where('id', chatId)
    .returning('*')
}

module.exports = {
  createMessage,
  updateUserStatus,
  getContacts,
  createContact,
  updateChatActivity
}
