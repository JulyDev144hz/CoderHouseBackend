
const {ProductService, CartService, UserService} = require("../../../repositories/index");
class Product {
  async getProduct(req, res, next){
    const {page = 1, limit = 10, query = "{}", sort = "{}"} = req.query;
    let { id = null } = req.params; 
    let response = await ProductService.getProduct(id, {page, limit}, {query, sort});
    res.json(response);
  }
  async view(req,res,next){
    const {page = 1, limit = 10, query = "{}", sort = "{}"} = req.query;
    let { id = null } = req.params; 

    let resp = await CartService.getCart(null, { page: 1, limit: 10 }, {query:"{}",sort:"{}"})
    let crearCarrito = true;
    let cartID
    resp.payload.map(async cart=>{
      if(req.session.user._id == cart.user._id.toString()){
        cartID = cart._id 
        crearCarrito = false
      }
    })

    if(crearCarrito){
      let cartUser = await CartService.create({
        user: req.session.user._id
      })
      cartID = cartUser._id

      console.log('carrito creado')
    }

    req.session.user.cartID = cartID
    


    let response = await ProductService.getProduct(id, {page, limit}, {query, sort})
 
    res.render('products', {products: response, user: req.session.user})
  }
  async viewUpdate(req,res,next){
    const {page = 1, limit = 10, query = "{}", sort = "{}"} = req.query;
    let { id = null } = req.params; 

    let response = await ProductService.getProduct(id, {page, limit}, {query, sort})
    res.render('editProduct', {product: response, user: req.session.user})
  }

  async bulk(req, res, next){

    let { cant = 10 } = req.params;
    let response = await ProductService.bulk(Number(cant));
    res.json(response);
  }

  async create(req, res, next){
    let payload = req.body;
    //tdd
    if(!payload.nombre && !payload.descripcion && 
      !payload.precio && !payload.stock
    ) return res.json({ERROR:"Parametros incorrectos para crear producto"})

    let response = await ProductService.create(payload);
    res.json(response);
  }

  async update(req, res, next){

    
    let { id } = req.params;
    let payload = req.body;
    console.log(payload)
    let response = await ProductService.update(id, payload);
    return res.redirect('/products')
    res.json(response);
  }

  async delete(req, res, next){
    let { id } = req.params;
    let response = await ProductService.delete(id);
    res.json(response);
  }
}

module.exports = new Product();