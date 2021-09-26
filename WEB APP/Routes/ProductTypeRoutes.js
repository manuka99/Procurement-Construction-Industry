const ProductTypeEndpoint = require("../Endpoints/ProductTypeEndpoint");

exports.ProductTypeRoutes = (app) => {
  app.get("/api/auth/types", ProductTypeEndpoint.GetAllWithSuppliers);
  app.post("/api/auth/types", ProductTypeEndpoint.CreateProductType);
  app.delete("/api/auth/types/:id", ProductTypeEndpoint.DeleteProductType);
  app.get("/api/auth/types/:id", ProductTypeEndpoint.GetProductTYpe);
};
