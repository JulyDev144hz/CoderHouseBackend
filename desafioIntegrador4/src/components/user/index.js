const { Router } = require("express");
const userController = require("./controller/userController");
const multer = require("../../utils/multer");
const {isAuth, isAdmin} = require('../auth/middleware')
module.exports = app =>{
  const router = new Router();
  app.use("/api/user", router);
  router.get("/", userController.getUser);
  router.get("/bulkcreate/:cant", userController.bulk);
  router.get("/:id", userController.getUser);
  router.post("/", userController.create);
  router.put("/:id", userController.update);
  router.delete("/:id", userController.delete);
  router.get("/borralo/hernan", userController.deleteOldUsers);

  //integradora 4

  /**
   * Estoy teniendo problemas con multer
   * me aparece en el controlador como que files es undefined y no se como solucionarlo
   */
  router.post("/:id/documents", isAuth, multer.array('documents', 3),userController.uploadDocuments);
  router.get("/premium/:id", userController.goToPremium);

  app.get("/formDocuments", (req,res,next)=>{
    res.render('formDocuments', {user: req.session.user})
  })

  app.get('/premium',isAuth,(req,res,next)=>{
    res.render("premium", {user:req.session.user})
  })

  app.get('/current', (req,res)=>{
    let response =  {...req.session.user}
    if(req.session.user.role == 'admin'){
      response = {...response, "AdminitrarProductos":"/products"}
    }

    res.json(response)
  })


  //vistas admin
  let routerAdmin = new Router();
  app.use("/admin", routerAdmin);
  routerAdmin.get('/viewUsers', isAdmin, userController.viewUsers)
}