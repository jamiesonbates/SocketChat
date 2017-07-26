'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_categories', (table) => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('name').notNullable();
    table.boolean('privacy').defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_categories');
};
