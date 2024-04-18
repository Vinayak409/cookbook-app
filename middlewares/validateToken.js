const jwt = require("jsonwebtoken");
const { secretKey } = require("../modules/auth/auth.service");

const validateToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
    } else {
      console.log("Decoded token : ", decoded);
      req.user = {
        email: decoded.email,
        password: decoded.password,
      };
      // res.sendStatus(200).send("From middleware");
      //   res.send("token verified");
      next();
    }
  });
};

module.exports = validateToken;
