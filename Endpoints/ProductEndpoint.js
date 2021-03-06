const { sendSuccess } = require("../Common/util");
const ProductDao = require("../Dao/ProductDao");

// find all
exports.GetAll = async (req, res, next) => {
  try {
    var products = [];
    if (req.query) products = await ProductDao.findAllFilter(req.query);
    else products = await ProductDao.findAll();
    sendSuccess(res, { products });
  } catch (error) {
    next(error);
  }
};

// find all
exports.GetProduct = async (req, res, next) => {
  try {
    var product = await ProductDao.findByID(req.params.id);
    sendSuccess(res, { product });
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
    var id = req.params.id;
    var product = await ProductDao.delete(id);
    sendSuccess(res, { product: { ...product._doc, _id: id } });
  } catch (error) {
    next(error);
  }
};
