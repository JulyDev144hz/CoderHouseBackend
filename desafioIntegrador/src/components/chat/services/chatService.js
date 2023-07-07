const chatModel = require("../../../models/mongo/chat");

class Chat {
  async getChat(id) {
    try {
      let response = id
        ? await chatModel.findById(id)
        : await chatModel.find({});
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(payload) {
    try {
      return await chatModel.create(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, payload) {
    try {
      return await chatModel.findByIdAndUpdate(id, payload, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await chatModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async socket(io, socket) {
    let chat = await this.getChat(null);
    console.log(chat)
    socket.emit("loadMessages", chat);

    socket.on("newMessage", (e) => {
      this.create({
        user:e.user,
        message:e.message
      })

      io.sockets.emit('newMessage', e)
    });
  }
}

module.exports = new Chat();
