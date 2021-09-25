const { UserRoutes } = require("./UserRoutes");

exports.AppRoutes = (app) => {
  // Authentication Routes
  UserRoutes(app);

  // Invalid Routes
  // app.use("*", (req, res) => sendError(res, "Resource not found!"));
};
