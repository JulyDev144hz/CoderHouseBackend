const { chatService } = require("../../../repositories/index");

class Chat {
  async getChat(req, res, next) {
    try {
      let { id = null } = req.params;
      let response = await chatService.getChat(id);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async create(req, res, next) {
    try {
      let payload = req.body;
      let response = await chatService.update(payload);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async update(req, res, next) {
    try {
      let { id } = req.params;
      let payload = req.body;
      let response = await chatService.update(id, payload);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }

  async delete(req, res, next) {
    try {
      let { id } = req.params;
      let response = await chatService.delete(id);
      res.json(response);
    } catch (error) {
      req.logger.error(error);
    }
  }
}

module.exports = new Chat();
