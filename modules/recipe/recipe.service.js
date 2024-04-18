const { log } = require("console");
const fs = require("fs");
const { jwtDecode } = require("jwt-decode");
const path = require("path");

const addRecipe = (req, res) => {
  const absolutePath = path.resolve("data", "recipe.json");
  const stats = fs.statSync(absolutePath);

  if (stats.size === 0) {
    // file is empty
    fs.writeFileSync(
      absolutePath,
      JSON.stringify([{...req.body, recipeId: 1}])
    );
    res.status(201).send("added first recipe");
    return;
  }

  const data = fs.readFileSync(absolutePath); // Read the existing JSON file
  const recipes = JSON.parse(data); // Parse the JSON data into an object
  console.log(recipes);
  recipes.push({ ...req.body, recipeId: recipes.length + 1 });
  const json = JSON.stringify(recipes); // Stringify the object back into JSON
  console.log(json);
  fs.writeFileSync(absolutePath, json); // Write the JSON data to the file
  res.status(201).send("added recipe");
};

const markAsFavRecipe = (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decoded = jwtDecode(token);
  const user = req.user;
  console.log(user);

  const userEmail = user.email;
  console.log(userEmail);
  const recipeId = Number(req.params.recipeId);

  const absolutePath = path.resolve("data", "favoriterecipe.json");
  const stats = fs.statSync(absolutePath);

  if (stats.size === 0) {
    // file is empty
    fs.writeFileSync(
      absolutePath,
      JSON.stringify([{ email: userEmail, recipeIds: [recipeId] }])
    );
    res.send(200);
  }

  const favoriterecipes = fs.readFileSync(absolutePath);
  console.log(favoriterecipes);
  const parsedFavRecipes = JSON.parse(favoriterecipes);
  console.log(parsedFavRecipes);

  const particularUser = parsedFavRecipes.find(
    (obj) => obj.email === userEmail
  );

  const indexOfSingleObject = parsedFavRecipes.findIndex(
    (obj) => obj.email === userEmail
  );

  if (indexOfSingleObject === -1) {
    console.log("user not found");
    const obj = { email: userEmail, recipeIds: [recipeId] };
    parsedFavRecipes.push(obj);
  } else {
    // user found
    parsedFavRecipes[indexOfSingleObject];
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
  fs.writeFileSync(absolutePath, json);
  res.status(200).send("mark as favorite done");
};

module.exports = { addRecipe, markAsFavRecipe };
