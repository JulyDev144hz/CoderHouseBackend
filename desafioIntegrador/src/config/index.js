require("dotenv").config();

const config = {
  port: process.env.PORT
}

const mongo = {
  atlas: process.env.mongo_uri
}

module.exports = { config, mongo };