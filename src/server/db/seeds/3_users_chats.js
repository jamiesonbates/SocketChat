exports.seed = function(knex, Promise) {
  return knex('users_chats').del()
    .then(() => {
      return knex('users_chats').insert([
        {
          id: 1,
          user_id: 1,
          chat_id: 1,
        },
        {
          id: 2,
          user_id: 2,
          chat_id: 1
        },
        {
          id: 3,
          user_id: 1,
          chat_id: 2
        },
        {
          id: 4,
          user_id: 2,
          chat_id: 2
        },
        {
          id: 5,
          user_id: 3,
          chat_id: 2
        },
        {
          id: 6,
          user_id: 1,
          chat_id: 3,
        },
        {
          id: 7,
          user_id: 2,
          chat_id: 3
        },
        {
          id: 8,
          user_id: 3,
          chat_id: 3
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_chats_id_seq', (SELECT MAX(id) FROM users_chats));");
    });
};
