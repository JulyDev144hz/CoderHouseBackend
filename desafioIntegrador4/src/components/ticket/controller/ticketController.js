const {
  TicketService,
  CartService,
  UserService,
  ProductService,
} = require("../../../repositories/index");

const { MercadoPagoConfig, Payment } = require("mercadopago");

class Ticket {
  async getTicket(req, res, next) {
    try {
      const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
      let { id = null } = req.params;
      let response = await TicketService.getTicket(
        id,
        { page, limit },
        { query, sort }
      );
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async create(req, res, next) {
    try {
      let payload = req.body;
      let response = await TicketService.create(payload);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async update(req, res, next) {
    try {
      let { id } = req.params;
      let payload = req.body;
      console.log(payload);
      let response = await TicketService.update(id, payload);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async delete(req, res, next) {
    try {
      let { id } = req.params;
      let response = await TicketService.delete(id);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }
  async buy(req, res, next) {
    // let client = new MercadoPagoConfig({
    //   accessToken:
    //     "TEST-536725641561027-112022-315761142af56063931d23e9305519e1-1559171798",
    // });
    // const payment = new Payment(client);

    // payment.create({
    //   transaction_amount: 3000,
    //   description: "<DESCRIPTION>",
    //   payment_method_id:"Debin_transfer",
    //   payer: {
    //     email: "julianippolito01@gmail.com",
    //   },
    // }).then(console.log).catch(console.log)

    try {
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

      if (products.length > 0) {
        let response = await TicketService.create({
          amount: totalPago,
          purchaser: cart.user.email,
        });
        CartService.clearCart(req.session.user.cartID);

        res.render("ticket", {
          user: req.session.user,
          ticket: {
            ...response._doc,
            pfaltantes: productosFaltantes,
            pComprados: productosComprados,
          },
        });
      } else {
        res.render("cart", {
          user: req.session.user,
          cart: cart,
          error: "El carrito esta vacio",
        });
      }
    } catch (error) {
      req.logger.error(error);
    }
  }
}

module.exports = new Ticket();
