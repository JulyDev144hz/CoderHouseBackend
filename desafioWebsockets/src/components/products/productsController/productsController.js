const { ProductManager } = require("../ProductManager.js");

const path = require("path");
const PM = new ProductManager(path.join(__dirname, "../products.json"));

class Products {
  get(req, res) {
    let products = PM.getProducts();
    let limit = parseInt(req.query.limit);
    products = limit ? products.slice(0, limit) : products;
    res.json(products);
  }
  getId(req, res) {
    try {
      let id = parseInt(req.params.pid);
      let product = PM.getProductById(id);
      res.json(product);
    } catch (error) {
      res.json({ error: error });
    }
  }
  post(req, res) {
    let data = req.body;

    console.log(data)
    data.status = data.status == 'on' ? 'true' : 'false'
    data.thumbnails = [];
    try {
      req.files.map((file) => {
        data.thumbnails.push(file.path);
      });
    } catch (error) { 
      
    }
    try {
      PM.addProduct(
        data.title,
        data.description,
        data.code,
        data.price,
        data.status,
        data.stock,
        data.category,
        data.thumbnails
      );
      res.json({ message: "Creado con exito" });
    } catch (error) {
      res.json({ error: error });
    }
  }
  put(req, res) {
    try {
      let id = parseInt(req.params.pid);
      PM.updateProduct(id, req.body);
      res.json({ message: "Modificado con exito" });
    } catch (error) {
      res.json({ error: error });
    }
  }
  delete(req, res) {
    try {
        let id = parseInt(req.params.pid)
        PM.deleteProduct(id)
        res.json({'message':'Eliminado con exito'})
    } catch (error) {
        res.json({'error':error})
    }
  }
}

module.exports = new Products();
