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
    req.logger.debug('Imprimiendo desde el logger')
    res.render("index", {user: req.session.user});
  });
  app.get("/faillogin", (req, res, next) => {
    res.redirect('/auth/login')
  });
  app.get("/chatView", isAuth, isNotAdmin, (req, res, next) => {
    res.render("chat", {user: req.session.user});
  });
  app.get('/loggerTest',(req,res,next)=>{
    req.logger.error('Prueba error')
    req.logger.warn('Prueba warn')
    req.logger.info('Prueba info')
    req.logger.http('Prueba http')
    req.logger.verbose('Prueba verbose')
    req.logger.debug('Prueba debug')
    req.logger.silly('Prueba silly')

    res.send('/loggerTest hecho')
  })
  app.all('*',(req,res,next)=>{
    req.logger.error('404 not found!')
    res.send('Este request no existe')
  })
};
