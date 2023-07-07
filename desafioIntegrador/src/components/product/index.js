// Tadeo Almiron
const { Router } = require("express");
const productController = require("./controller/productController");
module.exports = app =>{
  const router = new Router();
  app.use("/product", router);
  router.get("/", productController.getProduct);
  router.get("/:id", productController.getProduct);
  router.post("/", productController.create);
  router.put("/:id", productController.update);
  router.delete("/:id", productController.delete);
}