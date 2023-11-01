// Tadeo Almiron
const { Router } = require("express");
const cartController = require("./controller/cartController");
module.exports = app =>{
  const router = new Router();
  app.use("/api/cart", router);

  /**
   * @swagger
   * /api/cart?{limit}&{page}&{query}&{sort}:
   *  get:
   *    summary: Obtener todos los carritos
   *    parameters:
   *      - in: path
   *        name: limit
   *        required: false
   *        descripcion: limite de carrito en la respuesta
   *      - in: path
   *        name: page
   *        required: false
   *        descripcion: pagina de carrito
   *      - in: path
   *        name: query
   *        required: false
   *        descripcion: query de carrito
   *      - in: path
   *        name: sort
   *        required: false
   *        descripcion: orden de carrito
   *    responses:
   *      200: 
   *        description: Lista de carrios
   *      500: 
   *        description: Error del servidor
   */
  router.get("/", cartController.getCart);
  /**
   * @swagger
   * /api/cart/{id}:
   *  get:
   *    summary: Obtener uno de los carritos
   *    parameters:
   *      - in: path
   *        name: id
   *        required: false
   *        descripcion: id del carrito
   *      
   *    responses:
   *      200: 
   *        description: obtener carrito
   *      500: 
   *        description: Error del servidor
   */
  router.get("/:id", cartController.getCart);
  /**
   * @swagger
   * /api/cart/{cid}/products/{pid}:
   *  delete:
   *    summary: Borrar un producto de un carrito
   *    parameters:
   *      - in: path
   *        name: cid
   *        required: true
   *        descripcion: id del carrito
   *      - in: path
   *        name: pid
   *        required: true
   *        descripcion: id del producto
   *      
   *    responses:
   *      200: 
   *        description: producto borrado del carrito
   *      500: 
   *        description: Error del servidor
   */
  router.delete("/:cid/products/:pid", cartController.deleteProduct); // consigna delete product
  /**
   * @swagger
   * /api/cart/{cid}:
   *  put:
   *    summary: Actualizar carrito
   *    parameters:
   *      - in: path
   *        name: cid
   *        required: true
   *        descripcion: id del carrito
   *      
   *    responses:
   *      200: 
   *        description: actualizar carrito
   *      500: 
   *        description: Error del servidor
   */
  router.put("/:id", cartController.updateProducts); // Enviar un array de Ids ["64b70630b0ff38ac7988ff78",    "64b70641b0ff38ac7988ffc2",    "64b7064ab0ff38ac798900e0"  ]
  /**
   * @swagger
   * /api/cart/{cid}/addProduct/{pid}:
   *  get:
   *    summary: Obtener un producto de un carrito
   *    parameters:
   *      - in: path
   *        name: cid
   *        required: true
   *        descripcion: id del carrito
   *      - in: path
   *        name: pid
   *        required: true
   *        descripcion: id del producto
   *      
   *    responses:
   *      200: 
   *        description: obtener producto
   *      500: 
   *        description: Error del servidor
   */
  router.get("/:cid/addProduct/:pid", cartController.addProduct); // enviar solo id 
  /**
   * @swagger
   * /api/cart/{cid}/products/{pid}:
   *  put:
   *    summary: Actualizar un producto de un carrito
   *    parameters:
   *      - in: path
   *        name: cid
   *        required: true
   *        descripcion: id del carrito
   *      - in: path
   *        name: pid
   *        required: true
   *        descripcion: id del producto
   *      
   *    responses:
   *      200: 
   *        description: producto actualizado
   *      500: 
   *        description: Error del servidor
   */
  router.put("/:cid/products/:pid", cartController.updateCantProduct);
  /**
   * @swagger
   * /api/cart/:
   *  post:
   *    summary: Crear un producto
   *    parameters:
   *     - in: path
   *       name: cid
   *       required: true
   *       descripcion: id del carrito
   *      
   *    responses:
   *      200: 
   *        description: producto creado
   *      500: 
   *        description: Error del servidor
   */
  router.post("/", cartController.create);
  // router.put("/:id", cartController.update);
  /**
   * @swagger
   * /api/cart/{cid}:
   *  delete:
   *    summary: borrar carrito
   *    parameters:
   *     - in: path
   *       name: cid
   *       required: true
   *       descripcion: id del carrito
   *      
   *    responses:
   *      200: 
   *        description: carrito borrado
   *      500: 
   *        description: Error del servidor
   */
  router.delete("/:cid", cartController.delete);


  const routerViews = new Router();
  app.use('/cart', routerViews)
  routerViews.get('/',cartController.view)
}