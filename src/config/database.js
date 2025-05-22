const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT)
});

module.exports = pool;