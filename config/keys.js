require("dotenv").config();

const config = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || "abc",
  JWT_TOKEN_EXP: process.env.JWT_TOKEN_EXP || "1h",
  MONGO_DB_URL: process.env.MONGO_DB_URL,
};

module.exports = config;
