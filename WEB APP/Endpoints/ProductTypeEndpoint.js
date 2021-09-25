const { sendSuccess } = require("../Common/util");
const ProductTypeDao = require("../Dao/ProductTypeDao");

exports.GetAllWithSuppliersCount = async (req, res, next) => {
  try {
    var productTypes = await ProductTypeDao.findAllWithSupplierCount();
    sendSuccess(res, { productTypes });
  } catch (error) {
    next(error);
  }
};

exports.CreateProductType = async (req, res, next) => {
  try {
    var productType = await ProductTypeDao.create(SupplierData);
    sendSuccess(res, { productType });
  } catch (error) {
    next(error);
  }
};

exports.DeleteProductType = async (req, res, next) => {
  try {
    var productType = await ProductTypeDao.delete(req.params.id);
    sendSuccess(res, { productType });
  } catch (error) {
    next(error);
  }
};
