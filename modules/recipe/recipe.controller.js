const express = require("express");
const { addRecipe } = require("./recipe.service");
const recipeController = express.Router();

const jwt = require("jsonwebtoken");

const secretKey = "mysecret";

recipeController.post(
  "/add-recipe",
  (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
      } else {
        console.log("Decoded token : ", decoded);
        next();
      }
    });
  },
  addRecipe
);

module.exports = recipeController;
