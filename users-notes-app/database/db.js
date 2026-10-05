const { DataSource } = require("typeorm");
const Note = require("../schema/notes.schema");
const User = require("../schema/users.schema");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "users_db",
  synchronize: true,
  logging: false,
  entities: [Note, User],
  migrations: [],
  subscribers: [],
});

module.exports = AppDataSource;
