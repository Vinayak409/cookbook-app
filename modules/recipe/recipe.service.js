const fs = require("fs")

const addRecipe = (req, res) => {
  const data = fs.readFileSync("./recipe.json"); // Read the existing JSON file
  const recipes = JSON.parse(data); // Parse the JSON data into an object
  recipes.push({ ...req.body, id: recipes.length + 1 });
  const json = JSON.stringify(recipes); // Stringify the object back into JSON
  fs.writeFileSync("./recipe.json", json); // Write the JSON data to the file
  res.sendStatus(201);
};

module.exports = {
  addRecipe,
};
