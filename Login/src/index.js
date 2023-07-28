const express = require("express");
const cors = require("cors");
const { Server: HttpServer } = require("http");
const { config, mongo:mongoURL } = require("./config");
const mongo = require('./config/mongoDB')
const serverRoutes = require("./routes");
const path = require("path");

const session = require('express-session');
const cookie = require('cookie-parser');
const MongoStorage = require('connect-mongo');

const Socket = require("./utils/sockets/socket.io");
class Server {
  constructor(port) {

    this.app = express();
    this.PORT = port;
    this.settings();
    this.views();
    this.middlewares();
    this.server = new HttpServer(this.app);
    this.socket = new Socket(this.server);
    this.route();
    this.listen();
  }

  settings(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(session({
      store: MongoStorage.create({
        mongoUrl: mongoURL.atlas,
        autoRemove:'disabled'
      }),
      secret:'secret52225',
      resave:true,
      saveUninitialized:true
    }))

    this.app.use(express.static(`${__dirname}/public`));
    console.log(`${__dirname}\\public`)
  }

  views(){
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
  }

  middlewares(){
    this.app.use(cors("*"));

  }

  route(){
    this.app.use((req, res, next)=>{
      // req = {
      //   ...req,
      //   socketManager: this.socket
      // }
      req.socketManager = this.socket;
      next();
    })
    serverRoutes(this.app, this.socket);
  }

  listen(){
    this.server.listen(this.PORT, ()=>{console.log(`http://localhost:${this.PORT}`)});
  }
}

module.exports = new Server(config.port);