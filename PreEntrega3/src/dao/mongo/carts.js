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

const faker = require("faker");
class Cart {
  async getCart(id, paginator = null, { query = "{}", sort = "{}" }) {
    try {
      let response = id
        ? await modelEntity.paginate(
            {_id:id, ...JSON.parse(query)},
            {
              ...paginator,
              sort: JSON.parse(sort),
              populate: ["products.product", "user"],
            }
          )
        : await modelEntity.paginate(JSON.parse(query), {
            ...paginator,
            sort: JSON.parse(sort),
            populate: ["products.product", "user"],
          });
      // if (id) {
      //   return response;
      // }

      let payload = response.docs;
      let status;
      if (payload) {
        status = payload.length > 0 ? "success" : "error";
      } else {
        status = "error";
      }
      response.docs = undefined;
      return {
        status: status,
        payload,
        ...response,
        prevLink: response.hasPrevPage
          ? `/cart?page=${Number(paginator.page) - 1}`
          : null,
        nextLink: response.hasNextPage
          ? `/cart?page=${Number(paginator.page) + 1}`
          : null,
      };
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
  async updateProducts(id, payload) {
    try {
      return await modelEntity.findByIdAndUpdate(
        id,
        { products: payload },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await modelEntity.findByIdAndUpdate(id, { products: [] });
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(cid, pid) {
    try {
      let resp = await modelEntity.findById(cid);
      let newData = resp.products.filter((p) => p.product != pid);
      return await modelEntity.findByIdAndUpdate(cid, { products: newData });
    } catch (error) {
      console.log(error);
    }
  }
  async updateCantProduct(cid, pid, cant) {
    try {
      let resp = await modelEntity.findById(cid);
      let p = resp.products.find((x) => x.product == pid);
      resp.products[resp.products.indexOf(p)].cant = cant;

      return await modelEntity.findByIdAndUpdate(cid, resp);
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(cid, pid) {
    try {
      let resp = await modelEntity.findById(cid);

      resp.products.push({ product: pid });
      return await modelEntity.findByIdAndUpdate(cid, resp);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {Cart, cartModel:modelEntity};

