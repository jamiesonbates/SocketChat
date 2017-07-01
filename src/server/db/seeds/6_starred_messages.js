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
        },
        {
          id: 5,
          category_id: 7,
          user_id: 2,
          message_id: 2
        },
        {
          id: 6,
          category_id: 7,
          user_id: 2,
          message_id: 3
        },
        {
          id: 7,
          category_id: 7,
          user_id: 2,
          message_id: 4
        },
        {
          id: 8,
          category_id: 7,
          user_id: 2,
          message_id: 5
        },
        {
          id: 9,
          category_id: 7,
          user_id: 2,
          message_id: 6
        },
        {
          id: 10,
          category_id: 7,
          user_id: 2,
          message_id: 7
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('starred_messages_id_seq', (SELECT MAX(id) FROM starred_messages));");
    });
};
