require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUri: process.env.DB_URI,
  sentryDns: process.env.SENTRY_DNS,
  sentryId: process.env.SENTRY_ID
};

module.exports = { config };
