const productDTO = require("../DTOs/product.dto");
class productRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProduct(id, paginator = null, { query, sort }) {
    return await this.dao.getProduct(id, paginator, { query, sort });
  }
  async bulk(cant) {
    return await this.dao.bulk(cant);
  }

  async create(payload) {
    return await this.dao.create(new productDTO(payload));
  }

  async update(id, payload) {
    return await this.dao.update(id, new productDTO(payload));
  }

  async delete(id) {
    return await this.dao.delete(id);
  }
}
module.exports = productRepository