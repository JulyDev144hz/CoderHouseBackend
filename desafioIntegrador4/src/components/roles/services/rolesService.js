const roleModel = require("../../../dao/mongo/role");
const { ROLES } = require("../../../utils/constants");

class Role {
    static instance
    static admin
    static premium
    static user
    static user
    constructor(){
        if(Role.instance)return Role.instance
        Role.instance = this
        this.setInitStatus()
    }
    async setInitStatus(){
        const _ROLES = await ROLES()
        Role.admin = _ROLES.ADMIN;
        Role.premium = _ROLES.PREMIUM;
        Role.user = _ROLES.USER;
        Role.company = _ROLES.COMPANY;
    }
  async get(id = null) {
    return id ? await roleModel.findById(id) : await roleModel.find({});
  }

  async create(payload) { 
    return await roleModel.create(payload);
  }
}

module.exports = new Role();