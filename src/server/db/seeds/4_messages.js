exports.seed = function(knex, Promise) {
  return knex('messages').del()
    .then(() => {
      return knex('messages').insert([
        {
          id: 1,
          user_id: 1,
          chat_id: 1,
          message: 'Hey, how are you?'
        },
        {
          id: 2,
          user_id: 1,
          chat_id: 1,
          message: 'Wanna go to happy hour?'
        },
        {
          id: 3,
          user_id: 2,
          chat_id: 1,
          message: 'Sure! Where do you want to go?'
        },
        {
          id: 4,
          user_id: 1,
          chat_id: 1,
          message: 'Lets go to Dino\'s!'
        },
        {
          id: 5,
          user_id: 2,
          chat_id: 1,
          message: 'What time?'
        },
        {
          id: 6,
          user_id: 1,
          chat_id: 1,
          message: '5:30?'
        },
        {
          id: 7,
          user_id: 2,
          chat_id: 1,
          message: 'Sounds good, see you there'
        },
        {
          id: 8,
          user_id: 1,
          chat_id: 2,
          message: 'Whattup'
        },
        {
          id: 9,
          user_id: 2,
          chat_id: 2,
          message: 'Whattup'
        },
        {
          id: 10,
          user_id: 3,
          chat_id: 2,
          message: 'Whattup'
        },
        {
          id: 11,
          user_id: 1,
          chat_id: 3,
          message: 'Testing'
        },
        {
          id: 12,
          user_id: 4,
          chat_id: 4,
          message: 'I heart Rory!'
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages));");
    });
};
