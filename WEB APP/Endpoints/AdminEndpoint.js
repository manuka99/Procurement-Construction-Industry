const AdminDao = require("../Dao/AdminDao");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const { sendError } = require("../Common/util");
const { UserEnum } = require("../Models/UserModel");

// to register Admin
exports.Registration = async (req, res, next) => {
  try {
    // validations
    if (!req.user || !RoleAuth([UserEnum.ADMIN])(req))
      return sendError(
        res,
        {
          message: "You are not authorized or permitted for this content!",
        },
        403
      );

    const AdminData = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "address",
      "password",
      "role",
    ]);

    // register Admin
    var user = await AdminDao.createNewAdmin(AdminData);

    sendSuccess(res, { user, token: admin.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};
