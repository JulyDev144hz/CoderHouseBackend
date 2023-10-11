require("dotenv").config();

const config = {
  port: process.env.PORT,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_SECRET_KEY: process.env.GITHUB_SECRET_KEY,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,

  PERSISTENCE:process.env.PERSISTENCE,

  jwt_algorithm:process.env.JWT_ALGORITHM,
  jwt_secret:process.env.JWT_SECRET,
  jwt_experies_in:process.env.JWT_EXPERIES_IN,


  nodemailer_user : process.env.NODE_MAILER_USER,
  nodemailer_pass : process.env.NODE_MAILER_PASSWORD,

  dns_frontend:process.env.DNS_FRONTEND,

  isProd:process.env.NODE_ENV === "production"
};

const mongo = {
  atlas: process.env.mongo_uri,
};

module.exports = { config, mongo };
