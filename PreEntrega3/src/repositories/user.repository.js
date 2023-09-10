const userDTO = require("../DTOs/user.dto");
class userRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUser(id, paginator = null, { query, sort}) {
    return await this.dao.getUser(id, (paginator = null), { query, sort });
  }
  async bulk(cant) {
    return await this.dao.bulk(cant);
  }

  async create(payload) {
    return await this.dao.create(new userDTO(payload));
  }

  async update(id, payload) {
    return await this.dao.update(id, new userDTO(payload));
  }

  async delete(id) {
    return await this.dao.delete(id);
  }
}
module.exports = userRepository