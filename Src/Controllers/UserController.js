const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
require("dotenv").config();
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, email, password, confirmPassword, role, phoneNumber } =
    req.body;

  try {
    bcrypt.hash(password, 5, async (err, secured_password) => {
      if (err) {
        console.log(err);
        res.send({ msg: "registration failed" });
      } else {
        const checkuser = await UserModel.findOne({ phoneNumber });
        // console.log(checkuser);
        if (checkuser) {
          return res.send({
            msg: "Already registred user cant register again",
          });
        }

        const user = new UserModel({
          name,
          email,
          password: secured_password,
          confirmPassword: secured_password,
          phoneNumber,
          role,
        });
        // console.log(user);
        await user.save();
        //   console.log(user);
        const hashed_password = user.password;
        if (user) {
          bcrypt.compare(password, hashed_password, (err, result) => {
            if (result) {
              const token = jwt.sign(
                {
                  _id: user._id,
                  phoneNumber: user.phoneNumber,
                  role: user.role,
                  name: user.name,
                },
                process.env.key
              );
              res.send({
                msg: "Signup in success",
                token: token,
                user: user,
              });
            } else {
              res.send({ msg: "FAILED" });
            }
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    if (phoneNumber) {
      let user = await UserModel.findOne({ phoneNumber });
      if (user) {
        let token = jwt.sign(
          {
            _id: user._id,
            phoneNumber: user.phoneNumber,
          },
          process.env.key
        );
        return res
          .status(200)
          .json({ token, message: "Login Successfully", user });
      } else {
        res.send({ message: "registerd first" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getuser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    consoel.log(error);
  }
};

const removeuser = async (req, res) => {
  try {
    let user = await UserModel.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send({ msg: "deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, removeuser, getuser, login };