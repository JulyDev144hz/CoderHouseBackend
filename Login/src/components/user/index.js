const { Router } = require("express");
const userController = require("./controller/userController");
module.exports = app =>{
  const router = new Router();
  app.use("/api/user", router);
  router.get("/", userController.getUser);
  router.get("/bulkcreate/:cant", userController.bulk);
  router.get("/:id", userController.getUser);
  router.post("/", userController.create);
  router.put("/:id", userController.update);
  router.delete("/:id", userController.delete);
}