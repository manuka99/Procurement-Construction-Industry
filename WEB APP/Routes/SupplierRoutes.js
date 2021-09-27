const SupplierEndpoint = require("../Endpoints/SupplierEndpoint");

exports.SupplierRoutes = (app) => {
  app.get("/api/auth/suppliers", SupplierEndpoint.GetAll);
  app.get("/api/auth/suppliers/products", SupplierEndpoint.GetAllWithProducts);
  app.get("/api/auth/suppliers/:id", SupplierEndpoint.GetSupplierWithProducts);
  app.delete("/api/auth/suppliers/:id", SupplierEndpoint.DeleteSupplier);
  // app.post("/api/auth/suppliers", SupplierEndpoint.CreateProductType);
  // app.get("/api/auth/suppliers/:id", SupplierEndpoint.GetProductTYpe);
};
