const { Router } = require("express");
const authController = require("./controller/authController");
const { isAuth, isNotAuth } = require("./middleware");

module.exports = (app) => {
  const router = new Router();
  app.use("/auth", router);
  //   router.get("/session", authController.session);
  router.get("/login", isNotAuth, authController.loginView);
  router.get("/register", isNotAuth, authController.registerView);
  router.get('/logout', authController.logout)
  router.post("/login", authController.login);
  router.post("/register", authController.register);
  router.get("/dashboard", isAuth, authController.dashboardView);
  
  //   router.get("/:id", authController.getCookies);
};
