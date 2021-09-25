const { sendSuccess } = require("../Common/util");
const { UserEnum } = require("../Models/UserModel");
const ValidationError = require("../Common/ValidationError");
const SupplierEndpoint = require("../Endpoints/SupplierEndpoint");

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
