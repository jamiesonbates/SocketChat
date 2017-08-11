exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1,
          first_name: 'Jamieson',
          last_name: 'Bates',
          username: 'jamiesonbates',
          email: 'jamiesonbates@gmail.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 2,
          first_name: 'Kate',
          last_name: 'Beth',
          username: 'katebeth',
          email: 'katebeth.polsci@gmail.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 3,
          first_name: 'Fake',
          last_name: 'User',
          username: 'fakeuser',
          email: 'fakeuser@gmail.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 4,
          first_name: 'Sammy',
          last_name: 'Watkins',
          username: 'Sammy',
          email: 'sammy@gmail.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 5,
          first_name: 'Eon',
          last_name: 'Beads',
          username: 'thebeads',
          email: 'thebeads@gmail.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 6,
          first_name: 'Toddster',
          last_name: 'Roadster',
          username: 'toddstertheroadseter',
          email: 'toddio@gmail.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 7,
          first_name: 'Andy',
          last_name: 'Norm',
          username: 'andynorm',
          email: 'andy@gmail.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 8,
          first_name: 'Chris',
          last_name: 'Tucker',
          username: 'christucker',
          email: 'christucker@christucker.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 9,
          first_name: 'Jonathan',
          last_name: 'Allen',
          username: 'jonallen',
          email: 'jon@jonallen.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
