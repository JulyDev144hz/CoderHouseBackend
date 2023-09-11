
const {userService} = require("../../../repositories/index");
class User {
  async getUser(req, res, next){
    const {page = 1, limit = 10, query = "{}", sort = "{}"} = req.query;
    let { id = null } = req.params; 
    let response = await userService.getUser(id, {page, limit}, {query, sort});
    res.json(response);
  }
  async bulk(req, res, next){

    let { cant = 10 } = req.params;
    let response = await userService.bulk(Number(cant));
    res.json(response);
  }

  async create(req, res, next){
    let payload = req.body;
    //tdd
    if(!payload.nombre && !payload.apellido && 
        !payload.email && !payload.edad &&
        !payload.role
      ) return res.json({ERROR:"Parametros incorrectos para crear usuario"})

    let response = await userService.create(payload);
    res.json(response);
  }

  async update(req, res, next){
    let { id } = req.params;
    let payload = req.body;
    let response = await userService.update(id, payload);
    res.json(response);
  }

  async delete(req, res, next){
    let { id } = req.params;
    let response = await userService.delete(id);
    res.json(response);
  }
}

module.exports = new User();