if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const route = require("./routes");
const path = require("path");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./UserData");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");

const app = express();

const adminController = require("./app/controllers/AdminController");
const driverController = require("./app/controllers/DriverController");

initializePassport(
  passport,
  (Account) => adminController.GetAdmin(Account),
  (id) => adminController.GetAdminById(id),
  (Account) => driverController.GetDriver(Account),
  (id) => driverController.GetDriverById(id)
);

app.set("view-engine", "ejs");
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Connect to DB
const db = require("./config/db");
const admin = require("./app/controllers/AdminController");
const { userInfo } = require("os");
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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

//API cho admin
app.get("/signin_admin", (req, res) => {
  //res.send('HI')
  res.render("signin_admin.ejs");
});

app.post("/register_admin", (req, res) => {
  adminController.AddAdmin(req.body.Account, req.body.Password);
  res.send(`Added ${req.body.Account}`);
});

// app.post("/sendform_admin", async (req, res) => {
//   let admin = await adminController.GetAdmin(req.body.Account);
//   if (admin.length == 0)
//     return res.render("signin_admin.ejs", {
//       messages: { error: "No Account found" },
//     });
//   admin = admin.at(0);
//   const isMatch = await bcrypt.compare(req.body.Password, admin.Password);
//   if (isMatch) {
//     const userJSON = JSON.stringify(admin);
//     localStorage.setItem("user", userJSON);
//     // res.json(userJSON);

//     const sessionId = crypto.randomUUID();
//     SESSIONS.set(sessionId, admin);
//     res
//       .cookie("sessonId", sessionId, {
//         secure: true,
//         httpOnly: true,
//         sameSite: "none",
//       })
//       .json(userJSON);
//     console.log("Logged in as " + admin);
//   } else {
//     res.render("signin_admin.ejs", {
//       messages: { error: "Wrong Password" },
//     });
//   }
// });

//API cho driver

app.post(
  "/signin_admin",
  passport.authenticate("admin", {
    successRedirect: "/admin",
    failureRedirect: "/signin_admin",
    failureFlash: true,
  })
);

app.get("/signin_driver", (req, res) => {
  //res.send('HI')
  res.render("signin_driver.ejs");
});

app.post(
  "/signin_driver",
  passport.authenticate("driver", {
    successRedirect: "/driver",
    failureRedirect: "/signin_driver",
    failureFlash: true,
  })
);

// app.post("/sendform_driver", async (req, res) => {
//   let driver = await driverController.GetDriver(req.body.Account);
//   if (driver.length == 0)
//     return res.render("signin_driver.ejs", {
//       messages: { error: "No Account found" },
//     });
//   driver = driver.at(0);
//   const isMatch = await bcrypt.compare(req.body.Password, driver.Password);
//   if (isMatch) {
//     const userJSON = JSON.stringify(driver);
//     localStorage.setItem("user", userJSON);
//     res.json(userJSON);
//   } else {
//     res.render("signin_driver.ejs", {
//       messages: { error: "Wrong Password" },
//     });
//   }
// });

app.get("/account", checkAuthenticated, (req, res) => {
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);
  res.render("account.ejs", {
    Name: storedUser.Account,
    Income: storedUser.Income,
  });
});

app.get("/driver", checkAuthenticated, (req, res) => res.render("driver.ejs"));

app.get("/account_driver", checkAuthenticated, (req, res) => {
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = JSON.parse(storedUserJSON);
  res.render("account_driver.ejs", {
    Name: storedUser.Name,
    Phone: storedUser.PhoneNumber,
    DrivingExperience: storedUser.DrivingExperience,
    Account: storedUser.Account,
    LiscenceNumber: storedUser.LiscenceNumber,
  });
});

//Render trang động
app.get("/driver_admin", checkAuthenticatedasAdmin, (req, res) => {
  let information = "";
  if (req.query.info) {
    information = JSON.parse(req.query.info);
  }
  res.render("driver_admin.ejs", { information });
});

app.get("/adminjourney", checkAuthenticatedasAdmin, (req, res) => {
  let information = "";
  if (req.query.info) {
    information = JSON.parse(req.query.info);
  }
  res.render("adminjourney.ejs", { information });
});

app.get("/car_admin", checkAuthenticatedasAdmin, (req, res) => {
  let information = "";
  if (req.query.info) {
    information = JSON.parse(req.query.info);
  }
  res.render("car_admin.ejs", { information });
});

app.get("/car1_admin", checkAuthenticatedasAdmin, (req, res) => {
  let information = "";
  if (req.query.info) {
    information = JSON.parse(req.query.info);
  }
  res.render("car1_admin.ejs", { information });
});

app.get("/truck_admin", checkAuthenticatedasAdmin, (req, res) => {
  res.render("truck_admin.ejs");
});

app.get("/truck1_admin", checkAuthenticatedasAdmin, (req, res) => {
  res.render("truck1_admin.ejs");
});

app.get("/coach_admin", checkAuthenticatedasAdmin, (req, res) => {
  res.render("coach_admin.ejs");
});

app.get("/coach1_admin", checkAuthenticatedasAdmin, (req, res) => {
  res.render("coach1_admin.ejs");
});

app.get("/driverjourney", checkAuthenticated, (req, res) => {
  res.render("driverjourney.ejs");
});

app.get("/test", (req, res) => {
  res.render("test.ejs");
});
app.get("/test2", (req, res) => {
  res.render("test2.ejs");
});

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.all("/admin/*", checkAuthenticatedasAdmin, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/admin", checkAuthenticatedasAdmin, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/journey/*", checkAuthenticated, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/driver/*", checkAuthenticated, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/car", checkAuthenticatedasAdmin, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/car/*", checkAuthenticatedasAdmin, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/truck", checkAuthenticatedasAdmin, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/truck/*", checkAuthenticatedasAdmin, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/coach/*", checkAuthenticatedasAdmin, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.all("/coach", checkAuthenticatedasAdmin, (req, res, next) => {
  // If user is authenticated, proceed to the next middleware
  next();
});

app.get("/curUser", checkAuthenticated, async (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user)
  } else {
    return res.send("Not Found");
  }
});

async function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

async function checkAuthenticatedasAdmin(req, res, next) {
  let user = await req.user;
  if (user != null) {
    if (user != null && req.isAuthenticated() && "Income" in user) {
      return next();
    }
  }

  res.redirect("/");
}

async function checkAuthenticatedasDriver(req, res, next) {
  let user = await req.user;
  if (user != null) {
    if (user != null && req.isAuthenticated() && !("Income" in user)) {
      return next();
    }
  }
  res.redirect("/");
}

//Route init
route(app);

port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
  console.log(`App listening on port http://localhost:${port}`);
});
