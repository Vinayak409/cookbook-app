const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
  const data = fs.readFileSync("./users.json"); // Read the existing JSON file
  const users = JSON.parse(data); // Parse the JSON data into an object
  users.push(req.body);
  const json = JSON.stringify(users); // Stringify the object back into JSON
  fs.writeFileSync("./users.json", json); // Write the JSON data to the file
  res.sendStatus(201);
});

app.post("/login", (req, res) => {
  // console.log(typeof req.body); // object
  const { email, password } = req.body; // object
  const data = fs.readFileSync("./users.json"); // Read the existing JSON file
  const users = JSON.parse(data);
  const ans = users.find(
    (user) => user.email === email && user.password === password
  );
  if (ans) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
