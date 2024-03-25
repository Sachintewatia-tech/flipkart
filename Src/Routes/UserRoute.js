const { Router } = require("express");
const {
  register,
  removeuser,
  getuser,
  login,
} = require("../Controllers/UserController");
const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.delete("/:id", removeuser);
userRouter.get("/allusers", getuser);

module.exports = userRouter;