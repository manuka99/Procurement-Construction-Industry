const { sendSuccess } = require("../Common/util");
const SiteOrderDao = require("../Dao/SiteOrderDao");

// find all
exports.GetAllOrders = async (req, res, next) => {
  try {
    var siteOrders = await SiteOrderDao.findAll();
    sendSuccess(res, { siteOrders });
  } catch (error) {
    next(error);
  }
};

exports.GetAllOrdersBySite = async (req, res, next) => {
  try {
    var siteOrders = await SiteOrderDao.findAllBySite(req.params.id);
    sendSuccess(res, { siteOrders });
  } catch (error) {
    next(error);
  }
};

exports.Create = async (req, res, next) => {
  try {
    var siteOrder = await SiteOrderDao.create(req.body);
    sendSuccess(res, { siteOrder });
  } catch (error) {
    next(error);
  }
};

exports.Update = async (req, res, next) => {
  try {
    var siteOrder = await SiteOrderDao.create(req.params.id, req.body);
    sendSuccess(res, { siteOrder });
  } catch (error) {
    next(error);
  }
};

exports.Delete = async (req, res, next) => {
  try {
    var siteOrder = await SiteOrderDao.delete(req.params.id);
    sendSuccess(res, { siteOrder });
  } catch (error) {
    next(error);
  }
};
