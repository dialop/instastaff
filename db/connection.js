const pg = require("pg");
require('dotenv').config()

const client = new pg.Client({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client
  .connect()
    .then(() => {
    console.log('Connected to PostgreSQL database!');
  })
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = client;