const userModel = require('../../../dao/mongo/user')
const faker = require("faker");
class User {
  async getUser(id, paginator = null, { query, sort }) {
    try {
      let response = id
        ? await userModel.findById(id)
        : await userModel.paginate(JSON.parse(query), {
            ...paginator,
            sort: JSON.parse(sort),
          });
      if (id) return response;

      let payload = response.docs;
      response.docs = undefined;
      return {
        status: payload.length > 0 ? "success" : "error",
        payload,
        ...response,
        prevLink: response.hasPrevPage
          ? `/user?page=${Number(paginator.page) - 1}`
          : null,
        nextLink: response.hasNextPage
          ? `/user?page=${Number(paginator.page) + 1}`
          : null,
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async uploadDocuments(){
    
  }
  async goToPremium(){
    
  }
  async bulk(cant) {
    try {
        for (let i = 0; i < cant; i++) {
          const user = {
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            email: faker.internet.email(),
            edad: faker.date.past(),
            isActive: faker.datatype.boolean(),
            photo: `https://robohash.org/${faker.random.number()}`,
          };
          await userModel.create(user);
        }
      return { res: true };
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(payload) {
    try {
      return await userModel.create(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload) {
    try {
      return await userModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await userModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email){
    return await userModel.findOne({
      email:email
    })
  }
}
module.exports = new User();