// Tadeo Almiron
const { Router } = require("express");
const productController = require("./controller/productController");
const { isAuth, isNotAuth, isAdmin } = require("../auth/middleware");
module.exports = (app) => {
  const router = new Router();
  app.use("/api/product", router);

  /**
   * @swagger
   * /api/product?{limit}&{page}&{query}&{sort}:
   *  get:
   *    summary: Obtener todos los productos
   *    parameters:
   *      - in: path
   *        name: limit
   *        required: false
   *        descripcion: limite de productos en la respuesta
   *      - in: path
   *        name: page
   *        required: false
   *        descripcion: pagina de productos
   *      - in: path
   *        name: query
   *        required: false
   *        descripcion: query de prodcutos
   *      - in: path
   *        name: sort
   *        required: false
   *        descripcion: orden de productos
   *    responses:
   *      200: 
   *        description: Lista de productos
   *      500: 
   *        description: Error del servidor
   */
  router.get("/", productController.getProduct);

  /**
   * @swagger
   * /api/product/bulkcreate/{cant}:
   *  get:
   *    summary: crear una cantidad de productos
   *    parameters:
   *      - in: path
   *        name: cant
   *        required: false
   *        descripcion: cantidad de productos a crear
   *    responses:
   *      200: 
   *        description: Creados con exito
   *      500: 
   *        description: Error del servidor
   */
  router.get("/bulkcreate/:cant", isAdmin, productController.bulk);
  /**
   * @swagger
   * /api/product/{id}:
   *  get:
   *    summary: Obtener un los productos
   *    parameters:
   *      - in: path
   *        name: id
   *        required: false
   *        descripcion: cantidad de productos a crear
   *    responses:
   *      200: 
   *        description: obtenido con exito
   *      500: 
   *        description: Error del servidor
   */
  router.get("/:id", productController.getProduct);
  /**
   * @swagger
   * /api/product/:
   *  post:
   *    summary: Crear un producto
   *    responses:
   *      200: 
   *        description: obtenido con exito
   *      500: 
   *        description: Error del servidor
   */
  router.post("/", isAdmin, productController.create, (req,res,next)=>{res.redirect('/products')});
  /**
   * @swagger
   * /api/product/update/{id}:
   *  put:
   *    summary: Actualizar producto
   *    responses:
   *      200: 
   *        description: Actualizado con exito
   *      500: 
   *        description: Error del servidor
   */
  router.post("/update/:id", isAdmin, productController.update);
  /**
   * @swagger
   * /api/product/{id}:
   *  delete:
   *    summary: Remover producto
   *    responses:
   *      200: 
   *        description: Removido con exito
   *      500: 
   *        description: Error del servidor
   */
  router.delete("/:id",  isAdmin, productController.delete);

  app.get("/products/create", isAuth, isAdmin, productController.createProductView);

  const routerViews = new Router();
  app.use("/products", routerViews);
  routerViews.get("/", isAuth, productController.view);
  routerViews.get("/edit/:id", isAuth, isAdmin, productController.viewUpdate);

  //mockingproducts
  app.get("/mockingproducts", productController.mockingProducts);
};
