const express = require("express");
const jwt = require("jsonwebtoken");

const { addRecipe, markAsFavRecipe, getFavRecipes, getAllRecipes } = require("./recipe.service");
const validateToken = require("../../middlewares/validateToken.js");

const recipeController = express.Router();

recipeController.use(validateToken);
recipeController.post("/add-recipe", addRecipe);
recipeController.post("/mark-as-fav-recipe/:recipeId", markAsFavRecipe);
recipeController.get("/get-fav-recipes", getFavRecipes)
recipeController.get("/get-all-recipes", getAllRecipes)

module.exports = recipeController;
