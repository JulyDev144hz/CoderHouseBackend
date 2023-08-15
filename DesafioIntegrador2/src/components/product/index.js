// Tadeo Almiron
const { Router } = require("express");
const productController = require("./controller/productController");
const {isAuth, isNotAuth} = require('../auth/middleware')
module.exports = app =>{
  const router = new Router();
  app.use("/api/product", router);
  router.get("/", productController.getProduct);
  router.get("/bulkcreate/:cant", productController.bulk);
  router.get("/:id", productController.getProduct);
  router.post("/", productController.create);
  router.put("/:id", productController.update);
  router.delete("/:id", productController.delete);
  
  const routerViews = new Router();
  app.use('/products', routerViews)
  routerViews.get('/', isAuth ,productController.view)

}