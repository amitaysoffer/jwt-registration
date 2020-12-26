const jwt = require("jsonwebtoken");
require("dotenv").config();

// this middleware takes the jwt token from the fetch header and checks if it is valid BEFORE the private routes (register and login) kicks in.
// will only continue on if the token is inside the local storage

module.exports = function (req, res, next) {
  // Get token from header
  const jwtToken = req.header("token");

  // Check if not token
  if (!jwtToken) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    // it is going to give us the user id (user:{id: user.id})
    const verify = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
