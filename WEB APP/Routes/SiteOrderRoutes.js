const SiteOrderEP = require("../Endpoints/SiteOrderEP");
const SiteOrderItemEP = require("../Endpoints/SiteOrderItemEP");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const { UserEnum } = require("../Models/UserModel");

exports.SiteOrderRoutes = (app) => {
  // ----- Site Orders
  app.get("/api/auth/site-orders/", SiteOrderEP.GetAllOrders);
  app.get("/api/auth/site-orders/:id", SiteOrderEP.GetSiteOrder);
  app.get("/api/auth/sites/site-orders/:id", SiteOrderEP.GetAllOrdersBySite);
  app.post("/api/auth/site-orders", SiteOrderEP.Create);
  app.delete("/api/auth/site-orders/:id", SiteOrderEP.Delete);
  app.put("/api/auth/site-orders/:id", SiteOrderEP.Update);

  // ----- Site Orders items
  app.get(
    "/api/auth/site-order-items/:id",
    SiteOrderItemEP.GetAllOrderItemsBySiteOrder
  );
  app.post("/api/auth/site-order-items", SiteOrderItemEP.Create);
  app.delete("/api/auth/site-order-items/:id", SiteOrderItemEP.Delete);
  app.put(
    "/api/auth/site-order-items/:id",
    RoleAuth([UserEnum.ADMIN]),
    SiteOrderItemEP.Update
  );
};
