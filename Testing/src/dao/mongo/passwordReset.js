const { Schema, model } = require("mongoose");

const collectionName = "passwordResets";
const mongoosePaginate = require('mongoose-paginate-v2')
const collectionSchema = new Schema({
  email: {
    unique: true,
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required:true
  },
  createdAt:{
    type:Date,
    Default:Date.now()
  },
  updatedAt:{
    type:Date,
    Default:null
  },
  deletedAt:{
    type:Date,
    Default:null
  },
  
});
collectionSchema.plugin(mongoosePaginate)
const modelEntity = model(collectionName, collectionSchema);


module.exports = modelEntity;

