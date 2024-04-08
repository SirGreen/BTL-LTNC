const adminRouter = require("./admin");
const homeRouter = require("./home");
const journeyRouter = require("./journey");

function route(app) {
  app.use("/admin", adminRouter);

  app.use("/journey", journeyRouter);

  app.use("/", homeRouter);
}

module.exports = route;
