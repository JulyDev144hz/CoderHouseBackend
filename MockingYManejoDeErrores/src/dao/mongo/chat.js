const { Schema, model } = require("mongoose");

const collectionName = "chat";

const collectionSchema = new Schema({
  user: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const modelEntity = model(collectionName, collectionSchema);


class Chat {
  async getChat(id) {
    try {
      let response = id
        ? await modelEntity.findById(id)
        : await modelEntity.find({});
      return response;
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

  async socket(io, socket) {
    let chat = await this.getChat(null);
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

module.exports = {Chat, chatModel: modelEntity} ;
