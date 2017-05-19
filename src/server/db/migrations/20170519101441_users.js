'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increment();
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('email');
    table.string('h_pw');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
