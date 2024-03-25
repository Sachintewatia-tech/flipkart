const cartsModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductModel");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  const {
    image1,
    image2,
    image4,
    image3,
    title,
    soldby,
    quantity,
    price,
    code,
    category,
  } = req.body;
  const productID = req.params.id;
  try {
    let product = await ProductModel.findById({ _id: productID });

    console.log(product);

    let cartItem = await cartsModel.findOne({
      user: req._id,
      product: productID,
    });
    if (!cartItem) {
      if (Check(product.quantity, quantity)) {
        return res.send({
          message: `Database hav only ${product.quantity} quantity left`,
        });
      } else {
        let cart = new cartsModel({
          product: product._id,
          user: req._id,
          quantity: product.quantity,

          image1: product.image1,
          image2: product.image2,
          image4: product.image3,
          title: product.title,
          soldby: product.soldby,

          price: product.price,
          code: product.code,
          category: product.category,
        });

        await cart.save();

        // await ProductModel.findByIdAndUpdate(
        //   { _id: productID },
        //   { $inc: { quantity: -1 } }
        // );

        return res.status(201).send({ message: "added to cart ", cart });

        return res.status(201).send(cart);
      }
    } else {
      if (!type) {
        return res.send("Type is missing");
      } else if (type === "asc") {
        if (Check(product.quantity, quantity)) {
          return res.send({
            message: `Database hav only ${product.quantity} quantity left`,
          });
        } else {
          let cart = await cartsModel.findOneAndUpdate(
            {
              product: productID,
            },
            {
              $inc: { quantity: 1 },
            }
          );
          await ProductModel.findByIdAndUpdate(
            { _id: productID },
            { $inc: { quantity: -1 } }
          );
          return res.send("Updated");
        }
      } else if (type === "desc") {
        if (cartItem.quantity == 1) {
          await ProductModel.findByIdAndUpdate(
            { _id: product._id },
            {
              $inc: { quantity: cartItem.quantity },
            }
          );
          await Cart.findOneAndDelete({ _id: cartItem._id });
          return res.send("Deleted Successfully by minus");
        } else {
          let cart = await cartsModel.findOneAndUpdate(
            {
              product: productID,
            },
            {
              $inc: { quantity: -1 },
            }
          );
          await ProductModel.findByIdAndUpdate(
            { _id: productID },
            { $inc: { quantity: 1 } }
          );
          return res.send({ message: "addedto cart", cart });
        }
      }
    }
  } catch (e) {
    return res.send(e.message);
  }
};

function Check(productQunatity, comingQuantity) {
  if (productQunatity < comingQuantity) {
    return true;
  } else {
    return false;
  }
}

const getcart = async (req, res) => {
  try {
    let cart = await cartsModel.find({ user: req._id });

    return res.send({ message: "product in cart", cart: cart });
  } catch (e) {
    return res.send(e.message);
  }
};

// const cartbyid = async (req, res) => {
//   try {
//     let cart = await cartsModel.find({ user: req._id });

//     return res.send({ message: "product in cart by id", cart: cart });
//   } catch (e) {
//     return res.send(e.message);
//   }
// };

const remove = async (req, res) => {
  const cartItemId = req.params.id;

  try {
    // Find the cart item by ID and delete it
    const deletedCartItem = await cartsModel.findByIdAndDelete(cartItemId);

    if (!deletedCartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    return res.status(200).send({ message: "Cart item deleted successfully" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { addToCart, remove, getcart};