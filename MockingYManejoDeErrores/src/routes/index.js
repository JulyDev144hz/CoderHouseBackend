// Para darle vida a los componentes
const chatAPI = require("../components/chat");
const cartApi = require("../components/cart");
const productAPI = require("../components/product");
const userApi = require("../components/user");
const authAPI = require("../components/auth");
const ticketAPI = require("../components/ticket");

const { isAuth, isNotAuth, isNotAdmin } = require("../components/auth/middleware");

module.exports = (app) => {
  chatAPI(app);
  authAPI(app);
  productAPI(app);
  cartApi(app);
  userApi(app);
  ticketAPI(app);
  app.get("/",isAuth, (req, res, next) => {
    res.render("index", {user: req.session.user});
  });
  app.get("/faillogin", (req, res, next) => {
    res.redirect('/auth/login')
  });
  app.get("/chatView", isAuth, isNotAdmin, (req, res, next) => {
    res.render("chat", {user: req.session.user});
  });
};
