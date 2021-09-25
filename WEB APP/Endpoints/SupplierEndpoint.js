const { sendSuccess } = require("../Common/util");
const SupplierDao = require("../Dao/SupplierDao");
const lodash = require("lodash");

// to register Supplier
exports.Registration = async (req, res, next) => {
  try {
    // validations
    const SupplierData = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "address",
      "date_of_birth",
      "address",
      "payment",
      "password",
      "role",
    ]);

    // register Supplier
    var user = await SupplierDao.createNewSupplier(SupplierData);

    sendSuccess(res, { user, token: user.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};
