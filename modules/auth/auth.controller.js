const express = require("express");
const jwt = require("jsonwebtoken");
const { signup, login } = require("./auth.service.js");
const authController = express.Router();

authController.post("/signup", signup);
authController.post("/login", login);

module.exports = authController;
