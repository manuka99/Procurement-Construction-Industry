const { sendSuccess } = require("../Common/util");
const ProductDao = require("../Dao/ProductDao");

// find all
exports.GetAll = async (req, res, next) => {
  try {
    var products = await ProductDao.findAll();
    sendSuccess(res, { products });
  } catch (error) {
    next(error);
  }
};

// to create product
exports.CreateProduct = async (req, res, next) => {
  try {
    var product = await ProductDao.create(req.body);
    sendSuccess(res, { product });
  } catch (error) {
    next(error);
  }
};

// to remove product
exports.RemoveProduct = async (req, res, next) => {
  try {
    var product = await ProductDao.delete(req.params.id);
    sendSuccess(res, { product });
  } catch (error) {
    next(error);
  }
};
