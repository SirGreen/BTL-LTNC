const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Driver = require("./app/models/Driver");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./UserData");

async function initialize(
  passport,
  getAdminByAccount,
  getAdminById,
  getDriverByAccount,
  getDriverById
) {
  const authenticateAdmin = async (Account, Password, done) => {
    let user = await getAdminByAccount(Account);
    user = user.at(0);
    if (user == null) {
      return done(null, false, { message: "No account fount" });
    }
    try {
      if (await bcrypt.compare(Password, user.Password)) {
        const userJSON = JSON.stringify(user);
        localStorage.setItem("user", userJSON);
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  const authenticateDriver = async (Account, Password, done) => {
    let user = await getDriverByAccount(Account);
    user = user.at(0);
    if (user == null) {
      return done(null, false, { message: "No account fount" });
    }
    try {
      if (await bcrypt.compare(Password, user.Password)) {
        const userJSON = JSON.stringify(user);
        localStorage.setItem("user", userJSON);
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    "admin",
    new LocalStrategy(
      { usernameField: "Account", passwordField: "Password" },
      authenticateAdmin
    )
  );
  passport.use(
    "driver",
    new LocalStrategy(
      { usernameField: "Account", passwordField: "Password" },
      authenticateDriver
    )
  );
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser((id, done) => {
    // return done(null, getAdminById(id));

    const user = getAdminById(id);
    if (user == null) {
      user = getDriverById(id);
    }
    return done(null, user);
  });
}

module.exports = initialize;
