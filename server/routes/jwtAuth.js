const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

// registration route
router.post("/register", validInfo, async (req, res) => {
  // desctocture the req.body
  const { email, name, password } = req.body;

  try {

    // check if user exists in the db
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exists!");
    }

    // Bcrypt user password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // insert the new user inside the database
    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );


    // res.json(newUser.rows[0]);

    // generate the jwt token
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// login route

router.post("/login", validInfo, async (req, res) => {
  // destrcuture req.body
  const { email, password } = req.body;

  try {
    // check if user exist, and if not we throw an error
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Email or Password is incorrect");
    }

    // check if incoming password is the same as database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Email or Password is incorrect");
    }

    // // give them the jwt token
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// check the jwt token is valid on every refresh
router.get('/is-verify', authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
