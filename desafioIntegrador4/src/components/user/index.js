const { Router } = require("express");
const userController = require("./controller/userController");
const multer = require("../../utils/multer");
const {isAuth} = require('../auth/middleware/index')
module.exports = app =>{
  const router = new Router();
  app.use("/api/user", router);
  router.get("/", userController.getUser);
  router.get("/bulkcreate/:cant", userController.bulk);
  router.get("/:id", userController.getUser);
  router.post("/", userController.create);
  router.put("/:id", userController.update);
  router.delete("/:id", userController.delete);

  //integradora 4
  router.post("/:id(\\d+)/documents", isAuth, multer.array('documents', 3),userController.uploadDocuments);
  router.put("/premium/:id(\\d+)", userController.goToPremium);

  app.get('/current', (req,res)=>{
    let response =  {...req.session.user}
    if(req.session.user.role == 'admin'){
      response = {...response, "AdminitrarProductos":"/products"}
    }

    res.json(response)
  })
}