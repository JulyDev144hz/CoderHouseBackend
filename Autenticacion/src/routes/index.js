// Para darle vida a los componentes
const chatAPI = require("../components/chat");
const cartApi = require("../components/cart");
const productAPI = require("../components/product");
const userApi = require("../components/user");
const authAPI = require("../components/auth");

const { isAuth, isNotAuth } = require("../components/auth/middleware");

module.exports = (app) => {
  chatAPI(app);
  authAPI(app);
  productAPI(app);
  cartApi(app);
  userApi(app);
  app.get("/",isAuth, (req, res, next) => {
    res.render("index", {user: req.session.user});
  });
  app.get("/chatView", (req, res, next) => {
    res.render("chat");
  });
};
