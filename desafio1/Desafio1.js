class Product {
  // agregue id autoincremental en caso de que no sea enviado como parametro
  static count = 0;
  constructor(title, description, price, thumbnail, stock, code) {
    // verifico que esten definidos los parametros excepto ID, que se puede generar automaticamente
    // nota(tuve que cambiar de orden los parametros para identificar el codigo)
    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      stock == undefined
    )
      throw new Error("Hay campos sin definir");
    
    // solucion 1 (podria tener problemas con ids generadas por el usuario)
    // if (code == undefined) {
    //   code = ++this.constructor.count;
    // }

    // solucion 2 (llamo a PM, pero me aseguro de que no haya problema con las ids)
    if (code == undefined) {
      while(PM.getProductById(this.constructor.count+1)!='Not found'){
        ++this.constructor.count;
      }
      code = ++this.constructor.count;
    }

    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Agregue manejo de errores en caso de que haya campos incorrectos
    try {
      let product = new Product(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      );

      let found = false;
      // busco si coincide code
      this.products.forEach((p) => {
        if (p.code == product.code) {
          console.error("Error: Codigo de producto repetido");
          found = true;
        }
      });
      if (found) {
        return;
      } else {
        this.products.push(product);
        return;
      }
    } catch (error) {
      console.error(`Error al crear un nuevo producto\n    ${error}`);
    }
  }

  getProducts() {
    return this.products;
  }
  getProductById(id) {
    // aplique metodo de busqueda perezosa
    let productFound = this.products.find((product) => product.code == id);
    return productFound ? productFound : "Not found";
  }
}

console.log("// Creat ProductManager");
let PM = new ProductManager();
console.log("// PM.getProducts()");
console.log(PM.getProducts());

// Modifique el addProduct para que cree dentro de la clase el objeto

console.log(
  '// PM.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc123")'
);
PM.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  25,
  "abc123"
);
console.log("// PM.getProducts()");
console.log(PM.getProducts());
console.log(
  '// PM.addProduct("producto prueba",  "Este es un producto prueba",  200,  "Sin imagen",  25,  "abc123"'
);
PM.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  25,
  "abc123"
);
console.log("// PM.getProductById(2))");
console.log(PM.getProductById(2));
console.log('// PM.getProductById("abc123")');
console.log(PM.getProductById("abc123"));

// probando el id autoincremental

// PM.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   25,
// );
// PM.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   25,
// );
// PM.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   25,
// );
// console.log(PM.getProducts())

// probando error de id repetido por id autoincremental
// console.log('Probando ')
// PM.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   25,
//   1
// );
// PM.addProduct(
//   "producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   25
// );
// console.log(PM.getProducts())