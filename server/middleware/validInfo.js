module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  // checking to see if user is sending valid details to our register and login routes
  function validEmail(userEmail) {
    // check if email is valid or not
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    // check if we have empty values becuase we don't want to have empty values in our application. if there is empty value we throw an error
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  // once everything is complete it's going to continue to the next route
  next();
};
