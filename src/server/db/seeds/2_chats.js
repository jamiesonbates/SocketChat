exports.seed = function(knex, Promise) {
  return knex('chats').del()
    .then(() => {
      return knex('chats').insert([
        {
          id: 1,
          name: 'Two Person Chat',
        },
        {
          id: 2,
          name: 'Three Person Chat'
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('chats_id_seq', (SELECT MAX(id) FROM chats));");
    });
};
