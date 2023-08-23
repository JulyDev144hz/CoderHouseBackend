const faker = require("faker");
const productModel = require("../../../models/mongo/product");
class Product {
  async getProduct(id, paginator = null, {query, sort}) {
    try {
      let response = id
        ? await productModel.findById(id)
        : await productModel
            .paginate(JSON.parse(query), { ...paginator, sort:JSON.parse(sort) });
      if(id) return response;
      
      let payload = response.docs;
      response.docs = undefined;
      return {
        status: payload.length > 0 ? "success" : "error",
        payload,
        ...response,
        prevLink: response.hasPrevPage
          ? `/products?page=${Number(paginator.page) - 1}`
          : null,
        nextLink: response.hasNextPage
          ? `/products?page=${Number(paginator.page) + 1}`
          : null,
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async bulk(cant) {
    try {
      for (let i = 0; i < cant; i++) {
        const product = {
          nombre: faker.commerce.productName(),
          descripcion: faker.commerce.productDescription(),
          precio: faker.commerce.price(),
          stock: faker.datatype.number({ min: 0, max: 200 }),
          status: faker.datatype.boolean(),
          imagen: faker.image.lorempicsum.imageUrl(),
        };
        await productModel.create(product);
      }
      return { res: true };
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(payload) {
    try {
      return await productModel.create(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload) {
    try {
      return await productModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Product();
