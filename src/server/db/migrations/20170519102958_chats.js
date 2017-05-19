'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('chats', (table) => {
    table.increments();
    table.string('name');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chats');
};
