const fs = require("fs");

class Product {
  constructor(id, title, description, code, price, status = true, stock, category, thumbnails) {
    // si hay un campo sin definir lanzo error
    if (
      title == undefined ||
      description == undefined ||
      code == undefined ||
      price == undefined ||
      status == undefined ||
      stock == undefined ||
      category == undefined ||
      id == undefined
    )
      throw new Error("Hay campos del producto sin definir");

    // this.id = ++this.constructor.countIds;
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnails = thumbnails;
    this.code = code;
    this.status = status;
    this.category = category;
    this.stock = stock;
  }
}
class ProductManager {
  static countIds = 0;
  constructor(path) {
    this.path = path;
    // si no esta creado products.json lo creo
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify({ products: [] }));
    }

    this.getProducts().map((product) => {
      if (product.id >= this.constructor.countIds) {
        this.constructor.countIds = product.id;
      }
    });
  }

  addProduct(title, description,code , price, status, stock, category , thumbnails ) {
    // saque los trycatch para manejarlos desde index.js
    

      let p = new Product(
        ++this.constructor.countIds,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
      );
      let products = JSON.parse(fs.readFileSync(this.path)).products;
      fs.writeFileSync(this.path, JSON.stringify({ products: [...products, p] }));
    
  }
  getProducts() {
    //si no existe products.json lanzo error
    if (!fs.existsSync(this.path)) throw new Error("No existe products.json");

    let products = JSON.parse(fs.readFileSync(this.path)).products;

    return products;
  }

  getProductById(id) {
    //si no existe products.json lanzo error
    if (!fs.existsSync(this.path)) throw new Error("No existe products.json");
    let products = JSON.parse(fs.readFileSync(this.path)).products;
    let product = products.find((product) => product.id == id);
    // si no lo encuentra responde Not Found
    if (!product) {
      throw new Error("product no encontrado");
    }
    return product;
  }
  // Aca use {} asi al llamar la funcion y por ejemplo solo queres modificar price, el usuario tiene que poner la id y {price:20}
  updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    try {
      let product = this.getProductById(id);

      // verifica si los parametros estan definidos, y si lo estan modifica al usuario, sino lo deja como estaba
      product.title = title ? title : product.title;
      product.description = description ? description : product.description;
      product.price = price ? price : product.price;
      product.thumbnail = thumbnail ? thumbnail : product.thumbnail;
      product.code = code ? code : product.code;
      product.stock = stock ? stock : product.stock;

      let products = JSON.parse(fs.readFileSync(this.path)).products;

      let filterProducts = products.filter((u) => u.id != id);
      fs.writeFileSync(
        this.path,
        JSON.stringify({ products: [...filterProducts, product] })
      );
    } catch (error) {
      console.error(error);
    }
  }
  deleteProduct(id) {
    try {
      // uso el metodo para no tener que repetir codigo en buscar al usuario
      let product = this.getProductById(id);

      let products = JSON.parse(fs.readFileSync(this.path)).products;
      let filterProducts = products.filter((u) => u.id != id);
      fs.writeFileSync(this.path, JSON.stringify({ products: filterProducts }));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { ProductManager, Product };
