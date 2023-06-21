const express = require("express");
const PORT = process.env.PORT || 8080;
const routes = require("./routes");
const exphbs = require("express-handlebars");
const { Server: HttpServer } = require("http");
const Socket = require('./utils/sockets')
const axios = require("axios");
class Server {
  constructor() {
    this.app = express();
    this.http = new HttpServer(this.app);
    this.settings();
    this.sockets();
    this.routes();
  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.engine("handlebars", exphbs.engine());
    this.app.set("view engine", "handlebars");
    this.app.set("views", __dirname + "\\views");
    this.app.use("/public", express.static("./public"));
  }
  routes() {
    routes(this.app);
  }
  sockets() {
    this.socket = new Socket(this.http);
    this.socket.init()
  }

  listen() {
    this.http.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}

module.exports = new Server();
