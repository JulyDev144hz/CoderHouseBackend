const CartDTO = require("../DTOs/carts.dto");
class cartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCart(id, paginator = null, { query, sort}) {
    return await this.dao.getCart(id,paginator,{query,sort})
  }

  async create(payload) {
    return await this.dao.create(new CartDTO(payload))
  }

  async update(id, payload) {
    return await this.dao.update(id, new CartDTO(payload))
  }
  async updateProducts(id, payload) {
    return await this.dao.updateProducts(id,payload)
  }

  async delete(id) {
   return await this.dao.delete(id)
  }
  async deleteProduct(cid, pid) {
    return await this.dao.delete(cid,pid)
  }
  async clearCart(cid){
    return await this.dao.clearCart(cid)
  }
  async updateCantProduct(cid, pid, cant) {
    return await this.dao.updateCantProduct(cid,pid,cant)
  }
  async addProduct(cid, pid) {
   return await this.dao.addProduct(cid,pid)
  }
}
module.exports = cartRepository