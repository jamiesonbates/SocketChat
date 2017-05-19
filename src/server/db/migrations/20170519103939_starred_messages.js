'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('starred_messages', (table) => {
    table.increments();
    table.integer('category_id').references('id').inTable('users_categories');
    table.integer('user_id').references('id').inTable('users');
    table.integer('message_id').references('id').inTable('messages');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('starred_messages');
};
