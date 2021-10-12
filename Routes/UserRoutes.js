const UserEndpoint = require("../Endpoints/UserEndpoint");

exports.UserRoutes = (app) => {
  app.get("/api/public/validate-token", UserEndpoint.GetRequestUser);
  app.post("/api/public/register", UserEndpoint.Registration);
  app.post("/api/public/login", UserEndpoint.Login);

  // AUTH
  app.get("/api/auth/users-sitemanagers", UserEndpoint.GetAllSiteManagers);
  app.get("/api/auth/users-management", UserEndpoint.GetAllManagementUsers);
  app.post("/api/auth/users-management", UserEndpoint.CreateManagementUser);
  app.delete(
    "/api/auth/users-management/:id",
    UserEndpoint.DeleteManagementUser
  );
  app.put("/api/auth/users-management/:id", UserEndpoint.UpdateManagementUser);
};
