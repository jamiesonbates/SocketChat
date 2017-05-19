module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/socketChat_dev',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: 'postgres://localhost/socketChat_test',
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
}
