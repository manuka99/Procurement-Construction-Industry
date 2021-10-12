const AccountantDao = require("../Dao/AccountantDao");
const { RoleAuth } = require("../Middlewares/RoleAuth");
const { sendError } = require("../Common/util");
const { UserEnum } = require("../Models/UserModel");

// to register
exports.Registration = async (req, res, next) => {
  try {
    // validations
    if (!req.user || !RoleAuth([UserEnum.ACCOUNTANT])(req))
      return sendError(
        res,
        {
          message: "You are not authorized or permitted for this content!",
        },
        403
      );

    const data = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "address",
      "password",
      "role",
    ]);

    // register Admin
    var user = await AccountantDao.createNewAccountant(data);

    sendSuccess(res, { user, token: admin.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};
