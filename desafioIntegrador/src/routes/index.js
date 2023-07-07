// Para darle vida a los componentes
const chatAPI = require("../components/chat");
const productAPI = require("../components/product");
const chatService = require('../components/chat/services/chatService')
module.exports = app => {
  chatAPI(app);
  productAPI(app);
  app.get("/", (req, res, next)=> {
    res.render('index')
  });
  app.get("/chatView", (req, res, next)=> {
    res.render('chat')
  });
}