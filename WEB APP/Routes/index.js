const { UserRoutes } = require("./UserRoutes");
const { ProductTypeRoutes } = require("./ProductTypeRoutes");

exports.AppRoutes = (app) => {
  // Authentication Routes
  UserRoutes(app);
  ProductTypeRoutes(app);
  // Invalid Routes
  // app.use("*", (req, res) => sendError(res, "Resource not found!"));
};
