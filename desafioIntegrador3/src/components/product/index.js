// Tadeo Almiron
const { Router } = require("express");
const productController = require("./controller/productController");
const {isAuth, isNotAuth, isAdmin} = require('../auth/middleware')
module.exports = app =>{
  const router = new Router();
  app.use("/api/product", router);
  router.get("/", productController.getProduct);
  router.get("/bulkcreate/:cant", isAdmin, productController.bulk);
  router.get("/:id", productController.getProduct);
  router.post("/", isAdmin, productController.create);
  router.post("/update/:id", isAdmin, productController.update);
  router.delete("/:id", isAdmin, productController.delete);

  app.get('/products/create', isAuth, productController.createProductView)

  
  const routerViews = new Router();
  app.use('/products', routerViews)
  routerViews.get('/', isAuth ,productController.view)
  routerViews.get('/edit/:id', isAuth, isAdmin ,productController.viewUpdate)

  //mockingproducts
  app.get('/mockingproducts', productController.mockingProducts)

}