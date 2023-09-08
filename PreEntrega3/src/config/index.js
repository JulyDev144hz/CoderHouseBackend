require("dotenv").config();

const config = {
  port: process.env.PORT,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_SECRET_KEY: process.env.GITHUB_SECRET_KEY,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,

  PERSISTENCE:process.env.PERSISTENCE,
};

const mongo = {
  atlas: process.env.mongo_uri,
};

module.exports = { config, mongo };
