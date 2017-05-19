'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('starred_messages', (table) => {
    table.increments();
    table
      .integer('category_id')
      .references('id')
      .inTable('users_categories')
      .onDelete('CASCADE');
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('message_id')
      .references('id')
      .inTable('messages')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('starred_messages');
};
