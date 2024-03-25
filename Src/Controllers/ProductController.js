const mongoose = require("mongoose");
const ProductModel = require("../Models/ProductModel");

const getproduct = async (req, res) => {
  const { page = 1, limit = 20, category, input, priceSort } = req.query;

  try {
    if (priceSort && category) {
      if (priceSort === "asc") {
        let product = await ProductModel.find({ category })
          .sort({ price: 1 })
          .skip((page - 1).limit)
          .limit(limit);
        return res
          .status(200)
          .send({ message: "product according to assecending order", product });
      } else if (priceSort === "desc") {
        let product = await ProductModel.find({ category })
          .sort({ price: -1 })
          .skip((page - 1).limit)
          .limit(limit);
        return res
          .status(200)
          .send({ message: "product according to desending order", product });
      }
    } else if (input && category) {
      let temp = new RegExp(input, "i");
      let product = await ProductModel.find({ title: temp }).limit(limit);
      return res.status(200).send(product);
    } else if (category) {
      let product = await ProductModel.find({ category })
        .skip((page - 1) * limit)
        .limit(limit);
      return res.status(200).send(product);
    } else if (input) {
      let temp = new RegExp(input, "i");
      let product = await ProductModel.find({ title: temp }).limit(limit);
      return res.status(200).send(product);
    } else {
      let product = await ProductModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
      return res.status(200).send(product);
    }
  } catch (error) {
    return res.send(error.message);
  }
};

const create = async (req, res) => {
  const payload = req.body;

  try {
    let product = new ProductModel(payload);

    await product.save();
    return res
      .status(201)
      .send({ message: "product added succesfully", product });
  } catch (error) {
    console.log(error);
  }
};

const adminproducts = async (req, res) => {
  try {
    let product = await ProductModel.find();
    res.status(200).send(product);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getbyid = async (req, res) => {
  try {
    let product = await ProductModel.findById({ _id: req.params.id });
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    let product = await ProductModel.findByIdAndUpdate({ _id: req.params.id });

    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

const updateproduct = async (req, res) => {
  const payload = req.body;
  try {
    let product = await ProductModel.findByIdAndUpdate(
      { _id: req.params.id }.payload
    );

    return res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  getproduct,
  remove,
  updateproduct,
  adminproducts,
  getbyid,
};