// Para darle vida a los componentes
const chatAPI = require("../components/chat");
const cartApi = require("../components/cart");
const productAPI = require("../components/product");
const userApi = require("../components/user");

module.exports = app => {
  chatAPI(app);
  productAPI(app);
  cartApi(app)
  userApi(app)
  app.get("/", (req, res, next)=> {
    res.render('index')
  });
  app.get("/chatView", (req, res, next)=> {
    res.render('chat')
  });
  
}