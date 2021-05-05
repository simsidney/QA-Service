const { Pool } = require('pg');
const { host, user, database, port } = require('../config.js')

const pool = new Pool ({
  host,
  user,
  database,
  port
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  connect: (err, client, done) => {
    return pool.connect(err, client, done);
  }
}