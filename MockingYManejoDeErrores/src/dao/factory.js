const {config} = require('../config')

let Cart, Chat, Product, User, Ticket;


switch (config.PERSISTENCE){
    case "MEMORY":

        break;
    default: //MONGO ES DEFAULT
        User = require('../components/user/service/userService')

        Ticket = require('../components/ticket/service/ticketService')

        Cart = require('../components/cart/service/cartService')
     
        
        Chat= require('../components/chat/service/chatService')

        Product = require('../components/product/service/productService')
        break;
}

module.exports = {
    User, Cart, Chat, Product, Ticket
}
