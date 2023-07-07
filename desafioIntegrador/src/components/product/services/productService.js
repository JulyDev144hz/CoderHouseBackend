
const productModel = require("../../../models/mongo/product");
class Product {
  async getProduct(id){
    try {
      let response = id
        ? await productModel.findById(id)
        : await productModel.find({});
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(payload){
    try {
      return await productModel.create(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload){
    try {
      return await productModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id){
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Product();