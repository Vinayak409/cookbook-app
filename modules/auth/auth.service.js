const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path")

const secretKey = "mysecret";

const getToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey);
  return token;
};

const signup = (req, res) => {

  const absolutePath = path.resolve('data', 'users.json')
  const stats = fs.statSync(absolutePath);

  if (stats.size === 0) {
    // file is empty
    const token = getToken(req.body, secretKey);
    fs.writeFileSync(
      absolutePath,
      JSON.stringify([req.body])
    );
    res.status(201).send({
      message : "first user created",
      token : token
    });
    return;
  }
  
  const data = fs.readFileSync(absolutePath); // Read the existing JSON file
  const users = JSON.parse(data); // Parse the JSON data into an object
  const newUser = { ...req.body }

  if(users.find((obj) => obj.email === newUser.email && obj.password === newUser.password)){
    res.status(200).send({
      message : "user already exists"
    })
    return;
  }


  users.push(newUser);
  const token = getToken(newUser, secretKey);
  const json = JSON.stringify(users); // Stringify the object back into JSON
  fs.writeFileSync(absolutePath, json); // Write the JSON data to the file
  res.status(201).send({
    message : "user created",
    token : token
  });
};

const login = (req, res) => {
  const { email, password } = req.body; // object
  const absolutePath = path.resolve('data', 'users.json')
  const data = fs.readFileSync(absolutePath); // Read the existing JSON file
  const users = JSON.parse(data);
  const ans = users.find(
    (user) => user.email === email && user.password === password
  );
  console.log(ans);
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
