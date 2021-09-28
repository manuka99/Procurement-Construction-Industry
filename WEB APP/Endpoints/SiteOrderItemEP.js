const { sendSuccess } = require("../Common/util");
const SiteOrderItemDao = require("../Dao/SiteOrderItemDao");

// find all
exports.GetAllOrderItems = async (req, res, next) => {
  try {
    var siteOrders = await SiteOrderItemDao.findAll();
    sendSuccess(res, { siteOrders });
  } catch (error) {
    next(error);
  }
};

exports.GetAllOrderItemsBySite = async (req, res, next) => {
  try {
    var siteOrders = await SiteOrderItemDao.findAllBySiteOrder(req.params.id); //site Id
    sendSuccess(res, { siteOrders });
  } catch (error) {
    next(error);
  }
};

exports.Create = async (req, res, next) => {
  try {
    var siteOrderItem = await SiteOrderItemDao.create(req.body);
    sendSuccess(res, { siteOrderItem });
  } catch (error) {
    next(error);
  }
};

exports.Update = async (req, res, next) => {
  try {
    var siteOrderItem = await SiteOrderItemDao.create(req.params.id, req.body);
    sendSuccess(res, { siteOrderItem });
  } catch (error) {
    next(error);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    var siteOrderItem = await SiteOrderItemDao.delete(req.params.id);
    sendSuccess(res, { siteOrderItem });
  } catch (error) {
    next(error);
  }
};
