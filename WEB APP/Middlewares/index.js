const { UserEnum } = require("../Models/UserModel");
const { Authenticate } = require("./Authenticate");
const { GuestUser } = require("./GuestUser");
const { RoleAuth } = require("./RoleAuth");
const { TokenValidator } = require("./TokenValidator");

exports.AppMiddlewares = (app) => {
  /* VALIDATE TOKEN */
  app.all("*", TokenValidator);

  /* AUTHORIZATION */

  // authenticate all requests from,
  app.use(
    [
      "/api/auth/",
      "/api/orders/",
      "/api/sites/",
      "/api/supplier/",
      "/api/products/",
    ],
    Authenticate
  );

  // ADMIN CONTENT
  app.use("/api/admin/", RoleAuth([UserEnum.ADMIN]));
};
