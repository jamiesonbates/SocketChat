'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('images', (table) => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.text('cloudinary_url').notNullable();
    table.boolean('profile').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images');
};
