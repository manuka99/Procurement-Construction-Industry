const ProductEndpoint = require("../Endpoints/ProductEndpoint");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const { UserEnum } = require("../Models/UserModel");

exports.ProductRoutes = (app) => {
  app.post(
    "/api/auth/products",
    RoleAuth([UserEnum.ADMIN]),
    ProductEndpoint.CreateProduct
  );
  app.get("/api/auth/products", ProductEndpoint.GetAll);
  app.get("/api/auth/products/:id", ProductEndpoint.GetProduct);
  app.delete(
    "/api/auth/products/:id",
    RoleAuth([UserEnum.ADMIN]),
    ProductEndpoint.RemoveProduct
  );
  // app.post("/api/auth/suppliers", SupplierEndpoint.CreateProductType);
  // app.delete("/api/auth/suppliers/:id", SupplierEndpoint.DeleteProductType);
  // app.get("/api/auth/suppliers/:id", SupplierEndpoint.GetProductTYpe);
};
