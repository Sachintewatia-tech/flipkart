const { Router } = require("express");
const {
  create,
  getproduct,
  remove,
  updateproduct,
  adminproducts,
  getbyid,
} = require("../Controllers/ProductController");
const  authMiddleware=require("../MiddleWare/auth.middleware")

const productRouter = Router();

productRouter.get("/", getproduct);
productRouter.get("/alladminproduct", authMiddleware,adminproducts);
productRouter.get("/:id", authMiddleware,getbyid);
productRouter.post("/add", authMiddleware,create);
productRouter.delete("/:id",authMiddleware, remove);
productRouter.patch("/:id", authMiddleware,updateproduct);
module.exports = productRouter;