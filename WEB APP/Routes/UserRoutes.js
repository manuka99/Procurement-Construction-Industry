const UserEndpoint = require("../Endpoints/UserEndpoint");

exports.UserRoutes = (app) => {
  app.get("/api/public/validate-token", UserEndpoint.GetRequestUser);
  app.post("/api/public/register", UserEndpoint.Registration);
  app.post("/api/public/login", UserEndpoint.Login);

  // AUTH
  app.get("/api/auth/users-sitemanagers", UserEndpoint.GetAllSiteManagers);
};
