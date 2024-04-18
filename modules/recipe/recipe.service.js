const { log } = require("console");
const fs = require("fs");
const { jwtDecode } = require("jwt-decode");

const addRecipe = (req, res) => {
  console.log("recipe service");
  const data = fs.readFileSync("./recipe.json"); // Read the existing JSON file
  const recipes = JSON.parse(data); // Parse the JSON data into an object
  console.log(recipes);
  recipes.push({ ...req.body, id: recipes.length + 1 });
  const json = JSON.stringify(recipes); // Stringify the object back into JSON
  console.log(json);
  fs.writeFileSync("./recipe.json", json); // Write the JSON data to the file
  res.status(201).send("added recipe");
};

const markAsFavRecipe = (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decoded = jwtDecode(token);
  const user = req.user;

  const userId = user.userId;
  const recipeId = Number(req.params.recipeId);

  const favoriterecipes = fs.readFileSync("./favoriterecipe.json");
  const parsedFavRecipes = JSON.parse(favoriterecipes);

  const particularUser = parsedFavRecipes.find((obj) => obj.userId === userId);

  const indexOfSingleObject = parsedFavRecipes.findIndex(
    (obj) => obj.userId === userId
  );

  if (indexOfSingleObject === -1) {
    console.log("user not found");
  } else {
    // user found
    parsedFavRecipes[indexOfSingleObject]
    const userFavRecipies = parsedFavRecipes[indexOfSingleObject]?.recipeIds;
    
    if (userFavRecipies.includes(recipeId)) {
      // delete recipeId if found 
      const recipeIdToRemove = userFavRecipies.indexOf(recipeId);

      if (recipeIdToRemove !== -1) {
        userFavRecipies.splice(recipeIdToRemove, 1);
      }
    } else {
      // add recipeId if not found before 
      userFavRecipies.push(recipeId);
      const newObj = { ...particularUser, recipeIds: userFavRecipies };
      parsedFavRecipes.splice(indexOfSingleObject, 1);
      parsedFavRecipes.splice(indexOfSingleObject, 0, newObj);
    }
  }

  const json = JSON.stringify(parsedFavRecipes);
  fs.writeFileSync("./favoriterecipe.json", json);
  res.status(200).send("mark as favorite done");
};

module.exports = { addRecipe, markAsFavRecipe };