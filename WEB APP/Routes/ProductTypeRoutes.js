const ProductTypeEndpoint = require("../Endpoints/ProductTypeEndpoint");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const { UserEnum } = require("../Models/UserModel");

exports.ProductTypeRoutes = (app) => {
  app.get("/api/auth/types", ProductTypeEndpoint.GetAllWithSuppliers);
  app.post(
    "/api/auth/types",
    RoleAuth([UserEnum.ADMIN]),
    ProductTypeEndpoint.CreateProductType
  );
  app.delete(
    "/api/auth/types/:id",
    RoleAuth([UserEnum.ADMIN]),
    ProductTypeEndpoint.DeleteProductType
  );
  app.get("/api/auth/types/:id", ProductTypeEndpoint.GetProductTYpe);
};
