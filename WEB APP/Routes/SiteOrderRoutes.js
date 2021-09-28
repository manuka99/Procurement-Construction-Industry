const SiteOrderEP = require("../Endpoints/SiteOrderEP");
const SiteOrderItemEP = require("../Endpoints/SiteOrderItemEP");

exports.SiteOrderRoutes = (app) => {
  // ----- Site Orders
  app.get("/api/auth/site-orders/", SiteOrderEP.GetAllOrders);
  app.get("/api/auth/sites/site-orders/:id", SiteOrderEP.GetAllOrdersBySite);
  app.post("/api/auth/site-orders", SiteOrderEP.Create);
  app.delete("/api/auth/site-orders/:id", SiteOrderEP.Delete);
  app.put("/api/auth/site-orders/:id", SiteOrderEP.Update);

  // ----- Site Orders
  app.get(
    "/api/auth/site-order-items/:id",
    SiteOrderItemEP.GetAllOrderItemsBySiteOrder
  );
  app.post("/api/auth/site-orders", SiteOrderItemEP.Create);
  app.delete("/api/auth/site-orders/:id", SiteOrderItemEP.Delete);
  app.put("/api/auth/site-orders/:id", SiteOrderItemEP.Update);
};
