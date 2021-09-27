const ProductEndpoint = require("../Endpoints/ProductEndpoint");

exports.ProductRoutes = (app) => {
  app.post("/api/auth/products", ProductEndpoint.CreateProduct);
  app.get("/api/auth/products", ProductEndpoint.GetAll);
  app.get("/api/auth/products/:id", ProductEndpoint.GetProduct);
  app.delete("/api/auth/products/:id", ProductEndpoint.RemoveProduct);
  // app.post("/api/auth/suppliers", SupplierEndpoint.CreateProductType);
  // app.delete("/api/auth/suppliers/:id", SupplierEndpoint.DeleteProductType);
  // app.get("/api/auth/suppliers/:id", SupplierEndpoint.GetProductTYpe);
};
