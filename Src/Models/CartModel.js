const mongoose = require("mongoose");

const cartsSchema = mongoose.Schema(
  {
    image1: { type: String },
    image2: { type: String },
    image4: { type: String },
    title: { type: String },
    soldby: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    code: { type: String },
    category: { type: String },
  },
  {
    versionKey: false,
  }
);

const cartsModel = mongoose.model("Cartdata", cartsSchema);

module.exports = cartsModel;