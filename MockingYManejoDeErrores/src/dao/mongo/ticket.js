const faker = require("faker");
const { Schema, model } = require("mongoose");

const collectionName = "ticket";
const mongoosePaginate = require("mongoose-paginate-v2");
const collectionSchema = new Schema({
  code: {
    type: String,
    default: faker.random.alpha(10),
  },
  purchase_datetime: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String, // solo el correo
  },
});
collectionSchema.plugin(mongoosePaginate);
const modelEntity = model(collectionName, collectionSchema);

module.exports =modelEntity;
