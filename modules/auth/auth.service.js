const { error } = require("console");
const fs = require("fs");

const signup = (req, res) => {
  const data = fs.readFileSync("./users.json"); // Read the existing JSON file
  const users = JSON.parse(data); // Parse the JSON data into an object
  users.push({ ...req.body, id: users.length + 1 });
  const json = JSON.stringify(users); // Stringify the object back into JSON
  fs.writeFileSync("./users.json", json); // Write the JSON data to the file
  res.sendStatus(201);
};

const login = (req, res) => {
  // console.log(typeof req.body); // object
  const { email, password } = req.body; // object
  const data = fs.readFileSync("./users.json"); // Read the existing JSON file
  const users = JSON.parse(data);
  const ans = users.find(
    (user) => user.email === email && user.password === password
  );
  if (ans) {
    console.log("user exists");
    res.send("from service");
  } else {
    console.log("user does not exist");
    res.sendStatus(400);
  }
};

module.exports = {
  signup,
  login,
};
