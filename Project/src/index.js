const express = require("express");
const route = require("./routes");
const path = require("path");
const morgan = require("morgan");
const port = 3000;

const app = express();

// Connect to DB
const db = require("./config/db");
db.connect();
//test
//Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//HTTP logger
app.use(morgan("combined"));

//Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
