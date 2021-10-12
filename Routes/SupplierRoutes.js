const SupplierEndpoint = require("../Endpoints/SupplierEndpoint");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const { UserEnum } = require("../Models/UserModel");

exports.SupplierRoutes = (app) => {
  app.get("/api/auth/suppliers", SupplierEndpoint.GetAll);
  app.get("/api/auth/suppliers/products", SupplierEndpoint.GetAllWithProducts);
  app.get("/api/auth/suppliers/:id", SupplierEndpoint.GetSupplierWithProducts);
  app.put(
    "/api/auth/suppliers/:id",
    RoleAuth([UserEnum.ADMIN]),
    SupplierEndpoint.UpdateSensitive
  );
  app.delete(
    "/api/auth/suppliers/:id",
    RoleAuth([UserEnum.ADMIN]),
    SupplierEndpoint.DeleteSupplier
  );
  // app.post("/api/auth/suppliers", SupplierEndpoint.CreateProductType);
  // app.get("/api/auth/suppliers/:id", SupplierEndpoint.GetProductTYpe);
};
