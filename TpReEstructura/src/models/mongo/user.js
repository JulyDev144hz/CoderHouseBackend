const { Schema, model } = require("mongoose");

const collectionName = "user";
const mongoosePaginate = require('mongoose-paginate-v2')
const collectionSchema = new Schema({
  nombre: String,
  apellido: String,
  email: {
    unique: true,
    type: String,
    required: true
  },
  password: String,
  edad: {
    type: Date,
    default: Date.now()
  },
  Cart:{
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  isActive: {
    type: Boolean,
    default: true
  },
  photo: String,
  role: {
    type:String,
    enum:['admin','operation','content','user'],
    default:'operation'
  },
});
collectionSchema.plugin(mongoosePaginate)
const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;