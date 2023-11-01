const { Router } = require("express");
const {isAuth} = require('../auth/middleware')
const ticketController = require("./controller/ticketController");
module.exports = app =>{
  const router = new Router();
  app.use("/api/user", router);
  router.get("/", ticketController.getTicket);
  router.get("/:id", ticketController.getTicket);
  router.post("/", ticketController.create);
  router.put("/:id", ticketController.update);
  router.delete("/:id", ticketController.delete);
  app.get("/buy", isAuth, ticketController.buy);
}