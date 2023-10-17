const {
  ProductService,
  CartService,
  UserService,
} = require("../../../repositories/index");
class Product {
  async createProductView(req, res, next) {
    res.render("createProduct", { user: req.session.user });
  }

  async getProduct(req, res, next) {
    try {
      const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
      let { id = null } = req.params;
      let response = await ProductService.getProduct(
        id,
        { page, limit },
        { query, sort }
      );
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }
  async view(req, res, next) {
    try {
      const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
      let { id = null } = req.params;

      let resp = await CartService.getCart(
        null,
        { page: 1, limit: 10 },
        { query: "{}", sort: "{}" }
      );
      let crearCarrito = true;
      let cartID;
      resp.payload.map(async (cart) => {
        if (req.session.user._id == cart.user._id.toString()) {
          cartID = cart._id;
          crearCarrito = false;
        }
      });

      if (crearCarrito) {
        let cartUser = await CartService.create({
          user: req.session.user._id,
        });
        cartID = cartUser._id;

        console.log("carrito creado");
      }

      req.session.user.cartID = cartID;

      let response = await ProductService.getProduct(
        id,
        { page, limit },
        { query, sort }
      );

      res.render("products", { products: response, user: req.session.user });
    } catch (error) {
      req.logger.error(error);
    }
  }
  async viewUpdate(req, res, next) {
    try {
      const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
      let { id = null } = req.params;

      let response = await ProductService.getProduct(
        id,
        { page, limit },
        { query, sort }
      );
      res.render("editProduct", { product: response, user: req.session.user });
    } catch (error) {
      req.logger.error(error);
    }
  }

  async bulk(req, res, next) {
    try {
      let { cant = 10 } = req.params;
      let response = await ProductService.bulk(Number(cant));
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }
  async mockingProducts(req, res, next) {
    try {
      let cant = 100;
      let response = await ProductService.bulk(Number(cant));
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async create(req, res, next) {
    try {
      if (
        req.session.user.role != "premium" &&
        req.session.user.role != "admin"
      )
        throw new Error("No puedes crear un producto");

      let payload = req.body;
      //tdd
      if (
        !payload.nombre ||
        !payload.descripcion ||
        !payload.precio ||
        !payload.stock
      )
        return res.json({
          ERROR: "Parametros incorrectos para crear producto",
        });

      if (req.session.user.role == "premium") {
        payload = { ...payload, owner: req.session.user.email };
      }
      let response = await ProductService.create(payload);
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
      let response = await ProductService.update(id, payload);
      return res.redirect("/products");
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
      let { id = null } = req.params;

      let p = await ProductService.getProduct(
        id,
        { page, limit },
        { query, sort }
      );

      if (
        req.session.user.role == "premium" &&
        p.owner != req.session.user.email
      )
        throw new Error("No puedes eliminar este producto");
      let response = await ProductService.delete(id);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }
}

module.exports = new Product();
