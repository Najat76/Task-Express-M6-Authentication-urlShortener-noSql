const mongoose = require("mongoose");
// i will delete 1 + 2 since i combine them in config/keys file
// const dotenv = require("dotenv");  -1
// dotenv.config(); -2
const config = require("./config/keys");

const connectDB = async () => {
  const conn = await mongoose.connect(config.MONGO_DB_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
