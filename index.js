const express = require("express");
const cors = require("cors");
const fs = require("fs");
const authController = require("./modules/auth/auth.controller");
const recipeController = require("./modules/recipe/recipe.controller");

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());

app.use("/auth", authController);
app.use("/recipe", recipeController);

app.post("/fav-recipe", (req, res) => {
  const data = fs.readFileSync("./favoriterecipe.json");
  const favrecipes = JSON.parse(data);
  favrecipes.push(req.body);
  const json = JSON.stringify(favrecipes);
  fs.writeFileSync("./favrecipes.json", json);
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

module.exports = app;
