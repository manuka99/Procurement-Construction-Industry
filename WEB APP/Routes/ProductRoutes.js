const ProductEndpoint = require("../Endpoints/ProductEndpoint");

exports.ProductRoutes = (app) => {
  app.post("/api/auth/products", ProductEndpoint.CreateProduct);
  // app.post("/api/auth/suppliers", SupplierEndpoint.CreateProductType);
  // app.delete("/api/auth/suppliers/:id", SupplierEndpoint.DeleteProductType);
  // app.get("/api/auth/suppliers/:id", SupplierEndpoint.GetProductTYpe);
};
