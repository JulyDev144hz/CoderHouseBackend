const { Schema, model } = require("mongoose");

const collectionName = "status";

const collectionSchema = new Schema({
  name: {
    type: String,
    enum: ['ACTIVE', 'FINALIZADO', 'CANCELADO', 'ORDERED'],
    default: 'ACTIVE',
    unique: true
  },
  description: String
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;