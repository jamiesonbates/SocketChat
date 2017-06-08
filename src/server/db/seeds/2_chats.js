exports.seed = function(knex, Promise) {
  return knex('chats').del()
    .then(() => {
      return knex('chats').insert([
        {
          id: 1,
          name: null
        },
        {
          id: 2,
          name: 'Three Person Chat'
        },
        {
          id: 3,
          name: null
        },
        {
          id: 4,
          name: null
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('chats_id_seq', (SELECT MAX(id) FROM chats));");
    });
};
