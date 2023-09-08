const express = require("express");
const cors = require("cors");
const { Server: HttpServer } = require("http");
const { config, mongo: mongoURL } = require("./config");
const mongo = require("./config/mongoDB");
const serverRoutes = require("./routes");
const path = require("path");

const session = require("express-session");
const cookie = require("cookie-parser");
const MongoStorage = require("connect-mongo");

const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;

const Socket = require("./utils/sockets/socket.io");
const {userModel} = require("./dao/mongo/user");
const faker = require('faker')
const initializePassport = require('./components/auth/middleware/passport.config')

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

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        store: MongoStorage.create({
          mongoUrl: mongoURL.atlas,
          autoRemove: "disabled",
        }),
        secret: config.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
      })
    );

    this.app.use(express.static(`${__dirname}/public`));

    // Passport
    initializePassport()
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.use(
      "github",
      new GithubStrategy(
        {
          clientID: config.GITHUB_CLIENT_ID,
          clientSecret: config.GITHUB_CLIENT_SECRET,
          callbackURL: config.GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = false
            if(profile.__json?.email){
              user = await userModel.findOne({ email: profile.__json.email });
            }


            if (!user) {
              let email
              if(!profile.__json?.email){
                email = faker.internet.email()
              }else{
                email = !profile.__json?.email
              }
              // En  el caso de que el github no este asociado a ningun email
              // lo linkeo con uno creado por faker para que no tire error y se
              // pueda linkear github
              let newUser = {
                nombre: profile._json.name,
                email:email
              };
              console.log(email)

              let result = await userModel.create(newUser);
              return done(null, result);
            } else {
              done(null, user);
            }
          } catch (error) {
            console.log(error)
          }
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
      // console.log(id.id)
      let user = await userModel.findById(id);
      done(null, user);
      // done(null,'jose')
    });
  }

  views() {
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
  }

  middlewares() {
    this.app.use(cors("*"));
  }

  route() {
    this.app.use((req, res, next) => {
      // req = {
      //   ...req,
      //   socketManager: this.socket
      // }
      req.socketManager = this.socket;
      next();
    });
    serverRoutes(this.app, this.socket);
  }

  listen() {
    this.server.listen(this.PORT, () => {
      console.log(`http://localhost:${this.PORT}`);
    });
  }
}

module.exports = new Server(config.port);
