const express = require("express");
const PORT = process.env.PORT || 8080;
const routes = require("./routes");
const exphbs = require("express-handlebars");
const { Server: HttpServer } = require("http");
const SocketIO = require("socket.io");
const axios = require("axios");
class Server {
  constructor() {
    this.app = express();
    this.http = new HttpServer(this.app);
    this.settings();
    this.routes();
    this.sockets();
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
    this.io = SocketIO(this.http);

    this.io.on("connection", async (socket) => {
      console.log("cliente conectado");
      this.io.sockets.emit('init', 'cliente conectado')

      let response = await axios.get(`http://localhost:${PORT}/api/products`);
      this.io.sockets.emit("refreshData", response.data);

      socket.on("newProduct", async (data) => {
        let response = await axios.get(`http://localhost:${PORT}/api/products`);
        this.io.sockets.emit("refreshData", response.data);
      });
    });
  }

  listen() {
    this.http.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}
module.exports = new Server();
