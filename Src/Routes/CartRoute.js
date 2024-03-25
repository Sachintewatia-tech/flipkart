const { Router } = require("express");
const { addToCart, remove, getcart ,cartbyid} = require("../Controllers/CartController");
const  authMiddleware=require("../MiddleWare/auth.middleware")
const CartRouter = Router();

CartRouter.post("/:id",authMiddleware, addToCart);
CartRouter.delete("/:id", authMiddleware,remove);
CartRouter.get("/", authMiddleware, getcart);
CartRouter.get("/:id")

module.exports = CartRouter;