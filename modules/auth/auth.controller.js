const express = require("express");
const { signup, login } = require("./auth.service");
const authController = express.Router();

const jwt = require("jsonwebtoken");

const secretKey = "mysecret";

const getToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

authController.post(
  "/signup",
  (req, res, next) => {
    const payload = req.body;
    const token = getToken(payload, secretKey);
    res.send(token);
    next();
  },
  signup
);

authController.post(
  "/login",
  //   (req, res, next) => {
  //     const payload = req.body;
  //     console.log("payload", payload);
  //     const token = getToken(payload, secretKey);
  //     console.log("token", token);
  //     res.send({
  //       token,
  //     });
  //     next();
  //   },
  login
);

module.exports = authController;
