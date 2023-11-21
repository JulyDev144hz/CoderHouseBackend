const userService  =  require("../service/userService");
class User {
  async getUser(req, res, next) {
    try {
      const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
      let { id = null } = req.params;
      
      
      let response = await userService.getUser(
        id,
        { page, limit },
        { query, sort }
      );
      
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async viewUsers(req,res,next){
    const { page = 1, limit = 10, query = "{}", sort = "{}" } = req.query;
    let { id = null } = req.params;
    let response = await userService.getUser(
      id,
      { page, limit },
      { query, sort }
    );

    console.log(response)
    res.render('userPanel', {user:req.session.user, users:response})
  }

  async uploadDocuments(req,res,next){
    try {
      const {id} = req.params
      const files = req.files
      let response = userService.uploadDocuments(id, files)
      res.redirect(`/api/user/premium/${req.session.user._id}`)
    } catch (error) {
      next(error)
    }
  }
  async goToPremium(req,res,next){
    try {
      const {id} = req.params
      let response = await userService.goToPremium(id)
      console.log(response)
      if (response =="Ya eres premium, felicitaciones"){
        req.session.user.role = "PREMIUM"
      }
      res.redirect("/auth/dashBoard")
    } catch (error) {
      next(error)
    }
  }
  async bulk(req, res, next) {
    try {
      let { cant = 10 } = req.params;
      let response = await userService.bulk(Number(cant));
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async create(req, res, next) {
    try {
      let payload = req.body;
      //tdd
      if (
        !payload.nombre &&
        !payload.apellido &&
        !payload.email &&
        !payload.edad &&
        !payload.role
      )
        return res.json({ ERROR: "Parametros incorrectos para crear usuario" });

      let response = await userService.create(payload);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async update(req, res, next) {
    try {
      let { id } = req.params;
      let payload = req.body;
      let response = await userService.update(id, payload);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async delete(req, res, next) {
    try {
      let { id } = req.params;
      let response = await userService.delete(id);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async deleteOldUsers(req,res,next){


    let response = await userService.get()
    response.map(async u=>{
      if (!(( Date.now() - u.last_connection )/1000 /60 /60 /24 < 2)){
        await userService.delete(u.id)
      }
    })
    res.json({"mensaje":"Usuarios con una conexion mayor a "})
  }
}

module.exports = new User();
