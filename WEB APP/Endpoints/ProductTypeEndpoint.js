const { sendSuccess } = require("../Common/util");
const ProductTypeDao = require("../Dao/ProductTypeDao");

exports.GetAllWithSuppliers = async (req, res, next) => {
  try {
    var productTypes = await ProductTypeDao.findAllWithSupplier();
    sendSuccess(res, { productTypes });
  } catch (error) {
    next(error);
  }
};

exports.GetProductTYpe = async (req, res, next) => {
  try {
    var productType = await ProductTypeDao.findByIDWithProducts(req.params.id);
    sendSuccess(res, { productType });
  } catch (error) {
    next(error);
  }
};

exports.CreateProductType = async (req, res, next) => {
  try {
    var productType = await ProductTypeDao.create(req.body);
    sendSuccess(res, { productType });
  } catch (error) {
    next(error);
  }
};

exports.DeleteProductType = async (req, res, next) => {
  try {
    const id = req.params.id;
    var productType = await ProductTypeDao.delete(id);
    sendSuccess(res, { productType: { ...productType, _id: id } });
  } catch (error) {
    next(error);
  }
};
