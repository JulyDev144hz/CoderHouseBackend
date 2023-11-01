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

  async uploadDocuments(req,res,next){
    try {
      const {id} = req.params
      const files = req.files
      let response = userService.uploadDocuments(id, files)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
  async goToPremium(req,res,next){
    try {
      const {id} = req.params
      let response = userService.goToPremium(id)
      res.json(response)
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
}

module.exports = new User();
