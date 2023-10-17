const { Server: socketIO } = require("socket.io");
const {ChatService} = require("../../repositories/index");

class Socket {
  static instancia = undefined;
  constructor(http) {
    if (Socket.instancia) {
      return Socket.instancia;
    }
    Socket.instancia = this;
    this.io = new socketIO(http);
    this.init();
  }

  init() {
    try {
      this.io.on("connection", async (socket) => {
        this.io.sockets.emit("init", "conectado exitosamente");
        ChatService.socket(this.io, socket);
      });
    } catch (error) {
      console.log(" /utils/sockets/socket.io ~~ Line 12 ~~ Error En el init");
      console.log(error);
    }
  }
}

module.exports = Socket;
