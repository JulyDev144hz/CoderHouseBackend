const { Router } = require("express");
const chatController = require("./controller/chatController");
module.exports = app =>{
  const router = new Router();
  app.use("/chat", router);
  router.get("/", chatController.getChat);
  router.get("/:id", chatController.getChat);
  router.post("/", chatController.create);
  router.put("/:id", chatController.update);
  router.delete("/:id", chatController.delete);
}