



const {User:UserDao} = require('../dao/factory')
const UserRepository = require('./user.repository')
const {Product:ProductDao} = require('../dao/factory')
const ProductRepository = require('./product.repository')

const {Cart:CartDao} = require('../dao/factory')
const CartRepository = require('./carts.repository')

const {Chat:ChatDao} = require('../dao/factory')
const ChatRepository = require('./chat.repository')

module.exports = {
    UserService: new UserRepository(new UserDao()),
    ProductService: new ProductRepository(new ProductDao()),
    CartService: new CartRepository(new CartDao()),
    ChatService: new ChatRepository(new ChatDao()),
}
