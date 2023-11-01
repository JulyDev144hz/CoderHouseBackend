const { Schema, model } = require("mongoose");

const collectionName = "product";
const mongoosePaginate = require('mongoose-paginate-v2')

const collectionSchema = new Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
  owner:{
    type:String,
    default:"admin"
  },
  status: {
    type: Boolean,
    default: true
  },
  imagen: String,
});
collectionSchema.plugin(mongoosePaginate)
const modelEntity = model(collectionName, collectionSchema);


module.exports =  modelEntity;
