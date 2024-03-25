const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    confirmPassword: { type: String },
    phoneNumber: { type: Number },
    userId: { type: String },
    role: { type: String },
  },
  {
    version: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;