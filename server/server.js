const express = require('express');
const app = express();
const PORT = 3000
const cors = require('cors');

// middleware
app.use(express.json()); // req.body
app.use(cors());

// ROUTES \\
// register and login routes
app.use('/auth', require('./routes/jwtAuth'));

// dashboard route
app.use("/dashboard", require("./routes/dashboard"));


app.listen(PORT, () => console.log(`runnig on port: ${PORT}`));