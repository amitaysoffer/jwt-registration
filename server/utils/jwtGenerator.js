const jwt = require("jsonwebtoken");
require("dotenv").config();

//Look at file server/routes/dashboard.js to see the change code for this code
// the jwt token gives the user access to acces our private routes withing out application.
// 

// take the user id, then we create a pay and then we sign it. 
function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  };

  // here we return 
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
