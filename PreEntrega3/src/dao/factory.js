const {config} = require('../config')

let Cart, Chat, Product, User;


switch (config.PERSISTENCE){
    case "MEMORY":

        break;
    default: //MONGO ES DEFAULT
        let {User:Usermongo} = require('./mongo/user')
        User = Usermongo;

        let {Cart:Cartmongo} = require('./mongo/carts')
        Cart = Cartmongo
        
        let {Chat:ChatMongo} = require('./mongo/chat')
        Chat = ChatMongo

        let {Product:ProductMongo} = require('./mongo/product')
        Product = ProductMongo
        break;
}

module.exports = {
    User, Cart, Chat, Product
}
