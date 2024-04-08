const adminRouter = require("./admin");
const homeRouter = require("./home");
const transportationRouter = require("./transportation");

function route(app) {
  app.use("/transportation", transportationRouter);

  app.use("/admin", adminRouter);

  app.use("/", homeRouter);
}

module.exports = route;
