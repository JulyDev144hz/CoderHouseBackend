const fs = require("fs");

class Product {
  constructor(id, title, description, price, thumbnail, code, stock) {
    // si hay un campo sin definir lanzo error
    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined ||
      id == undefined
    )
      throw new Error("Hay campos del producto sin definir");

    // this.id = ++this.constructor.countIds;
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
class ProductManager {
  static countIds = 0;
  constructor(path) {
    this.path = path;
    // si no esta creado users.json lo creo
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify({ users: [] }));
    }

    this.getProducts().map((user) => {
      if (user.id >= this.constructor.countIds) {
        this.constructor.countIds = user.id;
      }
    });
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // saque los trycatch para manejarlos desde index.js

    let p = new Product(
      ++this.constructor.countIds,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    let users = JSON.parse(fs.readFileSync(this.path)).users;
    fs.writeFileSync(this.path, JSON.stringify({ users: [...users, p] }));
  }
  getProducts() {
    //si no existe users.json lanzo error
    if (!fs.existsSync(this.path)) throw new Error("No existe users.json");

    let users = JSON.parse(fs.readFileSync(this.path)).users;

    return users;
  }

  getProductById(id) {
    //si no existe users.json lanzo error
    if (!fs.existsSync(this.path)) throw new Error("No existe users.json");
    let users = JSON.parse(fs.readFileSync(this.path)).users;
    let user = users.find((user) => user.id == id);
    // si no lo encuentra responde Not Found
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }
  // Aca use {} asi al llamar la funcion y por ejemplo solo queres modificar price, el usuario tiene que poner la id y {price:20}
  updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    try {
      let user = this.getProductById(id);

      // verifica si los parametros estan definidos, y si lo estan modifica al usuario, sino lo deja como estaba
      user.title = title ? title : user.title;
      user.description = description ? description : user.description;
      user.price = price ? price : user.price;
      user.thumbnail = thumbnail ? thumbnail : user.thumbnail;
      user.code = code ? code : user.code;
      user.stock = stock ? stock : user.stock;

      let users = JSON.parse(fs.readFileSync(this.path)).users;

      let filterUsers = users.filter((u) => u.id != id);
      fs.writeFileSync(
        this.path,
        JSON.stringify({ users: [...filterUsers, user] })
      );
    } catch (error) {
      console.error(error);
    }
  }
  deleteProduct(id) {
    try {
      // uso el metodo para no tener que repetir codigo en buscar al usuario
      let user = this.getProductById(id);

      let users = JSON.parse(fs.readFileSync(this.path)).users;
      let filterUsers = users.filter((u) => u.id != id);
      fs.writeFileSync(this.path, JSON.stringify({ users: filterUsers }));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { ProductManager, Product };
