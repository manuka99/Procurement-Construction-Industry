const { UserRoutes } = require("./UserRoutes");
const { ProductTypeRoutes } = require("./ProductTypeRoutes");
const { SupplierRoutes } = require("./SupplierRoutes");
const { ProductRoutes } = require("./ProductRoutes");
const { SiteRoutes } = require("./SiteRoutes");
const { SiteOrderRoutes } = require("./SiteOrderRoutes");
const { SupplierOrderRoutes } = require("./SupplierOrderRoutes");

exports.AppRoutes = (app) => {
  // Authentication Routes
  UserRoutes(app);
  ProductTypeRoutes(app);
  SupplierRoutes(app);
  ProductRoutes(app);
  SiteRoutes(app);
  SiteOrderRoutes(app);
  SupplierOrderRoutes(app);
  // Invalid Routes
  // app.use("*", (req, res) => sendError(res, "Resource not found!"));
};
