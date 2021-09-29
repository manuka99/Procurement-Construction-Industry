const SupplierOrderEP = require("../Endpoints/SupplierOrderEP");

exports.SupplierOrderRoutes = (app) => {
  // ----- Supplier Orders
  app.get(
    "/api/auth/site-order-item-supplier-orders/:id",
    SupplierOrderEP.GetAllOrdersByItem
  );
  app.post("/api/auth/supplier-orders", SupplierOrderEP.Create);
  app.delete("/api/auth/supplier-orders/:id", SupplierOrderEP.Delete);
  app.put("/api/auth/supplier-orders/:id", SupplierOrderEP.Update);
};
