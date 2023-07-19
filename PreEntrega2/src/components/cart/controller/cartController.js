const cartService = require("../services/cartService");
class Cart {
  async getCart(req, res, next) {
    const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
    let { id = null } = req.params;
    let response = await cartService.getCart(id, { page, limit }, {query, sort});
    res.json(response);
  }

  async updateProducts(req,res,next){
    let { id = null } = req.params;
    let array = req.body;
    let products = []
    array.map(pid=>{
      products.push({product: pid})
    })
    let response = await cartService.updateProducts(id, products)
    res.json(response)
  }
  async create(req, res, next) {
    try {
      let payload = req.body;
      console.log(payload)
      let response = await cartService.create(payload);
      res.json(response);
    } catch (error) {
      res.json(error);
    }
  }

  async update(req, res, next) {
    let { id } = req.params;
    let payload = req.body;
    let response = await cartService.update(id, payload);
    res.json(response);
  }

  async delete(req, res, next) {
    let { cid } = req.params;
    let response = await cartService.delete(cid);
    res.json(response);
  }
  async deleteProduct(req, res, next) {
    let { cid, pid } = req.params;
    let response = await cartService.deleteProduct(cid, pid);
    res.json(response);
  }
  async updateCantProduct(req, res, next) {
    let { cid, pid } = req.params;
    let {cant} = req.body;
    let response = await cartService.updateCantProduct(cid, pid, cant);
    res.json(response);
  }
  async addProduct(req, res, next) {
    let { cid,pid } = req.params;
    let response = await cartService.addProduct(cid, pid);
    res.json(response);
  }
}

module.exports = new Cart();
