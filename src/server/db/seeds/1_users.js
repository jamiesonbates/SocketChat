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
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
