'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('user_contacts', (table) => {
    table.increments();
    table
      .integer('user_id1')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('user_id2')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_contacts');
};
