const {CartService} = require("../../../repositories/index");
class Cart {
  async getCart(req, res, next) {
    const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
    let { id = null } = req.params;
    let response = await CartService.getCart(id, { page, limit }, {query, sort});
    res.json(response);
  }

  async updateProducts(req,res,next){
    let { id = null } = req.params;
    let array = req.body;
    let products = []
    array.map(pid=>{
      products.push({product: pid})
    })
    let response = await CartService.updateProducts(id, products)
    res.json(response)
  }
  async create(req, res, next) {
    try {
      let payload = req.body;
      let response = await CartService.create(payload);
      res.json(response);
    } catch (error) {
      res.json(error);
    }
  }

  async update(req, res, next) {
    let { id } = req.params;
    let payload = req.body;
    let response = await CartService.update(id, payload);
    res.json(response);
  }

  async delete(req, res, next) {
    let { cid } = req.params;
    let response = await CartService.delete(cid);
    res.json(response);
  }
  async deleteProduct(req, res, next) {
    let { cid, pid } = req.params;
    let response = await CartService.deleteProduct(cid, pid);
    res.json(response);
  }
  async updateCantProduct(req, res, next) {
    let { cid, pid } = req.params;
    let {cant} = req.body;
    let response = await CartService.updateCantProduct(cid, pid, cant);
    res.json(response);
  }
  async addProduct(req, res, next) {
    let { cid,pid } = req.params;
    

    let response = await CartService.addProduct(cid, pid);
    res.json(response);
  }

  async view(req,res,next){
    const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
    let response = await CartService.getCart(req.session.user.cartID, { page, limit }, {query, sort});

    res.render('cart', {cart:response.payload[0], user: req.session.user})
  }
}

module.exports = new Cart();
