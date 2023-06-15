const { CartManager } = require("../CartsManager.js");

const path = require("path");
const CM = new CartManager(path.join(__dirname, "../carts.json"));

class Products {
  get(req, res) {
    let carts = CM.getCarts();
    res.json(carts);
  }
  post(req, res) {
    CM.addCart(req.body.products);

    res.json(CM.getCarts());
  }
  getId(req, res) {
    let id = parseInt(req.params.cid);

    res.json(CM.getCartById(id));
  }
  postProductId(req, res) {
    try {
      let cid = parseInt(req.params.cid);
      let pid = parseInt(req.params.pid);
      let quantity = req.body.quantity;
      let oldCart = CM.getCartById(cid);

      if (oldCart) {
        let found = false;
        oldCart.products.map((p) => {
          if (p.product == pid) {
            p.quantity += quantity;
            found = true;
          }
        });
        if (found) {
          CM.updateCart(cid, [...oldCart.products]);
        } else {
          CM.updateCart(cid, [
            ...oldCart.products,
            { product: pid, quantity: quantity },
          ]);
        }
      }

      res.json({ message: "Modificado con exito" });
    } catch (error) {
      res.json({ error: error });
    }
  }
}

module.exports = new Products();
