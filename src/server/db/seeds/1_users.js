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
          first_name: 'Kaz',
          last_name: 'Matthews',
          username: 'katiematthizzle',
          email: 'katherinematthews.polsci@gmail.com',
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
          first_name: 'Reed',
          last_name: 'Speegle',
          username: 'reedspeegle',
          email: 'reedspeegle@gmail.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 5,
          first_name: 'Ian',
          last_name: 'Bates',
          username: 'ianbates',
          email: 'ian@ianbates.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 6,
          first_name: 'Todd',
          last_name: 'Bates',
          username: 'toddbates',
          email: 'todd@toddbates.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 7,
          first_name: 'Andrea',
          last_name: 'Bates',
          username: 'andreabates',
          email: 'andrea@andreabates.com',
          h_pw: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 8,
          first_name: 'Todd',
          last_name: 'Bates',
          username: 'toddbbates',
          email: 'toddb@toddbbates.com',
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
