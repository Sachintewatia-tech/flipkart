const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image1: { type: String },
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    title: { type: String },
    soldby: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    code: { type: String },
    category: { type: String },
  },
  {
    versionkey: false,
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;