// Configuración base de datos
const knex = require('knex');

// MySQL
const config = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'coderhouse'
    },
    pool: { min: 0, max: 7 }
  };

const configSQLite3 = {
    client: 'sqlite3',
    connection: { filename: './db/mydb.sqlite' },
    useNullAsDefault: true
}

const mySQLConnection = knex(config);
const sqliteConnection = knex(configSQLite3);

module.exports = { mySQLConnection, sqliteConnection };