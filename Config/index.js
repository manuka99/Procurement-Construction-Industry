require("dotenv").config();

var PORT = process.env.LOCAL_PORT;
var DB = process.env.LOCAL_DB;

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() == "production") {
  PORT = process.env.PORT;
  DB = process.env.ATLAS_DB;
}

module.exports = {
  AUTH_SECRET: process.env.AUTH_SECRET,
  DB,
  PORT,
};
