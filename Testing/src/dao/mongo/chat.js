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


module.exports = modelEntity ;
