const { Schema, model } = require("mongoose");

const collectionName = "cart";
const mongoosePaginate = require("mongoose-paginate-v2");
const collectionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        cant:{
          type:Number,
          default:1
        }
      },
    ],
    default: [],
  },
});
collectionSchema.plugin(mongoosePaginate);
const modelEntity = model(collectionName, collectionSchema);



module.exports = modelEntity;

