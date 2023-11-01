const ChatDTO = require("../DTOs/chat.dto");
class chatRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getChat(id) {
    return await this.dao.getChat(id)
  }

  async create(payload) {
    return await this.dao.create(new ChatDTO(payload))
  }

  async update(id, payload) {
   return await this.dao.update(id, new ChatDTO(payload))
  }

  async delete(id) {
   return await this.dao.delete(id)
  }

  async socket(io, socket) {
   return await this.dao.socket(io,socket)
  }
}
module.exports = chatRepository