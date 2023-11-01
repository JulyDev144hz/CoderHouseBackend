const rolesServices = require("../services/rolesService");

class Role {

  async get(req, res, next) {
    try {
      const { id } = req.params;
      const response = await rolesServices.get(id);
      res.json(response);
    } catch (error) {
      next(error);
    }

  }

  async getAll(req, res, next) {
    console.log("Entrando!!");
    try {
      const response = await rolesServices.get();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await rolesServices.create(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Role();