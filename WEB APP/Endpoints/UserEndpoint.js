const { sendSuccess, sendError } = require("../Common/util");
const { UserEnum } = require("../Models/UserModel");
const ValidationError = require("../Common/ValidationError");
const SupplierEndpoint = require("../Endpoints/SupplierEndpoint");
const UserDao = require("../Dao/UserDao");

//to validate token
exports.GetRequestUser = (req, res, next) => {
  return sendSuccess(res, { user: req.user });
};

exports.Registration = (req, res, next) => {
  const { role } = req.body;
  switch (role) {
    case UserEnum.ADMIN:
      AdminEndpoint.AdminRegistration(req, res, next);
      break;
    case UserEnum.SITEMANAGER:
      EditorEndpoint.EditorRegistration(req, res, next);
      break;
    case UserEnum.ACCOUNTANT:
      EditorEndpoint.EditorRegistration(req, res, next);
      break;
    case UserEnum.MANAGER:
      ReviewerEndpoint.ReviewerRegistration(req, res, next);
      break;
    case UserEnum.SUPPLIER:
      SupplierEndpoint.Registration(req, res, next);
      break;
    default:
      throw new ValidationError("Invalid Role assigned!");
  }
};

exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  // match email
  UserDao.findUserByEmailWithPassword(email)
    .then((user) => {
      if (!user)
        return sendError(res, {
          message: "No account associated with the email provided.",
        });

      // match password
      const isMatch = user.matchPasswords(password);
      if (!isMatch)
        return sendError(res, {
          message: "Password is incorrect",
        });

      // return jwt token
      user.password = null;

      return sendSuccess(res, {
        user,
        message: "Success user login",
        token: user.getSignedJwtToken(),
      });
    })
    .catch(next);
};
