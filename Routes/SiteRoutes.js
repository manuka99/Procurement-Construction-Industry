const SiteEndpoint = require("../Endpoints/SiteEndpoint");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const { UserEnum } = require("../Models/UserModel");

exports.SiteRoutes = (app) => {
  app.get("/api/auth/sites", SiteEndpoint.GetAllSites);
  app.get("/api/auth/sites/:id", SiteEndpoint.GetSite);
  app.post(
    "/api/auth/sites",
    RoleAuth([UserEnum.ADMIN]),
    SiteEndpoint.CreateSite
  );
  app.delete(
    "/api/auth/sites/:id",
    RoleAuth([UserEnum.ADMIN]),
    SiteEndpoint.DeleteSite
  );
  app.put(
    "/api/auth/sites/:id",
    RoleAuth([UserEnum.ADMIN]),
    SiteEndpoint.UpdateSite
  );

  // ------ Site Item (Budget Item)
  app.get("/api/auth/sites-items/:id", SiteEndpoint.GetSiteItems);
  app.post(
    "/api/auth/sites-items",
    RoleAuth([UserEnum.ADMIN]),
    SiteEndpoint.CreateSiteItem
  );
  app.put(
    "/api/auth/sites-items/:id",
    RoleAuth([UserEnum.ADMIN]),
    SiteEndpoint.UpdateSiteItems
  );

  // ------ Site Officer
  app.get("/api/auth/sites-officers/:id", SiteEndpoint.GetSiteOfficers);
  app.post(
    "/api/auth/sites-officers",
    RoleAuth([UserEnum.ADMIN]),
    SiteEndpoint.CreateSiteOfficer
  );
  app.put(
    "/api/auth/sites-officers/:id",
    RoleAuth([UserEnum.ADMIN]),
    SiteEndpoint.UpdateSiteOfficer
  );
};
