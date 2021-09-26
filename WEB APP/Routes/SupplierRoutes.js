const SupplierEndpoint = require("../Endpoints/SupplierEndpoint");

exports.SupplierRoutes = (app) => {
  app.get("/api/auth/suppliers", SupplierEndpoint.GetAll);
  // app.post("/api/auth/suppliers", SupplierEndpoint.CreateProductType);
  // app.delete("/api/auth/suppliers/:id", SupplierEndpoint.DeleteProductType);
  // app.get("/api/auth/suppliers/:id", SupplierEndpoint.GetProductTYpe);
};