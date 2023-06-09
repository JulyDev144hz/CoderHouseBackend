const fs = require("fs");

class Cart {
  constructor(id, products) {
    if (id == undefined || products == undefined)
      throw new Error("Hay campos del producto sin definir");

    this.id = id;
    this.products = products;
  }
}
class CartManager {
  static countIds = 0;
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify({ carts: [] }));
    }

    this.getCarts().map((cart) => {
      if (cart.id >= this.constructor.countIds) {
        this.constructor.countIds = cart.id;
      }
    });
  }

  addCart(products) {
    let c = new Cart(++this.constructor.countIds, products);
    let carts = JSON.parse(fs.readFileSync(this.path)).carts;
    fs.writeFileSync(this.path, JSON.stringify({ carts: [...carts, c] }));
  }
  getCarts() {
    if (!fs.existsSync(this.path)) throw new Error("No existe carts.json");

    let carts = JSON.parse(fs.readFileSync(this.path)).carts;

    return carts;
  }

  getCartById(id) {
    if (!fs.existsSync(this.path)) throw new Error("No existe carts.json");
    let carts = JSON.parse(fs.readFileSync(this.path)).carts;
    let cart = carts.find((cart) => cart.id == id);
    if (!cart) {
      throw new Error("Usuario no encontrado");
    }
    return cart;
  }
  updateCart(id, products) {
    try {
      let cart = this.getCartById(id);

      cart.products = products ? products : cart.products;

      let carts = JSON.parse(fs.readFileSync(this.path)).carts;

      let filterCarts = carts.filter((c) => c.id != id);
      fs.writeFileSync(
        this.path,
        JSON.stringify({ carts: [...filterCarts, cart] })
      );
    } catch (error) {
      console.error(error);
    }
  }
  deleteCart(id) {
    try {
      let cart = this.getCartById(id);

      let carts = JSON.parse(fs.readFileSync(this.path)).cart;
      let filterCarts = carts.filter((c) => c.id != id);
      fs.writeFileSync(this.path, JSON.stringify({ carts: filterCarts }));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { Cart, CartManager };
