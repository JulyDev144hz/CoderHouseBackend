// Tadeo Almiron
const { Router } = require("express");
const cartController = require("./controller/cartController");
module.exports = app =>{
  const router = new Router();
  app.use("/api/cart", router);
  router.get("/", cartController.getCart);
  router.get("/:id", cartController.getCart);
  router.delete("/:cid/products/:pid", cartController.deleteProduct); // consigna delete product
  router.put("/:id", cartController.updateProducts); // Enviar un array de Ids ["64b70630b0ff38ac7988ff78",    "64b70641b0ff38ac7988ffc2",    "64b7064ab0ff38ac798900e0"  ]
  router.get("/:cid/addProduct/:pid", cartController.addProduct); // enviar solo id 
  router.put("/:cid/products/:pid", cartController.updateCantProduct);
  router.post("/", cartController.create);
  // router.put("/:id", cartController.update);
  router.delete("/:cid", cartController.delete);


  const routerViews = new Router();
  app.use('/cart', routerViews)
  routerViews.get('/:cid',cartController.view)
}