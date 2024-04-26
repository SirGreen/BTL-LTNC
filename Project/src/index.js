const express = require("express");
const route = require("./routes");
const path = require("path");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./UserData");
const port = 3000;

const app = express();

const adminController = require("./app/controllers/AdminController");
const driverController = require("./app/controllers/DriverController");

app.set("view-engine", "ejs");
// Connect to DB
const db = require("./config/db");
const admin = require("./app/controllers/AdminController");
db.connect();
//test
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

//API cho admin
app.get("/signin_admin", (req, res) => {
  //res.send('HI')
  res.render("signin_admin.ejs", { messages: { error: "" } });
});

app.post("/register_admin", (req, res) => {
  adminController.AddAdmin(req.body.Account, req.body.Password);
  res.send(`Added ${req.body.Account}`);
});

app.post("/sendform_admin", async (req, res) => {
  let admin = await adminController.GetAdmin(req.body.Account);
  if (admin.length == 0)
    return res.render("signin_admin.ejs", {
      messages: { error: "No Account found" },
    });
  admin = admin.at(0);
  const isMatch = await bcrypt.compare(req.body.Password, admin.Password);
  if (isMatch) {
    const userJSON = JSON.stringify(admin);
    localStorage.setItem("user", userJSON);
    res.redirect("admin.html");
  } else {
    res.render("signin_admin.ejs", {
      messages: { error: "Wrong Password" },
    });
  }
});

//API cho driver
app.get("/signin_driver", (req, res) => {
  //res.send('HI')
  res.render("signin_driver.ejs", { messages: { error: "" } });
});

app.post("/sendform_driver", async (req, res) => {
  let driver = await driverController.GetDriver(req.body.Account);
  if (driver.length == 0)
    res.render("signin_driver.ejs", {
      messages: { error: "No Account found" },
    });
  driver = driver.at(0);
  const isMatch = await bcrypt.compare(req.body.Password, driver.Password);
  if (isMatch) {
    const userJSON = JSON.stringify(driver);
    localStorage.setItem("user", userJSON);
    res.redirect("driver.html");
  } else {
    res.render("signin_driver.ejs", {
      messages: { error: "Wrong Password" },
    });
  }
});

app.get("/account", (req, res) => {
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);
  res.render("account.ejs", { Name: storedUser.Account });
});

app.get("/account_driver", (req, res) => {
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);
  res.render("account_driver.ejs", {
    Name: storedUser.Name,
    Phone: storedUser.PhoneNumber,
    Address: storedUser.Address,
    Account: storedUser.Account,
  });
});

//Render trang động
app.get("/driver_admin", (req, res) => {
  let information =""
  if (req.query.info) {
    information = JSON.parse(req.query.info);
  }
  res.render("driver_admin.ejs", { information });
});

app.get("/adminjourney", (req, res) => {
  let information =""
  if (req.query.info) {
    information = JSON.parse(req.query.info);
  }
  res.render("adminjourney.ejs", { information });
});

app.get("/car_admin", (req, res) => { 
  let information =""
  if (req.query.info) {
    information = JSON.parse(req.query.info);
  } 
  res.render("car_admin.ejs", {information});
});

app.get("/truck_admin", (req, res) => {
  res.render("truck_admin.ejs");
});

app.get("/coach_admin", (req, res) => {
  res.render("coach_admin.ejs");
});

app.get("/driverjourney", (req, res) => {
  res.render("driverjourney.ejs");
});

app.get("/test", (req, res) => {
  res.render("test.ejs");
});
app.get("/test2", (req, res) => {
  res.render("test2.ejs");
});
//Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
