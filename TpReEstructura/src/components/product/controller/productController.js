
const productService = require("../services/productService");
class Product {
  async getProduct(req, res, next){
    const {page = 1, limit = 10, query = "{}", sort = "{}"} = req.query;
    let { id = null } = req.params; 
    let response = await productService.getProduct(id, {page, limit}, {query, sort});
    res.json(response);
  }
  async view(req,res,next){
    const {page = 1, limit = 10, query = "{}", sort = "{}"} = req.query;
    let { id = null } = req.params; 
    let response = await productService.getProduct(id, {page, limit}, {query, sort})
    res.render('products', {products: response, user: req.session.user})
  }

  async bulk(req, res, next){

    let { cant = 10 } = req.params;
    let response = await productService.bulk(Number(cant));
    res.json(response);
  }

  async create(req, res, next){
    let payload = req.body;
    let response = await productService.create(payload);
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