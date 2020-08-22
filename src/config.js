require("dotenv").config();
module.exports = {
  PORT: process.env.REST_PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  db: {
    HOST: process.env.MIGRATION_DB_HOST,
    USER: process.env.MIGRATION_DB_USER,
    PASS: process.env.MIGRATION_DB_PASSWORD,
    DB_NAME: process.env.MIGRATION_DB_USER,
    DB_PORT: process.env.MIGRATION_DB_PORT
  },
};
