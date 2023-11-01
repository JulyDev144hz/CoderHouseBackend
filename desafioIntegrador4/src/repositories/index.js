



const {User:UserDao} = require('../dao/factory')
const UserRepository = require('./user.repository')

const {Product:ProductDao} = require('../dao/factory')
const ProductRepository = require('./product.repository')

const {Cart:CartDao} = require('../dao/factory')
const CartRepository = require('./carts.repository')

const {Chat:ChatDao} = require('../dao/factory')
const ChatRepository = require('./chat.repository')
const {Ticket:TicketDao} = require('../dao/factory')
const TicketRepository = require('./ticket.repository')

module.exports = {
    UserService: new UserRepository(UserDao),
    ProductService: new ProductRepository(new ProductDao()),
    CartService: new CartRepository(new CartDao()),
    ChatService: new ChatRepository(new ChatDao()),
    TicketService: new TicketRepository(new TicketDao()),
}
