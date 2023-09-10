const {
  TicketService,
  CartService,
  UserService,
  ProductService,
} = require("../../../repositories/index");
class Ticket {
  async getTicket(req, res, next) {
    const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
    let { id = null } = req.params;
    let response = await TicketService.getTicket(
      id,
      { page, limit },
      { query, sort }
    );
    res.json(response);
  }

  async create(req, res, next) {
    let payload = req.body;
    let response = await TicketService.create(payload);
    res.json(response);
  }

  async update(req, res, next) {
    let { id } = req.params;
    let payload = req.body;
    console.log(payload);
    let response = await TicketService.update(id, payload);
    res.json(response);
  }

  async delete(req, res, next) {
    let { id } = req.params;
    let response = await TicketService.delete(id);
    res.json(response);
  }
  async buy(req, res, next) {
    let request1 = await CartService.getCart(req.session.user.cartID, null, {
      query: "{}",
      sort: "{}",
    });
    let cart = request1.payload[0];
    let products = cart.products;

    let totalPago = 0;
    let productosFaltantes = {}; // idProd : cant
    let productosComprados = {};
    products.map((p) => {
      let totalStock = p.product.stock - p.cant;
      let totalComprado = totalStock > 0 ? p.cant : totalStock + p.cant;
      ProductService.update(p.product._id, {
        stock: totalStock < 0 ? 0 : totalStock,
      });
      if (totalStock < 0) {
        productosFaltantes[p.product.nombre] = totalStock * -1;
      }
      productosComprados[p.product._id.toString()] = totalComprado;
      for (let index = 0; index < totalComprado; index++) {
        totalPago += p.product.precio;
      }
    });

    if (products.length>0){
      let response = await TicketService.create({
        amount: totalPago,
        purchaser: cart.user.email,
      });
      CartService.clearCart(req.session.user.cartID);
      


      res.render('ticket',{user:req.session.user, ticket: {...response._doc, pfaltantes:productosFaltantes,pComprados:productosComprados}});
    }else{
      res.render('cart',{user:req.session.user,cart:cart,error:"El carrito esta vacio"})
    }

  }
}

module.exports = new Ticket();
