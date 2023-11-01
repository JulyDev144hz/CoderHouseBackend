const { Schema, model } = require("mongoose");

const collectionName = "roles";

const collectionSchema = new Schema({
    name: {
        type: String,
        enum: ['USER', 'PREMIUM', 'COMPANY', 'ADMIN'],
        default: 'ADMIN',
        unique: true
      },
      description: String
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;