const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.key;

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded) {
      // console.log(decoded)
      const role = decoded.role;
      const id = decoded._id;
      req.body.role = role;
      req.body.id = id;
      next();
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } else {
    res.send({ msg: "You are not authorized" });
  }
};

module.exports = 
  authMiddleware
