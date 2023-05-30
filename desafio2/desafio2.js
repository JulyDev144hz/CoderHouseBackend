const fs = require("fs");

// hago esto, para indicar por cual id empieza en caso de que ya existe un users.json con usuarios cargados
let startId = 0;
if (fs.existsSync("users.json")) {
  startId = JSON.parse(fs.readFileSync("users.json")).users.length;
}

class Product {
  static countIds = startId;
  constructor(title, description, price, thumbnail, code, stock) {
    // si hay un campo sin definir lanzo error
    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined
    )
      throw new Error("Hay campos del producto sin definir");

    this.id = ++this.constructor.countIds;

    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
class ProductManager {
  constructor(path) {
    this.path = "";
    // si no esta creado users.json lo creo
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify({ users: [] }));
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    try {
      let p = new Product(title, description, price, thumbnail, code, stock);
      let users = JSON.parse(fs.readFileSync(this.path)).users;
      fs.writeFileSync(this.path, JSON.stringify({ users: [...users, p] }));
    } catch (error) {
      console.error(error);
    }
  }
  getProducts() {
    try {
      //si no existe users.json lanzo error
      if (!fs.existsSync(this.path)) throw new Error("No existe users.json");

      let users = JSON.parse(fs.readFileSync(this.path)).users;

      return users;
    } catch (error) {
      console.error(error);
    }
  }

  getProductById(id) {
    try {
      //si no existe users.json lanzo error
      if (!fs.existsSync(this.path)) throw new Error("No existe users.json");
      let users = JSON.parse(fs.readFileSync(this.path)).users;
      let user = users.find((user) => user.id == id);
      // si no lo encuentra responde Not Found
      return user ? user : "Not Found";
    } catch (error) {
      console.error(error);
    }
  }
  // Aca use {} asi al llamar la funcion y por ejemplo solo queres modificar price, el usuario tiene que poner la id y {price:20}
  updateProduct(id, { title, description, price, thumbnail, code, stock }) {
    try {
      let user = this.getProductById(id);
      // lanza error sino existe users.json y sino existe el usuario que se busca
      if (!fs.existsSync(this.path)) throw new Error("No existe users.json");
      if (user === "Not Found") throw new Error("No existe el usuario");

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
  deleteProduct(id){
    try{
      // uso el metodo para no tener que repetir codigo en buscar al usuario
      let user = this.getProductById(id);
      // lanza error sino existe users.json y sino existe el usuario que se busca
      if (!fs.existsSync(this.path)) throw new Error("No existe users.json");
      if (user === "Not Found") throw new Error("No existe el usuario");

      let users = JSON.parse(fs.readFileSync(this.path)).users
      let filterUsers = users.filter(u=>u.id!=id)
      fs.writeFileSync(this.path,JSON.stringify({users:filterUsers}))
    }catch (error){
      console.error(error);
    }
  }
}

let PM = new ProductManager('./users.json');

PM.addProduct('Manzana', 'Una manzana roja', 20, 'No tiene imagen', 'Aef#3', 2)
PM.addProduct('Pomelo', '...', 10, 'No tiene imagen', 'dHf23', 3)
console.log('// console.log(PM.getProducts())')
console.log(PM.getProducts())
console.log('// console.log(PM.getProductById(1))')
console.log(PM.getProductById(1))
console.log("// PM.updateProduct(1,{description: 'Una manzana verde',thumbnail:'ManzanaVerde.png'})")
PM.updateProduct(1,{description: 'Una manzana verde',thumbnail:'ManzanaVerde.png'})
console.log('// console.log(PM.getProductById(1))')
console.log(PM.getProductById(1))
console.log('// PM.deleteProduct(2)')
PM.deleteProduct(2)
console.log('// console.log(PM.getProducts())')
console.log(PM.getProducts())