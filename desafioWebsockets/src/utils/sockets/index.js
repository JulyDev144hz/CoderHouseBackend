const SocketIO = require("socket.io");
const {ProductManager} = require('../../components/products/ProductManager');
const { default: axios } = require("axios");


class Socket {
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia
        }
        Socket.instancia = this;
        this.io = SocketIO(http);
    }

    init(){
        try {
            this.io.on('connection', async socket=>{
                console.log('usuario conectado')
                this.io.sockets.emit('init', 'Nuevo cliente conectado a websocket');
                let resp = await axios.get(`http://localhost:${process.env.PORT || 8080}/api/products`)
                let data = resp.data

                socket.emit('cargarProductos', data)
                

            })
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Socket;