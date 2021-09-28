const SiteEndpoint = require("../Endpoints/SiteEndpoint");

exports.SiteRoutes = (app) => {
  app.get("/api/auth/sites", SiteEndpoint.GetAllSites);
  app.get("/api/auth/sites/:id", SiteEndpoint.GetSite);
  app.post("/api/auth/sites", SiteEndpoint.CreateSite);
  app.delete("/api/auth/sites/:id", SiteEndpoint.DeleteSite);
  app.put("/api/auth/sites/:id", SiteEndpoint.UpdateSite);

  // ------ Site Item (Budget Item)
  app.get("/api/auth/sites-items/:id", SiteEndpoint.GetSiteItems);
  app.post("/api/auth/sites-items", SiteEndpoint.CreateSiteItem);
  app.put("/api/auth/sites-items/:id", SiteEndpoint.UpdateSiteItems);

  // ------ Site Officer
  app.get("/api/auth/sites-officers/:id", SiteEndpoint.GetSiteOfficers);
  app.post("/api/auth/sites-officers", SiteEndpoint.CreateSiteOfficer);
  app.put("/api/auth/sites-officers/:id", SiteEndpoint.UpdateSiteOfficer);
};
