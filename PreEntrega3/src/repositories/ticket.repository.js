const ticketDTO = require("../DTOs/ticket.dto");
class ticketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async getTicket(id, paginator = null, { query, sort }) {
    return await this.dao.getTicket(id, paginator, { query, sort });
  }

  async create(payload) {
    return await this.dao.create(new ticketDTO(payload));
  }

  async update(id, payload) {
    return await this.dao.update(id, new ticketDTO(payload));
  }

  async delete(id) {
    return await this.dao.delete(id);
  }
}
module.exports = ticketRepository