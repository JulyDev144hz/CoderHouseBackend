const {Server : SocketIO} = require('socket.io')
class Socket {
    static instancia = undefined
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia
        }
        Socket.instancia = this
        this.io = new SocketIO(http)
    }

    init(){
        this.io.on('connection', socket=>{
            console.log('Conectado al socket')
        })
    }
}

module.exports = Socket