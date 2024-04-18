const fs = require("fs");
const jwt = require("jsonwebtoken");

const secretKey = "mysecret";

const getToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey);
  return token;
};

const signup = (req, res) => {
  const token = getToken(req.body, secretKey);
  const data = fs.readFileSync("./users.json"); // Read the existing JSON file
  const users = JSON.parse(data); // Parse the JSON data into an object
  users.push({ ...req.body, id: users.length + 1 });
  const json = JSON.stringify(users); // Stringify the object back into JSON
  fs.writeFileSync("./users.json", json); // Write the JSON data to the file
  res.status(201).send({
    message : "user created",
    token : token
  });
};

const login = (req, res) => {
  const { email, password } = req.body; // object
  const data = fs.readFileSync("./users.json"); // Read the existing JSON file
  const users = JSON.parse(data);
  const ans = users.find(
    (user) => user.email === email && user.password === password
  );
  if (ans) {
    const token = getToken(req.body, secretKey);
    console.log("user exists");
    res.status(200).send({
      message : "user logged in",
      token : token
    });
  } else {
    console.log("user does not exist");
    res.status(400).send("login credentials failed");
  }
};

module.exports = {
  signup,
  login,
  secretKey,
};
