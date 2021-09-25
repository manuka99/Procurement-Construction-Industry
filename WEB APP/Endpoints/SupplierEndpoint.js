const { sendSuccess } = require("../Common/util");
const SupplierDao = require("../Dao/SupplierDao");
const lodash = require("lodash");

// to remove payment
exports.GetAllWithProductsCount = async (req, res, next) => {
  try {
    var suppliers = await SupplierDao.findAllWithProductCount();
    sendSuccess(res, { suppliers });
  } catch (error) {
    next(error);
  }
};

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
      "logo",
      "description",
      "password",
      "role",
    ]);

    // register Supplier
    var supplier = await SupplierDao.createNewSupplier(SupplierData);

    sendSuccess(res, { supplier, token: supplier.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};

// to update Supplier
exports.UpdateSupplier = async (req, res, next) => {
  try {
    // validations
    const SupplierData = lodash.pick(req.body, [
      "firstName",
      "lastName",
      "phone",
      "email",
      "address",
      "logo",
      "description",
      "password",
    ]);

    // update Supplier
    var supplier = await SupplierDao.Update(req.user._id, SupplierData);
    sendSuccess(res, { supplier, token: supplier.getSignedJwtToken() });
  } catch (error) {
    next(error);
  }
};

// to add payment
exports.AddPayment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// to remove payment
exports.RemovePayment = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
