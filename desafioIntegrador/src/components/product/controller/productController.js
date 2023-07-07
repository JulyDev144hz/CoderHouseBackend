
const productService = require("../services/productService");
class Product {
  async getProduct(req, res, next){
    let { id = null } = req.params;
    let response = await productService.getProduct(id);
    res.json(response);
  }

  async create(req, res, next){
    let payload = req.body;
    let response = await productService.update(payload);
    res.json(response);
  }

  async update(req, res, next){
    let { id } = req.params;
    let payload = req.body;
    let response = await productService.update(id, payload);
    res.json(response);
  }

  async delete(req, res, next){
    let { id } = req.params;
    let response = await productService.delete(id);
    res.json(response);
  }
}

module.exports = new Product();