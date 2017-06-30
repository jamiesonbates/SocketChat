exports.seed = function(knex, Promise) {
  return knex('starred_messages').del()
    .then(() => {
      return knex('starred_messages').insert([
        {
          id: 1,
          category_id: 1,
          user_id: 1,
          message_id: 1
        },
        {
          id: 2,
          category_id: 1,
          user_id: 1,
          message_id: 2
        },
        {
          id: 3,
          category_id: 1,
          user_id: 1,
          message_id: 3
        },
        {
          id: 4,
          category_id: 7,
          user_id: 2,
          message_id: 1
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('starred_messages_id_seq', (SELECT MAX(id) FROM starred_messages));");
    });
};
