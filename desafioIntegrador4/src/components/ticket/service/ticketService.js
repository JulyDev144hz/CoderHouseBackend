const modelEntity = require('../../../dao/mongo/ticket')
class Ticket {

    async getTicket(id, paginator = null, { query, sort }) {
      try {
        let response = id
          ? await modelEntity.findById(id)
          : await modelEntity.paginate(JSON.parse(query), {
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
            ? `/tickets?page=${Number(paginator.page) - 1}`
            : null,
          nextLink: response.hasNextPage
            ? `/tickets?page=${Number(response.page) + 1}`
            : null,
        };
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    
  
    async create(payload) {
      try {
        return await modelEntity.create(payload);
      } catch (error) {
        console.log(error);
      }
    }
  
    async update(id, payload) {
      try {
        return await modelEntity.findByIdAndUpdate(id, payload, { new: true });
      } catch (error) {
        console.log(error);
      }
    }
  
    async delete(id) {
      try {
        return await modelEntity.findByIdAndDelete(id);
      } catch (error) {
        console.log(error);
      }
    }
  }

  module.exports = Ticket