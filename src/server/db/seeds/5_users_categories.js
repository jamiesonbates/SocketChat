exports.seed = function(knex, Promise) {
  return knex('users_categories').del()
    .then(() => {
      return knex('users_categories').insert([
        {
          id: 1,
          user_id: 1,
          name: 'Places to go'
        },
        {
          id: 2,
          user_id: 1,
          name: 'Restaurants'
        },
        {
          id: 3,
          user_id: 1,
          name: 'Politics'
        },
        {
          id: 4,
          user_id: 1,
          name: 'Projects'
        },
        {
          id: 5,
          user_id: 1,
          name: 'Trails'
        },
        {
          id: 6,
          user_id: 1,
          name: 'Ski Mountains'
        },
        {
          id: 7,
          user_id: 2,
          name: 'Love'
        },
        {
          id: 8,
          user_id: 2,
          name: 'Hiking'
        },
        {
          id: 9,
          user_id: 2,
          name: 'Food'
        },
        {
          id: 10,
          user_id: 2,
          name: 'House'
        },
        {
          id: 11,
          user_id: null,
          name: 'General'
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_categories_id_seq', (SELECT MAX(id) FROM users_categories));");
    });
};
