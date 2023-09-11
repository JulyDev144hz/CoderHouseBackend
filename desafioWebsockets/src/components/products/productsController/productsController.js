const { ProductManager } = require("../ProductManager.js");

const path = require("path");
const PM = new ProductManager(path.join(__dirname, "../products.json"));
const Socket = require('../../../utils/sockets')

// uso el timeout de 5 segundos porque sin el puede llegarse a crear antes que la primera instancia.
let socket;
setTimeout(() => {
  socket = new Socket()
}, 5000);

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
      return res.json(product);
    } catch (error) {
      return res.json({ error: error });
    }
  }
  post(req, res) {
    let data = req.body;
    data.thumbnails = [];
    try {
      req.files.map((file) => {
        data.thumbnails.push(file.path);
      });
    } catch (error) {
      console.error(error);
    }

    try {
      data.status = data.status == 'on' ? true : false

      if(data.title.length == 0 
        || data.description.length == 0
        || data.code.length == 0
        || data.stock.length == 0
        || data.code.length == 0
        || data.thumbnails.length == 0
        ) throw new Error('Campos incorrectos')

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

      socket.io.sockets.emit('newProduct', data)

      return res.redirect('http://localhost:8080/realtimeproducts')
    } catch (error) {
      return res.json({ "message": `${error}` });
    }
  }
  put(req, res) {
    try {
      let id = parseInt(req.params.pid);
      PM.updateProduct(id, req.body);
      return res.json({ message: "Modificado con exito" });
    } catch (error) {
      return res.json({ error: error });
    }
  }
  delete(req, res) {
    try {
        let id = parseInt(req.params.pid)
        PM.deleteProduct(id)
        return res.json({'message':'Eliminado con exito'})
    } catch (error) {
        return res.json({'error':error})
    }
  }
}

module.exports = new Products();
