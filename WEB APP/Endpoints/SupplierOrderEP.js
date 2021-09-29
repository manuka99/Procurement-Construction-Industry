const { sendSuccess } = require("../Common/util");
const SupplierOrderDao = require("../Dao/SupplierOrderDao");

// find all
exports.GetAllOrdersByItem = async (req, res, next) => {
  try {
    var supplierOrders = await SupplierOrderDao.findAllBySiteOrder(
      req.params.id
    ); //site Order item Id
    sendSuccess(res, { supplierOrders });
  } catch (error) {
    next(error);
  }
};

exports.Create = async (req, res, next) => {
  try {
    var supplierOrder = await SupplierOrderDao.create(req.body);
    sendSuccess(res, { supplierOrder });
  } catch (error) {
    next(error);
  }
};

exports.Update = async (req, res, next) => {
  try {
    var supplierOrder = await SupplierOrderDao.update(req.params.id, req.body);
    sendSuccess(res, { supplierOrder });
  } catch (error) {
    next(error);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    var supplierOrder = await SupplierOrderDao.delete(req.params.id);
    sendSuccess(res, { supplierOrder });
  } catch (error) {
    next(error);
  }
};
