'use strict';

exports.seed = function(knex) {
  return knex('user_contacts').del()
    .then(function () {
      return knex('user_contacts').insert([
        {
          id: 1,
          user_id1: 1,
          user_id2: 2
        },
        {
          id: 2,
          user_id1: 1,
          user_id2: 3
        },
        {
          id: 3,
          user_id1: 1,
          user_id2: 4
        },
        {
          id: 4,
          user_id1: 2,
          user_id2: 3
        },
        {
          id: 5,
          user_id1: 2,
          user_id2: 4
        },
        {
          id: 6,
          user_id1: 3,
          user_id2: 4
        },
        {
          id: 7,
          user_id1: 2,
          user_id2: 1
        },
        {
          id: 8,
          user_id1: 3,
          user_id2: 1
        },
        {
          id: 9,
          user_id1: 4,
          user_id2: 1
        },
        {
          id: 10,
          user_id1: 3,
          user_id2: 2
        },
        {
          id: 11,
          user_id1: 4,
          user_id2: 3
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('user_contacts_id_seq', (SELECT MAX(id) FROM user_contacts));");
    });
};
