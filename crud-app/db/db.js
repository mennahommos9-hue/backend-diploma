const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "diploma-db",
    user: "postgres",
    password: "postgres"
})

module.exports = pool