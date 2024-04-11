const express = require("express");
const route = require("./routes");
const path = require("path");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const port = 3000;

const app = express();

const adminController = require("./app/controllers/AdminController");

app.set("view-engine", "ejs");
// Connect to DB
const db = require("./config/db");
const admin = require("./app/controllers/AdminController");
db.connect();

//Middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

let htmlPath = path.join(__dirname, "resources");
app.use(express.static(htmlPath));

//HTTP logger
app.use(morgan("combined"));

app.get("/login_admin", (req, res) => {
  //res.send('HI')
  res.render("login_admin.ejs", { messages: { error: "" } });
});

app.post("/register_admin", (req, res) => {
  adminController.AddAdmin(req.body.Account, req.body.Password);
  res.send(`Added ${req.body.Account}`);
});

app.post("/sendform_admin", async (req, res) => {
  let admin = await adminController.GetAdmin(req.body.Account);
  if (admin.length == 0)
    res.render("login_admin.ejs", {
      messages: { error: "No Account found" },
    });
  admin = admin.at(0);
  const isMatch = await bcrypt.compare(req.body.Password, admin.Password);
  if (isMatch) {
    res.redirect("admin.html");
  } else {
    res.render("login_admin.ejs", {
      messages: { error: "Wrong Password" },
    });
  }
});

//Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
