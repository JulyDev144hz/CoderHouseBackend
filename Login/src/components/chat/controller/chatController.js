
const chatService = require("../services/chatService");

class Chat {
  async getChat(req, res, next){
    let { id = null } = req.params;
    let response = await chatService.getChat(id);
    res.json(response);
  }

  async create(req, res, next){
    let payload = req.body;
    let response = await chatService.update(payload);
    res.json(response);
  }

  async update(req, res, next){
    let { id } = req.params;
    let payload = req.body;
    let response = await chatService.update(id, payload);
    res.json(response);
  }

  async delete(req, res, next){
    let { id } = req.params;
    let response = await chatService.delete(id);
    res.json(response);
  }

}

module.exports = new Chat();